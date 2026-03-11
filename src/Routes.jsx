import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PortfolioProjects from "./pages/portfolio-projects";
import HomeLanding from "./pages/home-landing";
import ScrollProgress from "./components/ui/ScrollProgress";
import ContactConnect from"./pages/contact-connect";
import TechnicalBlog from "./pages/technical-blog";
import AboutProfessional from "./pages/about-professional";
import ScrollToHash from "./components/ScrollToView";

const Routes = () => {
  return (
      <ErrorBoundary>
        <ScrollToTop />
        <ScrollToHash />
        <ScrollProgress />
        <RouterRoutes>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/projects" element={<PortfolioProjects />} />
          <Route
            path="/technical-blog"
            element={
                <TechnicalBlog />
            }
          />
          <Route
            path="/contact-connect"
            element={
                <ContactConnect />
            }
          />
          <Route
            path="/about-professional"
            element={
                <AboutProfessional />
            }
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
  );
};

export default Routes;
