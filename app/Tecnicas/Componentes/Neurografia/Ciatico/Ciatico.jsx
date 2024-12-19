import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "./style.css"


const Ciatico = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

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
            thumbnailPosition="bottom"s
            bulletclass="bullet"
        />
        <div>
            {/* Primera Imagen */}
                {currentImageIndex === 0 && <button className="btnSc1" onClick={() => handleButtonClick('Ligeramente distal a articulación metacarpofalángica, evitando colocar electrodo sobre el pliegue cutáneo.', {  top: '12%', left: '32%' })}>A</button>}
                {currentImageIndex === 0 && <button className="btnSc2" onClick={() => handleButtonClick('Dorso de la mano.', { top: '12%', left: '32%'})}>T</button>}
            </div>
            {textBoxVisible && (
                <div className="text-box" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Ciatico