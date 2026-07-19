import { useId } from "react";
import styles from "./FantasyLoomTitle.module.css";

interface FantasyLoomTitleProps {
  className?: string;
  animated?: boolean;
}

export function FantasyLoomTitle({ className, animated = false }: FantasyLoomTitleProps) {
  const idPrefix = useId().replace(/:/g, "");
  const ids = {
    brass: `${idPrefix}-brass`,
    brassHighlight: `${idPrefix}-brass-highlight`,
    brassCut: `${idPrefix}-brass-cut`,
    enamel: `${idPrefix}-enamel`,
    enamelReflection: `${idPrefix}-enamel-reflection`,
    ambientReflection: `${idPrefix}-ambient-reflection`,
    gearBrass: `${idPrefix}-gear-brass`,
    gearRim: `${idPrefix}-gear-rim`,
    gearHub: `${idPrefix}-gear-hub`,
    titleClip: `${idPrefix}-title-clip`,
    outerShadow: `${idPrefix}-outer-shadow`,
    innerShadow: `${idPrefix}-inner-shadow`,
    goldGlow: `${idPrefix}-gold-glow`,
    metalTexture: `${idPrefix}-metal-texture`,
    gearShadow: `${idPrefix}-gear-shadow`
  };
  const textProps = {
    x: 600,
    y: 212,
    textAnchor: "middle" as const,
    fontFamily: "var(--logo-cn)",
    fontSize: 190,
    fontWeight: 700,
    letterSpacing: 0
  };
  const titleClassName = [styles.title, animated ? styles.animated : "", className].filter(Boolean).join(" ");

  return (
    <svg viewBox="150 42 900 194" role="img" aria-label="幻境织机" className={titleClassName} focusable="false">
      <defs>
        <linearGradient id={ids.brass} x1="0" y1="0" x2="0.08" y2="1">
          <stop offset="0%" stopColor="#f1d58b" />
          <stop offset="16%" stopColor="#d0a451" />
          <stop offset="48%" stopColor="#9e6f2e" />
          <stop offset="76%" stopColor="#b98a3d" />
          <stop offset="100%" stopColor="#563619" />
        </linearGradient>
        <linearGradient id={ids.brassHighlight} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1d58b" stopOpacity="0.82" />
          <stop offset="29%" stopColor="#e2c176" stopOpacity="0.34" />
          <stop offset="57%" stopColor="#c18d39" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#563619" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.brassCut} x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" stopColor="#fff0b0" stopOpacity="0.88" />
          <stop offset="18%" stopColor="#d9af57" stopOpacity="0.66" />
          <stop offset="52%" stopColor="#6d451b" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#24160d" stopOpacity="0.74" />
        </linearGradient>
        <linearGradient id={ids.enamel} x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor="#2b8b6b" />
          <stop offset="18%" stopColor="#12624c" />
          <stop offset="60%" stopColor="#0b4738" />
          <stop offset="100%" stopColor="#071f1a" />
        </linearGradient>
        <linearGradient id={ids.enamelReflection} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8edd4" stopOpacity="0.22" />
          <stop offset="19%" stopColor="#91c9a6" stopOpacity="0.06" />
          <stop offset="38%" stopColor="#91c9a6" stopOpacity="0" />
          <stop offset="100%" stopColor="#071f1a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.ambientReflection} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#efd298" stopOpacity="0.22" />
          <stop offset="38%" stopColor="#b77936" stopOpacity="0.07" />
          <stop offset="72%" stopColor="#5f3518" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#2d1b10" stopOpacity="0.17" />
        </linearGradient>
        <radialGradient id={ids.gearBrass} cx="31%" cy="24%" r="76%">
          <stop offset="0%" stopColor="#d7bd7d" />
          <stop offset="20%" stopColor="#b38948" />
          <stop offset="52%" stopColor="#765029" />
          <stop offset="78%" stopColor="#422a17" />
          <stop offset="100%" stopColor="#21140c" />
        </radialGradient>
        <linearGradient id={ids.gearRim} x1="0" y1="0" x2="0.12" y2="1">
          <stop offset="0%" stopColor="#c5a25d" />
          <stop offset="38%" stopColor="#795025" />
          <stop offset="74%" stopColor="#382314" />
          <stop offset="100%" stopColor="#180e08" />
        </linearGradient>
        <radialGradient id={ids.gearHub} cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#2e6751" />
          <stop offset="50%" stopColor="#17382b" />
          <stop offset="100%" stopColor="#081812" />
        </radialGradient>
        <filter id={ids.outerShadow} filterUnits="userSpaceOnUse" x="70" y="18" width="1060" height="286">
          <feDropShadow dx="5" dy="9" stdDeviation="6" floodColor="#2a1b0f" floodOpacity="0.56" />
        </filter>
        <filter id={ids.innerShadow} filterUnits="userSpaceOnUse" x="160" y="42" width="880" height="226">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
          <feComposite in="offsetBlur" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="innerCut" />
          <feColorMatrix
            in="innerCut"
            type="matrix"
            values="0 0 0 0 0.13 0 0 0 0 0.08 0 0 0 0 0.04 0 0 0 0.48 0"
            result="innerShade"
          />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="innerShade" />
          </feMerge>
        </filter>
        <filter id={ids.goldGlow} filterUnits="userSpaceOnUse" x="160" y="42" width="880" height="226">
          <feGaussianBlur stdDeviation="1.25" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={ids.metalTexture} filterUnits="userSpaceOnUse" x="150" y="35" width="900" height="240">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="1" seed="12" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.2 0 0 0 0 0.12 0 0 0 0 0.04 0 0 0 0.06 0" result="patina" />
          <feComposite in="patina" in2="SourceGraphic" operator="in" result="texture" />
          <feBlend in="SourceGraphic" in2="texture" mode="multiply" />
        </filter>
        <filter id={ids.gearShadow} x="-45%" y="-45%" width="190%" height="190%">
          <feDropShadow dx="1.5" dy="2.2" stdDeviation="1.15" floodColor="#2b1b0e" floodOpacity="0.52" />
        </filter>
        <clipPath id={ids.titleClip}>
          <text {...textProps}>幻境织机</text>
        </clipPath>
      </defs>

      <g className={styles.titleGroup}>
        <text {...textProps} fill="none" stroke="#4b351c" strokeWidth="6.2" strokeLinejoin="miter" strokeMiterlimit="2">幻境织机</text>
        <text {...textProps} fill={`url(#${ids.enamel})`} stroke="#c39a51" strokeWidth="3.2" strokeLinejoin="miter" strokeMiterlimit="2">幻境织机</text>
        <text {...textProps} fill="none" stroke="#ead28b" strokeOpacity="0.52" strokeWidth="0.65" strokeLinejoin="miter" strokeMiterlimit="2">幻境织机</text>

        <g clipPath={`url(#${ids.titleClip})`} className={styles.circuitLayer}>
          <path className={styles.circuit} d="M202 121H276l18 18h48" />
          <path className={`${styles.circuit} ${styles.circuitDetail}`} d="M390 176h56l20-20h58" />
          <path className={styles.circuit} d="M568 107h64l18 18h58" />
          <path className={`${styles.circuit} ${styles.circuitDetail}`} d="M756 174h68l22-22h74" />
          <path className={`${styles.circuit} ${styles.circuitFlow}`} d="M232 204h75l16-16h61" filter={`url(#${ids.goldGlow})`} />
          <path className={`${styles.circuit} ${styles.circuitFlow} ${styles.circuitFlowDelayed}`} d="M703 124h58l19 19h69" filter={`url(#${ids.goldGlow})`} />
          <g className={styles.circuitNodes}>
            <circle cx="294" cy="139" r="4" />
            <circle cx="466" cy="156" r="3.5" />
            <circle cx="650" cy="125" r="4" />
            <circle cx="846" cy="152" r="3.5" />
            <circle cx="323" cy="188" r="3" />
            <circle cx="780" cy="143" r="3" />
          </g>
        </g>

        <g className={styles.gearLayer}>
          <Gear x={292} y={143} paints={ids} size={22} rotating />
          <Gear x={445} y={150} paints={ids} size={9} />
          <Gear x={688} y={142} paints={ids} size={14.5} rotating reverse />
          <Gear x={854} y={151} paints={ids} size={5.8} className={styles.gearMinor} />
        </g>
      </g>
    </svg>
  );
}

function Gear({
  x,
  y,
  paints,
  size,
  className,
  rotating = false,
  reverse = false
}: {
  x: number;
  y: number;
  paints: { gearBrass: string; gearRim: string; gearHub: string; gearShadow: string; titleClip: string };
  size: number;
  className?: string;
  rotating?: boolean;
  reverse?: boolean;
}) {
  const radius = size;
  const teeth = radius > 14 ? 12 : radius > 10 ? 10 : 8;
  const rootRadius = radius * 0.81;
  const toothRadius = radius + Math.max(2.1, radius * 0.18);
  const segment = (Math.PI * 2) / teeth;
  const toothPath = Array.from({ length: teeth }, (_, index) => {
    const center = index * segment - Math.PI / 2;
    const points = [
      [rootRadius, center - segment * 0.5],
      [rootRadius, center - segment * 0.35],
      [toothRadius, center - segment * 0.2],
      [toothRadius, center + segment * 0.2],
      [rootRadius, center + segment * 0.35],
      [rootRadius, center + segment * 0.5]
    ];
    return points.map(([distance, angle]) => `${(Math.cos(angle) * distance).toFixed(2)} ${(Math.sin(angle) * distance).toFixed(2)}`).join("L");
  }).join("L");
  const socketRadius = toothRadius + 2.35;
  const innerRim = radius * 0.68;
  const hubRadius = Math.max(2.4, radius * 0.22);
  const spokePath = Array.from({ length: 4 }, (_, index) => {
    const angle = Math.PI / 4 + index * (Math.PI / 2);
    const normal = angle + Math.PI / 2;
    const start = hubRadius * 0.74;
    const end = innerRim * 0.92;
    const innerWidth = radius * 0.065;
    const outerWidth = radius * 0.15;
    const point = (distance: number, offset: number) => [
      Math.cos(angle) * distance + Math.cos(normal) * offset,
      Math.sin(angle) * distance + Math.sin(normal) * offset
    ];
    const points = [
      point(start, -innerWidth),
      point(end, -outerWidth),
      point(end, outerWidth),
      point(start, innerWidth)
    ];
    return `M${points.map(([xCoord, yCoord]) => `${xCoord.toFixed(2)} ${yCoord.toFixed(2)}`).join("L")}Z`;
  }).join("");

  return (
    <g className={[styles.gear, className].filter(Boolean).join(" ")} transform={`translate(${x} ${y})`}>
      <g clipPath={`url(#${paints.titleClip})`}>
        <circle r={socketRadius} fill="#2a1b10" opacity="0.72" />
        <circle r={socketRadius - 1.1} fill="none" stroke="#3f2814" strokeOpacity="0.92" strokeWidth="1.2" />
      </g>
      <g className={[rotating ? styles.gearSpin : "", reverse ? styles.gearSpinReverse : ""].filter(Boolean).join(" ")}>
        <path d={`M${toothPath}Z`} fill={`url(#${paints.gearBrass})`} stroke="#3a2413" strokeWidth="1.7" strokeLinejoin="miter" strokeMiterlimit="1.6" />
        <circle r={radius - 1.35} fill="none" stroke="#8b6738" strokeOpacity="0.52" strokeWidth="0.72" />
        <circle r={innerRim} fill="#24170d" fillOpacity="0.9" stroke="#76502a" strokeWidth="1.25" />
        <path d={spokePath} fill="#76502a" stroke="#241309" strokeWidth="1.3" strokeLinejoin="round" />
        <path d={spokePath} fill="none" stroke="#9a7440" strokeOpacity="0.5" strokeWidth="0.62" strokeLinejoin="round" />
        <circle r={hubRadius} fill={`url(#${paints.gearHub})`} stroke="#876536" strokeOpacity="0.82" strokeWidth="0.9" />
        <circle r={Math.max(0.95, hubRadius * 0.3)} fill="#172319" />
      </g>
    </g>
  );
}
