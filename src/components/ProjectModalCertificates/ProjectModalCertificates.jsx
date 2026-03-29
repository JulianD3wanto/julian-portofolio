import React, { useState, useEffect } from 'react';
import { FiX, FiInbox } from 'react-icons/fi';

const ProjectModalCertificates = ({ isOpen, onClose, certificates }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !certificates) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-violet-500/40 bg-[#081a35] shadow-2xl shadow-violet-500/20 transform transition-transform duration-300 ${
          isClosing ? 'animate-out' : 'animate-in'
        }`}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {certificates.title}
            </h2>

            <button
              onClick={handleClose}
              className="shrink-0 text-red-500 hover:text-red-400 transition-colors"
            >
              <FiX size={28} />
            </button>
          </div>

          <div className="mb-6 rounded-xl overflow-hidden bg-white">
            <img
              src={certificates.image}
              alt={certificates.title}
              className="w-full h-auto block"
            />
          </div>

          {certificates.badges?.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {certificates.badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-2 text-white text-sm font-semibold"
                >
                  <img
                    src={badge.icon}
                    alt={badge.text}
                    className="w-8 h-8 object-contain"
                  />
                  <span>{badge.text}</span>
                </span>
              ))}
            </div>
          )}

          <h3 className="text-2xl font-bold text-white mb-4">Description</h3>

          <p className="text-zinc-200 text-base md:text-lg leading-9">
            {certificates.fullDescription}
          </p>

          <a
            href={certificates.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-5 py-4 font-semibold text-white transition-colors hover:bg-violet-700"
          >
            <FiInbox />
            <span>Detail</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.96); opacity: 0; }
        }

        .animate-in {
          animation: scaleIn 0.25s ease-out forwards;
        }

        .animate-out {
          animation: scaleOut 0.2s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModalCertificates;