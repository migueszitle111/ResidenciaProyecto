import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Auricular/AuricularM.css"


const AuricularM = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/Cervicales/01-AuricularM.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-AuricularM.png",
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
                {currentImageIndex === 0 && <button className="btnAu1" onClick={() => handleButtonClick('Cuello punto medio: De forma antidrómica en el borde lateral del músculo esternocleidomastoideo, aproximadamente en su tercio medio o 8cm de distancia en dirección caudal a electrodo de registro.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnAu2" onClick={() => handleButtonClick('Con electrodos de superficie sobre la parte posterior del lóbulo de la oreja.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnAu3" onClick={() => handleButtonClick('2 cm en dirección cefálica a electrodo activo.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnAu4" onClick={() => handleButtonClick('Proceso espinoso C7.', { top: '12%', left: '32%'})}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxAu" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default AuricularM