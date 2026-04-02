import type { Metadata } from "next";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaRocket, FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us | Sofycode – Custom Software Development Team",
  description: "Meet the Sofycode team — a tight-knit group of senior engineers and product designers committed to building robust, beautiful, and scalable software solutions.",
  openGraph: {
    title: "About Us | Sofycode",
    description: "Meet the elite minds driving innovation and excellence at Sofycode — your trusted custom software development partner.",
    url: "https://sofycode.com/about",
    siteName: "Sofycode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sofycode – Our Team & Values",
    description: "Meet the senior engineers and product designers behind Sofycode's world-class custom software solutions.",
  },
};

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/20 blur-[100px] rounded-full -z-10 animate-pulse pointer-events-none transform-gpu"></div>
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 dark:bg-purple-600/20 blur-[100px] rounded-full -z-10 animate-pulse pointer-events-none transform-gpu" style={{ animationDelay: '-5s' }}></div>

      {/* Section 1: About Us */}
      <section className="min-h-[calc(100vh-8rem)] flex items-center py-4" id="about">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: About Paragraph */}
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-slate-900 dark:text-white">About Us</h2>
              <p className="text-xl text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
                Sofycode was founded on a simple principle: software should not just work; it should be robust, beautiful, and built for scale.
              </p>
              <p className="text-xl text-slate-600 dark:text-gray-300 leading-relaxed">
                We are a tight-knit team of senior engineers and product designers who understand that high-quality code is a business asset. From startups to enterprise clients, we deliver transparent, on-time, and perfectly engineered solutions designed to adapt to an ever-evolving digital landscape. 
              </p>
            </div>
            
            {/* Right: Suitable Image */}
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
              <Image 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Engineering Team" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Team Members */}
      <section className="py-24 bg-slate-50/50 dark:bg-gray-900/50 border-y border-slate-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">Our Team</h2>
            <p className="text-xl text-slate-500 dark:text-gray-400 max-w-3xl mx-auto">
              Meet the elite minds driving innovation and excellence at Sofycode.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Buddhima Madubashana",
                role: "Fullstack Engineer",
                image: "/team/buddhima.jpg",
                github: "https://github.com/Buddhima-Madubashana",
                linkedin: "https://www.linkedin.com/in/buddhima-madubashana-4b21a62b8/",
              },
              {
                name: "Benul Nethmitha",
                role: "Business Lead & QA Engineer",
                image: "/team/benul.jpg",
                github: "https://github.com/NBNSilva",
                linkedin: "https://www.linkedin.com/in/benul-nethmitha",
              },
              {
                name: "Chanuka Chethana",
                role: "Backend & AI Engineer",
                image: "/team/chanuka.jpg",
                github: "https://github.com/Chanuka-Chethana",
                linkedin: "https://www.linkedin.com/in/chanuka-chethana",
              },
              {
                name: "Sithum Induwara",
                role: "Front-end Engineer",
                image: "/team/sithum_v2.jpg",
                github: "#",
                linkedin: "#",
              },
            ].map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-slate-200 dark:border-gray-700 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center group">
                <div className="relative w-32 h-32 mb-6 rounded-full border-4 border-slate-100 dark:border-gray-700 shadow-md group-hover:border-blue-500 transition-colors duration-300 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-gray-700 flex items-center justify-center text-slate-400">
                      <FaUsers size={40} />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{member.name}</h3>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-6">{member.role}</h4>

                <div className="flex gap-4 mt-auto">
                  <a
                    href={member.github}
                    target={member.github !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-slate-600 dark:text-gray-300 hover:bg-slate-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href={member.linkedin}
                    target={member.linkedin !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-slate-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/50 dark:hover:text-blue-400 transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Our Values */}
      <section className="py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">Our Values</h2>
            <p className="text-xl text-slate-500 dark:text-gray-400 max-w-3xl mx-auto">
              The foundational principles that guide every line of code we write and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <FaUsers size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Total Transparency</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                Open communication, honest timelines, and completely visible development cycles from day one. You always know exactly where your product stands.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <FaShieldAlt size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Elite Code Quality</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                We strictly adhere to core architectural patterns. Security, testing, and scalability are built directly into the foundation, eliminating crippling technical debt.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <FaClock size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">On-time Delivery</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                We respect your business goals and speed-to-market. By leveraging intelligent project management, we ship critical components precisely when promised.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                <FaRocket size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Agile / CI-CD Workflow</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                Continuous integration and swift iterations. Product updates are rolled out seamlessly to production with zero downtime for an unmatched experience.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
