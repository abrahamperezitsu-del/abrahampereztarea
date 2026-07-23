const servicesData = [
  {
    icon: "🩺",
    title: "Consulta General",
    description: "Chequeos de rutina, diagnóstico temprano y planes de nutrición personalizados para que tu mascota viva más y mejor."
  },
  {
    icon: "💉",
    title: "Vacunación y Control",
    description: "Mantenemos al día el esquema de salud de tu peludo para protegerlo eficazmente de enfermedades comunes y parásitos."
  },
  {
    icon: "✂️",
    title: "Estética y Spa",
    description: "Baños medicados, cortes de raza, limpieza dental y corte de uñas. ¡Saldrán limpios, relajados y oliendo delicioso!"
  },
  {
    icon: "🏥",
    title: "Cirugía y Hospitalización",
    description: "Quirófanos equipados con tecnología de punta para intervenciones seguras, con monitoreo constante durante la recuperación."
  },
  {
    icon: "🚑",
    title: "Emergencias 24/7",
    description: "Los imprevistos no tienen horario. Estamos siempre listos para atender urgencias a cualquier hora del día o de la noche."
  }
];

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Nuestros Servicios</h2>
          <p className="text-slate-600">Todo lo que tu mascota necesita para vivir una vida sana y feliz bajo un mismo techo.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}

          {/* Tarjeta destacada Fear Free */}
          <div className="bg-green-600 text-white p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">Trato "Fear Free"</h3>
              <p className="text-green-100 text-sm leading-relaxed">
                Utilizamos técnicas especiales científicamente probadas para reducir al mínimo el estrés y la ansiedad de tu mascota.
              </p>
            </div>
            <a 
              href="https://wa.me/584129209843" 
              target="_blank" 
              rel="noreferrer" 
              className="mt-6 inline-block bg-white text-green-700 font-semibold px-4 py-2 rounded-lg text-center hover:bg-green-50 transition"
            >
              Pregúntanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}