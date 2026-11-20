import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import ContactComponent from '@/components/Contact';
import Seo from '@/components/Seo';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Seo
        title="Contact Aman UX Studio & Free Consultation"
        description="Start your web development or UI/UX project with Aman UX Studio. Work directly with Aman Sharma. Free proposal and consultation within 24 hours."
        url="/contact"
      />
      <div className="ambient-grain" aria-hidden="true" />
      <Navigation />

      <PageHeader
        badge="START A PROJECT"
        title="Let's Build Something Great Together."
        description="Tell us about your brand, requirements, and timeline. You'll receive a detailed consultation and proposal within 24 hours."
      />

      <main className="flex-grow">
        <ContactComponent />
      </main>

      <Footer />
    </div>
  );
}
