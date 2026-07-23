export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🐾</span>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            pet<span className="text-green-600">CO</span>
          </span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#inicio" className="hover:text-green-600 transition">Inicio</a>
          <a href="#nosotros" className="hover:text-green-600 transition">Nosotros</a>
          <a href="#servicios" className="hover:text-green-600 transition">Servicios</a>
          <a href="#testimonios" className="hover:text-green-600 transition">Testimonios</a>
          <a href="#contacto" className="hover:text-green-600 transition">Contacto</a>
        </nav>
        <div>
          <a
            href="https://wa.me/584129209843"
            target="_blank"
            rel="noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-full shadow-md shadow-green-500/20 transition transform hover:-translate-y-0.5"
          >
            Emergencias 24/7
          </a>
        </div>
      </div>
    </header>
  );
}