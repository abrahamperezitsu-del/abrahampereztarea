# src/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.infrastructure.adapters.sqlite_repository import SQLiteEquipoRepository, SQLiteJugadorRepository
from src.application.use_cases.registrar_resultado import RegistrarResultadoMatch
from src.application.use_cases.registrar_equipo import RegistrarEquipoMatch
from src.application.use_cases.registrar_jugador import RegistrarJugadorMatch

# 💡 Aquí está la variable 'app' que Uvicorn está buscando desesperadamente
app = FastAPI(
    title="API de la Liga de Futsal Pro",
    description="Backend de estadísticas estilo SofaScore/OneFootball",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instanciamos ambos repositorios apuntando al mismo archivo DB
repo_equipos = SQLiteEquipoRepository(db_path="liga_futsal.db")
repo_jugadores = SQLiteJugadorRepository(db_path="liga_futsal.db")


# --- ESQUEMAS DE PETICIONES HTTP ---
class ResultadoRequest(BaseModel):
    id_local: int
    id_visitante: int
    goles_local: int
    goles_visitante: int

class EquipoRequest(BaseModel):
    nombre: str

class JugadorRequest(BaseModel):
    nombre: str
    posicion: str  # Portero, Cierre, Ala, Pivot


# --- ENDPOINTS DE EQUIPOS Y CLASIFICACIÓN ---

@app.post("/api/equipos")
def registrar_equipo(datos: EquipoRequest):
    caso_uso = RegistrarEquipoMatch(equipo_repo=repo_equipos)
    return caso_uso.ejecutar(nombre=datos.nombre)

@app.get("/api/equipos/clasificacion")
def obtener_clasificacion():
    equipos = repo_equipos.listar_todos()
    return [
        {
            "id": e.id,
            "nombre": e.nombre,
            "puntos": e.puntos,
            "goles_a_favor": e.goles_a_favor,
            "goles_en_contra": e.goles_en_contra,
            "diferencia_goles": e.diferencia_goles
        } for e in equipos
    ]


# --- ENDPOINTS DE JUGADORES Y PLANTILLAS ---

@app.post("/api/equipos/{equipo_id}/jugadores")
def registrar_jugador(equipo_id: int, datos: JugadorRequest):
    caso_uso = RegistrarJugadorMatch(jugador_repo=repo_jugadores)
    return caso_uso.ejecutar(nombre=datos.nombre, posicion=datos.posicion, equipo_id=equipo_id)

@app.get("/api/equipos/{equipo_id}/plantilla")
def obtener_plantilla(equipo_id: int):
    jugadores = repo_jugadores.buscar_por_equipo(equipo_id)
    return [
        {
            "id": j.id,
            "nombre": j.nombre,
            "posicion": j.posicion,
            "goles": j.goles,
            "asistencias": j.asistencias
        } for j in jugadores
    ]

@app.get("/api/jugadores/goleadores")
def obtener_top_goleadores():
    return repo_jugadores.obtener_top_goleadores()


# --- ENDPOINTS DE PARTIDOS ---

@app.post("/api/partidos/resultado")
def registrar_resultado(datos: ResultadoRequest):
    try:
        caso_de_uso = RegistrarResultadoMatch(equipo_repo=repo_equipos)
        respuesta = caso_de_uso.ejecutar(
            id_local=datos.id_local,
            id_visitante=datos.id_visitante,
            goles_local=datos.goles_local,
            goles_visitante=datos.goles_visitante
        )
        return respuesta
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))