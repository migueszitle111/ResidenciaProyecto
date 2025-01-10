import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Supraescapular/Supraescapular.css"


const Supraescapular = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-Supraescapular.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-Supraescapular.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-Supraescapular.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-Supraescapular.png",
            
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
            {currentImageIndex === 0 && <button className="btnSp1" onClick={() => handleButtonClick('Articulación acromoclavicular.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSp2" onClick={() => handleButtonClick('No se requiere. En caso de utilizar aguja monopolar como registro en el mismo punto, colocar su referencia com electrodo de superfície a 2 cm en dirección medial/lateral.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 0 && <button className="btnSp3" onClick={() => handleButtonClick('Musculo Supraespinoso con aguja concéntrica, punto medial a 2 cm del borde superior de la espina de la escapula, tomando como referencia su tercio medio; se inserta de forma lenta hasta hacer contacto con la cortical ósea y retirar mínimamente.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnSp4" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/supraescapular-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/supraescapular-T-01.png",{ top: '2%', left: '2%' })}></button>}
                        
            {currentImageIndex === 1 && <button className="btnSp5" onClick={() => handleButtonClick('No se requiere. En caso de utilizar aguja monopolar como registro en el mismo punto, colocar su referencia com electrodo de superfície a 2 cm en direccion distal.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSp6" onClick={() => handleButtonClick('Musculo Infraespinoso con electrodo de aguja concéntrica, insertar 3-5 cm por debajo de la espina de la escapula, línea media imaginaria del vértice de la escapular al tercio medio de la espina.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 1 && <button className="btnSp7" onClick={() => handleButtonClick('Articulación acromoclavicular.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnSp8" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/supraescapular-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/supraescapular-T-02.png",{ top: '2%', left: '2%' })}></button>}

        </div>
            {textBoxVisible && (
                <div className="text-boxSp" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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
                    className="zoomable-imageSp"
                    />
                </div>
            )}
        </div>
    );
}

export default Supraescapular