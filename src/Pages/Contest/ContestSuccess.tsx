import { useEffect, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LuCircleCheckBig,
  LuTrophy,
  LuHouse,
  LuClock,
  LuShieldCheck,
  LuReceipt,
  LuArrowRight,
} from "react-icons/lu";
import { ROUTES } from "../../Constants";
import dayjs from "dayjs";

interface SuccessState {
  contest?: {
    _id?: string;
    name?: string;
    fees?: number | string;
    startDate?: string;
    startTime?: string;
    duration?: number;
    totalQuestion?: number;
    price?: number;
  };
  payableAmount?: string | number;
  paymentMethod?: string;
  transactionId?: string;
  joinedAt?: string;
  isRechargeOnly?: boolean;
}

const ContestSuccess: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as SuccessState;

  // Retrieve contest details or fallback gracefully
  const contest = state.contest;
  const isRechargeOnly = Boolean(state.isRechargeOnly);
  const contestName = contest?.name || "UPSC CSE Examination Contest";
  const amountPaid = state.payableAmount !== undefined ? state.payableAmount : (contest?.fees || "0.00");
  const paymentMethod = state.paymentMethod || "Wallet Balance";
  const transactionId = state.transactionId || `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
  const displayDate = state.joinedAt ? dayjs(state.joinedAt).format("DD MMM YYYY, hh:mm A") : dayjs().format("DD MMM YYYY, hh:mm A");

  // Google Tag Manager Setup & Conversion Tracking for Marketing
  useEffect(() => {
    try {
      // Ensure Google Tag Manager GTM-N9RQMC7C is loaded
      if (typeof window !== "undefined") {
        const win = window as unknown as {
          dataLayer?: Record<string, unknown>[];
        };
        win.dataLayer = win.dataLayer || [];

        if (!document.getElementById("gtm-container-n9rqmc7c")) {
          const script = document.createElement("script");
          script.id = "gtm-container-n9rqmc7c";
          script.async = true;
          script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-N9RQMC7C";
          const firstScript = document.getElementsByTagName("script")[0];
          if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript);
          } else {
            document.head.appendChild(script);
          }
          win.dataLayer.push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js",
          });
        }

        // Push conversion event for Success Page (GTM DataLayer)
        win.dataLayer.push({
          event: isRechargeOnly ? "payment_recharge_success" : "contest_join_success",
          contest_id: contest?._id,
          contest_name: contestName,
          value: Number(amountPaid) || 0,
          currency: "INR",
          transaction_id: transactionId,
          payment_method: paymentMethod,
        });

        // Google Ads Conversion Tracking for Success Page
        // Only track on success page and ensure gtag is available
        if (typeof window !== "undefined") {
          const gtagWindow = window as unknown as { gtag?: (...args: unknown[]) => void };
          try {
            if (typeof gtagWindow.gtag === "function") {
              gtagWindow.gtag('event', 'conversion', {
                'send_to': 'AW-16926994683/hjJiCKy5p7MdEPvhtYc_',
                'transaction_id': transactionId || '',
                'value': Number(amountPaid) || 0,
                'currency': 'INR',
                'new_customer': false /* calculate dynamically based on user session */,
              });
            }
          } catch (e) {
            console.error("Google Ads conversion tracking error:", e);
          }
        }

        // Track Meta Pixel Conversion Event
        const winWithFbq = window as unknown as { fbq?: (...args: unknown[]) => void };
        if (typeof winWithFbq.fbq === "function") {
          winWithFbq.fbq("track", isRechargeOnly ? "AddPaymentInfo" : "Purchase", {
            content_name: contestName,
            content_ids: contest?._id ? [contest._id] : [],
            value: Number(amountPaid) || 0,
            currency: "INR",
          });
        }
      }
    } catch (e) {
      console.error("Marketing tracking error:", e);
    }
  }, [contest?._id, contestName, amountPaid, isRechargeOnly, paymentMethod, transactionId]);

  return (
    <div id="contest-success-page" data-page="contest_success" className="sub-container py-8 sm:py-14 min-h-[75vh] flex items-center justify-center">
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-N9RQMC7C"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>

      <div className="w-full max-w-2xl bg-white rounded-3xl border border-border shadow-xl overflow-hidden relative">
        {/* Top Decorative Header Wave with Mascot Theme Accent */}
        <div className="relative bg-gradient-to-r from-[#114598] via-[#1766d4] to-[#f48224] p-8 sm:p-10 text-white text-center overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-black/10 blur-2xl pointer-events-none" />

          {/* Success Animated Icon */}
          <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-inner ring-4 ring-white/30 animate-bounce">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <LuCircleCheckBig className="w-10 h-10 stroke-[2.5]" />
            </div>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isRechargeOnly ? "Payment Successful!" : "Contest Joined Successfully!"}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/90 font-medium">
            {isRechargeOnly
              ? "Your wallet balance has been updated and is ready to use."
              : "Your registration is confirmed. Best of luck with your test battle!"}
          </p>

          {/* Contest Name Pill */}
          {!isRechargeOnly && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm text-sm font-semibold border border-white/20">
              <LuTrophy className="text-yellow-300 w-4 h-4" />
              <span>{contestName}</span>
            </div>
          )}
        </div>

        {/* Receipt & Details Section */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <LuReceipt className="w-4 h-4 text-primary" />
                Transaction Summary
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                <LuShieldCheck className="w-3.5 h-3.5" />
                Verified & Paid
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-500 font-medium">Contest / Purpose</p>
                <p className="font-semibold text-slate-800 mt-0.5">{contestName}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Amount Deducted / Paid</p>
                <p className="font-bold text-lg text-emerald-600 mt-0.5">
                  ₹{Number(amountPaid).toFixed(2)}
                  <span className="text-xs font-normal text-slate-500 ml-1.5">(GST Included)</span>
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Payment Mode</p>
                <p className="font-semibold text-slate-800 mt-0.5">{paymentMethod}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Transaction ID</p>
                <p className="font-mono text-xs text-slate-700 mt-0.5 bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                  {transactionId}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Date & Time</p>
                <p className="font-semibold text-slate-800 mt-0.5">{displayDate}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Status</p>
                <p className="font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Success
                </p>
              </div>
            </div>
          </div>

          {/* Quick Notice Tip */}
          <div className="flex items-start gap-3 rounded-xl bg-blue-50/80 border border-blue-200/70 p-4 text-xs sm:text-sm text-blue-900">
            <LuClock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Important:</strong> Please ensure a stable internet connection before the contest start time. You can find your enrolled test and schedule in <strong>My Contests</strong>.
            </p>
          </div>

          {/* Call to Actions - Structured with IDs, Names and data-track for Marketing Analytics */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {!isRechargeOnly ? (
              <button
                type="button"
                id="btn-success-my-contests"
                name="btn_success_my_contests"
                data-track="contest_success_my_contests"
                data-contest-id={contest?._id}
                data-amount={amountPaid}
                onClick={() => navigate(ROUTES.CONTEST.MY_CONTEST)}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[#0c377a] text-white py-3.5 px-6 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <LuTrophy className="w-4 h-4 text-accent" />
                Go to My Contests
                <LuArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                id="btn-success-explore-contests"
                name="btn_success_explore_contests"
                data-track="recharge_success_explore_contests"
                data-amount={amountPaid}
                onClick={() => navigate(ROUTES.CONTEST.CONTEST)}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[#0c377a] text-white py-3.5 px-6 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <LuTrophy className="w-4 h-4 text-accent" />
                Explore Contests
                <LuArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              id="btn-success-back-to-home"
              name="btn_success_back_to_home"
              data-track="success_page_back_to_home"
              onClick={() => navigate(ROUTES.HOME)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 py-3.5 px-6 font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              <LuHouse className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestSuccess;
