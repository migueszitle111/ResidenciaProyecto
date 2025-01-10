import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../CutaneoFemoral/CutaneoFemoral.css"


const CutaneoFemoral = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-CutaneoFemoral.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-CutaneoFemoral.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-CutaneoFemoral.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-CutaneoFemoral.png",
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
            {currentImageIndex === 0 && <button className="btnCf1" onClick={() => handleButtonClick('Inguinal. 4 cm distal de ligamento inguinal, lateral a la arteria femoral con presión firme.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCf2" onClick={() => handleButtonClick('Región medial del muslo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCf3" onClick={() => handleButtonClick('Trazar una línea imaginaria desde el ligamento inguinal, lateral a la arteria femoral hasta el borde medial de la rótula y colocar el electrodo de superficie en la intersección de 14 cm distal de la ingle.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCf4" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnCf5" onClick={() => handleButtonClick('Muslo lateral.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCf6" onClick={() => handleButtonClick('Pierna: De forma antidrómica a 12 cm proximal del electrodo de registro, siguiendo una línea imaginaria con dirección a la tuberosidad isquiática.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCf7" onClick={() => handleButtonClick('Línea media del muslo posterior, 6 cm proximal al pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCf8" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo.', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxCf" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default CutaneoFemoral