import { Form } from "antd";
import { FaRoute } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { usePostApiMutation } from "../../Api/CommonApi";
import type { ContactFormData } from "../../Types";
import { HTTP_STATUS, URL_KEYS } from "../../Constants";

const Contact = () => {
  const [form] = Form.useForm();
  const [PostApi, { isLoading }] = usePostApiMutation({});

  const onFinish = async (values: ContactFormData) => {
    try {
      const res = await PostApi({ url: URL_KEYS.CONTACT_US.ADD, data: values }).unwrap();
      if (res?.status === HTTP_STATUS.OK) {
        form.resetFields();
      }
      console.log(res);
    } catch (error) {
      console.error(error);
      const err = error as { data: { message: string } };
      console.log("test", err.data.message);
      form.setFields([
        {
          name: "message",
          errors: [err.data.message],
        },
      ]);
    }
  };
  return (
    <div className="sub-container">
      <div className="flex justify-between items-center py-2 md:py-5">
        <CardHeader title="Contact" />
      </div>
      <hr className="text-card-border mb-5" />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-content-center">
        <div className="h-full relative bg-input-box rounded-xl p-7 flex max-sm:flex-col max-sm:justify-center items-center gap-6">
          <div className="w-1 h-[60%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
          <div>
            <FaRoute className="text-5xl text-primary" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-extrabold">Address</h3>
            <p className="text-base font-bold mt-1 uppercase">S-251 Angle Business Center-2, Mota Varachha, Surat, Gujrat, India-394101</p>
          </div>
        </div>
        <div className="h-full relative bg-input-box rounded-xl p-7 flex max-sm:flex-col max-sm:justify-center items-center gap-6">
          <div className="w-1 h-[60%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
          <div>
            <MdEmail className="text-5xl text-primary" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-extrabold">Email Address</h3>
            <p className="text-base font-bold mt-1 uppercase">help@bharatexamfest.com</p>
          </div>
        </div>
        <div className="h-full relative bg-input-box rounded-xl p-7 flex max-sm:flex-col max-sm:justify-center items-center gap-6">
          <div className="w-1 h-[60%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
          <div>
            <IoCallSharp className="text-5xl text-primary" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-extrabold">Emergency Number</h3>
            <p className="text-base font-bold mt-1 uppercase">+91 91063 60330</p>
          </div>
        </div>
      </div> */}
      <section id="contact" className="flex justify-center">
        <div className="flex flex-col lg:flex-row justify-center gap-12 lg:gap-24 items-center !overflow-hidden py-10  rounded-2xl w-[1240px] sm:shadow-lg">
          <div className="bg-white shadow-lg transition-all duration-100 rounded-2xl p-5 sm:p-10 w-full max-w-lg border border-card-border">
            <Form layout="vertical" form={form} onFinish={onFinish} className="space-y-4">
              <FormInput name="name" placeholder="name*" rules={[{ required: true, message: "Please enter your name" }]} />
              <FormInput
                name="email"
                placeholder="email*"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              />
              <FormInput name="company" placeholder="Company Name*" rules={[{ required: true, message: "Please enter Company Name" }]} />
              <FormInput
                name="phone"
                placeholder="Phone*"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  { len: 10, message: "Phone number must be 10 digits" },
                ]}
              />
              <FormInput name="website" placeholder="website*" rules={[{ required: true, message: "Please enter your name" }]}/>
              <FormInput name="message" placeholder="Your message*" type="textArea" rules={[{ required: true, message: "Please enter your message" }]}/>
              <FormButton htmlType="submit" text="submit" className="custom-button button button--mimas w-full !h-auto" />
            </Form>
          </div>
          <div className="max-w-lg ">
            <h2 className="text-2xl md:text-5xl font-bold text-primary my-6">Have any question?</h2>
            <ul className="space-y-6 md:space-y-12">
              <li className="flex items-start gap-4">
                <div className="border border-primary/15 rounded-full p-4">
                  <FaRoute className="text-2xl text-primary" />
                </div>
                <div>
                  <span className="font-bold block text-lg lg:text-2xl text-primary">Email Us</span>
                  <Link to="" className="block max-sm:text-sm text-gray-600 hover:text-primary">
                    Student: help@bharatexamfest.com
                  </Link>
                  <Link to="" className="block max-sm:text-sm text-gray-600 hover:text-primary">
                    Know More: info@bharatexamfest.com
                  </Link>
                  <Link to="" className="block max-sm:text-sm text-gray-600 hover:text-primary">
                    Institute: sales@bharatexamfest.com
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="border border-primary/15 rounded-full p-4">
                  <MdEmail className="text-2xl text-primary" />
                </div>
                <div>
                  <span className="font-bold block text-lg lg:text-2xl text-primary">Call Us</span>
                  <Link to="tel:+919106360330" className="max-sm:text-sm text-gray-600 hover:text-primary">
                    +91 91063 60330
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="border border-primary/15 rounded-full p-4">
                  <IoCallSharp className="text-2xl text-primary" />
                </div>
                <div>
                  <span className="font-bold block text-lg lg:text-2xl text-primary">Visit Us</span>
                  <p className="max-sm:text-sm text-gray-600">S-251 Angle Business Center-2, Mota Varachha, Surat, Gujarat, India-394101</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
