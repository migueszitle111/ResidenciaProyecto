import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../DorsalDelPene/DorsalDelPene.css"


const DorsalDelPene = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/Sacro/01-DorsalDelPene.png",
            thumbnail: "/assets/ValoresImg/Sacro/01-DorsalDelPene.png",
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
            {currentImageIndex === 0 && <button className="btnDs1" onClick={() => handleButtonClick('T.	Sínfisis del pubis.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnDs2" onClick={() => handleButtonClick('R.	Colocar en la base del pene antes de la colocación  del electrodo activo. ', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnDs3" onClick={() => handleButtonClick('1-2 cm distal del electrodo de referencia (estará situado previamente en la base del pene).', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnDs4" onClick={() => handleButtonClick('1-2 cm distal del electrodo de referencia (estará situado previamente en la base del pene).', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnDs5" onClick={() => handleButtonClick('R.	Colocar en la base del pene antes de la colocación  del electrodo activo. ', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxDs" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default DorsalDelPene