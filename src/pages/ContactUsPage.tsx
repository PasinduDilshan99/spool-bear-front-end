"use client";
import ContactCTA from "@/components/contact-us-page-components/ContactCTA";
import ContactFAQ from "@/components/contact-us-page-components/ContactFAQ";
import ContactForm from "@/components/contact-us-page-components/ContactForm";
import ContactHero from "@/components/contact-us-page-components/ContactHero";
import ContactInfoCards from "@/components/contact-us-page-components/ContactInfoCards";

function Divider() {
  return (
    <div
      className="flex items-center gap-3 mx-auto"
      style={{ padding: "0 clamp(16px, 4vw, 64px)", maxWidth: "1400px" }}
    >
      <div className="flex-1 h-px bg-black/6" />
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full bg-[#FF5000] animate-pulse"
            style={{
              width: "5px",
              height: "5px",
              opacity: 0.35,
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
      <div className="flex-1 h-px bg-black/6" />
    </div>
  );
}

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#e4e7ec] relative overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10">
        <ContactHero />

        <Divider />

        <ContactInfoCards />

        <Divider />

        <ContactForm />

        <Divider />

        {/* <ContactFAQ />

        <Divider /> */}

        <ContactCTA />
      </div>
    </div>
  );
};

export default ContactPage;
