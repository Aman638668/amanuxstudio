import { lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Loader2 } from 'lucide-react';
import { usePageTracking } from './hooks/use-page-tracking';

// Lazy load route pages for performance & minimal bundle size
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const Resume = lazy(() => import('./pages/Resume'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Editor = lazy(() => import('./pages/Editor'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
  </div>
);

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
);

const AppContent = () => {
  usePageTracking();
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />

        {/* Blog Pages */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/category/:slug" element={<CategoryPage />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<DashboardWrapper><Dashboard /></DashboardWrapper>} />
        <Route path="/dashboard/editor" element={<DashboardWrapper><Editor /></DashboardWrapper>} />
        <Route path="/dashboard/editor/:id" element={<DashboardWrapper><Editor /></DashboardWrapper>} />
        <Route path="/login" element={<Login />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
