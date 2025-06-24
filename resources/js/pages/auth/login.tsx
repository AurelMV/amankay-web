import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Separator } from "@/components/ui/separator";

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = route('auth.social', { provider: 'google' });
    };

    const handleFacebookLogin = () => {
        window.location.href = route('auth.social', { provider: 'facebook' });
    };

    return (
        <AuthLayout 
            title="Bienvenido al Amankay" 
            description="Ingrese a su cuenta para disfrutar de nuestros servicios exclusivos"
            backgroundImage="img/room2.jpg" // Añadir imagen de fondo del hotel
        >
            <Head title="Acceso - Hotel Amankay" />

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-200 max-w-md w-full">
                {status && (
                    <div className="mb-6 p-4 bg-emerald-100 text-emerald-800 rounded-lg text-center">
                        {status}
                    </div>
                )}

                <h2 className="text-3xl font-serif font-bold text-amber-800 mb-2 text-center">Te da la bienvenida Amakay</h2>
                <p className="text-gray-600 mb-8 text-center">Por favor ingrese sus credenciales</p>

                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="ejemplo@dominio.com"
                                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 text-black"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Label htmlFor="password" className="text-gray-700 font-medium">Contraseña</Label>
                                {canResetPassword && (
                                    <TextLink 
                                        href={route('password.request')} 
                                        className="ml-auto text-sm text-amber-700 hover:text-amber-800" 
                                        tabIndex={5}
                                    >
                                        ¿Olvidó su contraseña?
                                    </TextLink>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 text-black"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                tabIndex={3}
                                className="border-gray-300 text-amber-600 focus:ring-amber-500"
                            />
                            <Label htmlFor="remember" className="text-gray-700">Recordar mis datos</Label>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition-colors duration-300" 
                            tabIndex={4} 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Ingresar
                        </Button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-3 text-sm text-gray-500">
                                O continuar con
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full border-gray-300 hover:bg-gray-50"
                            tabIndex={5}
                        >
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={handleFacebookLogin}
                            className="w-full border-gray-300 hover:bg-gray-50"
                            tabIndex={6}
                        >
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                            </svg>
                            Facebook
                        </Button>
                    </div>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                    ¿No tiene una cuenta?{' '}
                    <TextLink 
                        href={route('register')} 
                        className="text-amber-700 hover:text-amber-800 font-medium" 
                        tabIndex={7}
                    >
                        Regístrese aquí
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}