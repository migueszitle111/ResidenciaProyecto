import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../CutaneoFemoral/CutaneoFemoral.css";


const CutaneoFemoral = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-CutaneoFemoral.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-CutaneoFemoral.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-CutaneoFemoral.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-CutaneoFemoral.png",
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
            {currentImageIndex === 0 && <button className="btnCf1" onClick={() => handleButtonClick('INGUINAL. 4 cm debajo del ligamento inguinal, lateral a la arteria femoral con presión firme.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCf2" onClick={() => handleButtonClick('Región medial del muslo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCf3" onClick={() => handleButtonClick('RAMA MEDIAL - Trazar una línea imaginaria desde el ligamento inguinal, lateral a la arteria femoral hasta el borde medial de la rótula y colocar el electrodo de superficie en la intersección de 14 cm distal de la ingle.', { top: '12%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCf4" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/CutaneoFm-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/CutaneoFm-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnCf5" onClick={() => handleButtonClick('Muslo lateral.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCf6" onClick={() => handleButtonClick('MUSLO POSTERIOR. De forma antidrómica a 12 cm proximal del electrodo de registro, siguiendo una línea imaginaria con dirección a la tuberosidad isquiática.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCf7" onClick={() => handleButtonClick('RAMA POSTERIOR - Línea media del muslo posterior, 6 cm proximal del pliegue del hueco poplíteo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCf8" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/CutaneoFm-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/CutaneoFm-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
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

export default CutaneoFemoral