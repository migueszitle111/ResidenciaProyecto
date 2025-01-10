import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Frenico/Frenico.css"


const Frenico = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/Cervicales/01-Frenico.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Frenico.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/02-Frenico.png",
            thumbnail: "/assets/ValoresImg/Cervicales/02-Frenico.png",
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
            {currentImageIndex === 0 && <button className="btnFn1" onClick={() => handleButtonClick('De forma bilateral en el séptimo espacio intercostal horizontal a la tetilla o con referencia a línea media clavicular.1', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFn2" onClick={() => handleButtonClick('Sobre pectoral ipsilateral a estimulo.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 0 && <button className="btnFn3" onClick={() => handleButtonClick('1.	Cuello punto inferior: Sobre el borde superior de la clavícula entre las cabezas esternal y clavicular del musculo esternocleidomastoideo con posición a la neutra o ligeramente extendida. \n2.	Cuello punto medio: Borde posterior del músculo esternocleidomastoideo a nivel del cartílago tiroides.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFn4" onClick={() => handleButtonClick('1.	Cuello punto inferior: Sobre el borde superior de la clavícula entre las cabezas esternal y clavicular del musculo esternocleidomastoideo con posición a la neutra o ligeramente extendida. \n2.	Cuello punto medio: Borde posterior del músculo esternocleidomastoideo a nivel del cartílago tiroides.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 0 && <button className="btnFn5" onClick={() => handleButtonClick('Músculo Diafragma con electrodo de superficie sobre apófisis xifoides (algunas literaturas prefieren colocarlo 5cm por arriba de esta).', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnFn6" onClick={() => handleButtonClick('De forma bilateral en el séptimo espacio intercostal horizontal a la tetilla o con referencia a línea media clavicular.', { top: '12%', left: '32%'})}></button>}
        
            {currentImageIndex === 1 && <button className="btnFn7" onClick={() => handleButtonClick('Caudalmente a electrodo de registros, pero sobre noveno espacio intercostal.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFn8" onClick={() => handleButtonClick('Músculo Diafragma con electrodo de superficie sobre octavo espacio intercostal en la línea axilar anterior', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 1 && <button className="btnFn9" onClick={() => handleButtonClick('1.	Cuello punto inferior: Sobre el borde superior de la clavícula entre las cabezas esternal y clavicular del musculo esternocleidomastoideo con posición a la neutra o ligeramente extendida.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnFn10" onClick={() => handleButtonClick('Esternón.', { top: '12%', left: '32%'})}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxFn" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Frenico