"use client"
import React from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();  

    const openProduct = () => {
      router.push('/products');
    };
    const openAbout  = () => {
      router.push('/about');
    };

  return (
    <div className="pb-20 font-sans">
      {/* Hero Section */}
      <section className="relative bg-[url('/images/hero.jpg')] bg-cover bg-center text-white h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-transparent z-0 rounded-b-3xl"></div>
        <div className="relative z-10 px-8 py-16 text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-heading mb-8 leading-tight drop-shadow-lg tracking-tight">
            Embrace Nature's Beauty
          </h1>
          <p className="mb-10 max-w-[650px] mx-auto text-xl md:text-2xl leading-relaxed font-light drop-shadow">
            Discover the elegance of Swan Botanicals, where purity meets beauty.
          </p>
          <button
            onClick={openProduct}
            type="button"
            className ="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 
         hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300
         dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center
         me-2 mb-2 transition-all duration-300 transform hover:-translate-y-1 scale-105
         hover:shadow-2xl active:scale-95">
            <span className="inline-block mr-2 align-middle">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" /><path d="M8 12l2 2 4-4" stroke="#4F8A10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            Shop Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-32 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <h2 className="text-5xl font-heading text-center text-primary mb-16 tracking-tight">Our Promise</h2>
        <div className="flex flex-col md:flex-row justify-around items-center w-full gap-10 md:gap-6">
          {[{ label: "Pure Ingredients", icon: "🌱" }, { label: "Eco-Friendly", icon: "🌍" }, { label: "Cruelty-Free", icon: "🐰" }].map((feature) => (
            <div key={feature.label} className="text-center flex-1 max-w-sm">
              <div className="bg-cream p-10 rounded-2xl shadow-2xl hover:shadow-3xl duration-300 transition-transform transform hover:-translate-y-2 border border-primary/10">
                <div className="text-5xl mb-4 animate-bounce-slow">{feature.icon}</div>
                <h3 className="text-2xl font-heading font-semibold mb-4 text-primary tracking-wide">{feature.label}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Experience our commitment to quality and sustainability in every product.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-32 mb-12 bg-gradient-to-r from-sage to-cream text-center py-24 rounded-3xl shadow-xl animate-fade-in">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-heading text-primary mb-8 drop-shadow-lg">Join Our Botanical Journey</h2>
          <p className="text-primary/90 mb-12 max-w-[700px] mx-auto text-xl leading-relaxed">
            Dive into the natural world of Swan Botanicals and discover the benefits of pure botanical skincare.
          </p>
          <button onClick={openAbout} className="bg-white text-primary hover:bg-cream active:scale-95 transition-all duration-300 font-semibold text-lg py-5 px-12 rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 scale-105">
            <span className="inline-block mr-2 align-middle">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" stroke="#4F8A10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            Discover More
          </button>
        </div>
      </section>
    </div>
  );
}
