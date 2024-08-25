
// Importa las dependencias necesarias
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

// Define el componente funcional EditableCard
const EditableCard = () => {
  // Obtiene la sesión del usuario usando useSession
  const { data: session } = useSession();

  // Estados para gestionar los datos del formulario y la interfaz de edición
  const [editedTitle, setEditedTitle] = useState("Titulo");
  const [editedDescription, setEditedDescription] = useState("Descripcion");
  const [editedButtonText, setEditedButtonText] = useState("Ir a {titulo}");
  const [editedButtonPath, setEditedButtonPath] = useState("Ruta del botón");
  const [editedImage, setEditedImage] = useState("/L_H_Blanco.svg");
  const [isEditing, setIsEditing] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Máximo número de caracteres permitidos en la descripción
  const maxChars = 250;

  // Cargar datos desde la API al cargar el componente en modo edición
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getResponse = await fetch('/api/topics');
        const initialData = await getResponse.json();

        setEditedTitle(initialData.title);
        setEditedDescription(initialData.description);
        setEditedImage(initialData.imageUrl);
      } catch (error) {
        console.error("Error obteniendo datos del tema:", error);
      }
    };

    if (isEditing) {
      fetchData();
    }
  }, [isEditing]);

  // Efecto para actualizar el contador de caracteres
  useEffect(() => {
    setCharCount(editedDescription ? editedDescription.length : 0);
  }, [editedDescription]);

  // Manejador para alternar el modo de edición
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Manejador para cambios en la descripción
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setEditedDescription(value);
      setCharCount(value.length);
    }
  };

  // Manejador para cambios en la imagen
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

  // Manejador para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Reemplaza la siguiente URL con tu endpoint de actualización
      const response = await fetch('/api/topics/[id]', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          imageUrl: editedImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creando/actualizando el tema");
      }

      // Después de actualizar, realiza una solicitud GET para obtener los datos actualizados
      const getResponse = await fetch('/api/topics');
      const updatedTopic = await getResponse.json();

      setEditedTitle(updatedTopic.title);
      setEditedDescription(updatedTopic.description);
      setEditedImage(updatedTopic.imageUrl);

      // Cambia el estado a no edición después de actualizar
      setIsEditing(false);

      setLoading(false);
    } catch (error) {
      console.error("Error creando/actualizando el tema:", error);
      setLoading(false);
    }
  };

  // Verificar si el usuario tiene el rol de administrador
  const isAdmin = session && session.user && session.user.roles === "admin";

  return (
    <div>
      <div className="mx-auto">
        {isAdmin && (
          <button
            onClick={handleEditClick}
            className="bg-[#bababa] text-black mt-3 ml-20 px-3 py-1 rounded-md text-sm hover:bg-orange-900"
          >
            Editar Card
          </button>
        )}
        <div className="lg:w-2/3 bg-[#8f3400] md:p-10 flex flex-col mx-auto m-5 rounded-tr-lg rounded-bl-lg p-5">
          {isEditing ? (
            // Formulario de edición
            <form onSubmit={handleSubmit}>
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
                  {isAdmin && (
                    <>
                      <input
                        type="text"
                        value={editedButtonText}
                        onChange={(e) => setEditedButtonText(e.target.value)}
                        placeholder="Texto del botón"
                        className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900"
                      />
                      <input
                        type="text"
                        value={editedButtonPath}
                        onChange={(e) => setEditedButtonPath(e.target.value)}
                        placeholder="Ruta del botón"
                        className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900"
                      />
                      <input type="file" onChange={handleImageChange} />
                    </>
                  )}
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
              <button
                type="submit"
                className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900"
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Actualizar"}
              </button>
            </form>
          ) : (
            // Modo no editable
            <div className="flex flex-wrap">
              <div className="Description w-1/2">
                <h2 className="title text-3xl font-semibold text-white mb-6">
                  {editedTitle}
                </h2>
                <hr className="bg-white h-0.5" />
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
          )}
        </div>
      </div>
    </div>
  );
};

// Exporta el componente EditableCard
export default EditableCard;
