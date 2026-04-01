// components/contact/ContactInfoCards.tsx
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  X,
  MessageCircle,
} from "lucide-react";
import {
  COMPANY_ADDRESS_LINE1,
  COMPANY_ADDRESS_LINE2,
  COMPANY_ADDRESS_NUMBER,
  COMPANY_CONTACT_NUMBER,
  COMPANY_CONTACT_NUMBER_FOR_LINK,
  COMPANY_INFO_EMAIL,
  COMPANY_WHATSAPP_CONTACT_NUMBER,
  COMPANY_WHATSAPP_CONTACT_NUMBER_FOR_LINK,
} from "@/utils/constant";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: [COMPANY_INFO_EMAIL],
    action: "email",
    linkText: "Send email",
    emailTo: COMPANY_INFO_EMAIL,
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [COMPANY_CONTACT_NUMBER],
    action: "call",
    linkText: "Contact us",
    phoneNumber: COMPANY_CONTACT_NUMBER_FOR_LINK,
    whatsappNumber: COMPANY_WHATSAPP_CONTACT_NUMBER_FOR_LINK,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      COMPANY_ADDRESS_NUMBER,
      COMPANY_ADDRESS_LINE1,
      COMPANY_ADDRESS_LINE2,
    ],
    action: "location",
    linkText: "Get directions",
    location: "123+Maker+Street+Tech+City+TC+12345",
    lat: 6.826789043270704,
    lng: 79.97634694042084,
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon – Fri: 9am – 6pm", "Saturday: 10am – 4pm", "Sunday: Closed"],
    action: null,
    linkText: null,
  },
];

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCall: () => void;
  onWhatsApp: () => void;
}

const CallDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onCall,
  onWhatsApp,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#FF5000]/10 rounded-xl">
              <Phone size={24} className="text-[#FF5000]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
          </div>

          <p className="text-gray-600 mb-6">
            How would you like to connect with us?
          </p>

          <div className="space-y-3">
            <button
              onClick={onCall}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#FF5000] hover:bg-[#FF5000]/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[#FF5000]" />
                <span className="font-semibold text-gray-900">Phone Call</span>
              </div>
              <ArrowRight
                size={18}
                className="text-gray-400 group-hover:text-[#FF5000] group-hover:translate-x-1 transition-all"
              />
            </button>

            <button
              onClick={onWhatsApp}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={20} className="text-[#25D366]" />
                <span className="font-semibold text-gray-900">WhatsApp</span>
              </div>
              <ArrowRight
                size={18}
                className="text-gray-400 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoCards: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
  const [selectedWhatsAppNumber, setSelectedWhatsAppNumber] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Use window.open with _self target instead of modifying location.href directly
  const handleEmailClick = useCallback((emailTo: string) => {
    window.open(`mailto:${emailTo}`, "_self");
  }, []);

  const handleCallClick = useCallback(
    (phoneNumber: string, whatsappNumber: string) => {
      setSelectedPhoneNumber(phoneNumber);
      setSelectedWhatsAppNumber(whatsappNumber);
      setIsDialogOpen(true);
    },
    [],
  );

  const handlePhoneCall = useCallback(() => {
    window.open(`tel:${selectedPhoneNumber}`, "_self");
    setIsDialogOpen(false);
  }, [selectedPhoneNumber]);

  const handleWhatsApp = useCallback(() => {
    const cleanNumber = selectedWhatsAppNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanNumber}`, "_blank");
    setIsDialogOpen(false);
  }, [selectedWhatsAppNumber]);

  const handleLocationClick = useCallback(
    (location?: string, lat?: number, lng?: number) => {
      if (lat && lng) {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
          "_blank",
        );
      } else if (location) {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${location}`,
          "_blank",
        );
      } else {
        window.open("https://maps.google.com", "_blank");
      }
    },
    [],
  );

  const handleCardClick = useCallback(
    (info: (typeof contactInfo)[0]) => {
      if (info.action === "email" && info.emailTo) {
        handleEmailClick(info.emailTo);
      } else if (
        info.action === "call" &&
        info.phoneNumber &&
        info.whatsappNumber
      ) {
        handleCallClick(info.phoneNumber, info.whatsappNumber);
      } else if (info.action === "location") {
        handleLocationClick(info.location, info.lat, info.lng);
      }
    },
    [handleEmailClick, handleCallClick, handleLocationClick],
  );

  return (
    <>
      <section ref={ref} className="py-10 sm:py-12 md:py-14">
        <div
          className="container mx-auto"
          style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              const hasAction = info.action !== null;

              return (
                <div
                  key={i}
                  onClick={() => hasAction && handleCardClick(info)}
                  className={`group relative bg-white rounded-2xl border border-gray-100 overflow-hidden ${
                    hasAction
                      ? "cursor-pointer hover:-translate-y-1.5 hover:shadow-xl"
                      : ""
                  } transition-all duration-300`}
                  style={{
                    padding: "clamp(18px, 2.5vw, 28px)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(24px)",
                    transition: `opacity 0.6s ${0.08 + i * 0.09}s ease-out, transform 0.6s ${0.08 + i * 0.09}s ease-out, box-shadow 0.3s, translate 0.3s`,
                  }}
                >
                  {/* Orange top bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 group-hover:bg-[#FF5000] transition-colors duration-300" />

                  {/* Icon */}
                  <div
                    className="flex items-center justify-center rounded-xl mb-4 group-hover:bg-[#FF5000] transition-colors duration-300"
                    style={{
                      width: "clamp(36px, 4.5vw, 48px)",
                      height: "clamp(36px, 4.5vw, 48px)",
                      background: "rgba(255,80,0,0.10)",
                    }}
                  >
                    <Icon
                      size={18}
                      className="text-[#FF5000] group-hover:text-gray-700 transition-colors duration-300"
                    />
                  </div>

                  <h3
                    className="font-black text-[#101113] mb-2 transition-colors duration-300 group-hover:text-[#FF5000]"
                    style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}
                  >
                    {info.title}
                  </h3>

                  {info.details.map((d, di) => (
                    <p
                      key={di}
                      className="font-medium text-[#2b2e33]"
                      style={{
                        fontSize: "clamp(11px, 1.1vw, 13px)",
                        lineHeight: 1.6,
                      }}
                    >
                      {d}
                    </p>
                  ))}

                  {info.linkText && (
                    <div
                      className="inline-flex items-center gap-1.5 font-bold text-[#FF5000] mt-3 group-hover:gap-2.5 transition-all duration-200"
                      style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
                    >
                      {info.linkText}
                      <ArrowRight size={13} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CallDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCall={handlePhoneCall}
        onWhatsApp={handleWhatsApp}
      />
    </>
  );
};

export default ContactInfoCards;
