import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, FileText, Loader2, ArrowUpRight, ArrowRight, Clock } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { studioAudio } from '@/lib/studio-audio';

export default function Footer() {
  const [status, setStatus] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [delhiTime, setDelhiTime] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeString = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(now);
        setDelhiTime(timeString);
      } catch (e) {
        setDelhiTime("12:00 PM IST");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (sectionId: string) => {
    studioAudio.playClick(850, 0.03);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempEmail || !tempEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/discord-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: tempEmail.trim(),
          title: "Newsletter / Inbound Subscriber",
          message: `Subscriber joined mailing list: ${tempEmail.trim()}`
        }),
      });

      if (res.ok) {
        setStatus("success");
        setTempEmail("");
        toast.success("Thank you! You're subscribed to studio updates.");
      } else {
        setStatus("error");
        toast.error("Subscription failed. Please try again or email us directly.");
      }
    } catch (err) {
      setStatus("error");
      toast.error("Network error. Please try again or email us directly.");
    }
  };

  return (
    <footer className="relative z-40 bg-[#07070a] text-[#eeece8] border-t border-white/10 overflow-hidden font-sans pt-20 pb-12">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-blue-600/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Massive Editorial Header Callout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-white/10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono uppercase tracking-widest text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84] animate-pulse" />
              <span>Available for Global Clients</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#eeece8] leading-[1.08]">
              Let's Build Something Iconic Together.
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-normal leading-relaxed">
              Have a new website in mind, need a custom WordPress rebuild, or want to fix low conversions? We respond with a bespoke scope and quotation within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('contact')}
              onMouseEnter={() => studioAudio.playHover()}
              className="btn-studio-primary group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="https://wa.me/919211104514"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => studioAudio.playHover()}
              className="btn-studio-secondary"
            >
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Studio Telemetry Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-white/10 text-xs font-mono">
          <div>
            <span className="text-white/40 block mb-1 uppercase tracking-wider">Studio Headquarters</span>
            <span className="text-white font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              New Delhi, India
            </span>
          </div>
          <div>
            <span className="text-white/40 block mb-1 uppercase tracking-wider">Local Time (IST)</span>
            <span className="text-white font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#3ddc84]" />
              {delhiTime || "IST (UTC+5:30)"}
            </span>
          </div>
          <div>
            <span className="text-white/40 block mb-1 uppercase tracking-wider">Direct Consultation</span>
            <a href="mailto:amanuxstudio@gmail.com" className="text-blue-400 hover:underline">
              amanuxstudio@gmail.com
            </a>
          </div>
          <div>
            <span className="text-white/40 block mb-1 uppercase tracking-wider">Direct Phone / Call</span>
            <a href="tel:+919211104514" className="text-white hover:text-blue-300">
              +91 92111-04514
            </a>
          </div>
        </div>

        {/* Structured Sitemap & Newsletter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-14">
          
          {/* Col 1: Selected Case Studies */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-4">Selected Work</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="https://fairease.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Fairease Outsourcing</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://ireshh.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Ireshh Clothing Store</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://ticketdevtravels.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>TicketDev Travel</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://friendsgroup.co.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Friends Group</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://expertvuw.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Expert VUW Consulting</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-blue-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-4">Services</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/services#web-development" className="hover:text-white transition-colors">Custom Web Development</Link></li>
              <li><Link to="/services#wordpress" className="hover:text-white transition-colors">WordPress &amp; Elementor</Link></li>
              <li><Link to="/services#ecommerce" className="hover:text-white transition-colors">WooCommerce E-Commerce</Link></li>
              <li><Link to="/services#ui-ux-design" className="hover:text-white transition-colors">UI/UX Design in Figma</Link></li>
              <li><Link to="/services#seo-performance" className="hover:text-white transition-colors">Speed &amp; Core Web Vitals</Link></li>
              <li><Link to="/services#maintenance-security" className="hover:text-white transition-colors">Website Maintenance</Link></li>
            </ul>
          </div>

          {/* Col 3: Studio & Writing */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-4">Studio</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors text-left">About Aman Sharma</button></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Design &amp; Tech Articles</Link></li>
              <li><Link to="/resume" className="hover:text-white text-blue-400 transition-colors font-medium">Interactive Resume</Link></li>
              <li><button onClick={() => handleNavClick('testimonials')} className="hover:text-white transition-colors text-left">Client Reviews</button></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">All Case Studies</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-4">Trust &amp; Legal</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><button onClick={() => handleNavClick('why-us')} className="hover:text-white transition-colors text-left">The Studio Standard</button></li>
              <li><Link to="/login" className="hover:text-white transition-colors text-white/40">Studio Admin</Link></li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-4">Newsletter</h4>
            <p className="text-xs text-white/60 mb-3 leading-relaxed">
              Get practical insights on UI/UX, WordPress speed, and conversion optimization.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-white/40 h-9 rounded-full px-4 text-xs focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-studio-primary btn-studio-sm w-full font-semibold"
                disabled={status === "loading"}
              >
                {status === "loading" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Subscribe"}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Aman UX Studio. Built with React, Vite &amp; Supabase.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Aman638668"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/aman-sharma-4b772124a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="/Aman_Sharma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Resume PDF"
            >
              <FileText className="w-4 h-4" />
            </a>
          </div>

          <div>
            Designed &amp; Hand-Crafted by <strong className="text-white font-medium">Aman Sharma</strong>.
          </div>
        </div>

      </div>
    </footer>
  );
}
