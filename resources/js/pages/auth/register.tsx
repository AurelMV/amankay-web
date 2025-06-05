import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout 
            title="Únase a la experiencia Amankay" 
            description="Cree su cuenta para acceder a beneficios exclusivos"
            backgroundImage="/img/gallery5.jpg"
        >
            <Head title="Registro | Hotel Amankay" />
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-amber-800 mb-2">Crear Cuenta</h1>
                    <p className="text-gray-600">Complete el formulario para comenzar su experiencia</p>
                </div>

                <form className="space-y-5" onSubmit={submit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700 font-medium">Nombre Completo</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Ej: María González"
                                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 text-black"
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="ejemplo@dominio.com"
                                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 text-black"
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Mínimo 8 caracteres"
                                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 text-black"
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-gray-700 font-medium">Confirmar Contraseña</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Repita su contraseña"
                                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 text-black"
                            />
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition-colors duration-300 shadow-md" 
                        tabIndex={5} 
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="h-5 w-5 animate-spin mr-2" />
                                Procesando...
                            </>
                        ) : (
                            'Registrarse'
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tiene una cuenta?{' '}
                    <TextLink 
                        href={route('login')} 
                        className="text-amber-700 hover:text-amber-800 font-medium" 
                        tabIndex={6}
                    >
                        Inicie sesión aquí
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}