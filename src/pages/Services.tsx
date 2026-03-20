import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent } from '../components/ui';
import { BlueprintTransition } from '../components/BlueprintTransition';
import { motion } from 'framer-motion';
import { Hammer, BrickWall, Home as HomeIcon, Droplet, Ruler, Paintbrush } from 'lucide-react';
import FloatingWordsOverlay from '../components/FloatingWordsOverlay';

const serviceKeywords: Record<string, string[]> = {
  masonry: ['Stone', 'Brick', 'Mortar', 'Hearth', 'Fireplace', 'Chimney', 'Retaining Wall', 'Masterpiece', 'Precision', 'Durability', 'Natural', 'Vail Luxury'],
  carpentry: ['Wood', 'Timber', 'Deck', 'Framing', 'Structure', 'Cedar', 'Alpine', 'Joinery', 'Craftsmanship', 'Elegant', 'Durable', 'Custom Framing'],
  concrete: ['Foundation', 'Slab', 'Hardscape', 'Structural', 'Reinforcement', 'Pouring', 'Footing', 'Reliable', 'Engineering', 'Core', 'Vail Build'],
  demolition: ['Clearance', 'Safety', 'Precision', 'Removal', 'Prep', 'Clean', 'Professional', 'Efficient', 'Site Prep', 'Waste Mgmt'],
  remodeling: ['Transformation', 'Design', 'Luxury', 'Renewal', 'Modern', 'Custom', 'Enhancement', 'Vision', 'Aesthetic', 'High-End'],
  contractor: ['Management', 'Coordination', 'Planning', 'Execution', 'Expertise', 'Reliability', 'Consulting', 'Full Service']
};

const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<{ key: string; title: string } | null>(null);

  const servicesList = [
    { key: 'demolition', icon: <Hammer className="h-8 w-8 text-cyan-400" /> },
    { key: 'masonry', icon: <BrickWall className="h-8 w-8 text-cyan-400" /> },
    { key: 'carpentry', icon: <HomeIcon className="h-8 w-8 text-cyan-400" /> },
    { key: 'concrete', icon: <Droplet className="h-8 w-8 text-cyan-400" /> },
    { key: 'contractor', icon: <Ruler className="h-8 w-8 text-cyan-400" /> },
    { key: 'remodeling', icon: <Paintbrush className="h-8 w-8 text-cyan-400" /> },
  ];

  return (
    <BlueprintTransition>
      <div className="px-4 py-24 md:px-6 relative z-10">
        <header className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-black md:text-7xl leading-tight tracking-tight">
            {t.services_page.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-60 font-medium tracking-wide">
            {t.services_page.subtitle}
          </p>
          <div className="mt-8 mx-auto h-1 w-24 bg-[var(--accent)] rounded-full opacity-50" />
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group h-full cursor-pointer"
              onClick={() => setSelectedService({ key: service.key, title: t.services_page[service.key].title })}
            >
              <Card className="h-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/50 transition-all duration-700 overflow-hidden relative">
                {/* Background Image Placeholder Feel */}
                <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700">
                   <img 
                     src={service.key === 'masonry' ? '/projects/terminado5.jpg' : 
                          service.key === 'carpentry' ? '/projects/terminado6.jpg' :
                          service.key === 'concrete' ? '/projects/terminado4.jpg' :
                          `https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800`}
                     className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110"
                   />
                </div>
                
                <CardContent className="flex flex-col items-start gap-8 p-12 relative z-10">
                  <div className="rounded-2xl bg-[var(--accent)]/10 p-5 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-500 shadow-lg bloom">
                    {service.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black tracking-tighter uppercase line-clamp-1">
                      {t.services_page[service.key].title}
                    </h3>
                    <p className="text-lg opacity-60 leading-relaxed font-medium line-clamp-3 group-hover:opacity-100 transition-opacity">
                      {t.services_page[service.key].desc}
                    </p>
                  </div>
                  
                  <div className="pt-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                     <span>Explore Service</span>
                     <div className="h-[1px] w-8 bg-[var(--accent)]" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <FloatingWordsOverlay 
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService?.title || ''}
          keywords={selectedService ? serviceKeywords[selectedService.key] : []}
        />
      </div>
    </BlueprintTransition>
  );
};

export default Services;
