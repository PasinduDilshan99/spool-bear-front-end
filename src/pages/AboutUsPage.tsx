// app/about/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Target,
  Heart,
  Award,
  Printer,
  Cpu,
  Package,
  Truck,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
  Quote,
  Star,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

/* ══════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ══════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // Extract number from target (e.g., "5000+" -> 5000)
  const numericTarget = parseInt(target.replace(/\D/g, ''));
  const hasPlus = target.includes('+');

  useEffect(() => {
    const el = ref.current;
    if (!el || isNaN(numericTarget)) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 50;
          const inc = numericTarget / steps;
          let cur = 0;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= numericTarget) {
              setCount(numericTarget);
              clearInterval(timer);
            } else {
              setCount(Math.floor(cur));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [numericTarget]);

  return (
    <div ref={ref}>
      {count.toLocaleString()}{hasPlus ? '+' : ''}{suffix}
    </div>
  );
}

const AboutUsPage = () => {
  // Company stats
  const stats = [
    { value: "100+", label: "Prints Completed", icon: <Printer className="w-6 h-6" /> },
    { value: "20+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> },
    { value: "4", label: "Materials Available", icon: <Package className="w-6 h-6" /> },
    { value: "24/7", label: "Customer Support", icon: <Clock className="w-6 h-6" /> },
  ];

  // Core values
  const values = [
    {
      title: "Quality First",
      description: "We never compromise on quality. Every print is meticulously checked before delivery.",
      icon: <Award className="w-8 h-8" />,
      color: spoolbearTheme.colors.accent,
    },
    {
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We work closely with you to bring your ideas to life.",
      icon: <Heart className="w-8 h-8" />,
      color: spoolbearTheme.colors.accent,
    },
    {
      title: "Innovation Driven",
      description: "We stay at the forefront of 3D printing technology to offer you the best solutions.",
      icon: <Cpu className="w-8 h-8" />,
      color: spoolbearTheme.colors.accent,
    },
    {
      title: "Reliable Service",
      description: "On-time delivery and consistent quality you can count on, every single time.",
      icon: <Shield className="w-8 h-8" />,
      color: spoolbearTheme.colors.accent,
    },
  ];

  // Team members
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "3D printing enthusiast with 10+ years of experience in additive manufacturing.",
      image: "/images/team-1.jpg",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Michael Chen",
      role: "Lead Designer",
      bio: "Expert in CAD design and 3D modeling, turning concepts into printable realities.",
      image: "/images/team-2.jpg",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      bio: "Ensuring smooth workflow and timely delivery of all your 3D printing projects.",
      image: "/images/team-3.jpg",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "David Kim",
      role: "Senior Print Technician",
      bio: "Master of materials and print optimization for perfect results every time.",
      image: "/images/team-4.jpg",
      social: { linkedin: "#", twitter: "#" },
    },
  ];

  // Milestones
  const milestones = [
    { year: "2018", title: "Company Founded", description: "Started with a single printer in a small garage." },
    { year: "2019", title: "First 1000 Prints", description: "Reached our first major milestone with 1000 successful prints." },
    { year: "2021", title: "Expanded Facility", description: "Moved to our current facility and expanded to 20 printers." },
    { year: "2023", title: "1000+ Clients", description: "Served over 1000 happy clients across the country." },
    { year: "2024", title: "50+ Materials", description: "Now offering over 50 different materials for any project." },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "John Smith",
      role: "Product Designer",
      content: "SpoolBear has been instrumental in bringing my prototypes to life. Their quality and speed are unmatched.",
      rating: 5,
      image: "/images/testimonial-1.jpg",
    },
    {
      name: "Lisa Wang",
      role: "Architect",
      content: "I've used their service for multiple architectural models. The precision and attention to detail is exceptional.",
      rating: 5,
      image: "/images/testimonial-2.jpg",
    },
    {
      name: "Tom Anderson",
      role: "Hobbyist",
      content: "As a hobbyist, I appreciate their helpful advice and affordable pricing. They've become my go-to for all prints.",
      rating: 5,
      image: "/images/testimonial-3.jpg",
    },
  ];

  const heroReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const valuesReveal = useScrollReveal();
  const teamReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();

  return (
    <>
      <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');

        @keyframes aboutReveal {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes aboutFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes aboutSlideRight {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes aboutSlideLeft {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes aboutScale {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1);    }
        }
        @keyframes aboutFloat {
          0%,100% { transform: translateY(0);  }
          50%     { transform: translateY(-12px); }
        }
        @keyframes aboutPulse {
          0%,100% { opacity: 0.15; transform: scale(1);    }
          50%     { opacity: 0.30; transform: scale(1.10); }
        }
        @keyframes aboutShimmer {
          0%   { left: -100%; }
          100% { left: 200%;  }
        }
        @keyframes aboutOrbitCW  { to { transform: rotate(360deg);  } }
        @keyframes aboutOrbitCCW { to { transform: rotate(-360deg); } }
        @keyframes aboutUnderline {
          from { width: 0;    }
          to   { width: 100%; }
        }
        @keyframes aboutBadgePop {
          0%   { opacity: 0; transform: scale(0) rotate(-15deg); }
          70%  { transform: scale(1.12) rotate(5deg);  }
          100% { opacity: 1; transform: scale(1) rotate(0deg);   }
        }
      `}</style>

      <div className="min-h-screen bg-[#e4e7ec] relative" style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}>
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: `linear-gradient(${spoolbearTheme.colors.accent}1a 1px, transparent 1px), 
                           linear-gradient(90deg, ${spoolbearTheme.colors.accent}1a 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }} />

        {/* Hero Section */}
        <section ref={heroReveal.ref} className="relative py-20 md:py-28 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{ background: `radial-gradient(circle at top right, ${spoolbearTheme.colors.accent}0a 0%, transparent 65%)` }} />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ maxWidth: "1400px" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{
                    backgroundColor: `${spoolbearTheme.colors.accent}10`,
                    animation: heroReveal.visible ? "aboutReveal 0.6s 0.0s ease-out both" : "none",
                    opacity: heroReveal.visible ? undefined : 0,
                  }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: spoolbearTheme.colors.accent }} />
                  <span className="text-[11px] font-black uppercase tracking-[0.16em]" style={{ color: spoolbearTheme.colors.accent }}>
                    About SpoolBear
                  </span>
                </div>
                
                <h1 className="font-black leading-[1.04] mb-6"
                  style={{
                    fontSize: "clamp(38px, 5vw, 60px)",
                    letterSpacing: "-0.03em",
                    color: spoolbearTheme.colors.text,
                    animation: heroReveal.visible ? "aboutReveal 0.6s 0.12s ease-out both" : "none",
                    opacity: heroReveal.visible ? undefined : 0,
                  }}>
                  Turning Digital Designs Into{" "}
                  <span className="relative inline-block" style={{ color: spoolbearTheme.colors.accent }}>
                    Real-World Solutions
                    <span className="absolute bottom-0 left-0 h-[4px] rounded-full"
                      style={{
                        background: `${spoolbearTheme.colors.accent}40`,
                        animation: heroReveal.visible ? "aboutUnderline 0.9s 0.70s ease-out both" : "none",
                        width: 0,
                      }} />
                  </span>
                </h1>
                
                <p className="text-lg leading-relaxed mb-8"
                  style={{
                    color: spoolbearTheme.colors.muted,
                    animation: heroReveal.visible ? "aboutReveal 0.6s 0.22s ease-out both" : "none",
                    opacity: heroReveal.visible ? undefined : 0,
                  }}>
                  Since 2018, we&apos;ve been helping creators, engineers, and businesses bring their ideas to life 
                  through professional 3D printing services. What started as a passion project has grown into a 
                  trusted partner for over 1000 clients.
                </p>
                
                <div className="flex flex-wrap gap-4"
                  style={{
                    animation: heroReveal.visible ? "aboutReveal 0.6s 0.32s ease-out both" : "none",
                    opacity: heroReveal.visible ? undefined : 0,
                  }}>
                  <Link href="/shop"
                    className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 text-white font-black uppercase tracking-[0.08em] text-sm rounded-2xl transition-all duration-300"
                    style={{ backgroundColor: spoolbearTheme.colors.accent, boxShadow: "0 6px 24px rgba(255,80,0,0.35)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e64800";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,80,0,0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = spoolbearTheme.colors.accent;
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,80,0,0.35)";
                    }}>
                    <span className="absolute top-0 bottom-0 w-16 pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                        animation: "aboutShimmer 2.5s 1.2s ease-in-out infinite",
                      }} />
                    <span className="relative z-10">Explore Our Work</span>
                    <ArrowRight className="relative z-10 w-5 h-5" />
                  </Link>
                  
                  <Link href="/contact-us"
                    className="inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-[0.08em] text-sm rounded-2xl border-2 transition-all duration-300"
                    style={{
                      borderColor: `${spoolbearTheme.colors.text}30`,
                      color: spoolbearTheme.colors.text,
                      background: "rgba(255,255,255,0.60)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = spoolbearTheme.colors.text;
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = spoolbearTheme.colors.text;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.60)';
                      e.currentTarget.style.color = spoolbearTheme.colors.text;
                      e.currentTarget.style.borderColor = `${spoolbearTheme.colors.text}30`;
                      e.currentTarget.style.transform = "none";
                    }}>
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="relative"
                style={{
                  animation: heroReveal.visible ? "aboutSlideLeft 0.8s 0.15s ease-out both" : "none",
                  opacity: heroReveal.visible ? undefined : 0,
                }}>
                {/* Orbit rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-[520px] h-[520px] max-w-full max-h-full" viewBox="0 0 520 520" fill="none">
                    <circle cx="260" cy="260" r="230" stroke={`${spoolbearTheme.colors.accent}14`} strokeWidth="1.5" strokeDasharray="10 14"
                      style={{ animation: "aboutOrbitCW 30s linear infinite", transformOrigin: "260px 260px" }} />
                    <circle cx="260" cy="260" r="185" stroke={`${spoolbearTheme.colors.accent}1a`} strokeWidth="1" strokeDasharray="7 11"
                      style={{ animation: "aboutOrbitCCW 22s linear infinite", transformOrigin: "260px 260px" }} />
                  </svg>
                </div>

                {/* Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-80 h-80 rounded-full"
                    style={{
                      background: `radial-gradient(circle at center, ${spoolbearTheme.colors.accent}18 0%, transparent 70%)`,
                      filter: "blur(48px)",
                      animation: "aboutPulse 5s ease-in-out infinite",
                    }} />
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=800&q=80"
                    alt="3D Printing Workshop"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(145deg, rgba(16,17,19,0.4) 0%, transparent 100%)" }} />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                    style={{ animation: heroReveal.visible ? "aboutBadgePop 0.6s 0.80s ease-out both" : "none", opacity: heroReveal.visible ? undefined : 0 }}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: spoolbearTheme.colors.accent }}>
                        <Printer className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-black" style={{ color: spoolbearTheme.colors.accent }}>
                          <AnimatedCounter target="5000+" />
                        </div>
                        <div className="text-sm font-semibold" style={{ color: spoolbearTheme.colors.muted }}>Prints Completed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsReveal.ref} className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1400px" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border transition-all duration-300 hover:-translate-y-2"
                  style={{
                    borderColor: `${spoolbearTheme.colors.accent}20`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    animation: statsReveal.visible ? `aboutScale 0.6s ${0.1 + index * 0.1}s ease-out both` : "none",
                    opacity: statsReveal.visible ? undefined : 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.14)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
                    <div style={{ color: spoolbearTheme.colors.accent }}>{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-black mb-1" style={{ color: spoolbearTheme.colors.accent }}>
                    {stat.value === "24/7" ? stat.value : <AnimatedCounter target={stat.value} />}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: spoolbearTheme.colors.muted }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section - keeping original milestone layout */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1400px" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Timeline */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-8" style={{ color: spoolbearTheme.colors.text }}>
                  Our <span style={{ color: spoolbearTheme.colors.accent }}>Journey</span>
                </h2>
                
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-sm"
                          style={{
                            background: `linear-gradient(145deg, ${spoolbearTheme.colors.accent} 0%, #e34800 100%)`,
                            boxShadow: `0 4px 16px ${spoolbearTheme.colors.accent}40`,
                          }}>
                          {milestone.year}
                        </div>
                        {index < milestones.length - 1 && (
                          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-20"
                            style={{ backgroundColor: `${spoolbearTheme.colors.accent}30` }} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h3 className="text-xl font-black mb-2" style={{ color: spoolbearTheme.colors.text }}>
                          {milestone.title}
                        </h3>
                        <p className="font-medium" style={{ color: spoolbearTheme.colors.muted }}>{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image + Quote */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1615800098779-1be32e60cca3?auto=format&fit=crop&w=800&q=80"
                    alt="3D Printing in action"
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Quote Card */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-xs"
                  style={{ animation: "aboutFloat 4s ease-in-out infinite" }}>
                  <Quote className="w-8 h-8 mb-2" style={{ color: spoolbearTheme.colors.accent }} />
                  <p className="text-sm mb-3 font-medium" style={{ color: spoolbearTheme.colors.text }}>
                    Every print tells a story. We&apos;re here to help you write yours.
                  </p>
                  <p className="text-xs font-black uppercase tracking-wider" style={{ color: spoolbearTheme.colors.accent }}>
                    — Sarah Johnson, Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesReveal.ref} className="py-20 md:py-28 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1400px" }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: spoolbearTheme.colors.text }}>
                What We <span style={{ color: spoolbearTheme.colors.accent }}>Stand For</span>
              </h2>
              <p className="text-lg font-medium" style={{ color: spoolbearTheme.colors.muted }}>
                Our core values drive everything we do, from the first consultation to final delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index}
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center border transition-all duration-500 hover:-translate-y-3"
                  style={{
                    borderColor: `${spoolbearTheme.colors.accent}20`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    animation: valuesReveal.visible ? `aboutReveal 0.6s ${0.15 + index * 0.12}s ease-out both` : "none",
                    opacity: valuesReveal.visible ? undefined : 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.16)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl rotate-45 flex items-center justify-center transition-all duration-500 group-hover:rotate-90"
                    style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
                    <div className="-rotate-45 group-hover:-rotate-90 transition-all duration-500" style={{ color: value.color }}>
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-3" style={{ color: spoolbearTheme.colors.text }}>
                    {value.title}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: spoolbearTheme.colors.muted }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - keeping original 2x2 grid */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1400px" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Zap />, title: "Fast Turnaround", desc: "Most prints completed within 48 hours" },
                    { icon: <Shield />, title: "Quality Guaranteed", desc: "100% satisfaction or your money back" },
                    { icon: <Package />, title: "Wide Material Range", desc: "50+ materials for any project" },
                    { icon: <Truck />, title: "Free Shipping", desc: "On orders over $100" },
                  ].map((item, index) => (
                    <div key={index}
                      className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border transition-all hover:-translate-y-1"
                      style={{
                        borderColor: `${spoolbearTheme.colors.accent}20`,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.14)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")}>
                      <div className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
                        <div className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }}>{item.icon}</div>
                      </div>
                      <h4 className="font-black text-sm mb-1" style={{ color: spoolbearTheme.colors.text }}>{item.title}</h4>
                      <p className="text-xs font-medium" style={{ color: spoolbearTheme.colors.muted }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: spoolbearTheme.colors.text }}>
                  Why Choose <span style={{ color: spoolbearTheme.colors.accent }}>SpoolBear</span>
                </h2>
                <p className="text-lg mb-6 font-medium" style={{ color: spoolbearTheme.colors.muted }}>
                  We combine expertise, cutting-edge technology, and a passion for 3D printing to deliver exceptional results every time.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Professional-grade printers and materials",
                    "Expert design assistance and consultation",
                    "Real-time order tracking and updates",
                    "Competitive pricing with no hidden fees",
                    "Dedicated customer support team",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: spoolbearTheme.colors.accent }} />
                      <span className="font-medium" style={{ color: spoolbearTheme.colors.text }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamReveal.ref} className="py-20 md:py-28 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1400px" }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: spoolbearTheme.colors.text }}>
                Meet Our <span style={{ color: spoolbearTheme.colors.accent }}>Team</span>
              </h2>
              <p className="text-lg font-medium" style={{ color: spoolbearTheme.colors.muted }}>
                The passionate individuals behind your 3D printing projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index}
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-3"
                  style={{
                    borderColor: `${spoolbearTheme.colors.accent}20`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    animation: teamReveal.visible ? `aboutScale 0.6s ${0.15 + index * 0.12}s ease-out both` : "none",
                    opacity: teamReveal.visible ? undefined : 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.16)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101113]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Social Links */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      <a href={member.social.linkedin} className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors hover:bg-[#ff5000] hover:text-white">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href={member.social.twitter} className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors hover:bg-[#ff5000] hover:text-white">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-black mb-1" style={{ color: spoolbearTheme.colors.text }}>
                      {member.name}
                    </h3>
                    <p className="text-sm font-bold mb-3" style={{ color: spoolbearTheme.colors.accent }}>
                      {member.role}
                    </p>
                    <p className="text-sm font-medium" style={{ color: spoolbearTheme.colors.muted }}>
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <section ref={testimonialsReveal.ref} className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1400px" }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: spoolbearTheme.colors.text }}>
                What Our <span style={{ color: spoolbearTheme.colors.accent }}>Clients Say</span>
              </h2>
              <p className="text-lg font-medium" style={{ color: spoolbearTheme.colors.muted }}>
                Don&apos;t just take our word for it — hear from some of our satisfied customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border transition-all hover:-translate-y-2"
                  style={{
                    borderColor: `${spoolbearTheme.colors.accent}20`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    animation: testimonialsReveal.visible ? `aboutReveal 0.6s ${0.15 + index * 0.12}s ease-out both` : "none",
                    opacity: testimonialsReveal.visible ? undefined : 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.14)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-current"
                        style={{ color: i < testimonial.rating ? spoolbearTheme.colors.accent : `${spoolbearTheme.colors.muted}30` }}
                      />
                    ))}
                  </div>
                  
                  <p className="mb-6 italic font-medium" style={{ color: spoolbearTheme.colors.text }}>
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-black" style={{ color: spoolbearTheme.colors.text }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-sm font-semibold" style={{ color: spoolbearTheme.colors.muted }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Contact CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1400px" }}>
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
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-white">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/80 font-medium">
                  Whether you have a 3D model ready or just an idea, our team is here to help.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/contact"
                    className="px-8 py-4 bg-white font-black uppercase tracking-[0.08em] text-sm rounded-2xl transition-all duration-300 hover:bg-gray-100 hover:translate-y-[-3px]"
                    style={{ color: spoolbearTheme.colors.text }}>
                    Get a Free Quote
                  </Link>
                  <Link href="/products"
                    className="px-8 py-4 border-2 border-white text-white font-black uppercase tracking-[0.08em] text-sm rounded-2xl transition-all duration-300 hover:bg-white/10 hover:translate-y-[-3px]">
                    Browse Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        {/* <section className="py-20 md:py-28 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1400px" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Mail className="w-8 h-8" />, title: "Email Us", info: ["info@spoolbear.com", "support@spoolbear.com"] },
                { icon: <Phone className="w-8 h-8" />, title: "Call Us", info: ["+1 (555) 123-4567", "Mon-Fri, 9am-6pm"] },
                { icon: <MapPin className="w-8 h-8" />, title: "Visit Us", info: ["123 Maker Street", "Tech City, TC 12345"] },
              ].map((contact, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
                    <div style={{ color: spoolbearTheme.colors.accent }}>{contact.icon}</div>
                  </div>
                  <h3 className="text-lg font-black mb-2" style={{ color: spoolbearTheme.colors.text }}>{contact.title}</h3>
                  {contact.info.map((line, i) => (
                    <p key={i} className="text-sm font-semibold" style={{ color: spoolbearTheme.colors.muted }}>{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default AboutUsPage;