import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, getCategoryById } from "@/data/categories";
import { isCategoryUsed, markCategoryUsed, undoLastSelection } from "@/lib/storage";

export default function Index() {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const bump = () => setVersion((v) => v + 1);
    window.addEventListener("storage", bump);
    window.addEventListener("quiz-progress-changed", bump as EventListener);
    return () => {
      window.removeEventListener("storage", bump);
      window.removeEventListener("quiz-progress-changed", bump as EventListener);
    };
  }, []);

  const remaining = useMemo(
    () => categories.filter((c) => !isCategoryUsed(c.id)),
    [version],
  );

  const visible = remaining.slice(0, 4);

  const handleSelect = (id: string) => {
    markCategoryUsed(id);
    window.dispatchEvent(new Event("quiz-progress-changed"));
    
    const category = getCategoryById(id);
    if (!category) {
      console.error(`Category with id ${id} not found`);
      undoLastSelection();
      window.dispatchEvent(new Event("quiz-progress-changed"));
      return;
    }
    
    // Show a brief visual feedback
    console.log(`Opening ${category.name} presentation...`);
    
    // Detect operating system
    const isWindows = navigator.platform.toLowerCase().includes('win');
    const isLinux = navigator.platform.toLowerCase().includes('linux');
    
    if (isLinux) {
      // On Linux, try multiple approaches for better compatibility
      console.log('Linux detected - trying multiple opening methods');
      
      // Method 1: Try direct open
      const opened = window.open(category.pptPath, '_blank', 'noopener,noreferrer');
      
      // Method 2: If that doesn't work, try with different approach
      if (!opened) {
        // Create a clickable link as fallback
        const link = document.createElement('a');
        link.href = category.pptPath;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      // On Windows (and other systems), use standard approach
      console.log('Windows/Other OS detected - using standard method');
      window.open(category.pptPath, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Choose Your Topic
          </h1>
        </header>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((cat) => (
              <motion.button
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => handleSelect(cat.id)}
                className={`relative overflow-hidden rounded-xl aspect-square p-4 md:p-6 text-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group bg-gradient-to-br ${cat.gradientFrom} ${cat.gradientTo} hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-out`}
                style={{
                  boxShadow: '0 10px 25px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
                  filter: 'drop-shadow(0 20px 40px rgba(255, 255, 255, 0.15))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(255, 255, 255, 0.25), 0 8px 16px -4px rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.filter = 'drop-shadow(0 35px 60px rgba(255, 255, 255, 0.2))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.filter = 'drop-shadow(0 20px 40px rgba(255, 255, 255, 0.15))';
                }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 text-white">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mb-1">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/40" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold drop-shadow-sm leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs md:text-sm text-white/80">Click to open</p>
                </div>
                <div className="absolute -right-3 -bottom-3 size-16 md:size-20 rounded-full bg-white/10 blur-sm transition-all duration-300 group-hover:scale-125" />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {remaining.length === 0 && (
          <div className="mt-10 text-center text-muted-foreground">
            That's all the topics for now! Use "Start Over" to browse again.
          </div>
        )}
      </div>
    </div>
  );
}
