const testimonialsData = [
  {
    quote: "Llevé a mi perro Max por una emergencia a las 3 AM y nos trataron de maravilla. En petCO le salvaron la vida. ¡100% recomendados!",
    author: "Laura M.",
    pet: "Dueña de Max (Golden Retriever)"
  },
  {
    quote: "El servicio de spa es increíble. Mi gata Luna suele ser muy nerviosa, pero aquí la tratan con tanta paciencia que vuelve a casa feliz.",
    author: "Carlos T.",
    pet: "Dueño de Luna (Gata Persa)"
  }
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-slate-600">Historias reales de dueños felices y mascotas saludables.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonialsData.map((item, index) => (
            <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
              <p className="text-slate-700 italic mb-6">"{item.quote}"</p>
              <div>
                <p className="font-bold text-slate-900">{item.author}</p>
                <p className="text-xs text-slate-500">{item.pet}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}