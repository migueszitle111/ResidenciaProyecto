// Editorcutaneoposterior
import { useState } from "react";

const Editorcutaneoposterior = () => {
  const [pdf, setPdf] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPdf(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full md:max-w-screen-lg">
        <h1 className="text-lg text-left text-white font-bold mb-2">
          Nervio femoral cutáneo posterior
        </h1>
        <hr className="bg-black h-0.5 mb-4" />

        <label className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 inline-block mr-2 transition-all ease-in-out duration-300 transform hover:text-orange-500"
            style={{ color: "#8f3400" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="hidden mb-4"
          />
        </label>

        {pdf && (
          <div className="mt-4 p-2 overflow-hidden bg-white">
            <embed
              src={`${pdf}#toolbar=1`}
              type="application/pdf"
              className="w-full h-screen md:max-h-96 lg:max-h-80 xl:max-h-screen"
              style={{ border: "none" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Editorcutaneoposterior;
