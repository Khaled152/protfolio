
import React from 'react';

const ContactPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="hud-border hud-border-tl p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-hud text-2xl text-cyan-400 mb-6 tracking-widest uppercase">Direct_Comms</h3>
          <p className="text-sm text-cyan-300/70 mb-8 leading-relaxed">
            Establishing a secure channel for inquiries, collaborations, or tactical missions. 
            Response latency varies by sector load.
          </p>

          <div className="space-y-6">
            <div className="group cursor-pointer">
              <div className="text-[10px] text-cyan-700 font-hud mb-1">EMAIL_ENCRYPTION</div>
              <div className="text-lg text-cyan-200 group-hover:text-cyan-400 transition-colors font-mono underline decoration-cyan-900 underline-offset-4">
                OPERATOR@NEXUS-CORP.DEV
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="text-[10px] text-cyan-700 font-hud mb-1">SATELLITE_UPLINK</div>
              <div className="text-lg text-cyan-200 group-hover:text-cyan-400 transition-colors font-mono">
                +1 (555) 010-0242
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {['LINKEDIN', 'GITHUB', 'X-TWITTER'].map(platform => (
                <button key={platform} className="px-3 py-1 border border-cyan-900 hover:border-cyan-400 text-[10px] text-cyan-600 hover:text-cyan-400 font-hud transition-all">
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-[9px] text-cyan-900 italic font-hud">
          TRANSMISSION_PROTOCOL: TLS_1.3 | KEY_TYPE: RSA_4096
        </div>
      </div>

      <div className="hud-border hud-border-br p-6 bg-cyan-950/10 flex flex-col">
        <h3 className="font-hud text-sm text-cyan-500 mb-4 uppercase">Rapid_Inquiry_Form</h3>
        <form className="flex-1 flex flex-col gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-hud text-cyan-700">SENDER_ID</label>
            <input 
              type="text" 
              placeholder="YOUR_NAME"
              className="w-full bg-black/40 border border-cyan-900 p-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 placeholder:opacity-30"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-hud text-cyan-700">RETURN_CHANNEL</label>
            <input 
              type="email" 
              placeholder="EMAIL_ADDRESS"
              className="w-full bg-black/40 border border-cyan-900 p-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 placeholder:opacity-30"
            />
          </div>
          <div className="space-y-1 flex-1 flex flex-col">
            <label className="text-[10px] font-hud text-cyan-700">MANIFEST_DATA</label>
            <textarea 
              placeholder="MESSAGE_CONTENT..."
              className="flex-1 w-full bg-black/40 border border-cyan-900 p-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 placeholder:opacity-30 resize-none"
            />
          </div>
          <button className="w-full py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-hud text-xs tracking-widest hover:bg-cyan-500 hover:text-black transition-all">
            INITIATE_TRANSMISSION
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPanel;
