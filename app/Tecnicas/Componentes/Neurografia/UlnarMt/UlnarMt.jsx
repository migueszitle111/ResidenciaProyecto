import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../UlnarMt/UlnarMt.css";


const UlnarMt = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxUlM');

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosSp/01-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-UlnarMt.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/03-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/03-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/04-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/04-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/05-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/05-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/06-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/06-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/07-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/07-UlnarMt.png",
        },
    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
    };

    const handleButtonClickUlM = (content, position, customClass = 'text-boxUlM') => {
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
                {currentImageIndex === 0 && <button className="btnUMt1" onClick={() => handleButtonClickUlM('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUMt2" onClick={() => handleButtonClickUlM('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUMt3" onClick={() => handleButtonClickUlM('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUMt4" onClick={() => handleButtonClickUlM('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUMt5" onClick={() => handleButtonClickUlM('5', { top: '12%', left: '32%'})}></button>}
            
                {currentImageIndex === 1 && <button className="btnUMt6" onClick={() => handleButtonClickUlM('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt7" onClick={() => handleButtonClickUlM('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUMt8" onClick={() => handleButtonClickUlM('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt9" onClick={() => handleButtonClickUlM('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUMt10" onClick={() => handleButtonClickUlM('5', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt11" onClick={() => handleButtonClickUlM('6', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUMt12" onClick={() => handleButtonClickUlM('7', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt13" onClick={() => handleButtonClickUlM('8', { top: '12%', left: '32%'})}></button>}
                
                {currentImageIndex === 2 && <button className="btnUMt14" onClick={() => handleButtonClickUlM('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 2 && <button className="btnUMt15" onClick={() => handleButtonClickUlM('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 2 && <button className="btnUMt16" onClick={() => handleButtonClickUlM('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 2 && <button className="btnUMt17" onClick={() => handleButtonClickUlM('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 2 && <button className="btnUMt18" onClick={() => handleButtonClickUlM('5', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 2 && <button className="btnUMt19" onClick={() => handleButtonClickUlM('6', { top: '12%', left: '32%'})}></button>}
            
                {currentImageIndex === 3 && <button className="btnUMt20" onClick={() => handleButtonClickUlM('1', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 3 && <button className="btnUMt21" onClick={() => handleButtonClickUlM('2', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 3 && <button className="btnUMt22" onClick={() => handleButtonClickUlM('3', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 3 && <button className="btnUMt23" onClick={() => handleButtonClickUlM('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 3 && <button className="btnUMt24" onClick={() => handleButtonClickUlM('5', { top: '12%', left: '32%'})}></button>}
            
                {currentImageIndex === 4 && <button className="btnUMt25" onClick={() => handleButtonClickUlM('1', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnUMt26" onClick={() => handleButtonClickUlM('2', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 4 && <button className="btnUMt27" onClick={() => handleButtonClickUlM('3', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnUMt28" onClick={() => handleButtonClickUlM('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnUMt29" onClick={() => handleButtonClickUlM('5', { top: '12%', left: '32%'})}></button>}
            
                {currentImageIndex === 5 && <button className="btnUMt30" onClick={() => handleButtonClickUlM('1', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 5 && <button className="btnUMt31" onClick={() => handleButtonClickUlM('2', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 5 && <button className="btnUMt32" onClick={() => handleButtonClickUlM('3', { top: '12%', left: '32%'})}></button>}
                
                {currentImageIndex === 6 && <button className="btnUMt33" onClick={() => handleButtonClickUlM('1', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 6 && <button className="btnUMt34" onClick={() => handleButtonClickUlM('2', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 6 && <button className="btnUMt35" onClick={() => handleButtonClickUlM('3', { top: '12%', left: '32%'})}></button>}
                
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxUlM ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
                <div
                    className="image-boxUlM"
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
                            maxHeight: '25vh',
                            transition: 'transform 0.3s ease',
                        }}
                        className="zoomable-imageUlM"
                    />
                </div>
            )}
        </div>
    );
};

export default UlnarMt