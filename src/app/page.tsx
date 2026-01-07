"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  UploadCloud,
  FileText,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function DocuBrainHome() {
  const [status, setStatus] = useState<"idle" | "analyzing" | "complete">("idle");
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Lendo cláusulas contratuais...",
    "Verificando conformidade com a LGPD...",
    "Cruzando jurisprudência...",
    "Gerando relatório de riscos...",
  ];

  useEffect(() => {
    if (status === "analyzing") {
      setLoadingStep(0);
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= loadingMessages.length - 1) {
            clearInterval(interval);
            setTimeout(() => setStatus("complete"), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleStartAnalysis = () => {
    setStatus("analyzing");
  };

  const handleReset = () => {
    setStatus("idle");
    setLoadingStep(0);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-950 text-white">
              <Scale size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              DocuBrain
            </span>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#" className="hover:text-blue-900">Funcionalidades</a>
            <a href="#" className="hover:text-blue-900">Preços</a>
            <a href="#" className="hover:text-blue-900">Enterprise</a>
          </nav>
          <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200">
            Entrar
          </button>
        </div>
      </header>

      <main className="container mx-auto flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-12 md:px-6">
        {/* Hero Text */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Descubra riscos jurídicos <br className="hidden md:block" />
            <span className="text-blue-700">em segundos</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Nossa IA analisa contratos, identifica cláusulas abusivas e garante a
            segurança jurídica do seu negócio com precisão de especialista.
          </p>
        </div>

        {/* Main Interface Grid */}
        <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2">
          {/* Left Column: Upload */}
          <div className="flex flex-col gap-6">
            <div className="group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white transition-all hover:border-blue-500 hover:bg-blue-50/50">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-transform">
                <UploadCloud size={32} />
              </div>
              <p className="mt-4 text-lg font-medium text-slate-700">
                Arraste seu contrato aqui
              </p>
              <p className="mt-1 text-sm text-slate-500">
                PDF ou DOCX até 10MB
              </p>
              <input type="file" className="absolute inset-0 cursor-pointer opacity-0" />
            </div>

            <button
              onClick={handleStartAnalysis}
              disabled={status === "analyzing"}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-950 text-lg font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-900 hover:shadow-blue-900/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "analyzing" ? (
                <>
                  <Loader2 className="animate-spin" /> Analisando...
                </>
              ) : (
                <>
                  Iniciar Análise Jurídica <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>

          {/* Right Column: Results/Status */}
          <div className="relative flex min-h-[400px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 overflow-hidden">
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 rounded-full bg-slate-100 p-6">
                    <FileText size={48} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Aguardando documento
                  </h3>
                  <p className="mt-2 max-w-xs text-slate-500">
                    Faça o upload ao lado para visualizar a análise de riscos detalhada.
                  </p>
                </motion.div>
              )}

              {status === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-1 flex-col items-center justify-center gap-8"
                >
                  <div className="relative h-32 w-32">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <motion.path
                        className="text-blue-600"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: (loadingStep + 1) / loadingMessages.length }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldAlert className="h-10 w-10 animate-pulse text-blue-600" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <motion.p
                      key={loadingStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-lg font-medium text-slate-700"
                    >
                      {loadingMessages[loadingStep]}
                    </motion.p>
                  </div>
                </motion.div>
              )}

              {status === "complete" && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-1 flex-col"
                >
                  <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Relatório de Risco</h3>
                      <p className="text-sm text-slate-500">Contrato_Prestacao_Servicos.pdf</p>
                    </div>
                    <button onClick={handleReset} className="text-slate-400 hover:text-blue-600">
                      <RefreshCw size={20} />
                    </button>
                  </div>

                  <div className="mb-8 flex items-center gap-6 rounded-xl bg-amber-50 p-4 border border-amber-100">
                    <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-white text-2xl font-bold text-amber-600 shadow-sm ring-4 ring-amber-100">
                      72
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-900">Risco Moderado</h4>
                      <p className="text-sm text-amber-700">
                        O documento apresenta pontos de atenção que requerem revisão jurídica.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Alertas Identificados
                    </h4>
                    
                    {/* Alert 1 */}
                    <div className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50/50 p-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">Multa Abusiva</p>
                        <p className="text-sm text-red-700">Cláusula 8.2 estipula multa de 50% sobre o valor total.</p>
                      </div>
                    </div>

                    {/* Alert 2 */}
                    <div className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50/50 p-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Renovação Automática</p>
                        <p className="text-sm text-amber-700">Sem notificação prévia de 30 dias (Cláusula 4.1).</p>
                      </div>
                    </div>

                    {/* Alert 3 */}
                    <div className="flex items-start gap-3 rounded-lg border border-emerald-100 bg-emerald-50/50 p-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                      <div>
                        <p className="font-medium text-emerald-900">Adequação LGPD</p>
                        <p className="text-sm text-emerald-700">Cláusulas de proteção de dados estão conformes.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
