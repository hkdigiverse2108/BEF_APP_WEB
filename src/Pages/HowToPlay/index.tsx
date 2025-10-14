import { useState } from "react";
import { CardHeader } from "../../Components/Common/CardHeader";
import { ImagePath } from "../../Constants";

interface Step {
  title: string;
  description: string;
  youtube_link: string;
  thumbnail_image: string;
}

const steps: Step[] = [
  {
    title: "Download & Sign Up with Referral Code",
    description: "Start your journey by downloading the Bharat Exam Fest app, available for both Android and Apple devices. Use a referral code during sign-up to access exclusive benefits and start your journey!",
    youtube_link: "https://www.youtube.com/watch?v=abcdef",
    thumbnail_image: "how1.jpg",
  },
  {
    title: "Step Two: Complete Your Profile",
    description: "Fill in your details and academic background to receive personalized scholarship recommendations.",
    youtube_link: "https://www.youtube.com/watch?v=abcdef",
    thumbnail_image: "how1.jpg",
  },
  {
    title: "Step Three: Apply Easily",
    description: "Browse, select, and apply to scholarships directly from your dashboard with one click.",
    youtube_link: "https://www.youtube.com/watch?v=abcdef",
    thumbnail_image: "how1.jpg",
  },
  {
    title: "Download & Sign Up with Referral Code",
    description: "Start your journey by downloading the Bharat Exam Fest app, available for both Android and Apple devices. Use a referral code during sign-up to access exclusive benefits and start your journey!",
    youtube_link: "https://www.youtube.com/watch?v=abcdef",
    thumbnail_image: "how1.jpg",
  },
  {
    title: "Step Two: Complete Your Profile",
    description: "Fill in your details and academic background to receive personalized scholarship recommendations.",
    youtube_link: "https://www.youtube.com/watch?v=abcdef",
    thumbnail_image: "how1.jpg",
  },
  {
    title: "Step Three: Apply Easily",
    description: "Browse, select, and apply to scholarships directly from your dashboard with one click.",
    youtube_link: "https://www.youtube.com/watch?v=abcdef",
    thumbnail_image: "how1.jpg",
  },
];

const HowToPlay = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const openVideo = (link: string) => setActiveVideo(link);

  return (
    <div className="sub-container pt-8">
      <CardHeader title="How It Works" />
      <section className="how_it_works" id="how_it_work">
        <div>
          <div className="how_it_inner">
            <div className="step_block">
              <ul>
                {steps.map((step, i) => (
                  <li className={i % 2 === 1 ? `even-step` : `odd-step`}>
                    <div className="step_text aos-init aos-animate" data-aos="fade-right" data-aos-duration={1500}>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                    <div className="step_number">
                      <h3>{String(i + 1).padStart(2, "0")}</h3>
                    </div>
                    <div className="step_img aos-init aos-animate" onClick={() => openVideo(step.youtube_link)} data-aos="fade-left" data-aos-duration={1500}>
                      <a className="popup-youtube play-button"  data-toggle="modal" data-target="#myModal" title="Download & Sign Up with Referral Code">
                        <img src={`${ImagePath}howToPlay/${step.thumbnail_image}`} alt="image" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              {activeVideo && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setActiveVideo(null)}>
                  <div className="bg-black rounded-lg overflow-hidden w-[90%] md:w-[800px] aspect-video" onClick={(e) => e.stopPropagation()}>
                    <iframe width="100%" height="100%" src={`${activeVideo}?autoplay=1&mute=1`} title="YouTube video player" allow="autoplay; encrypted-media"></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToPlay;
