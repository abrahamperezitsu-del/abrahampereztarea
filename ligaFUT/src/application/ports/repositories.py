# src/application/ports/repositories.py
from abc import ABC, abstractmethod
from src.domain.models import Equipo, Jugador 

class EquipoRepository(ABC):
    
    @abstractmethod
    def buscar_por_id(self, equipo_id: int) -> Equipo:
        pass

    @abstractmethod
    def guardar(self, equipo: Equipo) -> None:
        pass

    @abstractmethod
    def listar_todos(self) -> list[Equipo]:
        pass


class JugadorRepository(ABC):
    
    @abstractmethod
    def guardar(self, jugador: Jugador, equipo_id: int) -> None:
        pass

    @abstractmethod
    def buscar_por_equipo(self, equipo_id: int) -> list[Jugador]:
        pass
    
    @abstractmethod
    def obtener_top_goleadores(self) -> list[dict]:
        pass