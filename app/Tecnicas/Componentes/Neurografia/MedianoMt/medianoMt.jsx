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
                {currentImageIndex === 0 && <button className="btnM1" onClick={() => handleButtonClick('1. Muñeca: 8 cm proximal a electrodo activo, entre los tendones del palmar mayor y palmar menor, realizando una línea imaginaria con intersección dirigida al pliegue cutáneo del carpo, haciéndose horizontal en tercio distal del antebrazo.\n2. Codo: Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '20%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM2" onClick={() => handleButtonClick('Primera articulación metacarpofalángica.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM3" onClick={() => handleButtonClick('Músculo abductor corto del pulgar (ACP) (eminencia tenar lateral).', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM4" onClick={() => handleButtonClick('1. Muñeca: 8 cm proximal a electrodo activo, entre los tendones del palmar mayor y palmar menor, realizando una línea imaginaria con intersección dirigida al pliegue cutáneo del carpo, haciéndose horizontal en tercio distal del antebrazo.\n2. Codo: Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '20%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM5" onClick={() => handleButtonClick('Dorso de la mano o antebrazo.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM6" onClick={() => handleButtonClick('1. Muñeca: 8 cm proximal a electrodo activo, entre los tendones del palmar mayor y palmar menor, realizando una línea imaginaria con intersección dirigida al pliegue cutáneo del carpo, haciéndose horizontal en tercio distal del antebrazo.\n2. Codo: Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '20%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/MedianoMt-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/MedianoMt-T-01.png",{ top: '5%', left: '-10%' })}></button>}
                
            {/* Segunda Imagen */}
                {currentImageIndex === 1 && <button className="btnM7" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM8" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM9" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM10" onClick={() => handleButtonClick('Texto desde el boton 4', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM11" onClick={() => handleButtonClick('Texto desde el boton 5', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM12" onClick={() => handleButtonClick('Texto desde el boton 6', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM13" onClick={() => handleButtonClick('Texto desde el boton 7', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/MedianoMt-G-02.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/MedianoMt-T-02.png",{ top: '5%', left: '-10%' })}></button>}
                

            {/* Tercera Imagen */}
                {currentImageIndex === 2 && <button className="btnM14" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnM15" onClick={() => handleButtonClick('Antebrazo, región medial', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnM16" onClick={() => handleButtonClick('Flexor largo del pulgar. Antebrazo palmar, 3 travesees de dedo proximal de muñeca entre los tendones del supinador largo y palmar mayor.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnM17" onClick={() => handleButtonClick('Proceso estiloides radial en el carpo.', { top: '12%', left: '24%' })}></button>}
            {/* Cuarta Imagen */}
                {currentImageIndex === 3 && <button className="btnM18" onClick={() => handleButtonClick('Distal al recorrido del tendón.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnM19" onClick={() => handleButtonClick('Pronador cuadrado. Con aguja monopolar (o concéntrica sin necesidad de referencia) 2cm proximal de la apófisis estiloides cubital, cara dorsal de antebrazo entre huesos radio/cubito.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnM20" onClick={() => handleButtonClick('Dorso de la mano o antebrazo.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnM21" onClick={() => handleButtonClick('Codo: Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/MedianoMt-G-02.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Quinta Imagen */}
                {currentImageIndex === 4 && <button className="btnM22" onClick={() => handleButtonClick('Distal al recorrido del tendón 2 cm proximales a muñeca.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnM23" onClick={() => handleButtonClick('Tercio medio del antebrazo. ', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnM24" onClick={() => handleButtonClick('Flexor radial del Carpo (Palmar Mayor). Antebrazo tercio medio, línea trazada del centro del pliegue del codo al centro de la fila proximal de los huesos del carpo.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnM25" onClick={() => handleButtonClick('Texto desde el boton 4', { top: '12%', left: '24%' })}></button>}
            {/* Sexta Imagen */}
                {currentImageIndex === 5 && <button className="btnM26" onClick={() => handleButtonClick('Codo: Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnM27" onClick={() => handleButtonClick('Distal al recorrido del tendón en tercio medio de antebrazo con orientación radial.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnM28" onClick={() => handleButtonClick('Tercio medio del antebrazo.', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnM29" onClick={() => handleButtonClick('Pronador redondo. Antebrazo, vientre muscular buscar contracción activa, o 4 cm distal a pliegue del codo discretamente con orientación cubital a línea media.', { top: '12%', left: '24%' })}></button>}
            {/* Septima Imagen */}
                {currentImageIndex === 6 && <button className="btnM30" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btnM31" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '12%', left: '24%' })}></button>}
            </div>
            {textBoxVisible && (
                <div className="text-boxM" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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
                        maxWidth: '25vw',
                        maxHeight: '20vh',
                        transition: 'transform 0.3s ease',
                    }}
                    className="zoomable-imageMt"
                    />
                </div>
            )}
        </div>
    );
}

export default MedianoMt