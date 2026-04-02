"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Zap, Bot, Shield, Rocket } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


// Note: Metadata for this page is handled via app/pricing/metadata.ts

export default function PricingPage() {
  return (
    <>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative px-8 lg:px-24 -mt-24 pt-24 min-h-screen flex items-center justify-center overflow-hidden">
          {/* Gradient Theme Background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900/50 dark:to-gray-950">
            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-60 dark:opacity-20 pointer-events-none"></div>
          </div>
          
          {/* Glares / Gradients */}
          <div className="absolute top-0 right-0 -m-32 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
          <div className="absolute top-1/2 left-0 -m-32 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

          <div className="max-w-[1000px] w-full mx-auto flex flex-col items-center text-center gap-8 relative z-10 py-16">
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-200/50 dark:border-blue-800/50" data-aos="fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Transparent Pricing
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight" data-aos="fade-up" data-aos-delay="100">
              Build Smart Software That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Grows Your Business</span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed" data-aos="fade-up" data-aos-delay="200">
              We design and develop custom software, AI-powered solutions, and automation systems tailored for Sri Lankan businesses.
            </p>
            
            <div className="flex gap-4 sm:flex-row flex-col mt-4" data-aos="fade-up" data-aos-delay="300">
              <Link href="/#contact" className="inline-flex h-14 items-center justify-center px-8 rounded-full font-semibold text-white bg-gradient-to-tr from-blue-600 to-purple-600 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all group border-none">
                Get a Free Consultation
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#plans" className="inline-flex h-14 items-center justify-center px-8 rounded-full font-semibold text-slate-700 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                View Packages
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section id="plans" className="py-24 px-6 lg:px-16 bg-white dark:bg-gray-950 border-y border-slate-200 dark:border-slate-800 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Our Pricing Plans</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Choose the perfect solution designed to accelerate your business growth. Flexible options structured for modern demands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Starter Package */}
              <div className="flex flex-col p-8 rounded-3xl bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-slate-800 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="mb-8 relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Starter Package
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Rs. 25,000 – 60,000</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm h-10">Best for Small Businesses & Startups</p>
                </div>
                
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white mb-4">What you get:</p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Modern business website (3–5 pages)",
                      "Mobile responsive design",
                      "WhatsApp & contact form integration",
                      "Basic SEO setup",
                      "Fast delivery (1–2 weeks)"
                    ].map((feature, i) => (
                      <li key={i} className="flex text-slate-600 dark:text-slate-300 text-base leading-snug">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-auto">
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-6 font-medium bg-slate-100 dark:bg-slate-800 rounded-lg p-3">Perfect for: Salons, restaurants, shops, personal brands</p>
                  <Link href="/#contact" className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors group/btn">
                    👉 Get Started
                  </Link>
                </div>
              </div>

              {/* Growth Package */}
              <div className="flex flex-col p-8 rounded-3xl bg-slate-900 dark:bg-slate-800 border-2 border-yellow-500/50 relative hover:-translate-y-2 transition-all shadow-xl shadow-yellow-500/10 group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-bl-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 text-xs font-bold rounded-b-xl uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
                <div className="mb-8 pt-4 relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold mb-6">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    Growth Package
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-2">Rs. 60,000 – 150,000</h3>
                  <p className="text-slate-400 text-sm h-10">Best for Growing Businesses</p>
                </div>
                
                <div className="flex-1">
                  <p className="font-semibold text-white mb-4">What you get:</p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Full web application (custom-built)",
                      "User login & authentication",
                      "Admin dashboard",
                      "Database integration",
                      "Payment gateway integration (PayHere / Stripe)",
                      "Basic automation (email/notifications)"
                    ].map((feature, i) => (
                      <li key={i} className="flex text-slate-300 text-base leading-snug">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-6 border-t border-slate-700 mt-auto">
                  <p className="text-[13px] text-slate-300 mb-6 font-medium bg-slate-800 dark:bg-slate-700/50 rounded-lg p-3">Perfect for: SMEs, online businesses, service platforms</p>
                  <Link href="/#contact" className="flex items-center justify-center w-full py-3.5 rounded-xl font-bold text-slate-900 bg-yellow-500 hover:bg-yellow-400 transition-colors group/btn">
                    👉 Request a Quote
                  </Link>
                </div>
              </div>

              {/* Automation & AI Package */}
              <div className="flex flex-col p-8 rounded-3xl bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="mb-8 relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Automation & AI
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Rs. 150,000 – 250,000</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm h-10">Smart Systems That Save Time & Increase Revenue</p>
                </div>
                
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white mb-4">What you get:</p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "AI chatbot (Website / WhatsApp)",
                      "Workflow automation (CRM, lead tracking)",
                      "API integrations",
                      "Smart dashboards & analytics",
                      "Custom backend logic"
                    ].map((feature, i) => (
                      <li key={i} className="flex text-slate-600 dark:text-slate-300 text-base leading-snug">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-auto">
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-6 font-medium bg-slate-100 dark:bg-slate-800 rounded-lg p-3">Perfect for: Businesses looking to automate operations and scale</p>
                  <Link href="/#contact" className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors group/btn">
                    👉 Book a Demo
                  </Link>
                </div>
              </div>

              {/* Enterprise Solutions */}
              <div className="flex flex-col p-8 rounded-3xl bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="mb-8 relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-semibold mb-6">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Enterprise
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Custom Pricing</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm h-10">Starting from Rs. 250,000+ for large projects</p>
                </div>
                
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white mb-4">What you get:</p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Fully custom software systems",
                      "Scalable architecture",
                      "Multi-user roles & permissions",
                      "Advanced analytics dashboards",
                      "Dedicated development support"
                    ].map((feature, i) => (
                      <li key={i} className="flex text-slate-600 dark:text-slate-300 text-base leading-snug">
                        <CheckCircle2 className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-auto">
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-6 font-medium bg-slate-100 dark:bg-slate-800 rounded-lg p-3">Perfect for: Corporates, large businesses, complex systems</p>
                  <Link href="/#contact" className="flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors group/btn">
                    👉 Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Support Plans & Quick Start Offers */}
        <section className="py-24 px-6 lg:px-16 bg-slate-100/50 dark:bg-gray-900/30">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Support Plans */}
            <div>
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Monthly Support Plans</h2>
                <p className="text-slate-600 dark:text-slate-400">Continuous reliable support tailored to your needs.</p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Basic Support", price: "Rs. 5,000 / month", icon: Shield, color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30", border: "border-green-200 dark:border-green-800/50", features: ["Bug fixes", "Minor updates", "Email support"] },
                  { title: "Growth Support", price: "Rs. 10,000 / month", icon: Rocket, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30", border: "border-yellow-200 dark:border-yellow-800/50", features: ["Feature updates", "Performance monitoring", "Priority support"] },
                  { title: "Dedicated Tech Partner", price: "Rs. 50,000+ / month", icon: Zap, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30", border: "border-purple-200 dark:border-purple-800/50", features: ["Continuous development", "Automation improvements", "Weekly consultations"] },
                ].map((plan, i) => (
                  <div key={i} className={`flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border ${plan.border} shadow-sm hover:shadow-md transition-shadow items-center sm:items-start text-center sm:text-left`}>
                    <div className={`w-14 h-14 rounded-full ${plan.bg} flex items-center justify-center flex-shrink-0`}>
                      <plan.icon strokeWidth={2.5} size={28} className={plan.color} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">{plan.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-medium mb-3">{plan.price}</p>
                      <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-start">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="text-sm text-slate-600 dark:text-slate-300 flex items-center font-medium">
                            <CheckCircle2 className={`w-4 h-4 mr-1.5 ${plan.color}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Start Offers */}
            <div>
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quick Start Offers (Limited Deals)</h2>
                <p className="text-slate-600 dark:text-slate-400">Kickstart your digital presence in record time.</p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "One-Page Website", price: "Rs. 15,000", icon: Bot, features: ["Single-page site", "Mobile optimized", "Delivered in 3–5 days"] },
                  { title: "Business Chatbot", price: "Rs. 25,000", icon: Bot, features: ["WhatsApp chatbot", "Auto replies & FAQs"] },
                  { title: "Automation Setup", price: "Rs. 30,000", icon: Zap, features: ["Basic workflow automation", "Email / WhatsApp integration"] },
                ].map((offer, i) => (
                  <div key={i} className="relative overflow-hidden group p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow">
                    <div className="absolute top-0 right-0 opacity-10 scale-150 rotate-12 -translate-y-4 translate-x-4 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      <offer.icon size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mb-4">
                      <h4 className="text-xl font-bold">{offer.title}</h4>
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold whitespace-nowrap shadow-sm border border-white/10">
                        {offer.price}
                      </span>
                    </div>
                    <ul className="relative z-10 space-y-2 text-center sm:text-left">
                      {offer.features.map((feature, j) => (
                        <li key={j} className="flex items-center text-blue-100 justify-center sm:justify-start font-medium">
                          <CheckCircle2 className="w-4 h-4 mr-2 opacity-80" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Why Choose Us & How It Works */}
        <section className="py-24 px-6 lg:px-16 bg-white dark:bg-gray-950 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Why Choose Us */}
            <div className="p-10 rounded-3xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Why Choose Us?</h2>
              <div className="space-y-6">
                {[
                  "Custom-built solutions (not templates)",
                  "Focus on business growth, not just coding",
                  "Fast delivery & reliable support",
                  "AI & automation expertise"
                ].map((reason, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div className="flex items-center">
                      <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{reason}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">How It Works</h2>
              <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-8">
                {[
                  { num: "01", title: "Contact us with your idea" },
                  { num: "02", title: "We analyze your requirements" },
                  { num: "03", title: "Get a clear proposal & pricing" },
                  { num: "04", title: "We build & deliver your solution" },
                ].map((step, i) => (
                  <div key={i} className="relative pl-8 group">
                    <div className="absolute top-0 left-0 -translate-x-[11px] w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-500 text-transparent flex items-center justify-center transition-colors group-hover:border-purple-500">
                    </div>
                    <div className="-mt-1">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1 block">Step {step.num}</span>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section id="contact-cta" className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6 lg:px-16 text-center bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">Ready to build your system?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl text-center">Let’s turn your idea into a powerful digital solution. Experience innovation driven by growth.</p>
            
            <div className="flex gap-4 w-full justify-center">
              <Link href="/#contact" className="inline-flex h-14 items-center justify-center px-10 rounded-full font-bold text-slate-900 bg-white shadow-xl hover:-translate-y-1 transition-transform group">
                👉 Get a Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
