import Navbar from '@/components/Navbar';
import About from '@/sections/About';
import Hero from '@/sections/Hero';
import WhyUs from '@/sections/WhyChoseUs';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WhyUs />
    </>
  );
}
