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

const serviciosHabitacion = [
  "Desayuno incluido",
  "Agua caliente",
  "Limpieza diaria",
  "WiFi gratis",
  "TV por cable",
  "Baño privado"
];

const Rooms: React.FC = () => {
  const { auth, success, errors } = usePage<PageProps>().props;
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHabitacion, setSelectedHabitacion] = useState<Habitacion | null>(null);
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [fechaFin, setFechaFin] = useState<string>('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [nombresPersonas, setNombresPersonas] = useState<string[]>(['']);
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [telefono, setTelefono] = useState('');
  const [documento, setDocumento] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    fetchHabitaciones();
  }, []);

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

  const openModal = (habitacion: Habitacion) => {
    setSelectedHabitacion(habitacion);
    setFechaInicio('');
    setFechaFin('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHabitacion(null);
    setFechaInicio('');
    setFechaFin('');
  };

  const handleReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) {
      alert('Debes iniciar sesión para realizar una reserva.');
      return;
    }
    if (!fechaInicio || !fechaFin) {
      alert('Por favor selecciona fechas de inicio y fin.');
      return;
    }
    setMostrarFormulario(true);
  };

  // Cuando cambia la cantidad de personas
  const handleCantidadPersonas = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    setCantidadPersonas(value);
    setNombresPersonas((prev) => {
      const nuevos = [...prev];
      while (nuevos.length < value) nuevos.push('');
      while (nuevos.length > value) nuevos.pop();
      return nuevos;
    });
  };

  // Cuando cambia el nombre de una persona
  const handleNombrePersona = (idx: number, value: string) => {
    setNombresPersonas((prev) => {
      const nuevos = [...prev];
      nuevos[idx] = value;
      return nuevos;
    });
  };

  const handleDetalleReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHabitacion || !auth.user) return;

    router.post('/reservas', {
      user_id: auth.user.id,
      habitacion_id: selectedHabitacion.id,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      nombres_personas: nombresPersonas.join(','),
      metodo_pago: metodoPago,
      telefono,
      documento,
    }, {
      onSuccess: () => {
        setMostrarFormulario(false);
        closeModal();
        setMensajeExito('¡Reserva realizada con éxito! Pronto nos pondremos en contacto contigo.');
        setTimeout(() => setMensajeExito(''), 4000);
      },
    });
  };

  return (
    <section className="bg-gray-50 p-8 min-h-screen">
      <h2 className="mb-6 text-center text-3xl font-bold text-black">Nuestras Habitaciones</h2>
      {mensajeExito && (
        <div className="mb-4 mx-auto max-w-md rounded bg-green-100 text-green-800 p-4 text-center shadow">
          {mensajeExito}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {habitaciones.map((hab) => (
          <div key={hab.id} className="overflow-hidden rounded-lg bg-white shadow hover:shadow-lg transition-shadow">
            {hab.imagen_url ? (
              <img src={hab.imagen_url} alt={`Habitación ${hab.numero}`} className="h-48 w-full object-cover" />
            ) : (
              <div className="flex h-48 w-full items-center justify-center bg-gray-200 text-gray-500">Sin imagen</div>
            )}
            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">
                Hab. {hab.numero} - {hab.tipo}
              </h3>
              <p className="text-sm text-gray-600">Capacidad: {hab.capacidad} personas</p>
              <p className="mb-2 text-sm text-gray-600">Estado: {hab.estado}</p>
              <p className="mb-2 text-lg font-bold text-blue-700">S/. {Number(hab.precio_noche).toFixed(2)} por noche</p>
              <button
                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 w-full"
                onClick={() => openModal(hab)}
                disabled={hab.estado !== 'disponible'}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedHabitacion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeModal}
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-2 text-blue-800">
              Hab. {selectedHabitacion.numero} - {selectedHabitacion.tipo}
            </h3>
            <img
              src={selectedHabitacion.imagen_url || ''}
              alt={`Habitación ${selectedHabitacion.numero}`}
              className="h-40 w-full object-cover mb-2 rounded"
            />
            <div className="mb-2">
              <span className="font-semibold">Capacidad:</span> {selectedHabitacion.capacidad} personas
            </div>
            <div className="mb-2">
              <span className="font-semibold">Estado:</span> {selectedHabitacion.estado}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Precio por noche:</span> S/. {Number(selectedHabitacion.precio_noche).toFixed(2)}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Servicios:</span>
              <ul className="list-disc ml-6 text-gray-700 text-sm">
                {serviciosHabitacion.map((serv, idx) => (
                  <li key={idx}>{serv}</li>
                ))}
              </ul>
            </div>
            {!mostrarFormulario ? (
              <form onSubmit={handleReserva}>
                <div className="my-4">
                  <label className="block text-sm font-semibold text-black">Fecha inicio</label>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="rounded border px-2 py-1 text-black w-full"
                  />
                  <label className="block text-sm font-semibold text-black mt-2">Fecha fin</label>
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="rounded border px-2 py-1 text-black w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                  disabled={selectedHabitacion.estado !== 'disponible'}
                >
                  Reservar
                </button>
              </form>
            ) : (
              <form onSubmit={handleDetalleReserva}>
                <div className="my-4">
                  <label className="block text-sm font-semibold text-black">Cantidad de personas</label>
                  <input
                    type="number"
                    min={1}
                    max={selectedHabitacion?.capacidad || 10}
                    value={cantidadPersonas}
                    onChange={handleCantidadPersonas}
                    className="rounded border px-2 py-1 text-black w-full"
                    required
                  />
                  {nombresPersonas.map((nombre, idx) => (
                    <div key={idx} className="mt-2">
                      <label className="block text-sm">Nombre persona {idx + 1}</label>
                      <input
                        type="text"
                        value={nombre}
                        onChange={e => handleNombrePersona(idx, e.target.value)}
                        className="rounded border px-2 py-1 text-black w-full"
                        required
                      />
                    </div>
                  ))}
                  <label className="block text-sm font-semibold text-black mt-2">Método de pago</label>
                  <select
                    value={metodoPago}
                    onChange={e => setMetodoPago(e.target.value)}
                    className="rounded border px-2 py-1 text-black w-full"
                    required
                  >
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                  </select>
                  <label className="block text-sm font-semibold text-black mt-2">Teléfono</label>
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="rounded border px-2 py-1 text-black w-full"
                  />
                  <label className="block text-sm font-semibold text-black mt-2">Documento</label>
                  <input
                    type="text"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    className="rounded border px-2 py-1 text-black w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Confirmar Reserva
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Rooms;
