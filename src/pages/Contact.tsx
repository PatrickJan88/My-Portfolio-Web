import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({ state: "idle" }); // idle, submitting, success
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ state: "submitting" });
    
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "6b48a208-1fca-4e42-ab22-3f11e5c3f398");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setFormState({ state: "success" });
      } else {
        console.error("Form submission error:", data);
        setFormState({ state: "idle" });
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormState({ state: "idle" });
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col min-h-screen">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-12 mt-4"
        >
          <div>
            <h1 className="text-6xl font-bold tracking-tighter text-[#373737] uppercase leading-[0.9] mb-6">
              LET'S CHAT
            </h1>
            <p className="text-base text-[#4A4A4A] max-w-md leading-relaxed font-mono">
              Always open to new partnerships and exploring exciting opportunities.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <button 
              onClick={() => handleCopy("ranpofei@gmail.com", "email")}
              className="flex items-center gap-4 text-[#373737] hover:text-[#3480F9] transition-colors group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0]">Email</p>
                <p className="text-lg font-medium">{copied === "email" ? "Copied!" : "ranpofei@gmail.com"}</p>
              </div>
            </button>
            
            <button 
              onClick={() => handleCopy("+46764502813", "phone")}
              className="flex items-center gap-4 text-[#373737] hover:text-[#3480F9] transition-colors group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0]">Phone</p>
                <p className="text-lg font-medium">{copied === "phone" ? "Copied!" : "+46 764502813"}</p>
              </div>
            </button>

            <div className="flex items-center gap-4 text-[#373737]">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0]">Location</p>
                <p className="text-lg font-medium">Uppsala, Sweden</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-black/5">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-bold text-[#4A4A4A] hover:text-[#3480F9] uppercase tracking-widest transition-colors group">
              LinkedIn <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="/resume.pdf" target="_blank" className="flex items-center gap-1 text-sm font-bold text-[#4A4A4A] hover:text-[#3480F9] uppercase tracking-widest transition-colors group">
              Download Full Resume <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] border border-black/5"
        >
          {formState.state === "success" ? (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] gap-4">
              <div className="w-16 h-16 bg-[#4DB440]/10 text-[#4DB440] rounded-full flex items-center justify-center mb-2">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#373737]">Message Sent</h3>
              <p className="text-[#4A4A4A]">Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
              <button 
                onClick={() => setFormState({ state: "idle" })}
                className="mt-6 px-6 py-2.5 bg-[#f8f8f8] text-[#4A4A4A] rounded-xl font-medium hover:bg-[#e5e5e5] transition-colors"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0]">Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  className="w-full bg-[#f8f8f8] border border-transparent focus:bg-white focus:border-[#3480F9] focus:ring-4 focus:ring-[#3480F9]/10 rounded-xl px-4 py-3.5 text-[#373737] outline-none transition-all placeholder:text-[#a0a0a0]"
                  placeholder="What should I call you?"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0]">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  className="w-full bg-[#f8f8f8] border border-transparent focus:bg-white focus:border-[#3480F9] focus:ring-4 focus:ring-[#3480F9]/10 rounded-xl px-4 py-3.5 text-[#373737] outline-none transition-all placeholder:text-[#a0a0a0]"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0]">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-[#f8f8f8] border border-transparent focus:bg-white focus:border-[#3480F9] focus:ring-4 focus:ring-[#3480F9]/10 rounded-xl px-4 py-3.5 text-[#373737] outline-none transition-all resize-none placeholder:text-[#a0a0a0]"
                  placeholder="Tell me about your project, or just say hello..."
                />
              </div>

              <button 
                type="submit" 
                disabled={formState.state === "submitting"}
                className="w-full px-8 py-4 bg-[#373737] text-white rounded-xl font-bold shadow-lg shadow-[#373737]/10 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 mt-2 flex items-center justify-center gap-2"
              >
                {formState.state === "submitting" ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>Send</>
                )}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  );
}
