import { useEffect, type FC } from "react";
import { FaAward } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { HiCheckBadge } from "react-icons/hi2";
import { IoMdTrophy } from "react-icons/io";
import { PiBookOpenUserFill } from "react-icons/pi";
import type { MyWinningListType } from "../../Types";
import { useAppDispatch } from "../../Store/hooks";
import { setFullFestSubjectFilter } from "../../Store/Slices/FilterSlice";
import { Empty, Skeleton } from "antd";

const MyWinning: FC<{ MyWinningData: MyWinningListType; tabIndex: number; isLoading: boolean }> = ({ MyWinningData, tabIndex, isLoading }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tabIndex === 0) dispatch(setFullFestSubjectFilter(""));
  }, [dispatch, tabIndex]);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">My Winning</h2>
          </div>
          <div className="w-full skeleton">
            {isLoading ? (
              <Skeleton.Node active style={{ width: "100%", height: 140, borderRadius: 12 }} />
            ) : (
              <div className="bef-card">
                <div className="bef-card-strip" />
                <div className="p-6 sm:p-7 flex flex-col justify-center items-center gap-2 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <GiWallet className="text-3xl text-primary" />
                  </span>
                  <p className="text-xs font-bold tracking-wide text-muted-foreground mt-3 uppercase">Total Winning</p>
                  <h3 className="font-heading text-4xl font-bold text-primary">₹{MyWinningData?.totalWinning || 0}</h3>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">Previous Contest</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {isLoading ? (
               [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 140, borderRadius: 12 }} />)
            ) : (MyWinningData?.contests?.length || 0) > 0 ? (
              MyWinningData?.contests?.map((referral, index) => (
                <div key={index} className="bef-card overflow-hidden">
                  <div className="py-3 px-5 bg-gradient-to-r from-primary to-tertiary">
                    <h3 className="text-white font-heading font-bold text-base sm:text-lg truncate">{referral.contestName}</h3>
                  </div>
                  <div className="p-4 bg-card">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold tracking-wide text-muted-foreground uppercase">Total Win</span>
                      <span className="font-heading text-2xl font-bold text-primary">₹ {referral.totalWin}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground border-y border-border py-3">
                      <PiBookOpenUserFill className="shrink-0 text-primary" />
                      <span className="truncate">{referral.subject}</span>
                    </div>
                  </div>
                  <div className="border-t border-border px-4 sm:px-5 py-3">
                    <div className=" flex items-center text-[11px] sm:text-xs font-semibold text-muted-foreground justify-center gap-2 sm:gap-4">
                      {referral?.ranks[0]?.price && referral?.ranks[0]?.price !== 0 && (
                        <>
                          <section className="flex gap-1.5 items-center">
                            <FaAward className="text-primary" />
                            <span>₹ {referral?.ranks[0]?.price}</span>
                          </section>
                          <span className="h-3 border-l border-border"></span>
                        </>
                      )}
                      {referral.winnerPercentage ? (
                        <>
                          <section className="flex gap-1.5 items-center">
                            <IoMdTrophy className="text-primary" />
                            <span>{referral.winnerPercentage || 0}%</span>
                          </section>
                          <span className="h-3 border-l border-border"></span>
                        </>
                      ) : (
                        ""
                      )}
                      <section className="flex gap-1.5 items-center ">
                        <HiCheckBadge className="text-primary" />
                        <span>Flexible</span>
                      </section>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full sm:col-span-2 py-10">
                <Empty description="No winnings yet. Play a contest to earn rewards." />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWinning;
