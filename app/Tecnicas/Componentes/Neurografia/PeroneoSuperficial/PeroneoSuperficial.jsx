import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../PeroneoSuperficial/PeroneoSuperficial.css"


const PeroneoSuperficial = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-PeroneoSuperficial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-PeroneoSuperficial.png",
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
            {currentImageIndex === 0 && <button className="btnPs1" onClick={() => handleButtonClick('Dorso del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs2" onClick={() => handleButtonClick('3-4 cm del electrodo de registo, discretamente distal a articulación interfalángica distal.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs3" onClick={() => handleButtonClick('Colocado en la línea media entre el maléolo lateral y el tendón del tibial anterior, trasversal a la intersección de ambos maléolos; 2 cm distal a este punto recoge el registro en la rama cutánea dorsal medial, a 1 cm lateral para la rama cutáneo dorsal intermedia.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs4" onClick={() => handleButtonClick('3-4 cm del electrodo de registo, discretamente distal a articulación interfalángica distal.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs5" onClick={() => handleButtonClick('Colocado en la línea media entre el maléolo lateral y el tendón del tibial anterior, trasversal a la intersección de ambos maléolos; 2 cm distal a este punto recoge el registro en la rama cutánea dorsal medial, a 1 cm lateral para la rama cutáneo dorsal intermedia.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPs6" onClick={() => handleButtonClick('1.	Pierna lateral: de forma antidrómica a 12-14 cm proximal del electrodo activo, anterior al musculo peroneo largo y adyacente al musculo tibial anterior.', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxPs" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default PeroneoSuperficial