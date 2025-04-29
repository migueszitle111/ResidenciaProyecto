import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Ciatico/Ciatico.css";


const Ciatico = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxCt');
    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const images = [
        {
            original: "/assets/ValoresImg/Sacro/01-Ciatico.png",
            thumbnail: "/assets/ValoresImg/Sacro/01-Ciatico.png",
        },
        {
            original: "/assets/ValoresImg/Sacro/02-Ciatico.png",
            thumbnail: "/assets/ValoresImg/Sacro/02-Ciatico.png",
        },
    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
    };

    const handleButtonClick = (content, position, customClass = 'text-boxCt') => {
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
            thumbnailPosition="bottom"s
            bulletclass="bullet"
        />
        <div>
            {/* Primera Imagen */}
            {currentImageIndex === 0 && <button className="btnCt1" onClick={() => handleButtonClick('SACRO. Se inserta la aguja de estimulación monopolar alrededor de 1 cm medial y ligeramente caudal a la espina ilíaca postero superior, el ánodo será un electrodo de superficie colocado sobre la apófisis espinosa. Con este registro se puede determinar la conducción a través del plexo sacro, posterior a la evaluación del nervio Ciático y restando el cálculo de su latencia.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCt2" onClick={() => handleButtonClick('GLÚTEO. Se inserta una aguja monopolar (cátodo) de 0.75 mm en el pliegue glúteo a media distancia de la intersección entre la tuberosidad isquiática y el trocánter mayor, u horizontalmente con referencia a una línea trazada desde el vértice del hueco poplíteo. Electrodo de superficie cercano a aguja de estimulación como ánodo.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCt3" onClick={() => handleButtonClick('Entre registro y estimulación.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCt4" onClick={() => handleButtonClick('HUECO POPL+ITEO. Con estimulador convencional de puntas, se realiza la estimulación respectiva de nervio Peroneo siguiendo el trayecto a nivel lateral.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCt5" onClick={() => handleButtonClick('HUECO POPLÍTEO. Con estimulador convencional de puntas, se realiza la estimulación respectiva de nervio Tibial siguiendo el trayecto  a nivel medial.', { top: '62%', left: '50%' })}></button>}
            
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Sacro/Ciatico-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnCt6" onClick={() => handleButtonClick('Articulación metatarsofalángica del quinto ortejo.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCt7" onClick={() => handleButtonClick('EXTENSOR DIGITORUM BREVIS L5, S1 - Región anterolateral mediotarsiana proximal, trazar una línea imaginaria desde el centro del maléolo lateral hasta la articulación metatarsofalángica del quinto ortejo y colocar electrodo de superficie en el centro del tercio proximal.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCt8" onClick={() => handleButtonClick('ABDUCTOR HALLUCIS S1, S2 - Colocar electrodo de superficie ligeramente proximal y por debajo de la tuberosidad navicular, aproximadamente 1 cm en ambas direcciones.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCt9" onClick={() => handleButtonClick('Base del primer metatarsiano, o en la articulación metatarsofalángica.', { top: '62%', left: '50%' })}></button>}
            {currentImageIndex === 1 && <button className="btnICt3" onClick={() => openModal("/assets/ValoresImg/Sacro/Ciatico-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Sacro/Ciatico-G-01.png",{ top: '2%', left: '2%' })}></button>}
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxCt ${textBoxClass}`}
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

export default Ciatico