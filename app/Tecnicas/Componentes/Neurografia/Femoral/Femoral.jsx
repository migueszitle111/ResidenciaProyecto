import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Femoral/Femoral.css";


const Femoral = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxFm');
    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-Femoral.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Femoral.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Femoral.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Femoral.png",
        },
    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
    };

    const handleButtonClick = (content, position, customClass = 'text-boxFm') => {
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
            {currentImageIndex === 0 && <button className="btnFm1" onClick={() => handleButtonClick('INGUINAL. Se aplica justo debajo del ligamento inguinal y lateral a la arteria femoral.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFm2" onClick={() => handleButtonClick('Zona media lateral entre estimulo y registro.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFm3" onClick={() => handleButtonClick('RECTUS FEMORIS L2, L3, L4 - Colocar el electrodo de superficie sobre la cara anterior del muslo, a la media distancia entre el ligamento inguinal y el polo superior de la rótula. Se pueden utilizar distancias establecidas desde el ligamento inguinal en dirección distal de 14 y 30 cm.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFm4" onClick={() => handleButtonClick('Distal al tendón del recto femoral, cerca del borde superior de la rótula.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Femoral-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Femoral-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnFm5" onClick={() => handleButtonClick('ARRIBA DEL LIGAMENTO INGUINAL. 5.5 cm con dirección proximal o cefálica con relación al estímulo por debajo del ligamento inguinal.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm6" onClick={() => handleButtonClick('DEBAJO DEL LIGAMENTO INGUINAL. Justo debajo del ligamento inguinal y lateral a la arteria femoral.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm7" onClick={() => handleButtonClick('Entre estimulo y registro.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm8" onClick={() => handleButtonClick('VASTUS LATERALIS L2, L3, L4 - Colocando el electrodo de registro en el vientre muscular con una distancia deseable desde el ligamento inguinal de 35.4 ± 1.9 cm. El punto motor se puede ubicar a 8 cm con dirección proximal del ángulo formado por los bordes superior y lateral de la rótula.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm9" onClick={() => handleButtonClick('Distal al recorrido del tendón, cerca del borde superior de la rótula con orientacion lateral.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm10" onClick={() => handleButtonClick('VASTUS MEDIALIS L2, L3, L4 - Colocando el electrodo de registro en el vientre muscular con una distancia deseable desde el ligamento inguinal de 35.4 ± 1.9 cm. El punto motor se puede ubicar a 8 cm con dirección proximal del ángulo formado por los bordes superior y medial de la rótula.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFm11" onClick={() => handleButtonClick('Distal al recorrido del tendón, cerca del borde superior de la rótula con orientacion medial.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Femoral-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Femoral-T-02.png",{ top: '5%', left: '2%' })}></button>}
            
            
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxFm ${textBoxClass}`}
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

export default Femoral