import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../ToracicoLargo/ToracicoLargo.css"


const ToracicoLargo = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-ToracicoLargo.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-ToracicoLargo.png",
            
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
            {currentImageIndex === 0 && <button className="btnTl1" onClick={() => handleButtonClick('Se colocan sobre el mismo segmento siguiendo la curvatura costal de forma horizontal de 3 a 4 cm más anteriormente que el electrodo activo.', {  top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTl2" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', { top: '62%', left: '50%'})}></button>}
            {currentImageIndex === 0 && <button className="btnTl3" onClick={() => handleButtonClick('Articulación acromoclavicular.', {  top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTl4" onClick={() => handleButtonClick('SERRATUS ANTERIOR C5, C6, C7 - Electrodos de superficie sobre la quinta o sexta costilla en la línea media axilar.', { top: '62%', left: '50%'})}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/toracicoLg-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/toracicoLg-T-01.png",{ top: '2%', left: '2%' })}></button>}
                
            </div>
            {textBoxVisible && (
                <div className="text-boxTl" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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
}

export default ToracicoLargo