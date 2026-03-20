import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, Button, Input, Textarea } from '../components/ui';
import { BlueprintTransition } from '../components/BlueprintTransition';
import { Phone, Mail, MapPin, Send, Shield } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

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
                Project Estimation
              </h3>
              <p className="text-lg opacity-60 leading-relaxed font-medium">
                Contact us today for a professional appraisal. We specialize in structural integrity 
                and premium finishes for high-end residential and commercial developments.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-12 border border-[var(--card-border)] shadow-2xl">
            <h3 className="mb-10 text-3xl font-black tracking-tight">Send a Message</h3>
            <form className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">{t.contact_page.form_name}</label>
                <Input placeholder="Johnathan Doe" className="h-14 px-6 text-lg font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">{t.contact_page.form_email}</label>
                <Input type="email" placeholder="john@example.com" className="h-14 px-6 text-lg font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">{t.contact_page.form_message}</label>
                <Textarea placeholder="Tell us about your project..." className="px-6 py-4 text-lg font-medium min-h-[180px]" />
              </div>
              <Button className="w-full h-18 text-xl font-black uppercase tracking-[0.2em] group rounded-2xl shadow-xl">
                {t.contact_page.form_btn}
                <Send className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </BlueprintTransition>
  );
};

export default Contact;
