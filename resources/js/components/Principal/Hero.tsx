const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/img/hero.jpg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 text-center px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg animate-fade-in">
          welcome<span className="text-red-400"> cusco imperial</span>
        </h2>
        <p className="text-2xl md:text-3xl text-gray-200 mb-8 animate-fade-in delay-200">
          Tu descanso perfecto en <span className="font-semibold text-yellow-300">Cusco</span>
        </p>
        <a
          href="#rooms"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 animate-fade-in delay-400"
        >
          Ver habitaciones
        </a>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1s ease forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
};

export default Hero;
