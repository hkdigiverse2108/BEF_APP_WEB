import { Form, Input, Select } from "antd";

const { Item } = Form;
const { Option } = Select;

const Login = () => {

    const [form] = Form.useForm()
    const handleFinish = () => {
        // TODO: integrate submit
    }
    const selectBefore = (
        <Select defaultValue="http://">
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    return (
        <>
            <div className=" w-screen p-4 bg-white relative overflow-hidden flex justify-center items-center">
                <div className="flex justify-between w-full h-full items-center">

                    {/* Left side */}
                    <div className="hidden xl:block w-full h-full z-10">
                        <div className="relative w-full !h-[90vh] ">
                            {/* <div className="absolute z-20 text-center w-full top-10 2xl:top-14 flex flex-col gap-3">
                                <h1 className="font-bold text-[#060606] text-xl sm:text-2xl md:text-4xl xl:text-6xl leading-tight">
                                    Our Learning <br /> Dashboard
                                </h1>
                                <p className="font-medium text-xl leading-relaxed max-w-md mx-auto">
                                    Track your progress, get instant performance insights.
                                </p>
                            </div> */}
                            <img alt="Group" src="/assets/images/auth/LoginPageImage.png" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="z-10 w-full h-full flex flex-col justify-center p-4 sm:p-8 lg:p-12">
                        <div className="w-full space-y-8">
                            {/* <div className=" z-10 w-full h-full "> */}
                            {/* <div className="flex flex-col w-full items-center justify-center p-4 sm:p-8 lg:p-12"> */}
                            <div className="w-full max-w-md space-y-8">
                                {/* Header */}
                                <header className="space-y-6 lg:space-y-8">
                                    <div className="space-y-3">
                                        <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-[#060606] text-center lg:text-left">Create an Account</h2>
                                        <p className="font-medium text-sm sm:text-base xl:text-sm text-[#060606] text-center lg:text-left opacity-80">Create an account or log in to explore about our website</p>
                                    </div>
                                </header>
                                <span className="border-t border-[#fe690b] flex w-full " ></span>
                
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleFinish}
                                    className="loginForm space-y-8 lg:space-y-10"
                                    initialValues={{
                                        firstName: 'John', lastName: 'John doe', gender: 'Male', email: 'admin123@gmail.com', city: 'Surat', language: 'English', referralCode: 'BEF125', countryCode: '+91', phoneNumber: '00000 00000', attemptNumber: '01'
                                    }}
                                >
                                    <Form.Item label="PHONE NUMBER" className="LoginNumberSelect" required>
                                        <Input.Group compact>
                                            <Form.Item name="countryCode" noStyle rules={[{ required: true }]}>
                                                <Select style={{ width: 100 }} size="large" options={[{ value: '+91', label: '+91' }, { value: '+1', label: '+1' }, { value: '+44', label: '+44' }]} />
                                            </Form.Item>
                                            <Form.Item name="phoneNumber" noStyle rules={[{ required: true }]}>
                                                <Input size="large" placeholder="00000 00000" style={{ width: 'calc(100% - 100px)' }} />
                                            </Form.Item>
                                        </Input.Group>
                                    </Form.Item>

                                    <Item name="password" label="PASSWORD" rules={[{ required: true, min: 6 }]}>
                                        <Input.Password size="large" placeholder="Password" />
                                    </Item>
                                    <div className="text-center mb-4">
                                        {/* <Text type="secondary">
                                            ALREADY HAVE AN ACCOUNT?{' '}
                                            <Link to={ROUTES.AUTH.LOGIN} className="text-orange-500 font-bold hover:underline">SIGN IN</Link>
                                        </Text> */}
                                    </div>
                                    {/* <Button type="primary" htmlType="submit" size="large" block>
                                        SIGN UP NOW
                                    </Button> */}
                                </Form>
                                {/* <Form
                                    // layout={formLayout}
                                    form={form}
                                    layout="vertical"
                                    // initialValues={{ layout: formLayout }}
                                    // onValuesChange={onFormLayoutChange}
                                    // style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
                                    className="loginForm space-y-8 lg:space-y-10"
                                >
                                    <Item label="PHONE NUMBER" >
                                        <Input addonBefore={selectBefore} defaultValue="mysite" className="!p-1 bg-amber-50 !rounded-2xl " />
                                    </Item>

                                </Form> */}
                                <span className="border-t border-[#fe690b] flex w-full " ></span>

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
                            {/* </div> */}
                            {/* </div> */}
                        </div>
                    </div>

                    {/* Background lines */}
                    <div className="absolute z-0 bottom-0 right-0">
                        <img src="/assets/images/auth/FormLines.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="min-h-screen p-4 bg-white relative overflow-hidden flex justify-center items-center">
                <div className=" flex justify-between h-full items-center ">
                    <div className=" hidden xl:block  w-full h-full  z-10">
                        <div className="relative">
                            <div className="absolute z-20 text-center  w-full top-10 2xl:top-14 flex flex-col gap-3 ">
                                <h1 className="font-bold text-[#060606] text-xl sm:text-2xl md:text-4xl xl:text-6xl leading-tight">
                                    Our Learning
                                    <br />
                                    Dashboard
                                </h1>
                                <p className="font-medium text-xl leading-relaxed max-w-md mx-auto">Track your progress, get instant performance insights.</p>
                            </div>

                            <img className="" alt="Group" src="/assets/images/auth/LoginFrame.png" />
                        </div>

                    </div>
                    <div className=" z-10 w-full h-full ">
                        <div className="flex flex-col w-full items-center justify-center p-4 sm:p-8 lg:p-12">
                            <div className="w-full max-w-md space-y-8">
                                {/* Header */}
                                <header className="space-y-6 lg:space-y-8">
                                    <div className="space-y-3">
                                        <h2 className="font-bold text-2xl sm:text-3xl xl:text-3xl text-[#060606] text-center lg:text-left">Create an Account</h2>
                                        <p className="font-medium text-sm sm:text-base xl:text-sm text-[#060606] text-center lg:text-left opacity-80">Create an account or log in to explore about our website</p>
                                    </div>
                                </header>
                                <span className="border-t border-[#fe690b] flex w-full " ></span>
                                {/* Form */}
                                {/* <form className="space-y-8 lg:space-y-10">
                                    Phone Number */}
                                {/* <div className="space-y-3">
                                        <span className="font-medium text-[#060606] text-sm lg:text-base uppercase tracking-wide">PHONE NUMBER</span>
                                        <div className="flex items-center h-12 sm:h-14 px-4 lg:px-5 bg-neutral-100 rounded-xl border border-[#06060612]">
                                            <div className="flex items-center gap-2 text-[#060606]">
                                                <span className="font-medium text-base lg:text-lg whitespace-nowrap">+91</span>
                                            </div>
                                            <input type="tel" placeholder="00000 00000" className="flex-1 font-medium text-[#060606] text-base lg:text-lg border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:opacity-50" />
                                        </div>
                                    </div> */}
                                {/* Password */}
                                {/* <div className="space-y-3">
                                        <span className="font-medium text-[#060606] text-sm lg:text-base uppercase tracking-wide">PASSWORD</span>
                                        <div className="flex items-center justify-between h-12 sm:h-14 px-4 lg:px-5 bg-neutral-100 rounded-xl border border-[#06060612]">
                                            <div className="flex items-center gap-1 opacity-50">
                                                {passwordDots.map((index) => (
                                                    <div key={index} className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[#060606] rounded-full" />
                                                ))}
                                            </div>
                                            <div className="w-4 h-4 lg:w-5 lg:h-5" />
                                        </div>
                                    </div>
                                </form> */}
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleFinish}
                                    className="loginForm space-y-8 lg:space-y-10"
                                    initialValues={{
                                        firstName: 'John', lastName: 'John doe', gender: 'Male', email: 'admin123@gmail.com', city: 'Surat', language: 'English', referralCode: 'BEF125', countryCode: '+91', phoneNumber: '00000 00000', attemptNumber: '01'
                                    }}
                                >
                                    <Form.Item label="PHONE NUMBER" className="LoginNumberSelect" required>
                                        <Input.Group compact>
                                            <Form.Item name="countryCode" noStyle rules={[{ required: true }]}>
                                                <Select style={{ width: 100 }} size="large" options={[{ value: '+91', label: '+91' }, { value: '+1', label: '+1' }, { value: '+44', label: '+44' }]} />
                                            </Form.Item>
                                            <Form.Item name="phoneNumber" noStyle rules={[{ required: true }]}>
                                                <Input size="large" placeholder="00000 00000" style={{ width: 'calc(100% - 100px)' }} />
                                            </Form.Item>
                                        </Input.Group>
                                    </Form.Item>

                                    <Item name="password" label="PASSWORD" rules={[{ required: true, min: 6 }]}>
                                        <Input.Password size="large" placeholder="Password" />
                                    </Item>
                                    <div className="text-center mb-4">
                                        {/* <Text type="secondary">
                                            ALREADY HAVE AN ACCOUNT?{' '}
                                            <Link to={ROUTES.AUTH.LOGIN} className="text-orange-500 font-bold hover:underline">SIGN IN</Link>
                                        </Text> */}
                                    </div>
                                    {/* <Button type="primary" htmlType="submit" size="large" block>
                                        SIGN UP NOW
                                    </Button> */}
                                </Form>
                                {/* <Form
                                    // layout={formLayout}
                                    form={form}
                                    layout="vertical"
                                    // initialValues={{ layout: formLayout }}
                                    // onValuesChange={onFormLayoutChange}
                                    // style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
                                    className="loginForm space-y-8 lg:space-y-10"
                                >
                                    <Item label="PHONE NUMBER" >
                                        <Input addonBefore={selectBefore} defaultValue="mysite" className="!p-1 bg-amber-50 !rounded-2xl " />
                                    </Item>

                                </Form> */}
                                <span className="border-t border-[#fe690b] flex w-full " ></span>

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

    )
}

export default Login