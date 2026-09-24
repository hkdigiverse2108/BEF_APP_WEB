import { Form } from "antd";
import { useGetApiQuery } from "../../Api/CommonApi";
import { FormSelect } from "../../Attribute/FormFields";
import { URL_KEYS } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setFullFestSubjectFilter } from "../../Store/Slices/FilterSlice";
import { useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface SubjectFilterType {
  _id: string;
  name: string;
}

const FullFestSubjectFilter = ({ title = "", filter = false }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const { FullFestSubjectFilter } = useAppSelector((state) => state.filter);

  const { data, isLoading } = useGetApiQuery({
    url: `${URL_KEYS.SUBJECT.SUBJECT}?fullFestFilter=true`,
  });

  const AllSubjects = data?.data?.map((item: SubjectFilterType) => {
    return { value: item?._id, label: item?.name };
  });

  const handleChange = (value: { Subject: string }) => {
    form.setFieldsValue({ Subject: value?.Subject });
    dispatch(setFullFestSubjectFilter(value?.Subject));
  };

  const handleClear = () => {
    form.setFieldsValue({ Subject: "Subject" });
    dispatch(setFullFestSubjectFilter(""));
  };

  useEffect(() => {
    if (!FullFestSubjectFilter) {
      form.resetFields();
    }
  }, [FullFestSubjectFilter]);

  return (
    <div className="flex justify-between items-center max-sm:flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <span className="bef-section-bar shrink-0" />
        <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">{title}</h2>
      </div>
      {filter && (
        <div className="flex justify-end question-section items-center gap-1 max-sm:w-full">
          {FullFestSubjectFilter && (
            <div onClick={handleClear} className="text-2xl text-danger">
              <IoIosCloseCircleOutline />
            </div>
          )}

          <Form form={form} onValuesChange={handleChange}>
            <FormSelect
              name="Subject"
              allowClear={true}
              placeholder="Subject"
              options={AllSubjects}
              loading={isLoading}
              className="m-0!"
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default FullFestSubjectFilter;
