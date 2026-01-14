import { useEffect, useRef, type RefObject } from "react";
import type { Message, Profile } from "../utils/storage";

const chatBackgroundStyle = {
  backgroundColor: "#efeae2",
  backgroundImage:
    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 20%, transparent 20%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 18%, transparent 18%), radial-gradient(circle at 0% 80%, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 20%, transparent 20%)",
};

type PhonePreviewProps = {
  phoneRef: RefObject<HTMLDivElement>;
  profile: Profile;
  messages: Message[];
  isPlaying: boolean;
  visibleCount: number;
};

const PhonePreview = ({
  phoneRef,
  profile,
  messages,
  isPlaying,
  visibleCount,
}: PhonePreviewProps) => {
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    if (!chatScrollRef.current) return;
    chatScrollRef.current.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleCount, isPlaying]);

  return (
    <div className="flex justify-center" ref={phoneRef}>
      <div className="w-[430px] h-[932px] rounded-[3.5rem] bg-black p-4 shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full min-h-0 rounded-[2.6rem] bg-white overflow-hidden border border-black/10">
          <div className="relative flex justify-center bg-black">
            <div className="h-7 w-36 rounded-b-3xl bg-black" />
          </div>
          <div className="flex items-center justify-between border-b border-black/5 bg-white/90 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-lg text-[#007aff]">‹</span>
              <img
                src={profile.avatarUrl || "https://i.pravatar.cc/80?img=12"}
                alt={profile.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {profile.name || "Tu nombre"}
                </p>
                <p className="text-xs text-slate-500">en línea</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-lg text-[#007aff]">
              <span>📞</span>
              <span>🎥</span>
              <span>⋯</span>
            </div>
          </div>
          <div className="flex-1 flex min-h-0 flex-col" style={chatBackgroundStyle}>
            <div
              ref={chatScrollRef}
              className="flex-1 h-full overflow-y-auto overscroll-contain px-4 py-4 space-y-3 scrollbar-thin"
            >
              {messages.length === 0 && (
                <div className="rounded-2xl border border-dashed border-black/10 bg-white/80 p-4 text-center text-xs text-slate-500">
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
                    className={`max-w-[78%] rounded-[18px] px-4 py-2 text-sm text-slate-900 shadow-sm animate-fade-up ${
                      message.from === "agent" ? "bg-[#dcf8c6]" : "bg-white"
                    }`}
                  >
                    {message.text || "(sin texto)"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
