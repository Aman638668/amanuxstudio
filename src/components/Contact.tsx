import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { studioAudio } from '@/lib/studio-audio';

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
    studioAudio.playClick(900);
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
    <section id="contact" className="py-24 md:py-32 bg-[#09090c] text-[#eeece8] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5b5fe0] mb-3">
            <span>[ 07 / START AN ARCHITECTURE ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#eeece8] mt-2 mb-4">
            Let's Engineer Your Vision.
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-light">
            Have a project in mind or need to upgrade your digital platform? Send us a message and receive a custom technical proposal and consultation within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10 shadow-2xl backdrop-blur-sm">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#eeece8] mb-1">
                Project Specification &amp; Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-white/50 font-light">
                Direct developer intake. Zero sales spam.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-16 w-16 bg-[#3ddc84]/10 border border-[#3ddc84]/30 text-[#3ddc84] rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">Message Delivered</h4>
                <p className="text-white/60 max-w-sm mx-auto text-sm font-light">
                  We have received your project details and dispatched a notification alert. We will analyze your requirements and connect with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full border border-white/15 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                    Full Name / Company *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Elena Rostova"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full h-12 bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:border-[#5b5fe0] rounded-xl"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="elena@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full h-12 bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:border-[#5b5fe0] rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                      Phone / WhatsApp
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 92111 04514"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-12 bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:border-[#5b5fe0] rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                    Project Goals, Budget &amp; Timeline *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your brand, current challenges, desired timeline, or goals..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:border-[#5b5fe0] rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-[#5b5fe0] hover:bg-[#6c70f0] text-white font-semibold text-sm tracking-wide transition-all shadow-xl shadow-[#5b5fe0]/30 hover:shadow-[#5b5fe0]/50 hover:-translate-y-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
                  data-cursor="Submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Technical Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information & Channels */}
          <div className="space-y-8 lg:pl-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Direct Studio Coordinates
              </h3>
              <p className="text-sm text-white/60 mb-8 leading-relaxed font-light">
                Skip the traditional agency bureaucracy. Reach out through any of our direct studio channels for immediate consultation.
              </p>

              <div className="space-y-5">
                <a
                  href="mailto:amanuxstudio@gmail.com"
                  className="flex items-center p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-white/50 tracking-wider">Email Direct</div>
                    <div className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                      amanuxstudio@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/919211104514"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                >
                  <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[#3ddc84] flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-white/50 tracking-wider">WhatsApp &amp; Direct Phone</div>
                    <div className="text-sm font-medium text-white group-hover:text-[#3ddc84] transition-colors">
                      +91 92111-04514
                    </div>
                  </div>
                </a>

                <div className="flex items-center p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="w-11 h-11 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-white/50 tracking-wider">Studio Base</div>
                    <div className="text-sm font-medium text-white">
                      New Delhi, India · Global Remote Delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider font-mono">
                Studio Quality Guarantee
              </h4>
              <ul className="space-y-2 text-xs text-white/70 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84]" />
                  Guaranteed response within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84]" />
                  Direct 1-on-1 developer partnership
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84]" />
                  Fixed-scope sprint delivery &amp; no surprise costs
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
