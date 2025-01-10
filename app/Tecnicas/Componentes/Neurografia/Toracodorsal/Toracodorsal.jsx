import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Toracodorsal/Toracodorsal.css"


const Toracodorsal = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-Toracodorsal.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-Toracodorsal.png",
            
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
            {currentImageIndex === 0 && <button className="btnTd1" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTd2" onClick={() => handleButtonClick('Articulación acromoclavicular.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 0 && <button className="btnTd3" onClick={() => handleButtonClick('Musculo Dorsal ancho, con electrodo de aguja concéntrico insertado en el vientre del dorsal ancho en la pared posterior de la axila.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTd4" onClick={() => handleButtonClick('No se requiere.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/toracodorsal-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/toracodorsal-T-01.png",{ top: '2%', left: '2%' })}></button>}
                
            </div>
            {textBoxVisible && (
                <div className="text-boxTd" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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
                    className="zoomable-imageTd"
                    />
                </div>
            )}
        </div>
    );
}

export default Toracodorsal