import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useFolder } from "../context/FolderContext.jsx";
import { useLocalStorage } from "../lib/storage.js";
import DetailsModal from "./DetailsModal.jsx";
import Icon from "./Icon.jsx";
import Logo from "./Logo.jsx";

const LINKS = [["/", "Home"], ["/scholarships", "Scholarships"], ["/matcher", "Matcher"], ["/folder", "My folder"], ["/programs", "Programs"], ["/exam", "Exam prep"], ["/help", "Help"]];
const DARK_QUERY = "(prefers-color-scheme: dark)";

// Wraps the app layout, nav, theme controls, and shared modal.
export default function Layout() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  // null means "follow the device setting" until the user picks light or dark.
  const [theme, setTheme] = useLocalStorage("iskolarph_theme", null);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(DARK_QUERY).matches);
  const { saved } = useFolder();
  const { pathname } = useLocation();
  const dark = theme ? theme === "dark" : systemDark;

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const tab = LINKS.find(([to]) => to === pathname)?.[1] || "Home";
    document.title = `IskolarPH: ${tab}`;
  }, [pathname]);
  useEffect(() => {
    const mq = window.matchMedia(DARK_QUERY);
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-paper focus:px-4 focus:py-2">Skip to content</a>
      <header className="border-b border-dashed border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <Link to="/" aria-label="IskolarPH home"><Logo className="text-2xl" /></Link>
          <div className="order-2 flex items-center gap-2 md:order-3">
            <button onClick={() => setTheme(dark ? "light" : "dark")} aria-pressed={dark} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-blush bg-paper hover:bg-peach">
              <Icon name={dark ? "sun" : "moon"} />
            </button>
            <button className="btn-ghost md:hidden" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
              <Icon name={open ? "x" : "menu"} />Menu
            </button>
          </div>
          <nav id="main-nav" aria-label="Main" className={`${open ? "flex" : "hidden"} order-3 w-full flex-col gap-1 md:order-2 md:flex md:w-auto md:flex-row`}>
            {LINKS.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}
                className={({ isActive }) => `inline-flex min-h-11 items-center rounded-full px-3.5 font-bold ${isActive ? "bg-blush" : "hover:bg-peach"}`}>
                {label}
                {to === "/folder" && saved.length > 0 && <span className="ml-1.5 rounded-full bg-paper px-2 text-sm">{saved.length}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main"><Outlet /></main>
      <footer className="mt-16 flex flex-col items-center gap-3 border-t border-dashed border-line px-4 py-8 text-center text-sm text-ink-soft">
        <Link to="/" aria-label="IskolarPH home" className="text-ink"><Logo className="text-xl" /></Link>
        IskolarPH lists scholarships for reference. Deadlines and requirements change, so confirm them with the official provider before you apply.
      </footer>
      <DetailsModal />
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
          className="fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-blush text-ink shadow-lg hover:bg-blush-deep">
          <Icon name="arrowUp" className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
