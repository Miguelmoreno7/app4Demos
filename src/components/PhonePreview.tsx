import { useEffect, useRef } from "react";
import type { Message, Profile } from "../utils/storage";

const backgroundStyle = {
  backgroundImage:
    "linear-gradient(135deg, rgba(226,232,240,0.6), rgba(240,253,250,0.8)), repeating-linear-gradient(45deg, rgba(148,163,184,0.08) 0, rgba(148,163,184,0.08) 2px, transparent 2px, transparent 10px)",
};

type PhonePreviewProps = {
  profile: Profile;
  messages: Message[];
};

const PhonePreview = ({ profile, messages }: PhonePreviewProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl">
        <div className="rounded-[2.3rem] border-[12px] border-slate-900/90 bg-slate-900/90">
          <div className="rounded-[1.8rem] bg-white" style={backgroundStyle}>
            <div className="flex items-center gap-3 border-b border-slate-200/70 bg-white/80 px-4 py-3 backdrop-blur">
              <img
                src={profile.avatarUrl || "https://i.pravatar.cc/80?img=12"}
                alt={profile.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.name || "Tu nombre"}
                </p>
                <p className="text-xs text-slate-500">En línea</p>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="h-[480px] space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin"
            >
              {messages.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-4 text-center text-xs text-slate-500">
                  Usa el panel para agregar mensajes y reproducir el chat.
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={`${message.from}-${index}`}
                  className={`flex ${
                    message.from === "agent" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm animate-fade-up ${
                      message.from === "agent"
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-slate-200 text-slate-900"
                    }`}
                  >
                    {message.text || "(sin texto)"}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
