import streamlit as st

# 1. Configuración de la página (Pestaña del navegador)
st.set_page_config(
    page_title="Perfil Profesional | Abraham Pérez", 
    page_icon="💻", 
    layout="centered"
)

# --- CABECERA ---
# Creamos dos columnas: una pequeña para la foto y una más ancha para tus datos
col1, col2 = st.columns([1, 2], gap="large")

with col1:
    # Espacio reservado para la foto (Placeholder temporal de 150x150)
    # Cuando tengas tu foto, cambia este enlace por la ruta de tu archivo (ej. "mi_foto.jpg")
    st.image("https://via.placeholder.com/150", caption="[Tu Foto Aquí]", width=150)

with col2:
    st.title("Abraham Gabriel Perez Ascanio")
    st.subheader("🚀 Semi-casi-programador")
    st.write(
        "Estudiante de desarrollo de software enfocado en la creación de soluciones eficientes, "
        "automatización de procesos y gestión de lógica interna."
    )

st.markdown("---")

# --- SECCIÓN: HABILIDADES ---
st.header("🛠️ Lista de Habilidades")

# Organización de habilidades en viñetas estructuradas
col_hab1, col_hab2 = st.columns(2)
with col_hab1:
    st.markdown("- **Lenguajes:** Python (OOP, RegEx)")
    st.markdown("- **Bases de Datos:** SQL / PostgreSQL")
with col_hab2:
    st.markdown("- **Herramientas:** Git & GitHub")
    st.markdown("- **Competencias:** Lógica algorítmica, resolución de problemas")

st.markdown("---")

# --- SECCIÓN: PROYECTOS ---
st.header("📂 Proyectos Destacados")

with st.container():
    st.subheader("📋 Organizador de Turnos Rotativos")
    st.write(
        "Desarrollo de un sistema algorítmico en Python diseñado para optimizar y organizar "
        "los horarios del personal según parámetros y restricciones específicas de tiempo."
    )
    st.caption("Tecnologías utilizadas: Python / Lógica de Programación")

st.markdown("---")

# --- SECCIÓN: CONTACTO ---
st.header("✉️ Contacto")
st.write("¿Tienes un proyecto en mente o quieres conectar? ¡Escríbeme!")

# Configuración del enlace directo a tu WhatsApp
numero_contacto = "04129209843"
# Formato internacional para el enlace (código de Venezuela: 58)
url_whatsapp = f"https://wa.me/58{numero_contacto[1:]}?text=Hola%20Abraham,%20vi%20tu%20perfil..."

# Botón interactivo
st.link_button(f"📲 Contactar por WhatsApp ({numero_contacto})", url_whatsapp)

# --- FOOTER ---
# Inyección de un pequeño estilo CSS para mantener el footer fijo abajo y estético
st.markdown("""
    <style>
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: transparent;
        text-align: center;
        padding: 10px;
        font-size: 13px;
        color: #888888;
    }
    </style>
    <div class="footer">
        <p>© 2026 • Diseñado con 🐍 por Abraham Pérez • Caracas, Venezuela</p>
    </div>
""", unsafe_allow_html=True)