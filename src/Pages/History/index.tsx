import { Empty, Select, Skeleton } from "antd";
import { useState } from "react";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import { URL_KEYS } from "../../Constants";
import { HistoryOptions } from "../../Data";
import type { HistoryApiResponse } from "../../Types";
import { FormatDateTime } from "../../Utils";

const History = () => {
  const [isHistory, setHistory] = useState("");
  const { data, isLoading } = useGetApiQuery<HistoryApiResponse>({ url: `${URL_KEYS.TRANSACTION.ALL}?page=1&limit=1000&transactionTypeFilter=${isHistory}` });
  const HistoryData = data?.data?.transaction_data || [];
  return (
    <div className="sub-container pt-4 question-section">
      <CardHeader title="Transaction History" />
      <hr className="text-card-border my-4" />
      <div className="bg-input-box rounded-xl p-3 sm:p-6 mt-5">
        <div className="bg-white rounded-xl p-3 sm:p-5">
          <div className="w-full flex justify-end mb-3">
            <Select defaultValue="All History" size="large" allowClear onChange={(e) => setHistory(e)} options={HistoryOptions} />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[...Array(10)].map((_, i) => (
                <Skeleton.Node key={i} active style={{ width: "100%", height: 60, borderRadius: 5 }} />
              ))}
            </div>
          ) : HistoryData?.length !== 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {HistoryData?.map((item, index) => (
                <div key={index} className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
                  <div className="flex justify-between items-center gap-3">
                    <div className="bg-white rounded-xl w-10 h-10 flex justify-center items-center">{item?.transactionType === "withdraw" ? <BsGraphDownArrow className="text-lg" /> : <BsGraphUpArrow className="text-lg" />}</div>
                    <div>
                      <span className="text-md font-bold capitalize">{item?.title}</span>
                      <p className="capitalize flex text-xs">{FormatDateTime(item?.createdAt)}</p>
                    </div>
                  </div>
                  <div className="">
                    <p className={`text-base font-bold ${item?.transactionType === "withdraw" ? "text-danger" : "text-success"}`}>
                      {item?.transactionType === "withdraw" ? "-" : "+"} ₹{item?.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="">
              <Empty />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
