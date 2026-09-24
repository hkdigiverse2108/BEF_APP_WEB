import { Link } from "react-router-dom";
import type { FC, ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  link?: string;
  showViewAll?: boolean;
  action?: ReactNode;
};

const SectionHeader: FC<SectionHeaderProps> = ({ title, link, showViewAll = false, action }) => {
  return (
    <div className="flex items-center justify-between mb-5 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <span className="bef-section-bar shrink-0" />
        <div className="min-w-0">
          <h2 className="font-heading text-base sm:text-lg font-bold text-foreground truncate">{title}</h2>
          <span className="bef-section-dot mt-1" />
        </div>
      </div>
      {action ??
        (showViewAll && link ? (
          <Link to={link} className="text-xs sm:text-sm font-bold text-primary transition-all duration-300 hover:text-accent shrink-0">
            View All →
          </Link>
        ) : null)}
    </div>
  );
};

export default SectionHeader;
