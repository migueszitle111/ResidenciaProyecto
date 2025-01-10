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
                {currentImageIndex === 0 && <button className="btnUSt1" onClick={() => handleButtonClick('1. Muñeca: Estimulo Antidrómico a 14 cm con dirección proximal al electrodo de registro, medial y adyacente al tendón cubital anterior.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUSt2" onClick={() => handleButtonClick('Ligeramente distal a la articulación metacarpofalángica, evitando colocar electrodo sobre pliegue cutáneo.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUSt3" onClick={() => handleButtonClick('Ligeramente distal a la articulación metacarpofalángica, evitando colocar electrodo sobre pliegue cutáneo.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUSt4" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo en articulación interfalangica distal.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUSt5" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo en articulación interfalangica distal.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnarSt-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnarSt-T-01.png",{ top: '2%', left: '2%' })}></button>}
            
                {currentImageIndex === 1 && <button className="btnUSt6" onClick={() => handleButtonClick('4 cm distalmente sobre dorso del 5to dedo, falange proximal.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUSt7" onClick={() => handleButtonClick('Dorso de la mano, punto medio entre 4to y 5to metacarpianos.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUSt8" onClick={() => handleButtonClick('1. Muñeca: 8-10 cm en tercio distal del antebrazo, ligeramente proximal a la estiloides cubital y adyacente al tendón del musculo cubital anterior.', {  top: '12%', left: '32%' })}></button>}
                
            </div>
            {textBoxVisible && (
                <div className="text-boxUSt" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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
                    className="zoomable-imageUlSt"
                    />
                </div>
            )}
        </div>
    );
}

export default UlnarSt