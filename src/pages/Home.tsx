import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui';
import { BlueprintTransition } from '../components/BlueprintTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Shield, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LogoEmblem } from '../components/LogoEmblem';

const Home = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/projects/terminado5.jpg",
    "/projects/terminado6.jpg",
    "/projects/terminado4.jpg",
    "/projects/temrinado2.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: <Shield className="h-6 w-6 text-[var(--accent)]" />, title: t.why_us.reliable },
    { icon: <Star className="h-6 w-6 text-[var(--accent)]" />, title: t.why_us.quality },
    { icon: <Zap className="h-6 w-6 text-[var(--accent)]" />, title: t.why_us.innovation },
  ];

  return (
    <BlueprintTransition>
      <div className="flex flex-col gap-32 pb-32 pt-10 relative z-10">
        {/* Hero Section */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-[4rem] border border-[var(--card-border)] mx-4 md:mx-10 bg-[var(--bg-color)]">
             <AnimatePresence mode="wait">
               <motion.img
                 key={currentSlide}
                 src={slides[currentSlide]}
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 0.25, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 1.5 }}
                 className="h-full w-full object-cover grayscale"
               />
             </AnimatePresence>
             <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)] via-transparent to-[var(--bg-color)]" />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 relative"
          >
            <div className="absolute -inset-10 bg-[var(--accent)] opacity-10 blur-3xl rounded-full" />
            <LogoEmblem className="h-64 w-64 md:h-80 md:w-80 relative z-10 bloom" />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 max-w-5xl text-5xl font-black tracking-tight md:text-8xl leading-[1.1]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 max-w-2xl text-lg opacity-60 md:text-xl font-medium"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link to="/services">
              <Button className="w-full sm:w-auto h-16 px-10 text-xl tracking-wide rounded-2xl">
                {t.hero.cta}
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="w-full sm:w-auto h-16 px-10 text-xl border-2 rounded-2xl">
                {t.hero.contact}
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="grid gap-8 px-4 md:grid-cols-3 md:px-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="glass-card flex flex-col items-center p-12 text-center group hover:border-[var(--accent)] transition-all duration-500"
            >
              <div className="mb-6 rounded-2xl bg-[var(--accent)]/5 p-5 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
            </motion.div>
          ))}
        </section>

        {/* CTA Banner Area */}
        <section className="px-4 md:px-6">
          <div className="glass-card relative overflow-hidden p-12 md:p-24 text-center rounded-[3rem]">
            <div className="absolute inset-0 blueprint-grid opacity-5" />
            <h2 className="relative z-10 mb-8 text-4xl font-black md:text-5xl">{t.hero.title}</h2>
            <Link to="/contact" className="relative z-10 inline-block">
              <Button className="h-16 px-12 text-lg uppercase tracking-widest">{t.contact_page.form_btn}</Button>
            </Link>
          </div>
        </section>
      </div>
    </BlueprintTransition>
  );
};

export default Home;
