import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Image from "../AppImage";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: "Home", path: "/", icon: "Home" },
    { label: "Projects", path: "/projects", icon: "Briefcase" },
    { label: "About", path: "/about-professional", icon: "User" },
    { label: "Contact", path: "/contact-connect", icon: "Mail" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 py-4 z-50 transition-all duration-normal ${
          scrolled || isMobileMenuOpen
            ? "bg-background/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between h-16 px-4 sm:px-6 4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            aria-label="Jason Dagana - Home"
          >
            <div className="w-20 h-20 bg-transparent rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-fast">
              <Image src={"/assets/logo.png"} alt={"Logo"} />
            </div>
            <span className="text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors duration-fast">
              Jason Dagana
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-fast group ${
                  isActivePath(item?.path) ? "text-primary bg-primary/5" : ""
                }`}
                aria-current={isActivePath(item?.path) ? "page" : undefined}
              >
                <span className="flex items-center space-x-2">
                  <span
                    className={`text-[16px] ${
                      item.label === "Contact"
                        ? "bg-primary py-2 px-5 rounded-xl text-white"
                        : ""
                    }`}
                  >
                    {item?.label}
                  </span>
                </span>
                <div
                  className={`absolute bottom-0 hidden ${
                    item.label === "Contact" ? "hidden" : "group-hover:block"
                  } left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full`}
                />
              </Link>
            ))}
          </div>

          {/* Hamburger Button — mobile only */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-muted transition-colors duration-fast focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 my-1 ${
                isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg transition-all duration-300 h-screen ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-4 sm:px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-fast ${
                  isActivePath(item?.path)
                    ? "text-primary bg-primary/5 border-b border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-current={isActivePath(item?.path) ? "page" : undefined}
              >
                <Icon
                  name={item?.icon}
                  size={18}
                  className={`transition-colors duration-fast ${
                    isActivePath(item?.path) ? "text-primary" : "text-current"
                  }`}
                />
                <span>{item?.label}</span>
                {isActivePath(item?.path) && (
                  <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black z-40 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    )?.matches;
    const shouldUseDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    setIsDark(shouldUseDark);
    document.documentElement?.classList?.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement?.classList?.toggle("dark", newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <Icon
        name={isDark ? "Sun" : "Moon"}
        size={18}
        className="transition-all duration-fast rotate-0 scale-100"
      />
    </Button>
  );
};

