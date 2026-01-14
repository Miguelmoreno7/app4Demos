import { useCallback, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const FPS = 15;
const SCALE = 2;
const TIMER_INTERVAL_MS = 250;

const mimeTypeCandidates = [
  "video/webm;codecs=vp9",
  "video/webm;codecs=vp8",
  "video/webm",
];

type StartRecordingOptions = {
  phoneEl: HTMLElement | null;
  onStop?: () => void;
};

const getSupportedMimeType = () => {
  if (typeof MediaRecorder === "undefined") {
    return "";
  }
  return (
    mimeTypeCandidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) ??
    ""
  );
};

const formatTimestamp = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(
    date.getHours()
  )}${pad(date.getMinutes())}`;
};

const downloadBlob = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `whatsdemo-${formatTimestamp(new Date())}.webm`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const usePhoneRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameTimerRef = useRef<number | null>(null);
  const elapsedTimerRef = useRef<number | null>(null);
  const recordingStartRef = useRef<number>(0);
  const isRecordingRef = useRef(false);

  const stopRecording = useCallback(() => {
    isRecordingRef.current = false;
    if (frameTimerRef.current) {
      window.clearTimeout(frameTimerRef.current);
      frameTimerRef.current = null;
    }
    if (elapsedTimerRef.current) {
      window.clearInterval(elapsedTimerRef.current);
      elapsedTimerRef.current = null;
    }
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  }, []);

  const startRecording = useCallback(({ phoneEl, onStop }: StartRecordingOptions) => {
    if (!phoneEl || isRecordingRef.current) return;

    const rect = phoneEl.getBoundingClientRect();
    const width = Math.round(rect.width * SCALE);
    const height = Math.round(rect.height * SCALE);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvasRef.current = canvas;

    const stream = canvas.captureStream(FPS);
    const mimeType = getSupportedMimeType();
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

    chunksRef.current = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(chunksRef.current, { type: mimeType || "video/webm" });
      downloadBlob(blob);
      chunksRef.current = [];
      recorderRef.current = null;
      canvasRef.current = null;
      setIsRecording(false);
      setElapsedMs(0);
      onStop?.();
    };

    recorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
    isRecordingRef.current = true;
    recordingStartRef.current = Date.now();
    setElapsedMs(0);

    elapsedTimerRef.current = window.setInterval(() => {
      setElapsedMs(Date.now() - recordingStartRef.current);
    }, TIMER_INTERVAL_MS);

    const renderFrame = async () => {
      if (!isRecordingRef.current || !canvasRef.current) return;
      try {
        const shot = await html2canvas(phoneEl, {
          backgroundColor: null,
          scale: SCALE,
        });
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(shot, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      } catch (error) {
        console.error("Error capturing frame", error);
      } finally {
        if (isRecordingRef.current) {
          frameTimerRef.current = window.setTimeout(renderFrame, 1000 / FPS);
        }
      }
    };

    void renderFrame();
  }, []);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, [stopRecording]);

  return {
    isRecording,
    elapsedMs,
    startRecording,
    stopRecording,
  };
};

export default usePhoneRecorder;
