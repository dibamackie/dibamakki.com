"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm Ask Diba AI. You can ask me about Diba's projects, skills, or experience. What do you want to know?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Tell me about Diba",
    "What projects has she built?",
    "What technologies does she use?",
    "Why should we hire her?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newUserMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Oops! I couldn't reach the backend server right now. Make sure it's running!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-lime-500 text-zinc-950 shadow-[0_0_15px_rgba(132,204,22,0.5)] flex items-center justify-center z-50 transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-lime-400">
                <Bot size={20} />
                <h3 className="font-syne font-bold text-lg text-white">Ask Diba AI</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? 'self-end flex-row-reverse' : 'self-start'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user" ? 'bg-zinc-800 text-zinc-300' : 'bg-lime-500/10 text-lime-400 border border-lime-500/30'
                  }`}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? 'bg-zinc-800 text-zinc-100 rounded-tr-sm' 
                      : 'bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] self-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-lime-500/10 text-lime-400 border border-lime-500/30">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-tl-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-lime-400" />
                    <span className="text-xs text-zinc-500">Thinking...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="p-3 flex flex-wrap gap-2 border-t border-zinc-800/50 bg-zinc-900/30">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-white hover:border-zinc-500 transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/30 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="absolute right-2 p-2 rounded-full text-zinc-400 hover:text-lime-400 disabled:opacity-50 disabled:hover:text-zinc-400 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
