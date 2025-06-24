import React, { useEffect, useState } from 'react';

interface Habitacion {
  id: number;
  numero: string;
  tipo: string;
  precio: number;
  capacidad: number;
  estado: string;
  imagen_url: string | null;
}

const Rooms: React.FC = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [fechaFin, setFechaFin] = useState<string>('');

  useEffect(() => {
    fetchHabitaciones();
  }, []);

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
    if (!fechaInicio || !fechaFin) {
      alert('Por favor selecciona fechas de inicio y fin.');
      return;
    }

    const csrfToken =
      (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';

    try {
      const response = await fetch('/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({
          user_id: 1, // ✅ importante: usa el nombre correcto que espera Laravel
          habitacion_id: habitacionId,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('✅ Reserva realizada con éxito');
        fetchHabitaciones();
      } else {
        alert('Solicitud Enviada: ' + (result.message || ''));
      }
    } catch (error) {
      alert('❌ Error en la solicitud: ' + error);
      console.error(error);
    }
  };

  return (
    <section className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Nuestras Habitaciones</h2>

      <div className="flex gap-4 justify-center mb-8">
        <div>
          <label className="block text-sm font-semibold text-black">Fecha inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border rounded px-2 py-1 text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-black">Fecha fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border rounded px-2 py-1 text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {habitaciones.map((hab) => (
          <div key={hab.id} className="bg-white shadow rounded-lg overflow-hidden">
            {hab.imagen_url ? (
              <img
                src={hab.imagen_url}
                alt={`Habitación ${hab.numero}`}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                Sin imagen
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                Hab. {hab.numero} - {hab.tipo}
              </h3>
              <p className="text-sm text-gray-600">Capacidad: {hab.capacidad}</p>
              <p className="text-sm text-gray-600 mb-2">Estado: {hab.estado}</p>
              <p>Precio: S/. {Number(hab.precio).toFixed(2)}</p>

              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
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
