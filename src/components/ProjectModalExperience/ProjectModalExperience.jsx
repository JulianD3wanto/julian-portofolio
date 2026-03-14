import React, { useState, useEffect } from 'react';
import { FiX, FiInbox } from 'react-icons/fi';

const ProjectModalExperience = ({ isOpen, onClose, experience }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
<div
  onClick={handleClose}
  className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
>
  <div
    onClick={(e) => e.stopPropagation()}
    className={`bg-zinc-900 border border-violet-500/50 rounded-2xl shadow-2xl shadow-violet-500/20 w-full max-w-lg h-[80vh] flex flex-col overflow-hidden transform transition-transform duration-300 ${isClosing ? 'animate-out' : 'animate-in'}`}
  >
    {/* Scrollable content */}
    <div className="overflow-y-auto p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-white">{experience.title}</h2>
        <button
          onClick={handleClose}
          className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Image */}
      <img 
        src={experience.image} 
        alt={experience.title} 
        className="w-full h-auto max-h-[320px] object-contain rounded-xl mb-4"
      />

      {/* Full Description */}
      <p className="text-zinc-300 text-base leading-relaxed">
        {experience.fullDescription}
      </p>

      {/* Button */}
      <a
        href={experience.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 font-semibold bg-violet-600 p-3 px-5 rounded-full w-full cursor-pointer border border-transparent hover:bg-violet-700 transition-colors"
      >
        <FiInbox />
        <span>Selengkapnya</span>
      </a>
    </div>
  </div>

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

export default ProjectModalExperience;