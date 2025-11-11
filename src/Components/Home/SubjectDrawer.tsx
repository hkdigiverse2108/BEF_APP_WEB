import { Drawer } from "antd";
import { ImagePath, ROUTES, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { useGetApiQuery } from "../../Api/CommonApi";
import { NavLink } from "react-router-dom";
import type { Subject, SubjectApiResponse } from "../../Types";
import { Storage } from "../../Utils";

const SubjectDrawer = () => {
  const dispatch = useAppDispatch();
  const { isSubjectDrawer } = useAppSelector((state) => state.drawer);

  const { data: SubjectData, isLoading } = useGetApiQuery<SubjectApiResponse>(
    {
      url: `${URL_KEYS.SUBJECT.ALL}?page=1&limit=100&classesFilter=${isSubjectDrawer.id}`,
    },
    {
      skip: !isSubjectDrawer.id,
    }
  );

  const Subjects: Subject[] = SubjectData?.data.subject_data;

  const handleSubjectClick = (subject: Subject) => {
    Storage.setItem(
      STORAGE_KEYS.CONTEST_QA,
      JSON.stringify({
        classesId: isSubjectDrawer.id,
        subjectId: subject._id,
      })
    );
    dispatch(setSubjectDrawer({ open: false }));
  };
  
  return (
    <Drawer
      title="Explore Topics"
      placement="right"
      loading={isLoading}
      size={"large"}
      onClose={() => dispatch(setSubjectDrawer({ open: false }))}
      open={isSubjectDrawer.open}
      className="text-theme"
    >
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 place-items-center">
        {Subjects?.map((subject, i) => (
          <NavLink
            key={i}
            to={ROUTES.CONTEST.CONTEST}
            state={subject._id}
            className="flex flex-row max-sm:flex-col items-center !bg-input-box gap-4 max-sm:gap-0 w-full h-full rounded-xl p-3 border border-box-border hover:border-theme shadow-neutral-400 hover:shadow-sm"
            onClick={() => handleSubjectClick(subject)}
          >
            <img
              className="object-cover w-14 max-sm:w-14 rounded-full border-2 border-white"
              src={subject.image || `${ImagePath}contest/ContestIcon.png`}
            />
            <div className="grid gap-1 w-full">
              <h3 className="text-xl max-sm:text-center text-left font-medium tracking-tight text-theme">
                {subject.name}
              </h3>
            </div>
          </NavLink>
        ))}
      </div>
    </Drawer>
  );
};

export default SubjectDrawer;
