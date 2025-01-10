import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../RadialSt/RadialSt.css"

const RadialSt = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-RadialSt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-RadialSt.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-RadialSt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-RadialSt.png",
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
                {currentImageIndex === 0 && <button className="btnRSt1" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRSt2" onClick={() => handleButtonClick('Dorso de la mano.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnRSt3" onClick={() => handleButtonClick('Dorso de la mano, tabaquera anatómica formada por los tendones del extensor largo y corto del pulgar 1 cm distal al borde el radio.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRSt4" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo, borde lateral del segundo metacarpiano.', { top: '12%', left: '32%'})}></button>}
                
                {currentImageIndex === 1 && <button className="btnRSt5" onClick={() => handleButtonClick('3 distal a elétrodo activo sobre articulación interfalángica.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRSt6" onClick={() => handleButtonClick('Dorso del primer dedo/pulgar, discretamente distal a la primera articulación metacarpofalángica ', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRSt7" onClick={() => handleButtonClick('Dorso de la mano.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRSt8" onClick={() => handleButtonClick('1. Muñeca: En la parte media distal del radio 10/12/14 cm proximal al electrodo activo cara volar del antebrazo.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/RadialSt-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/RadialSt-T-01.png",{ top: '5%', left: '-10%' })}></button>}
                
            </div>
            {textBoxVisible && (
                <div className="text-boxRst" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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

export default RadialSt