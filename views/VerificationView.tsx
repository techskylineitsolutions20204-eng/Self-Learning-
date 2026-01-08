
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Award, Calendar, CheckCircle, XCircle, Search, Copy, Check, Download, ExternalLink } from 'lucide-react';
import { Certificate } from '../types';

const VerificationView: React.FC = () => {
  const { cid } = useParams<{ cid: string }>();
  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputId, setInputId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (cid) {
      verifyCertificate(cid);
    }
  }, [cid]);

  const verifyCertificate = (id: string) => {
    setLoading(true);
    // Simulate lookup in Firebase-like structure stored in local storage
    setTimeout(() => {
      const savedCerts = JSON.parse(localStorage.getItem('techskyline_certs') || '{}');
      setCert(savedCerts[id] || null);
      setLoading(false);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950">
      <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Verification Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-600/10 border border-indigo-600/20 rounded-full text-indigo-400 font-bold tracking-tight">
            <ShieldCheck size={20} /> TechSkyline Public Registry
          </div>
          <h1 className="text-4xl font-extrabold text-white">Trust & Verification Center</h1>
          <p className="text-slate-500 max-w-xl mx-auto">Verify the authenticity of AI professional credentials and university credit mappings for the TechSkyline Ecosystem.</p>
        </div>

        {/* Input Field if no CID */}
        {!cid && !cert && (
          <div className="max-w-lg mx-auto bg-slate-900/50 border border-slate-800 p-8 rounded-3xl space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Enter Certificate ID</label>
              <div className="relative">
                <input 
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl py-4 px-12 text-white outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  placeholder="TS-AI-2026-XXXXXX"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              </div>
            </div>
            <button 
              onClick={() => verifyCertificate(inputId)}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all"
            >
              Verify Credential
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing Blockchain Proofs...</p>
          </div>
        )}

        {/* Result: Verified */}
        {!loading && cert && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
               <div className="bg-slate-900 border-2 border-emerald-500/50 p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-emerald-950/20">
                  <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                     <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                        <CheckCircle size={48} />
                     </div>
                     <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Verified Credential ✅</h2>
                     
                     <div className="w-full h-px bg-slate-800"></div>
                     
                     <div className="w-full space-y-4 text-left">
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-500 font-bold uppercase">Issued To</span>
                           <span className="text-sm font-bold text-white">{cert.name}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-500 font-bold uppercase">Competency Track</span>
                           <span className="text-sm font-bold text-indigo-400">{cert.track}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-500 font-bold uppercase">Project Verified</span>
                           <span className="text-sm font-bold text-slate-300">{cert.projectTitle}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-500 font-bold uppercase">Skills Mastery</span>
                           <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                              {cert.skills.map(s => <span key={s} className="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded-md">{s}</span>)}
                           </div>
                        </div>
                        <div className="flex justify-between border-t border-slate-800 pt-4 mt-4">
                           <span className="text-xs text-slate-500 font-bold uppercase">Issue Date</span>
                           <span className="text-sm font-bold text-slate-300">{new Date(cert.issuedAt).toLocaleDateString()}</span>
                        </div>
                     </div>

                     <div className="flex gap-4 w-full">
                        <button onClick={handleCopy} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                           {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                           Share Link
                        </button>
                        <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                           <Download size={16} />
                           Download PDF
                        </button>
                     </div>
                  </div>
                  {/* Decor */}
                  <Award className="absolute -bottom-10 -right-10 w-48 h-48 text-emerald-500/5 rotate-12" />
               </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
               <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] space-y-6">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                    <ShieldCheck size={16} className="text-indigo-400" /> Security Log
                  </h3>
                  <div className="space-y-4">
                     <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500"><CheckCircle size={14} /></div>
                        <div className="flex-1">
                           <p className="text-xs text-slate-300 font-bold">SHA-256 Hash Matching</p>
                           <p className="text-[10px] text-slate-500">Record integrity confirmed via ecosystem ledger.</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500"><CheckCircle size={14} /></div>
                        <div className="flex-1">
                           <p className="text-xs text-slate-300 font-bold">Issuer Identified</p>
                           <p className="text-[10px] text-slate-500">Issued by TechSkyline Global Academy (ID: TSGA-001).</p>
                        </div>
                     </div>
                  </div>
                  <div className="pt-4 border-t border-slate-800">
                     <p className="text-[10px] text-slate-600 font-mono break-all bg-slate-950 p-2 rounded">0x71c7656ec7ab88b098defb751b7401b5f6d8976f</p>
                  </div>
               </div>

               <Link to="/" className="block p-6 bg-indigo-600/10 border border-indigo-600/20 rounded-[2rem] text-center group hover:bg-indigo-600 transition-all">
                  <p className="text-xs font-bold text-indigo-400 group-hover:text-white uppercase tracking-widest mb-1">Join the Ecosystem</p>
                  <p className="text-sm font-bold text-white">Start Your AI Mastery Journey</p>
               </Link>
            </div>
          </div>
        )}

        {/* Result: Not Found */}
        {!loading && cid && !cert && (
          <div className="max-w-md mx-auto bg-slate-900 border border-rose-500/50 p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-6">
             <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500">
                <XCircle size={32} />
             </div>
             <div className="space-y-2">
               <h2 className="text-xl font-bold text-white">Credential Invalid</h2>
               <p className="text-sm text-slate-500">The certificate ID <strong>{cid}</strong> was not found in our public registry or has been revoked.</p>
             </div>
             <Link to="/verify" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all">Try Another ID</Link>
          </div>
        )}

        {/* Footer info */}
        <div className="text-center pt-8">
          <Link to="/" className="text-slate-600 text-xs font-bold uppercase tracking-widest hover:text-indigo-400 transition-colors">TechSkyline AI Platform &copy; 2026</Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationView;
