# src/application/use_cases/registrar_resultado.py
from src.application.ports.repositories import EquipoRepository
from src.domain.models import Partido

class RegistrarResultadoMatch:
    def __init__(self, equipo_repo: EquipoRepository):
        # Inyectamos el puerto (la interfaz)
        self.equipo_repo = equipo_repo

    def ejecutar(self, id_local: int, id_visitante: int, goles_local: int, goles_visitante: int):
        # 1. Buscamos las entidades usando el puerto
        equipo_local = self.equipo_repo.buscar_por_id(id_local)
        equipo_visitante = self.equipo_repo.buscar_por_id(id_visitante)
        
        # 2. Creamos el partido en memoria (Lógica de Dominio)
        from src.domain.models import Partido
        # Línea 16 en src/application/use_cases/registrar_resultado.py
        partido = Partido(local=equipo_local, visitante=equipo_visitante)
        
        # 3. Aplicamos las reglas de negocio (se suman los puntos automáticamente)
        partido.registrar_resultado(goles_local, goles_visitante)
        
        # 4. Guardamos el nuevo estado de los equipos mediante el puerto
        self.equipo_repo.guardar(equipo_local)
        self.equipo_repo.guardar(equipo_visitante)
        
        return {"status": "Resultado registrado exitosamente"}