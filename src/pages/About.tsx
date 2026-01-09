
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import AboutComponent from '@/components/About'; // Re-using existing content component

export default function About() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navigation />
            <PageHeader
                title="About Us"
                description="We are a digital agency passionate about creating beautiful, functional, and user-centric digital experiences."
            />

            <main className="flex-grow">
                {/* Reusing the About Section logic but maybe without the ID for scroll */}
                <AboutComponent />
            </main>

            <Footer />
        </div>
    );
}
