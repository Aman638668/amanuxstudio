import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import TestimonialsComponent from '@/components/Testimonials';
import Seo from '@/components/Seo';

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#09090c] text-[#eeece8] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Seo
        title="Client Reviews & Endorsements"
        description="Read what business founders and company leaders say about partnering with Aman UX Studio for web development and UI/UX."
        url="/testimonials"
      />
      <div className="ambient-grain" aria-hidden="true" />
      <Navigation />

      <PageHeader
        badge="CLIENT REVIEWS"
        title="Trusted by Founders and Growing Brands."
        description="Direct feedback from founders and business owners who rely on Aman UX Studio for high-performing digital platforms."
      />

      <main className="flex-grow">
        <TestimonialsComponent />
      </main>

      <Footer />
    </div>
  );
}
