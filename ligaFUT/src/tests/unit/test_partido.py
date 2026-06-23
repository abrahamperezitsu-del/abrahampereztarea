# tests/unit/test_partido.py
import pytest
from src.domain.models import Equipo, Partido

def test_partido_termina_en_victoria_local():
    # 1. Arrange (Preparar el escenario)
    equipo_local = Equipo(id=1, nombre="Caracas FC", puntos=0)
    equipo_visitante = Equipo(id=2, nombre="Táchira FC", puntos=0)
    partido = Partido(id=101, local=equipo_local, visitante=equipo_visitante)

    # 2. Act (Ejecutar la acción)
    partido.registrar_resultado(goles_local=3, goles_visitante=1)

    # 3. Assert (Verificar que se cumpla la regla de negocio)
    assert equipo_local.puntos == 3
    assert equipo_visitante.puntos == 0
    assert partido.finalizado is True

def test_partido_termina_en_empate():
    equipo_local = Equipo(id=1, nombre="Caracas FC", puntos=0)
    equipo_visitante = Equipo(id=2, nombre="Táchira FC", puntos=0)
    partido = Partido(id=102, local=equipo_local, visitante=equipo_visitante)

    partido.registrar_resultado(goles_local=2, goles_visitante=2)

    assert equipo_local.puntos == 1
    assert equipo_visitante.puntos == 1

# Al final de tests/unit/test_partido.py

def test_no_se_puede_registrar_resultado_en_partido_finalizado():
    equipo_local = Equipo(id=1, nombre="Caracas FC", puntos=0)
    equipo_visitante = Equipo(id=2, nombre="Táchira FC", puntos=0)
    partido = Partido(id=103, local=equipo_local, visitante=equipo_visitante)

    # Finalizamos el partido por primera vez
    partido.registrar_resultado(goles_local=1, goles_visitante=0)

    # Intentar registrar otra vez debería lanzar un ValueError
    with pytest.raises(ValueError, match="El partido ya ha finalizado"):
        partido.registrar_resultado(goles_local=2, goles_visitante=2)