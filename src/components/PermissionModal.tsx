import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, HardDrive, ShieldAlert, ShieldCheck, RefreshCw, HelpCircle, Check, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CameraCaptureModal } from './CameraCaptureModal';

export type PermissionState = 'granted' | 'denied' | 'prompt' | 'checking';

interface PermissionModalProps {
  manualOpenTrigger?: number;
}

export const PermissionModal: React.FC<PermissionModalProps> = ({ manualOpenTrigger }) => {
  const { t } = useLanguage();

  const [cameraState, setCameraState] = useState<PermissionState>('checking');
  const [storageState, setStorageState] = useState<PermissionState>('prompt');
  const [isOpen, setIsOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  // Check camera & storage permission status
  const checkPermissions = useCallback(async (autoPromptIfDenied = false) => {
    setCameraState('checking');

    // 1. Try querying Navigator Permissions API if supported
    if (navigator.permissions && navigator.permissions.query) {
      try {
        const camPermission = await navigator.permissions.query({ name: 'camera' as any });
        setCameraState(camPermission.state as PermissionState);
        
        // Listen to changes dynamically
        camPermission.onchange = () => {
          setCameraState(camPermission.state as PermissionState);
        };
      } catch (e) {
        // Fallback for browsers that don't support camera in permissions.query
      }
    }

    // 2. Test getUserMedia availability or active status
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideo = devices.some((d) => d.kind === 'videoinput');
        if (!hasVideo) {
          // No camera hardware found
        }
      } catch (e) {
        console.warn('Unable to enumerate devices:', e);
      }
    }

    // Check saved state in localStorage to see if user has already granted in this session
    const savedCamStatus = localStorage.getItem('treeline_camera_permission');
    const savedStorageStatus = localStorage.getItem('treeline_storage_permission');

    if (savedCamStatus === 'granted') {
      setCameraState('granted');
    }
    if (savedStorageStatus === 'granted') {
      setStorageState('granted');
    }

    // Determine if we should automatically open modal when reopening/entering app
    const currentCam = savedCamStatus || cameraState;
    const currentStorage = savedStorageStatus || storageState;

    if (autoPromptIfDenied || currentCam !== 'granted' || currentStorage !== 'granted') {
      // Re-prompt user whenever app opens or gains focus if not granted
      setIsOpen(true);
    }
  }, [cameraState, storageState]);

  // Request camera and storage permissions from browser
  const requestPermissions = async () => {
    setIsRequesting(true);
    setShowInstructions(false);

    let camGranted = false;
    let storageGranted = false;

    // 1. Request Camera Access via getUserMedia
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Stop stream immediately after test success
        stream.getTracks().forEach((track) => track.stop());
        camGranted = true;
        setCameraState('granted');
        localStorage.setItem('treeline_camera_permission', 'granted');
      }
    } catch (err: any) {
      console.warn('Camera permission denied or error:', err);
      setCameraState('denied');
      localStorage.setItem('treeline_camera_permission', 'denied');
      setShowInstructions(true); // Show guide if blocked
    }

    // 2. Storage / File Access test
    try {
      // File API / IndexedDB test for storage grant
      if (typeof window !== 'undefined' && 'FileReader' in window) {
        storageGranted = true;
        setStorageState('granted');
        localStorage.setItem('treeline_storage_permission', 'granted');
      }
    } catch (err) {
      setStorageState('denied');
      localStorage.setItem('treeline_storage_permission', 'denied');
    }

    setIsRequesting(false);

    if (camGranted && storageGranted) {
      setIsOpen(false);
    }
  };

  // Re-check and auto-prompt every time the app opens, resumes, or changes visibility!
  useEffect(() => {
    const handleLifecycleEvent = () => {
      if (document.visibilityState === 'visible') {
        // App reopened or brought back to foreground!
        checkPermissions(true);
      }
    };

    // Initial check on mount
    checkPermissions(true);

    // Add event listeners for app reopen / focus / visibility change
    document.addEventListener('visibilitychange', handleLifecycleEvent);
    window.addEventListener('focus', handleLifecycleEvent);
    window.addEventListener('pageshow', handleLifecycleEvent);

    return () => {
      document.removeEventListener('visibilitychange', handleLifecycleEvent);
      window.removeEventListener('focus', handleLifecycleEvent);
      window.removeEventListener('pageshow', handleLifecycleEvent);
    };
  }, [checkPermissions]);

  // Manual trigger from navbar button
  useEffect(() => {
    if (manualOpenTrigger && manualOpenTrigger > 0) {
      setIsOpen(true);
    }
  }, [manualOpenTrigger]);

  const isAllGranted = cameraState === 'granted' && storageState === 'granted';

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-slate-900/95 p-6 md:p-8 text-white shadow-2xl overflow-hidden"
            >
              {/* Decorative Background Accent */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--company-gold)]/10 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                title={t.permissions.btn_dismiss}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header Icon & Title */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--company-gold)]/20 border border-[var(--company-gold)]/40 text-[var(--company-gold)] shadow-xl">
                  {isAllGranted ? (
                    <ShieldCheck className="h-9 w-9 text-emerald-400" />
                  ) : (
                    <ShieldAlert className="h-9 w-9 text-amber-400 animate-pulse" />
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                  {t.permissions.modal_title}
                </h2>
                <p className="text-sm text-white/70 font-medium max-w-md leading-relaxed">
                  {t.permissions.modal_subtitle}
                </p>
              </div>

              {/* Status List */}
              <div className="my-6 space-y-3">
                {/* Camera Status Row */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-500/20 p-2.5 text-amber-400">
                      <Camera className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{t.permissions.camera_label}</p>
                      <p className="text-xs text-white/50">Fotos de obra y cotización en vivo</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider ${
                      cameraState === 'granted'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : cameraState === 'denied'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {cameraState === 'granted' && <Check className="h-3.5 w-3.5" />}
                    {cameraState === 'granted'
                      ? t.permissions.status_granted
                      : cameraState === 'denied'
                      ? t.permissions.status_denied
                      : t.permissions.status_prompt}
                  </span>
                </div>

                {/* Storage Status Row */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-500/20 p-2.5 text-blue-400">
                      <HardDrive className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{t.permissions.storage_label}</p>
                      <p className="text-xs text-white/50">Carga de fotos de proyectos y planos</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider ${
                      storageState === 'granted'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : storageState === 'denied'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {storageState === 'granted' && <Check className="h-3.5 w-3.5" />}
                    {storageState === 'granted'
                      ? t.permissions.status_granted
                      : storageState === 'denied'
                      ? t.permissions.status_denied
                      : t.permissions.status_prompt}
                  </span>
                </div>
              </div>

              {/* Instructions Box if Denied */}
              {(showInstructions || cameraState === 'denied') && (
                <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-950/40 p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <HelpCircle className="h-4 w-4" />
                    {t.permissions.instructions_title}
                  </div>
                  <p className="text-amber-100/80">{t.permissions.instructions_ios}</p>
                  <p className="text-amber-100/80">{t.permissions.instructions_android}</p>
                </div>
              )}

              {/* Notice note */}
              <p className="mb-6 text-center text-xs text-white/40 italic">
                ℹ️ {t.permissions.remember_note}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={requestPermissions}
                  disabled={isRequesting}
                  className="w-full py-4 rounded-2xl bg-[var(--company-gold)] text-black text-sm font-black uppercase tracking-wider shadow-xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {isRequesting ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Solicitando accesos...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      {cameraState === 'denied'
                        ? t.permissions.btn_retry
                        : t.permissions.btn_grant}
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowCameraModal(true)}
                    className="py-3 px-4 rounded-xl border border-white/20 bg-white/10 text-xs font-bold uppercase tracking-wider hover:bg-white/20 flex items-center justify-center gap-2"
                  >
                    <Camera className="h-4 w-4 text-[var(--company-gold)]" />
                    {t.permissions.btn_open_camera}
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider hover:bg-white/10 text-white/80"
                  >
                    {t.permissions.btn_dismiss}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Camera & Image Capture Modal */}
      <CameraCaptureModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
      />
    </>
  );
};
