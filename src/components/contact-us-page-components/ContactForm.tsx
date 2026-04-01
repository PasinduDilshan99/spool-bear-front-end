"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  User,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  MessageSquare,
  Clock,
} from "lucide-react";
import { ContactUsService } from "@/service/contactUsService";
import { ContactFormData, SubmitStatus } from "@/types/contact-us-page-types";
import { socialLinksData } from "@/data/contact-us-page-data";

const inputClass =
  "w-full py-3 text-sm text-[#101113] bg-white/80 border border-gray-200 rounded-xl outline-none placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white transition-all duration-200 font-medium";
const labelClass =
  "block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1.5";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  const contactUsService = new ContactUsService();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
    });
    setStatus({ type: null, message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!formData.name.trim())
      return setStatus({ type: "error", message: "Please enter your name." });
    if (!formData.email.trim())
      return setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
    if (!formData.phone.trim())
      return setStatus({
        type: "error",
        message: "Please enter your contact number.",
      });
    if (!formData.subject.trim())
      return setStatus({ type: "error", message: "Please select a subject." });
    if (!formData.message.trim())
      return setStatus({
        type: "error",
        message: "Please enter your message.",
      });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });

    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(formData.phone))
      return setStatus({
        type: "error",
        message: "Please enter a valid contact number.",
      });

    setSubmitting(true);
    setStatus({ type: "info", message: "Sending your message..." });

    try {
      const requestBody = {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await contactUsService.addInquiry(requestBody);

      if (response.code === 200 || response.status === "success") {
        setStatus({
          type: "success",
          message:
            response.data?.message ||
            "Message sent! We'll get back to you within 24–48 hours.",
        });
        clearForm();
      } else {
        setStatus({
          type: "error",
          message:
            response.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);

      let errorMessage =
        "Network error. Please check your connection and try again.";

      if (error instanceof Error) {
        if (error.message.includes("HTTP error")) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.message.includes("fetch")) {
          errorMessage =
            "Unable to connect to the server. Please check your internet connection.";
        } else {
          errorMessage = error.message;
        }
      }

      setStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-14 md:py-16">
      <div
        className="container mx-auto"
        style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <div className="bg-[#1A1A1A] relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="h-1 bg-[#FF5000]" />
              <div className="relative px-6 sm:px-8 py-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF5000]/20 flex items-center justify-center flex-shrink-0">
                  <Send size={16} className="text-[#FF5000]" />
                </div>
                <div>
                  <h2
                    className="font-black text-white leading-tight"
                    style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
                  >
                    Send Us a Message
                  </h2>
                  <p className="text-[11px] text-white/45 mt-0.5">
                    We&apos;ll respond within 24–48 hours
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-[#FF5000]">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Email Address <span className="text-[#FF5000]">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Contact Number <span className="text-[#FF5000]">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 8900"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="">
                  <label className={labelClass}>
                    Subject <span className="text-[#FF5000]">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`${inputClass} px-4 appearance-none cursor-pointer`}
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

                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Message <span className="text-[#FF5000]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, question, or concern..."
                    rows={5}
                    className={`${inputClass} px-4 resize-y`}
                  />
                </div>
              </div>

              {status.type && (
                <div
                  className={`flex items-start gap-3 p-4 rounded-xl mb-4 border ${
                    status.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : status.type === "error"
                        ? "bg-red-50 border-red-200 text-red-700"
                        : "bg-blue-50 border-blue-200 text-blue-700"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle size={16} className="shrink-0 mt-0.5" />
                  ) : status.type === "info" ? (
                    <Loader2
                      size={16}
                      className="shrink-0 mt-0.5 animate-spin"
                    />
                  ) : (
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm font-medium flex-1">
                    {status.message}
                  </span>
                  <button
                    onClick={() => setStatus({ type: null, message: "" })}
                    className="opacity-50 hover:opacity-80"
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer inline-flex items-center gap-2.5 font-black uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 13px)",
                    padding:
                      "clamp(12px, 1.4vw, 15px) clamp(22px, 2.8vw, 36px)",
                    background: submitting
                      ? "#CC4000"
                      : "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
                    borderRadius: "clamp(10px, 1.2vw, 14px)",
                    boxShadow: "0 6px 24px rgba(255,80,0,0.34)",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={clearForm}
                  className="cursor-pointer inline-flex items-center gap-2 font-bold text-[#2b2e33] border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 13px)",
                    padding: "clamp(12px, 1.4vw, 15px) clamp(16px, 2vw, 24px)",
                    borderRadius: "clamp(10px, 1.2vw, 14px)",
                  }}
                >
                  <X size={13} /> Clear
                </button>
              </div>

              <p className="text-[10px] text-gray-400 mt-4 font-medium">
                * Required fields. We never share your information with third
                parties.
              </p>
            </form>
          </div>

          <div className="space-y-5">
            <div
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              style={{ height: "clamp(220px, 28vw, 320px)" }}
            >
              <iframe
                src="https://www.google.com/maps?q=6.826789043270704,79.97634694042084&hl=en&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Location Map"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-1 bg-[#FF5000]" />
              <div className="p-5 sm:p-6">
                <h3
                  className="font-black text-[#101113] mb-4"
                  style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}
                >
                  Connect With Us
                </h3>
                <div className="flex gap-2.5">
                  {socialLinksData.map(({ icon: Icon, href, label }, si) => (
                    <a
                      key={si}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center rounded-xl text-[#FF5000] transition-all duration-200 hover:bg-[#a23401] hover:text-gray-700 hover:scale-110"
                      style={{
                        width: "clamp(34px, 4vw, 42px)",
                        height: "clamp(34px, 4vw, 42px)",
                        background: "rgba(255,80,0,0.10)",
                      }}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-1 bg-[#FF5000]" />
              <div className="p-5 sm:p-6 flex items-start gap-4">
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0 mt-0.5"
                  style={{
                    width: "clamp(36px, 4.5vw, 48px)",
                    height: "clamp(36px, 4.5vw, 48px)",
                    background: "rgba(255,80,0,0.10)",
                  }}
                >
                  <Clock size={18} className="text-[#FF5000]" />
                </div>
                <div>
                  <h3
                    className="font-black text-[#101113] mb-1"
                    style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}
                  >
                    Quick Response Guarantee
                  </h3>
                  <p
                    className="font-medium text-[#2b2e33] mb-3 leading-relaxed"
                    style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
                  >
                    We aim to respond to all inquiries within 24 hours during
                    business days. Your time is valuable, and we respect that.
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-[#FF5000] font-bold"
                    style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
                  >
                    <MessageSquare size={13} />
                    Average response time: 2 hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
