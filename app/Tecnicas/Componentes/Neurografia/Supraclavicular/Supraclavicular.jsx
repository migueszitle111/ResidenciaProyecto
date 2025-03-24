import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Supraclavicular/Supraclavicular.css";


const Supraclavicular = () => {
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
            original: "/assets/ValoresImg/Cervicales/01-Supraclavicular.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Supraclavicular.png",
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
                {currentImageIndex === 0 && <button className="btnSpC1" onClick={() => handleButtonClick('Acromio', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnSpC2" onClick={() => handleButtonClick('3 cm en dirección caudal con electrodo de tira, horizontal al activo', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnSpC3" onClick={() => handleButtonClick('ÁREA SUPRACLAVICULAR - Electrodos adheribles de tira colocados sobre la superficie exterior de la diáfisis clavicular', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnSpC4" onClick={() => handleButtonClick('CUELLO PUNTO MEDIO. El cátodo se coloca en el borde posterior del músculo esternocleidomastoideo a nivel del margen inferior del cartílago tiroides', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Cervicales/01-Supraclavicular-G.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/Cervicales/01-Supraclavicular-T.png",{ top: '5%', left: '2%' })}></button>}

            
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
                            maxWidth: '16vw',
                            maxHeight: '16vh',
                            transition: 'transform 0.3s ease',
                        }}
                        className="zoomable-image"
                    />
                </div>
            )}
        </div>
    );
};

export default Supraclavicular