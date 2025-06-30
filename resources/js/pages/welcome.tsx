import { usePage } from '@inertiajs/react';
import Header from '@/components/Principal/Header';
import Hero from '@/components/Principal/Hero';
import Rooms from '@/components/Principal/Rooms';
import Services from '@/components/Principal/Services';
import Gallery from '@/components/Principal/Gallery';
import Footer from '@/components/Principal/Footer';

interface PageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      roles?: string[];
    } | null;
  };
  [key: string]: unknown;
}

export default function Welcome() {
  const { auth } = usePage<PageProps>().props;

  return (
    <>
      <Header />
      
      {/* Indicador de estado de autenticación (solo para desarrollo) */}
      {auth.user && (
        <div className="fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded z-50">
          <div className="text-sm font-bold">Usuario Autenticado:</div>
          <div className="text-xs">{auth.user.name} ({auth.user.roles?.join(', ')})</div>
        </div>
      )}
      
      <Hero />
      <Rooms />
      <Services />
      <Gallery />
      <Footer />
    </>
  );
}
