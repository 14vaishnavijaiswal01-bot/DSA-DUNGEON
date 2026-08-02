import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export function Logo({
  size = 40,
  showText = true,
  to = "/dashboard",
  className,
}: {
  size?: number;
  showText?: boolean;
  to?: string;
  className?: string;
}) {
  return (
    <Link to={to} className={cn("flex items-center gap-3", className)}>
      <img
        src={logo}
        alt="DSA Dungeon emblem"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="drop-shadow-[0_0_18px_color-mix(in_oklab,var(--secondary)_60%,transparent)]"
      />
      {showText && (
        <span className="font-display text-lg font-bold tracking-wide">
          DSA <span className="text-gradient">Dungeon</span>
        </span>
      )}
    </Link>
  );
}
