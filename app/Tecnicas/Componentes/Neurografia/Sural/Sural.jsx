import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Sural/Sural.css"


const Sural = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-Sural.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Sural.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Sural.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Sural.png",
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
        
        <div  className=" py-20 gallery-container">
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
            {currentImageIndex === 0 && <button className="btnSr1" onClick={() => handleButtonClick('1.	Pierna: De forma antidrómica, parte posterior de la pierna en la unión del tercio medio e inferior, justo lateral a la línea media. 10 a 14 cm de distancia del electrodo activo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr2" onClick={() => handleButtonClick('1.	Pierna: De forma antidrómica, parte posterior de la pierna en la unión del tercio medio e inferior, justo lateral a la línea media. 10 a 14 cm de distancia del electrodo activo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr3" onClick={() => handleButtonClick('1.	Pierna: De forma antidrómica, parte posterior de la pierna en la unión del tercio medio e inferior, justo lateral a la línea media. 10 a 14 cm de distancia del electrodo activo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr4" onClick={() => handleButtonClick('Línea media entre el borde posterior del maléolo lateral y el tendón de Aquiles', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr5" onClick={() => handleButtonClick('3 cm distal del electrodo de registo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr6" onClick={() => handleButtonClick('Punto medio entre estimulo y registro.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnSr7" onClick={() => handleButtonClick('Dorso del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSr8" onClick={() => handleButtonClick('1.	Tobillo: De forma antidrómica, justo por detrás del maléolo lateral horizontal al borde inferior.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSr9" onClick={() => handleButtonClick('Dorso del pie sobre la porción medial del quinto metatarsiano, justo lateral al tendón extensor largo del quinto dedo. ', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSr10" onClick={() => handleButtonClick('3 cm distal del electrodo activo o en la articulacion metatarsofalangica del 5to dedo.', { top: '12%', left: '32%' })}></button>}

            </div>
            {textBoxVisible && (
                <div className="text-boxSr" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Sural