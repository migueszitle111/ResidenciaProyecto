import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Medianos/Medianos.css";



const Medianos = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxMs');

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Mediano-01.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Mediano-01.png",
            
        },
        {
            original: "/assets/ImgTecnicas/Potenciales/Mediano-02.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Mediano-02.png"
        },
        {
            original: "/assets/ImgTecnicas/Potenciales/Mediano-03.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Mediano-03.png"
        },
    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
    };

    const handleButtonClick = (content, position, customClass = 'text-boxMs') => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTextBoxClass(customClass);
            setTextBoxVisible(true);
        }
    };

    const handleImageBoxClick = (image, position) => {
        if (imageBoxVisible && imageBoxContent === image) {
            setImageBoxVisible(false);
        } else {
            setImageBoxContent(image);
            setImageBoxPosition(position);
            setImageBoxVisible(true);
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
                {currentImageIndex === 0 && <button className="btnMds1" onClick={() => handleButtonClick('1. Muñeca: 8 cm proximal a electrodo activo, entre los tendones del palmar mayor y palmar menor, realizando una línea imaginaria con intersección dirigida al pliegue cutáneo del carpo, haciéndose horizontal en tercio distal del antebrazo.\n2. Codo: Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '20%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnMds2" onClick={() => handleButtonClick('Primera articulación metacarpofalángica.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnMds3" onClick={() => handleButtonClick('Músculo abductor corto del pulgar (ACP) (eminencia tenar lateral).', { top: '12%', left: '24%' })}></button>}
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxMs ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
                <div
                    className="image-boxMds"
                    style={{
                        top: imageBoxPosition.top,
                        left: imageBoxPosition.left,
                        position: 'absolute',
                    }}
                >
                    <img
                        src={imageBoxContent}
                        alt="Cuadro dinámico"
                        style={{
                            position: 'absolute',
                            maxWidth: '18vw',
                            maxHeight: '18vh',
                            transition: 'transform 0.3s ease',
                        }}
                        className="zoomable-image"
                    />
                </div>
            )}
        </div>
    );
};

export default Medianos