import type { FC, ReactNode } from "react";
import { ImagePath } from "../../Constants";

type AuthLayoutProps = {
  image: string;
  children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ image, children }) => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col relative font-sans text-foreground overflow-hidden">
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
        {/* Left visual */}
        <section className="relative hidden overflow-hidden bg-secondary lg:block">
          <img className="h-full w-full object-cover object-left" alt="auth visual" src={image} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/10 to-transparent" />
          <div className="absolute left-6 xl:left-10 top-6 xl:top-10 flex items-center gap-3 rounded-xl bg-card/90 px-4 py-3 shadow-box-shadow">
            <img src={`${ImagePath}logo/Logo.png`} alt="Bharat Exam Fest" className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary object-contain p-1" />
            <div>
              <p className="font-heading text-sm font-bold text-foreground">Bharat Exam Fest</p>
              <p className="text-xs text-muted-foreground">UPSC & GPSC CSE</p>
            </div>
          </div>
        </section>
        {/* Right form */}
        <main className="relative flex items-center justify-center overflow-hidden bg-card px-6 py-10 sm:px-10 lg:px-16">
          <div aria-hidden className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full border border-border" />
          <div aria-hidden className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full border border-border" />
          <div className="relative z-10 w-full max-w-xl">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <img src={`${ImagePath}logo/Logo.png`} alt="Bharat Exam Fest" className="h-10 w-10 rounded-lg bg-secondary object-contain p-1" />
              <div>
                <p className="font-heading text-sm font-bold text-foreground">Bharat Exam Fest</p>
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
