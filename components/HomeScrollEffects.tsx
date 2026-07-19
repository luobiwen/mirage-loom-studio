"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HomeScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const landing = document.querySelector<HTMLElement>(".cinematic-landing");
    const hero = document.querySelector<HTMLElement>(".cinematic-landing .hero-section");
    const heroStage = document.querySelector<HTMLElement>(".cinematic-landing .hero-stage");
    const heroCopy = document.querySelector<HTMLElement>(".cinematic-landing .hero-copy");
    const heroCue = document.querySelector<HTMLElement>(".cinematic-landing .scroll-cue");
    const normalSections = Array.from(document.querySelectorAll<HTMLElement>("main > .section"));

    if (!landing || !hero || !heroStage) return;

    if (reduceMotion) {
      normalSections.forEach((section) => section.classList.add("is-revealed"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let observer: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      gsap.set(hero, {
        y: 0,
        z: 0,
        force3D: true,
        transformOrigin: "50% 0%"
      });
      gsap.set(heroStage, { y: 0, z: 0, scale: 1, force3D: true });
      if (heroCopy) gsap.set(heroCopy, { autoAlpha: 1, y: 0, z: 0, scale: 1, force3D: true });
      if (heroCue) gsap.set(heroCue, { autoAlpha: 1, y: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: landing,
          start: "top top",
          end: "+=100%",
          scrub: 0.9,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      timeline
        .to(heroStage, { y: "-7vh", scale: 1.035, duration: 1, ease: "power2.inOut" }, 0)
        .to(heroCopy, { y: "-22vh", autoAlpha: 0, scale: 0.96, duration: 0.55, ease: "power3.in" }, 0)
        .to(heroCue, { y: -36, autoAlpha: 0, duration: 0.25, ease: "power2.out" }, 0)
        .to(hero, {
          y: () => -window.innerHeight - 4,
          duration: 1,
          ease: "power4.inOut"
        }, 0);

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
            }
          });
        },
        {
          rootMargin: "0px 0px -18% 0px",
          threshold: 0.14
        }
      );

      const sectionObserver = observer;
      normalSections.forEach((section) => sectionObserver.observe(section));
    }, landing);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, []);

  return null;
}
