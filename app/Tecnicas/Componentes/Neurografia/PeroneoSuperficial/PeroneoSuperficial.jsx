import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../PeroneoSuperficial/PeroneoSuperficial.css";


const PeroneoSuperficial = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-PeroneoSuperficial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-PeroneoSuperficial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-PeroneoProfundo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-PeroneoProfundo.png",
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
            {currentImageIndex === 0 && <button className="btnPs1" onClick={() => handleButtonClick('Dorso del pie.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs2" onClick={() => handleButtonClick('3-4 cm distal del electrodo de registo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs3" onClick={() => handleButtonClick('2 cm distal: registro de la rama cutánea dorsal medial y 1 cm lateral rama cutánea dorsal intermedia.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs4" onClick={() => handleButtonClick('3-4 cm distal del electrodo de registo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs5" onClick={() => handleButtonClick('INTERMALEOLAR - Electrodo de superficie, colocar preferetemente barra en la línea media, entre el maléolo lateral y el tendón del tibial anterior, transversal a la intersección de ambos maléolos.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs6" onClick={() => handleButtonClick('PIERNA LATERAL. (Antidrómico) 12-14 cm proximal del electrodo activo, anterior al musculo peroneo largo y adyacente al musculo tibial anterior.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/PeroneoSp-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/PeroneoSp-T-01.png",{ top: '5%', left: '2%' })}></button>}
            

            {currentImageIndex === 1 && <button className="btnPs7" onClick={() => handleButtonClick('Dorso del pie.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPs8" onClick={() => handleButtonClick('3-4 cm distal del electrodo de registo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPs9" onClick={() => handleButtonClick('INTERMALEOLAR - Electrodo de superficie, colocar preferetemente barra en la línea media, entre el maléolo lateral y el tendón del tibial anterior, transversal a la intersección de ambos maléolos.', { top: '10%', left: '23%' })}></button>}
            {/* {currentImageIndex === 1 && <button className="btnPs10" onClick={() => handleButtonClick('8', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPs11" onClick={() => handleButtonClick('9', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPs12" onClick={() => handleButtonClick('10', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPs13" onClick={() => handleButtonClick('11', { top: '10%', left: '23%' })}></button>} */}
            {currentImageIndex === 1 && <button className="btnPs14" onClick={() => handleButtonClick('PIERNA LATERAL. La estimulación se aplica de forma antidrómica como primer punto a 12 cm en dirección proximal del electrodo activo justo lateral al tendón extensor largo del primer ortejo en la región lateral de la pierna. Los siguientes puntos de estímulo de aplicaran cada centímetro en dirección distal hasta llegar al electrodo de registro.', { top: '15%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/PeroneoPf-G-02.png",{ top: '2%', left: '2%' })}></button>}
            
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

export default PeroneoSuperficial