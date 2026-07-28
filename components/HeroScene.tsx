"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LogoMark } from "@/components/LogoMark";
import { FantasyLoomTitle } from "@/components/branding/FantasyLoomTitle";

const loom = "/art/magical-loom/aligned";
const fixedLoom = "/art/magical-loom-fixed";
const introKey = "mirage-loom-intro-v5";
const criticalAssetCount = 9;

export function HeroScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const loadedAssetsRef = useRef(new Set<string>());
  const ambientTweensRef = useRef<ReturnType<typeof gsap.to>[]>([]);
  const [introDone, setIntroDone] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);

  const markAssetLoaded = (id: string) => {
    loadedAssetsRef.current.add(id);
    if (loadedAssetsRef.current.size >= criticalAssetCount) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const played = window.sessionStorage.getItem(introKey) === "done";
      setIntroDone(played || reduceMotion);
      setAssetsReady(true);
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!assetsReady) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = window.sessionStorage.getItem(introKey) === "done";

    const ctx = gsap.context(() => {
      if (played || reduceMotion) {
        root.classList.remove("is-intro-active");
        gsap.set(".intro-shade,.intro-thread-sigil", { opacity: 0 });
        gsap.set(".hero-brand,.hero-kicker,.hero-actions", { opacity: 1, y: 0 });
      }

      if (!played && !reduceMotion) {
        root.classList.add("is-intro-active");
        setIntroDone(false);
        gsap.set(".intro-thread-path,.intro-logo-path", {
          strokeDasharray: 900,
          strokeDashoffset: 900
        });
        gsap.set(".intro-shade", { opacity: 1 });
        gsap.set(".intro-thread-sigil", { opacity: 0.95 });
        gsap.set(".hero-layer", { opacity: 1, y: 0 });
        gsap.set(".hero-brand,.hero-kicker,.hero-actions", { opacity: 0, y: 14 });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            window.sessionStorage.setItem(introKey, "done");
            root.classList.remove("is-intro-active");
            gsap.set(".intro-shade,.intro-thread-sigil", { opacity: 0 });
            setIntroDone(true);
          }
        });

        timeline
          .to(".intro-shade", { opacity: 0, duration: 0.85 })
          .to(".intro-thread-path", { strokeDashoffset: 0, duration: 1.05 }, "-=0.35")
          .to(".intro-logo-path", { strokeDashoffset: 0, duration: 0.65 }, "-=0.18")
          .to(".hero-brand", { opacity: 1, y: 0, duration: 0.55 }, "-=0.2")
          .to(".hero-kicker", { opacity: 1, y: 0, duration: 0.45 }, "-=0.1")
          .to(".hero-actions", { opacity: 1, y: 0, duration: 0.35 }, "-=0.12")
          .to(".intro-thread-sigil", { opacity: 0, duration: 0.35 }, "-=0.04");
      }

      if (!reduceMotion) {
        ambientTweensRef.current = [
          gsap.to(".loom-crystal", {
            scale: 1.045,
            duration: 2.55,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          }),
          gsap.to(".loom-fabric", {
            y: -5,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          }),
        ];
      }
    }, root);

    let parallaxFrame: number | null = null;
    let parallaxX = "0";
    let parallaxY = "0";
    let scrollTimer: number | null = null;
    let heroVisible = true;

    const pauseAmbient = () => {
      ambientTweensRef.current.forEach((tween) => tween.pause());
    };

    const resumeAmbient = () => {
      if (heroVisible) {
        ambientTweensRef.current.forEach((tween) => tween.resume());
      }
    };

    const renderParallax = () => {
      parallaxFrame = null;
      root.style.setProperty("--parallax-x", parallaxX);
      root.style.setProperty("--parallax-y", parallaxY);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType === "touch") return;
      parallaxX = (event.clientX / window.innerWidth - 0.5).toFixed(3);
      parallaxY = (event.clientY / window.innerHeight - 0.5).toFixed(3);
      if (parallaxFrame == null) {
        parallaxFrame = window.requestAnimationFrame(renderParallax);
      }
    };

    const onScroll = () => {
      if (reduceMotion) return;
      pauseAmbient();
      if (scrollTimer != null) {
        window.clearTimeout(scrollTimer);
      }
      scrollTimer = window.setTimeout(resumeAmbient, 160);
    };

    const observer = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      if (heroVisible) {
        resumeAmbient();
      } else {
        pauseAmbient();
      }
    }, { threshold: 0.08 });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    observer.observe(root);
    return () => {
      ctx.revert();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      ambientTweensRef.current = [];
      if (parallaxFrame != null) {
        window.cancelAnimationFrame(parallaxFrame);
      }
      if (scrollTimer != null) {
        window.clearTimeout(scrollTimer);
      }
    };
  }, [assetsReady]);

  const skipIntro = () => {
    window.sessionStorage.setItem(introKey, "done");
    rootRef.current?.classList.remove("is-intro-active");
    setIntroDone(true);
    gsap.set(".hero-layer,.hero-brand,.hero-kicker,.hero-actions", { opacity: 1, y: 0 });
    gsap.set(".intro-shade,.intro-thread-sigil", { opacity: 0 });
  };

  return (
    <section
      id="home"
      ref={rootRef}
      className={`hero-section ${assetsReady ? "" : "is-loading"} ${!introDone ? "is-intro-active" : ""}`}
      aria-labelledby="hero-title"
    >
      <div className="hero-glow" aria-hidden="true" />
      <div className="intro-shade" aria-hidden="true" />
      {assetsReady && !introDone && (
        <button className="skip-intro" type="button" onClick={skipIntro}>
          跳过动画
        </button>
      )}
      <div className="hero-stage">
        <div className="loom-canvas" aria-label="魔法实验室中，幻境织机正在编织梦境">
          <div className="loom-artboard loom-background-artboard" aria-hidden="true">
            <Image className="hero-layer lab-background parallax-back" src={`${fixedLoom}/background.png`} alt="" fill priority sizes="100vw" onLoad={() => markAssetLoaded("lab-background")} onError={() => markAssetLoaded("lab-background")} />
          </div>
          <div className="loom-artboard loom-rear-artboard" aria-hidden="true">
            <Image className="hero-layer loom-slice loom-rear-arch parallax-rear" src={`${fixedLoom}/rear-arch.png`} alt="" width={238} height={479} priority sizes="20vw" onLoad={() => markAssetLoaded("rear-arch")} onError={() => markAssetLoaded("rear-arch")} />
          </div>
          <div className="loom-artboard loom-gear-artboard" aria-hidden="true">
            <Image className="hero-layer loom-slice loom-gear-left parallax-mid" src={`${fixedLoom}/gear-left.png`} alt="" width={239} height={247} priority sizes="18vw" onLoad={() => markAssetLoaded("gear-left")} onError={() => markAssetLoaded("gear-left")} />
            <Image className="hero-layer loom-slice loom-gear-right parallax-mid" src={`${fixedLoom}/gear-right.png`} alt="" width={244} height={423} priority sizes="18vw" onLoad={() => markAssetLoaded("gear-right")} onError={() => markAssetLoaded("gear-right")} />
            <Image className="hero-layer loom-slice loom-gear-top parallax-mid" src={`${fixedLoom}/gear-top.png`} alt="" width={126} height={168} priority sizes="10vw" onLoad={() => markAssetLoaded("gear-top")} onError={() => markAssetLoaded("gear-top")} />
          </div>
          <div className="loom-artboard loom-crystal-artboard" aria-hidden="true">
            <div className="loom-parallax-frame">
              <Image className="hero-layer loom-crystal parallax-mid" src={`${loom}/03_crystal.webp`} alt="" fill priority sizes="100vw" onLoad={() => markAssetLoaded("loom-crystal")} onError={() => markAssetLoaded("loom-crystal")} />
            </div>
          </div>
          <div className="loom-artboard loom-fabric-artboard" aria-hidden="true">
            <div className="loom-parallax-frame">
              <Image className="hero-layer loom-fabric parallax-fabric" src={`${loom}/04_fabric.webp`} alt="" fill sizes="100vw" onLoad={() => markAssetLoaded("loom-fabric")} onError={() => markAssetLoaded("loom-fabric")} />
            </div>
          </div>
          <div className="loom-artboard loom-front-artboard" aria-hidden="true">
            <Image className="hero-layer loom-slice loom-foreground-left parallax-front" src={`${fixedLoom}/foreground-left.png`} alt="" width={532} height={535} sizes="38vw" priority onLoad={() => markAssetLoaded("foreground-left")} onError={() => markAssetLoaded("foreground-left")} />
            <Image
              className="hero-layer loom-slice loom-foreground-right parallax-front"
              src={`${fixedLoom}/foreground-right.webp`}
              alt=""
              width={672}
              height={446}
              sizes="48vw"
              priority
              onLoad={() => markAssetLoaded("foreground-right")}
              onError={(event) => {
                event.currentTarget.style.display = "none";
                markAssetLoaded("foreground-right");
              }}
            />
          </div>
          <svg className="intro-thread-sigil" viewBox="0 0 1000 520" aria-hidden="true">
            <defs>
              <linearGradient id="introThreadGradient" x1="0" x2="1">
                <stop offset="0%" stopColor="#8de6d1" />
                <stop offset="52%" stopColor="#f6d98f" />
                <stop offset="100%" stopColor="#f19c79" />
              </linearGradient>
            </defs>
            <path className="intro-thread-path" d="M654 112 C548 390 386 488 214 424" />
            <path className="intro-logo-path" d="M84 390 C118 332 206 331 244 390 M116 388 C145 365 170 420 199 382 C220 356 235 383 258 360" />
          </svg>
          <div className="magic-particles" aria-hidden="true">
            {Array.from({ length: 14 }, (_, index) => (
              <i key={index} style={{ "--i": index, "--hue": 38 + index * 11 } as CSSProperties} />
            ))}
          </div>
        </div>
      </div>
      <div className="hero-copy">
        <div className="hero-brand">
          <LogoMark />
          <h1 id="hero-title"><FantasyLoomTitle animated={introDone} /></h1>
          <p className="hero-brand-subtitle" lang="en">Mirage Loom</p>
        </div>
        <p className="hero-kicker">我们研究未知，提炼奇迹，将梦中的世界一针一线织成真实可触的幻境。</p>
        <div className="hero-actions">
          <a href="#worlds" className="button primary">查看幻境档案</a>
          <a href="#logs" className="button ghost">阅读织造日志</a>
        </div>
      </div>
      <a className="scroll-cue" href="#announcements" aria-label="滚动到最新公告">
        <span className="scroll-thread" />
        <span className="scroll-label">向下</span>
      </a>
    </section>
  );
}
