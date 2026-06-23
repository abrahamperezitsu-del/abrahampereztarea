# src/domain/models.py

class Jugador:
    def __init__(self, nombre: str, posicion: str, goles: int = 0, asistencias: int = 0, id: int | None = None):
        self.id = id
        self.nombre = nombre
        self.posicion = posicion
        self.goles = goles
        self.asistencias = asistencias

    def registrar_goles(self, cantidad: int):
        self.goles += cantidad

    def registrar_asistencias(self, cantidad: int):
        self.asistencias += cantidad


class Equipo:
    def __init__(self, nombre: str, puntos: int = 0, goles_a_favor: int = 0, goles_en_contra: int = 0, id: int | None = None):
        self.id = id
        self.nombre = nombre
        self.puntos = puntos
        self.goles_a_favor = goles_a_favor
        self.goles_en_contra = goles_en_contra

    @property
    def diferencia_goles(self) -> int:
        return self.goles_a_favor - self.goles_en_contra

    def actualizar_estadisticas(self, puntos_nuevos: int, gf: int, gc: int):
        self.puntos += puntos_nuevos
        self.goles_a_favor += gf
        self.goles_en_contra += gc

class Partido:
    # 💡 Le asignamos una fecha/hora por defecto. Así, si no se pasa el parámetro, no da error.
    def __init__(self, local: Equipo, visitante: Equipo, fecha_hora: str = "2026-01-01 00:00", id: int | None = None):
        self.id = id
        self.local = local
        self.visitante = visitante
        self.fecha_hora = fecha_hora  
        self.goles_local = 0
        self.goles_visitante = 0
        self.finalizado = False

    def registrar_resultado(self, goles_local: int, goles_visitante: int):
        if self.finalizado:
            raise ValueError("El partido ya ha finalizado")

        self.goles_local = goles_local
        self.goles_visitante = goles_visitante
        self.finalizado = True

        if goles_local > goles_visitante:
            self.local.actualizar_estadisticas(puntos_nuevos=3, gf=goles_local, gc=goles_visitante)
            self.visitante.actualizar_estadisticas(puntos_nuevos=0, gf=goles_visitante, gc=goles_local)
        elif goles_visitante > goles_local:
            self.local.actualizar_estadisticas(puntos_nuevos=0, gf=goles_local, gc=goles_visitante)
            self.visitante.actualizar_estadisticas(puntos_nuevos=3, gf=goles_visitante, gc=goles_local)
        else:
            self.local.actualizar_estadisticas(puntos_nuevos=1, gf=goles_local, gc=goles_visitante)
            self.visitante.actualizar_estadisticas(puntos_nuevos=1, gf=goles_visitante, gc=goles_local)