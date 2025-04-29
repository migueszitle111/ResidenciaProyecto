import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Axilar/Axilar.css"


const Axilar = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-Axilar.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-Axilar.png",
            
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
                {currentImageIndex === 0 && <button className="btnAx1" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', {  top: '62%', left: '25%' })}></button>}
                {currentImageIndex === 0 && <button className="btnAx2" onClick={() => handleButtonClick('Articulación acromioclavicular.', { top: '62%', left: '25%'})}></button>}
                {currentImageIndex === 0 && <button className="btnAx3" onClick={() => handleButtonClick('DELTOIDS MIDIUM C5, C6 - Punto medio entre articulación acromioclavicular y área de inserción deltoidea en region lateral del hombro.', {  top: '62%', left: '25%' })}></button>}
                {currentImageIndex === 0 && <button className="btnAx4" onClick={() => handleButtonClick('Inserción deltoidea, unión del tercio proximal y medio del brazo.', { top: '62%', left: '25%'})}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/Axilar-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/Axilar-T-01.png",{ top: '5%', left: '2%' })}></button>}
                
            </div>
            {textBoxVisible && (
                <div className="text-boxAx" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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

export default Axilar