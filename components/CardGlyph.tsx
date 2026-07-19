export function CardGlyph({ variant = "loom" }: { variant?: "loom" | "moon" | "flower" | "book" }) {
  return (
    <svg className={`card-glyph ${variant}`} viewBox="0 0 160 120" aria-hidden="true">
      <path d="M22 76C42 34 111 31 138 78" />
      <path d="M39 75C57 59 77 94 96 70C110 53 123 66 136 51" />
      <circle cx="80" cy="75" r="15" />
      {variant === "flower" && <path d="M80 60c-25-18-36-6-27 10c-20 4-20 21 2 22c1 24 19 27 28 5c18 18 35 6 24-14c20-10 10-27-12-22c-1-21-17-23-15-1Z" />}
      {variant === "moon" && <path d="M99 30c-26 7-29 45-3 56c-35 2-53-36-31-59c10-11 25-12 34 3Z" />}
      {variant === "book" && <path d="M35 38c22-9 34-2 45 8c12-10 25-17 47-8v51c-22-8-35-3-47 8c-11-11-24-16-45-8Z" />}
    </svg>
  );
}
