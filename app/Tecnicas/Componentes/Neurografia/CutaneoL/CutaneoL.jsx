import { useState, useEffect } from "react"; /*SE AGREGO useEffect*/
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../CutaneoL/CutaneoL.css"


const CutaneoL = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [tooltipIcon, setTooltipIcon] = useState(null); // 'A' | 'R' | 'E' | 'T' | null
    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);/*NUEVO, Para Horizontal*/

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosSp/01-CutaneoL.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-CutaneoL.png",
            
        },

    ];

    // Detecta el cambio de orientación
    useEffect(() => {
        const handleOrientationChange = () => {
            if (window.innerHeight < window.innerWidth) {
                setIsLandscape(true);  // En modo horizontal
            } else {
                setIsLandscape(false);  // En modo vertical
            }
        };

        window.addEventListener('resize', handleOrientationChange);
        
        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setTooltipIcon(null);
    };

    const handleButtonClick = (content, position, iconType = null) => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
            setTooltipIcon(null);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTooltipIcon(iconType);
            setTextBoxVisible(true);
        }
    };
    // Funciones para abrir y cerrar el modal
    const openModal = (image) => {
        setExtraImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setExtraImage('');
    };

        const renderGalleryItem = (item) => (
    <img
        src={item.original}
        alt=""
        onContextMenu={e => e.preventDefault()}
        draggable={false}
        style={{ width: '100%' }}
    />
    );
    const renderThumbInner = (item) => (
        <img
            src={item.thumbnail}
            alt=""
            onContextMenu={e => e.preventDefault()}
            draggable={false}
            style={{ width: '100%' }}
        />
    );


    return (
        
        <div  className=" py-20 gallery-container">

             {/* Si no está en modo horizontal, mostramos el mensaje con el GIF */}
           {!isLandscape && (
                <div className="orientation-message">
                    <img src="/assets/giracel.gif" alt="Gira tu dispositivo" className="rotate-gif" />
                    <h2> Por favor, gira tu dispositivo a modo horizontal para continuar.</h2>
                </div>
            )}
            
        <ImageGallery
            items={images}
            onSlide={handleSlide}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={false}
            showNav={false}
            showThumbnails={true}
            thumbnailPosition="bottom"
            bulletclass="bullet"
            renderItem={renderGalleryItem}
            renderThumbInner={renderThumbInner} // <-- Añadido aquí
        />
        <div>
            {/* Primera Imagen */}
                {currentImageIndex === 0 && <button className="btnCl1" onClick={() => handleButtonClick('CODO. Borde lateral del tendón del bíceps braquial y pliegue de la fosa antecubital.', {  top: '12%', left: '32%' }, 'E')}></button>}
                {currentImageIndex === 0 && <button className="btnCl2" onClick={() => handleButtonClick('Antebrazo medial.', { top: '12%', left: '32%'}, 'T')}></button>}
                {currentImageIndex === 0 && <button className="btnCl3" onClick={() => handleButtonClick('ANTEBRAZO LATERAL - 12 a 14 cm con dirección distal del punto de estimulación sobre línea trazada hasta pulso de arteria radial en la muñeca o base del primer metacarpiano.', {  top: '12%', left: '32%' }, 'A')}></button>}
                {currentImageIndex === 0 && <button className="btnCl4" onClick={() => handleButtonClick('3 cm distal del electrodo activo.', { top: '12%', left: '32%'}, 'R')}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/CutaneoLt-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/CutaneoLt-T-01.png",{ top: '5%', left: '2%' })}></button>}
                
            
            </div>
            {textBoxVisible && (
                <div className="tooltip-wrapper" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {/* Icono circular según el tipo de botón */}
                    {tooltipIcon && (
                        <img
                            src={`/assets/tecnicas/Info/S_${tooltipIcon}.png`}
                            alt={tooltipIcon}
                            className="tooltip-icon"
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    )}
                    <div className={`tooltip-text-box${tooltipIcon ? ' with-icon' : ''}`}>
                        {textBoxContent}
                    </div>
                </div>
            )}
            {modalVisible && (
                <div className="modal-gallery">
                    <button className={`print-button`} onClick={closeModal}>
                        <img
                            src="/I_X.webp"
                            style={{ filter: 'invert(1)' }}
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    </button>
                    <img
                        src={extraImage}
                        alt="Imagen Extra"
                        className="modal-image"
                        onContextMenu={e => e.preventDefault()}
                        draggable={false}
                    />
                </div>
            )}
        </div>
    );
}

export default CutaneoL