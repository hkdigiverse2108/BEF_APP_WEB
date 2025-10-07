import { Tabs } from "antd";
import { BsFillAlarmFill } from "react-icons/bs";
import { FormButton } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import ContestCard from "../../Components/Contest/ContestCard";
import MyContestCard from "../../Components/Contest/MyContestCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";

const Contest = () => {
  const { data: ClassesData } = useGetApiQuery({
    url: `${URL_KEYS.CONTEST.ALL}?page=1&limit=10`,
  });

  const classes = ClassesData?.data.contest_data;

  console.log(classes);

  const onChange = (key: string) => {
    console.log(key);
  };

  const ContestCards = () => {
    return (
      <div className="flex flex-col gap-6">
        <CardHeader
          title="GK Showdown"
          icon={<BsFillAlarmFill />}
          time="25 Min 10s Left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <MyContestCard />
          <ContestCard />
          <ContestCard />
          <ContestCard />
        </div>
      </div>
    );
  };

  return (
    <div className="sub-container">
      <div className=" mt-12">
        <Tabs
          className="bg-amber-"
          onChange={onChange}
          type="card"
          items={[
            {
              key: "Contest",
              label: "Contests",
              children: (
                <>
                  <ContestCards />
                </>
              ),
            },
            {
              key: "My-Contest",
              label: "My Contest",
              children: (
                <>
                  <h1>2</h1>
                  <ContestCards />
                </>
              ),
            },
          ]}
        />
      </div>
      <div className=" mt-6">
        <div className="w-full flex justify-center">
          <FormButton
            text="View More"
            className="custom-button button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe"
            onClick={() => console.log("view More")}
          />
        </div>
      </div>
    </div>
  );
};

export default Contest;
