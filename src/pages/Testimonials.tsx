
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import TestimonialsComponent from '@/components/Testimonials';

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navigation />
            <PageHeader
                title="Client Stories"
                description="See what our clients say about working with Aman UX Studio."
            />

            <main className="flex-grow">
                <TestimonialsComponent />
            </main>

            <Footer />
        </div>
    );
}
