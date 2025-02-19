import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Femoral/Femoral.css";


const Femoral = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-Femoral.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Femoral.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Femoral.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Femoral.png",
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
            {currentImageIndex === 0 && <button className="btnFm1" onClick={() => handleButtonClick('Inguinal: Se aplica justo debajo del ligamento inguinal y lateral a la arteria femoral.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFm2" onClick={() => handleButtonClick('Zona media lateral entre estimulo y registro.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFm3" onClick={() => handleButtonClick('Músculo Recto Femoral, colocar el electrodo de superficie sobre la cara anterior del muslo, a la media distancia entre el ligamento inguinal y la patela. Se pueden utilizar distancias establecidas desde el ligamento inguinal en dirección distal de 14 y 30 cm.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFm4" onClick={() => handleButtonClick('En el tendón del recto femoral, cerca del borde superior de la rótula.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/Femoral-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/Femoral-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnFm5" onClick={() => handleButtonClick('5', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm6" onClick={() => handleButtonClick('6', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm7" onClick={() => handleButtonClick('7', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm8" onClick={() => handleButtonClick('8', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm9" onClick={() => handleButtonClick('9', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm10" onClick={() => handleButtonClick('10', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm11" onClick={() => handleButtonClick('11', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/Femoral-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/Femoral-T-02.png",{ top: '5%', left: '2%' })}></button>}
            
            
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

export default Femoral