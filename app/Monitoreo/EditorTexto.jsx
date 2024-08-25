import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditorTexto({ titulo }) {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ font: ["Quando", "Arial"] }],
      [{ size: ["small", false, "large", "huge"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "font",
    "size",
  ];

  const handleSave = () => {
    setShowContent(true);
  };

  return (
    <div>
      <button
        className="bg-orange-800 w-2/3 text-black"
        onClick={() => {
          setIsEditing(!isEditing);
          handleSave(false);
        }}
      >
        {isEditing ? "Guardar" : "Editar"}
      </button>
      {isEditing && (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          style={{ color: "black" }}
        />
      )}
      {handleSave && (
        <div className="mt-4">
          <h2>{titulo}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: value }}
            className="text-black"
          />
        </div>
      )}
    </div>
  );
}

export default EditorTexto;
