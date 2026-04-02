import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BlueprintTransition } from '../components/BlueprintTransition';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'masonry', 'remodeling'];

  const projects = [
    { title: "Stone Masterpiece Fireplace", category: "masonry", img: "/projects/terminado5.jpg" },
    { title: "Fireplace Technical Build", category: "masonry", img: "/projects/temrinado2.jpg" },
    { title: "Finished Masonry Detail", category: "masonry", img: "/projects/terminado1.jpg" },
    { title: "Luxury Fireplace Finish", category: "masonry", img: "/projects/termiando3.jpg" },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <BlueprintTransition>
      <div className="px-4 py-24 md:px-6 relative z-10">
        <header className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-black md:text-7xl tracking-tight leading-tight">
            {t.gallery_page.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-60 font-medium tracking-wide">
            {t.gallery_page.subtitle}
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-8 py-3 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-[var(--accent)] text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' 
                    : 'bg-white/5 opacity-50 hover:opacity-100 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <motion.div 
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] overflow-hidden rounded-[3rem] border border-[var(--card-border)] bg-[var(--bg-color)] shadow-2xl transition-all hover:border-[var(--accent)]/50"
              >
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/20 to-transparent" />
                <div className="absolute bottom-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-sm font-black uppercase tracking-[0.3em] text-[var(--accent)] bloom">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-3xl font-black tracking-tight">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </BlueprintTransition>
  );
};

export default Gallery;
