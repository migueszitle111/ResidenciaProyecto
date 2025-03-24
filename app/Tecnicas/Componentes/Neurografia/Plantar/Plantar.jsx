import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Plantar/Plantar.css";


const Plantar = () => {
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
            {currentImageIndex === 0 && <button className="btnPt1" onClick={() => handleButtonClick('Primer ortejo, distal a electrodo activo', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt2" onClick={() => handleButtonClick('RAMA MEDIAL - Electrodos de anillo en el primer ortejo, cercano al pliegue metatarsofalángico', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt3" onClick={() => handleButtonClick('Dorso del pie o sitio indiferente entre estimulo y registro', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt4" onClick={() => handleButtonClick('RETROMALEOLAR. Antidrómico detrás y justo por encima del maléolo medial (retináculo flexor). Distancia no indispensable, deseada de 14 cm del cátodo a electrodo activo', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt5" onClick={() => handleButtonClick('Quinto ortejo, distal a electrodo activo', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPt6" onClick={() => handleButtonClick('RAMA LATERAL - Electrodos de anillo en el quinto ortejo, cercano al pliegue metatarsofalángico', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/Plantar-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/Plantar-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnPt7" onClick={() => handleButtonClick('Referencia proximal', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPt8" onClick={() => handleButtonClick('NERVIO TIBIAL - Se coloca electrodo de barra (activo distal-referencia proximal) detrás y justo por encima del maléolo medial (retináculo flexor)', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPt9" onClick={() => handleButtonClick('Talón', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPt10" onClick={() => handleButtonClick('RAMA MEDIAL. Sobre la planta del pie, se determina midiendo 10 cm con dirección distal del electrodo ACTIVO, entre el primer y segundo metatarsiano, y extendiendo 4 cm horizontalmente hasta el espacio interdigital', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPt11" onClick={() => handleButtonClick('RAMA LATERAL. Sobre la planta del pie, se trazan de forma imaginaria 14 cm en línea diagonal hasta el especio intermedio entre cuarto y quinto metatarsianos', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/Plantar-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/Plantar-T-02.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 2 && <button className="btnPt12" onClick={() => handleButtonClick('Dorso del pie', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPt13" onClick={() => handleButtonClick('RAMA MEDIAL CALCÁNEA. Se coloca a un tercio de la distancia desde el vértice del talón hasta el punto medio entre el escafoides y punta del maléolo medial', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPt14" onClick={() => handleButtonClick('Sobre el vértice del talon', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPt15" onClick={() => handleButtonClick('TOBILLO RETROMALEOLAR - De forma antidrómica y con intensidad submáxima a 10 cm en dirección proximal del electrodo activo', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosInf/Plantar-G-03.png",{ top: '2%', left: '2%' })}></button>}

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

export default Plantar