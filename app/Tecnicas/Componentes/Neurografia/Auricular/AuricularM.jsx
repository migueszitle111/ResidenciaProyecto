import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Auricular/AuricularM.css";


const AuricularM = () => {
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
            original: "/assets/ValoresImg/Cervicales/01-AuricularM.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-AuricularM.png",
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
                {currentImageIndex === 0 && <button className="btnAu1" onClick={() => handleButtonClick('CUELLO PUNTO MEDIO. De forma antidrómica en el borde lateral del músculo esternocleidomastoideo, aproximadamente en su tercio medio u 8cm de distancia en dirección caudal del electrodo de registro.', {  top: '14%', left: '23%' })}></button>}
                {currentImageIndex === 0 && <button className="btnAu2" onClick={() => handleButtonClick('LÓBULO DE LA OREJA - Con electrodos de superficie sobre la parte posterior y tercio inferior del lóbulo de la oreja.', { top: '10%', left: '23%'})}></button>}
                {currentImageIndex === 0 && <button className="btnAu3" onClick={() => handleButtonClick('2 cm en dirección cefálica a electrodo activo.', {  top: '10%', left: '23%' })}></button>}
                {currentImageIndex === 0 && <button className="btnAu4" onClick={() => handleButtonClick('Proceso espinoso C7.', { top: '10%', left: '23%'})}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Cervicales/01-AuricularM-G.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Cervicales/01-AuricularM-T.png",{ top: '5%', left: '2%' })}></button>}
            
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

export default AuricularM