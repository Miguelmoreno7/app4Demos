import type { Message, Profile } from "../utils/storage";
import MessageList from "./MessageList";
import PlayerControls from "./PlayerControls";
import JsonImport from "./JsonImport";

type EditorPanelProps = {
  profile: Profile;
  messages: Message[];
  visibleCount: number;
  isPlaying: boolean;
  isRecording: boolean;
  elapsedMs: number;
  speed: number;
  importError: string | null;
  onProfileChange: (profile: Profile) => void;
  onAddMessage: (message: Message) => void;
  onDeleteMessage: (index: number) => void;
  onMoveMessage: (index: number, direction: "up" | "down") => void;
  onPlay: () => void;
  onPause: () => void;
  onRecord: () => void;
  onStopRecording: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSpeedChange: (value: number) => void;
  onImport: (value: string) => void;
  onLoadExample: () => void;
};

const EditorPanel = ({
  profile,
  messages,
  visibleCount,
  isPlaying,
  isRecording,
  elapsedMs,
  speed,
  importError,
  onProfileChange,
  onAddMessage,
  onDeleteMessage,
  onMoveMessage,
  onPlay,
  onPause,
  onRecord,
  onStopRecording,
  onReset,
  onNext,
  onPrev,
  onSpeedChange,
  onImport,
  onLoadExample,
}: EditorPanelProps) => {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Perfil</h2>
        <div className="mt-4 space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-slate-500">
              Nombre
            </label>
            <input
              value={profile.name}
              onChange={(event) =>
                onProfileChange({ ...profile, name: event.target.value })
              }
              disabled={isRecording}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-slate-100"
              placeholder="Nombre visible"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-slate-500">
              Avatar URL
            </label>
            <input
              value={profile.avatarUrl}
              onChange={(event) =>
                onProfileChange({ ...profile, avatarUrl: event.target.value })
              }
              disabled={isRecording}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-slate-100"
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Mensajes</h2>
        <div className="mt-4">
          <MessageList
            messages={messages}
            onAddMessage={onAddMessage}
            onDeleteMessage={onDeleteMessage}
            onMoveMessage={onMoveMessage}
            disabled={isRecording}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Player</h2>
        <div className="mt-4">
          <PlayerControls
            isPlaying={isPlaying}
            isRecording={isRecording}
            elapsedMs={elapsedMs}
            visibleCount={visibleCount}
            speed={speed}
            total={messages.length}
            onPlay={onPlay}
            onPause={onPause}
            onRecord={onRecord}
            onStopRecording={onStopRecording}
            onReset={onReset}
            onNext={onNext}
            onPrev={onPrev}
            onSpeedChange={onSpeedChange}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Import JSON</h2>
        <div className="mt-4">
          <JsonImport
            error={importError}
            onImport={onImport}
            onLoadExample={onLoadExample}
            disabled={isRecording}
          />
        </div>
      </section>
    </div>
  );
};

export default EditorPanel;
