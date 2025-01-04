import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Ciatico/Ciatico.css"


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
            {currentImageIndex === 0 && <button className="btnCt1" onClick={() => handleButtonClick('1', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCt2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCt3" onClick={() => handleButtonClick('3', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCt4" onClick={() => handleButtonClick('4', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnCt5" onClick={() => handleButtonClick('5', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnCt6" onClick={() => handleButtonClick('6', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCt7" onClick={() => handleButtonClick('7', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCt8" onClick={() => handleButtonClick('8', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnCt9" onClick={() => handleButtonClick('9', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxCt" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Ciatico