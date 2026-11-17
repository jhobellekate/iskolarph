import { HashRouter, Route, Routes } from "react-router-dom";
import { FolderProvider } from "./context/FolderContext.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Scholarships from "./pages/Scholarships.jsx";
import Programs from "./pages/Programs.jsx";
import ExamPrep from "./pages/ExamPrep.jsx";
import Matcher from "./pages/Matcher.jsx";
import Folder from "./pages/Folder.jsx";
import Help from "./pages/Help.jsx";

// Renders the app shell and route tree.
export default function App() {
  return (
    <FolderProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="scholarships" element={<Scholarships />} />
            <Route path="programs" element={<Programs />} />
            <Route path="exam" element={<ExamPrep />} />
            <Route path="matcher" element={<Matcher />} />
            <Route path="folder" element={<Folder />} />
            <Route path="help" element={<Help />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </FolderProvider>
  );
}
