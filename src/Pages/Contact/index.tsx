import { Form } from "antd";
import { FaRoute } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { usePostApiMutation } from "../../Api/CommonApi";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { CONTACT, HTTP_STATUS, URL_KEYS } from "../../Constants";
import type { ContactFormData } from "../../Types";

const Contact = () => {
  const [form] = Form.useForm();
  const [PostApi] = usePostApiMutation({});

  const onFinish = async (values: ContactFormData) => {
    try {
      const res = await PostApi({ url: URL_KEYS.CONTACT_US.ADD, data: values }).unwrap();
      if (res?.status === HTTP_STATUS.OK) {
        form.resetFields();
      }
    } catch (error) {
      const err = error as { data: { message: string } };
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
      <section id="contact" className="flex justify-center">
        <div className="flex flex-col lg:flex-row justify-center gap-12 lg:gap-24 items-center !overflow-hidden py-10  rounded-2xl w-[1240px]">
          <div className="bg-white transition-all duration-100 rounded-2xl p-5 sm:p-10 w-full max-w-lg border border-card-border">
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
              <FormInput name="website" placeholder="website*" rules={[{ required: true, message: "Please enter your name" }]} />
              <FormInput name="message" placeholder="Your message*" type="textArea" rules={[{ required: true, message: "Please enter your message" }]} />
              <FormButton htmlType="submit" text="submit" className="custom-button button button--mimas w-full !h-auto" />
            </Form>
          </div>
          <div className="max-w-xl">
            <div className="flex flex-col gap-4 justify-between h-full">
              <div className="h-full relative bg-input-box rounded-xl p-7 flex max-sm:flex-col max-sm:justify-center items-center gap-6">
                <div className="w-1 h-[60%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
                <div>
                  <IoCallSharp className="text-5xl text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold">Emergency Number</h3>
                  <p className="text-base font-normal mt-1 text-neutral-500">{CONTACT?.NUMBER}</p>
                </div>
              </div>
              <div className="h-full relative bg-input-box rounded-xl p-7 flex max-sm:flex-col max-sm:justify-center items-center gap-6">
                <div className="w-1 h-[60%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
                <div>
                  <MdEmail className="text-5xl text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold">Email Address</h3>
                  <p className="text-base font-normal mt-1 text-neutral-500">{CONTACT?.EMAILHELP}</p>
                  <p className="text-base font-normal mt-1 text-neutral-500">{CONTACT?.EMAILINFO}</p>
                  <p className="text-base font-normal mt-1 text-neutral-500">{CONTACT?.EMAILSALES}</p>
                </div>
              </div>
              <div className="h-full relative bg-input-box rounded-xl p-7 flex max-sm:flex-col max-sm:justify-center items-center gap-6">
                <div className="w-1 h-[60%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
                <div>
                  <FaRoute className="text-5xl text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold">Address</h3>
                  <p className="text-base font-normal mt-1 text-neutral-500">{CONTACT?.ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
