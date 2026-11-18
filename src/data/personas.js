// Defines the saved student profiles and the home-page recommendations shown for each one.
export const PERSONAS = [
  { id: "incoming", label: "Incoming college student", levels: ["Incoming College"], tasks: ["matcher", "programs", "exam"], order: ["programs", "parents"],
    blurb: "Check which scholarships match you, then compare schools for your degree." },
  { id: "current", label: "Current college student", levels: ["Current College"], tasks: ["scholarships", "folder", "matcher"], order: ["parents", "programs"],
    blurb: "These scholarships accept students already enrolled. Track each one in your folder." },
];
export const TASKS = {
  exam: { title: "Practice for the entrance exam", text: "Review math, English, science and reasoning topics and mark what you finished.", to: "/exam", icon: "pencil" },
  matcher: { title: "Check which scholarships you may qualify for", text: "Answer five short questions and see likely fits.", to: "/matcher", icon: "list" },
  programs: { title: "Compare programs near you", text: "See which public and private schools offer your degree, by region.", to: "/programs", icon: "compass" },
  scholarships: { title: "Browse open scholarships", text: "Filter by provider, level, place and deadline status.", to: "/scholarships", icon: "search" },
  folder: { title: "Update your folder", text: "Tick off documents and set your own deadlines.", to: "/folder", icon: "folder" },
  share: { title: "Build a shortlist to share", text: "Save scholarships together, then copy a summary for the family chat.", to: "/scholarships", icon: "users" },
};
