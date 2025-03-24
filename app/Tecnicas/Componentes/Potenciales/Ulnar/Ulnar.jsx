import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Ulnar/Ulnar.css";



const Ulnar = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxMs');
    const [extraImage, setExtraImage] = useState(''); // Nuevo estado para la imagen extra

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Mediano-01-c.png",
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
        setTextBoxVisible(false);
        setImageBoxVisible(false);
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

    const handleExtraImageClick = (image) => {
        setExtraImage(image); // Cambiar la imagen extra al hacer clic
    };

    return (
        <div className="gallery-wrapper">
            <div className="extra-image-container">
                {extraImage && <img src={extraImage} alt="Imagen Extra"/>} {/* Mostrar imagen extra */}
            </div>

            <div className=" py-20 gallery-containerUl">
                <ImageGallery 
                    items={images}
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
                    {currentImageIndex === 0 && <button className="btnUl1" onClick={() => handleButtonClick('Cortical N20-P22, electrodo activo contralateral al estímulo C3’ (C4’) 2 cm posterior a C3 (C4) con referencia en Fpz’.', { top: '39%', left: '48%' })}>Canal 1. Activo C5-referencia FPZ</button>}
                    {currentImageIndex === 0 && <button className="btnUl2" onClick={() => handleButtonClick('Primera articulación metacarpofalángica.', { top: '39%', left: '48%' })}></button>}
                    {currentImageIndex === 0 && <button className="btnUl3" onClick={() => handleButtonClick('Músculo abductor corto del pulgar (ACP) (eminencia tenar lateral).', { top: '39%', left: '48%' })}></button>}

                    {currentImageIndex === 0 && <button className="btnIUl1" onClick={() => handleExtraImageClick("/assets/ValoresImg/MiembrosSp/MedianoMt-G-01.png")}></button>} {/* Llamada a la función */}
                    {currentImageIndex === 0 && <button className="btnIUl2" onClick={() => handleExtraImageClick("/assets/ValoresImg/MiembrosSp/MedianoMt-T-01.png")}></button>}
                    {/* {selectedOption === "Nervios Ulnar" && <Ulnar />} {currentImageIndex === 0 && <button className="btnIUl2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/MedianoMt-T-01.png",{ top: '5%', left: '2%' })}></button>} */}
                </div>

                {textBoxVisible && (
                    <div className={`text-boxUl ${textBoxClass}`} style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                        {textBoxContent}
                    </div>
                )}

                {imageBoxVisible && (
                    <div className="image-boxUl" style={{ top: imageBoxPosition.top, left: imageBoxPosition.left, position: 'absolute' }}>
                        <img
                            src={imageBoxContent}
                            alt="Cuadro dinámico"
                            style={{ position: 'absolute', maxWidth: '18vw', maxHeight: '18vh', transition: 'transform 0.3s ease' }}
                            className="zoomable-image"
                        />
                    </div>
                )}
            </div>

        </div>
    );
};

export default Ulnar