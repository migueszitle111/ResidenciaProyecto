import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Tibial/Tibial.css"


const Tibial = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Tibial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Tibial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/03-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/03-Tibial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/04-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/04-Tibial.png",
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
            {currentImageIndex === 0 && <button className="btnTb1" onClick={() => handleButtonClick('1', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb3" onClick={() => handleButtonClick('3', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb4" onClick={() => handleButtonClick('4', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb5" onClick={() => handleButtonClick('5', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnTb6" onClick={() => handleButtonClick('6', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb7" onClick={() => handleButtonClick('7', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb8" onClick={() => handleButtonClick('8', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb9" onClick={() => handleButtonClick('9', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb10" onClick={() => handleButtonClick('10', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 2 && <button className="btnTb11" onClick={() => handleButtonClick('11', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb12" onClick={() => handleButtonClick('12', { top: '12%', left: '32%' })}></button>}            
            {currentImageIndex === 2 && <button className="btnTb13" onClick={() => handleButtonClick('13', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb14" onClick={() => handleButtonClick('14', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb15" onClick={() => handleButtonClick('15', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb16" onClick={() => handleButtonClick('16', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 3 && <button className="btnTb17" onClick={() => handleButtonClick('17', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb18" onClick={() => handleButtonClick('18', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb19" onClick={() => handleButtonClick('19', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb20" onClick={() => handleButtonClick('20', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb21" onClick={() => handleButtonClick('21', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb22" onClick={() => handleButtonClick('22', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb23" onClick={() => handleButtonClick('23', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb24" onClick={() => handleButtonClick('24', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxTb" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Tibial