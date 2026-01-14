import { useState } from "react";
import type { Message } from "../utils/storage";

type MessageListProps = {
  messages: Message[];
  onAddMessage: (message: Message) => void;
  onDeleteMessage: (index: number) => void;
  onMoveMessage: (index: number, direction: "up" | "down") => void;
};

const MessageList = ({
  messages,
  onAddMessage,
  onDeleteMessage,
  onMoveMessage,
}: MessageListProps) => {
  const [from, setFrom] = useState<Message["from"]>("user");
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddMessage({ from, text: text.trim() });
    setText("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase text-slate-500">
          Nuevo mensaje
        </label>
        <div className="flex items-center gap-2">
          <select
            value={from}
            onChange={(event) => setFrom(event.target.value as Message["from"])}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Agregar
          </button>
        </div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          placeholder="Escribe el mensaje..."
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-500">
          <span>Mensajes ({messages.length})</span>
        </div>
        {messages.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-3 text-sm text-slate-500">
            No hay mensajes. Agrega el primero.
          </p>
        ) : (
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      {message.from}
                    </p>
                    <p className="text-sm text-slate-800">{message.text}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => onMoveMessage(index, "up")}
                      disabled={index === 0}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => onMoveMessage(index, "down")}
                      disabled={index === messages.length - 1}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteMessage(index)}
                      className="rounded-lg border border-rose-200 px-2 py-1 text-xs text-rose-600 transition hover:bg-rose-50"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
