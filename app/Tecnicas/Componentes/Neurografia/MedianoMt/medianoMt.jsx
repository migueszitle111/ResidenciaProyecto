import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.css";



const MedianoMt = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

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
    };

    const handleButtonClick = (content, position) => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTextBoxVisible(true);
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
                {currentImageIndex === 0 && <button className="btnM1" onClick={() => handleButtonClick('Texto desde el botón 1', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM2" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM3" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM4" onClick={() => handleButtonClick('Texto desde el boton 4', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM5" onClick={() => handleButtonClick('Texto desde el boton 5', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 0 && <button className="btnM6" onClick={() => handleButtonClick('Texto desde el boton 6', { top: '12%', left: '24%' })}></button>}
            {/* Segunda Imagen */}
                {currentImageIndex === 1 && <button className="btnM7" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM8" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM9" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM10" onClick={() => handleButtonClick('Texto desde el boton 4', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM11" onClick={() => handleButtonClick('Texto desde el boton 5', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM12" onClick={() => handleButtonClick('Texto desde el boton 6', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 1 && <button className="btnM13" onClick={() => handleButtonClick('Texto desde el boton 7', { top: '12%', left: '24%' })}></button>}
            {/* Tercera Imagen */}
                {currentImageIndex === 2 && <button className="btnM14" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnM15" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnM16" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 2 && <button className="btnM17" onClick={() => handleButtonClick('Texto desde el boton 4', { top: '12%', left: '24%' })}></button>}
            {/* Cuarta Imagen */}
                {currentImageIndex === 3 && <button className="btnM18" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnM19" onClick={() => handleButtonClick('Texto desde el botón 2', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnM20" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 3 && <button className="btnM21" onClick={() => handleButtonClick('Texto desde el boton 4', { top: '12%', left: '24%' })}></button>}
            {/* Quinta Imagen */}
                {currentImageIndex === 4 && <button className="btnM22" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnM23" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnM24" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnM25" onClick={() => handleButtonClick('Texto desde el boton 4', { top: '12%', left: '24%' })}></button>}
            {/* Sexta Imagen */}
                {currentImageIndex === 5 && <button className="btnM26" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnM27" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnM28" onClick={() => handleButtonClick('Texto desde el boton 3', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnM29" onClick={() => handleButtonClick('Texto desde el boton 4', { top: '12%', left: '24%' })}></button>}
            {/* Septima Imagen */}
                {currentImageIndex === 6 && <button className="btnM30" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '12%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btnM31" onClick={() => handleButtonClick('Texto desde el boton 2', { top: '12%', left: '24%' })}></button>}
            </div>
            {textBoxVisible && (
                <div className="text-boxM" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default MedianoMt