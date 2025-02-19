import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../PeroneoProfundo/PeroneoProfundo.css";


const PeroneoProfundo = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-PeroneoProfundo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-PeroneoProfundo.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-PeroneoProfundo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-PeroneoProfundo.png",
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
            {currentImageIndex === 0 && <button className="btnPp1" onClick={() => handleButtonClick('3 cm distal sobre dorso del segundo ortejo ', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPp2" onClick={() => handleButtonClick('Horizontal al espacio interdigital, entre las cabezas del primer y segundo metatarsiano.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPp3" onClick={() => handleButtonClick('1.	Tobillo: de forma antidrómica a 12 cm proximal del electrodo activo y justo lateral al tendón extensor largo del primer ortejo. En caso de pies de longitud considerable, el estimulo deberá aplicarse 2 cm distal del retináculo extensor.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPp4" onClick={() => handleButtonClick('Dorso del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/PeroneoPf-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/PeroneoPf-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnPp5" onClick={() => handleButtonClick('5', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp6" onClick={() => handleButtonClick('6', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp7" onClick={() => handleButtonClick('7', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp8" onClick={() => handleButtonClick('8', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp9" onClick={() => handleButtonClick('9', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp10" onClick={() => handleButtonClick('10', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp11" onClick={() => handleButtonClick('11', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp12" onClick={() => handleButtonClick('12', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/PeroneoPf-G-02.png",{ top: '2%', left: '2%' })}></button>}
            
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

export default PeroneoProfundo