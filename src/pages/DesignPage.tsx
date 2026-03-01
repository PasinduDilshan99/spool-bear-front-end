// app/design/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Lightbulb, 
  PenTool, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  MessageSquare,
  Clock,
  Palette,
  Users,
  Sparkles,
  Mail,
  Phone,
  Send
} from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface DesignFormData {
  name: string;
  email: string;
  phone: string;
  budget: string;
  idea: string;
}

interface SubmitStatus {
  type: "success" | "error" | "info" | null;
  message: string;
}

const DesignPage = () => {
  const [formData, setFormData] = useState<DesignFormData>({
    name: "",
    email: "",
    phone: "",
    budget: "",
    idea: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({ type: null, message: "" });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      budget: "",
      idea: "",
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Reset status
    setStatus({ type: null, message: "" });

    // Basic validation
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    if (!formData.email.trim()) {
      setStatus({ type: "error", message: "Please enter your email address." });
      return;
    }
    if (!formData.idea.trim()) {
      setStatus({ type: "error", message: "Please describe your idea." });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "info", message: "Submitting your request..." });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_DESIGN_API_URL || "http://localhost:3000/api/design-requests";
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          budget: formData.budget,
          idea: formData.idea
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data?.error || "Submission failed. Please try again." });
        return;
      }

      setStatus({ type: "success", message: "Design request submitted successfully! We'll contact you within 24-48 hours." });
      
      // Clear form after successful submission
      clearForm();

    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  // Scroll to form
  const scrollToForm = () => {
    document.getElementById("design-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Design steps
  const steps = [
    { 
      title: "Share your idea and references.", 
      note: "Sketches, photos, links, dimensions, and use-case help a lot." 
    },
    { 
      title: "We design + review with you.", 
      note: "You'll get previews and we'll refine based on feedback." 
    },
    { 
      title: "Get print-ready files and a quote.", 
      note: "We can also print and ship the final part." 
    },
  ];

  // Services
  const services = [
    { icon: <PenTool className="w-6 h-6" />, title: "3D Modeling", description: "From concept to digital 3D model" },
    { icon: <Palette className="w-6 h-6" />, title: "Design Optimization", description: "Make your designs print-ready" },
    { icon: <Users className="w-6 h-6" />, title: "Collaborative Process", description: "Work with our designers iteratively" },
    { icon: <Sparkles className="w-6 h-6" />, title: "Multiple Revisions", description: "We refine until you're satisfied" },
  ];

  // What we can design
  const designCategories = [
    "Product Prototypes",
    "Mechanical Parts",
    "Architectural Models",
    "Art & Sculptures",
    "Jewelry Design",
    "Custom Enclosures",
    "Replacement Parts",
    "Cosplay Props",
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

      {/* Hero Section with Background Image */}
      <section 
        className="design-hero relative min-h-[860px] overflow-hidden"
        style={{
          background: '#dfe3e8'
        }}
      >
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-32"
          style={{
            backgroundImage: 'url("/images/design-hero.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right center',
            backgroundSize: 'min(1150px, 72vw)',
          }}
        />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #dfe3e8 0%, #dfe3e8 44%, rgba(223,227,232,0.85) 62%, rgba(223,227,232,0.55) 100%)'
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16 lg:py-24">
          <div className="max-w-[1150px] mx-auto">
            {/* Title */}
            <h1 className="font-black text-[clamp(44px,4.9vw,78px)] tracking-[-0.03em] mb-6" style={{ color: spoolbearTheme.colors.text }}>
              {formData.idea ? "Have an idea?" : "Have an idea?"}
            </h1>
            
            {/* Lead */}
            <p className="text-[clamp(26px,2.4vw,40px)] font-black mb-2" style={{ color: spoolbearTheme.colors.text }}>
              We&apos;ll turn it into a 3D model.
            </p>
            
            {/* Sub */}
            <p className="text-[clamp(20px,2vw,32px)] font-bold mb-12 max-w-[980px]" style={{ color: 'rgba(0,0,0,0.82)' }}>
              No CAD file? No problem. Tell us what you want to make, and we&apos;ll handle the design, revisions, and print-ready files.
            </p>

            {/* Section Title */}
            <h2 className="text-[clamp(26px,2.4vw,40px)] font-black mb-5 relative inline-block" style={{ color: spoolbearTheme.colors.text }}>
              How it works:
              <span 
                className="absolute left-3 -bottom-2.5 h-2.5 rounded-full -z-10 opacity-80"
                style={{ 
                  width: '260px',
                  backgroundColor: spoolbearTheme.colors.accent,
                  transform: 'skewX(-18deg)'
                }}
              />
            </h2>

            {/* Steps List */}
            <ul className="list-none p-0 mt-6 mb-11 max-w-[980px]">
              {steps.map((step, index) => (
                <li key={index} className="grid grid-cols-[54px_1fr] gap-4 items-start my-5">
                  <div 
                    className="w-12 h-12 rounded-xl grid place-items-center font-black text-lg"
                    style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-[clamp(18px,1.6vw,28px)] font-bold" style={{ color: 'rgba(0,0,0,0.86)' }}>
                      {step.title}
                    </div>
                    <div className="text-[clamp(14px,1.2vw,18px)] font-semibold mt-1" style={{ color: 'rgba(0,0,0,0.66)' }}>
                      {step.note}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center px-12 py-5 rounded-full font-black text-[clamp(18px,2vw,34px)] shadow-2xl transition-all hover:brightness-98 active:translate-y-0.5"
                style={{ 
                  backgroundColor: spoolbearTheme.colors.accent,
                  color: '#000'
                }}
              >
                Start your design request
              </button>
              <span className="text-[clamp(14px,1.2vw,18px)] font-bold" style={{ color: 'rgba(0,0,0,0.70)' }}>
                Usually reply within 24–48 hours.
              </span>
            </div>

            {/* Design Form */}
            <div 
              id="design-form"
              className="mt-8 w-full max-w-[720px] rounded-2xl p-5 backdrop-blur-sm border transition-all"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.65)',
                borderColor: 'rgba(0,0,0,0.10)'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-black text-sm tracking-wider" style={{ color: 'rgba(0,0,0,0.74)' }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-3.5 py-3 rounded-2xl border text-base font-semibold outline-none bg-white/90 focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                    style={{ borderColor: 'rgba(0,0,0,0.14)' }}
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-black text-sm tracking-wider" style={{ color: 'rgba(0,0,0,0.74)' }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-3.5 py-3 rounded-2xl border text-base font-semibold outline-none bg-white/90 focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                    style={{ borderColor: 'rgba(0,0,0,0.14)' }}
                  />
                </div>

                {/* Phone Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-black text-sm tracking-wider" style={{ color: 'rgba(0,0,0,0.74)' }}>
                    PHONE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone (optional)"
                    className="w-full px-3.5 py-3 rounded-2xl border text-base font-semibold outline-none bg-white/90 focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                    style={{ borderColor: 'rgba(0,0,0,0.14)' }}
                  />
                </div>

                {/* Budget Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-black text-sm tracking-wider" style={{ color: 'rgba(0,0,0,0.74)' }}>
                    BUDGET
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Budget (optional)"
                    className="w-full px-3.5 py-3 rounded-2xl border text-base font-semibold outline-none bg-white/90 focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                    style={{ borderColor: 'rgba(0,0,0,0.14)' }}
                  />
                </div>

                {/* Idea Field - Full Width */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-black text-sm tracking-wider" style={{ color: 'rgba(0,0,0,0.74)' }}>
                    IDEA
                  </label>
                  <textarea
                    name="idea"
                    value={formData.idea}
                    onChange={handleInputChange}
                    placeholder="Describe your idea (what it is, size, use-case, references)..."
                    rows={5}
                    className="w-full px-3.5 py-3 rounded-2xl border text-base font-semibold outline-none bg-white/90 resize-y focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                    style={{ borderColor: 'rgba(0,0,0,0.14)' }}
                  />
                </div>
              </div>

              {/* Status Message */}
              {status.type && (
                <div className={`mt-4 p-3 rounded-xl flex items-center gap-2 ${
                  status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                  status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {status.type === 'success' && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
                  {status.type === 'error' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                  {status.type === 'info' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                  <span className="text-sm font-medium">{status.message}</span>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-3.5 rounded-full font-black text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:brightness-98"
                  style={{ 
                    backgroundColor: spoolbearTheme.colors.accent,
                    color: '#000'
                  }}
                >
                  {submitting ? "Submitting..." : "Request a design"}
                </button>
                <button
                  onClick={clearForm}
                  className="px-5 py-3.5 rounded-full font-black border transition-colors hover:bg-black/5"
                  style={{ 
                    borderColor: 'rgba(0,0,0,0.20)',
                    color: spoolbearTheme.colors.text
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: spoolbearTheme.colors.text }}>
              Our <span style={{ color: spoolbearTheme.colors.accent }}>Design Services</span>
            </h2>
            <p className="text-lg" style={{ color: spoolbearTheme.colors.muted }}>
              From concept to 3D model — we handle the entire design process
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
                  <div style={{ color: spoolbearTheme.colors.accent }}>{service.icon}</div>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: spoolbearTheme.colors.text }}>
                  {service.title}
                </h3>
                <p className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Can Design Section */}
      <section className="py-20 md:py-28 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: spoolbearTheme.colors.text }}>
                What We Can <span style={{ color: spoolbearTheme.colors.accent }}>Design</span>
              </h2>
              <p className="text-lg mb-8" style={{ color: spoolbearTheme.colors.muted }}>
                Our experienced design team can handle a wide range of projects across different industries and applications.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {designCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: spoolbearTheme.colors.accent }} />
                    <span className="text-sm font-medium" style={{ color: spoolbearTheme.colors.text }}>{category}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=800&q=80"
                  alt="3D Design"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl flex items-center gap-3">
                <MessageSquare className="w-6 h-6" style={{ color: spoolbearTheme.colors.accent }} />
                <div>
                  <div className="text-sm font-bold" style={{ color: spoolbearTheme.colors.text }}>Free Consultation</div>
                  <div className="text-xs" style={{ color: spoolbearTheme.colors.muted }}>Discuss your project with us</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16" style={{ color: spoolbearTheme.colors.text }}>
            Our Design <span style={{ color: spoolbearTheme.colors.accent }}>Process</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-[#ff5000]/30 to-transparent" />
            
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We discuss your idea, requirements, and gather references to understand your vision."
              },
              {
                step: "02",
                title: "Design & Review",
                description: "Our team creates the 3D model and shares previews for your feedback and approval."
              },
              {
                step: "03",
                title: "Final Delivery",
                description: "You receive print-ready files and a quote for printing if needed."
              }
            ].map((item, index) => (
              <div key={index} className="relative text-center group">
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl rotate-45 flex items-center justify-center transition-all group-hover:rotate-90 group-hover:scale-110"
                  style={{ backgroundColor: `${spoolbearTheme.colors.accent}15` }}
                >
                  <span className="-rotate-45 group-hover:-rotate-90 transition-all font-black text-xl" style={{ color: spoolbearTheme.colors.accent }}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: spoolbearTheme.colors.text }}>
                  {item.title}
                </h3>
                <p className="text-sm max-w-xs mx-auto" style={{ color: spoolbearTheme.colors.muted }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Experienced Designers",
                description: "Our team has years of experience in 3D modeling across various industries.",
                icon: <Users className="w-5 h-5" />
              },
              {
                title: "Fast Turnaround",
                description: "Most design projects are completed within 3-5 business days.",
                icon: <Clock className="w-5 h-5" />
              },
              {
                title: "Unlimited Revisions",
                description: "We work with you until you're 100% satisfied with the design.",
                icon: <Sparkles className="w-5 h-5" />
              },
              {
                title: "Print-Ready Files",
                description: "All designs are optimized for 3D printing with proper tolerances.",
                icon: <FileText className="w-5 h-5" />
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border flex items-start gap-4 hover:shadow-lg transition-all"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
                  <div style={{ color: spoolbearTheme.colors.accent }}>{item.icon}</div>
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: spoolbearTheme.colors.text }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12" style={{ color: spoolbearTheme.colors.text }}>
            Frequently Asked <span style={{ color: spoolbearTheme.colors.accent }}>Questions</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How much does design cost?",
                a: "Costs vary based on complexity. We provide free quotes after understanding your project."
              },
              {
                q: "What do I need to provide?",
                a: "Sketches, photos, reference images, dimensions, and a description of how you'll use the part."
              },
              {
                q: "How long does design take?",
                a: "Simple designs take 1-2 days, complex projects may take 5-7 days. We'll give you a timeline upfront."
              },
              {
                q: "Can you print the design too?",
                a: "Yes! We offer full-service design and printing. We'll deliver the finished part to your door."
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border hover:shadow-lg transition-all"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <h3 className="font-bold text-lg mb-2" style={{ color: spoolbearTheme.colors.text }}>
                  {faq.q}
                </h3>
                <p className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="py-16 md:py-20">
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
              <Lightbulb className="w-16 h-16 mx-auto mb-6" style={{ color: spoolbearTheme.colors.accent }} />
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                Have an idea in mind?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Let&apos;s bring it to life together. Get a free consultation and quote today.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={scrollToForm}
                  className="px-8 py-4 bg-white font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  Start Your Project
                  <Send className="w-4 h-4" />
                </button>
                <Link
                  href="/contact-us"
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignPage;