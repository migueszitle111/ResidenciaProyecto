
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

//La version dos es igual, salvo el color del fondo, en este caso gris.
const EditableCardV2 = () => {
  const { data: session } = useSession();
  const [editedTitle, setEditedTitle] = useState("Titulo");
  const [editedDescription, setEditedDescription] = useState("Descripción");
  const [editedButtonText, setEditedButtonText] = useState("Botón");
  const [editedButtonPath, setEditedButtonPath] = useState("Ruta del botón");
  const [editedImage, setEditedImage] = useState("/L_H_Blanco.svg");
  const [isEditing, setIsEditing] = useState(false);

  const [charCount, setCharCount] = useState(editedDescription.length);
  const maxChars = 250;

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setEditedDescription(value);
      setCharCount(value.length);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const isAdmin = session && session.user && session.user.roles === "admin";

  return (
    <div>
      <div className="mx-auto ">
      {isAdmin && (
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-orange-500 text-black mt-3 ml-20 px-3 py-1 rounded-md text-sm hover:bg-orange-900  "
        >
          {isEditing ? "Finalizar Edición" : "Editar Card"}
        </button>
          )}
        <div className="lg:w-2/3 bg-[#8f8f8f]  md:p-10 flex flex-col mx-auto m-5 rounded-tr-lg rounded-bl-lg p-5">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="title text-3xl font-semibold text-black mb-6"
              />
              <div className="flex flex-wrap">
                <div className="Description w-1/2 pr-4">
                  <textarea
                    value={editedDescription}
                    onChange={handleDescriptionChange}
                    className="text-black text-justify mt-5"
                    maxLength={maxChars}
                  ></textarea>
                  <p className="text-white-500 text-sm mt-1">
                    {charCount}/{maxChars}
                  </p>

                  <input
                    type="text"
                    value={editedButtonText}
                    onChange={(e) => setEditedButtonText(e.target.value)}
                    className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900"
                  />
                  <input
                    type="text"
                    value={editedButtonPath}
                    onChange={(e) => setEditedButtonPath(e.target.value)}
                    className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900"
                  />
                  <input type="file" onChange={handleImageChange} />
                </div>
                <div className="w-1/2 flex items-center justify-end relative m-2">
                  <Image
                    src={editedImage}
                    alt="Educación"
                    width={600}
                    height={400}
                    className="rounded-tr-lg rounded-bl-lg border border-gray-400 grayscale"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap">
                <div className="Description w-1/2">
                  <h2 className="title text-3xl font-semibold text-white mb-6">
                    {editedTitle}
                  </h2>
                  <hr className="bg-[#c44900] h-0.5" />
                  <p className="text-white text-justify mt-5">
                    {editedDescription}
                  </p>
                  <a href={editedButtonPath}>
                    <button className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900">
                      {editedButtonText}
                    </button>
                  </a>
                </div>
                <div className="w-1/2 flex items-center justify-end relative ">
                  <Image
                    src={editedImage}
                    alt="Educación"
                    width={250}
                    height={300}
                    className="rounded-tr-lg rounded-bl-lg border-black border-4 border border-gray-400 grayscale mx-2"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableCardV2;