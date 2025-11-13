import { Modal } from "antd";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { setSupportModal } from "../../Store/Slices/DrawerSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { CONTACT } from "../../Constants";

const SupportModal = () => {
  const { isSupportModal } = useAppSelector((store) => store.drawer);
  const dispatch = useAppDispatch();

  const handleOk = () => dispatch(setSupportModal());

  return (
    <Modal centered open={isSupportModal} onCancel={handleOk} footer={null} className="feedback" width="600px">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="w-full !rounded-2xl overflow-hidden border border-gray-200 bg-input-box bg-cover bg-top">
          <div className="text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-2xl font-semibold">Support</h2>
          </div>

          <div className="p-3 sm:p-6 flex flex-col gap-6">
            <div className="bg-white rounded-lg p-3 sm:p-6">
              <ul className="grid grid-cols-1 gap-3 relative z-20">
                <li className="flex max-sm:flex-col justify-between border px-3 rounded-md cursor-pointer transition-colors duration-200 border-card-border hover:border-primary hover:text-primary">
                  <p className="font-bold text-base flex items-center uppercase py-3">
                    <div className="me-3 text-2xl">
                      <IoMdMail color="orange" />
                    </div>
                    Send Email
                  </p>
                  <a href={`mailto:${CONTACT?.EMAILHELP}`} className="font-bold text-sm flex items-end !text-gray-500 pb-2">
                    {CONTACT?.EMAILHELP}
                  </a>
                </li>
                <li className="flex max-sm:flex-col justify-between border px-3 rounded-md cursor-pointer transition-colors duration-200 border-card-border hover:border-primary hover:text-primary">
                  <p className="font-bold text-base flex items-center uppercase py-3">
                    <div className="me-3 text-2xl">
                      <IoIosCall color="limegreen" />
                    </div>
                    Make Call
                  </p>
                  <a href={`tel:${CONTACT?.NUMBER}`} className="font-bold text-sm flex items-end !text-gray-500 pb-2">
                    {CONTACT?.NUMBER}
                  </a>
                </li>
                <li className="flex max-sm:flex-col justify-between border px-3 rounded-md cursor-pointer transition-colors duration-200 border-card-border hover:border-primary hover:text-primary" onClick={() => window.open(`https://wa.me/${CONTACT?.NUMBER}`, "_blank")}>
                  <p className="font-bold text-base flex items-center uppercase py-3">
                    <div className="me-3 text-2xl">
                      <FaWhatsapp color="green" />
                    </div>
                    Chat With US
                  </p>
                  <span className="font-bold text-sm flex items-end !text-gray-500 pb-2">{CONTACT?.NUMBER}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SupportModal;
