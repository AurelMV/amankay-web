const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur shadow-md fixed w-full z-20 transition">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">
          <span className="text-yellow-400">Amankay</span> Inn
        </h1>
        <nav className="space-x-2 md:space-x-6 flex items-center">
          {[
            { href: "#hero", label: "Inicio" },
            { href: "#rooms", label: "Habitaciones" },
            { href: "#services", label: "Servicios" },
            { href: "#gallery", label: "Galería" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-2 py-1 font-semibold text-blue-900 hover:text-yellow-500 transition
                after:content-[''] after:block after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/login"
            className="ml-4 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold shadow transition duration-300"
          >
            Inicio Sesión
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
