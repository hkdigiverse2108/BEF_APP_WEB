import { Form } from "antd";
import { FaRoute } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { usePostApiMutation } from "../../Api/CommonApi";
import { FormButton, FormInput } from "../../Attribute/FormFields";
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
      <div className="border-b-2 border-primary pb-5">
        <p className="mb-2 text-xs sm:text-sm font-medium text-accent">Support centre</p>
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Contact</h1>
      </div>
      <section id="contact" className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 py-8 sm:py-10 w-full max-w-5xl">
          <div className="rounded-xl bg-gradient-to-r from-primary to-accent p-px shadow-box-shadow">
            <div className="h-full rounded-xl bg-card p-6 md:p-10">
              <div className="mb-6 sm:mb-7">
                <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Send us a message</h2>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Share your query and our Achiwon team will get back to you.</p>
              </div>
              <Form layout="vertical" form={form} onFinish={onFinish} className="space-y-4">
                <FormInput name="name" placeholder="Name*" rules={[{ required: true, message: "Please enter your name" }]} />
                <FormInput
                  name="email"
                  placeholder="Email*"
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
                <FormInput name="website" placeholder="Website*" rules={[{ required: true, message: "Please enter your name" }]} />
                <FormInput name="message" placeholder="Your message*" type="textArea" rules={[{ required: true, message: "Please enter your message" }]} />
                <FormButton htmlType="submit" text="SUBMIT" className="bef-btn-primary w-full uppercase" />
              </Form>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-4 sm:gap-5 justify-between h-full">
              <div className="bef-card p-6">
                <div className="flex items-center gap-4 sm:gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <IoCallSharp className="text-2xl text-primary" />
                  </span>
                  <div className="min-w-0 text-center sm:text-left">
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">Emergency Number</h3>
                    <p className="text-xs sm:text-sm font-normal mt-1 text-muted-foreground">{CONTACT?.NUMBER}</p>
                  </div>
                </div>
              </div>
              <div className="bef-card p-6">
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <MdEmail className="text-2xl text-primary" />
                  </span>
                  <div className="min-w-0 text-center sm:text-left">
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">Email Address</h3>
                    <p className="text-xs sm:text-sm font-normal mt-1 text-muted-foreground break-all">{CONTACT?.EMAILHELP}</p>
                    <p className="text-xs sm:text-sm font-normal mt-1 text-muted-foreground break-all">{CONTACT?.EMAILINFO}</p>
                    <p className="text-xs sm:text-sm font-normal mt-1 text-muted-foreground break-all">{CONTACT?.EMAILSALES}</p>
                  </div>
                </div>
              </div>
              <div className="bef-card p-6">
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <FaRoute className="text-2xl text-primary" />
                  </span>
                  <div className="min-w-0 text-center sm:text-left">
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">Address</h3>
                    <p className="text-xs sm:text-sm font-normal mt-1 text-muted-foreground">{CONTACT?.ADDRESS}</p>
                  </div>
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
