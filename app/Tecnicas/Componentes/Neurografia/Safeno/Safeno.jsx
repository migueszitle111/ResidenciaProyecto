import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Safeno/Safeno.css";


const Safeno = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-Safeno.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Safeno.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Safeno.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Safeno.png",
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
            {currentImageIndex === 0 && <button className="btnSf1" onClick={() => handleButtonClick('Dorso del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSf2" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo sobre borde maleolar o utilizar el electrodo fijo de barra, colocando inicialmente esta referencia en la prominencia inferior del maléolo medial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSf3" onClick={() => handleButtonClick('REGISTRO DISTAL (Tobillo medial-anterior) - Con electrodo de superficie, se coloca entre el maléolo medial y el tendón del Tibial anterior tomando como referencia el borde superior óseo del mismo maléolo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSf4" onClick={() => handleButtonClick('PIERNA. De forma antidrómica 12 a 14 cm proximal del electrodo activo, entre el borde medial de la tibia y el musculo Gastrocnemio medial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Safeno-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Safeno-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnSf5" onClick={() => handleButtonClick('RODILLA. De forma antidrómica en la cara medial de la rodilla ligeramente flexionada, colocar el cátodo con presión firme entre los tendones del Sartorio y el Grácil, tomando como referencia trasversal, aproximadamente 1 cm por encima del borde inferior de la rótula.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSf6" onClick={() => handleButtonClick('Borde anterior de la tibia entre el estímulo y el registro.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSf7" onClick={() => handleButtonClick('REGISTRO PROXIMAL (Pierna medial-anterior) - 15 cm distal desde el punto de estimulación marcado previamente, colocar el electrodo de registro entre el borde medial de la tibia y el Gastrocnemio medial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSf8" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo pudiendo ser útil la barra de registro.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Safeno-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Safeno-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
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

export default Safeno