import { FormButton } from "../../../Attribute/FormFields";
import { ImagePath } from "../../../Constants";

const ResultBanner = () => {
  return (
    <div
      className="w-full h-full rounded-2xl p-6 shadow-sm lg:flex-row bg-cover bg-center"
      style={{
        backgroundImage: `url(${ImagePath}result/Result-bg.jpg)`,
      }}
    >
      <div className="sm:w-90 h-full bg-white rounded-2xl text-center p-4">
        <h2 className="text-xl font-bold">Result</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-card-border py-4 my-5">
          <div>
            <h3 className="text-xl font-bold">60</h3>
            <span className="text-sm font-bold uppercase text-gray-500">MINS</span>
          </div>
          <div className=" max-sm:border-y sm:border-x border-card-border max-sm:py-2 max-sm:my-2">
            <h3 className="text-xl font-bold">100</h3>
            <span className="text-sm font-bold uppercase text-gray-500">marks</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">60</h3>
            <span className="text-sm font-bold uppercase text-gray-500">Questions</span>
          </div>
        </div>
        <FormButton text="view solution" className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe !bg-white !border !border-black" />
      </div>
    </div>
  );
};

export default ResultBanner;
