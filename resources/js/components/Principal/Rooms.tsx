const rooms = [
  {
    img: "/img/room1.jpg",
    alt: "Simple",
    title: "Habitación Simple",
    desc: "Cómoda para una persona, con baño privado y Wi-Fi.",
  },
  {
    img: "/img/room2.jpg",
    alt: "Doble",
    title: "Habitación Doble",
    desc: "Ideal para dos personas, con TV por cable y desayuno.",
  },
  {
    img: "/img/room3.jpg",
    alt: "Matrimonial",
    title: "Habitación Matrimonial",
    desc: "Perfecta para parejas, con vista a la ciudad.",
  },
];

const Rooms = () => {
  return (
    <section id="rooms" className="py-20 bg-gradient-to-b from-gray-100 via-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-[#003366] mb-10 tracking-tight drop-shadow">
          Habitaciones
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {rooms.map((room, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 border-t-4 border-blue-200 hover:border-blue-400 flex flex-col items-center"
            >
              <img
                src={room.img}
                alt={room.alt}
                className="w-full h-48 object-cover rounded-2xl mb-4 shadow-md transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <h3 className="text-2xl font-bold mb-2 text-blue-900">{room.title}</h3>
              <p className="text-gray-600 mb-4">{room.desc}</p>
              <a
                href="#"
                className="mt-auto inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full shadow transition duration-300"
              >
                Reservar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
