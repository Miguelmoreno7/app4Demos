import type { Message } from "../utils/storage";

type PlayerControlsProps = {
  isPlaying: boolean;
  visibleCount: number;
  speed: number;
  total: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSpeedChange: (value: number) => void;
};

const PlayerControls = ({
  isPlaying,
  visibleCount,
  speed,
  total,
  onPlay,
  onPause,
  onReset,
  onNext,
  onPrev,
  onSpeedChange,
}: PlayerControlsProps) => {
  const canPrev = visibleCount > 0;
  const canNext = visibleCount < total;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={isPlaying ? onPause : onPlay}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
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
          className="w-full"
        />
        <div className="text-xs text-slate-500">
          {visibleCount}/{total} mensajes visibles
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
