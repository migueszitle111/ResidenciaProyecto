import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Pudendo/Pudendo.css";


const Pudendo = () => {
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
            original: "/assets/ValoresImg/Sacro/01-Pudendo.png",
            thumbnail: "/assets/ValoresImg/Sacro/01-Pudendo.png",
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
            thumbnailPosition="bottom"s
            bulletclass="bullet"
        />
        <div>
            {/* Primera Imagen */}
            {currentImageIndex === 0 && <button className="btnPd1" onClick={() => handleButtonClick('1', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPd2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPd3" onClick={() => handleButtonClick('3', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Sacro/Pudendo-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/Sacro/Pudendo-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
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
                    className="image-boxM"
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

export default Pudendo