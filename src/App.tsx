/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
      <Analytics />
    </Router>
  );
}
