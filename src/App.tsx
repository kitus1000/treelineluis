import { useState, type ReactNode } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { LogoEmblem } from './components/LogoEmblem';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

const Layout = ({ children }: { children: ReactNode }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.gallery, path: '/gallery' },
    { name: t.nav.reviews, path: '/reviews' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[var(--nav-bg)] backdrop-blur-xl transition-colors duration-700">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative h-24 w-24 rounded-3xl bg-white/5 p-4 border border-white/10 group-hover:border-[var(--company-gold)] transition-all duration-500 shadow-xl">
            <LogoEmblem className="h-full w-full" />
            <div className="absolute inset-0 bg-[var(--company-gold)]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter leading-none text-[var(--company-brown)]">
              TREELINE
            </span>
            <span className="text-sm font-bold tracking-[0.3em] text-[var(--company-gold)] uppercase">
              Masonry & Construction
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link text-sm font-bold uppercase tracking-widest ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/10 text-[var(--text-color)] transition-all hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/30 group"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500 group-hover:rotate-90 transition-transform duration-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-900 group-hover:-rotate-12 transition-transform duration-500" />
              )}
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="hidden h-12 items-center gap-3 rounded-2xl border border-[var(--accent)]/10 bg-[var(--accent)]/5 px-6 text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/30 lg:flex"
            >
              <Globe className="h-4 w-4 text-[var(--accent)]" />
              {language === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
            </button>
            
            <button 
              className="lg:hidden h-12 w-12 flex items-center justify-center rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 left-0 w-full border-b border-[var(--card-border)] bg-[var(--nav-bg)] backdrop-blur-2xl lg:hidden shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-2 p-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-2xl font-black uppercase tracking-tighter py-2 block ${
                        location.pathname === item.path ? 'text-[var(--accent)]' : 'opacity-60'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-8 pt-6 border-t border-[var(--line-color)]">
                  <button
                    onClick={() => {
                      setLanguage(language === 'en' ? 'es' : 'en');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-sm font-black text-[var(--accent)] uppercase tracking-widest"
                  >
                    <Globe className="h-5 w-5" />
                    {language === 'en' ? 'Switch to Español' : 'Cambiar a English'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="mx-auto max-w-7xl pt-32 px-4 md:px-6 relative z-10">
        {children}
      </main>

      <footer className="mt-32 border-t border-[var(--card-border)] bg-[var(--nav-bg)] py-24 backdrop-blur-xl relative overflow-hidden transition-colors duration-700">
        <div className="blueprint-grid absolute inset-0 opacity-[0.03]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4 mb-24">
             <div className="lg:col-span-2 space-y-10 text-center md:text-left">
                <LogoEmblem className="h-48 w-48 mx-auto md:mx-0" />
                 <p className="max-w-md text-lg opacity-60 leading-relaxed font-medium transition-colors">
                    Providing premium construction services with a focus on structural excellence and aesthetic precision. 
                    Serving Vail, CO and the surrounding mountain regions.
                 </p>
             </div>
             <div>
                <p className="font-black text-xs uppercase tracking-[0.3em] opacity-40 mb-10">Quick Links</p>
                <ul className="space-y-6">
                   {navItems.map(item => (
                     <li key={item.path}>
                       <Link to={item.path} className="text-lg font-bold opacity-60 hover:text-[var(--accent)] hover:opacity-100 transition-all">
                        {item.name}
                       </Link>
                     </li>
                   ))}
                </ul>
             </div>
             <div>
                <p className="font-black text-xs uppercase tracking-[0.3em] opacity-40 mb-10">Follow Us</p>
                <ul className="space-y-6">
                   {['Instagram', 'Facebook', 'LinkedIn'].map(social => (
                     <li key={social}>
                       <a href="#" className="text-lg font-bold opacity-60 hover:text-[var(--accent)] hover:opacity-100 transition-all flex items-center gap-2 group">
                         <span className="w-0 group-hover:w-4 h-[1px] bg-[var(--accent)] transition-all duration-300" />
                         {social}
                       </a>
                     </li>
                   ))}
                </ul>
             </div>
          </div>
          
          <div className="flex flex-col items-center justify-between gap-8 border-t border-[var(--line-color)] pt-12 md:flex-row">
            <p className="text-sm font-bold opacity-40 uppercase tracking-widest">
              © 2026 Treeline Masonry & Construction LLC — All Rights Reserved.
            </p>
            <div className="flex gap-12 font-mono text-[10px] font-bold tracking-[0.3em] bg-white/5 px-6 py-3 rounded-full border border-white/10 shadow-inner">
               {[
                 { label: 'REV', value: '2026_MAR_20' },
                 { label: 'SCALE', value: '1_100' }
               ].map((spec, i) => (
                 <motion.div 
                   key={spec.label}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1 + (i * 0.2) }}
                   className="flex items-center gap-4 group cursor-default"
                 >
                    <span className="text-[var(--accent)] bloom brightness-150 drop-shadow-[0_0_8px_var(--accent)] font-black">
                      {spec.label}
                    </span>
                    <div className="h-[1px] w-4 bg-white/20" />
                    <motion.span
                      className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all duration-300"
                    >
                      {spec.value}
                    </motion.span>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
