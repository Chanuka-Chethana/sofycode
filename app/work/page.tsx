"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Play, Pause, ExternalLink, ChevronRight, ChevronLeft, Layers, ArrowUpRight } from "lucide-react";

// Our mock project dataset to showcase works
const PROJECT_LIST = [
  {
    id: "hireintel",
    title: "HireIntel",
    category: "AI Recruitment • Enterprise",
    thumbnail: "/projects/hireintel_home.png",
    description: "An AI-powered recruitment system that shortlists candidates using structured data instead of traditional CVs. It analyzes qualifications, skills and experience based on job-specific criteria to rank applicants, helping HR teams save time, reduce bias and make faster, data-driven decisions.",
    liveUrl: "https://mrcharcoal-hireintel.hf.space",
    highlights: [
      "Structured data candidate shortlisting without CVs",
      "Job-specific criteria analysis for precise applicant ranking",
      "AI-powered evaluation to reduce bias and save HR time",
      "Comprehensive dashboards for recruiters and structured portals for candidates"
    ],
    screenshots: [
      { url: "/projects/hireintel_home.png", caption: "HireIntel homepage emphasizing fair and structured evaluation." },
      { url: "/projects/hireintel_dashboard.png", caption: "HR dashboard for managing job postings and analyzing candidate scores." },
      { url: "/projects/hireintel_candidates.png", caption: "Candidate applications view with AI scores and suitability results." },
      { url: "/projects/hireintel_apply.png", caption: "Structured job application form collecting specific quantitative data." }
    ]
  },
  {
    id: "moodbeats",
    title: "MoodBeats",
    category: "AI Music • Entertainment",
    thumbnail: "/projects/moodbeats_home.png",
    description: "A mood-based music player system that supports Sinhala, English and Hindi. It plays real-time mood-based music using advanced scans like voice sentiment, face expression and biometric feedback to detect the user's emotional state.",
    liveUrl: "https://mrcharcoal-moodbeats.hf.space",
    highlights: [
      "Sinhalese, English and Hindi language support",
      "Real-time AI-powered mood detection",
      "DeepFace AI for optic micro-expression reading",
      "NLP-driven vocal sentiment waveform parsing",
      "Biometric fingerprint & heart rate pulse scan integration"
    ],
    screenshots: [
      { url: "/projects/moodbeats_home.png", caption: "MoodBeats landing interface featuring multilingual mood selector." },
      { url: "/projects/moodbeats_scans.png", caption: "Multi-modal scan interface: Optic, Vocal and Biometric sentiment analysis." },
      { url: "/projects/moodbeats_player.png", caption: "Real-time music player adapting to detected emotional frequency." },
      { url: "/projects/moodbeats_biometrics.png", caption: "Biometric pulse scan mapping heart rate directly to music energy." }
    ]
  },
  {
    id: "newsguard-ai",
    title: "NewsGuard AI",
    category: "AI Misinformation • Enterprise",
    thumbnail: "/projects/newsguard_home.png",
    description: "An Enterprise-Grade Misinformation Detection Engine built with a Two-Layer Detection Engine (The Safety Net and The Advanced NPL Machine Learning Model). Developers can integrate AI directly into websites, discord bots, or apps using the /api/v1/predict endpoint. Features Enterprise Batch Processing with a Live Analytics Dashboard.",
    liveUrl: "https://mrcharcoal-newsguardaipro.hf.space",
    highlights: [
      "Two-Layer Detection Engine (Safety Net & NLP Model)",
      "API integration via /api/v1/predict endpoint",
      "Enterprise Batch Processing for bulk NLP analysis",
      "Live Analytics Dashboard with real-time AI accuracy feedback"
    ],
    screenshots: [
      { url: "/projects/newsguard_home.png", caption: "NewsGuard AI application featuring the core text detection engine and API integration highlights." },
      { url: "/projects/newsguard_analytics.png", caption: "Live Analytics Dashboard displaying total queries, fake news spotted, and AI confidence feedback." },
      { url: "/projects/newsguard_detection.png", caption: "AI Analysis Result highlighting high-risk fake news classification with AI Confidence Score." },
      { url: "/projects/newsguard_batch.png", caption: "PRO Batch Processing interface for uploading CSV files containing articles for bulk NLP analysis." }
    ]
  },
  /*
  {
    id: "luxury-ecom",
    title: "Luxe Fashion Web Store",
    category: "E-Commerce • Branding",
    thumbnail: "/projects/ecom_app.png",
    description: "An elegant, highly optimized e-commerce platform built for a luxury fashion brand, featuring bespoke animations, premium aesthetics and an ultra-fast one-click checkout flow.",
    liveUrl: "https://example.com",
    highlights: [
      "Immersive 3D product viewer and 360 images integration",
      "Custom cursor interactions and smooth scroll mechanics",
      "Optimized content loading pipeline for instant interactions",
      "Frictionless unified one-click checkout system"
    ],
    screenshots: [
      { url: "/projects/ecom_app.png", caption: "Elegant storefront grid highlighting the newly released seasonal collections." },
      { url: "/projects/smart_erp.png", caption: "Seamless cart preview and minimal checkout side-drawer design." }
    ]
  }
  */
];

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECT_LIST[0] | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Handle direct linking to projects via URL params (e.g., /work?project=moodbeats)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get("project");
      if (projectId) {
        const project = PROJECT_LIST.find((p) => p.id === projectId);
        if (project) {
          setSelectedProject(project);
          document.body.style.overflow = "hidden";
        }
      }
    }
    
    // Cleanup: Ensure body scrolling is restored when leaving the page
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Auto-slide cinematic effect for screenshots when modal is open
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedProject && isPlaying) {
      interval = setInterval(() => {
        setActiveScreenshot((prev) =>
          prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1
        );
      }, 3500); // 3.5s smooth automated playback
    }
    return () => clearInterval(interval);
  }, [selectedProject, isPlaying]);

  // Handle Opening/Closing the Modal
  const openProject = (project: typeof PROJECT_LIST[0]) => {
    setSelectedProject(project);
    setActiveScreenshot(0);
    setIsPlaying(true);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="relative min-h-screen py-24 pb-32 overflow-hidden">
      {/* Ambient background blur elements for aesthetics */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/10 blur-[130px] rounded-full -z-10 animate-pulse pointer-events-none transform-gpu" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 dark:bg-purple-600/10 blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none transform-gpu" style={{ animationDelay: '-3s' }} />

      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center mx-auto mb-6 border border-slate-200 dark:border-slate-700 text-blue-500 shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-lg">
            <Layers className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Case Studies</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400">
            Explore our curated portfolio of enterprise solutions, mobile applications and AI platforms. Click on any project to explore highlighting moments.
          </p>
        </div>

        {/* Project Thumbnail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 max-w-6xl mx-auto">
          {PROJECT_LIST.map((project) => (
            <div
              key={project.id}
              onClick={() => openProject(project)}
              className="group cursor-pointer bg-white dark:bg-slate-800/40 rounded-[2rem] overflow-hidden border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-500/50 transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-2 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-900/40 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                />

                {/* Animated overlay iconic button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:-translate-y-1/2">
                  <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-full shadow-2xl flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 delay-100">
                    <ArrowUpRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>



              {/* Project Card Details */}
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-3">
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{project.category}</p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-3 text-lg">
                    {project.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm font-bold w-full gap-2">
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-t from-fuchsia-600 via-purple-500 to-fuchsia-600 bg-[length:100%_200%] animate-gradient-up text-white text-[8px] sm:text-[10px] flex-shrink-0 whitespace-nowrap font-black uppercase tracking-wider sm:tracking-widest rounded-full shadow-[0_0_12px_rgba(168,85,247,0.6)] border border-purple-400/50">
                    Demo Project
                  </span>
                  <div className="flex items-center text-right text-[11px] sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Explore Highlights <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1 transform group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          {/* Modal Backdrop (Click to close) */}
          <div
            className="absolute inset-0 bg-slate-900/80 dark:bg-slate-950/90 transition-opacity"
            onClick={closeProject}
          />

          {/* Modal Container */}
          <div className="relative bg-white dark:bg-slate-900 w-full h-[95dvh] sm:h-auto sm:max-h-[90vh] sm:w-11/12 max-w-7xl sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row shadow-blue-900/20 border border-transparent sm:border-slate-200 sm:dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">

            {/* Close button — always visible at top-right on mobile */}
            <button
              onClick={closeProject}
              className="lg:hidden absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/40 text-white shadow-lg"
              aria-label="Close project"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image Viewer & Playback */}
            <div className="lg:w-[55%] xl:w-[60%] bg-slate-950 flex flex-col relative group shrink-0 h-[42vw] min-h-[220px] max-h-[320px] sm:h-[50vh] lg:h-auto lg:max-h-none">

              <div className="relative flex-1 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                {selectedProject.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeScreenshot === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    <Image
                      src={shot.url}
                      alt={`Screenshot ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                      className="object-contain sm:object-cover lg:object-contain object-center scale-[1.01]"
                      priority={idx === 0}
                    />

                    {/* Caption Background Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 lg:p-10 pt-10 text-white flex flex-col justify-end pointer-events-none">
                      <p className="text-xs sm:text-sm md:text-base font-medium tracking-wide drop-shadow-md line-clamp-2">{shot.caption}</p>
                    </div>
                  </div>
                ))}

                {/* Left/Right Slideshow Controls */}
                <div className="absolute inset-0 z-20 flex items-center justify-between p-3 sm:p-4 opacity-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsPlaying(false); setActiveScreenshot(prev => prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1); }}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-black/60 text-white transition-all shadow-lg border border-white/20"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsPlaying(false); setActiveScreenshot(prev => prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1); }}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-black/60 text-white transition-all shadow-lg border border-white/20"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Play/Pause control */}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                  className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-black/60 text-white transition-colors border border-white/20"
                  title={isPlaying ? "Pause cinematic playback" : "Play cinematic playback"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              {/* Playback Progress Indicator */}
              <div className="h-1 w-full bg-slate-900 relative z-20 shrink-0">
                <div
                  className={`h-full bg-gradient-to-r from-blue-500 to-purple-500 ${isPlaying ? 'transition-all duration-[3500ms] ease-linear' : 'transition-all duration-300 ease-out'}`}
                  style={{ width: `${((activeScreenshot + (isPlaying ? 1 : 0)) / selectedProject.screenshots.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Right Column: Project Context — scrollable on mobile */}
            <div className="lg:w-[45%] xl:w-[40%] flex flex-col p-5 sm:p-8 lg:p-12 overflow-y-auto flex-1 relative">

              {/* Desktop Close Button */}
              <button
                onClick={closeProject}
                className="hidden lg:flex absolute top-8 right-8 p-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors z-10 hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mt-1 lg:mt-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                  {selectedProject.title}
                </h2>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Key Highlights
                  </h4>
                  <ul className="space-y-3">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-slate-700 dark:text-slate-200">
                        <div className="mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                        </div>
                        <span className="leading-snug text-base">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visit Live System Button */}
              <div className="mt-auto pt-4 bg-white dark:bg-slate-900 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:-translate-y-1 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Visit Actual System
                    <ExternalLink className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  </span>
                  {/* Subtle shine effect */}
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg] group-hover:animate-shine" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
