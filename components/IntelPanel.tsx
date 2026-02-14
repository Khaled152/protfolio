
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';

interface ChatMsg {
  role: 'USER' | 'INTEL';
  text: string;
}

const IntelPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'INTEL', text: 'Uplink established. Tactical assistant INTEL active. Awaiting query regarding OPERATOR_ALEX.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'USER', text: userMsg }]);
    setIsTyping(true);

    const response = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { role: 'INTEL', text: response || '...' }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[500px] hud-border hud-border-tr p-4">
      <div className="flex items-center gap-2 mb-4 border-b border-cyan-900/30 pb-2">
        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]" />
        <h3 className="font-hud text-xs text-cyan-400 tracking-widest uppercase">Intel_Communication_Link</h3>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 custom-scroll mb-4 space-y-4"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'USER' ? 'items-end' : 'items-start'}`}>
            <div className={`text-[8px] font-hud mb-1 ${msg.role === 'USER' ? 'text-cyan-600' : 'text-indigo-400'}`}>
              {msg.role}_IDENTIFIED
            </div>
            <div className={`max-w-[80%] p-3 text-xs leading-relaxed border ${
              msg.role === 'USER' 
                ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-100 rounded-tl-lg rounded-bl-lg' 
                : 'bg-indigo-950/20 border-indigo-500/30 text-indigo-100 rounded-tr-lg rounded-br-lg'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start animate-pulse">
            <div className="text-[8px] font-hud mb-1 text-indigo-400">INTEL_PROCESSING...</div>
            <div className="w-12 h-6 bg-indigo-950/20 border border-indigo-500/30 flex items-center justify-center gap-1">
              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER_QUERY_FOR_INTEL..."
          className="w-full bg-slate-900/50 border border-cyan-900/50 p-3 text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 placeholder:text-cyan-900"
        />
        <button 
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-4 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 font-hud text-[10px]"
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default IntelPanel;
