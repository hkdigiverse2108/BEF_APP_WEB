import type { FC, ReactNode } from "react";
import { ImagePath } from "../../Constants";

type AuthLayoutProps = {
  image: string;
  children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ image, children }) => {
  return (
    <div className="fixed inset-0 h-screen w-screen max-h-screen max-w-full overflow-hidden bg-background flex flex-col font-sans text-foreground">
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 h-full min-h-0 w-full overflow-hidden">
        {/* Left visual */}
        <section className="relative hidden overflow-hidden bg-[#E7F2FD] lg:flex items-center justify-center h-full min-h-0 w-full">
          <img
            className="h-full w-full object-contain object-center max-h-screen select-none pointer-events-none"
            alt="auth visual"
            src={image}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-transparent pointer-events-none" />
        </section>

        {/* Right form */}
        <main className="relative flex items-center justify-center overflow-y-auto overflow-x-hidden bg-card px-6 py-6 sm:px-10 lg:px-12 xl:px-16 h-full min-h-0 w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Decorative background circles wrapped in overflow-hidden so they never cause scrollbars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full border border-border pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full border border-border pointer-events-none" />
          </div>

          <div className="relative z-10 w-full max-w-xl my-auto py-2">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <img
                src={`${ImagePath}logo/Logo.png`}
                alt="Achiwon"
                className="h-10 w-10 rounded-lg bg-secondary object-contain p-1"
              />
              <div>
                <p className="font-heading text-sm font-bold text-foreground">Achiwon</p>
                <p className="text-xs text-muted-foreground">UPSC & GPSC CSE</p>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
