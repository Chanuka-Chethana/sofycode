"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaRobot } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiGo, SiPostgresql, SiMongodb } from 'react-icons/si';
import { FiCpu, FiCode, FiLayers, FiMessageSquare } from "react-icons/fi";
import { ArrowUpRight, ChevronRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function Home() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState("");

  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    if (formState.message.trim().length < 10) {
      setErrorMessage("Message must be at least 10 characters long.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(data.message || "Failed to send message. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("A network error occurred. Please check your connection.");
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/20 blur-[80px] rounded-full -z-10 animate-pulse pointer-events-none transform-gpu" style={{ willChange: 'transform, opacity' }}></div>
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 dark:bg-purple-600/20 blur-[80px] rounded-full -z-10 animate-pulse pointer-events-none transform-gpu" style={{ animationDelay: '-5s', willChange: 'transform, opacity' }}></div>

      {/* Hero Section */}
      <section className="relative min-h-screen sm:min-h-[calc(100dvh-6rem)] flex items-center pt-2 pb-6 sm:py-8" id="home">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 relative z-10">
          <div className="flex-1 text-center lg:text-left max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight tracking-tight text-slate-900 dark:text-white">
              We build secure, scalable custom software that <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">grows with your business.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300 mb-5 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From MVP to enterprise-grade platforms. We specialize in full-stack, AI/ML integration, cloud-native architecture and cutting-edge mobile & web development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#contact" className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Start a Project
              </Link>
              <Link href="/work" className="px-8 py-4 rounded-full font-bold text-slate-800 dark:text-white bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-purple-500 transition-all shadow hover:shadow-md transform hover:-translate-y-1">
                See Our Work
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg relative min-h-[500px] hidden lg:flex items-center justify-center">
            {/* Colorful Code Block (Straight) */}
            <div className="relative w-full min-h-[420px] h-auto pb-8 rounded-2xl border border-slate-700/50 dark:border-white/10 shadow-2xl backdrop-blur-sm p-6 -translate-y-12 lg:animate-softbounce bg-slate-800 dark:bg-slate-900/60 font-mono text-sm sm:text-base leading-loose shadow-[0_20px_50px_rgba(59,130,246,0.2)]" style={{ willChange: 'transform, opacity' }}>

              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <div className="text-gray-300">
                <p><span className="text-purple-400">class</span> <span className="text-yellow-300">Sofycode</span> {'{'}</p>
                <p className="ml-4"><span className="text-blue-400">constructor</span>() {'{'}</p>
                <p className="ml-8"><span className="text-red-400">this</span>.<span className="text-blue-200">stack</span> <span className="text-purple-400">=</span> [<span className="text-green-300">'MongoDB'</span>, <span className="text-green-300">'Express.js'</span>, <span className="text-green-300">'React.js'</span>, <span className="text-green-300">'Node.js'</span>];</p>
                <p className="ml-8"><span className="text-red-400">this</span>.<span className="text-blue-200">quality</span> <span className="text-purple-400">=</span> <span className="text-orange-400">100</span>;</p>
                <p className="ml-4">{'}'}</p>
                <br />
                <p className="ml-4"><span className="text-blue-400">async</span> <span className="text-yellow-200">build</span>(<span className="text-orange-300">vision</span>) {'{'}</p>
                <p className="ml-8"><span className="text-purple-400">await</span> <span className="text-blue-200">Deploy</span>(<span className="text-red-400">this</span>.<span className="text-blue-200">stack</span>);</p>
                <p className="ml-8"><span className="text-purple-400">return</span> <span className="text-green-300">'Success!'</span>;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
              </div>

              {/* Decorative floating elements inside */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full blur-[40px] opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-purple-500 rounded-full blur-[40px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-slate-50/50 dark:bg-gray-900/50 backdrop-blur-sm border-y border-slate-200 dark:border-gray-800" id="services">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">Development Services</h2>
            <p className="text-xl text-slate-500 dark:text-gray-400 max-w-3xl mx-auto">
              We utilize cutting-edge technologies and proven methodologies to construct high-performance digital products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="p-10 rounded-3xl bg-white dark:bg-gray-800 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400">
                <FiLayers size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Workflow Automation</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                Streamline operations and eliminate repetitive tasks with tailored automation solutions that enhance efficiency and scale seamlessly.
              </p>
              <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-500 dark:text-gray-400">
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">Zapier</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">Make</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">Custom APIs</span>
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-10 rounded-3xl bg-white dark:bg-gray-800 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-8 text-purple-600 dark:text-purple-400">
                <FiCode size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Custom Web Application Development</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                High-performance, secure and infinitely scalable web platforms built from the ground up to solve your unique business challenges.
              </p>
              <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-500 dark:text-gray-400">
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">Next.js</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">React</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">Node.js</span>
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-10 rounded-3xl bg-white dark:bg-gray-800 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-8 text-emerald-600 dark:text-emerald-400">
                <FiCpu size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">AI Integrated Application Development</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                Supercharge your products with predictive analytics, generative AI features and intelligent automation powered by frontier models.
              </p>
              <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-500 dark:text-gray-400">
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">OpenAI</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">TensorFlow</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">LLMs</span>
              </div>
            </div>

            {/* Service 4 */}
            <div className="p-10 rounded-3xl bg-white dark:bg-gray-800 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-8 text-indigo-600 dark:text-indigo-400">
                <FiMessageSquare size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Chatbots Development</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                Intelligent conversational agents that enhance customer support, drive engagement and provide 24/7 assistance tailored to your brand.
              </p>
              <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-500 dark:text-gray-400">
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">LangChain</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">RAG</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700/50 rounded-full">Dialogflow</span>
              </div>
            </div>
          </div>

          {/* ── Featured Work Preview ── */}
          <div className="mt-28">
            {/* Sub-section Header */}
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-5">
                Recent Projects
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                See Our Work <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">In Action</span>
              </h3>
              <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
                A glimpse of what we&apos;ve built. Click any card to explore real screenshots and highlights of each system.
              </p>
            </div>

            {/* Two Featured Project Cards — same animated card style as /work page */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">

              {/* Card 1: HireIntel */}
              <Link
                href="/work?project=hireintel"
                className="group cursor-pointer bg-white dark:bg-slate-800/40 rounded-[2rem] overflow-hidden border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-500/50 transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-900/40 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src="/projects/hireintel_home.png"
                    alt="HireIntel"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:-translate-y-1/2">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-full shadow-2xl flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <ArrowUpRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3">
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">AI Recruitment • Enterprise</p>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      HireIntel
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-base">
                      An AI-powered recruitment system that shortlists candidates using structured data, helping HR teams save time and make data-driven decisions.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm font-bold w-full gap-2">
                    <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-t from-fuchsia-600 via-purple-500 to-fuchsia-600 bg-[length:100%_200%] animate-gradient-up text-white text-[8px] sm:text-[10px] flex-shrink-0 whitespace-nowrap font-black uppercase tracking-wider sm:tracking-widest rounded-full shadow-[0_0_12px_rgba(168,85,247,0.6)] border border-purple-400/50">Demo Project</span>
                    <div className="flex items-center text-right text-[11px] sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Explore Highlights <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1 transform group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Card 2: MoodBeats */}
              <Link
                href="/work?project=moodbeats"
                className="group cursor-pointer bg-white dark:bg-slate-800/40 rounded-[2rem] overflow-hidden border border-slate-200/60 dark:border-slate-700/60 hover:border-purple-500/50 transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <div className="absolute inset-0 bg-purple-600/10 dark:bg-purple-900/40 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src="/projects/moodbeats_home.png"
                    alt="MoodBeats"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:-translate-y-1/2">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-full shadow-2xl flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <ArrowUpRight className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3">
                      <p className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">AI Music • Entertainment</p>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      MoodBeats
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-base">
                      A real-time mood-based music player supporting Sinhala, English and Hindi. Detects emotions through face, voice and biometric scans for personalized playback.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm font-bold w-full gap-2">
                    <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-t from-fuchsia-600 via-purple-500 to-fuchsia-600 bg-[length:100%_200%] animate-gradient-up text-white text-[8px] sm:text-[10px] flex-shrink-0 whitespace-nowrap font-black uppercase tracking-wider sm:tracking-widest rounded-full shadow-[0_0_12px_rgba(168,85,247,0.6)] border border-purple-400/50">Demo Project</span>
                    <div className="flex items-center text-right text-[11px] sm:text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Explore Highlights <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1 transform group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* View All Projects CTA Button */}
            <div className="flex justify-center mt-14">
              <Link
                href="/work"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:-translate-y-1 group"
              >
                View All Projects
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Tech Stack / Expertise */}
      <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden" id="expertise">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">Our Expertise</h2>
          <p className="text-xl text-slate-500 dark:text-gray-400 mx-auto mb-16">We work with the best-in-class modern technologies.</p>

          <div className="relative w-full flex overflow-hidden mask-linear-gradient">
            <div className="flex min-w-max animate-infinite-scroll will-change-transform">
              {[...Array(2)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="flex gap-12 sm:gap-16 px-6 sm:px-8 py-6 items-center justify-center">
                  {[
                    { name: "React", icon: <FaReact size={48} className="text-[#61DAFB]" /> },
                    { name: "Next.js", icon: <SiNextdotjs size={48} className="text-black dark:text-white" /> },
                    { name: "Node.js", icon: <FaNodeJs size={48} className="text-[#339933]" /> },
                    { name: "Typescript", icon: <SiTypescript size={48} className="text-[#3178C6]" /> },
                    { name: "Python", icon: <FaPython size={48} className="text-[#3776AB]" /> },
                    { name: "Go", icon: <SiGo size={48} className="text-[#00ADD8]" /> },
                    { name: "AWS", icon: <FaAws size={48} className="text-[#232F3E] dark:text-[#FFF]" /> },
                    { name: "Docker", icon: <FaDocker size={48} className="text-[#2496ED]" /> },
                    { name: "PostgreSQL", icon: <SiPostgresql size={48} className="text-[#4169E1]" /> },
                    { name: "MongoDB", icon: <SiMongodb size={48} className="text-[#47A248]" /> }
                  ].map((tech, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer">
                      <div className="w-24 h-24 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-2 transition-all duration-300">
                        {tech.icon}
                      </div>
                      <span className="font-semibold text-sm text-slate-600 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-slate-50 dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800" id="contact">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side Image */}
            <div className="w-full relative h-[600px] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1 hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Team working together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-12">
                <div className="text-white">
                  <h3 className="text-3xl font-bold mb-4">Let's build something extraordinary.</h3>
                  <p className="text-lg text-white/80">Our team is ready to turn your vision into a scalable, high-performance reality.</p>
                </div>
              </div>
            </div>

            {/* Right side contact form */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">Ready to build?</h2>
              <p className="text-xl text-slate-500 dark:text-gray-400 mb-10">
                Tell us about your project, timeline and goals. We typically respond within 1 business day.
              </p>

              {status === "success" ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="px-6 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-gray-200 font-medium transition-colors">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submitContactForm} className="space-y-6">
                  {status === "error" && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400">
                      <AlertCircle size={20} className="shrink-0" />
                      <p className="text-sm font-medium">{errorMessage || "Failed to send message. Please try again or email us directly."}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullname" className="font-semibold text-slate-700 dark:text-gray-200">Full Name</label>
                    <input
                      type="text"
                      id="fullname"
                      name="name"
                      value={formState.name}
                      onChange={handleFormChange}
                      required
                      placeholder="John Doe"
                      className="w-full p-4 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow disabled:opacity-50"
                      disabled={status === "loading"}
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold text-slate-700 dark:text-gray-200">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleFormChange}
                      required
                      placeholder="john@example.com"
                      className="w-full p-4 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow disabled:opacity-50"
                      disabled={status === "loading"}
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold text-slate-700 dark:text-gray-200">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleFormChange}
                      required
                      rows={6}
                      placeholder="Tell us about your requirements..."
                      className="w-full p-4 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none disabled:opacity-50"
                      disabled={status === "loading"}
                      suppressHydrationWarning
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-xl font-bold flex justify-center items-center text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 shadow-lg transition-all mt-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    suppressHydrationWarning
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
