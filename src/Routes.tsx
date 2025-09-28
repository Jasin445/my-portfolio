import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import PortfolioProjects from './pages/portfolio-projects';
import HomeLanding from './pages/home-landing';
import TechnicalBlog from './pages/technical-blog';
import AboutProfessional from './pages/about-professional';
import ContactConnect from "./pages/contact-connect";
import CarCursor from "./components/CarCursor";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <ErrorBoundary> */}
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<AboutProfessional />} />
          <Route path="/projects" element={<PortfolioProjects />} />
          <Route path="/home-landing" element={<HomeLanding />} />
          <Route path="/technical-blog" element={<TechnicalBlog />} />
          <Route path="/contact-connect" element={<ContactConnect />} />
          <Route path="/about-professional" element={<AboutProfessional />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      {/* </ErrorBoundary> */}
    </BrowserRouter>
  );
};

export default Routes;