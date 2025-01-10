import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Supraclavicular/Supraclavicular.css"


const Supraclavicular = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/Cervicales/01-Supraclavicular.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Supraclavicular.png",
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
                {currentImageIndex === 0 && <button className="btnSpC1" onClick={() => handleButtonClick('Acromio.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnSpC2" onClick={() => handleButtonClick('3 cm en dirección caudal mismo tipo de electrodo de forma horizontal.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnSpC3" onClick={() => handleButtonClick('Electrodos adheribles de tira colocados sobre la superficie exterior de la diáfisis clavicular.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnSpC4" onClick={() => handleButtonClick('Cuello punto medio: El cátodo se coloca en el borde posterior del músculo esternocleidomastoideo a nivel del margen inferior del cartílago tiroides.', { top: '12%', left: '32%'})}></button>}
            
            
            </div>
            {textBoxVisible && (
                <div className="text-boxSpC" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Supraclavicular