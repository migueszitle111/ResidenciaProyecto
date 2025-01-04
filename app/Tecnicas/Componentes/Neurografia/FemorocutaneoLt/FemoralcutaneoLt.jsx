import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../FemorocutaneoLt/FemoralcutaneoLt.css"


const FemoralcutaneoLt = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-FemoralcutaneoLt.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-FemoralcutaneoLt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-FemoralcutaneoLt.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-FemoralcutaneoLt.png",
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
            {currentImageIndex === 0 && <button className="btnFcL1" onClick={() => handleButtonClick('1', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFcL2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFcL3" onClick={() => handleButtonClick('3', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnFcL4" onClick={() => handleButtonClick('4', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFcL5" onClick={() => handleButtonClick('5', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFcL6" onClick={() => handleButtonClick('6', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFcL7" onClick={() => handleButtonClick('7', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxFcL" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default FemoralcutaneoLt