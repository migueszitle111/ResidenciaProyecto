import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";


const EditorMediano = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textBoxVisible, setTextBoxVisible] = useState(false);
  const [textBoxContent, setTextBoxContent] = useState('');
  const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

  const images = [
      {
          original: "/assets/ValoresImg/02_01-2 Indice o Medio (5116) V2.png",
          thumbnail: "/assets/ValoresImg/02_01-2 Indice o Medio (5116) V2.png",
          
      },
      {
          original: "/assets/ValoresImg/02_02  Indice o Medio 2 (5116) V2.png",
          thumbnail: "/assets/ValoresImg/02_02  Indice o Medio 2 (5116) V2.png"
      },
      {
          original: "/assets/ValoresImg/02_03-3 Indice o Medio 3 (5124).png",
          thumbnail: "/assets/ValoresImg/02_03-3 Indice o Medio 3 (5124).png"
      },
      {
          original: "/assets/ValoresImg/02_04-2 Dedos 1-4 (4934).png",
          thumbnail: "/assets/ValoresImg/02_04-2 Dedos 1-4 (4934).png"
      },
      {
          original: "/assets/ValoresImg/02_05-2 Sindrome Tunel de Carpo (5115).png",
          thumbnail: "/assets/ValoresImg/02_05-2 Sindrome Tunel de Carpo (5115).png"
      },
      {
          original: "/assets/ValoresImg/02_06-2 Sindrome Tunel de Carpo 2 (5115) V2.png",
          thumbnail: "/assets/ValoresImg/02_06-2 Sindrome Tunel de Carpo 2 (5115) V2.png"
      },
      {
          original: "/assets/ValoresImg/02_07-2 Base Sindrome Tunel de Carpo 3 (5115) V3.png",
          thumbnail: "/assets/ValoresImg/02_07-2 Base Sindrome Tunel de Carpo 3 (5115) V3.png"
      },
      {
          original: "/assets/ValoresImg/02_08-2 Base Inching (4941) V2.png",
          thumbnail: "/assets/ValoresImg/02_08-2 Base Inching (4941) V2.png"
      },
  ];

  const handleSlide = (currentIndex) => {
      setCurrentImageIndex(currentIndex);
      setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
  };

  const handleButtonClick = (content, position) => {
      if (textBoxVisible && textBoxContent === content) {
          setTextBoxVisible(false);
      } else {
          setTextBoxContent(content);
          setTextBoxPosition(position);
          setTextBoxVisible(true);
      }
  };


  return (
      
      <div  className="py-10 gallery-container">
      <ImageGallery items={images}
          onSlide={handleSlide}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={false}
          showNav={false}
          showThumbnails={true}
          thumbnailPosition="bottom"
          bulletclass="bullet"
      />
      <div>
          {/* Primera Imagen */}
              {currentImageIndex === 0 && <button className="btn1" onClick={() => handleButtonClick('Un poema es una composición literaria del género de la lírica, usualmente de breve extensión, que consiste en la descripción subjetiva de un estado emocional, existencial o de alguna vivencia. Para ello emplea un lenguaje', { top: '15%', left: '50%' })}>A</button>}
              {currentImageIndex === 0 && <button className="btn2" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '75%' })}></button>}
              {currentImageIndex === 0 && <button className="btn3" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '20%', left: '80%' })}></button>}
              {currentImageIndex === 0 && <button className="btn4" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '5%', left: '15%' })}></button>}
          {/* Segunda Imagen */}
              {currentImageIndex === 1 && <button className="btn5" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '20%', left: '20%' })}></button>}
              {currentImageIndex === 1 && <button className="btn6" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 1 && <button className="btn7" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 1 && <button className="btn8" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 1 && <button className="btn9" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
          {/* Tercera Imagen */}
              {currentImageIndex === 2 && <button className="btn10" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '20%', left: '20%' })}></button>}
              {currentImageIndex === 2 && <button className="btn11" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 2 && <button className="btn12" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 2 && <button className="btn13" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 2 && <button className="btn14" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 2 && <button className="btn15" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
          {/* Cuarta Imagen */}
              {currentImageIndex === 3 && <button className="btn16" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '20%', left: '20%' })}></button>}
              {currentImageIndex === 3 && <button className="btn17" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 3 && <button className="btn18" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 3 && <button className="btn19" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 3 && <button className="btn20" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 3 && <button className="btn21" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 3 && <button className="btn22" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 3 && <button className="btn23" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 3 && <button className="btn24" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 3 && <button className="btn25" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
          {/* Quinta Imagen */}
              {currentImageIndex === 4 && <button className="btn26" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '20%', left: '20%' })}></button>}
              {currentImageIndex === 4 && <button className="btn27" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 4 && <button className="btn28" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 4 && <button className="btn29" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 4 && <button className="btn30" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
          {/* Sexta Imagen */}
              {currentImageIndex === 5 && <button className="btn31" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '20%', left: '20%' })}></button>}
              {currentImageIndex === 5 && <button className="btn32" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 5 && <button className="btn33" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 5 && <button className="btn34" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 5 && <button className="btn35" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
          {/* Septima Imagen */}
              {currentImageIndex === 6 && <button className="btn36" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '20%', left: '20%' })}></button>}
              {currentImageIndex === 6 && <button className="btn37" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 6 && <button className="btn38" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 6 && <button className="btn39" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 6 && <button className="btn40" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 6 && <button className="btn41" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              {currentImageIndex === 6 && <button className="btn42" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
          {/* Octava Imagen */}
              {currentImageIndex === 7 && <button className="btn43" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '20%', left: '20%' })}></button>}
              {currentImageIndex === 7 && <button className="btn44" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '30%', left: '30%' })}></button>}
              {currentImageIndex === 7 && <button className="btn45" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '40%', left: '40%' })}></button>}
              
          </div>
          {textBoxVisible && (
              <div className="text-box" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                  {textBoxContent}
              </div>
          )}
      </div>
  );
}

export default EditorMediano;
