const images = [
  { src: "/img/gallery1.jpg", alt: "Foto 1" },
  { src: "/img/gallery2.jpg", alt: "Foto 2" },
  { src: "/img/gallery3.jpg", alt: "Foto 3" },
  { src: "/img/gallery4.jpg", alt: "Foto 4" },
  { src: "/img/gallery5.jpg", alt: "Foto 5" },
  { src: "/img/gallery6.jpg", alt: "Foto 6" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-[#003366] mb-10 tracking-tight drop-shadow">
          Galería
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
