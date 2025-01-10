import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Safeno/Safeno.css"


const Safeno = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-Safeno.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Safeno.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Safeno.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Safeno.png",
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
            {currentImageIndex === 0 && <button className="btnSf1" onClick={() => handleButtonClick('Dorso del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSf2" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo sobre borde maleolar o utilizar el electrodo fijo de barra colocando inicialmente esta referencia en la prominência inferior del maléolo medial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSf3" onClick={() => handleButtonClick('Con electrodo de superficie, se coloca entre el maléolo medial y el tendón del Tibial anterior tomando como referencia el borde superior del mismo maléolo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSf4" onClick={() => handleButtonClick('1.	Pierna: De forma antidrómica 12 a 14 cm del electrodo activo entre el borde medial de la tibia y el musculo Gastrocnemio medial.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnSf5" onClick={() => handleButtonClick('Rodilla: De forma antidrómica en la cara medial de la rodilla ligeramente flexionada, colocar el cátodo con presión firme entre los tendones del Sartorio y el Grácil, tomando como referencia trasversal aproximadamente 1 cm por encima del borde inferior de la rótula.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSf6" onClick={() => handleButtonClick('Borde anterior de la tibia entre el estímulo y el registro.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSf7" onClick={() => handleButtonClick('15 cm distal desde el punto de estimulación marcado previamente, colocar el electrodo de registro entre el borde medial de la tibia y el gastrocnemio medial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSf8" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo pudiendo ser útil la barra de registro.', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxSf" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Safeno