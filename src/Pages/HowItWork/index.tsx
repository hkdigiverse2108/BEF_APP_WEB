import { URL_KEYS } from "../../Constants";
import type { HowItWorkApiResponse } from "../../Types";
import { useGetApiQuery } from "../../Api/CommonApi";
import { setModalVideoLink, setModalVideoPlay } from "../../Store/Slices/VideoModalSlice";
import { useAppDispatch } from "../../Store/hooks";

const HowItWork = () => {
  const { data: HowItWorkData } = useGetApiQuery<HowItWorkApiResponse>({ url: URL_KEYS.HOW_IT_WORK.ALL });

  const howItWork = HowItWorkData?.data.how_it_work_data;
  const dispatch = useAppDispatch();
  return (
    <section id="howItWork" className="pb-20 sm:pb-30 md:pb-40 lg:pb-55  container-p  ">
      <div className="how_it_works container bg-white rounded-2xl sm:p-4 py-9  " id="how_it_work">
        <div className="how_it_inner ">
          <div className="step_block max-lg:px-3 max-lg:overflow-hidden ">
            <ul>
              {howItWork?.map((step, i) => (
                <li className={`${i % 2 === 1 ? `even-step` : `odd-step`}  px-5 `} key={i}>
                  <div className="step_text px-0!" data-aos="fade-right">
                    <h4 className=" max-md:text-start max-sm:text-sm">{step.title}</h4>
                    <p className="max-md:text-start max-sm:text-sm">{step.description}</p>
                  </div>

                  <div className={`${i % 2 === 1 ? ` md:me-7` : `md:ms-7`} step_number `}>
                    <h3 className="mb-5">{String(i + 1).padStart(2, "0")}</h3>
                  </div>

                  <div className="step_img" data-aos="fade-left">
                    <div
                      onClick={() => {
                        dispatch(setModalVideoPlay(true));
                        dispatch(setModalVideoLink(step?.link));
                      }}
                      className="popup-youtube play-button"
                      data-toggle="modal"
                      data-target="#myModal"
                      title="Download & Sign Up with Referral Code"
                    >
                      <img src={`${step?.thumbnailImage}`} alt="image" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
