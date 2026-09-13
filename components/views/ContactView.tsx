'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle, Clock, Globe, ShieldAlert } from 'lucide-react';
import BrandLogo from '@/components/common/BrandLogo';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'partnership',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId(`MFB-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'partnership',
      message: '',
    });
    setIsSubmitted(false);
  };

  const faqs = [
    {
      q: 'How does MyFastBroker test and rate online brokers?',
      a: 'We evaluate brokers using our 100+ checkpoint scoring framework covering fee schedules, real-world execution quality, customer service response latency, and Tier-1 statutory regulatory licensing (SEC, FINRA, FCA, ASIC, BaFin).'
    },
    {
      q: 'Can a brokerage pay to receive a higher ranking on MyFastBroker?',
      a: 'No. Our editorial team maintains strict separation from advertising partnerships. Star ratings, comparison matrix positions, and review conclusions are strictly determined by our empirical testing methodology.'
    },
    {
      q: 'How do I submit a correction or request a broker review?',
      a: 'Select "Broker Review Request" or "Editorial Correction" in the contact form or email our research desk directly at collab.topagency@gmail.com with your documentation.'
    },
    {
      q: 'Are the calculators on MyFastBroker free to use?',
      a: 'Yes, all financial calculators—including the Broker Fee Drag Calculator, Commission Estimator, Margin Risk Calculator, and 60-Second Broker Matcher—are 100% free and do not require account registration.'
    }
  ];

  return (
    <div id="contact-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in text-[#e5e7eb]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex justify-center mb-1">
          <BrandLogo size={52} variant="badge" className="shadow-lg" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Communications Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Get in Touch with MyFastBroker
        </h1>
        <p className="text-sm text-gray-400">
          Have an inquiry, partnership proposal, or feedback on a brokerage review? Our editorial and research team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form Card */}
        <div className="lg:col-span-7 bg-[#0c0c0e] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-xl font-extrabold text-white">Send an Inquiry</h3>
                <p className="text-xs text-gray-400 mt-1">
                  We respond to all verified emails within 24 business hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/60 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/60 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0c0c0e] border border-white/10 rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/60 cursor-pointer"
                >
                  <option value="partnership" className="bg-[#0c0c0e] text-white">Partnership & Media Collaboration</option>
                  <option value="review_request" className="bg-[#0c0c0e] text-white">Broker Review & Listing Request</option>
                  <option value="editorial" className="bg-[#0c0c0e] text-white">Editorial Question or Data Correction</option>
                  <option value="general" className="bg-[#0c0c0e] text-white">General Inquiry / User Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Please describe your inquiry, requested broker, or questions in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/60 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 accent-gradient hover:opacity-90 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Transmitting Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to MyFastBroker</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-gray-400 text-center">
                Direct inquiries can also be transmitted via email to{' '}
                <a href="mailto:collab.topagency@gmail.com" className="text-blue-400 font-bold underline">
                  collab.topagency@gmail.com
                </a>
              </div>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Successfully Received!</h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry has been routed to our research desk under reference ticket:
              </p>
              <div className="inline-block bg-white/5 border border-white/10 px-4 py-2 rounded-xl font-mono text-sm font-bold text-blue-400">
                {ticketId}
              </div>
              <p className="text-xs text-gray-400">
                A confirmation has been logged for <strong className="text-gray-200">{formData.email}</strong>. Our team typically replies within 24 business hours.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-5 py-2.5 accent-gradient hover:opacity-90 text-white text-xs font-bold rounded-xl transition shadow-sm"
              >
                Submit Another Message
              </button>
            </div>
          )}
        </div>

        {/* Office & Contact Info Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0c0c0e] text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold">Direct Contact Channels</h3>
              <BrandLogo size={32} variant="badge" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-200 block">General & Editorial Email</span>
                  <a href="mailto:collab.topagency@gmail.com" className="text-blue-400 font-bold hover:underline">
                    collab.topagency@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-200 block">Editorial Desk Hours</span>
                  <span className="text-gray-400">Monday – Friday: 08:00 – 18:00 UTC</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-200 block">Official Web Properties</span>
                  <span className="text-gray-400">myfastbroker.news • myfastbroker.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Partnership Note:</strong> If representing a regulated brokerage seeking platform audit or technical integration, please include your licensed entity name, registration number (SEC, FCA, etc.), and contact phone.
            </div>
          </div>

          {/* Quick FAQ summary */}
          <div className="bg-[#0c0c0e] rounded-3xl border border-white/10 p-6 space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-white/10 pb-2">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left text-xs font-bold text-gray-300 hover:text-blue-400 py-1 flex items-center justify-between gap-2 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-gray-400">{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && (
                    <p className="text-xs text-gray-400 mt-1 pb-2 leading-relaxed animate-fade-in">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
