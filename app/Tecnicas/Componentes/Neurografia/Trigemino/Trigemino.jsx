import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Trigemino/Trigemino.css"


const Trigemino = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/Cervicales/01-Trigemino.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Trigemino.png",
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
            {currentImageIndex === 0 && <button className="btnTg1" onClick={() => handleButtonClick('Región frontal. El cátodo del estimulador se coloca en la esquina lateral superior de la frente.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTg2" onClick={() => handleButtonClick('El electrodo activo de superficie se coloca en el foramen supraorbitario', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTg3" onClick={() => handleButtonClick('Medial al elétrodo activo, 2-3 cm de distancia.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTg4" onClick={() => handleButtonClick('Región frontal contralateral.', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxTg" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Trigemino