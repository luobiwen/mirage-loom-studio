"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/routes";
import { socialLinks } from "@/lib/social-links";
import { LogoMark } from "@/components/LogoMark";
import { SocialLinks } from "@/components/branding/SocialLinks";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let frame: number | null = null;
    let scrollTimer: number | null = null;

    const updateScrollState = () => {
      frame = null;
      const nextScrolled = window.scrollY > window.innerHeight * 0.45;
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const onScroll = () => {
      document.body.classList.add("is-page-scrolling");
      if (scrollTimer != null) {
        window.clearTimeout(scrollTimer);
      }
      scrollTimer = window.setTimeout(() => {
        document.body.classList.remove("is-page-scrolling");
      }, 140);

      if (frame == null) {
        frame = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("is-page-scrolling");
      if (frame != null) {
        window.cancelAnimationFrame(frame);
      }
      if (scrollTimer != null) {
        window.clearTimeout(scrollTimer);
      }
    };
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="brand-corner">
        <Link className="nav-logo" href="/#home" onClick={() => setOpen(false)}>
          <LogoMark compact={scrolled} />
        </Link>
        {pathname === "/" && (
          <SocialLinks
            className="nav-social-links"
            facebookUrl={socialLinks.facebook}
            weiboUrl={socialLinks.weibo}
            steamUrl={socialLinks.steam}
          />
        )}
      </div>
      <button
        className="spool-button"
        type="button"
        aria-label={open ? "关闭导航" : "打开导航"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="主导航">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
