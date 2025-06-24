import { Head } from '@inertiajs/react'; // or the correct path to Head component

const Reservar = () => {
  const handleReserva = async () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    try {
      const response = await fetch('/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || '',
        },
        body: JSON.stringify({
          id_usuario: 1,
          id_habitacion: 2,
          fecha_inicio: "2025-06-10",
          fecha_fin: "2025-06-12",
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la reserva');
      }

      const data = await response.json();
      console.log('✅ Reserva exitosa:', data);
    } catch (error) {
      console.error('❌ Error al hacer la reserva:', error);
    }
  };

  return (
    <>
      <Head title="Reservar" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Reservar Habitación</h1>
        <button
          onClick={handleReserva}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reservar ahora
        </button>
      </div>
    </>
  );
};

export default Reservar;
