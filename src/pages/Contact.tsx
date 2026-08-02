import { useState } from 'react';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageBanner title="Get In Touch" breadcrumb="Home &gt; Contact" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">Contact Us</h2>
              <p className="text-muted">
                We'd love to hear from you. Reach out with any questions about our products or services.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">Address</h3>
                  <p className="text-muted text-sm">400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">Phone</h3>
                  <p className="text-muted text-sm">+1 (305) 555-0144</p>
                  <p className="text-muted text-sm">+1 (305) 555-0155</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">Working Hours</h3>
                  <p className="text-muted text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted text-sm">Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="bg-cream p-12 rounded-lg text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B88E2F" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-dark mb-2">Message Sent!</h3>
                <p className="text-muted mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-outline-primary">Send Another</button>
              </div>
            ) : (
              <form
                className="space-y-6"
                onSubmit={e => { e.preventDefault(); setSent(true); }}
              >
                <h2 className="text-2xl font-bold text-dark mb-6">Send a Message</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-muted text-sm mb-2">Name</label>
                    <input className="input-field" type="text" required />
                  </div>
                  <div>
                    <label className="block text-muted text-sm mb-2">Email</label>
                    <input className="input-field" type="email" required />
                  </div>
                </div>
                <div>
                  <label className="block text-muted text-sm mb-2">Subject</label>
                  <input className="input-field" type="text" required />
                </div>
                <div>
                  <label className="block text-muted text-sm mb-2">Message</label>
                  <textarea className="input-field" rows={6} required />
                </div>
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
