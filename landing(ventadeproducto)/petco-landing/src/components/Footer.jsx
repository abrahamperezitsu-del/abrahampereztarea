export function Footer() {
  return (
    <footer id="contacto" className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🐾</span>
              <span className="text-2xl font-extrabold text-white">
                pet<span className="text-green-500">CO</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Cuidando con amor y profesionalismo de los miembros más fieles de tu familia.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Visítanos</h4>
            <p className="text-sm text-slate-400 mb-2">
              Av. Principal de las Mascotas, Local 42, Ciudad.
            </p>
            <p className="text-sm text-slate-400">
              <strong>Emergencias:</strong> 24/7
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contacto Directo</h4>
            <p className="text-sm text-slate-400 mb-2">
              Teléfono: +58 0412-9209843
            </p>
            <p className="text-sm text-slate-400 mb-2">
              WhatsApp: +58 0412-9209843
            </p>
            <p className="text-sm text-slate-400">
              Email: abrahamperez.itsu@gmail.com
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Redes Sociales</h4>
            <div className="flex space-x-4 text-sm">
              <a 
                href="https://instagram.com/abrmham_asc" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-green-500 transition"
              >
                Instagram (@abrmham_asc)
              </a>
              <a href="#" className="hover:text-green-500 transition">
                Facebook
              </a>
              <a href="#" className="hover:text-green-500 transition">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          &copy; 2026 petCO Veterinaria. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}