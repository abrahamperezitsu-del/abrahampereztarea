# src/infrastructure/adapters/sqlite_repository.py
import sqlite3
from src.application.ports.repositories import EquipoRepository, JugadorRepository
from src.domain.models import Equipo, Jugador

class SQLiteEquipoRepository(EquipoRepository):
    def __init__(self, db_path: str = "liga_futsal.db"):
        self.db_path = db_path
        self._crear_tablas_si_no_existen()

    def _crear_tablas_si_no_existen(self):
        conn = sqlite3.connect(self.db_path)
        try:
            cursor = conn.cursor()
            # 1. Tabla de Equipos
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS equipos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    puntos INTEGER DEFAULT 0,
                    goles_a_favor INTEGER DEFAULT 0,
                    goles_en_contra INTEGER DEFAULT 0
                )
            """)
            # 2. Tabla de Jugadores
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS jugadores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    posicion TEXT NOT NULL,
                    goles INTEGER DEFAULT 0,
                    asistencias INTEGER DEFAULT 0,
                    equipo_id INTEGER,
                    FOREIGN KEY (equipo_id) REFERENCES equipos(id)
                )
            """)
            # 3. Tabla de Partidos
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS partidos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    local_id INTEGER,
                    visitante_id INTEGER,
                    fecha_hora TEXT NOT NULL,
                    goles_local INTEGER DEFAULT 0,
                    goles_visitante INTEGER DEFAULT 0,
                    finalizado INTEGER DEFAULT 0,
                    FOREIGN KEY (local_id) REFERENCES equipos(id),
                    FOREIGN KEY (visitante_id) REFERENCES equipos(id)
                )
            """)
            conn.commit()
        finally:
            conn.close()

    def buscar_por_id(self, equipo_id: int) -> Equipo:
        conn = sqlite3.connect(self.db_path)
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT id, nombre, puntos, goles_a_favor, goles_en_contra FROM equipos WHERE id = ?", (equipo_id,))
            row = cursor.fetchone()
            if not row:
                raise ValueError(f"El equipo con ID {equipo_id} no existe")
            return Equipo(id=row[0], nombre=row[1], puntos=row[2], goles_a_favor=row[3], goles_en_contra=row[4])
        finally:
            conn.close()

    def guardar(self, equipo: Equipo) -> None:
        conn = sqlite3.connect(self.db_path)
        try:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO equipos (id, nombre, puntos, goles_a_favor, goles_en_contra)
                VALUES (?, ?, ?, ?, ?)
            """, (equipo.id, equipo.nombre, equipo.puntos, equipo.goles_a_favor, equipo.goles_en_contra))
            conn.commit()
        finally:
            conn.close()

    def listar_todos(self) -> list[Equipo]:
        conn = sqlite3.connect(self.db_path)
        try:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, nombre, puntos, goles_a_favor, goles_en_contra 
                FROM equipos 
                ORDER BY puntos DESC, (goles_a_favor - goles_en_contra) DESC
            """)
            rows = cursor.fetchall()
            return [Equipo(id=row[0], nombre=row[1], puntos=row[2], goles_a_favor=row[3], goles_en_contra=row[4]) for row in rows]
        finally:
            conn.close()


class SQLiteJugadorRepository(JugadorRepository):
    def __init__(self, db_path: str = "liga_futsal.db"):
        self.db_path = db_path

    def guardar(self, jugador: Jugador, equipo_id: int) -> None:
        conn = sqlite3.connect(self.db_path)
        try:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO jugadores (id, nombre, posicion, goles, asistencias, equipo_id)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (jugador.id, jugador.nombre, jugador.posicion, jugador.goles, jugador.asistencias, equipo_id))
            conn.commit()
        finally:
            conn.close()

    def buscar_por_equipo(self, equipo_id: int) -> list[Jugador]:
        conn = sqlite3.connect(self.db_path)
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT id, nombre, posicion, goles, asistencias FROM jugadores WHERE equipo_id = ?", (equipo_id,))
            rows = cursor.fetchall()
            return [Jugador(id=row[0], nombre=row[1], posicion=row[2], goles=row[3], asistencias=row[4]) for row in rows]
        finally:
            conn.close()

    def obtener_top_goleadores(self) -> list[dict]:
        conn = sqlite3.connect(self.db_path)
        try:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT j.nombre, j.posicion, j.goles, j.asistencias, e.nombre 
                FROM jugadores j
                JOIN equipos e ON j.equipo_id = e.id
                ORDER BY j.goles DESC, j.asistencias DESC LIMIT 10
            """)
            rows = cursor.fetchall()
            return [
                {"nombre": r[0], "posicion": r[1], "goles": r[2], "asistencias": r[3], "equipo": r[4]}
                for r in rows
            ]
        finally:
            conn.close()