"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  description?: string;
  releaseDate?: string;
  imagePath?: string;
  className?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Something Exciting is Coming Soon",
  subtitle = "We're working on something special",
  description = "Our team of Bear Workers is busy crafting a new experience for you. Stay tuned for updates!",
  releaseDate = "Spring 2024",
  imagePath = "/images/bear-worker.png",
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 15
  });

  // Simulate countdown (in real app, you'd calculate from actual release date)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative min-h-screen bg-[#e4e7ec] overflow-hidden flex items-center ${className}`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0 animate-pulse-slow"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #ff5000 0%, transparent 15%),
                             radial-gradient(circle at 80% 70%, #ff5000 0%, transparent 15%),
                             radial-gradient(circle at 40% 50%, #ff5000 0%, transparent 10%)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#ff5000]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ff5000]/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff5000]/5 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#ff5000]/10 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5000] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5000]"></span>
              </span>
              <span className="text-[#ff5000] font-semibold uppercase tracking-wider text-sm">
                Coming Soon
              </span>
            </div>

            {/* Title */}
            <h1 className="font-black text-[clamp(42px,6vw,72px)] tracking-[-0.02em] text-[#101113] mb-6 animate-slide-up">
              {title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#ff5000] mb-6 animate-slide-up delay-100">
              {subtitle}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#2b2e33] mb-10 max-w-2xl mx-auto lg:mx-0 animate-slide-up delay-200">
              {description}
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto lg:mx-0 mb-10">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-pop-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-black text-[#ff5000] mb-1">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm uppercase tracking-wider text-[#2b2e33] font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Release Date */}
            <p className="text-[#101113] text-base mb-8 animate-fade-in delay-300">
              <span className="font-semibold">Expected Release:</span>{' '}
              <span className="text-[#ff5000] font-bold">{releaseDate}</span>
            </p>

            {/* Notify Form */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0 animate-slide-up delay-300">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-full border-2 border-transparent focus:border-[#ff5000] outline-none text-[#101113] placeholder:text-[#2b2e33]/50 transition-all duration-300"
              />
              <button className="group relative px-8 py-4 bg-[#ff5000] text-white font-bold rounded-full hover:bg-[#e64800] transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden">
                <span className="relative z-10">Notify Me</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              {['📱', '💬', '🐦', '📘'].map((icon, index) => (
                <button
                  key={index}
                  className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl hover:bg-[#ff5000] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg animate-pop-up"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Animated Illustration */}
          <div className="relative lg:order-2 animate-float-slow">
            {/* Main Image Container */}
            <div className="relative">
              {/* 3D Printer Model (using the bear worker image as placeholder) */}
              <div className="relative z-10">
                <div className="relative w-full max-w-lg mx-auto">
                  <Image
                    src={imagePath}
                    alt="Coming Soon Illustration"
                    width={500}
                    height={500}
                    className="object-contain drop-shadow-2xl animate-float"
                  />

                  {/* Animated Printing Effect */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#ff5000]/20 rounded-full animate-pulse-width" />
                  
                  {/* Floating Particles */}
                  <div className="absolute top-1/4 right-0 w-4 h-4 bg-[#ff5000] rounded-full animate-float-particle" />
                  <div className="absolute bottom-1/3 left-0 w-3 h-3 bg-[#ff5000] rounded-full animate-float-particle-delayed" />
                  
                  {/* Progress Ring */}
                  <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] animate-spin-slow" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#ff5000"
                      strokeWidth="1"
                      strokeDasharray="283"
                      strokeDashoffset="70"
                      className="opacity-20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#ff5000"
                      strokeWidth="2"
                      strokeDasharray="283"
                      strokeDashoffset="70"
                      strokeLinecap="round"
                      className="opacity-50"
                    />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff5000]/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ff5000]/10 rounded-full blur-2xl animate-pulse-delayed" />
            </div>

            {/* Progress Bar */}
            <div className="mt-8 max-w-sm mx-auto">
              <div className="flex justify-between text-sm text-[#2b2e33] mb-2">
                <span>Progress</span>
                <span className="font-bold text-[#ff5000]">75%</span>
              </div>
              <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#ff5000] to-[#ff5000]/70 rounded-full animate-progress"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-20px, -20px) scale(1.5); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes pulse-width {
          0%, 100% { width: 8rem; opacity: 0.3; }
          50% { width: 12rem; opacity: 0.6; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pop-up {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 75%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite 1s;
        }
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        .animate-float-particle-delayed {
          animation: float-particle 5s ease-in-out infinite 0.5s;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .animate-pulse-width {
          animation: pulse-width 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pop-up {
          animation: pop-up 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
        .animate-progress {
          animation: progress 2s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  );
};

export default ComingSoon;