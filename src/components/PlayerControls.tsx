type PlayerControlsProps = {
  isPlaying: boolean;
  isRecording: boolean;
  elapsedMs: number;
  visibleCount: number;
  speed: number;
  total: number;
  onPlay: () => void;
  onPause: () => void;
  onRecord: () => void;
  onStopRecording: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSpeedChange: (value: number) => void;
};

const PlayerControls = ({
  isPlaying,
  isRecording,
  elapsedMs,
  visibleCount,
  speed,
  total,
  onPlay,
  onPause,
  onRecord,
  onStopRecording,
  onReset,
  onNext,
  onPrev,
  onSpeedChange,
}: PlayerControlsProps) => {
  const canPrev = visibleCount > 0;
  const canNext = visibleCount < total;
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const seconds = String(elapsedSeconds % 60).padStart(2, "0");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={isPlaying ? onPause : onPlay}
          disabled={isRecording}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onRecord}
          disabled={isRecording}
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Grabar
        </button>
        <button
          type="button"
          onClick={onStopRecording}
          disabled={!isRecording}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Detener
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={isRecording}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onPrev}
          disabled={isRecording || !canPrev}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={isRecording || !canNext}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
        {isRecording && (
          <span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600">
            Grabando… {minutes}:{seconds}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-500">
          <span>Velocidad</span>
          <span>{speed} ms</span>
        </div>
        <input
          type="range"
          min={300}
          max={2000}
          value={speed}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
          disabled={isRecording}
          className="w-full disabled:cursor-not-allowed"
        />
        <div className="text-xs text-slate-500">
          {visibleCount}/{total} mensajes visibles
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
