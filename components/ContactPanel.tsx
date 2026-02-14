
import React from 'react';

interface ContactPanelProps {
  contactData: {
    email: string;
    phone: string;
    hireMeUrl: string;
    socials: { label: string; url: string }[];
  };
}

const ContactPanel: React.FC<ContactPanelProps> = ({ contactData }) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="hud-border hud-border-tl hud-border-br p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-12 bg-slate-900/40 backdrop-blur-md">
        
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div>
            <h3 className="font-hud text-3xl md:text-4xl text-cyan-400 mb-4 tracking-[0.2em] uppercase">Connect_Interface</h3>
            <p className="text-sm md:text-base text-cyan-300/70 leading-relaxed max-w-lg">
              Operational readiness is currently at peak capacity. Secure communication channels are open for tactical collaborations and high-stakes recruitment.
            </p>
          </div>

          <div className="space-y-6">
            <div className="group">
              <div className="text-[10px] text-cyan-700 font-hud mb-1 tracking-widest uppercase">EMAIL_ENCRYPTION_CHANNEL</div>
              <div className="text-xl md:text-2xl text-cyan-200 font-mono tracking-tight group-hover:text-cyan-400 transition-colors">
                {contactData.email}
              </div>
            </div>

            <div className="group">
              <div className="text-[10px] text-cyan-700 font-hud mb-1 tracking-widest uppercase">SATELLITE_VOICE_UPLINK</div>
              <div className="text-xl md:text-2xl text-cyan-200 font-mono tracking-tight group-hover:text-cyan-400 transition-colors">
                {contactData.phone}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col gap-8 items-center md:items-end">
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            {contactData.socials.map((social, idx) => (
              <a 
                key={idx} 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[120px] text-center px-4 py-3 border border-cyan-500/30 text-xs text-cyan-500 font-hud hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-400 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.05)]"
              >
                {social.label}
              </a>
            ))}
          </div>

          <a 
            href={contactData.hireMeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-64 py-5 bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-hud text-lg tracking-[0.3em] text-center hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)] group relative overflow-hidden uppercase"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse group-hover:bg-black" />
              Hire_Me
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </a>
        </div>
      </div>

      <div className="mt-auto flex justify-between px-2 opacity-30 pointer-events-none">
        <div className="text-[10px] font-hud uppercase tracking-tighter italic">
          Protocol: SECURE_UPLINK_v4.2 // Sector: 071-G
        </div>
        <div className="text-[10px] font-hud uppercase tracking-tighter italic">
          Latency: 24ms // SIG_STRENGTH: 98%
        </div>
      </div>
    </div>
  );
};

export default ContactPanel;
