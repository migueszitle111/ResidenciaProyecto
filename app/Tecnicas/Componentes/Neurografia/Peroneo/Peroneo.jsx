import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Peroneo/Peroneo.css";


const Peroneo = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Peroneo.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Peroneo.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/03-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/03-Peroneo.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/04-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/04-Peroneo.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/05-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/05-Peroneo.png",
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
            {currentImageIndex === 0 && <button className="btnPr1" onClick={() => handleButtonClick('Articulación metatarsofalángica del quinto ortejo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr2" onClick={() => handleButtonClick('EXTENSOR DIGITORUM BREVIS L5, S1 - Región anterolateral mediotarsiana proximal, trazar una línea imaginaria desde el centro del maléolo lateral hasta la articulación metatarsofalángica del quinto ortejo y colocar electrodo de superficie en el centro del tercio proximal.', { top: '14%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr3" onClick={() => handleButtonClick('TOBILLO. 8 cm proximal del electrodo activo, discretamente lateral al tendón del tibial anterior.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr4" onClick={() => handleButtonClick('Dorso del pie o talón.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr5" onClick={() => handleButtonClick('FÍBULA. Detrás y discretamente por debajo de la cabeza del peroné.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr6" onClick={() => handleButtonClick('RODILLA. En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/01-Peroneo-G.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/01-Peroneo-T.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnPr7" onClick={() => handleButtonClick('RODILLA. En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '10%', left: '75%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPr8" onClick={() => handleButtonClick('Tibia medial o rotula', { top: '10%', left: '75%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPr9" onClick={() => handleButtonClick('FÍBULA. Detrás y discretamente por debajo de la cabeza del peroné.', { top: '10%', left: '75%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPr10" onClick={() => handleButtonClick('TIBIALIS ANTERIOR L4, L5 - Cara lateral de la tibia, el electrodo de superficie se coloca en la unión del tercio proximal y medio de la pierna, en el punto exacto de una línea trazada entre la tuberosidad tibial anterior y el maléolo lateral.', { top: '12%', left: '75%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPr11" onClick={() => handleButtonClick('4 cm distal al electrodo activo sobre el tendón del Tibial anterior.', { top: '10%', left: '75%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/02-Peroneo-G.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/02-Peroneo-T.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 2 && <button className="btnPr12" onClick={() => handleButtonClick('RODILLA. En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPr13" onClick={() => handleButtonClick('FÍBULA. Detrás y discretamente por debajo de la cabeza del peroné.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPr14" onClick={() => handleButtonClick('PERONEUS LONGUS L5, S1 - El electrodo de superficie se coloca a 8 cm distal del punto de estimulación de la fíbula sobre una línea trazada entre maléolo lateral y la cabeza del peroné.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPr15" onClick={() => handleButtonClick('4 cm distal del electrodo activo sobre el recorrido del tendón.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPr16" onClick={() => handleButtonClick('Tibia medial.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/03-Peroneo-G.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 2 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/02-Peroneo-T.png",{ top: '5%', left: '2%' })}></button>}

            {currentImageIndex === 3 && <button className="btnPr17" onClick={() => handleButtonClick('RODILLA. En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnPr18" onClick={() => handleButtonClick('FÍBULA. Detrás y discretamente por debajo de la cabeza del peroné.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnPr19" onClick={() => handleButtonClick('Tibia medial.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnPr20" onClick={() => handleButtonClick('EXTENSOR HALLUCIS LONGUS L5-S1 - Electrodo de superficie colocado entre el tercio distal y medio de la pierna a 2 cm lateral del borde de la tibia.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnPr21" onClick={() => handleButtonClick('4 cm distal del electrodo activo.', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/03-Peroneo-G.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 3 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/02-Peroneo-T.png",{ top: '5%', left: '2%' })}></button>}

            {currentImageIndex === 4 && <button className="btnPr22" onClick={() => handleButtonClick('Rótula.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr23" onClick={() => handleButtonClick('TIBIALIS ANTERIOR L4, L5 - Cara lateral de la tibia, el electrodo de superficie se coloca en la unión del tercio proximal y medio de la pierna, en el punto exacto de una línea trazada entre la tuberosidad tibial anterior y el maléolo lateral.', { top: '58%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr24" onClick={() => handleButtonClick('4 cm distal al electrodo activo sobre el tendón del Tibial anterior.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr25" onClick={() => handleButtonClick('Rotula.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr26" onClick={() => handleButtonClick('Articulación metatarsofalángica del quinto ortejo.', { top: '60%', left: '23%' })}></button>}           
            {currentImageIndex === 4 && <button className="btnPr27" onClick={() => handleButtonClick('EXTENSOR DIGITORUM BREVIS L5, S1 - Región anterolateral mediotarsiana proximal, trazar una línea imaginaria desde el centro del maléolo lateral hasta la articulación metatarsofalángica del quinto ortejo y colocar electrodo de superficie en el centro del tercio proximal.', { top: '58%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr28" onClick={() => handleButtonClick('Talón.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr29" onClick={() => handleButtonClick('P6. La estimulación se aplica a intervalos de 2 cm a lo largo del trayecto del nervio Peroneo a través de la fíbula. El punto de estimulación “P” se identifica como el punto 0 o cabeza del peroné. Los puntos D2 y D4 corresponden a 2 y 4 cm distales al punto “P”. Los puntos P2, P4 y P6 corresponden a 2, 4 y 6 cm proximales respectivamente.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr30" onClick={() => handleButtonClick('P4. La estimulación se aplica a intervalos de 2 cm a lo largo del trayecto del nervio Peroneo a través de la fíbula. El punto de estimulación “P” se identifica como el punto 0 o cabeza del peroné. Los puntos D2 y D4 corresponden a 2 y 4 cm distales al punto “P”. Los puntos P2, P4 y P6 corresponden a 2, 4 y 6 cm proximales respectivamente.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr31" onClick={() => handleButtonClick('P2. La estimulación se aplica a intervalos de 2 cm a lo largo del trayecto del nervio Peroneo a través de la fíbula. El punto de estimulación “P” se identifica como el punto 0 o cabeza del peroné. Los puntos D2 y D4 corresponden a 2 y 4 cm distales al punto “P”. Los puntos P2, P4 y P6 corresponden a 2, 4 y 6 cm proximales respectivamente.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr32" onClick={() => handleButtonClick('P. La estimulación se aplica a intervalos de 2 cm a lo largo del trayecto del nervio Peroneo a través de la fíbula. El punto de estimulación “P” se identifica como el punto 0 o cabeza del peroné. Los puntos D2 y D4 corresponden a 2 y 4 cm distales al punto “P”. Los puntos P2, P4 y P6 corresponden a 2, 4 y 6 cm proximales respectivamente.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr33" onClick={() => handleButtonClick('D2. La estimulación se aplica a intervalos de 2 cm a lo largo del trayecto del nervio Peroneo a través de la fíbula. El punto de estimulación “P” se identifica como el punto 0 o cabeza del peroné. Los puntos D2 y D4 corresponden a 2 y 4 cm distales al punto “P”. Los puntos P2, P4 y P6 corresponden a 2, 4 y 6 cm proximales respectivamente.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr34" onClick={() => handleButtonClick('D4. La estimulación se aplica a intervalos de 2 cm a lo largo del trayecto del nervio Peroneo a través de la fíbula. El punto de estimulación “P” se identifica como el punto 0 o cabeza del peroné. Los puntos D2 y D4 corresponden a 2 y 4 cm distales al punto “P”. Los puntos P2, P4 y P6 corresponden a 2, 4 y 6 cm proximales respectivamente.', { top: '60%', left: '23%' })}></button>}
            {currentImageIndex === 4 && <button className="btnIPr1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/04-Peroneo-G.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 4 && <button className="btnIPr2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/04-Peroneo-T.png",{ top: '5%', left: '2%' })}></button>}
            {currentImageIndex === 4 && <button className="btnIPr3" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/06-Peroneo-G.png",{ top: '5%', left: '2%' })}></button>}
            
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

export default Peroneo