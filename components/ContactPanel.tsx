
import React, { useState } from 'react';

interface ContactPanelProps {
  contactData: {
    email: string;
    phone: string;
    links: string[];
  };
}

const ContactPanel: React.FC<ContactPanelProps> = ({ contactData }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Construct mailto link
    const subject = encodeURIComponent(`MISSION_INQUIRY from ${formData.name}`);
    const body = encodeURIComponent(`Sender: ${formData.name}\nReturn Channel: ${formData.email}\n\nManifest Data:\n${formData.message}`);
    const mailtoLink = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    
    // Simulate system processing
    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsSending(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

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
                {contactData.email}
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="text-[10px] text-cyan-700 font-hud mb-1">SATELLITE_UPLINK</div>
              <div className="text-lg text-cyan-200 group-hover:text-cyan-400 transition-colors font-mono">
                {contactData.phone}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {contactData.links.map(platform => (
                <button key={platform} className="px-3 py-1 border border-cyan-900 hover:border-cyan-400 text-[10px] text-cyan-600 hover:text-cyan-400 font-hud transition-all uppercase">
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-[9px] text-cyan-900 italic font-hud uppercase">
          TRANSMISSION_PROTOCOL: TLS_1.3 | KEY_TYPE: RSA_4096
        </div>
      </div>

      <div className="hud-border hud-border-br p-6 bg-cyan-950/10 flex flex-col">
        <h3 className="font-hud text-sm text-cyan-500 mb-4 uppercase">Rapid_Inquiry_Form</h3>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-hud text-cyan-700">SENDER_ID</label>
            <input 
              required
              type="text" 
              placeholder="YOUR_NAME"
              value={formData.name}
              onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
              className="w-full bg-black/40 border border-cyan-900 p-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 placeholder:opacity-30"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-hud text-cyan-700">RETURN_CHANNEL</label>
            <input 
              required
              type="email" 
              placeholder="EMAIL_ADDRESS"
              value={formData.email}
              onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
              className="w-full bg-black/40 border border-cyan-900 p-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 placeholder:opacity-30"
            />
          </div>
          <div className="space-y-1 flex-1 flex flex-col">
            <label className="text-[10px] font-hud text-cyan-700">MANIFEST_DATA</label>
            <textarea 
              required
              placeholder="MESSAGE_CONTENT..."
              value={formData.message}
              onChange={e => setFormData(prev => ({...prev, message: e.target.value}))}
              className="flex-1 w-full bg-black/40 border border-cyan-900 p-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 placeholder:opacity-30 resize-none"
            />
          </div>
          <button 
            type="submit"
            disabled={isSending}
            className={`w-full py-3 border font-hud text-xs tracking-widest transition-all ${
              isSending 
                ? 'bg-cyan-500/5 border-cyan-900 text-cyan-900 cursor-wait' 
                : 'bg-cyan-500/10 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black'
            }`}
          >
            {isSending ? 'PREPARING_ENCRYPTED_PACKET...' : 'INITIATE_TRANSMISSION'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPanel;
