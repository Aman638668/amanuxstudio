
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageVisit = async () => {
            try {
                await supabase.from('website_visits').insert({
                    page: location.pathname,
                    user_agent: navigator.userAgent,
                });
            } catch (error) {
                console.error('Error tracking page visit:', error);
            }
        };

        trackPageVisit();
    }, [location]);
};
