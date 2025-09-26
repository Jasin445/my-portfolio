import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import Image from "../AppImage";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: "Home", path: "/home-landing", icon: "Home" },
    { label: "Portfolio", path: "/portfolio-projects", icon: "Briefcase" },
    { label: "About", path: "/about-professional", icon: "User" },
    { label: "Blog", path: "/technical-blog", icon: "FileText" },
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 py-4 z-50 transition-all duration-normal ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm shadow-sm "
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between h-16 sm:px-6 4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/home-landing"
            className="flex items-center space-x-2 group"
            aria-label="DevPortfolio Pro - Home"
          >
            <div className="w-20 h-20 bg-transparent rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-fast">
              <Image src={"/assets/logo.png"} alt={"Logo"} />
            </div>
            <span className="text-3xl font-semibold text-foreground group-hover:text-primary transition-colors duration-fast">
              Jason Dagana
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
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
                  {/* <Icon 
                    name={item?.icon} 
                    size={16} 
                    className={`transition-colors duration-fast ${
                      isActivePath(item?.path) ? 'text-primary' : 'text-current'
                    }`}
                  /> */}
                  <span
                    className={`text-[16px] ${
                      item.label === "Contact"
                        ? "bg-primary py-1 px-5 rounded-xl"
                        : ""
                    }`}
                  >
                    {item?.label}
                  </span>
                </span>

                <div
                  className={`absolute bottom-0 hidden ${
                    item.label === "Contact" ? "hidden" : "group-hover:block "
                  } left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full `}
                />
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-slow ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-fast ${
                  isActivePath(item?.path)
                    ? "text-primary bg-primary/5 border border-primary/20"
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
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

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

export default Header;
