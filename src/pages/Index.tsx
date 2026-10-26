import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import RecentBlogs from '@/components/RecentBlogs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Web Development & UX/UI Studio"
        description="Aman UX Studio is a premium digital agency specializing in modern web development, WordPress solutions, UI/UX design, and SEO optimization."
      />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <Testimonials />
      <RecentBlogs />
      <Contact />
      <Footer />
    </div>
  );
}
