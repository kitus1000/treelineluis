import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, X, RefreshCw, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoCaptured?: (photoUrl: string) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onPhotoCaptured,
}) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);

  // Start camera stream when modal opens
  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async (mode: 'user' | 'environment') => {
    setIsLoadingCamera(true);
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Cámara no soportada en este navegador.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Error starting camera stream:', err);
      setCameraError(err?.message || 'No se pudo acceder a la cámara. Revisa los permisos.');
    } finally {
      setIsLoadingCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleTakeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(dataUrl);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmPhoto = () => {
    if (capturedImage && onPhotoCaptured) {
      onPhotoCaptured(capturedImage);
    }
    onClose();
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-slate-950/90 p-6 text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[var(--company-gold)]/20 p-2 text-[var(--company-gold)]">
                <Camera className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide">
                  {t.camera_modal.title}
                </h3>
                <p className="text-xs text-white/60 font-medium">
                  {t.camera_modal.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Hidden Canvas & File Input */}
          <canvas ref={canvasRef} className="hidden" />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Main Body */}
          <div className="my-4 flex-1 flex flex-col items-center justify-center relative min-h-[300px] bg-black/50 rounded-2xl overflow-hidden border border-white/10">
            {capturedImage ? (
              <div className="relative w-full h-full min-h-[320px] flex items-center justify-center bg-black">
                <img
                  src={capturedImage}
                  alt="Captured project site"
                  className="max-h-[360px] w-full object-contain"
                />
                <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold shadow-lg">
                  <CheckCircle className="h-4 w-4" />
                  Foto Lista
                </div>
              </div>
            ) : cameraError ? (
              <div className="flex flex-col items-center text-center p-8 space-y-4">
                <AlertTriangle className="h-12 w-12 text-amber-400" />
                <p className="text-sm font-semibold text-amber-200">{cameraError}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => startCamera(facingMode)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    <RefreshCw className="h-4 w-4" /> Reintentar
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 bg-[var(--company-gold)] text-black px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg hover:brightness-110"
                  >
                    <ImageIcon className="h-4 w-4" /> {t.camera_modal.select_file}
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full min-h-[320px] bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-[320px] object-cover rounded-2xl"
                />
                {isLoadingCamera && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3">
                    <RefreshCw className="h-6 w-6 animate-spin text-[var(--company-gold)]" />
                    <span className="text-xs font-bold tracking-widest uppercase">Iniciando Cámara...</span>
                  </div>
                )}
                
                {/* Switch Camera Button */}
                <button
                  onClick={toggleFacingMode}
                  title={t.camera_modal.switch_camera}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 p-3 rounded-full text-white border border-white/20 shadow-lg backdrop-blur-md transition-transform active:scale-95"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Controls Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              <ImageIcon className="h-4 w-4 text-[var(--company-gold)]" />
              {t.camera_modal.select_file}
            </button>

            <div className="flex gap-3 ml-auto">
              {capturedImage ? (
                <>
                  <button
                    onClick={() => setCapturedImage(null)}
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wider hover:bg-white/20"
                  >
                    {t.camera_modal.retake}
                  </button>
                  <button
                    onClick={handleConfirmPhoto}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-lg hover:bg-emerald-400"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    {t.camera_modal.use_photo}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleTakeSnapshot}
                  disabled={!!cameraError || isLoadingCamera}
                  className="flex items-center gap-2 rounded-xl bg-[var(--company-gold)] px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-xl hover:brightness-110 disabled:opacity-50 transition-all active:scale-95"
                >
                  <Camera className="h-4 w-4" />
                  {t.camera_modal.take_photo}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
