import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold">Aman UX Studio</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                We are a full-service digital agency specializing in creating powerful online experiences that drive business success. Transform your digital presence with our expert team.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Stay Updated</h4>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Subscribe
                  </Button>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="hover:bg-slate-800">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-slate-800">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-slate-800">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-slate-800">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#careers" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                <li><a href="#web-design" className="text-gray-300 hover:text-white transition-colors">Web Design</a></li>
                <li><a href="#web-development" className="text-gray-300 hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#seo" className="text-gray-300 hover:text-white transition-colors">SEO & Marketing</a></li>
                <li><a href="#branding" className="text-gray-300 hover:text-white transition-colors">Branding</a></li>
                <li><a href="#mobile-apps" className="text-gray-300 hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#ecommerce" className="text-gray-300 hover:text-white transition-colors">E-commerce</a></li>
                <li><a href="#analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-slate-700 mb-8" />
          
          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">amanuxstudio@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-green-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">+91 9211104514</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-purple-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white">Delhi, India</p>
              </div>
            </div>
          </div>
          
          <Separator className="bg-slate-700 mb-8" />
          
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Aman UX Studio. All rights reserved. | 
              <a href="#privacy" className="hover:text-white ml-1">Privacy Policy</a> | 
              <a href="#terms" className="hover:text-white ml-1">Terms of Service</a>
            </div>
            <div className="text-gray-400 text-sm">
              Crafted with ❤️ by Aman Sharma.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}