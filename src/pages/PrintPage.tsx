// app/print/page.tsx
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Printer,
  Package,
  Clock,
  Shield,
  Download,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface PrintFormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
  file: File | null;
}

interface UploadStatus {
  type: "success" | "error" | "info" | null;
  message: string;
}

const PrintPage = () => {
  const [formData, setFormData] = useState<PrintFormData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
    file: null,
  });
  
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<UploadStatus>({ type: null, message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  // Handle form submission
  const handleSubmit = async () => {
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
    if (!formData.file) {
      setStatus({ type: "error", message: "Please choose a file to upload." });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setUploading(true);
    setStatus({ type: "info", message: "Uploading..." });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_PRINT_API_URL || "http://localhost:3000/api/print-uploads";
      
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("notes", formData.notes);
      fd.append("file", formData.file);

      const res = await fetch(apiUrl, { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data?.error || "Upload failed. Please try again." });
        return;
      }

      setStatus({ type: "success", message: "Uploaded successfully! We'll contact you soon." });

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        notes: "",
        file: null,
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("Upload error:", error);
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setUploading(false);
    }
  };

  // Scroll to upload form
  const scrollToUpload = () => {
    document.getElementById("upload-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Print steps
  const steps = [
    { title: "Upload your 3D model (STL, OBJ, 3MF, etc.)" },
    { title: "Tell us about your requirements (material, color, quantity)" },
    { title: "Get an instant quote and approve" },
    { title: "We print and deliver to your doorstep" },
  ];

  // Features
  const features = [
    { icon: <Printer className="w-6 h-6" />, title: "Professional Printing", description: "Industrial-grade printers for perfect results" },
    { icon: <Package className="w-6 h-6" />, title: "Wide Material Range", description: "PLA, ABS, PETG, Resin, and more" },
    { icon: <Clock className="w-6 h-6" />, title: "Fast Turnaround", description: "Most prints ready in 24-48 hours" },
    { icon: <Shield className="w-6 h-6" />, title: "Quality Guarantee", description: "100% satisfaction or money back" },
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1">
              <h1 className="font-black text-[clamp(48px,8vw,74px)] leading-[1.02] mb-4" style={{ color: spoolbearTheme.colors.text }}>
                3D Printing <br />Service
              </h1>
              
              <p className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: spoolbearTheme.colors.text }}>
                Turn your digital models into
              </p>
              
              <p className="text-xl md:text-2xl font-semibold mb-8" style={{ color: spoolbearTheme.colors.muted }}>
                real, tangible objects — fast and affordable.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4 relative inline-block" style={{ color: spoolbearTheme.colors.text }}>
                How it works
                <span className="absolute left-0 -bottom-2 h-2 rounded-full" style={{ 
                  width: '260px',
                  backgroundColor: `${spoolbearTheme.colors.accent}cc`
                }} />
              </h2>
              
              <ul className="list-none p-0 mt-6">
                {steps.map((step, index) => (
                  <li key={index} className="flex gap-4 text-lg md:text-xl font-semibold mb-4">
                    <span className="text-2xl" style={{ color: spoolbearTheme.colors.accent }}>→</span>
                    <span style={{ color: spoolbearTheme.colors.text }}>{step.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Content - CTA and Form */}
            <div className="flex-1 flex flex-col gap-6 pt-6">
              {/* CTA Button */}
              <button
                onClick={scrollToUpload}
                className="self-start text-xl md:text-2xl font-extrabold px-8 py-5 rounded-full shadow-2xl transition-all hover:scale-105"
                style={{ 
                  backgroundColor: spoolbearTheme.colors.accent,
                  color: spoolbearTheme.colors.text
                }}
              >
                Upload your design
              </button>

              {/* Upload Form Card */}
              <div 
                id="upload-form"
                className="w-full rounded-2xl p-5 backdrop-blur-sm border transition-all"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.45)',
                  borderColor: 'rgba(0,0,0,0.08)'
                }}
              >
                <h3 className="font-black text-lg mb-1" style={{ color: spoolbearTheme.colors.text }}>
                  Upload files
                </h3>
                <p className="text-sm mb-3" style={{ color: 'rgba(0,0,0,0.65)' }}>
                  STL, OBJ, 3MF, STEP — max 100MB
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Name Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black tracking-wider" style={{ color: 'rgba(0,0,0,0.65)' }}>
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name *"
                      className="w-full px-3 py-2.5 rounded-xl border bg-white/85 text-sm focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                      style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black tracking-wider" style={{ color: 'rgba(0,0,0,0.65)' }}>
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address *"
                      className="w-full px-3 py-2.5 rounded-xl border bg-white/85 text-sm focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                      style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-black tracking-wider" style={{ color: 'rgba(0,0,0,0.65)' }}>
                      PHONE
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone (optional)"
                      className="w-full px-3 py-2.5 rounded-xl border bg-white/85 text-sm focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                      style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                    />
                  </div>

                  {/* Notes Field */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-black tracking-wider" style={{ color: 'rgba(0,0,0,0.65)' }}>
                      NOTES
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Notes (material, color, quantity, size, deadline...)"
                      rows={4}
                      className="w-full px-3 py-2.5 rounded-xl border bg-white/85 text-sm resize-y focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                      style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                    />
                  </div>

                  {/* File Upload Field */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-black tracking-wider" style={{ color: 'rgba(0,0,0,0.65)' }}>
                      FILE
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".stl,.obj,.3mf,.step,.stp,.f3d,.iges,.igs"
                      className="w-full px-3 py-2.5 rounded-xl border bg-white/85 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff5000] file:text-white hover:file:bg-[#e64800] transition-colors"
                      style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                    />
                    {formData.file && (
                      <p className="text-xs mt-1 flex items-center gap-1" style={{ color: spoolbearTheme.colors.accent }}>
                        <CheckCircle className="w-3 h-3" />
                        Selected: {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Message */}
                {status.type && (
                  <div className={`mt-3 p-3 rounded-xl flex items-center gap-2 ${
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

                {/* Submit Button */}
                <div className="flex mt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={uploading}
                    className="px-6 py-3 rounded-full font-bold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: spoolbearTheme.colors.accent,
                      color: spoolbearTheme.colors.text
                    }}
                  >
                    {uploading ? "Uploading..." : "Send files"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12" style={{ color: spoolbearTheme.colors.text }}>
            Why choose our <span style={{ color: spoolbearTheme.colors.accent }}>printing service</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
                  <div style={{ color: spoolbearTheme.colors.accent }}>{feature.icon}</div>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: spoolbearTheme.colors.text }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Supported File Formats */}
        <section className="py-16 md:py-20 bg-white/30 backdrop-blur-sm rounded-3xl px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: spoolbearTheme.colors.text }}>
                Supported <span style={{ color: spoolbearTheme.colors.accent }}>File Formats</span>
              </h2>
              <p className="text-lg mb-6" style={{ color: spoolbearTheme.colors.muted }}>
                We accept most common 3D file formats. If you&apos;re unsure about your file, just upload it and we&apos;ll check it for you.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { format: "STL", desc: "Stereolithography" },
                  { format: "OBJ", desc: "Wavefront Object" },
                  { format: "3MF", desc: "3D Manufacturing Format" },
                  { format: "STEP", desc: "Standard for Exchange" },
                  { format: "STP", desc: "STEP File" },
                  { format: "F3D", desc: "Fusion 360" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
                    <div>
                      <span className="font-bold" style={{ color: spoolbearTheme.colors.text }}>{item.format}</span>
                      <span className="text-xs ml-1" style={{ color: spoolbearTheme.colors.muted }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1615800098779-1be32e60cca3?auto=format&fit=crop&w=800&q=80"
                  alt="3D Printing"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl flex items-center gap-3">
                <Download className="w-6 h-6" style={{ color: spoolbearTheme.colors.accent }} />
                <div>
                  <div className="text-sm font-bold" style={{ color: spoolbearTheme.colors.text }}>Free File Check</div>
                  <div className="text-xs" style={{ color: spoolbearTheme.colors.muted }}>We&apos;ll validate your model</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12" style={{ color: spoolbearTheme.colors.text }}>
            Available <span style={{ color: spoolbearTheme.colors.accent }}>Materials</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "PLA", desc: "Easy to print, biodegradable", color: "#22c55e" },
              { name: "ABS", desc: "Strong, heat resistant", color: "#f97316" },
              { name: "PETG", desc: "Durable, food safe", color: "#3b82f6" },
              { name: "TPU", desc: "Flexible, rubber-like", color: "#a855f7" },
              { name: "Resin", desc: "High detail, smooth finish", color: "#ec4899" },
              { name: "Nylon", desc: "Strong, wear resistant", color: "#6b7280" },
              { name: "Polycarbonate", desc: "Impact resistant", color: "#eab308" },
              { name: "Carbon Fiber", desc: "Lightweight, rigid", color: "#101113" },
            ].map((material, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border flex items-center gap-3 hover:shadow-lg transition-all"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: material.color }} />
                <div>
                  <h3 className="font-bold" style={{ color: spoolbearTheme.colors.text }}>{material.name}</h3>
                  <p className="text-xs" style={{ color: spoolbearTheme.colors.muted }}>{material.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12" style={{ color: spoolbearTheme.colors.text }}>
            Frequently Asked <span style={{ color: spoolbearTheme.colors.accent }}>Questions</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How long does printing take?",
                a: "Most prints are completed within 24-48 hours, depending on size and complexity."
              },
              {
                q: "What file formats do you accept?",
                a: "We accept STL, OBJ, 3MF, STEP, STP, and F3D files. Maximum file size is 100MB."
              },
              {
                q: "Do you offer design services?",
                a: "Yes! If you don't have a 3D model, our design team can help create one for you."
              },
              {
                q: "What about shipping?",
                a: "We offer free shipping on orders over $100. Standard shipping takes 3-5 business days."
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
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-20">
          <div 
            className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
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
                Ready to start your project?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Upload your design or contact us for a free consultation.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={scrollToUpload}
                  className="px-8 py-4 bg-white font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  Upload Now
                </button>
                <Link
                  href="/contact"
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PrintPage;