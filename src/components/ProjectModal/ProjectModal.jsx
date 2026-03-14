import React, { useState, useEffect } from 'react';
import { FiX, FiGithub, FiExternalLink, FiLock } from 'react-icons/fi';

const ProjectModal = ({ isOpen, onClose, project }) => {
  // State untuk mengontrol animasi penutupan
  const [isClosing, setIsClosing] = useState(false);

  // Fungsi untuk menangani penutupan dengan animasi
  const handleClose = () => {
    setIsClosing(true);
    // Tunggu animasi selesai (300ms) sebelum memanggil onClose dari props
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset state untuk pembukaan berikutnya
    }, 300);
  };

  // Mencegah scroll di background saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    // Overlay
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
        className={`bg-zinc-900 border border-violet-500/50 rounded-2xl shadow-2xl shadow-violet-500/20 w-full max-w-lg transform transition-transform duration-300 ${isClosing ? 'animate-out' : 'animate-in'}`}
      >
        {/* --- GAMBAR PROYEK --- */}
        {/* --- GAMBAR PROYEK --- */}
<div className="w-full bg-zinc-900 rounded-t-2xl flex items-center justify-center p-3">
  <img 
    src={project.image} 
    alt={project.title}
    className="w-full h-auto max-h-[320px] object-contain rounded-xl"
  />
</div>

        <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <button
                    onClick={handleClose}
                    className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700 -mt-2 -mr-2"
                >
                    <FiX size={24} />
                </button>
            </div>

            {/* --- DESKRIPSI LENGKAP --- */}
            <p className="text-zinc-300 text-base leading-relaxed">
                {project.fullDescription}
            </p>

            <div className="mt-4 flex flex-col gap-3">
  {project.repoStatus ? (
    <button
      type="button"
      disabled
      className="inline-flex items-center justify-center gap-2 font-semibold bg-violet-600/60 p-3 px-5 rounded-full w-full border border-violet-400/20 text-white/90 cursor-not-allowed opacity-90"
    >
      <FiGithub />
      <span>Source Code</span>

      <span className="ml-2 inline-flex items-center gap-1 text-xs bg-black/25 text-white px-2.5 py-1 rounded-full border border-white/15">
        <FiLock size={12} />
        Private Repo
      </span>
    </button>
  ) : (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 font-semibold bg-violet-600 p-3 px-5 rounded-full w-full cursor-pointer border border-transparent hover:bg-violet-700 transition-colors"
    >
      <FiGithub />
      <span>Source Code</span>
    </a>
  )}

  {project.demoUrl && (
    <a
      href={project.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 font-semibold bg-violet-600 p-3 px-5 rounded-full w-full cursor-pointer border border-transparent hover:bg-violet-700 transition-colors"
    >
      <FiExternalLink />
      <span>Visit Website</span>
    </a>
  )}
</div>
        </div>
      </div>
       {/* CSS untuk animasi */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
