import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../UlnarSt/UlnarSt.css";


const UlnarSt = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-UlnarSt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-UlnarSt.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-UlnarSt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-UlnarSt.png",
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
                {currentImageIndex === 0 && <button className="btnUSt1" onClick={() => handleButtonClick('MUÑECA. Estimulo Antidrómico a 14 cm con dirección proximal del electrodo de registro, medial y adyacente al tendón cubital anterior.', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUSt2" onClick={() => handleButtonClick('DEDO MEÑIQUE O QUINTO DEDO - Ligeramente distal a la articulación metacarpofalángica, evitando colocar electrodo sobre pliegue cutáneo.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUSt3" onClick={() => handleButtonClick('CUARTO DEDO - Ligeramente distal a la articulación metacarpofalángica, evitando colocar electrodo sobre pliegue cutáneo.', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUSt4" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo en articulación interfalangica distal.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUSt5" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo en articulación interfalangica distal.', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnarSt-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnarSt-T-01.png",{ top: '2%', left: '2%' })}></button>}
            
                {currentImageIndex === 1 && <button className="btnUSt6" onClick={() => handleButtonClick('4 cm distalmente sobre dorso del 4to dedo, falange proximal.', {  top: '10%', left: '70%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUSt7" onClick={() => handleButtonClick('DORSO DE LA MANO - Punto medio entre 4to y 5to metacarpianos.', { top: '10%', left: '70%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUSt8" onClick={() => handleButtonClick('MUÑECA. Estimulo Antidrómico a 14 cm con dirección proximal del electrodo de registro, medial y adyacente al tendón cubital anterior.', {  top: '10%', left: '70%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnarSt-G-02.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnarSt-T-01.png",{ top: '2%', left: '2%' })}></button>}
            </div>
            {textBoxVisible && (
                <div className="text-boxUSt" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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

export default UlnarSt