import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Espinal/Espinal.css"


const Espinal = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/Cervicales/01-Espinal.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Espinal.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/02-Espinal.png",
            thumbnail: "/assets/ValoresImg/Cervicales/02-Espinal.png",
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
            {currentImageIndex === 0 && <button className="btnEp1" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnEp2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 0 && <button className="btnEp3" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnEp4" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
            
            {currentImageIndex === 1 && <button className="btnEp5" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnEp6" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 1 && <button className="btnEp7" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnEp8" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 1 && <button className="btnEp9" onClick={() => handleButtonClick('5', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnEp10" onClick={() => handleButtonClick('6', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 1 && <button className="btnEp11" onClick={() => handleButtonClick('7', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnEp12" onClick={() => handleButtonClick('8', { top: '12%', left: '32%'})}></button>}
            
            
            </div>
            {textBoxVisible && (
                <div className="text-box" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Espinal