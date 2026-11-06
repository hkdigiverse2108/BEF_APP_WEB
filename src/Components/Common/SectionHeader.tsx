import { Link } from "react-router-dom";
import type { FC, ReactNode } from "react";
import { LuArrowRight } from "react-icons/lu";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  link?: string;
  linkText?: string;
  showViewAll?: boolean;
  action?: ReactNode;
};

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  subtitle,
  link,
  linkText,
  showViewAll = false,
  action,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
      <div className="flex items-start gap-3 min-w-0">
        <span className="bef-section-bar shrink-0 mt-1" />
        <div className="min-w-0">
          <h2 className="font-heading text-lg sm:text-2xl font-bold text-foreground truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action ??
        (showViewAll && link ? (
          linkText ? (
            <Link
              to={link}
              className="inline-flex min-h-9 sm:min-h-10 items-center gap-1.5 rounded-lg border border-border bg-secondary px-3.5 sm:px-4 text-xs sm:text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white shrink-0"
            >
              {linkText} <LuArrowRight className="text-sm" />
            </Link>
          ) : (
            <Link
              to={link}
              className="text-xs sm:text-sm font-bold text-primary transition-all duration-300 hover:text-accent shrink-0"
            >
              View All →
            </Link>
          )
        ) : null)}
    </div>
  );
};

export default SectionHeader;
