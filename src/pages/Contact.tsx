
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import ContactComponent from '@/components/Contact';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navigation />
            <PageHeader
                title="Get in Touch"
                description="Ready to start your project? Contact us for a free consultation."
            />

            <main className="flex-grow">
                <ContactComponent />
            </main>

            <Footer />
        </div>
    );
}
