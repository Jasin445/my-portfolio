import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Image from "../AppImage";

const navigationItems = [
  { label: "Home", path: "/", icon: "Home" },
  { label: "Projects", path: "/projects", icon: "Briefcase" },
  { label: "About", path: "/about-professional", icon: "User" },
  { label: "Contact", path: "/contact-connect", icon: "Mail" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = location?.pathname;
  const scrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 10;
      // Guard: only setState if value actually changed
      if (shouldScroll !== scrolledRef.current) {
        scrolledRef.current = shouldScroll;
        setScrolled(shouldScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const isActivePath = useCallback(
    (path) => pathname === path,
    [pathname]
  );

  const headerClass = useMemo(
    () =>
      `fixed top-0 left-0 right-0 py-4 z-50 transition-colors duration-normal ${
        scrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`,
    [scrolled, isMobileMenuOpen]
  );

  return (
    <>
      <header className={headerClass}>
        <nav className="flex items-center justify-between h-16 px-4 sm:px-6 4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            aria-label="Jason Dagana - Home"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 -ml-2 sm:ml-0 bg-transparent rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-fast">
              <Image src="/assets/logo.png" alt="Logo" />
            </div>
            <span className="text-[clamp(16px,6vw,22px)] sm:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors duration-fast">
              Jason Dagana
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                item={item}
                active={isActivePath(item.path)}
              />
            ))}
          </div>

          {/* Hamburger */}
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </nav>

        {/* Mobile menu */}
        <MobileMenu
          items={navigationItems}
          isOpen={isMobileMenuOpen}
          isActivePath={isActivePath}
        />
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black z-40 lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

// ── Extracted sub-components so Header re-render doesn't cascade ──

const NavLink = ({ item, active }) => (
  <Link
    to={item.path}
    className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-fast group ${
      active ? "text-primary bg-primary/5" : ""
    }`}
    aria-current={active ? "page" : undefined}
  >
    <span className="flex items-center space-x-2">
      <span
        className={`text-[16px] ${
          item.label === "Contact"
            ? "bg-primary py-2 px-5 rounded-xl text-white"
            : ""
        }`}
      >
        {item.label}
      </span>
    </span>
    {item.label !== "Contact" && (
      <div className="absolute bottom-0 hidden group-hover:block left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
    )}
  </Link>
);

const HamburgerButton = ({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-muted transition-colors duration-fast focus:outline-none"
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
  >
    <span className={`block w-5 h-0.5 bg-foreground rounded-full transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
    <span className={`block w-5 h-0.5 bg-foreground rounded-full transition-transform duration-300 my-1 ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
    <span className={`block w-5 h-0.5 bg-foreground rounded-full transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
  </button>
);

const MobileMenu = ({ items, isOpen, isActivePath }) => (
  <div
    className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg transition duration-300 h-screen ${
      isOpen
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-2 pointer-events-none"
    }`}
  >
    <div className="px-4 sm:px-6 py-4 space-y-2">
      {items.map((item) => {
        const active = isActivePath(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-fast ${
              active
                ? "text-primary bg-primary/5 border-b border-primary/20"
                : "text-muted-foreground hover:text-foreground sm:hover:bg-muted"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon
              name={item.icon}
              size={18}
              className={`transition-colors duration-fast ${active ? "text-primary" : "text-current"}`}
            />
            <span>{item.label}</span>
            {active && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
          </Link>
        );
      })}
    </div>
  </div>
);

export default Header;