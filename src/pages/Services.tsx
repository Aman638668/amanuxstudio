
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import ServicesComponent from '@/components/Services';

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navigation />
            <PageHeader
                title="Our Services"
                description="Comprehensive digital solutions tailored to your business needs. From concept to launch, we've got you covered."
            />

            <main className="flex-grow">
                <ServicesComponent />
            </main>

            <Footer />
        </div>
    );
}
