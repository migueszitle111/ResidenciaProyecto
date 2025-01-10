import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Musculocutaneo/Musculocutaneo.css"


const Musculocutaneo = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-Musculocutaneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-Musculocutaneo.png",
            
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
            {currentImageIndex === 0 && <button className="btnMc1" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnMc2" onClick={() => handleButtonClick('Articulación acromoclavicular.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnMc3" onClick={() => handleButtonClick('Codo en flexión, electrodo colocado sobre el vientre muscular más prominente del Bíceps braquial o punto medio ventral del brazo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnMc4" onClick={() => handleButtonClick('Tendón del bíceps braquiai en el codo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/musculocutaneo-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/musculocutaneo-T-01.png",{ top: '5%', left: '2%' })}></button>}
                
            </div>
            {textBoxVisible && (
                <div className="text-boxMc" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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
                    className="zoomable-imageMc"
                    />
                </div>
            )}
        </div>
    );
}

export default Musculocutaneo