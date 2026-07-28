import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, Button, Input, Textarea } from '../components/ui';
import { BlueprintTransition } from '../components/BlueprintTransition';
import { Phone, Mail, MapPin, Send, Shield, Camera, Trash2, CheckCircle2 } from 'lucide-react';
import { CameraCaptureModal } from '../components/CameraCaptureModal';

const Contact = () => {
  const { t } = useLanguage();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhotoCaptured = (photoUrl: string) => {
    setAttachedPhotos((prev) => [...prev, photoUrl]);
  };

  const handleRemovePhoto = (index: number) => {
    setAttachedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setAttachedPhotos([]);
    }, 4000);
  };

  return (
    <BlueprintTransition>
      <div className="px-4 py-24 md:px-6 relative z-10">
        <header className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-black md:text-7xl tracking-tight leading-tight">
            {t.contact_page.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-60 font-medium tracking-wide">
            {t.contact_page.subtitle}
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-10">
            <h2 className="text-4xl font-black tracking-tight">{t.contact_page.info}</h2>
            
            <div className="space-y-6">
              {[
                { icon: <Phone className="h-7 w-7" />, label: t.contact_page.phone, value: "+1 (970) 376-2312" },
                { icon: <Mail className="h-7 w-7" />, label: t.contact_page.email, value: "luis@treelinemasonryconstruction.com" },
                { icon: <MapPin className="h-7 w-7" />, label: t.contact_page.location, value: t.contact_page.locationValue },
              ].map((item, i) => (
                <Card key={i} className="group hover:border-[var(--accent)]/30 transition-all duration-500">
                  <CardContent className="flex items-center gap-8 p-8">
                    <div className="rounded-2xl bg-[var(--accent)]/5 p-5 text-[var(--accent)] group-hover:scale-110 group-hover:bg-[var(--accent)]/10 transition-all duration-500 bloom">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] font-black opacity-40 mb-1">{item.label}</p>
                      <p className="text-xl font-bold tracking-tight">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="glass-card mt-12 overflow-hidden p-10 border-l-4 border-[var(--accent)] relative">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                <Shield className="h-32 w-32" />
              </div>
              <h3 className="mb-4 text-2xl font-black tracking-tight text-[var(--accent)] uppercase">
                Estimación de Proyectos
              </h3>
              <p className="text-lg opacity-60 leading-relaxed font-medium">
                Contáctenos hoy para una evaluación profesional. Nos especializamos en integridad estructural 
                y acabados de primera clase para desarrollo residencial y comercial. Puedes adjuntar fotos tomadas con tu cámara o galería.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 md:p-12 border border-[var(--card-border)] shadow-2xl">
            <h3 className="mb-8 text-3xl font-black tracking-tight">Enviar Mensaje</h3>
            
            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto" />
                <h4 className="text-2xl font-black text-emerald-300">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-sm opacity-80">Nos pondremos en contacto contigo lo antes posible para la cotización de tu obra.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">{t.contact_page.form_name}</label>
                  <Input required placeholder="Nombre Completo" className="h-14 px-6 text-lg font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">{t.contact_page.form_email}</label>
                  <Input required type="email" placeholder="correo@ejemplo.com" className="h-14 px-6 text-lg font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">{t.contact_page.form_message}</label>
                  <Textarea required placeholder="Cuéntanos los detalles de tu proyecto o trabajo de albañilería..." className="px-6 py-4 text-lg font-medium min-h-[140px]" />
                </div>

                {/* Site Photos Attachment Section */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">
                      {t.camera_modal.attached_photos} ({attachedPhotos.length})
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCameraOpen(true)}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--company-gold)] bg-[var(--company-gold)]/10 hover:bg-[var(--company-gold)]/20 px-4 py-2.5 rounded-xl border border-[var(--company-gold)]/30 transition-all"
                    >
                      <Camera className="h-4 w-4" />
                      Adjuntar Foto / Usar Cámara
                    </button>
                  </div>

                  {attachedPhotos.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                      {attachedPhotos.map((photo, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden aspect-square bg-black border border-white/10">
                          <img src={photo} alt={`Attached site photo ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-1 right-1 p-1.5 rounded-full bg-rose-600/90 text-white opacity-90 hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full h-18 text-xl font-black uppercase tracking-[0.2em] group rounded-2xl shadow-xl mt-4">
                  {t.contact_page.form_btn}
                  <Send className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>

      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onPhotoCaptured={handlePhotoCaptured}
      />
    </BlueprintTransition>
  );
};

export default Contact;
