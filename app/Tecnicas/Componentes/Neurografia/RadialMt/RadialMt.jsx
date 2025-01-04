import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../RadialMt/RadialMt.css"


const RadialMt = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosSp/01-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-RadialMt.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-RadialMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/03-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/03-RadialMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/04-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/04-RadialMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/05-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/05-RadialMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/06-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/06-RadialMt.png",
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
                {currentImageIndex === 0 && <button className="btnRMt1" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRMt2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnRMt3" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRMt4" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnRMt5" onClick={() => handleButtonClick('5', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRMt6" onClick={() => handleButtonClick('6', { top: '12%', left: '32%'})}></button>}
            
                {currentImageIndex === 1 && <button className="btnRMt7" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRMt8" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRMt9" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRMt10" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRMt11" onClick={() => handleButtonClick('5', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRMt12" onClick={() => handleButtonClick('6', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRMt13" onClick={() => handleButtonClick('7', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRMt14" onClick={() => handleButtonClick('8', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRMt15" onClick={() => handleButtonClick('9', {  top: '12%', left: '32%' })}></button>}
            
                {currentImageIndex === 2 && <button className="btnRMt16" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 2 && <button className="btnRMt17" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 2 && <button className="btnRMt18" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 2 && <button className="btnRMt19" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                
                {currentImageIndex === 3 && <button className="btnRMt20" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 3 && <button className="btnRMt21" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 3 && <button className="btnRMt22" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 3 && <button className="btnRMt23" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                
                {currentImageIndex === 4 && <button className="btnRMt24" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 4 && <button className="btnRMt25" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnRMt26" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 4 && <button className="btnRMt27" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                
                {currentImageIndex === 5 && <button className="btnRMt28" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 5 && <button className="btnRMt29" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 5 && <button className="btnRMt30" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 5 && <button className="btnRMt31" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 5 && <button className="btnRMt32" onClick={() => handleButtonClick('5', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 5 && <button className="btnRMt33" onClick={() => handleButtonClick('6', { top: '12%', left: '32%'})}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxRMt" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default RadialMt