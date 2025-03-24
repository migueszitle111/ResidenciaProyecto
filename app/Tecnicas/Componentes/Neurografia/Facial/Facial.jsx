import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Facial/Facial.css";


const Facial = () => {
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
            original: "/assets/ValoresImg/Cervicales/01-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Facial.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/02-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/02-Facial.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/03-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/03-Facial.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/04-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/04-Facial.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/05-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/05-Facial.png",
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
            {currentImageIndex === 0 && <button className="btnFc1" onClick={() => handleButtonClick('MENTALIS', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc2" onClick={() => handleButtonClick('Mentalis', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc3" onClick={() => handleButtonClick('ORBICULARIS ORIS', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc4" onClick={() => handleButtonClick('Orbicularis oris', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc5" onClick={() => handleButtonClick('NASALIS', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc6" onClick={() => handleButtonClick('Nasalis', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc7" onClick={() => handleButtonClick('ORBICULARIS OCULI', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc8" onClick={() => handleButtonClick('Orbicularis oculi', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc9" onClick={() => handleButtonClick('FRONTALIS', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc10" onClick={() => handleButtonClick('Frontalis', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc11" onClick={() => handleButtonClick('Hueso cigomatico', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc12" onClick={() => handleButtonClick('POSTAURICULAR. El cátodo se coloca en el agujero estilomastoideo justo detrás y después del oído, inferior y anterior a la apófisis mastoides.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Cervicales/01-Facial-G.png",{ top: '2%', left: '2%' })}></button>}

            {currentImageIndex === 1 && <button className="btnFc13" onClick={() => handleButtonClick('PREAURICULAR. El cátodo se coloca sobre el trago anterior delante de la oreja dirigiendo el ánodo proximalmente', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc14" onClick={() => handleButtonClick('ORBICULARIS OCULI - Con electrodo de superficie colocado lateral al borde externo de la órbita', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc15" onClick={() => handleButtonClick('Región frontal', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc16" onClick={() => handleButtonClick('Sobre dorso del tabique nasal 2 cm en dirección lateral, ipsilateral al lado estimulado', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc17" onClick={() => handleButtonClick('Sobre el dorso del tabique nasal 1 cm en dirección lateral, ipsilateral al lado estimulado', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc18" onClick={() => handleButtonClick('NASALIS - Con electrodo de superficie colocado lateral al centro de la nariz', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc19" onClick={() => handleButtonClick('ORBICULARIS ORIS - Con electrodo de superficie colocado lateral al borde externo de la comisura labial', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc20" onClick={() => handleButtonClick('Inferior a la mitad del labio menor', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Cervicales/02-Facial-G.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/Cervicales/02-Facial-T.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 2 && <button className="btnFc21" onClick={() => handleButtonClick('Región frontal', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc22" onClick={() => handleButtonClick('Sobre dorso del tabique nasal 2 cm en dirección lateral, ipsilateral al lado estimulado', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc23" onClick={() => handleButtonClick('ORBICULARIS OCULI - Con electrodo de superficie colocado lateral al borde externo de la órbita', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc24" onClick={() => handleButtonClick('RAMA. 2 a 5 cm en dirección antero medial y orientado hacia el musculo correspondiente', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc25" onClick={() => handleButtonClick('PREAURICULAR. El cátodo se coloca sobre el trago anterior delante de la oreja dirigiendo el ánodo proximalmente', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc26" onClick={() => handleButtonClick('POSTAURICULAR. El cátodo se coloca en el agujero estilomastoideo justo detrás y después del oído, inferior y anterior a la apófisis mastoides', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Cervicales/03-Facial-G.png",{ top: '2%', left: '2%' })}></button>}            
            
            {currentImageIndex === 3 && <button className="btnFc27" onClick={() => handleButtonClick('Región frontal.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc28" onClick={() => handleButtonClick('Sobre el dorso del tabique nasal 1 cm en dirección lateral, ipsilateral al lado estimulado', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc29" onClick={() => handleButtonClick('NASALIS - Con electrodo de superficie colocado lateral al centro de la nariz.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc30" onClick={() => handleButtonClick('RAMA. 2 a 5 cm en dirección antero medial y orientado hacia el musculo correspondiente', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc31" onClick={() => handleButtonClick('PREAURICULAR. El cátodo se coloca sobre el trago anterior delante de la oreja dirigiendo el ánodo proximalmente', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc32" onClick={() => handleButtonClick('POSTAURICULAR. El cátodo se coloca en el agujero estilomastoideo justo detrás y después del oído, inferior y anterior a la apófisis mastoides', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Cervicales/04-Facial-G.png",{ top: '2%', left: '2%' })}></button>}            
                        
            {currentImageIndex === 4 && <button className="btnFc33" onClick={() => handleButtonClick('Región frontal', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc34" onClick={() => handleButtonClick('Inferior a la mitad del labio menor', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc35" onClick={() => handleButtonClick('ORBICULARIS ORIS - Con electrodo de superficie colocado lateral al borde externo de la comisura labial', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc36" onClick={() => handleButtonClick('RAMA. 2 a 5 cm en dirección antero medial y orientado hacia el musculo correspondiente', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc37" onClick={() => handleButtonClick('PREAURICULAR. El cátodo se coloca sobre el trago anterior delante de la oreja dirigiendo el ánodo proximalmente', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc38" onClick={() => handleButtonClick('POSTAURICULAR. El cátodo se coloca en el agujero estilomastoideo justo detrás y después del oído, inferior y anterior a la apófisis mastoides', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Cervicales/05-Facial-G.png",{ top: '2%', left: '2%' })}></button>}            
                                    
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxMs ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
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
                            maxWidth: '16vw',
                            maxHeight: '16vh',
                            transition: 'transform 0.3s ease',
                        }}
                        className="zoomable-image"
                    />
                </div>
            )}
        </div>
    );
};

export default Facial