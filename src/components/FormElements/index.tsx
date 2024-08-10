
"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import MultiSelect1 from "@/components/FormElements/MultiSelect1";
import Tri from "@/components/FormElements/tri";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";

const FormElements = () => {
  return (
    <>
      <Breadcrumb pageName="Recherche avancée" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-4">
        <div className="flex flex-col gap-9">
          {/* Sorting Section */}
          <div className="rounded-lg border border-stroke bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke pb-4 mb-4 dark:border-strokedark">
              <h3 className="font-semibold text-lg text-black dark:text-white">
                Tri
              </h3>
            </div>
            <div className="flex flex-col gap-5.5">
              <Tri id="Tri" />
              <button className="self-end bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
                Rechercher
              </button>
            </div>
          </div>
          
          {/* Search Section */}
          <div className="rounded-lg border border-stroke bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke pb-4 mb-4 dark:border-strokedark">
              <h3 className="font-semibold text-lg text-black dark:text-white">
                Par annotation
              </h3>
            </div>
            <div className="flex flex-col gap-5.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nom du document
                </label>
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Annotation
                </label>
                <input
                  type="text"
                  placeholder="Annotation"
                  className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button className="self-end bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
                Rechercher
              </button>
            </div>
          </div>

          {/* Date Picker Section */}
          <div className="rounded-lg border border-stroke bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke pb-4 mb-4 dark:border-strokedark">
              <h3 className="font-semibold text-lg text-black dark:text-white">
                Date de Publication
              </h3>
            </div>
            <div className="flex flex-col gap-5.5">
              <DatePickerOne />
              <button className="self-end bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
                Rechercher
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* Document Type Section */}
          <div className="rounded-lg border border-stroke bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke pb-4 mb-4 dark:border-strokedark">
              <h3 className="font-semibold text-lg text-black dark:text-white">
                Par type de document
              </h3>
            </div>
            <div className="flex flex-col gap-5.5">
              <MultiSelect1 id="multiSelect1" />
              <button className="self-end bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
                Rechercher
              </button>
            </div>
          </div>

          {/* Theme Section */}
          <div className="rounded-lg border border-stroke bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke pb-4 mb-4 dark:border-strokedark">
              <h3 className="font-semibold text-lg text-black dark:text-white">
                Par thème
              </h3>
            </div>
            <div className="flex flex-col gap-5.5">
              <MultiSelect id="multiSelect" />
              <button className="self-end bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
