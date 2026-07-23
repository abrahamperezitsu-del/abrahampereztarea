export function Hero() {
  return (
    <section id="inicio" className="relative bg-gradient-to-b from-green-50 to-white py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Clínica Veterinaria Integral
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Cuidamos de tu mejor amigo como si fuera nuestro.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
            Atención veterinaria integral, moderna y con mucho amor. Tu tranquilidad y la salud de tu mascota son nuestra prioridad absoluta.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/584129209843"
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg shadow-green-500/30 transition transform hover:-translate-y-0.5 text-center"
            >
              Agenda tu cita hoy
            </a>
            <a
              href="#servicios"
              className="bg-white hover:bg-slate-100 text-slate-700 font-semibold text-lg px-8 py-4 rounded-xl border border-slate-200 transition text-center"
            >
              Conoce servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}