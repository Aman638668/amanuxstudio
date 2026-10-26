import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/discord-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          title: "Homepage Contact Inquiry"
        })
      });

      if (response.ok) {
        toast.success("Thank you! Your message has been sent. We'll reply within 24 hours.");
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data.error || 'Failed to send message. Please try again or email us directly.');
      }
    } catch (error) {
      console.error('Form submit error:', error);
      toast.error('Network error. Please try again or reach out at amanuxstudio@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Start a Conversation</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Let's Build Something Great Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your digital presence? Send us a message and receive a custom proposal and consultation within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="shadow-xl border-slate-100 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                <CardTitle className="text-2xl font-bold text-white">
                  Send Us a Message
                </CardTitle>
                <p className="text-blue-100 text-sm mt-1">
                  Fill in your details and we'll connect with you directly.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Message Delivered!</h3>
                    <p className="text-slate-600 max-w-sm mx-auto text-sm">
                      We have received your project details and sent a confirmation alert to our Discord channel. We will get back to you shortly.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="mt-4"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full h-11 border-slate-200"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full h-11 border-slate-200"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone Number (Optional)
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full h-11 border-slate-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Project Details / Inquiry *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project, goals, timeline, and requirements..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full border-slate-200"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all shadow-md hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending Inquiry to Discord...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 lg:pl-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get in Touch
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We'd love to hear about your project. Choose the best way to reach us and we'll get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3.5 rounded-2xl mr-4 shadow-sm text-blue-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Us</h4>
                      <a href="mailto:amanuxstudio@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                        amanuxstudio@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3.5 rounded-2xl mr-4 shadow-sm text-emerald-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Call / WhatsApp</h4>
                      <a href="tel:+919211104514" className="text-gray-600 hover:text-emerald-600 transition-colors">
                        +91 92111-04514
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3.5 rounded-2xl mr-4 shadow-sm text-purple-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Location</h4>
                      <p className="text-gray-600">New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  Quick Response Guarantee
                </h4>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    Guaranteed response within 24 hours
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    Free 30-minute consultation call
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    Transparent scope &amp; competitive pricing
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    Direct developer communication (no middlemen)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
