// components/about/AboutTeam.tsx
"use client";
import React from "react";
import { Linkedin, Twitter } from "lucide-react";
import { useScrollReveal } from "./aboutUtils";

const team = [
  { name: "Sarah Johnson",   role: "Founder & CEO",          bio: "3D printing enthusiast with 10+ years of experience in additive manufacturing.",          image: "/images/team-1.jpg", social: { linkedin: "#", twitter: "#" } },
  { name: "Michael Chen",    role: "Lead Designer",           bio: "Expert in CAD design and 3D modeling, turning concepts into printable realities.",         image: "/images/team-2.jpg", social: { linkedin: "#", twitter: "#" } },
  { name: "Emily Rodriguez", role: "Head of Operations",      bio: "Ensuring smooth workflow and timely delivery of all your 3D printing projects.",           image: "/images/team-3.jpg", social: { linkedin: "#", twitter: "#" } },
  { name: "David Kim",       role: "Senior Print Technician", bio: "Master of materials and print optimization for perfect results every time.",               image: "/images/team-4.jpg", social: { linkedin: "#", twitter: "#" } },
];

const FALLBACK = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80";

const AboutTeam: React.FC = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="py-14 sm:py-16 md:py-20">
      <div
        className="container mx-auto"
        style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        {/* Heading */}
        <div
          className="text-center mb-10 sm:mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s, transform 0.6s" }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
            <div className="h-[2px] rounded-full bg-[#FF5000]" style={{ width: "clamp(20px, 3vw, 36px)" }} />
            <span className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
              style={{ fontSize: "clamp(9px, 1vw, 12px)" }}>
              The Team
            </span>
            <div className="h-[2px] rounded-full bg-[#FF5000]" style={{ width: "clamp(20px, 3vw, 36px)" }} />
          </div>
          <h2
            className="font-black text-[#101113] tracking-tight"
            style={{ fontSize: "clamp(24px, 4vw, 46px)", letterSpacing: "-0.03em" }}
          >
            Meet Our <span className="text-[#FF5000]">Team</span>
          </h2>
          <p
            className="font-medium text-[#2b2e33] mt-3 mx-auto"
            style={{ fontSize: "clamp(13px, 1.4vw, 17px)", maxWidth: "clamp(280px, 45vw, 520px)" }}
          >
            The passionate individuals behind your 3D printing projects.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-400"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "scale(0.92)",
                transition: `opacity 0.6s ${0.1 + i * 0.1}s ease-out, transform 0.6s ${0.1 + i * 0.1}s ease-out, box-shadow 0.3s, translate 0.4s`,
              }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ height: "clamp(180px, 22vw, 260px)" }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={e => { (e.target as HTMLImageElement).src = FALLBACK; }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101113]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Social icons */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {[
                    { href: member.social.linkedin, Icon: Linkedin },
                    { href: member.social.twitter,  Icon: Twitter  },
                  ].map(({ href, Icon }, si) => (
                    <a
                      key={si}
                      href={href}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[#FF5000] hover:text-white transition-colors duration-200"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="text-center p-5 sm:p-6">
                <h3
                  className="font-black text-[#101113] mb-0.5"
                  style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="font-bold text-[#FF5000] mb-3"
                  style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
                >
                  {member.role}
                </p>
                <p
                  className="font-medium text-[#2b2e33] leading-relaxed"
                  style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;