import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, QrCode } from 'lucide-react';

type ScanMode = 'camera' | 'upload' | 'manual';

const ScannerPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<ScanMode>('camera');
  const [supported, setSupported] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [decoded, setDecoded] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);

  useEffect(() => {
    // Check BarcodeDetector support
    // @ts-ignore
    setSupported(typeof window !== 'undefined' && !!(window as any).BarcodeDetector);
  }, []);

  useEffect(() => {
    if (mode !== 'camera') {
      stopStream();
      return;
    }
    let active = true;
    const init = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (!active) return;
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          await videoRef.current.play();
        }
        if (supported) startDetectLoop();
      } catch (e) {
        console.error('Camera init error', e);
      }
    };
    init();
    return () => {
      active = false;
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, supported]);

  const stopStream = () => {
    setScanning(false);
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
    }
    setStream(null);
  };

  // Stopper la caméra si l'onglet est masqué ou à la fermeture
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        stopStream();
      }
    };
    const onBeforeUnload = () => stopStream();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [stream]);

  const startDetectLoop = () => {
    if (!supported || !videoRef.current) return;
    setScanning(true);
    // @ts-ignore
    const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
    const tick = async () => {
      if (!videoRef.current || !scanning) return;
      try {
        const codes = await detector.detect(videoRef.current);
        if (codes && codes.length > 0) {
          setDecoded(codes[0].rawValue || '');
          setScanning(false);
          return;
        }
      } catch {}
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = async () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      try {
        // Try BarcodeDetector on static image as well
        // @ts-ignore
        if (supported) {
          // @ts-ignore
          const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
          const bitmap = await createImageBitmap(img);
          const codes = await detector.detect(bitmap as any);
          if (codes && codes.length > 0) {
            setDecoded(codes[0].rawValue || '');
            return;
          }
        }
        // Fallback: not available without external lib; ask manual entry
        setDecoded('');
      } catch (err) {
        console.error('decode error', err);
      }
    };
    img.src = URL.createObjectURL(file);
  };

  const onManualVerify = () => {
    // In a real app, call backend to validate ticket code
    // Here we just keep the decoded string as-is
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-orange-100">
            <QrCode className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Scanner de billets</h1>
            <p className="text-gray-500 text-xs sm:text-sm">Vérifiez les QR codes des tickets des utilisateurs</p>
          </div>
        </div>
        <Badge className={`${supported ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'} text-xs sm:text-sm`}>
          <span className="hidden sm:inline">{supported ? 'Scanner caméra disponible' : 'Scanner caméra limité'}</span>
          <span className="sm:hidden">{supported ? 'Caméra OK' : 'Caméra limité'}</span>
        </Badge>
      </div>

      <Card className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button variant={mode === 'camera' ? 'default' : 'outline'} onClick={() => setMode('camera')} size="sm" className="flex-1 sm:flex-none">
            <Camera className="h-4 w-4 sm:mr-2" /> 
            <span className="hidden sm:inline">Caméra</span>
          </Button>
          <Button variant={mode === 'upload' ? 'default' : 'outline'} onClick={() => setMode('upload')} size="sm" className="flex-1 sm:flex-none">
            <Upload className="h-4 w-4 sm:mr-2" /> 
            <span className="hidden sm:inline">Importer une image</span>
            <span className="sm:hidden">Importer</span>
          </Button>
          <Button variant={mode === 'manual' ? 'default' : 'outline'} onClick={() => setMode('manual')} size="sm" className="flex-1 sm:flex-none">
            <span className="hidden sm:inline">Saisie manuelle</span>
            <span className="sm:hidden">Manuel</span>
          </Button>
          {mode === 'camera' && stream && (
            <Button variant="outline" onClick={() => { stopStream(); setMode('manual'); }} size="sm" className="flex-1 sm:flex-none">
              <span className="hidden sm:inline">Éteindre la caméra</span>
              <span className="sm:hidden">Arrêter</span>
            </Button>
          )}
        </div>

        {mode === 'camera' && (
          <div className="space-y-3">
            {!supported && (
              <p className="text-sm text-gray-500">Le scan caméra dépend du support du navigateur. Utilisez l’import d’image ou la saisie manuelle en alternative.</p>
            )}
            <div className="aspect-video bg-black/5 rounded overflow-hidden">
              <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            </div>
          </div>
        )}

        {mode === 'upload' && (
          <div className="space-y-3">
            <Input type="file" accept="image/*" onChange={onUpload} />
            <canvas ref={canvasRef} className="w-full hidden" />
          </div>
        )}

        {mode === 'manual' && (
          <div className="space-y-3">
            <LabelLike>Code du ticket</LabelLike>
            <Input placeholder="Ex: TICKET-ABC-123" onChange={(e) => setDecoded(e.target.value)} value={decoded} />
            <div className="flex justify-end">
              <Button onClick={onManualVerify}>Vérifier</Button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 mb-2">Résultat</p>
          {decoded ? (
            <Card className="p-4 bg-green-50 border-green-200">
              <p className="font-medium break-all">{decoded}</p>
              <p className="text-sm text-gray-600 mt-1">Utilisez ce code pour vérifier la validité du billet côté serveur.</p>
            </Card>
          ) : (
            <Card className="p-4 bg-gray-50">
              <p className="text-gray-500">Aucun code détecté pour l’instant.</p>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

const LabelLike: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{children}</p>
);

export default ScannerPage;


