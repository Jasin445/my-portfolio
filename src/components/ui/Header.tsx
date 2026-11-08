import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../AppIcon";
import Image from "next/image";
import type { AppIconName } from "../AppIcon";

interface NavigationItem {
  label: string;
  path: string;
  icon: AppIconName;
}

const navigationItems: NavigationItem[] = [
  { label: "Home", path: "/", icon: "Home" },
  { label: "Projects", path: "/projects", icon: "Briefcase" },
  { label: "About", path: "/about-professional", icon: "User" },
  { label: "Articles", path: "/my-articles", icon: "User" },
  { label: "Contact", path: "/contact-connect", icon: "Mail" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const scrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 10;
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
    (path: string) => pathname === path,
    [pathname]
  );

  const headerClass = useMemo(
    () =>
      `fixed top-0 left-0 right-0 py-4 z-50 transition-colors duration-normal ${
        scrolled || isMobileMenuOpen
          ? "bg-background/70 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`,
    [scrolled, isMobileMenuOpen],
  );

  return (
    <>
      <header className={headerClass}>
        <nav className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 4xl:max-w-9xl 3xl:max-w-8xl max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 items-center space-x-2 group"
            aria-label="Jason Dagana - Home"
          >
            <div className="-ml-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-transparent transition-transform duration-fast group-hover:scale-105 sm:ml-0 sm:h-16 sm:w-16">
              <Image
                src="/assets/logo.png"
                alt="Jason Dagana logo"
                width={80}
                height={80}
                priority
                sizes="80px"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="truncate text-[clamp(16px,5vw,22px)] font-semibold text-foreground transition-colors duration-fast group-hover:text-primary sm:text-3xl">
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
          className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

// ── Extracted sub-components so Header re-render doesn't cascade ──

const NavLink = ({ item, active }: { item: NavigationItem; active: boolean }) => (
  <Link
    href={item.path}
    className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-fast group ${
      active ? "text-primary bg-primary/5" : ""
    }`}
    aria-current={active ? "page" : undefined}
  >
    <span className="flex items-center space-x-2">
      <span
        className={`text-[16px] ${
          item.label === "Contact"
            ? "bg-gradient-to-r from-primary-soft to-primary py-2 px-5 rounded-xl text-white"
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

const HamburgerButton = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => (
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

const MobileMenu = ({
  items,
  isOpen,
  isActivePath,
}: {
  items: NavigationItem[];
  isOpen: boolean;
  isActivePath: (path: string) => boolean;
}) => (
  <div
    className={`lg:hidden absolute top-full left-0 right-0 max-h-[calc(100dvh-5rem)] overflow-y-auto bg-background/95 backdrop-blur-sm border-b border-border shadow-lg transition duration-300 ${
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
            href={item.path}
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
