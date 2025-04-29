import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Supraescapular/Supraescapular.css"


const Supraescapular = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-Supraescapular.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-Supraescapular.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-Supraescapular.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-Supraescapular.png",
            
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
            {currentImageIndex === 0 && <button className="btnSp1" onClick={() => handleButtonClick('Articulación acromoclavicular.', {  top: '62%', left: '25%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSp2" onClick={() => handleButtonClick('No se requiere. En caso de utilizar aguja monopolar como registro, colocar su referencia con electrodo de superfície a 2 cm en dirección lateral hacia su inserción.', { top: '62%', left: '25%'})}></button>}
            {currentImageIndex === 0 && <button className="btnSp3" onClick={() => handleButtonClick('SUPRASPINATUS C5, C6 - Insertar guja concéntrica en el punto medio del trayecto del musculo, a 2 cm del borde superior de la espina de la escapula, tomando como referencia su tercio medio; se inserta de forma lenta hasta hacer contacto con la cortical ósea y retirar mínimamente.', {  top: '58%', left: '25%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSp4" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', { top: '62%', left: '25%'})}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/supraescapular-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/supraescapular-T-01.png",{ top: '2%', left: '2%' })}></button>}
                        
            {currentImageIndex === 1 && <button className="btnSp5" onClick={() => handleButtonClick('No se requiere. En caso de utilizar aguja monopolar como registro, colocar su referencia com electrodo de superfície a 2 cm en direccion distal.', {  top: '25%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSp6" onClick={() => handleButtonClick('INFRASPINATUS C5, C6 - Electrodo de aguja concéntrica, insertar 3-5 cm por debajo de la espina de la escapula, línea media imaginaria del vértice escapular al tercio medio de la espina.', { top: '25%', left: '23%'})}></button>}
            {currentImageIndex === 1 && <button className="btnSp7" onClick={() => handleButtonClick('Articulación acromoclavicular.', {  top: '25%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSp8" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', { top: '25%', left: '23%'})}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/supraescapular-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/supraescapular-T-02.png",{ top: '2%', left: '2%' })}></button>}

        </div>
            {textBoxVisible && (
                <div className="text-boxSp" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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

export default Supraescapular