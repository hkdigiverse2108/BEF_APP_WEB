import { useEffect } from "react";
import { FormSelect } from "../../Attribute/FormFields";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import { setFullFestSubjectFilter } from "../../Store/Slices/FilterSlice";
import { Form } from "antd";

interface SubjectFilterType {
  _id: string;
  name: string;
}

const FullFestSubjectFilter = ({ title = "", filter = false }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const FullFestSubjectFilter = useAppSelector(
    (state) => state.filter.FullFestSubjectFilter
  );

  const { data, isLoading } = useGetApiQuery({ url: URL_KEYS.SUBJECT.SUBJECT });

  const AllSubjects = data?.data?.map((item: SubjectFilterType) => {
    return { value: item?._id, label: item?.name };
  });

  const handleChange = (value: { Subject: string }) => {
    try {
      console.log("value : ", value?.Subject);
      form.setFieldsValue({ Subject: value?.Subject });
      dispatch(setFullFestSubjectFilter(value?.Subject));
    } catch (error) {}
  };

  useEffect(() => {
    if (!isLoading) {
      const firstValue = AllSubjects?.[0]?.value;

      form.setFieldsValue({ Subject: firstValue });
      dispatch(setFullFestSubjectFilter(firstValue));
      console.log(AllSubjects?.[0]?.value, "SDF", FullFestSubjectFilter);
    }
  }, [isLoading]);

  return (
    <div className="flex justify-between items-center">
      <div className="relative px-4">
        <div className="w-1 h-full bg-success rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-semibold ">{title}</h2>
      </div>
      {filter && (
        <div className="flex justify-end question-section">
          <Form form={form} onValuesChange={handleChange}>
            <FormSelect
              name="Subject"
              allowClear={false}
              placeholder="Subject"
              options={AllSubjects}
              className="m-0!"
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default FullFestSubjectFilter;
