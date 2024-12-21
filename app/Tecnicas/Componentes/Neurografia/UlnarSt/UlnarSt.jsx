import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "./style-UlnarSt.css"


const UlnarSt = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

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
                {currentImageIndex === 0 && <button className="btnUSt1" onClick={() => handleButtonClick('Ligeramente distal a articulación metacarpofalángica, evitando colocar electrodo sobre el pliegue cutáneo.', {  top: '12%', left: '32%' })}>A</button>}
                {currentImageIndex === 0 && <button className="btnUSt2" onClick={() => handleButtonClick('Dorso de la mano.', { top: '12%', left: '32%'})}>T</button>}
            </div>
            {textBoxVisible && (
                <div className="text-boxUSt" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default UlnarSt