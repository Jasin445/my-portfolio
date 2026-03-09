import { lazy, Suspense } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PortfolioProjects from "./pages/portfolio-projects";
import HomeLanding from "./pages/home-landing";
import ScrollProgress from "./components/ui/ScrollProgress";
const ContactConnect = lazy(() => import("./pages/contact-connect"));
const TechnicalBlog = lazy(() => import("./pages/technical-blog"));
const AboutProfessional = lazy(() => import("./pages/about-professional"));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <ScrollProgress />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<HomeLanding />} />
          <Route path="/projects" element={<PortfolioProjects />} />
          {/* <Route path="/home-landing" element={<HomeLanding />} /> */}
          <Route
            path="/technical-blog"
            element={
              <Suspense fallback={null}>
                <TechnicalBlog />
              </Suspense>
            }
          />
          <Route
            path="/contact-connect"
            element={
              <Suspense fallback={null}>
                <ContactConnect />
              </Suspense>
            }
          />
          <Route
            path="/about-professional"
            element={
              <Suspense fallback={null}>
                <AboutProfessional />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
