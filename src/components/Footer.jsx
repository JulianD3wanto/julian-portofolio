import "remixicon/fonts/remixicon.css";
import Dock from "./Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";

const Footer = () => {
  const items = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscAccount size={18} />, label: "About Me", onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscArchive size={18} />, label: "Project", onClick: () => document.getElementById("project")?.scrollIntoView({ behavior: "smooth" }) },
  ];

 return (
  <footer className="mt-32 pb-10 relative z-10">
    <div className="relative overflow-hidden rounded-[30px] border border-emerald-400/20 bg-gradient-to-br from-[#0b0f19]/95 via-[#10131f]/95 to-[#0b0f19]/95 shadow-[0_0_35px_rgba(16,185,129,0.12)] backdrop-blur-xl px-6 py-8 md:px-10 footer-glow-animated">
      {/* glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 left-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative w-full flex flex-col md:flex-row items-center md:justify-between gap-8">
        {/* kiri */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(52,211,153,0.25)]">
            Julian Dewanto Portofolio
          </h1>
          <p className="text-zinc-400 mt-2 max-w-md">
            Built with passion, crafted with code, and designed for impactful digital experiences.
          </p>
        </div>

        {/* tengah */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/JulianD3wanto"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-12 w-12 flex items-center justify-center rounded-full border border-emerald-400/20 bg-white/[0.03] text-zinc-200 shadow-[0_0_12px_rgba(16,185,129,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:text-white hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]"
          >
            <i className="ri-github-fill ri-xl group-hover:scale-110 transition-transform duration-300"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/julian-dewanto/"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-12 w-12 flex items-center justify-center rounded-full border border-emerald-400/20 bg-white/[0.03] text-zinc-200 shadow-[0_0_12px_rgba(16,185,129,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:text-white hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]"
          >
            <i className="ri-linkedin-fill ri-xl group-hover:scale-110 transition-transform duration-300"></i>
          </a>


          <a
            href="https://www.instagram.com/julian_dewanto/"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-12 w-12 flex items-center justify-center rounded-full border border-emerald-400/20 bg-white/[0.03] text-zinc-200 shadow-[0_0_12px_rgba(16,185,129,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:text-white hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]"
          >
            <i className="ri-instagram-fill ri-xl group-hover:scale-110 transition-transform duration-300"></i>
          </a>

          <a
            href="https://www.youtube.com/@juliandewanto296"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-12 w-12 flex items-center justify-center rounded-full border border-emerald-400/20 bg-white/[0.03] text-zinc-200 shadow-[0_0_12px_rgba(16,185,129,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:text-white hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]"
          >
            <i className="ri-youtube-fill ri-xl group-hover:scale-110 transition-transform duration-300"></i>
          </a>
        </div>

        {/* kanan */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="rounded-2xl border border-emerald-400/15 bg-white/[0.03] px-3 py-2 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
            <Dock
              items={items}
              panelHeight={34}
              baseItemSize={56}
              magnification={100}
            />
          </div>

          <p className="text-sm text-zinc-500 text-center md:text-right">
            © 2026 Julian Dewanto. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);
};

export default Footer;
