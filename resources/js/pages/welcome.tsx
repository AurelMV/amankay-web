import Header from '@/components/Principal/Header';
import Hero from '@/components/Principal/Hero';
import Rooms from '@/components/Principal/Rooms';
import Services from '@/components/Principal/Services';
import Gallery from '@/components/Principal/Gallery';
import Footer from '@/components/Principal/Footer';

export default function Welcome() {
  return (
    <>
      <Header />
      <Hero />
      <Rooms />
      <Services />
      <Gallery />
      <Footer />
    </>
  );
}
