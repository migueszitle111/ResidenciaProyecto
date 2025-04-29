import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../EscapularDorsal/EscapularDorsal.css"


const EscapularDorsal = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-EscapularDorsal.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-EscapularDorsal.png",
            
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
            {currentImageIndex === 0 && <button className="btnEd1" onClick={() => handleButtonClick('No se requiere. En caso de modificar la técnica (no recomendable) con aguja monopolar, colocar su referencia con electrodos de superfice en el vértice de la escapula.', {  top: '12%', left: '25%' })}></button>}
            {currentImageIndex === 0 && <button className="btnEd2" onClick={() => handleButtonClick('RHOMBOIDEUS MAJOR C5 - Electrodo de aguja concéntrico, insertar en el borde medial del ángulo inferior de la escápula.', { top: '12%', left: '25%'})}></button>}
            {currentImageIndex === 0 && <button className="btnEd3" onClick={() => handleButtonClick('Articulación acromoclavicular.', {  top: '12%', left: '25%' })}></button>}
            {currentImageIndex === 0 && <button className="btnEd4" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', { top: '12%', left: '25%'})}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/escapularDorsal-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/escapularDorsal-T-01.png",{ top: '2%', left: '2%' })}></button>}

            </div>
            {textBoxVisible && (
                <div className="text-boxEd" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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

export default EscapularDorsal