import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  backgroundImage?: string; // Añade esta línea
}

export default function AuthLayout({ 
  title, 
  description, 
  children,
  backgroundImage = '/images/default-background.jpg' // Valor por defecto
}: AuthLayoutProps) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Head title={title} />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      {children}
    </div>
  );
}