import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Plantar/Plantar.css"


const Plantar = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-Plantar.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Plantar.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Plantar.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Plantar.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/03-Plantar.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/03-Plantar.png",
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
            {currentImageIndex === 0 && <button className="btnPt1" onClick={() => handleButtonClick('1', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt3" onClick={() => handleButtonClick('3', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt4" onClick={() => handleButtonClick('4', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt5" onClick={() => handleButtonClick('5', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt6" onClick={() => handleButtonClick('6', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnPt7" onClick={() => handleButtonClick('7', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPt8" onClick={() => handleButtonClick('8', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPt9" onClick={() => handleButtonClick('9', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPt10" onClick={() => handleButtonClick('10', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPt11" onClick={() => handleButtonClick('11', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 2 && <button className="btnPt12" onClick={() => handleButtonClick('Dorso del pie. ', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPt13" onClick={() => handleButtonClick('Se coloca a un tercio de la distancia desde el vértice del talón hasta el punto medio entre el escafoides y punta del maléolo medial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPt14" onClick={() => handleButtonClick('Sobre el vértice del talon.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPt15" onClick={() => handleButtonClick('1. Tobillo: De forma antidrómica y con intensidad submáxima a 10 cm en dirección proximal del electrodo activo.', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxPt" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Plantar