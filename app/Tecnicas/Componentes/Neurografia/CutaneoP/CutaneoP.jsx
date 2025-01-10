import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../CutaneoP/CutaneoP.css"


const CutaneoP = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxMs');

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosSp/01-CutaneoP.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-CutaneoP.png",
            
        },

    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
    };

    const handleButtonClick = (content, position, customClass = 'text-boxMs') => {
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
                {currentImageIndex === 0 && <button className="btnCP1" onClick={() => handleButtonClick('1.	Brazo: 2 cm en dirección proximal al epicóndilo lateral, entre el bíceps braquial y la cabeza lateral del tríceps, más cerca de este último. ', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnCP2" onClick={() => handleButtonClick('Antebrazo lateral.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnCP3" onClick={() => handleButtonClick('A 12 cm distal a lo largo de una línea que se extiende desde el punto de estimulación, hasta el dorso medio de la muñeca.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnCP4" onClick={() => handleButtonClick('3-4 cm distal a electrodo activo (utilizar barra)', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/CutaneoPst-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/CutaneoPst-T-01.png",{ top: '5%', left: '-10%' })}></button>}

            </div>
            {textBoxVisible && (
                <div className="text-boxCtp" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxM"
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
                        maxHeight: '20vh',
                        transition: 'transform 0.3s ease',
                    }}
                    className="zoomable-imageCp"
                    />
                </div>
            )}
        </div>
    );
}

export default CutaneoP