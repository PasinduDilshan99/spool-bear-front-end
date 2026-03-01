// app/contact/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  User,
  Building,
  HelpCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Loader2
} from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

interface SubmitStatus {
  type: "success" | "error" | "info" | null;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({ type: null, message: "" });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setStatus({ type: null, message: "" });

    // Validation
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    if (!formData.email.trim()) {
      setStatus({ type: "error", message: "Please enter your email address." });
      return;
    }
    if (!formData.subject.trim()) {
      setStatus({ type: "error", message: "Please enter a subject." });
      return;
    }
    if (!formData.message.trim()) {
      setStatus({ type: "error", message: "Please enter your message." });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "info", message: "Sending your message..." });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:3000/api/contact";
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data?.error || "Failed to send message. Please try again." });
        return;
      }

      setStatus({ type: "success", message: "Message sent successfully! We'll get back to you within 24-48 hours." });
      
      // Clear form after successful submission
      clearForm();

    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  // Contact information
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["info@spoolbear.com", "support@spoolbear.com"],
      action: "mailto:info@spoolbear.com",
      linkText: "Send email"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      action: "tel:+15551234567",
      linkText: "Call now"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Maker Street", "Tech City, TC 12345"],
      action: "https://maps.google.com",
      linkText: "Get directions"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm", "Sunday: Closed"],
      action: null,
      linkText: null
    },
  ];

  // FAQ items
  const faqs = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond within 24 hours during business days. For urgent matters, please mention 'URGENT' in your subject line."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes! We ship worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "Can I get a quote before ordering?",
      answer: "Absolutely! Just send us your project details and we'll provide a free, no-obligation quote."
    },
    {
      question: "What file formats do you accept?",
      answer: "We accept STL, OBJ, 3MF, STEP, and F3D files. If you have a different format, let us know!"
    },
  ];

  // Social media links
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <div className="min-h-screen bg-[#e4e7ec] relative">
      {/* Decorative Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${spoolbearTheme.colors.accent}1a 1px, transparent 1px), 
                           linear-gradient(90deg, ${spoolbearTheme.colors.accent}1a 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: spoolbearTheme.colors.accent }} />
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: spoolbearTheme.colors.accent }}>
                Get in Touch
              </span>
            </div>
            
            <h1 className="font-black text-[clamp(42px,5vw,72px)] tracking-[-0.02em] mb-6" style={{ color: spoolbearTheme.colors.text }}>
              Let&apos;s <span style={{ color: spoolbearTheme.colors.accent }}>Connect</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{ color: spoolbearTheme.colors.muted }}>
              Have a question about our services? Need a quote for your project? 
              Our team is here to help. Reach out to us anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
                  <div style={{ color: spoolbearTheme.colors.accent }}>{info.icon}</div>
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: spoolbearTheme.colors.text }}>
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-sm mb-1" style={{ color: spoolbearTheme.colors.muted }}>
                    {detail}
                  </p>
                ))}
                {info.action && info.linkText && (
                  <a
                    href={info.action}
                    className="inline-flex items-center gap-1 text-sm font-medium mt-3 hover:gap-2 transition-all"
                    style={{ color: spoolbearTheme.colors.accent }}
                  >
                    {info.linkText} <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: spoolbearTheme.colors.text }}>
                Send Us a <span style={{ color: spoolbearTheme.colors.accent }}>Message</span>
              </h2>
              <p className="text-sm mb-8" style={{ color: spoolbearTheme.colors.muted }}>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black tracking-wider mb-2" style={{ color: spoolbearTheme.colors.muted }}>
                      FULL NAME *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: spoolbearTheme.colors.muted }} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#ff5000] focus:border-transparent bg-white/90"
                        style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black tracking-wider mb-2" style={{ color: spoolbearTheme.colors.muted }}>
                      EMAIL ADDRESS *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: spoolbearTheme.colors.muted }} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#ff5000] focus:border-transparent bg-white/90"
                        style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Company & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black tracking-wider mb-2" style={{ color: spoolbearTheme.colors.muted }}>
                      COMPANY (OPTIONAL)
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: spoolbearTheme.colors.muted }} />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#ff5000] focus:border-transparent bg-white/90"
                        style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black tracking-wider mb-2" style={{ color: spoolbearTheme.colors.muted }}>
                      PHONE (OPTIONAL)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: spoolbearTheme.colors.muted }} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#ff5000] focus:border-transparent bg-white/90"
                        style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-black tracking-wider mb-2" style={{ color: spoolbearTheme.colors.muted }}>
                    SUBJECT *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#ff5000] focus:border-transparent bg-white/90"
                    style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Quote Request">Quote Request</option>
                    <option value="Design Services">Design Services</option>
                    <option value="Printing Services">Printing Services</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-black tracking-wider mb-2" style={{ color: spoolbearTheme.colors.muted }}>
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, question, or concern..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#ff5000] focus:border-transparent bg-white/90 resize-y"
                    style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                  />
                </div>

                {/* Status Message */}
                {status.type && (
                  <div className={`p-4 rounded-xl flex items-start gap-3 ${
                    status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                    status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                    'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {status.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                    {status.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                    {status.type === 'info' && <Loader2 className="w-5 h-5 flex-shrink-0 mt-0.5 animate-spin" />}
                    <span className="text-sm font-medium">{status.message}</span>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-4 rounded-full font-bold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 flex items-center gap-2"
                    style={{ 
                      backgroundColor: spoolbearTheme.colors.accent,
                      color: '#000'
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-6 py-4 rounded-full font-bold border transition-colors hover:bg-black/5"
                    style={{ 
                      borderColor: 'rgba(0,0,0,0.20)',
                      color: spoolbearTheme.colors.text
                    }}
                  >
                    Clear Form
                  </button>
                </div>

                <p className="text-xs" style={{ color: spoolbearTheme.colors.muted }}>
                  * Required fields. We&apos;ll never share your information with third parties.
                </p>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div 
                className="rounded-2xl overflow-hidden border h-[300px] relative"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-73.98510768458467!3d40.75889697932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1644262070682!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Location Map"
                />
              </div>

              {/* Social Media */}
              <div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: spoolbearTheme.colors.text }}>
                  Connect With Us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ 
                        backgroundColor: `${spoolbearTheme.colors.accent}10`,
                        color: spoolbearTheme.colors.accent
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = spoolbearTheme.colors.accent;
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                        e.currentTarget.style.color = spoolbearTheme.colors.accent;
                      }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Response Promise */}
              <div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
                    <Clock className="w-6 h-6" style={{ color: spoolbearTheme.colors.accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: spoolbearTheme.colors.text }}>
                      Quick Response Guarantee
                    </h3>
                    <p className="text-sm mb-3" style={{ color: spoolbearTheme.colors.muted }}>
                      We aim to respond to all inquiries within 24 hours during business days. Your time is valuable, and we respect that.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: spoolbearTheme.colors.accent }}>
                      <MessageSquare className="w-4 h-4" />
                      <span>Average response time: 4 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: spoolbearTheme.colors.text }}>
              Frequently Asked <span style={{ color: spoolbearTheme.colors.accent }}>Questions</span>
            </h2>
            <p className="text-lg" style={{ color: spoolbearTheme.colors.muted }}>
              Find quick answers to common questions about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border hover:shadow-lg transition-all"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: spoolbearTheme.colors.accent }} />
                  <div>
                    <h3 className="font-bold mb-2" style={{ color: spoolbearTheme.colors.text }}>
                      {faq.question}
                    </h3>
                    <p className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center"
            style={{ backgroundColor: spoolbearTheme.colors.text }}
          >
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${spoolbearTheme.colors.accent} 2px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Whether you need a 3D print, design service, or just have a question, we&apos;re here to help.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/print"
                  className="px-8 py-4 bg-white font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  Start a Print
                </Link>
                <Link
                  href="/design"
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Request Design
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;