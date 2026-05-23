import { useState, useEffect } from "react"; /*Se agrega useEffect*/
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Frenico/Frenico.css";


const Frenico = () => {
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
            original: "/assets/ValoresImg/Cervicales/01-Frenico.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Frenico.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/02-Frenico.png",
            thumbnail: "/assets/ValoresImg/Cervicales/02-Frenico.png",
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
            {currentImageIndex === 0 && <button className="btnFn1" onClick={() => handleButtonClick('De forma bilateral en el séptimo espacio intercostal horizontal a la tetilla o con referencia a línea media clavicular.', {  top: '65%', left: '50%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnFn2" onClick={() => handleButtonClick('Sobre pectoral ipsilateral a estimulo.', { top: '65%', left: '50%'}, 'T')}></button>}
            {currentImageIndex === 0 && <button className="btnFn3" onClick={() => handleButtonClick('CUELLO PUNTO MEDIO. Borde posterior del músculo esternocleidomastoideo (ECM) a nivel del cartílago tiroides.', {  top: '65%', left: '50%' }, 'E')}></button>}
            {currentImageIndex === 0 && <button className="btnFn4" onClick={() => handleButtonClick('CUELLO PUNTO INFERIOR. Sobre el borde superior de la clavícula entre las cabezas esternal y clavicular del musculo ECM con posición a la neutra o ligeramente extendida.', { top: '65%', left: '50%'}, 'E')}></button>}
            {currentImageIndex === 0 && <button className="btnFn5" onClick={() => handleButtonClick('DIAPHRAGM C3, C4, C5 - Electrodo de superficie sobre apófisis xifoides.', {  top: '65%', left: '50%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnFn6" onClick={() => handleButtonClick('De forma bilateral en el séptimo espacio intercostal horizontal a línea media clavicular.', { top: '65%', left: '50%'}, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Cervicales/frenico-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Cervicales/01-Frenico-T.png",{ top: '5%', left: '2%' })}></button>}

            {currentImageIndex === 1 && <button className="btnFn7" onClick={() => handleButtonClick('Caudalmente a electrodo de registros, pero sobre noveno espacio intercostal.', {  top: '65%', left: '50%' }, 'R')}></button>}
            {currentImageIndex === 1 && <button className="btnFn8" onClick={() => handleButtonClick('DIAPHRAGM C3, C4, C5 - Electrodo de superficie sobre octavo espacio intercostal en la línea axilar anterior.', { top: '65%', left: '50%'}, 'A')}></button>}
            {currentImageIndex === 1 && <button className="btnFn9" onClick={() => handleButtonClick('CUELLO PUNTO INFERIOR. Sobre el borde superior de la clavícula entre las cabezas esternal y clavicular del musculo ECM con posición a la neutra o ligeramente extendida.', {  top: '65%', left: '50%' }, 'E')}></button>}
            {currentImageIndex === 1 && <button className="btnFn10" onClick={() => handleButtonClick('Esternón.', { top: '65%', left: '50%'}, 'T')}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Cervicales/FrenicoG.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Cervicales/01-Frenico-T.png",{ top: '5%', left: '2%' })}></button>}

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
};

export default Frenico