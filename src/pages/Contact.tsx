import { motion } from "motion/react";
import { Mail, MapPin, Phone, Check } from "lucide-react";
import React, { useState } from "react";
import { DecryptReveal } from "../components/ui/DecryptReveal";

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
    <div className="w-full max-w-[1360px] mx-auto px-6 md:px-12 my-auto py-8 md:py-12 flex flex-col justify-center grow">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch w-full mx-auto">
        
        {/* Left: Expanded Decrypt Reveal Matrix Portrait */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-stretch items-center lg:items-end h-full w-full"
        >
          <div className="w-full max-w-[600px] h-[500px] sm:h-[560px] lg:h-full relative rounded-3xl overflow-hidden bg-transparent flex flex-col justify-stretch">
            <DecryptReveal
              imageSrc="/contact/me.webp"
              className="w-full h-full bg-transparent"
              radius={280}
              cell={12}
              scrambleSpeed={8}
              passthrough={0.05}
            />
          </div>
        </motion.div>

        {/* Right: Form Container + Contact Details Underneath */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-between gap-5 h-full max-w-[600px] w-full mx-auto lg:mx-0"
        >
          {/* Form Card */}
          <div className="bg-white p-8 md:p-10 lg:p-11 rounded-[2rem] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)] border border-black/5 flex flex-col justify-between flex-1">
            {formState.state === "success" ? (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[380px] gap-4">
                <div className="w-16 h-16 bg-[#4DB440]/10 text-[#4DB440] rounded-full flex items-center justify-center mb-2">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-ink-black">Message Sent</h3>
                <p className="text-slate-gray">Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
                <button 
                  onClick={() => setFormState({ state: "idle" })}
                  className="mt-6 px-6 py-2.5 bg-mist-gray text-ink-black rounded-xl font-medium hover:bg-fog-white transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[13px] font-bold tracking-[0.2em] text-ink-black">Name <span className="text-ink-black text-[14px]">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    className="w-full bg-mist-gray border border-transparent hover:border-ink-black/30 focus:bg-white focus:border-ink-black focus:ring-4 focus:ring-ink-black/10 rounded-xl px-4 py-3.5 text-ink-black outline-none transition-all placeholder:text-smoke-gray"
                    placeholder="What should I call you?"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13px] font-bold tracking-[0.2em] text-ink-black">Email <span className="text-ink-black text-[14px]">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    className="w-full bg-mist-gray border border-transparent hover:border-ink-black/30 focus:bg-white focus:border-ink-black focus:ring-4 focus:ring-ink-black/10 rounded-xl px-4 py-3.5 text-ink-black outline-none transition-all placeholder:text-smoke-gray"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="message" className="text-[13px] font-bold tracking-[0.2em] text-ink-black">Message (Optional)</label>
                  <textarea 
                    id="message" 
                    name="message"
                    className="w-full flex-1 min-h-[140px] md:min-h-[160px] bg-mist-gray border border-transparent hover:border-ink-black/30 focus:bg-white focus:border-ink-black focus:ring-4 focus:ring-ink-black/10 rounded-xl px-4 py-3.5 text-ink-black outline-none transition-all resize-none placeholder:text-smoke-gray"
                    placeholder="Tell me about your project, or just say hello..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={formState.state === "submitting"}
                  className="w-full px-7 py-4 bg-ink-black text-white rounded-xl font-bold shadow-lg shadow-ink-black/10 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 flex items-center justify-center gap-2 mt-1"
                >
                  {formState.state === "submitting" ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Stack - Equal Margin Blocks Horizontally */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Email */}
            <button 
              onClick={() => handleCopy("ranpofei@gmail.com", "email")}
              className="flex items-center gap-3 text-ink-black hover:text-ink-black/80 transition-colors group cursor-pointer text-left focus:outline-none p-2.5 rounded-xl hover:bg-black/5 w-full"
            >
              <div className="w-10 h-10 bg-mist-gray rounded-full flex items-center justify-center border border-black/5 group-hover:scale-105 transition-transform flex-shrink-0">
                {copied === "email" ? (
                  <Check className="w-4 h-4 text-ink-black" />
                ) : (
                  <Mail className="w-4 h-4 text-ink-black" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold tracking-[0.2em] text-ash-gray uppercase font-mono">Email</p>
                <p className="text-xs sm:text-sm font-semibold text-ink-black truncate">
                  {copied === "email" ? (
                    <span className="text-ink-black font-bold">Copied!</span>
                  ) : (
                    "ranpofei@gmail.com"
                  )}
                </p>
              </div>
            </button>
            
            {/* Phone */}
            <button 
              onClick={() => handleCopy("+46764502813", "phone")}
              className="flex items-center gap-3 text-ink-black hover:text-ink-black/80 transition-colors group cursor-pointer text-left focus:outline-none p-2.5 rounded-xl hover:bg-black/5 w-full"
            >
              <div className="w-10 h-10 bg-mist-gray rounded-full flex items-center justify-center border border-black/5 group-hover:scale-105 transition-transform flex-shrink-0">
                {copied === "phone" ? (
                  <Check className="w-4 h-4 text-ink-black" />
                ) : (
                  <Phone className="w-4 h-4 text-ink-black" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold tracking-[0.2em] text-ash-gray uppercase font-mono">Phone</p>
                <p className="text-xs sm:text-sm font-semibold text-ink-black truncate">
                  {copied === "phone" ? (
                    <span className="text-ink-black font-bold">Copied!</span>
                  ) : (
                    "+46 764502813"
                  )}
                </p>
              </div>
            </button>

            {/* Location */}
            <div className="flex items-center gap-3 text-ink-black p-2.5 rounded-xl w-full">
              <div className="w-10 h-10 bg-mist-gray rounded-full flex items-center justify-center border border-black/5 flex-shrink-0">
                <MapPin className="w-4 h-4 text-ink-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold tracking-[0.2em] text-ash-gray uppercase font-mono">Location</p>
                <p className="text-xs sm:text-sm font-semibold text-ink-black truncate">Uppsala, Sweden</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
