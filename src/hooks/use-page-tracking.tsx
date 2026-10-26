import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageVisit = async () => {
            // Do not track admin portal views or sensitive routes
            if (location.pathname.startsWith('/dashboard') || location.pathname === '/login') {
                return;
            }

            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

            if (!supabaseUrl || !supabaseKey) {
                return; // Silently skip if Supabase is not yet configured
            }

            try {
                await supabase.from('website_visits').insert({
                    page: location.pathname,
                    user_agent: navigator.userAgent,
                });
            } catch (error) {
                // Silently handle tracking issues to avoid interrupting user experience
                console.debug('Tracking notice:', error);
            }
        };

        trackPageVisit();
    }, [location.pathname]);
};
