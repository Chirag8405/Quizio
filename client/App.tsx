import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { resetProgress, undoLastSelection } from "@/lib/storage";

const queryClient = new QueryClient();

function Header() {
  const navigate = useNavigate();
  return (
    <header className="h-20 sticky top-0 z-50 bg-transparent">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 bg-transparent">
        <Link to="/" className="group inline-flex items-center gap-3 transition-all hover:scale-105">
          <div className="relative">
            <span className="inline-block size-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-lg" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-200 transition-colors">
            Quizio
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const undone = undoLastSelection();
              if (undone) {
                window.dispatchEvent(new Event("quiz-progress-changed"));
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-white/30 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={() => {
              resetProgress();
              window.dispatchEvent(new Event("quiz-progress-changed"));
              navigate("/");
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:from-blue-600 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start Over
          </button>
        </div>
      </div>
    </header>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: 'url(/background.jpg)'}}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        <div className="relative z-10">
          <BrowserRouter>
            <Header />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
