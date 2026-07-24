import { useId } from "react";

export function LogoMark() {
  const idPrefix = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const verticalThreadGradient = `logo-vertical-thread-${idPrefix}`;

  return (
    <span className="logo-mark" aria-label="幻境织机 Mirage Loom">
      <svg viewBox="0 0 220 92" role="img" aria-hidden="true">
        <defs>
          <linearGradient id={verticalThreadGradient} x1="0" y1="69" x2="0" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#62b8c4" />
            <stop offset="42%" stopColor="#76cbd0" />
            <stop offset="70%" stopColor="#c6aa5d" />
            <stop offset="100%" stopColor="#e2c576" />
          </linearGradient>
        </defs>
        <path className="logo-arch" d="M22 57C58 9 142 9 198 57" stroke="#d8b45c" />
        <path className="logo-bars" d="M66 26.53V69M96 21.16V69M126 23.04V69M156 31.56V69" stroke={`url(#${verticalThreadGradient})`} />
        <path className="logo-thread" d="M35 57C61 49 86 49 110 56C134 63 160 63 189 54" stroke="#deb95f" />
        <circle className="logo-core" cx="110" cy="56" r="14" fill="#75cfc2" />
      </svg>
      <span className="logo-copy">
        <strong>幻境织机</strong>
        <small>Mirage Loom</small>
      </span>
    </span>
  );
}
