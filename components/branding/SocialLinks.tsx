"use client";

import { useEffect, type SVGProps } from "react";
import styles from "./SocialLinks.module.css";

interface SocialLinksProps {
  facebookUrl?: string;
  weiboUrl?: string;
  steamUrl?: string;
  className?: string;
}

type SocialIcon = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const socialPlatforms: Array<{
  key: "facebook" | "weibo" | "steam";
  label: string;
  ariaLabel: string;
  Icon: SocialIcon;
}> = [
  { key: "facebook", label: "Facebook", ariaLabel: "访问幻境织机的 Facebook", Icon: FacebookIcon },
  { key: "weibo", label: "微博", ariaLabel: "访问幻境织机的微博", Icon: WeiboIcon },
  { key: "steam", label: "Steam", ariaLabel: "访问幻境织机的 Steam 主页", Icon: SteamIcon }
];

export function SocialLinks({ facebookUrl, weiboUrl, steamUrl, className }: SocialLinksProps) {
  const urls = { facebook: facebookUrl, weibo: weiboUrl, steam: steamUrl };
  const missingPlatforms = socialPlatforms.filter((platform) => !urls[platform.key]).map((platform) => platform.label).join("、");

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && missingPlatforms) {
      console.info(`[Mirage Loom] 社交通讯入口尚未配置：${missingPlatforms}。请设置对应的 NEXT_PUBLIC_*_URL 环境变量。`);
    }
  }, [missingPlatforms]);

  return (
    <div className={[styles.socialLinks, className].filter(Boolean).join(" ")} role="group" aria-label="幻境织机社交通讯入口">
      {socialPlatforms.map((platform) => {
        const href = urls[platform.key];
        const tooltip = href ? platform.label : `${platform.label} 尚未配置`;

        if (!href) {
          return (
            <span
              key={platform.key}
              className={`${styles.socialLink} ${styles.disabled}`}
              aria-label={platform.ariaLabel}
              aria-disabled="true"
              data-tooltip={tooltip}
            >
              <platform.Icon aria-hidden="true" />
            </span>
          );
        }

        return (
          <a
            key={platform.key}
            className={styles.socialLink}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.ariaLabel}
            data-tooltip={tooltip}
          >
            <platform.Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M13.68 22v-8.2h2.75l.41-3.2h-3.16V8.56c0-.93.26-1.56 1.59-1.56h1.7V4.14A22.9 22.9 0 0 0 14.5 4c-2.44 0-4.12 1.5-4.12 4.23v2.36H7.62v3.2h2.76V22h3.3Z" />
    </svg>
  );
}

function WeiboIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9.76 9.15c-3.44 0-6.23 2.18-6.23 4.87 0 2.68 2.8 4.85 6.23 4.85 3.44 0 6.23-2.17 6.23-4.85 0-1.18-.54-2.27-1.42-3.12.22-.55.31-1.1.17-1.5-.21-.63-1.06-.72-2.11-.23-.7-.26-1.59-.42-2.87-.42Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="14.13" r="2.08" fill="currentColor" />
      <circle cx="9.5" cy="14.13" r="0.78" fill="#0b493b" />
      <path d="M15.1 5.45a4.63 4.63 0 0 1 4.08 4.08M16.63 3.18a7.55 7.55 0 0 1 6.5 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SteamIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  );
}
