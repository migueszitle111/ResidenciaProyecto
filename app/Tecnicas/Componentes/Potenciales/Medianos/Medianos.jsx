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
    const [extraImage, setExtraImage] = useState('');

    const [modalVisible, setModalVisible] = useState(false);


    

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

    const openModal = (image) => {
        setExtraImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setExtraImage('');
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
        <div class="gallery-wrapper">
            


            <div  className="gallery-container">
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
                    {currentImageIndex === 0 && <button className="btnMds1" onClick={() => handleButtonClick('Cortical N20-P22, electrodo activo contralateral al estímulo C3’ (C4’) 2 cm posterior a C3 (C4) con referencia en Fpz’.', { top: '74%', left: '50%' })}>Canal 1. Activo C5-referencia FPZ</button>}
                    {currentImageIndex === 0 && <button className="btnMds2" onClick={() => handleButtonClick('Primera articulación metacarpofalángica.', { top: '74%', left: '50%' })}></button>}
                    {currentImageIndex === 0 && <button className="btnMds3" onClick={() => handleButtonClick('Músculo abductor corto del pulgar (ACP) (eminencia tenar lateral).', { top: '74%', left: '50%' })}></button>}

                    {currentImageIndex === 0 && <button className="btnIMds1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-01.png")}></button>}
                    {currentImageIndex === 0 && <button className="btnIMds2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-T-01.png")}></button>}   


                
                </div>
                {textBoxVisible && (
                    <div
                        className={`text-boxMds ${textBoxClass}`}
                        style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                    >
                        {textBoxContent}
                    </div>
                )}
                {modalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>×</button>
                        <img src={extraImage} alt="Imagen Extra" className="modal-image"/>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
    
};

export default Medianos