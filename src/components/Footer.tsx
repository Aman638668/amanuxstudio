import { useState, useRef } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Mail, Phone, MapPin, FileText, Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";

export default function Footer() {
  const [status, setStatus] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
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
          title: "Newsletter Subscription",
          message: `Visitor subscribed to newsletter: ${tempEmail.trim()}`
        }),
      });

      if (res.ok) {
        setStatus("success");
        setTempEmail("");
        toast.success("Thanks for joining our newsletter!");
      } else {
        setStatus("error");
        toast.error("Subscription failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <footer className="footer-root relative z-50 bg-slate-900 text-white border-t border-slate-800 overflow-hidden">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Aman UX Studio
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md text-sm leading-relaxed">
                Full-service web development and UI/UX design studio by Aman Sharma. Building high-converting websites, dynamic e-commerce stores, and production web applications.
              </p>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-slate-200 mb-2">Subscribe to Tech &amp; UX Insights</h4>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400 h-10 text-sm"
                    />
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 h-10 px-4 text-sm font-semibold"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
                    </Button>
                  </div>
                </form>
                {status === "success" && (
                  <p className="text-emerald-400 mt-2 text-xs">Thanks for subscribing!</p>
                )}
                {status === "error" && (
                  <p className="text-rose-400 mt-2 text-xs">Something went wrong. Please retry.</p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                <a
                  href="https://github.com/Aman638668"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aman-sharma-4b772124a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <Link
                  to="/resume"
                  className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Interactive Resume"
                  title="View Resume"
                >
                  <FileText className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm text-slate-200 mb-4 tracking-wider uppercase">Navigation</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => handleNavClick('about')} className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                    Services &amp; Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                    Portfolio &amp; Case Studies
                  </Link>
                </li>
                <li>
                  <button onClick={() => handleNavClick('testimonials')} className="text-gray-400 hover:text-white transition-colors">
                    Client Reviews
                  </button>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Articles &amp; Blog
                  </Link>
                </li>
                <li>
                  <Link to="/resume" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    Resume &amp; Experience
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-500 hover:text-gray-300 transition-colors text-xs">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm text-slate-200 mb-4 tracking-wider uppercase">Solutions</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><Link to="/services#web-development" className="hover:text-white transition-colors">Web Development</Link></li>
                <li><Link to="/services#ui-ux-design" className="hover:text-white transition-colors">UI/UX Design</Link></li>
                <li><Link to="/services#wordpress" className="hover:text-white transition-colors">WordPress &amp; Elementor</Link></li>
                <li><Link to="/services#ecommerce" className="hover:text-white transition-colors">E-Commerce Solutions</Link></li>
                <li><Link to="/services#seo-performance" className="hover:text-white transition-colors">SEO &amp; Performance</Link></li>
              </ul>
            </div>
          </div>

          <Separator className="bg-slate-800 mb-8" />

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 text-sm">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Direct Email</p>
                <a href="mailto:amanuxstudio@gmail.com" className="text-white hover:text-blue-300 transition-colors">
                  amanuxstudio@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Phone / WhatsApp</p>
                <a href="tel:+919211104514" className="text-white hover:text-emerald-300 transition-colors">
                  +91 92111-04514
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-white">New Delhi, India</p>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-800 mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-3">
            <div>
              &copy; {new Date().getFullYear()} Aman UX Studio. Built with React, Vite &amp; Supabase.
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="text-gray-600">•</span>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <div>
              Designed &amp; Developed by <strong>Aman Sharma</strong>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
