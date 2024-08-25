import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const ViewWord = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [savedMarkdown, setSavedMarkdown] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setSavedMarkdown(markdownContent);
    setIsEditing(false);
  };

  const handleEditorChange = ({ text }) => {
    setMarkdownContent(text);
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <div className="preview-container">
            <h2>Preview</h2>
            <ReactMarkdown>{savedMarkdown}</ReactMarkdown>
          </div>
          <button onClick={handleEditClick}>Editar</button>
        </div>
      ) : (
        <div>
          <div className="editor-container">
            <Editor
              value={markdownContent}
              onChange={handleEditorChange}
              style={{ height: "400px" }}
            />
          </div>
          <button onClick={handleSaveClick}>Guardar</button>
        </div>
      )}
    </div>
  );
};
export default ViewWord;
