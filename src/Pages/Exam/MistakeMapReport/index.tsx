import { Empty } from "antd";
import { CardHeader } from "../../../Components/Common/CardHeader";
import { ImagePath } from "../../../Constants";

const MistakeMapReport = () => {
  const compare = [
    {
      title: "Silly Mistakes",
      color: "bg-danger-dark",
      value: 2,
      items: [
        { items: "You -------------------------------------------------------------------------------------------------------------------------------------", value: "20" },
        { items: "Others", value: "30" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
        { items: "Toppers", value: "40" },
      ],
    },
    {
      title: "Concept Mistakes",
      color: "bg-danger",
      value: 2,
      items: [
        { items: "You", value: "20" },
        { items: "Others", value: "30" },
        { items: "Toppers", value: "40" },
      ],
    },
    {
      title: "Revision Mistakes",
      color: "bg-warning",
      value: 2,
      items: [
        { items: "You", value: "20" },
        { items: "Others", value: "30" },
        { items: "Toppers", value: "40" },
      ],
    },
    {
      title: "Out of Material",
      color: "bg-success",
      value: 2,
      items: [
        { items: "You", value: "20" },
        { items: "Others", value: "30" },
        { items: "Toppers", value: "40" },
      ],
    },
    {
      title: "Current Affiars Not Read",
      color: "bg-success-light",
      value: 2,
      items: [],
    },
  ];

  const OverviewCard: React.FC<{ img: React.ReactNode; label: string; value: string; subValue?: string }> = ({ img, label, value, subValue }) => (
    <div className="max-sm:py-3 sm:p-3 w-full sm:w-1/2  xl:w-1/3">
      <div className="h-full relative bg-input-box rounded-xl p-7 flex items-center gap-6">
        <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0" />
        <div>
          <img className="object-cover w-15 max-sm:w-10" src={`${ImagePath}${img}`} />
        </div>
        <div className="text-left">
          <p className="text-base font-bold mt-1 uppercase">{label}</p>
          <h3 className="text-xl font-extrabold">
            {value} / {subValue && <span className="text-base text-neutral-500">{subValue}</span>}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="sub-container pt-4 md:pt-8 result">
      <CardHeader title="Mistake Map Report" />
      <p className="text-base font-semibold">
        Please, first fill <span className="text-primary">Why false</span> Reason in Each question...
      </p>
      <span className="border-t border-card-border flex w-full my-4 " />
      <section className="flex flex-wrap justify-center">
        <OverviewCard img={"mistakeMap/Incorrect.png"} label="Total incorrect" value="53.3" subValue={"100 Marks"} />
        <OverviewCard img={"mistakeMap/Fear-driver-skip-incorrect.png"} label="Total Fear Driver Skip incorrect" value="10" subValue={"100 Marks"} />
        <OverviewCard img={"mistakeMap/MistakeMapped.png"} label="Mistake mapped" value="30" subValue={"100 Marks"} />
      </section>
      <div className="pt-3">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 w-full">
          {compare.map(({ title, color, items, value }, i) => (
            <div key={i} className="rounded-lg shadow-lg">
              <div className={`${color} px-4 py-2 rounded-t-lg text-lg text-white flex justify-between capitalize`}>
                <h3>{title}</h3>
                <p>{value}</p>
              </div>
              <div className="rounded-b-lg overflow-hidden">
                <ul className="list-disc space-y-2 h-100 max-h-100 overflow-y-auto overflow-x-hidden">
                  {items.map((item, j) => (
                    <li key={j} className="flex justify-between w-full border-b border-card-border p-3 sm:px-4 m-0">
                      <span>{item.items}</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                  {items.length === 0 && (
                    <li className="flex justify-center items-center h-100 w-full p-3 sm:px-4">
                      <Empty />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MistakeMapReport;
