"use client";

import React, { useState } from "react";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";

// TODO: Replace with your actual purchased WhatsApp number (with country code, but no + or spaces)
const WHATSAPP_NUMBER = "94711454199"; 
const DEFAULT_MESSAGE = "Hello! I'm interested in your software services.";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Redirect to wa.me which will open WhatsApp app or web and send the message to your business number
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;
    window.open(url, "_blank");
    
    // Optionally close the widget
    setIsOpen(false);
    setMessage(""); // Reset message
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="mb-4 w-[calc(100vw-3rem)] sm:w-[340px] max-w-[340px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header */}
          <div className="bg-[#128C7E] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                <FaWhatsapp size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[15px]">SofyCode Support</h3>
                <p className="text-xs text-[#E5DDD5]">Typically replies instantly</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close Chat"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Chat Body */}
          <div 
            className="h-[260px] p-4 flex flex-col gap-3 overflow-y-auto"
            style={{
              backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
              backgroundSize: 'cover',
            }}
          >
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                Hi there! 👋<br/><br/>
                Welcome to SofyCode. How can we help you today?
              </p>
              <span className="text-[10px] text-gray-400 mt-1 block text-right">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <form onSubmit={handleSend} className="flex gap-2 items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#128C7E]"
              />
              <button
                type="submit"
                className="bg-[#128C7E] text-white p-3 rounded-full hover:bg-[#075E54] transition-colors"
                aria-label="Send Message"
              >
                <FaPaperPlane size={14} className="relative -left-[1px] top-[1px]" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`${
          isOpen ? 'bg-gray-600 hover:bg-gray-700' : 'bg-[#25D366] hover:bg-[#128C7E]'
        } text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-500/30`}
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <FaTimes size={28} />
        ) : (
          <FaWhatsapp size={28} />
        )}
      </button>
    </div>
  );
}
