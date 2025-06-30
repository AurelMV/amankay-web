import AppLayoutAdmin from '@/layouts/admin/app-layout-admin';
import axios from 'axios';
import { Edit, Plus, Save, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Configuración global para que axios use el token CSRF de la meta etiqueta
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
}

// Tipos TypeScript
interface Habitacion {
    id: number;
    numero: string;
    tipo: 'simple' | 'doble' | 'matrimonial';
    descripcion?: string;
    precio_noche: number;
    estado: 'disponible' | 'ocupada' | 'mantenimiento';
    capacidad: number;
    imagen_url?: string | null;
}

interface FormData {
    numero: string;
    tipo: 'simple' | 'doble' | 'matrimonial';
    descripcion: string;
    precio_noche: string;
    estado: 'disponible' | 'ocupada' | 'mantenimiento';
    capacidad: string;
    imagen?: File | null;
}

const HabitacionesManager: React.FC = () => {
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        numero: '',
        tipo: 'simple',
        descripcion: '',
        precio_noche: '',
        estado: 'disponible',
        capacidad: '1',
        imagen: null,
    });

    // Cargar habitaciones al montar el componente
    useEffect(() => {
        fetchHabitaciones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchHabitaciones = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/habitaciones/catalogo');
            const result = response.data;

            if (result.success) {
                setHabitaciones(result.data);
            } else {
                alert('Error al cargar habitaciones');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (habitacion: Habitacion) => {
        setEditingId(habitacion.id);
        setFormData({
            numero: habitacion.numero,
            tipo: habitacion.tipo,
            descripcion: habitacion.descripcion || '',
            precio_noche: habitacion.precio_noche.toString(),
            estado: habitacion.estado,
            capacidad: habitacion.capacidad.toString(),
            imagen: null,
        });
    };

    const handleUpdate = async () => {
        if (!editingId) return;

        try {
            setLoading(true);
            const formDataToSend = new FormData();

            formDataToSend.append('numero', formData.numero);
            formDataToSend.append('tipo', formData.tipo);
            formDataToSend.append('descripcion', formData.descripcion);
            formDataToSend.append('precio_noche', formData.precio_noche);
            formDataToSend.append('estado', formData.estado);
            formDataToSend.append('capacidad', formData.capacidad);
            formDataToSend.append('_method', 'PUT');

            if (formData.imagen) {
                formDataToSend.append('imagen', formData.imagen);
            }

            const response = await axios.post(`/habitaciones/${editingId}`, formDataToSend);
            const data = response.data;

            if (data.success) {
                await fetchHabitaciones();
                setEditingId(null);
                resetForm();
                alert('Habitación actualizada correctamente');
            } else {
                alert('Error al actualizar: ' + (data.error || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Estás seguro de eliminar esta habitación?')) return;

        try {
            setLoading(true);
            const response = await axios.delete(`/habitaciones/${id}`);
            const data = response.data;

            if (data.success) {
                await fetchHabitaciones();
                alert('Habitación eliminada correctamente');
            } else {
                alert('Error al eliminar: ' + (data.error || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            setLoading(true);
            const formDataToSend = new FormData();

            formDataToSend.append('numero', formData.numero);
            formDataToSend.append('tipo', formData.tipo);
            formDataToSend.append('descripcion', formData.descripcion);
            formDataToSend.append('precio_noche', formData.precio_noche);
            formDataToSend.append('estado', formData.estado);
            formDataToSend.append('capacidad', formData.capacidad);

            if (formData.imagen) {
                formDataToSend.append('imagen', formData.imagen);
            }

            const response = await axios.post('/habitaciones', formDataToSend);
            const data = response.data;

            if (data.success) {
                await fetchHabitaciones();
                setShowForm(false);
                resetForm();
                alert('Habitación creada correctamente');
            } else {
                alert('Error al crear: ' + (data.error || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            numero: '',
            tipo: 'simple',
            descripcion: '',
            precio_noche: '',
            estado: 'disponible',
            capacidad: '1',
            imagen: null,
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowForm(false);
        resetForm();
    };

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'disponible':
                return 'text-green-600 bg-green-100';
            case 'ocupada':
                return 'text-red-600 bg-red-100';
            case 'mantenimiento':
                return 'text-yellow-600 bg-yellow-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const breadcrumbs = [
        {
            title: 'Habitaciones',
            href: '/admin/habitaciones',
        },
    ];
    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <div className="mx-auto max-w-7xl bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">Gestión de Habitaciones</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus size={20} />
                        Nueva Habitación
                    </button>
                </div>

                {/* Formulario de nueva habitación */}
                {showForm && (
                    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black text-black">
                        <div className="w-full max-w-md rounded-lg bg-white p-6">
                            <h2 className="mb-4 text-xl font-bold">Nueva Habitación</h2>
                            <div className="space-y-4">
                                <label>Número de habitación</label>
                                <input
                                    type="text"
                                    placeholder="Número de habitación"
                                    value={formData.numero}
                                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                                    className="w-full rounded border p-2"
                                />
                                <label>Tipo de habitación</label>
                                <select
                                    value={formData.tipo}
                                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'simple' | 'doble' | 'matrimonial' })}
                                    className="w-full rounded border p-2"
                                >
                                    <option value="simple">Simple</option>
                                    <option value="doble">Doble</option>
                                    <option value="matrimonial">Matrimonial</option>
                                </select>
                                <label>Descripción</label>
                                <textarea
                                    placeholder="Descripción"
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    className="w-full rounded border p-2"
                                    rows={3}
                                />
                                <label>Precio por noche</label>
                                <input
                                    type="number"
                                    placeholder="Precio por noche"
                                    value={formData.precio_noche}
                                    onChange={(e) => setFormData({ ...formData, precio_noche: e.target.value })}
                                    className="w-full rounded border p-2"
                                />
                                <label>Estado</label>
                                <select
                                    value={formData.estado}
                                    onChange={(e) =>
                                        setFormData({ ...formData, estado: e.target.value as 'disponible' | 'ocupada' | 'mantenimiento' })
                                    }
                                    className="w-full rounded border p-2"
                                >
                                    <option value="disponible">Disponible</option>
                                    <option value="ocupada">Ocupada</option>
                                    <option value="mantenimiento">Mantenimiento</option>
                                </select>
                                <label>Capacidad</label>
                                <input
                                    type="number"
                                    placeholder="Capacidad"
                                    value={formData.capacidad}
                                    onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                                    className="w-full rounded border p-2"
                                />
                                <label>Imagen</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, imagen: e.target.files?.[0] || null })}
                                    className="w-full rounded border p-2"
                                />
                            </div>
                            <div className="mt-6 flex gap-2">
                                <button onClick={handleCreate} className="flex-1 rounded bg-green-600 py-2 text-white hover:bg-green-700">
                                    Crear
                                </button>
                                <button onClick={handleCancel} className="flex-1 rounded bg-gray-500 py-2 text-white hover:bg-gray-600">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabla de habitaciones */}
                <div className="overflow-x-auto rounded-lg text-black shadow-lg">
                    <table className="w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Número</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacidad</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {habitaciones.map((habitacion) => (
                                <tr key={habitacion.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{habitacion.id}</td>
                                    <td className="px-6 py-4">
                                        {editingId === habitacion.id ? (
                                            <input
                                                type="text"
                                                value={formData.numero}
                                                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                                                className="w-full rounded border p-1 text-sm"
                                            />
                                        ) : (
                                            <span className="text-sm font-medium text-gray-900">{habitacion.numero}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === habitacion.id ? (
                                            <select
                                                value={formData.tipo}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, tipo: e.target.value as 'simple' | 'doble' | 'matrimonial' })
                                                }
                                                className="w-full rounded border p-1 text-sm"
                                            >
                                                <option value="simple">Simple</option>
                                                <option value="doble">Doble</option>
                                                <option value="matrimonial">Matrimonial</option>
                                            </select>
                                        ) : (
                                            <span className="text-sm text-gray-900 capitalize">{habitacion.tipo}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === habitacion.id ? (
                                            <textarea
                                                value={formData.descripcion}
                                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                                className="w-full rounded border p-1 text-sm"
                                                rows={2}
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-600">{habitacion.descripcion || 'Sin descripción'}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === habitacion.id ? (
                                            <input
                                                type="number"
                                                value={formData.precio_noche}
                                                onChange={(e) => setFormData({ ...formData, precio_noche: e.target.value })}
                                                className="w-full rounded border p-1 text-sm"
                                            />
                                        ) : (
                                            <span className="text-sm font-semibold text-green-600">${habitacion.precio_noche}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === habitacion.id ? (
                                            <select
                                                value={formData.estado}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, estado: e.target.value as 'disponible' | 'ocupada' | 'mantenimiento' })
                                                }
                                                className="w-full rounded border p-1 text-sm"
                                            >
                                                <option value="disponible">Disponible</option>
                                                <option value="ocupada">Ocupada</option>
                                                <option value="mantenimiento">Mantenimiento</option>
                                            </select>
                                        ) : (
                                            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getEstadoColor(habitacion.estado)}`}>
                                                {habitacion.estado}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === habitacion.id ? (
                                            <input
                                                type="number"
                                                value={formData.capacidad}
                                                onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                                                className="w-full rounded border p-1 text-sm"
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-900">{habitacion.capacidad}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === habitacion.id ? (
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setFormData({ ...formData, imagen: e.target.files?.[0] || null })}
                                                className="text-xs"
                                            />
                                        ) : habitacion.imagen_url ? (
                                            <img src={habitacion.imagen_url} alt="Habitación" className="h-12 w-12 rounded object-cover" />
                                        ) : (
                                            <span className="text-xs text-gray-400">Sin imagen</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            {editingId === habitacion.id ? (
                                                <>
                                                    <button onClick={handleUpdate} className="text-green-600 hover:text-green-800">
                                                        <Save size={16} />
                                                    </button>
                                                    <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800">
                                                        <X size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEdit(habitacion)} className="text-blue-600 hover:text-blue-800">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(habitacion.id)} className="text-red-600 hover:text-red-800">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {habitaciones.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-lg text-gray-500">No hay habitaciones registradas</p>
                        <button onClick={() => setShowForm(true)} className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                            Crear primera habitación
                        </button>
                    </div>
                )}
            </div>
        </AppLayoutAdmin>
    );
};

export default HabitacionesManager;
