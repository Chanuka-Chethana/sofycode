import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 mt-auto border-t border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-[160px] md:h-12 md:w-[180px] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo_light_fixed_v3.png"
                alt="SOFYCODE Logo"
                fill
                className="object-contain object-left dark:hidden"
              />
              <Image
                src="/logo_dark_transparent_v2.png"
                alt="SOFYCODE Logo"
                fill
                className="object-contain object-left hidden dark:block"
              />
            </div>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </Link>
            <a
              href="https://www.facebook.com/profile.php?id=61579466856050"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-slate-200 dark:border-gray-800 text-sm text-slate-500 dark:text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p suppressHydrationWarning>&copy; {currentYear} SOFYCODE Custom Software Development. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
