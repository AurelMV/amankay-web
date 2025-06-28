import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';

interface Habitacion {
    id: number;
    numero: string;
    tipo: string;
    precio_noche: number;
    capacidad: number;
    estado: string;
    imagen_url: string | null;
}

interface PageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      roles?: string[];
    } | null;
  };
  success?: string;
  errors?: Record<string, string>;
  [key: string]: unknown;
}

const Rooms: React.FC = () => {
  const { auth, success, errors } = usePage<PageProps>().props;
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [fechaFin, setFechaFin] = useState<string>('');

    useEffect(() => {
        fetchHabitaciones();
    }, []);

    // Mostrar mensajes de éxito o error
    useEffect(() => {
        if (success) {
            alert('✅ ' + success);
        }
        if (errors?.message) {
            alert('❌ ' + errors.message);
        }
    }, [success, errors]);

    const fetchHabitaciones = () => {
        fetch('/api/habitaciones')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setHabitaciones(data.data);
                }
            });
    };

  const handleReserva = async (habitacionId: number) => {
    // Verificar si el usuario está autenticado
    if (!auth.user) {
      alert('Debes iniciar sesión para realizar una reserva.');
      return;
    }

    if (!fechaInicio || !fechaFin) {
      alert('Por favor selecciona fechas de inicio y fin.');
      return;
    }

    // Usar router.post de Inertia que maneja automáticamente CSRF
    router.post('/reservas', {
      user_id: auth.user.id,
      habitacion_id: habitacionId,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    });
  };

    return (
        <section className="bg-gray-50 p-8">
            <h2 className="mb-6 text-center text-3xl font-bold text-black">Nuestras Habitaciones</h2>

            <div className="mb-8 flex justify-center gap-4">
                <div>
                    <label className="block text-sm font-semibold text-black">Fecha inicio</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        className="rounded border px-2 py-1 text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-black">Fecha fin</label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        className="rounded border px-2 py-1 text-black"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {habitaciones.map((hab) => (
                    <div key={hab.id} className="overflow-hidden rounded-lg bg-white shadow">
                        {hab.imagen_url ? (
                            <img src={hab.imagen_url} alt={`Habitación ${hab.numero}`} className="h-48 w-full object-cover" />
                        ) : (
                            <div className="flex h-48 w-full items-center justify-center bg-gray-200 text-gray-500">Sin imagen</div>
                        )}
                        <div className="p-4">
                            <h3 className="mb-2 text-xl font-semibold">
                                Hab. {hab.numero} - {hab.tipo}
                            </h3>
                            <p className="text-sm text-gray-600">Capacidad: {hab.capacidad}</p>
                            <p className="mb-2 text-sm text-gray-600">Estado: {hab.estado}</p>
                            <p>Precio: S/. {Number(hab.precio_noche).toFixed(2)}</p>

                            <button
                                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                onClick={() => handleReserva(hab.id)}
                                disabled={hab.estado !== 'disponible'}
                            >
                                Reservar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Rooms;
