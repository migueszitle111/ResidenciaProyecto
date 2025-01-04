import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../ToracicoLargo/ToracicoLargo.css"


const ToracicoLargo = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosSp/01-ToracicoLargo.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-ToracicoLargo.png",
            
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
            {currentImageIndex === 0 && <button className="btnTl1" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTl2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 0 && <button className="btnTl3" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTl4" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
        
            </div>
            {textBoxVisible && (
                <div className="text-boxTl" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default ToracicoLargo