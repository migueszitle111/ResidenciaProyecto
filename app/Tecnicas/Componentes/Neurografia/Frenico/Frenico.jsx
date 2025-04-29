import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Frenico/Frenico.css";


const Frenico = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxFn');
    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const images = [
        {
            original: "/assets/ValoresImg/Cervicales/01-Frenico.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Frenico.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/02-Frenico.png",
            thumbnail: "/assets/ValoresImg/Cervicales/02-Frenico.png",
        },

    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
    };

    const handleButtonClick = (content, position, customClass = 'text-boxFn') => {
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
            {currentImageIndex === 0 && <button className="btnFn1" onClick={() => handleButtonClick('De forma bilateral en el séptimo espacio intercostal horizontal a la tetilla o con referencia a línea media clavicular.', {  top: '65%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFn2" onClick={() => handleButtonClick('Sobre pectoral ipsilateral a estimulo.', { top: '65%', left: '50%'})}></button>}
            {currentImageIndex === 0 && <button className="btnFn3" onClick={() => handleButtonClick('CUELLO PUNTO MEDIO. Borde posterior del músculo esternocleidomastoideo (ECM) a nivel del cartílago tiroides.', {  top: '65%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFn4" onClick={() => handleButtonClick('CUELLO PUNTO INFERIOR. Sobre el borde superior de la clavícula entre las cabezas esternal y clavicular del musculo ECM con posición a la neutra o ligeramente extendida.', { top: '65%', left: '50%'})}></button>}
            {currentImageIndex === 0 && <button className="btnFn5" onClick={() => handleButtonClick('DIAPHRAGM C3, C4, C5 - Electrodo de superficie sobre apófisis xifoides.', {  top: '65%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFn6" onClick={() => handleButtonClick('De forma bilateral en el séptimo espacio intercostal horizontal a línea media clavicular.', { top: '65%', left: '50%'})}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Cervicales/frenico-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Cervicales/01-Frenico-T.png",{ top: '5%', left: '2%' })}></button>}

            {currentImageIndex === 1 && <button className="btnFn7" onClick={() => handleButtonClick('Caudalmente a electrodo de registros, pero sobre noveno espacio intercostal.', {  top: '65%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFn8" onClick={() => handleButtonClick('DIAPHRAGM C3, C4, C5 - Electrodo de superficie sobre octavo espacio intercostal en la línea axilar anterior.', { top: '65%', left: '50%'})}></button>}
            {currentImageIndex === 1 && <button className="btnFn9" onClick={() => handleButtonClick('CUELLO PUNTO INFERIOR. Sobre el borde superior de la clavícula entre las cabezas esternal y clavicular del musculo ECM con posición a la neutra o ligeramente extendida.', {  top: '65%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFn10" onClick={() => handleButtonClick('Esternón.', { top: '65%', left: '50%'})}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Cervicales/FrenicoG.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Cervicales/01-Frenico-T.png",{ top: '5%', left: '2%' })}></button>}

            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxFn ${textBoxClass}`}
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

export default Frenico