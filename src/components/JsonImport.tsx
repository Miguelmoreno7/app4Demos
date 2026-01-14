import { useState } from "react";

export type JsonImportResult = {
  raw: string;
};

type JsonImportProps = {
  error: string | null;
  onImport: (value: string) => void;
  onLoadExample: () => void;
  disabled?: boolean;
};

const JsonImport = ({
  error,
  onImport,
  onLoadExample,
  disabled = false,
}: JsonImportProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase text-slate-500">
          Pegar JSON
        </label>
        <button
          type="button"
          onClick={onLoadExample}
          disabled={disabled}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cargar ejemplo
        </button>
      </div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={6}
        disabled={disabled}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-slate-100"
        placeholder='{"profile": {"name": "...", "avatarUrl": "..."}, "messages": []}'
      />
      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-600">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={() => onImport(value)}
        disabled={disabled}
        className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Importar
      </button>
    </div>
  );
};

export default JsonImport;
