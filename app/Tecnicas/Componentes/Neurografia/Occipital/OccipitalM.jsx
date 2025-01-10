import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Occipital/OccipitalM.css"


const OccipitalM = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/Cervicales/01-OccipitalM.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-OccipitalM.png",
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
                {currentImageIndex === 0 && <button className="btnOc1" onClick={() => handleButtonClick('2 cm en direccion cefálica tomando como referencia el electrodo activo.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnOc2" onClick={() => handleButtonClick('Electrodo de aguja subdérmico, colocado en trayecto del ápex, 1 cm lateral a la protuberancia occipital externa ipsilateral al lado a estimular (insertar de forma oblicua en dirección cefálica)', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnOc3" onClick={() => handleButtonClick('Espacio intervertebral C1-C2. Con electrodo de aguja monopolar (cátodo), 6-8 cm en dirección caudal de electrodo activo, 1 cm lateral a la línea media con referencia al borde inferior de la apófisis mastoides emulando las técnicas de estimulación de raíz (colocar ánodo 3-4 cm caudal).', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnOc4" onClick={() => handleButtonClick('Apófisis espinosa C7.', { top: '12%', left: '32%'})}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxOc" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default OccipitalM