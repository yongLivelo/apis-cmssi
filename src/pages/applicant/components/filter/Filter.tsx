import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function Filter() {
  return (
    <div className="p-0 max-w-full w-full bg-gray-50 border border-gray-300">
      <h1 className="text-center text-xl font-bold my-4 text-gray-700">
        Search Applicant Form
      </h1>
      <form className="space-y-6 w-full px-8">
        {/* Personal Information Section */}
        <fieldset className="border border-gray-200 rounded-none">
          <legend className="font-semibold text-gray-800 px-4">
            Personal Information
          </legend>
          <div className="grid grid-cols-2 gap-8 px-6 py-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="applicantNumber"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Applicant Number
                </Label>
                <Input id="applicantNumber" type="text" />
              </div>
              <div>
                <Label
                  htmlFor="applicationStatus"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Application Status
                </Label>
                <select
                  id="applicationStatus"
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-gray-700 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
              </div>
              <div>
                <Label
                  htmlFor="applicationDate"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Application Date
                </Label>
                <Input id="applicationDate" type="date" />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Last Name
                </Label>
                <Input id="lastName" type="text" />
              </div>
              <div>
                <Label
                  htmlFor="firstName"
                  className="block text-gray-700 font-medium mb-1"
                >
                  First Name
                </Label>
                <Input id="firstName" type="text" />
              </div>
              <div>
                <Label
                  htmlFor="middleName"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Middle Name
                </Label>
                <Input id="middleName" type="text" />
              </div>
              <div>
                <Label
                  htmlFor="birthDate"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Birth Date
                </Label>
                <Input id="birthDate" type="date" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="city"
                  className="block text-gray-700 font-medium mb-1"
                >
                  City/Municipality
                </Label>
                <Input id="city" type="text" />
              </div>
              <div>
                <Label
                  htmlFor="province"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Province
                </Label>
                <Input id="province" type="text" />
              </div>
              <div>
                <Label
                  htmlFor="civilStatus"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Civil Status
                </Label>
                <select
                  id="civilStatus"
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-gray-700 text-sm"
                >
                  <option value="N/A">N/A</option>
                </select>
              </div>
              <div>
                <Label
                  htmlFor="trainingStatus"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Training Status
                </Label>
                <select
                  id="trainingStatus"
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-gray-700 text-sm"
                >
                  <option value="N/A">N/A</option>
                </select>
              </div>
              <div>
                <Label
                  htmlFor="desiredPosition"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Desired Position
                </Label>
                <select
                  id="desiredPosition"
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-gray-700 text-sm"
                >
                  <option value="N/A">N/A</option>
                </select>
              </div>
              <div>
                <Label
                  htmlFor="height"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Height (cm)
                </Label>
                <Input id="height" type="text" />
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center">
                  <Checkbox id="highSchoolGraduate" />
                  <Label
                    htmlFor="highSchoolGraduate"
                    className="ml-2 text-gray-700"
                  >
                    High School Graduate
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="collegeGraduate" />
                  <Label
                    htmlFor="collegeGraduate"
                    className="ml-2 text-gray-700"
                  >
                    College Graduate
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Search Button */}
        <div className="flex justify-end px-6 py-4">
          <Button className="bg-blue-500 text-white hover:bg-blue-600 transition px-4 py-2 rounded-md">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Filter;
