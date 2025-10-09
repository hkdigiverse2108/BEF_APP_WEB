import { Drawer } from "antd";
import { FormButton } from "../../../Attribute/FormFields";
import { ImagePath } from "../../../Constants";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { setEndTestDrawer } from "../../../Store/Slices/DrawerSlice";

const EndTestDrawer = () => {
  const dispatch = useAppDispatch();
  const { isEndTestDrawer } = useAppSelector((state) => state.drawer);

  return (
    <Drawer placement="right" size="large" onClose={() => dispatch(setEndTestDrawer())} open={isEndTestDrawer} className="!p-0">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="rounded-lg overflow-hidden shadow-2xl bg-white bg-cover bg-top" style={{ backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)` }}>
          {/* Header */}
          <div className="text-white text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-2xl font-semibold">Want to End the Test ?</h2>
            <p className="mt-2 text-white text-sm">No Changes would be allowed after submission.</p>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-6">
            <div className="space-y-3">
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 place-items-center">
                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-4 border-2 border-gray-200">
                  <img className="object-cover w-15 max-sm:w-10" src={`${ImagePath}question/Total.png`} />
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black">Total Questions</h3>
                    <p className="text-xl font-bold text-left">50</p>
                  </div>
                </div>

                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-3 border-2 border-gray-200">
                  <img className="object-cover w-15 max-sm:w-10" src={`${ImagePath}question/Answered.png`} />
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black">Answered</h3>
                    <p className="text-xl font-bold text-left">50</p>
                  </div>
                </div>
                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-3 border-2 border-gray-200">
                  <img className="object-cover w-15 max-sm:w-10" src={`${ImagePath}question/Not-answered.png`} />
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black">Not Answered</h3>
                    <p className="text-xl font-bold text-left">50</p>
                  </div>
                </div>
                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-3 border-2 border-gray-200">
                  <img className="object-cover w-15 max-sm:w-10" src={`${ImagePath}question/Not-visited.png`} />
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black">Not Visited</h3>
                    <p className="text-xl font-bold text-left">50</p>
                  </div>
                </div>
              </div>
              <div className="grid !gap-3 grid-cols-1 sm:grid-cols-2 mt-10">
                <FormButton text="Resume" className="custom-button light button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe !bg-black !border !border-black" />
                <FormButton text="JOIN CONTEST" className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe !bg-white !border !border-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default EndTestDrawer;
