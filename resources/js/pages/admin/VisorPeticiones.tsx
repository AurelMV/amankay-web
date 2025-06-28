import AppLayoutAdmin from '@/layouts/admin/app-layout-admin';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Reserva {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
    habitacion: {
        id: number;
        numero: string;
    } | null;
    fecha_inicio: string;
    fecha_fin: string;
    estado: string;
    fecha_reserva: string;
}

type Props = {
    reservas: Reserva[];
};
const breadcrumbs = [
    {
        title: 'Peticiones',
        href: '/admin/reservas',
    },
];
export default function VisorPeticiones({ reservas }: Props) {
    const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);

    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <div className="p-6">
                <Head title="Peticiones de Reserva" />
                <h1 className="mb-4 text-2xl font-bold">Peticiones de Reserva</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border bg-white text-black">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Usuario</th>
                                <th className="border px-4 py-2">Habitación</th>
                                <th className="border px-4 py-2">Fecha Inicio</th>
                                <th className="border px-4 py-2">Fecha Fin</th>
                                <th className="border px-4 py-2">Estado</th>
                                <th className="border px-4 py-2">Fecha Reserva</th>
                                <th className="border px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas && reservas.length > 0 ? (
                                reservas.map((reserva) => (
                                    <tr key={reserva.id}>
                                        <td className="border px-4 py-2">{reserva.id}</td>
                                        <td className="border px-4 py-2">{reserva.user?.name ?? 'Sin usuario'}</td>
                                        <td className="border px-4 py-2">{reserva.habitacion?.numero ?? 'Sin habitación'}</td>
                                        <td className="border px-4 py-2">{reserva.fecha_inicio}</td>
                                        <td className="border px-4 py-2">{reserva.fecha_fin}</td>
                                        <td className="border px-4 py-2">{reserva.estado}</td>
                                        <td className="border px-4 py-2">{reserva.fecha_reserva}</td>
                                        <td className="border px-4 py-2">
                                            <button className="rounded bg-blue-500 px-2 py-1 text-white" onClick={() => setSelectedReserva(reserva)}>
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="border px-4 py-2 text-center">
                                        No hay reservas registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {selectedReserva && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="min-w-[300px] rounded-lg bg-white p-6 text-black">
                            <h2 className="mb-2 text-xl font-bold">Datos de la reserva</h2>
                            <p>
                                <strong>ID:</strong> {selectedReserva.id}
                            </p>
                            <p>
                                <strong>Usuario:</strong> {selectedReserva.user?.name ?? 'Sin usuario'}
                            </p>
                            <p>
                                <strong>Email usuario:</strong> {selectedReserva.user?.email ?? '-'}
                            </p>
                            <p>
                                <strong>Habitación:</strong> {selectedReserva.habitacion?.numero ?? 'Sin habitación'}
                            </p>
                            <p>
                                <strong>Fecha inicio:</strong> {selectedReserva.fecha_inicio}
                            </p>
                            <p>
                                <strong>Fecha fin:</strong> {selectedReserva.fecha_fin}
                            </p>
                            <p>
                                <strong>Estado:</strong> {selectedReserva.estado}
                            </p>
                            <p>
                                <strong>Fecha reserva:</strong> {selectedReserva.fecha_reserva}
                            </p>
                            <button className="mt-4 rounded bg-gray-500 px-4 py-2 text-white" onClick={() => setSelectedReserva(null)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayoutAdmin>
    );
}
