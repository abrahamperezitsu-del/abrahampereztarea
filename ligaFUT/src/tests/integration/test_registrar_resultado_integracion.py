# tests/integration/test_registrar_resultado_integracion.py
import os
import pytest
from src.infrastructure.adapters.sqlite_repository import SQLiteEquipoRepository
from src.application.use_cases.registrar_resultado import RegistrarResultadoMatch
from src.domain.models import Equipo

def test_flujo_completo_registrar_resultado_en_bd():
    # 1. Configurar una base de datos de prueba temporal
    test_db = "liga_test.db"
    repo = SQLiteEquipoRepository(db_path=test_db)
    
    # 2. Insertar dos equipos iniciales directamente en la BD para la prueba
    equipo_1 = Equipo(id=1, nombre="Caracas FC", puntos=0)
    equipo_2 = Equipo(id=2, nombre="Táchira FC", puntos=0)
    repo.guardar(equipo_1)
    repo.guardar(equipo_2)

    # 3. Instanciar el Caso de Uso inyectándole nuestro adaptador de SQLite
    caso_de_uso = RegistrarResultadoMatch(equipo_repo=repo)

    # 4. Ejecutar el caso de uso (Se juega el clásico: gana Caracas 2-1)
    resultado = caso_de_uso.ejecutar(id_local=1, id_visitante=2, goles_local=2, goles_visitante=1)

    # 5. Verificar que el caso de uso responda exitosamente
    assert resultado["status"] == "Resultado registrado exitosamente"

    # 6. Verificar que los cambios se hayan guardado REALMENTE en la Base de Datos
    equipo_local_actualizado = repo.buscar_por_id(1)
    equipo_visitante_actualizado = repo.buscar_por_id(2)

    assert equipo_local_actualizado.puntos == 3
    assert equipo_visitante_actualizado.puntos == 0

    # Limpieza: Borrar el archivo de la BD de prueba al terminar
    if os.path.exists(test_db):
        os.remove(test_db)