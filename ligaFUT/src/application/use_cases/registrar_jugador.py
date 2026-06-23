# src/application/use_cases/registrar_jugador.py
from src.application.ports.repositories import JugadorRepository
from src.domain.models import Jugador

class RegistrarJugadorMatch:
    def __init__(self, jugador_repo: JugadorRepository):
        self.jugador_repo = jugador_repo

    def ejecutar(self, nombre: str, posicion: str, equipo_id: int) -> dict:
        nuevo_jugador = Jugador(nombre=nombre, posicion=posicion)
        self.jugador_repo.guardar(nuevo_jugador, equipo_id=equipo_id)
        return {"status": "Jugador fichado con éxito", "nombre": nombre, "posicion": posicion}