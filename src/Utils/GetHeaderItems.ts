import { ROUTES } from "../Constants";
import { useAppSelector } from "../Store/hooks";
import type { WorkshopItem } from "../Types";

export const getHeaderItems = () => {
  const workshop: WorkshopItem[] = useAppSelector(
    (state) => state.workshops.AllWorkshop
  );
  let workshopLink = ROUTES.WORKSHOP.WORKSHOP;

  if (workshop?.length === 1) {
    const id = workshop[0]?._id ?? "";
    workshopLink = ROUTES.WORKSHOP.DETAILS.replace(":id", id);
  }

  return [
    { link: ROUTES.HOME, text: "Home" },
    { link: ROUTES.CONTEST.MY_CONTEST, text: "My Contest" },
    {
      link: ROUTES.FULL_FEST_REPORT.FULL_FEST_REPORT,
      text: "Full Fest Report",
    },
    { link: ROUTES.REFERRAL.REFERRAL, text: "Referral" },
    { link: ROUTES.CONTEST.CONTEST_WINNERS, text: "Winner" },
    { link: workshopLink, text: "Workshop" },
    { link: ROUTES.COURSE.COURSE, text: "Course" },
    { link: ROUTES.CONTACT.CONTACT, text: "Contact" },
  ];
};
