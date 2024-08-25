import { useState } from "react";

export default function VideoCard() {
  const [cards, setCards] = useState([
    {
      id: 1,
      isEditing: false,
      title: "Titulo",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      videoUrl: "",
    },
  ]);

  const maxChars = 150; // Establece el máximo de caracteres que deseas permitir

  const handleEditToggle = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isEditing: !card.isEditing } : card
      )
    );
  };

  const handleTitleChange = (e, cardId) => {
    const { value } = e.target;
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, title: value } : card
      )
    );
  };

  const handleDescriptionChange = (e, cardId) => {
    const { value } = e.target;
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, description: value } : card
      )
    );
  };

  const handleVideoChange = (e, cardId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === cardId ? { ...card, videoUrl: reader.result } : card
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCard = () => {
    const newCard = {
      id: cards.length + 1,
      isEditing: false,
      title: "Titulo",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      videoUrl: "",
    };
    setCards((prevCards) => [...prevCards, newCard]);
  };
  const handleDeleteCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <div>
      <button
        className="bg-[#bababa] text-black mt-3 px-3 py-1 rounded-md text-sm hover:bg-orange-900"
        onClick={handleAddCard}
      >
        Agregar Nueva Card
      </button>
      <div class="flex flex-wrap justify-center space-x-8">
        {cards.map((card) => (
          <div key={card.id}>
            <button
              className="bg-[#bababa] text-black mt-3 px-3 py-1 rounded-md text-sm hover:bg-orange-900"
              onClick={() => handleEditToggle(card.id)}
            >
              {card.isEditing ? "Finalizar Edición" : "Editar Card"}
            </button>
            <button
              className="bg-red-500 text-white mt-3 px-3 py-1 rounded-md text-sm hover:bg-red-700"
              onClick={() => handleDeleteCard(card.id)}
            >
              Eliminar Card
            </button>

            {card.isEditing ? (
              <div className="card flex flex-col items-center justify-center ">
                <div className="relative w-48 h-48">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleVideoChange(e, card.id)}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {card.videoUrl ? (
                    <video width="100%" height="100%" controls>
                      <source src={card.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="bg-gray-700 flex items-center justify-center w-full h-full"></div>
                  )}
                </div>
                <div className="card-content">
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleTitleChange(e, card.id)}
                    className="card-title text-black"
                  />
                  <hr className="bg-[#8f3400]" />
                  <textarea
                    value={card.description}
                    onChange={(e) => handleDescriptionChange(e, card.id)}
                    className="bg-gray-900 text-white rounded mt-3 p-2 w-full h-32"
                    maxLength={maxChars}
                  ></textarea>
                  <p className="text-gray-500 text-sm mt-1">
                    {card.description.length}/{maxChars}
                  </p>
                </div>
              </div>
            ) : (
              <div className="border border-[#8f3400] rounded overflow-hidden w-[300px] h-[400px] flex flex-col items-center bg-[#8f8f8f] text-[#000000cc] m-1 py-1 hover:bg-gradient-to-br from-[#c44900cc] to-[#8f3400cc] hover:text-white">
                {card.videoUrl && (
                  <video width="100%" height="100%" controls>
                    <source src={card.videoUrl} type="video/mp4" />
                  </video>
                )}
                <div className="card-content">
                  <h2 className="card-title">{card.title}</h2>
                  <hr className="bg-[#8f3400]" />
                  <p className="card-description hover:text-black">
                    {card.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
