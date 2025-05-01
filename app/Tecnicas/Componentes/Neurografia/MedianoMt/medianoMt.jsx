import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../MedianoMt/medianoMt.css";



const MedianoMt = () => {
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
            original: "/assets/ValoresImg/01_01 Abductor Corto del Pulgar V3.png",
            thumbnail: "/assets/ValoresImg/01_01 Abductor Corto del Pulgar V3.png",
            
        },
        {
            original: "/assets/ValoresImg/01_02 Abductor Corto del Pulgar Complemento V3.png",
            thumbnail: "/assets/ValoresImg/01_02 Abductor Corto del Pulgar Complemento V3.png"
        },
        {
            original: "/assets/ValoresImg/01_03 Flexor Largo del Pulgar V3.png",
            thumbnail: "/assets/ValoresImg/01_03 Flexor Largo del Pulgar V3.png"
        },
        {
            original: "/assets/ValoresImg/01_04 Pronador Cuadrado V3.png",
            thumbnail: "/assets/ValoresImg/01_04 Pronador Cuadrado V3.png"
        },
        {
            original: "/assets/ValoresImg/01_05 Palmar Mayor V3.png",
            thumbnail: "/assets/ValoresImg/01_05 Palmar Mayor V3.png"
        },
        {
            original: "/assets/ValoresImg/01_06 Pronador Redondo V3.png",
            thumbnail: "/assets/ValoresImg/01_06 Pronador Redondo V3.png"
        },
        {
            original: "/assets/ValoresImg/01_07 Inching V3.png",
            thumbnail: "/assets/ValoresImg/01_07 Inching V3.png"
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

    const handleImageBoxClick = (image, position) => {
        if (imageBoxVisible && imageBoxContent === image) {
            setImageBoxVisible(false);
        } else {
            setImageBoxContent(image);
            setImageBoxPosition(position);
            setImageBoxVisible(true);
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
                {currentImageIndex === 0 && <button className="btnM1" onClick={() => handleButtonClick('PALMA. 7 cm distal del punto de la muñeca entre los dedos índice y medio.', { top: '10%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM2" onClick={() => handleButtonClick('Primera articulación metacarpofalángica.', { top: '10%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM3" onClick={() => handleButtonClick('ABDUCTOR POLLICIS BREVIS C8, T1 - (eminencia tenar lateral).', { top: '10%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM4" onClick={() => handleButtonClick('MUÑECA. 8 cm proximal a electrodo activo, entre los tendones del palmar mayor y palmar menor, trazando una línea imaginaria con la intersección en el pliegue cutáneo del carpo, haciéndose horizontal en tercio distal del antebrazo.', { top: '15%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM5" onClick={() => handleButtonClick('Dorso de la mano o antebrazo.', { top: '10%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM6" onClick={() => handleButtonClick('CODO. Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '10%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-T-01.png",{ top: '5%', left: '-10%' })}></button>}
                
            {/* Segunda Imagen */}
                {currentImageIndex === 1 && <button className="btnM7" onClick={() => handleButtonClick('Primera articulación metacarpofalángica.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM8" onClick={() => handleButtonClick('ABDUCTOR POLLICIS BREVIS C8, T1 - (eminencia tenar lateral).', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM9" onClick={() => handleButtonClick('MUÑECA. 8 cm proximal a electrodo activo, entre los tendones del palmar mayor y palmar menor.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM10" onClick={() => handleButtonClick('Dorso de la mano o antebrazo.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM11" onClick={() => handleButtonClick('CODO. Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM12" onClick={() => handleButtonClick('AXILA. Base del hueco axilar a 1cm distal entre el borde lateral de los músculos Pectoral menor y porción corta del Bíceps braquial.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM13" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, lateral al esternocleidomastoideo.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-02.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-T-02.png",{ top: '5%', left: '-10%' })}></button>}
                

            {/* Tercera Imagen */}
                {currentImageIndex === 2 && <button className="btnM14" onClick={() => handleButtonClick('CODO. Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnM15" onClick={() => handleButtonClick('Antebrazo, región medial.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnM16" onClick={() => handleButtonClick('FLEXOR POLLICIS LONGUS C7, C8, T1 - Antebrazo cara ventral, 3 travesees de dedo proximal a la muñeca entre los tendones del supinador largo y palmar mayor.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnM17" onClick={() => handleButtonClick('Proceso estiloides radial en el carpo.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-03.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Cuarta Imagen */}
                {currentImageIndex === 3 && <button className="btnM18" onClick={() => handleButtonClick('Distal al recorrido del tendón.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnM19" onClick={() => handleButtonClick('PRONATOR QUADRATUS C7, C8, T1 - Con aguja monopolar (o concéntrica sin necesidad de referencia) 2cm proximal de la apófisis estiloides cubital, cara dorsal de antebrazo entre huesos radio/cubito.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnM20" onClick={() => handleButtonClick('Dorso de la mano o antebrazo.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnM21" onClick={() => handleButtonClick('CODO. Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-02.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 3 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-03.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Quinta Imagen */}
                {currentImageIndex === 4 && <button className="btnM22" onClick={() => handleButtonClick('Distal al recorrido del tendón o 2 cm proximal aL pliegue de la muñeca.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnM23" onClick={() => handleButtonClick('Tercio medio del antebrazo.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnM24" onClick={() => handleButtonClick('FLEXOR CARPI RADIALIS C6, C7 - Antebrazo tercio medio, línea trazada desde el centro del pliegue del codo hasta al centro de la fila proximal de los huesos del carpo.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnM25" onClick={() => handleButtonClick('CODO. Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-04.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Sexta Imagen */}
                {currentImageIndex === 5 && <button className="btnM26" onClick={() => handleButtonClick('CODO. Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnM27" onClick={() => handleButtonClick('Distal al recorrido del tendón, en el tercio medio del antebrazo con orientación radial.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnM28" onClick={() => handleButtonClick('Tercio medio del antebrazo.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnM29" onClick={() => handleButtonClick('PRONATOR TERES - Antebrazo, vientre muscular buscar contracción activa, o 4 cm distal a pliegue del codo discretamente con orientación cubital a línea media.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-04.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Septima Imagen */}
                {currentImageIndex === 6 && <button className="btnM30" onClick={() => handleButtonClick('MUÑECA. Se realiza a intervalos de 1 cm a lo largo del trayecto del nervio Mediano. La referencia 0 se asigna al pliegue cutáneo del carpo: Los puntos de estimulación distales se marcan con un signo negativo y los puntos proximales con un signo positivo o neutral.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btnM31" onClick={() => handleButtonClick('ABDUCTOR POLLICIS BREVIS C8, T1 - (eminencia tenar lateral).', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btnM32" onClick={() => handleButtonClick('Primera articulación metacarpofalángica.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-05.png",{ top: '2%', left: '2%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxMs ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
                <div
                    className="image-boxM"
                    style={{
                        top: imageBoxPosition.top,
                        left: imageBoxPosition.left,
                        position: 'absolute',
                    }}
                >
                    <img
                        src={imageBoxContent}
                        alt="Cuadro dinámico"
                        style={{
                            position: 'absolute',
                            maxWidth: '18vw',
                            maxHeight: '18vh',
                            transition: 'transform 0.3s ease',
                        }}
                        className="zoomable-image"
                    />
                </div>
            )}

            {modalVisible && (
                <div className="modal-gallery">
                    {/* <button className="close-btn" onClick={closeModal}>x</button> */}

                    <button className={`print-button`} onClick={closeModal}>
                        <img src="/I_X.webp" style={{filter: 'invert(1)'}}/>
                    </button>
                    <img src={extraImage} alt="Imagen Extra" className="modal-image" />
                </div>
            )}
        </div>
    );
};

export default MedianoMt