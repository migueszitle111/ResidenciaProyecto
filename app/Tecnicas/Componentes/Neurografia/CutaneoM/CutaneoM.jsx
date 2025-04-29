import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../CutaneoM/CutaneoM.css"


const CutaneoM = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-CutaneoM.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-CutaneoM.png",
            
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

    // Funciones para abrir y cerrar el modal
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
                {currentImageIndex === 0 && <button className="btnCM1" onClick={() => handleButtonClick('CODO. Punto medio trazado entre el borde medial del tendón del bíceps braquial y epicóndilo medial, 1-2 cm proximal del pliegue del codo.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnCM2" onClick={() => handleButtonClick('Antebrazo lateral.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnCM3" onClick={() => handleButtonClick('ANTEBRAZO MEDIAL - 12 a 14 cm con dirección distal del punto de estimulación sobre línea trazada hasta el pisiforme en la muñeca, justo medial del tendón cubital anterior.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnCM4" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/CutaneoMd-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/CutaneoMd-T-01.png",{ top: '5%', left: '2%' })}></button>}
                
            </div>
            {textBoxVisible && (
                <div className="text-boxCtm" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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

export default CutaneoM