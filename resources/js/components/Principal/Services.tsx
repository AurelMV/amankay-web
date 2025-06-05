const services = [
  {
    name: "Wifi Gratis",
    icon: (
      <svg
        className="w-10 h-10 mx-auto mb-4 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M2.05 7.05a16 16 0 0 1 19.9 0M5.5 10.5a11 11 0 0 1 13 0M8.88 13.88a6 6 0 0 1 6.24 0M12 18h.01" />
      </svg>
    ),
  },
  {
    name: "Desayuno Incluido",
    icon: (
      <svg
        className="w-10 h-10 mx-auto mb-4 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="6" />
        <path d="M5 12h14" />
      </svg>
    ),
  },
  {
    name: "Recepción 24h",
    icon: (
      <svg
        className="w-10 h-10 mx-auto mb-4 text-green-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-[#003366] mb-10 tracking-tight drop-shadow">
          Servicios
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-blue-200 hover:border-blue-400"
            >
              {service.icon}
              <span className="block text-xl font-semibold text-gray-800">
                {service.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
