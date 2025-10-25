import { useState } from "react";
import { CardHeader } from "../../Components/Common/CardHeader";
import { ImagePath, URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";
import type { HowToPlayApiResponse } from "../../Types";
import { Spin } from "antd";

const HowToPlay = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const openVideo = (link: string) => setActiveVideo(link);
  const { data: HowToPlayData, isLoading } = useGetApiQuery<HowToPlayApiResponse>({ url: URL_KEYS.HOW_TO_PLAY.ALL });

  return (
    <div className="sub-container pt-8">
      <CardHeader title="How To Play" />
      <section className="how_it_works" id="how_it_work">
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-100">
              <Spin size="large" />
            </div>
          ) : (
            <div className="how_it_inner">
              <div className="step_block">
                <ul>
                  {HowToPlayData?.data.how_to_play_data.map((step, i) => (
                    <li className={i % 2 === 1 ? `even-step` : `odd-step`}>
                      <div className={`step_text aos-init aos-animate capitalize ${i % 2 === 0 ? `text-right` : `text-left`}`} data-aos="fade-right" data-aos-duration={1500}>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                      <div className="step_number">
                        <h3>{String(i + 1).padStart(2, "0")}</h3>
                      </div>
                      <div className="step_img aos-init aos-animate" onClick={() => openVideo(step.link)} data-aos="fade-left" data-aos-duration={1500}>
                        <a className="popup-youtube play-button" data-toggle="modal" data-target="#myModal" title="Download & Sign Up with Referral Code">
                          <img src={step.image || `${ImagePath}howToPlay/how1.jpg`} alt="image" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
                {activeVideo && (
                  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setActiveVideo(null)}>
                    <div className="bg-black rounded-lg overflow-hidden w-[90%] md:w-[800px] aspect-video" onClick={(e) => e.stopPropagation()}>
                      <iframe width="100%" height="100%" src={`${activeVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HowToPlay;
