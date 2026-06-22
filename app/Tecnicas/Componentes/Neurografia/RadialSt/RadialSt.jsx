import { useState, useEffect } from "react"; /*SE AGREGO useEffect*/
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../RadialSt/RadialSt.css"

const RadialSt = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [tooltipIcon, setTooltipIcon] = useState(null); // 'A' | 'R' | 'E' | 'T' | null
    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [activeBtn, setActiveBtn] = useState(null);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);/*NUEVO, Para Horizontal*/

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosSp/01-RadialSt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-RadialSt.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-RadialSt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-RadialSt.png",
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
        setTextBoxVisible(false);
    };

    const closeModal = () => {
        setModalVisible(false);
        setExtraImage('');
        setActiveBtn(null);
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
                {currentImageIndex === 0 && <button className="btnRSt1" onClick={() => handleButtonClick('MUÑECA. En la parte media distal del radio 10/12/14 cm proximal al electrodo activo cara volar del antebrazo.', {  top: '12%', left: '32%' }, 'E')}></button>}
                {currentImageIndex === 0 && <button className="btnRSt2" onClick={() => handleButtonClick('Dorso de la mano.', { top: '12%', left: '32%'}, 'T')}></button>}
                {currentImageIndex === 0 && <button className="btnRSt3" onClick={() => handleButtonClick('BASE DE PULGAR - Dorso de la mano entre los tendones del extensor largo y corto del pulgar, 1 cm distal al borde el radio.', {  top: '12%', left: '32%' }, 'A')}></button>}
                {currentImageIndex === 0 && <button className="btnRSt4" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo, borde lateral del segundo metacarpiano.', { top: '12%', left: '32%'}, 'R')}></button>}
                {currentImageIndex === 0 && <button className={`btnRaSt1 ${activeBtn === 'btnRaSt1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnRaSt1' ? null : 'btnRaSt1'); openModal("/assets/ValoresImg/MiembrosSp/RadialSt-G-01.png",{ top: '2%', left: '2%' });}}></button>}
                {currentImageIndex === 0 && <button className={`btnRaSt2 ${activeBtn === 'btnRaSt2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnRaSt2' ? null : 'btnRaSt2'); openModal("/assets/ValoresImg/MiembrosSp/RadialSt-T-01.png",{ top: '5%', left: '2%' });}}></button>}
                
                {currentImageIndex === 1 && <button className="btnRSt5" onClick={() => handleButtonClick('3 distal a elétrodo activo sobre articulación interfalángica.', {  top: '12%', left: '32%' }, 'R')}></button>}
                {currentImageIndex === 1 && <button className="btnRSt6" onClick={() => handleButtonClick('DORSO DEL PULGAR - Discretamente distal a la primera articulación metacarpofalángica.', { top: '12%', left: '32%'}, 'A')}></button>}
                {currentImageIndex === 1 && <button className="btnRSt7" onClick={() => handleButtonClick('Dorso de la mano.', {  top: '12%', left: '32%' }, 'T')}></button>}
                {currentImageIndex === 1 && <button className="btnRSt8" onClick={() => handleButtonClick('MUÑECA. En la parte media distal del radio 10/12/14 cm proximal al electrodo activo cara volar del antebrazo.', { top: '12%', left: '32%'}, 'E')}></button>}
                {currentImageIndex === 1 && <button className={`btnRaSt1 ${activeBtn === 'btnRaSt1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnRaSt1' ? null : 'btnRaSt1'); openModal("/assets/ValoresImg/MiembrosSp/RadialSt-G-01.png",{ top: '2%', left: '2%' });}}></button>}
                {currentImageIndex === 1 && <button className={`btnRaSt2 ${activeBtn === 'btnRaSt2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnRaSt2' ? null : 'btnRaSt2'); openModal("/assets/ValoresImg/MiembrosSp/RadialSt-T-01.png",{ top: '5%', left: '2%' });}}></button>}
                
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

export default RadialSt