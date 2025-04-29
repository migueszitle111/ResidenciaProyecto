import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Sural/Sural.css";


const Sural = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-Sural.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Sural.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Sural.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Sural.png",
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
            {currentImageIndex === 0 && <button className="btnSr1" onClick={() => handleButtonClick('1 cm lateral.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr2" onClick={() => handleButtonClick('PIERNA. (ntidrómico), 10 a 14 cm proximal del electrodo activo, región posterior de la pierna en la unión del tercio medio e inferior, justo lateral a la línea media.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr3" onClick={() => handleButtonClick('1 cm medial.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr4" onClick={() => handleButtonClick('TOBILLO RETROMALEOLAR - Línea media entre el borde posterior del maléolo lateral y el tendón de Aquiles, tomando como límite proximal el polo superior del maléolo y pudiéndose ubicar hasta su borde inferior como límite distal.', { top: '12%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr5" onClick={() => handleButtonClick('3 cm distal del electrodo de registo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSr6" onClick={() => handleButtonClick('Punto medio entre estimulo y registro.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Sural-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Sural-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnSr7" onClick={() => handleButtonClick('Dorso del pie.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSr8" onClick={() => handleButtonClick('TOBILLO. De forma antidrómica, justo por detrás del maléolo lateral horizontal al borde inferior.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSr9" onClick={() => handleButtonClick('RAMA CUTÁNEA LATERAL DORSAL - Dorso del pie sobre la porción medial del quinto metatarsiano, justo lateral al tendón extensor largo del quinto dedo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSr10" onClick={() => handleButtonClick('3 cm distal del electrodo activo o en la articulacion metatarsofalangica del 5to ortejo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Sural-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Sural-T-02.png",{ top: '5%', left: '2%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxMs ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {modalVisible && (
                <div className="modal-gallery">
                <button className={`print-button`} onClick={closeModal}>
                    <img src="/I_X.webp" style={{filter: 'invert(1)'}}/>
                </button>
                <img src={extraImage} alt="Imagen Extra" className="modal-image" />
            </div>
            )}
        </div>
    );
};

export default Sural