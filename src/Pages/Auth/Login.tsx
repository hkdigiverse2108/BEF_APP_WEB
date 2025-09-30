import { Form, Input, Select } from "antd";
const { Item } = Form;
const Login = () => {
    const [form] = Form.useForm();
    const handleFinish = () => {
        // TODO: integrate submit
    };
    return (
        <>
            <div className="min-h-screen bg-white relative overflow-hidden flex justify-center items-center">
                <div className="flex justify-between h-screen items-center w-full p-3">
                    <div className="relative hidden xl:block w-full h-full z-10 bg-bg-light border-2 border-primary-light rounded-2xl overflow-hidden">
                        <div className="w-full p-4 sm:p-8 lg:p-12 ">
                            <div className="z-20 text-center w-full top-10 2xl:top-14 flex flex-col gap-3 ">
                                <h1 className="font-bold text-[#060606] text-xl sm:text-2xl md:text-4xl xl:text-6xl leading-tight">
                                    Our Learning
                                    <br />
                                    Dashboard
                                </h1>
                                <p className="font-medium  text-xl leading-relaxed  mx-auto">Track your progress, get instant performance insights.</p>
                            </div>
                            <img className="w-full absolute left-0 top-0" alt="Group" src="/assets/images/auth/VecrorGroup.png" />
                            <figure className="absolute w-full flex justify-center bottom-30 left-0">
                                <img className="xl:w-lg 2xl:w-xl z-10" alt="Group" src="/assets/images/auth/LoginVectorBox.png" />
                            </figure>
                            <img className="w-full absolute left-0 -bottom-10" alt="Group" src="/assets/images/auth/OrangeFooter.png" />
                        </div>
                    </div>
                    <div className="z-10 w-full h-screen ">
                        <div className="flex flex-col w-full h-full items-center justify-center p-4 sm:p-8 lg:p-12">
                            <div className="w-full max-w-md space-y-8">
                                {/* Header */}
                                <header className="space-y-6 lg:space-y-8">
                                    <div className="space-y-3">
                                        <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-[#060606] text-center lg:text-left">Create an Account</h2>
                                        <p className="font-medium text-sm sm:text-base xl:text-sm text-[#060606] text-center lg:text-left opacity-80">Create an account or log in to explore about our website</p>
                                    </div>
                                </header>
                                <span className="border-t border-[#fe690b] flex w-full "></span>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleFinish}
                                    className="loginForm space-y-8 lg:space-y-10"
                                    initialValues={{
                                        firstName: "John",
                                        lastName: "John doe",
                                        gender: "Male",
                                        email: "admin123@gmail.com",
                                        city: "Surat",
                                        language: "English",
                                        referralCode: "BEF125",
                                        countryCode: "+91",
                                        phoneNumber: "00000 00000",
                                        attemptNumber: "01",
                                    }}
                                >
                                    <Form.Item label="PHONE NUMBER" className="LoginNumberSelect" required>
                                        <Input.Group compact>
                                            <Form.Item name="countryCode" noStyle rules={[{ required: true }]}>
                                                <Select
                                                    style={{ width: 100 }}
                                                    size="large"
                                                    options={[
                                                        { value: "+91", label: "+91" },
                                                        { value: "+1", label: "+1" },
                                                        { value: "+44", label: "+44" },
                                                    ]}
                                                />
                                            </Form.Item>
                                            <Form.Item name="phoneNumber" noStyle rules={[{ required: true }]}>
                                                <Input size="large" placeholder="00000 00000" style={{ width: "calc(100% - 100px)" }} />
                                            </Form.Item>
                                        </Input.Group>
                                    </Form.Item>
                                    <Item name="password" label="PASSWORD" rules={[{ required: true, min: 6 }]}>
                                        <Input.Password size="large" placeholder="Password" />
                                    </Item>
                                    <div className="text-center mb-4"></div>
                                </Form>
                                <span className="border-t border-[#fe690b] flex w-full "></span>
                                {/* Footer */}
                                <footer className="space-y-6 lg:space-y-8">
                                    <p className="text-center text-sm lg:text-base">
                                        <span className="font-medium text-[#060606]">ARE YOU NEW HERE? </span>
                                        <span className="font-bold text-[#fe690b] cursor-pointer hover:underline">SIGN UP</span>
                                    </p>
                                </footer>
                                {/* Actions */}
                                <div className="flex flex-col md:flex-row gap-3 lg:gap-4">
                                    <button type="button" className="loginFormButton ">
                                        LOGIN
                                    </button>
                                    <button type="button" className="loginFormButton ">
                                        SIGN IN
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute z-0 bottom-0 right-0">
                        <figure>
                            <img src="/assets/images/auth/FormLines.png" alt="" />
                        </figure>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;