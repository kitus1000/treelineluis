import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, Button, Input, Textarea } from '../components/ui';
import { BlueprintTransition } from '../components/BlueprintTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const Reviews = () => {
  const { t } = useLanguage();
  
  const [reviews, setReviews] = useState([
    { name: "John Smith", rating: 5, comment: "Excellent stonework on our retaining wall. Very professional and tidy.", date: "2024-02-15" },
    { name: "Maria Garcia", rating: 5, comment: "The structural concrete work was completed ahead of schedule. Highly recommend.", date: "2024-03-02" },
    { name: "David Wilson", rating: 4, comment: "Great communication throughout the framing project. Quality is top-notch.", date: "2024-01-20" },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview = {
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      
      setReviews([newReview, ...reviews]);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', rating: 5, comment: '' });
      
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <BlueprintTransition>
      <div className="px-4 py-24 md:px-6 relative z-10">
        <header className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-black md:text-7xl tracking-tight leading-tight">
            {t.reviews_page.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-60 font-medium tracking-wide">
            {t.reviews_page.subtitle}
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Review List */}
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {reviews.map((review, i) => (
                <motion.div
                  key={`${review.name}-${i}`}
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-8 border border-[var(--card-border)] hover:border-[var(--accent)]/20 transition-all duration-500">
                    <div className="mb-6 flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${star <= review.rating ? 'fill-[var(--accent)] text-[var(--accent)] bloom' : 'opacity-20'}`}
                        />
                      ))}
                    </div>
                    <p className="mb-8 text-xl italic leading-relaxed opacity-80 font-medium">"{review.comment}"</p>
                    <div className="flex items-center justify-between border-t border-[var(--line-color)] pt-6">
                      <p className="font-black text-lg tracking-tight uppercase">{review.name}</p>
                      <p className="text-sm font-bold opacity-40 uppercase tracking-widest">{review.date}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Review Form */}
          <div className="lg:sticky lg:top-32">
            <Card className="p-12 border border-[var(--accent)]/10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Star className="h-24 w-24 text-[var(--accent)]" />
               </div>
              <h3 className="mb-10 text-3xl font-black tracking-tight relative z-10">{t.reviews_page.form_title}</h3>
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">{t.reviews_page.form_name}</label>
                  <Input 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="h-14 px-6 text-lg font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">{t.reviews_page.form_rating}</label>
                  <div className="flex gap-4 px-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="transition-all hover:scale-125 focus:scale-110"
                      >
                        <Star className={`h-10 w-10 transition-colors ${formData.rating >= star ? 'fill-[var(--accent)] text-[var(--accent)] bloom' : 'opacity-20'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-black opacity-40 ml-1">{t.reviews_page.form_comment}</label>
                  <Textarea 
                    placeholder="Share your experience with us..." 
                    rows={4} 
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    required
                    className="px-6 py-4 text-lg font-medium min-h-[150px]"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 text-xl font-black uppercase tracking-widest leading-none rounded-2xl shadow-xl transition-all"
                >
                  {isSubmitting ? "Processing..." : submitted ? "Thank You!" : t.reviews_page.form_submit}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </BlueprintTransition>
  );
};

export default Reviews;
