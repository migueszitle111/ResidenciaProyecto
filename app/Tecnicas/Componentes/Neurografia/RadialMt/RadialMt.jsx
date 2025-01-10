import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../RadialMt/RadialMt.css"


const RadialMt = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-RadialMt.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-RadialMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/03-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/03-RadialMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/04-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/04-RadialMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/05-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/05-RadialMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/06-RadialMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/06-RadialMt.png",
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
                {currentImageIndex === 0 && <button className="btnRMt1" onClick={() => handleButtonClick('1. Antebrazo: 4-6 cm en dirección proximal de electrodo activo, dorso del antebrazo sobre borde lateral del cubito. \n2.	Brazo. Canal de torsión, tercio medio del humero, en dirección lateral entre bíceps y tríceps braquiales, o discretamente posterior a la cabeza lateral de este último.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRMt2" onClick={() => handleButtonClick('1. Antebrazo: 4-6 cm en dirección proximal de electrodo activo, dorso del antebrazo sobre borde lateral del cubito. \n2.	Brazo. Canal de torsión, tercio medio del humero, en dirección lateral entre bíceps y tríceps braquiales, o discretamente posterior a la cabeza lateral de este último. ', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnRMt3" onClick={() => handleButtonClick('1. Antebrazo: 4-6 cm en dirección proximal de electrodo activo, dorso del antebrazo sobre borde lateral del cubito. \n2.	Brazo. Canal de torsión, tercio medio del humero, en dirección lateral entre bíceps y tríceps braquiales, o discretamente posterior a la cabeza lateral de este último.  ', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRMt4" onClick={() => handleButtonClick('Músculo extensor propio del índice (EPI), palpar contracción muscular activa, 4 cm en dirección proximal con relación a apófisis estiloides cubital, cara dorsal del tercio distal en antebrazo, lateral a borde del Cubito.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnRMt5" onClick={() => handleButtonClick('Apófisis estiloides cubital.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 0 && <button className="btnRMt6" onClick={() => handleButtonClick('Dorso de la mano.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/RadialMt-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/RadialMt-T-01.png",{ top: '2%', left: '2%' })}></button>}
            
                {currentImageIndex === 1 && <button className="btnRMt7" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRMt8" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRMt9" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRMt10" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRMt11" onClick={() => handleButtonClick('5', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRMt12" onClick={() => handleButtonClick('6', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRMt13" onClick={() => handleButtonClick('7', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnRMt14" onClick={() => handleButtonClick('8', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnRMt15" onClick={() => handleButtonClick('9', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/RadialMt-G-02.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 2 && <button className="btnRMt16" onClick={() => handleButtonClick('4 cm distal en misma orientación sobre borde del radio.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 2 && <button className="btnRMt17" onClick={() => handleButtonClick('Antebrazo.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 2 && <button className="btnRMt18" onClick={() => handleButtonClick('Supinador largo o Braquiorradial. Antebrazo en punto medio de pronación/supinación (a la neutra) y codo en flexión de 90°, tercio proximal 4 cm distal a pliegue del codo sobre borde del radio.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 2 && <button className="btnRMt19" onClick={() => handleButtonClick('Extensor Carpi Radialis Longus C5, C6, C7 ', { top: '12%', left: '32%'})}></button>}
                
                {currentImageIndex === 3 && <button className="btnRMt20" onClick={() => handleButtonClick('4 cm distal en misma orientación sobre borde del cubito.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 3 && <button className="btnRMt21" onClick={() => handleButtonClick('Primer radial externo (Extensor radial largo). Antebrazo en pronación y extensión de codo, 4-5 cm distal al epicóndilo lateral y horizontal al borde lateral del cubito, debajo del supinador largo (braquiorradial).', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 3 && <button className="btnRMt22" onClick={() => handleButtonClick('Antebrazo.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 3 && <button className="btnRMt23" onClick={() => handleButtonClick('Extensor Digitorum Communis C7, C8 ', { top: '12%', left: '32%'})}></button>}
                
                {currentImageIndex === 4 && <button className="btnRMt24" onClick={() => handleButtonClick('4 cm distal en misma orientación entre cubito y radio.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 4 && <button className="btnRMt25" onClick={() => handleButtonClick('Extensor común de los dedos. Antebrazo en pronación, unión entre tercio proximal y medio de antebrazo, región dorsal punto medio con discreta desviación radial.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnRMt26" onClick={() => handleButtonClick('Brazo. Canal de torsión, tercio medio del humero, en dirección lateral entre bíceps y tríceps braquiales, o discretamente posterior a la cabeza lateral de este último.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 4 && <button className="btnRMt27" onClick={() => handleButtonClick('Antebrazo ventral.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/RadialMt-G-03.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 5 && <button className="btnRMt28" onClick={() => handleButtonClick('1. ERB: Fosa supraclavicular lateral al esternocleidomastoideo.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 5 && <button className="btnRMt29" onClick={() => handleButtonClick('Tríceps braquial. Extensión de codo, palpar contracción muscular, generalmente visibles: cabeza lateral tercio medio de brazo borde lateral ligeramente posterior; cabeza larga tercio proximal de brazo borde medial ligeramente posterior. Cabeza medial (no visible), unión de tercio proximal con tercio medio de antebrazo, región media posterior entre cabeza larga y lateral.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 5 && <button className="btnRMt30" onClick={() => handleButtonClick('Tríceps braquial. Extensión de codo, palpar contracción muscular, generalmente visibles: cabeza lateral tercio medio de brazo borde lateral ligeramente posterior; cabeza larga tercio proximal de brazo borde medial ligeramente posterior. Cabeza medial (no visible), unión de tercio proximal con tercio medio de antebrazo, región media posterior entre cabeza larga y lateral.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 5 && <button className="btnRMt31" onClick={() => handleButtonClick('Sobre bíceps braquial', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 5 && <button className="btnRMt32" onClick={() => handleButtonClick('En dirección distal sobre eje horizontal, 3-4 cm del electrodo activo.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 5 && <button className="btnRMt33" onClick={() => handleButtonClick('En dirección distal sobre eje horizontal, 3-4 cm del electrodo activo.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 5 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/RadialMt-G-04.png",{ top: '2%', left: '2%' })}></button>}

            </div>
            {textBoxVisible && (
                <div className="text-boxRMt" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
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
                    className="zoomable-imageMt"
                    />
                </div>
            )}
        </div>
    );
}

export default RadialMt