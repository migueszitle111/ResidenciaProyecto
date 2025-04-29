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
    const [textBoxClass, setTextBoxClass] = useState('text-boxPd');
    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

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

    const handleButtonClick = (content, position, customClass = 'text-boxPd') => {
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
            thumbnailPosition="bottom"s
            bulletclass="bullet"
        />
        <div>
            {/* Primera Imagen */}
            {currentImageIndex === 0 && <button className="btnPd1" onClick={() => handleButtonClick('ELECTRODO “ST. MARK” - Colocado ventral en el dedo índice del explorador, se realiza su introducción profunda a través del esfínter anal externo (S2-S3-S4), hasta el contacto muscular con la base del dedo que contiene incrustado el electrodo de referencia.', { top: '60%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPd2" onClick={() => handleButtonClick('ELECTRODO “ST. MARK” - Colocado ventral en el dedo índice del explorador, se realiza su introducción profunda a través del esfínter anal externo (S2-S3-S4), hasta el contacto muscular con la base del dedo que contiene incrustado el electrodo de captación.', { top: '60%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPd3" onClick={() => handleButtonClick('ELECTRODO “ST. MARK”. Con la punta del dedo índice y direccionando con una leve rotación hacia izquierda o derecha (30 a 45°) dependiendo del lado a evaluar, con una palpación delicada se buscará una protuberancia de consistencia firme que corresponde a la espina isquiática.', { top: '60%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Sacro/Pudendo-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Sacro/Pudendo-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxPd ${textBoxClass}`}
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

export default Pudendo