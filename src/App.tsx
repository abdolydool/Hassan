import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Crown, Sparkles, Heart, Star, Shield, Zap, Award, ThumbsUp, Flame, Rocket, CheckCircle2, MessageSquare, Quote, MoveUp } from 'lucide-react';

// Pre-defined Featured Categories
const featuredCategories = [
  {
    id: "professionalism",
    title: "Professionalism",
    reasons: [
      { id: 'p1', text: "Always delivers scalable, production-ready solutions before the deadline." },
      { id: 'p2', text: "Mentors juniors with infinite patience and clarity." },
      { id: 'p3', text: "Can single-handedly architect a system that saves millions." }
    ]
  },
  {
    id: "kindness",
    title: "Kindness",
    reasons: [
      { id: 'k1', text: "Remembers everyone's birthday and favorite coffee order." },
      { id: 'k2', text: "Will stay up late to help a friend fix a bug." },
      { id: 'k3', text: "Creates an inclusive environment wherever he goes." }
    ]
  },
  {
    id: "skill",
    title: "Skill",
    reasons: [
      { id: 's1', text: "Writes code that reads like poetry." },
      { id: 's2', text: "Can debug deeply nested race conditions in his sleep." },
      { id: 's3', text: "Mastered full-stack development. Every single stack." }
    ]
  }
];

const initialTestimonials = [
  { id: 1, author: "Ahmad R.", content: "Hassan Bhai didn't just review my PR; he reviewed my approach to life. 10/10." },
  { id: 2, author: "Sarah K.", content: "I once saw him resolve a merge conflict simply by looking at the screen." },
  { id: 3, author: "Omar B.", content: "The epitome of excellence. The 1,000,000 number is honestly an understatement." }
];

// Procedural reason generator
const prefixes = ["Unmatched", "Infinite", "Spectacular", "Legendary", "God-like", "Supreme", "Flawless", "Astounding", "Mind-bending", "Incredible", "Exceptional", "Unbelievable", "Immaculate", "Transcendent", "Elite"];
const nouns = ["swag", "coding skills", "wisdom", "charisma", "aura", "debugging speed", "friendship", "leadership", "patience", "generosity", "vision", "brilliance", "taste", "intellect", "loyalty"];
const actions = ["saving the day", "writing flawless code", "helping others", "being a true bro", "solving impossible problems", "inspiring millions", "never giving up", "staying humble", "mastering the universe", "radiating positive energy", "dropping knowledge", "carrying the team"];
const iconBank = [Sparkles, Heart, Star, Shield, Zap, Award, ThumbsUp, Flame, Rocket, CheckCircle2];

function getReason(id: number): string {
  if (id === 1) return "He literally radiates pure success and positive vibes everywhere he goes.";
  if (id === 2) return "His code compiles on the first try. Every. Single. Time.";
  if (id === 3) return "He is the absolute definition of a real one.";
  if (id === 69) return "Extraordinary humor and unmatched comedic timing.";
  if (id === 404) return "Cannot find a single flaw in his character.";
  if (id === 999999) return "Almost at a million, but words still can't describe his greatness.";
  if (id === 1000000) return "Because he is Hassan Bhai. There is no other reason needed.";

  const s1 = (id * 13) % prefixes.length;
  const s2 = (id * 97) % nouns.length;
  const s3 = (id * 103) % actions.length;

  return `${prefixes[s1]} ${nouns[s2]} when it comes to ${actions[s3]}.`;
}

// Number ticker hook
function useAnimatedNumber(target: number, duration = 3000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const update = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
}

export default function App() {
  const count = useAnimatedNumber(1000000, 3500);
  const [displayedCount, setDisplayedCount] = useState(24);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const [upvotes, setUpvotes] = useState<Record<string | number, number>>({});
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [newAuthor, setNewAuthor] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleUpvote = (id: string | number) => {
    setUpvotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;
    setTestimonials(prev => [
      { id: Date.now(), author: newAuthor, content: newContent },
      ...prev
    ]);
    setNewAuthor("");
    setNewContent("");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < 1000000) {
          setDisplayedCount((prev) => Math.min(prev + 12, 1000000));
        }
      },
      { threshold: 0.1, rootMargin: "400px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [displayedCount]);

  const reasons = Array.from({ length: displayedCount }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-8 flex flex-col font-sans overflow-x-hidden selection:bg-orange-500/30">
      <header className="flex justify-between items-end border-b border-white/20 pb-4 mb-8">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.3em] text-white/50 uppercase font-semibold">Dossier_Archive</span>
          <span className="text-xs font-mono">STATUS: UNRIVALED_LEADERSHIP</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono uppercase">Hassan Bhai // The One and Only</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="col-span-1 md:col-span-8 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-fit"
          >
            <h1 className="text-[80px] md:text-[140px] leading-[0.85] font-black tracking-tighter uppercase italic">
              Hassan<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Bhai</span>
            </h1>
            <div className="absolute -bottom-4 left-1 bg-orange-500 text-black px-4 py-1 text-sm font-bold skew-x-[-12deg]">
              1,000,000 REASONS OF EXCELLENCE
            </div>
          </motion.div>
        </div>

        {/* Status Panel (adapted from heat map) */}
        <div className="col-span-1 md:col-span-4 border-l-0 md:border-l border-white/20 md:pl-8 flex flex-col pt-8 md:pt-0">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">System Metrics</span>
          </div>
          
          <div className="flex flex-col gap-2 mb-8 mt-auto">
            <div className="flex justify-between text-xs font-mono border-b border-white/10 pb-1">
              <span>EXCELLENCE_COUNT</span>
              <span className="text-orange-500 font-bold">{count.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-mono border-b border-white/10 pb-1">
              <span>CRITICAL_THINKING</span>
              <span>99.9%</span>
            </div>
            <div className="flex justify-between text-xs font-mono border-b border-white/10 pb-1">
              <span>TECHNICAL_PROWESS</span>
              <span>GOLD_STANDARD</span>
            </div>
          </div>
          
          <div className="p-4 border border-white/20 bg-white/5">
            <span className="text-[10px] block uppercase text-white/40 mb-2">Latest Achievement</span>
            <p className="text-sm font-medium leading-snug underline underline-offset-4 decoration-orange-500">Successfully optimized the workflow of everyone.</p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-24 mt-8">
        <div className="flex items-center gap-2 mb-8 border-b border-white/20 pb-4">
          <Star className="w-4 h-4 text-orange-500" />
          <h2 className="text-sm font-mono uppercase tracking-widest">Featured_Excellence_Vectors</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCategories.map(category => (
            <div key={category.id} className="flex flex-col">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-4 bg-white/5 inline-block py-2 px-3 border border-white/10 w-fit">
                [ {category.title} ]
              </h3>
              <div className="flex flex-col gap-4">
                {category.reasons.map((reason, idx) => (
                  <div key={reason.id} className="p-5 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors group flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-3 border-b border-white/10 pb-2">
                       <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">
                        {category.id.substring(0,3).toUpperCase()}_{idx + 1}
                      </span>
                      <button 
                        onClick={() => handleUpvote(reason.id)}
                        className="flex items-center gap-1.5 text-xs font-mono text-orange-500 hover:text-white transition-colors cursor-pointer"
                      >
                        <MoveUp className="w-3 h-3" />
                        <span>{(upvotes[reason.id] || 0) + 142}</span>
                      </button>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed font-medium">
                      {reason.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/20 pt-16">
        <div className="lg:col-span-4 lg:sticky lg:top-8 self-start">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-mono uppercase tracking-widest">Peer_Testimonials</h2>
          </div>
          <p className="text-sm text-white/50 mb-8 max-w-sm">
            Records from those who have witnessed the excellence firsthand. Contribute a testimony to the global archive.
          </p>
          
          <form onSubmit={handleAddTestimonial} className="flex flex-col gap-4 p-6 border border-white/20 bg-[#0A0A0A]">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono uppercase text-white/60">Observer ID / Name</label>
              <input 
                value={newAuthor}
                onChange={e => setNewAuthor(e.target.value)}
                className="bg-transparent border border-white/20 p-2 text-sm text-white focus:outline-none focus:border-orange-500 font-mono transition-colors" 
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono uppercase text-white/60">Testimony</label>
              <textarea 
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                className="bg-transparent border border-white/20 p-2 text-sm text-white focus:outline-none focus:border-orange-500 font-sans resize-none h-24 transition-colors"
                placeholder="Describe your encounter..."
                required
              />
            </div>
            <button type="submit" className="mt-2 bg-white/10 hover:bg-orange-500 hover:text-black transition-colors border border-white/20 text-xs font-mono uppercase py-3 font-bold tracking-widest text-center cursor-pointer">
              Submit Record
            </button>
          </form>
        </div>
        
        <div className="lg:col-span-8 flex flex-col gap-4">
          {testimonials.map(t => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border border-white/20 bg-white/5 flex gap-4 hover:bg-white/10 transition-colors"
            >
              <Quote className="w-8 h-8 text-white/10 flex-shrink-0" />
              <div>
                <p className="text-base text-white/90 leading-relaxed italic mb-3">"{t.content}"</p>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-500">— {t.author}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Infinite Archive Grid Section */}
      <section className="flex-1 border-t border-white/20 pt-16">
        <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-sm font-mono uppercase tracking-widest text-white/80">The_Endless_Archive</h2>
          </div>
          <span className="text-[10px] font-mono text-white/40">SCROLL_TO_LOAD</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((id) => {
            const Icon = iconBank[(id * 7) % iconBank.length];
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="p-6 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors group flex flex-col justify-between min-h-[160px]"
              >
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                  <span className="text-white/40 font-mono font-bold text-[10px] uppercase tracking-widest">
                    RECORD_{id.toString().padStart(6, '0')}
                  </span>
                  <button 
                    onClick={() => handleUpvote(id)}
                    className="flex items-center gap-1.5 text-xs font-mono text-orange-500 opacity-50 group-hover:opacity-100 hover:text-white transition-all cursor-pointer"
                  >
                    <MoveUp className="w-3 h-3" />
                    <span>{(upvotes[id] || 0) + (id % 15)}</span>
                  </button>
                </div>
                <p className="text-sm text-white/80 leading-relaxed font-medium">
                  {getReason(id)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Loading Trigger */}
        {displayedCount < 1000000 && (
          <div ref={loaderRef} className="py-24 flex justify-center items-center">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
        
        {displayedCount >= 1000000 && (
          <div className="py-24 border-t border-white/20 mt-16 text-center">
            <div className="text-[100px] font-black leading-none text-white/5 select-none mb-4">
              BEST
            </div>
            <p className="text-xs text-white/40 font-mono uppercase tracking-widest">End of Available Records</p>
          </div>
        )}
      </section>
      
      <footer className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.4em] uppercase text-white/30 gap-4">
        <span>Verified by History</span>
        <div className="flex gap-4 md:gap-8 flex-wrap justify-center text-center">
          <span>Commit History: Clean</span>
          <span className="hidden md:inline">Future: Bright</span>
          <span>Legacy: Eternal</span>
        </div>
        <span>© 2026 Ultimate Dossier</span>
      </footer>
    </main>
  );
}
