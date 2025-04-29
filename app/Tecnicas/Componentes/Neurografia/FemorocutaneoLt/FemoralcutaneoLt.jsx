import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../FemorocutaneoLt/FemoralcutaneoLt.css";


const FemoralcutaneoLt = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-FemoralcutaneoLt.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-FemoralcutaneoLt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-FemoralcutaneoLt.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-FemoralcutaneoLt.png",
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
            {currentImageIndex === 0 && <button className="btnFcL1" onClick={() => handleButtonClick('4 cm en dirección cefálica o ascendente del electrodo activo.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFcL2" onClick={() => handleButtonClick('ORTODRÓMICA - Colocar electrodo de superficie a 1 cm medial de la espina iliaca anterosuperior.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFcL3" onClick={() => handleButtonClick('MUSLO ANTERO-LATERAL. Aplicar la estimulación entre 12 a 16 cm distal del electrodo activo, sobre una línea tazada desde la espina iliaca anterosuperior hasta el borde lateral de la rótula.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/FemoralLt-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/FemoralLt-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnFcL4" onClick={() => handleButtonClick('EIASs. Por arriba del ligamento inguinal 1 cm medial a la espina iliaca anterosuperior.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFcL5" onClick={() => handleButtonClick('EIASi. Por debajo del ligamento inguinal sobre el origen del musculo Sartorio.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFcL6" onClick={() => handleButtonClick('ANTIDRÓMICA. Colocar electrodo de superficie sobre la cara anterior del muslo a 16-20 cm distal de la espina ilíaca anterosuperior, siguiendo una línea imaginaria hasta el borde lateral de la rótula.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFcL7" onClick={() => handleButtonClick('3-4 cm distal del electrodo activo.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/FemoralLt-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/FemoralLt-T-02.png",{ top: '5%', left: '2%' })}></button>}
            
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

export default FemoralcutaneoLt