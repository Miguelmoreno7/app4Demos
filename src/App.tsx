import { useCallback, useEffect, useMemo, useState } from "react";
import EditorPanel from "./components/EditorPanel";
import PhonePreview from "./components/PhonePreview";
import {
  loadState,
  saveState,
  type AppState,
  type Message,
  type Profile,
} from "./utils/storage";
import { validateImportData } from "./utils/validators";

const defaultProfile: Profile = {
  name: "MovIA Demo",
  avatarUrl: "https://i.pravatar.cc/150?img=32",
};

const defaultMessages: Message[] = [
  { from: "user", text: "Hola! ¿Tienes un resumen del proyecto?" },
  { from: "agent", text: "Claro, la demo muestra un chat estilo WhatsApp." },
  { from: "agent", text: "Puedes controlar el replay con Play/Pause y ajustar la velocidad." },
];

const exampleMessages = [
  { from: "user", text: "Hola MovIA, ¿puedes mostrar un demo rápido?" },
  { from: "agent", text: "¡Claro! Aquí tienes un flujo de chat animado." },
  { from: "agent", text: "También puedo importar JSON y ajustar la velocidad." },
  { from: "user", text: "Perfecto, gracias." },
 ] satisfies Message[];

const examplePayload = {
  profile: {
    name: "MovIA",
    avatarUrl: "https://i.pravatar.cc/150?img=68",
  },
  messages: exampleMessages,
} satisfies AppState;

const App = () => {
  const savedState = useMemo(() => loadState(), []);
  const [profile, setProfile] = useState<Profile>(savedState?.profile ?? defaultProfile);
  const [messages, setMessages] = useState<Message[]>(
    savedState?.messages ?? defaultMessages
  );
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    saveState({ profile, messages });
  }, [profile, messages]);

  useEffect(() => {
    if (visibleCount > messages.length) {
      setVisibleCount(messages.length);
    }
  }, [messages.length, visibleCount]);

  useEffect(() => {
    if (!isPlaying) return;
    if (visibleCount >= messages.length) {
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + 1, messages.length));
    }, speed);
    return () => window.clearTimeout(timer);
  }, [isPlaying, visibleCount, messages.length, speed]);

  const handleAddMessage = useCallback(
    (message: Message) => {
      setMessages((prev) => [...prev, message]);
    },
    []
  );

  const handleDeleteMessage = useCallback((index: number) => {
    setMessages((prev) => prev.filter((_, idx) => idx !== index));
  }, []);

  const handleMoveMessage = useCallback(
    (index: number, direction: "up" | "down") => {
      setMessages((prev) => {
        const next = [...prev];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= next.length) return prev;
        [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
        return next;
      });
    },
    []
  );

  const handleReset = () => {
    setIsPlaying(false);
    setVisibleCount(0);
  };

  const handleNext = () => {
    setVisibleCount((count) => Math.min(count + 1, messages.length));
  };

  const handlePrev = () => {
    setVisibleCount((count) => Math.max(count - 1, 0));
  };

  const handleImport = (raw: string) => {
    if (!raw.trim()) {
      setImportError("Pega un JSON válido para importar.");
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      const validation = validateImportData(parsed);
      if (!validation.ok) {
        setImportError(validation.error);
        return;
      }
      setProfile(validation.data.profile);
      setMessages(validation.data.messages);
      setVisibleCount(0);
      setIsPlaying(false);
      setImportError(null);
    } catch {
      setImportError("El JSON no tiene formato válido.");
    }
  };

  const handleLoadExample = () => {
    setProfile(examplePayload.profile);
    setMessages(examplePayload.messages);
    setVisibleCount(0);
    setIsPlaying(false);
    setImportError(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-600">
            WhatsDemo MVP
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Simulador visual de chat estilo WhatsApp
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Controla el perfil, mensajes y la reproducción del chat desde el panel derecho.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
          <PhonePreview
            profile={profile}
            messages={messages.slice(0, visibleCount)}
            isPlaying={isPlaying}
          />
          <EditorPanel
            profile={profile}
            messages={messages}
            visibleCount={visibleCount}
            isPlaying={isPlaying}
            speed={speed}
            importError={importError}
            onProfileChange={setProfile}
            onAddMessage={handleAddMessage}
            onDeleteMessage={handleDeleteMessage}
            onMoveMessage={handleMoveMessage}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onReset={handleReset}
            onNext={handleNext}
            onPrev={handlePrev}
            onSpeedChange={setSpeed}
            onImport={handleImport}
            onLoadExample={handleLoadExample}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
