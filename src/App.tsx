
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CategoryPage from './pages/CategoryPage';
import { usePageTracking } from './hooks/use-page-tracking';

const queryClient = new QueryClient();


const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  // Force removal of "dark" class when on public pages
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return <>{children}</>;
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => (
  // ThemeProvider ONLY for Dashboard, managing the class
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
);

const AppContent = () => {
  usePageTracking();
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />

      {/* Blog Routes - Kept Separate */}
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
      <Route path="/category/:slug" element={<PublicLayout><CategoryPage /></PublicLayout>} />

      {/* Wrap Dashboard routes with ThemeProvider */}
      <Route path="/dashboard" element={<DashboardWrapper><Dashboard /></DashboardWrapper>} />
      <Route path="/dashboard/editor" element={<DashboardWrapper><Editor /></DashboardWrapper>} />
      <Route path="/dashboard/editor/:id" element={<DashboardWrapper><Editor /></DashboardWrapper>} />

      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

