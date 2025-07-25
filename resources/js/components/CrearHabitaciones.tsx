import React, { useState } from 'react';

interface FormData {
    numero: string;
    tipo: string;
    descripcion: string;
    precio_noche: string;
    estado: string;
    capacidad: string;
    imagen: File | null;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  errors?: Record<string, string[]>;
  error?: string;
}

const HabitacionForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        numero: '',
        tipo: 'simple',
        descripcion: '',
        precio_noche: '',
        estado: 'disponible',
        capacidad: '',
        imagen: null,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Limpiar error específico al escribir
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({
            ...prev,
            imagen: file,
        }));

        if (errors.imagen) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.imagen;
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setErrors({});

        try {
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

            const response = await fetch('http://127.0.0.1:8000/habitaciones', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    Accept: 'application/json',
                },
            });

            const result: ApiResponse = await response.json();

            if (result.success) {
                setMessage({ type: 'success', text: result.message || 'Habitación creada correctamente' });
                // Resetear formulario
                setFormData({
                    numero: '',
                    tipo: 'simple',
                    descripcion: '',
                    precio_noche: '',
                    estado: 'disponible',
                    capacidad: '',
                    imagen: null,
                });
                // Limpiar el input de archivo
                const fileInput = document.getElementById('imagen') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                } else {
                    setMessage({ type: 'error', text: result.error || 'Error al crear habitación' });
                }
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error de conexión con el servidor' });
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Registrar Nueva Habitación</h2>

            {message && (
                <div
                    className={`mb-4 rounded-md p-3 ${
                        message.type === 'success'
                            ? 'border border-green-400 bg-green-100 text-green-700'
                            : 'border border-red-400 bg-red-100 text-red-700'
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="numero" className="mb-1 block text-sm font-medium text-gray-700">
                        Número de Habitación *
                    </label>
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                        maxLength={10}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.numero ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ej: 101, A-15"
                    />
                    {errors.numero && <p className="mt-1 text-sm text-red-600">{errors.numero[0]}</p>}
                </div>

                <div>
                    <label htmlFor="tipo" className="mb-1 block text-sm font-medium text-gray-700">
                        Tipo de Habitación *
                    </label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.tipo ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="simple">Simple</option>
                        <option value="doble">Doble</option>
                        <option value="matrimonial">Matrimonial</option>
                    </select>
                    {errors.tipo && <p className="mt-1 text-sm text-red-600">{errors.tipo[0]}</p>}
                </div>

                <div>
                    <label htmlFor="capacidad" className="mb-1 block text-sm font-medium text-gray-700">
                        Capacidad (personas) *
                    </label>
                    <input
                        type="number"
                        id="capacidad"
                        name="capacidad"
                        value={formData.capacidad}
                        onChange={handleInputChange}
                        min="1"
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.capacidad ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ej: 2"
                    />
                    {errors.capacidad && <p className="mt-1 text-sm text-red-600">{errors.capacidad[0]}</p>}
                </div>

                <div>
                    <label htmlFor="precio_noche" className="mb-1 block text-sm font-medium text-gray-700">
                        Precio por Noche *
                    </label>
                    <input
                        type="number"
                        id="precio_noche"
                        name="precio_noche"
                        value={formData.precio_noche}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.precio_noche ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ej: 150.00"
                    />
                    {errors.precio_noche && <p className="mt-1 text-sm text-red-600">{errors.precio_noche[0]}</p>}
                </div>

                <div>
                    <label htmlFor="estado" className="mb-1 block text-sm font-medium text-gray-700">
                        Estado
                    </label>
                    <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.estado ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="disponible">Disponible</option>
                        <option value="ocupada">Ocupada</option>
                        <option value="mantenimiento">Mantenimiento</option>
                    </select>
                    {errors.estado && <p className="mt-1 text-sm text-red-600">{errors.estado[0]}</p>}
                </div>

                <div>
                    <label htmlFor="descripcion" className="mb-1 block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        maxLength={255}
                        rows={3}
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.descripcion ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Descripción opcional de la habitación"
                    />
                    {errors.descripcion && <p className="mt-1 text-sm text-red-600">{errors.descripcion[0]}</p>}
                </div>

                <div>
                    <label htmlFor="imagen" className="mb-1 block text-sm font-medium text-gray-700">
                        Imagen de la Habitación
                    </label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/jpg"
                        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.imagen ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    <p className="mt-1 text-xs text-gray-500">Formatos permitidos: JPEG, PNG, JPG. Tamaño máximo: 5MB</p>
                    {errors.imagen && <p className="mt-1 text-sm text-red-600">{errors.imagen[0]}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full rounded-md px-4 py-3 font-medium text-white ${
                        loading
                            ? 'cursor-not-allowed bg-gray-400'
                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    } transition duration-200`}
                >
                    {loading ? 'Registrando...' : 'Registrar Habitación'}
                </button>
            </form>
        </div>
    );
};

export default HabitacionForm;
