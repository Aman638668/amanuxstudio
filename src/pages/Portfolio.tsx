
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import PortfolioComponent from '@/components/Portfolio';

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navigation />
            <PageHeader
                title="Our Work"
                description="Explore our portfolio of successful projects and digital transformations."
            />

            <main className="flex-grow">
                <PortfolioComponent />
            </main>

            <Footer />
        </div>
    );
}
