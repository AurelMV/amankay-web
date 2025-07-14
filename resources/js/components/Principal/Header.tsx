import { router, usePage } from '@inertiajs/react';
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
    [key: string]: unknown;
}

const Header = () => {
    const { auth } = usePage<PageProps>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <header className="fixed z-20 w-full bg-white/80 shadow-md backdrop-blur transition">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <h1 className="text-2xl font-extrabold tracking-tight text-blue-900 drop-shadow-sm">
                    <span className="text-green-400">Amankay</span> Inn
                </h1>
                <nav className="flex items-center space-x-2 md:space-x-6">
                    {[
                        { href: '#hero', label: 'Home' },
                        { href: '#rooms', label: 'Habitaciones' },
                        { href: '#services', label: 'Servicios' },
                        { href: '#gallery', label: 'Galería' },
                    ].map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="relative px-2 py-1 font-semibold text-blue-900 transition after:block after:h-0.5 after:origin-left after:scale-x-0 after:bg-yellow-400 after:transition-transform after:duration-300 after:content-[''] hover:text-yellow-500 hover:after:scale-x-100"
                        >
                            {item.label}
                        </a>
                    ))}

                    {auth.user ? (
                        // Usuario autenticado - mostrar menú de usuario
                        <div className="relative ml-4">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center space-x-2 rounded-full bg-yellow-400 px-4 py-2 font-bold text-blue-900 shadow transition duration-300 hover:bg-yellow-500"
                            >
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-900 text-xs font-bold text-white">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </span>
                                <span>{auth.user.name}</span>
                                <svg
                                    className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                                    <div className="border-b px-4 py-2 text-sm text-gray-700">
                                        <div className="font-semibold">{auth.user.name}</div>
                                        <div className="text-gray-500">{auth.user.email}</div>
                                        {auth.user.roles && auth.user.roles.length > 0 && (
                                            <div className="mt-1 text-xs text-blue-600">{auth.user.roles.join(', ')}</div>
                                        )}
                                    </div>

                                    {auth.user.roles?.includes('admin') ? (
                                        <a href="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Panel de Administración
                                        </a>
                                    ) : (
                                        <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Mi Panel
                                        </a>
                                    )}

                                    <a href="/settings/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Configuración
                                    </a>

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
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
                            className="ml-4 rounded-full bg-yellow-400 px-4 py-2 font-bold text-blue-900 shadow transition duration-300 hover:bg-yellow-500"
                        >
                            Inicio Sesión
                        </a>
                    )}
                </nav>
            </div>

            {/* Overlay para cerrar el menú al hacer clic fuera */}
            {isMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />}
        </header>
    );
};

export default Header;
