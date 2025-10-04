import { FormButton } from "../../../Attribute/FormFields";
import { CardHeader } from "../../../Components/Common/CardHeader";

const Instruction = () => {
  return (
    <div className="sub-container pt-8">
      <CardHeader title="GK Showdown" />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 pt-6">
        <div className="bg-input-box rounded-lg">
          <div className="bg-primary-dark px-4 py-2 rounded-t-lg">
            <h3 className="text-white">Instructions</h3>
          </div>
          <div className="px-8 py-4 border-2 border-t-0 border-card-border rounded-b-lg">
            <ul className="list-disc space-y-2">
              <li className="marker:text-green-600">
                <strong>Total :</strong> 50 Questions
              </li>
              <li className="marker:text-green-600">
                <strong>Duration :</strong> 60 Minutes
              </li>
              <li className="marker:text-green-600">
                <strong>Languages :</strong> English & Hindi
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-input-box rounded-lg">
          <div className="bg-primary-dark px-4 py-2 rounded-t-lg">
            <h3 className="text-white">Syllabus Coverage</h3>
          </div>
          <div className="px-8 py-4 border-2 border-t-0 border-card-border rounded-b-lg">
            <ul className="list-disc space-y-2">
              <li className="marker:text-green-600">Quantitative Aptitude</li>
              <li className="marker:text-green-600">Logical Reasoning</li>
              <li className="marker:text-green-600">General Knowledge</li>
            </ul>
          </div>
        </div>

        <div className="bg-input-box rounded-lg">
          <div className="bg-primary-dark px-4 py-2 rounded-t-lg">
            <h3 className="text-white">Features of the Exam</h3>
          </div>
          <div className="px-8 py-4 border-2 border-t-0 border-card-border rounded-b-lg">
            <ul className="list-disc space-y-2">
              <li className="marker:text-green-600">AI Mentor – Personalized guidance during/after exam</li>
              <li className="marker:text-green-600">Attempt Strategy – Insights on time management</li>
              <li className="marker:text-green-600">General Instructions – Rules, navigation, & do’s/don’ts</li>
            </ul>
          </div>
        </div>

        <div className="bg-input-box rounded-lg">
          <div className="bg-primary-dark px-4 py-2 rounded-t-lg">
            <h3 className="text-white">Exam Guidelines</h3>
          </div>
          <div className="px-8 py-4 border-2 border-t-0 border-card-border rounded-b-lg">
            <ul className="list-disc space-y-2">
              <li className="marker:text-green-600">Do not switch tabs/apps during the test.</li>
              <li className="marker:text-green-600">Ensure a stable internet connection.</li>
              <li className="marker:text-green-600">Submit before time runs out.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end my-8 ">
        <FormButton text="NEXT" className="custom-button w-full sm:w-30 button button--mimas text-center !p-4 !h-12 uppercase" />
      </div>
    </div>
  );
};

export default Instruction;
