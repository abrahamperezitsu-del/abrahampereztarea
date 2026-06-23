# src/application/use_cases/registrar_equipo.py
from src.application.ports.repositories import EquipoRepository
from src.domain.models import Equipo

class RegistrarEquipoMatch:
    def __init__(self, equipo_repo: EquipoRepository):
        self.equipo_repo = equipo_repo

    def ejecutar(self, nombre: str) -> dict:
        # 💡 Al no pasar el id, el modelo automáticamente le asigna None de forma segura
        nuevo_equipo = Equipo(nombre=nombre, puntos=0)
        self.equipo_repo.guardar(nuevo_equipo)
        return {"status": "Equipo registrado con éxito", "nombre": nombre}