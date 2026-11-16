import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useFolder } from "../context/FolderContext.jsx";
import DetailsModal from "./DetailsModal.jsx";
import Icon from "./Icon.jsx";

const LINKS = [["/", "Home"], ["/scholarships", "Scholarships"], ["/programs", "Programs"], ["/exam", "Exam prep"], ["/matcher", "Matcher"], ["/folder", "My folder"], ["/help", "Help"]];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { saved } = useFolder();
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
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
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold">
            <span aria-hidden="true" className="grid h-9 w-9 -rotate-6 place-items-center rounded-lg bg-butter font-hand text-2xl text-rose shadow-sm">i</span>
            IskolarPH
          </Link>
          <button className="btn-ghost md:hidden" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
            <Icon name={open ? "x" : "menu"} />Menu
          </button>
          <nav id="main-nav" aria-label="Main" className={`${open ? "flex" : "hidden"} w-full flex-col gap-1 md:flex md:w-auto md:flex-row`}>
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
      <footer className="mt-16 border-t border-dashed border-line px-4 py-8 text-center text-sm text-ink-soft">
        IskolarPH lists scholarships for reference. Deadlines and requirements change, so confirm them with the official provider before you apply.
      </footer>
      <DetailsModal />
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-blush text-ink shadow-lg hover:bg-blush-deep">
          <Icon name="arrowUp" className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
