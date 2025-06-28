import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  roles?: string[];
}

interface PageProps {
  auth: {
    user: User | null;
  };
  [key: string]: any;
}

const Header = () => {
  const { auth } = usePage<PageProps>().props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    router.post('/logout');
  };

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
          
          {auth.user ? (
            // Usuario autenticado - mostrar menú de usuario
            <div className="relative ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold shadow transition duration-300"
              >
                <span className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {auth.user.name.charAt(0).toUpperCase()}
                </span>
                <span>{auth.user.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-semibold">{auth.user.name}</div>
                    <div className="text-gray-500">{auth.user.email}</div>
                    {auth.user.roles && auth.user.roles.length > 0 && (
                      <div className="text-xs text-blue-600 mt-1">
                        {auth.user.roles.join(', ')}
                      </div>
                    )}
                  </div>
                  
                  {auth.user.roles?.includes('admin') ? (
                    <a
                      href="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Panel de Administración
                    </a>
                  ) : (
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Panel
                    </a>
                  )}
                  
                  <a
                    href="/settings/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Configuración
                  </a>
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Usuario no autenticado - mostrar botón de login
            <a
              href="/login"
              className="ml-4 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold shadow transition duration-300"
            >
              Inicio Sesión
            </a>
          )}
        </nav>
      </div>
      
      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
