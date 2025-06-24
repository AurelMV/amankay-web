import { useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayoutAdmin from "@/layouts/admin/app-layout-admin";

const breadcrumbs = [
    {
        title: "Usuarios",
        href: "/admin/usuarios",
    },
];

type User = {
    id: number;
    name: string;
    email: string;
    // agrega más campos si necesitas
};

type Props = {
    users: User[];
};

export default function UsersIndex({ users }: Props) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="bg-white flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-black text-2xl font-bold mb-4">Usuarios</h1>
                <table className="min-w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-black border px-4 py-2">ID</th>
                            <th className="text-black border px-4 py-2">Nombre</th>
                            <th className="text-black border px-4 py-2">Email</th>
                            <th className="text-black border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="text-black border px-4 py-2">{user.id}</td>
                                <td className="text-black border px-4 py-2">{user.name}</td>
                                <td className="text-black border px-4 py-2">{user.email}</td>
                                <td className="text-black border px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg p-6 min-w-[300px] text-black">
                        <h2 className="text-xl font-bold mb-2">Datos del usuario</h2>
                        <p><strong>ID:</strong> {selectedUser.id}</p>
                        <p><strong>Nombre:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        {/* Agrega más campos si necesitas */}
                        <button
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={() => setSelectedUser(null)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </AppLayoutAdmin>
    );
}