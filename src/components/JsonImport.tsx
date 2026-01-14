import { useState } from "react";

export type JsonImportResult = {
  raw: string;
};

type JsonImportProps = {
  error: string | null;
  onImport: (value: string) => void;
  onLoadExample: () => void;
};

const JsonImport = ({ error, onImport, onLoadExample }: JsonImportProps) => {
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
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
        >
          Cargar ejemplo
        </button>
      </div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={6}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
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
        className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Importar
      </button>
    </div>
  );
};

export default JsonImport;
