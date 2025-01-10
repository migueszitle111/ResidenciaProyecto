import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Facial/Facial.css"


const Facial = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

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
            {currentImageIndex === 0 && <button className="btnFc1" onClick={() => handleButtonClick('1', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc2" onClick={() => handleButtonClick('2', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc3" onClick={() => handleButtonClick('3', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc4" onClick={() => handleButtonClick('4', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc5" onClick={() => handleButtonClick('5', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc6" onClick={() => handleButtonClick('6', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc7" onClick={() => handleButtonClick('7', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc8" onClick={() => handleButtonClick('8', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc9" onClick={() => handleButtonClick('9', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc10" onClick={() => handleButtonClick('10', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc11" onClick={() => handleButtonClick('11', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFc12" onClick={() => handleButtonClick('12', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnFc13" onClick={() => handleButtonClick('1. Preauricular \n2. Postauricular \n3. Rama. 2 a 5 cm en dirección antero medial y orientado hacia el musculo correspondiente (con el estimulador bipolar, una colocación cómoda para el explorador es colocar el ánodo en el área preauricular-trago anterior y el cátodo en dirección medial hacia el musculo de registro).', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc14" onClick={() => handleButtonClick('Orbicularis oculi. Con electrodo de superficie colocado, lateral al borde externo de la órbita.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc15" onClick={() => handleButtonClick('Región frontal.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc16" onClick={() => handleButtonClick('Sobre dorso del tabique nasal 2 cm en dirección lateral, ipsilateral al lado estimulado.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc17" onClick={() => handleButtonClick('Sobre el dorso del tabique nasal 1 cm en dirección lateral, ipsilateral al lado estimulado.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc18" onClick={() => handleButtonClick('Nasalis. Con electrodo de superficie colocado, lateral al centro de la nariz.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc19" onClick={() => handleButtonClick('Orbicularis oris. Con electrodo de superficie colocado, lateral al borde externo de la comisura labial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFc20" onClick={() => handleButtonClick('Inferior a la mitad del labio menor.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 2 && <button className="btnFc21" onClick={() => handleButtonClick('Región frontal.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc22" onClick={() => handleButtonClick('Sobre dorso del tabique nasal 2 cm en dirección lateral, ipsilateral al lado estimulado.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc23" onClick={() => handleButtonClick('Orbicularis oculi. Con electrodo de superficie colocado, lateral al borde externo de la órbita.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc24" onClick={() => handleButtonClick('1. Preauricular \n2. Postauricular \n3. Rama. 2 a 5 cm en dirección antero medial y orientado hacia el musculo correspondiente (con el estimulador bipolar, una colocación cómoda para el explorador es colocar el ánodo en el área preauricular-trago anterior y el cátodo en dirección medial hacia el musculo de registro).', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc25" onClick={() => handleButtonClick('25', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnFc26" onClick={() => handleButtonClick('26', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 3 && <button className="btnFc27" onClick={() => handleButtonClick('Región frontal.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc28" onClick={() => handleButtonClick('Sobre el dorso del tabique nasal 1 cm en dirección lateral, ipsilateral al lado estimulado.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc29" onClick={() => handleButtonClick('Nasalis. Con electrodo de superficie colocado, lateral al centro de la nariz.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc30" onClick={() => handleButtonClick('30', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc31" onClick={() => handleButtonClick('31', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnFc32" onClick={() => handleButtonClick('32', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 4 && <button className="btnFc33" onClick={() => handleButtonClick('Región frontal', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc34" onClick={() => handleButtonClick('Inferior a la mitad del labio menor.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc35" onClick={() => handleButtonClick('Orbicularis oris. Con electrodo de superficie colocado, lateral al borde externo de la comisura labial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc36" onClick={() => handleButtonClick('36', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc37" onClick={() => handleButtonClick('37', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnFc38" onClick={() => handleButtonClick('38', { top: '12%', left: '32%' })}></button>}
                        
            </div>
            {textBoxVisible && (
                <div className="text-boxFc" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Facial