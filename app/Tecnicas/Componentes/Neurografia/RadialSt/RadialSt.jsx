import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../RadialSt/RadialSt.css"

const RadialSt = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

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
                {currentImageIndex === 0 && <button className="btnRSt1" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRSt2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnRSt3" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRSt4" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                
                {currentImageIndex === 1 && <button className="btnRSt5" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRSt6" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRSt7" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRSt8" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                
            </div>
            {textBoxVisible && (
                <div className="text-boxRst" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default RadialSt