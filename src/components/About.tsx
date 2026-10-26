import { CheckCircle, Target, Users, Zap, FileDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              About Aman UX Studio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Led by Web Developer Aman Sharma, we build fast, scalable, and conversion-focused web applications that drive real business growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission: Empowering Digital Excellence
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At Aman UX Studio, we bridge the gap between creative visual design and rock-solid web engineering. Whether delivering custom corporate portals like <strong>Fairease Outsourcing</strong> and <strong>Expertvuw</strong>, e-commerce stores like <strong>Ireshh</strong>, or full-stack React/Next.js SaaS solutions, we craft platforms that convert.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">50+ Successful Projects Delivered Across Diverse Industries</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">98% Client Satisfaction &amp; Fast Turnaround Time</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Full-Stack Expertise: React, Next.js, TypeScript &amp; WordPress</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/resume">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white font-medium">
                    View Full Resume &amp; Background <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href="/Aman_Sharma_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100">
                <Target className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-900 mb-1">Strategic</h4>
                <p className="text-sm text-gray-600">Data-driven and conversion-optimized approach</p>
              </div>
              
              <div className="bg-emerald-50 p-6 rounded-2xl text-center border border-emerald-100">
                <Zap className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-900 mb-1">High Velocity</h4>
                <p className="text-sm text-gray-600">Rapid execution without sacrificing code quality</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-2xl text-center border border-purple-100">
                <Users className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-900 mb-1">Collaborative</h4>
                <p className="text-sm text-gray-600">Direct partnership and transparent communication</p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-2xl text-center border border-orange-100">
                <CheckCircle className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-900 mb-1">Reliable</h4>
                <p className="text-sm text-gray-600">Dedicated ongoing support and maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
