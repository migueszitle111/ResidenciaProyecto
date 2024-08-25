// PDFLoader.jsx
import { useState } from "react";
import { useSession } from "next-auth/react";

const PDFLoader = ({ onSubmit }) => {
  const { data: session } = useSession();
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

  const isAdmin = session && session.user && session.user.roles === "admin";

  const uploadPdf = () => {
    if (pdf) {
      onSubmit({ title: "Diplomado", pdfContent: pdf });
    }
  };

  return (
    <div className="contDiplomas flex flex-row">
      <div className="box1 flex-1 p-5 ml-5">
        {isAdmin && (
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="mb-4"
            />
           
          </div>
        )}
        {pdf && (
          <div>
            <embed
              src={pdf}
              type="application/pdf"
              width="400px"
              height="550px"
              className="mt-4"
            />
          </div>
        )}
         <button
              onClick={uploadPdf}
              className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-orange-900 hover:text-white"
            >
              Subir PDF
            </button>
      </div>
      <div className="box2 flex-1 ml-5">
        <p className="text-white text-center text-2xl italic">
          Lista de diplomados
        </p>
      </div>
    </div>
  );
};

export default PDFLoader;
