import { CheckCircle, Target, Users, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a full-service digital agency specializing in creating powerful online experiences that drive business success. Our team combines creativity, technology, and strategy to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission: Empowering Digital Excellence
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                At Aman UX Studio, we believe every business deserves a digital presence that truly represents their vision and drives growth. We transform ideas into powerful digital solutions that connect, engage, and convert.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">500+ Successful Projects Delivered</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">98% Client Satisfaction Rate</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">5+ Years of Industry Experience</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Strategic</h4>
                <p className="text-gray-600">Data-driven approach to every project</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Fast</h4>
                <p className="text-gray-600">Quick turnaround without compromising quality</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Collaborative</h4>
                <p className="text-gray-600">Working closely with you every step</p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl text-center">
                <CheckCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Reliable</h4>
                <p className="text-gray-600">Consistent delivery and ongoing support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}