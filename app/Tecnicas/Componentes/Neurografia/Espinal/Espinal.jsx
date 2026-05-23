import { useState, useEffect } from "react"; /*Se agrega useEffect*/
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Espinal/Espinal.css";


const Espinal = () => {
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
            original: "/assets/ValoresImg/Cervicales/01-Espinal.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Espinal.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/02-Espinal.png",
            thumbnail: "/assets/ValoresImg/Cervicales/02-Espinal.png",
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
            {currentImageIndex === 0 && <button className="btnEp1" onClick={() => handleButtonClick('TRIANGULO POSTERIOR DEL CUELLO. Borde posterior del esternocleidomastoideo, ligeramente por arriba de su tercio medio.', {  top: '62%', left: '25%' }, 'E')}></button>}
            {currentImageIndex === 0 && <button className="btnEp2" onClick={() => handleButtonClick('TRAPEZIUS C3, C4 - Fibras superiores con electrodo de superficie colocar 5-8 cm lateral en relacion a la apófisis espinosa C7.', { top: '62%', left: '25%'}, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnEp3" onClick={() => handleButtonClick('3 cm lateral del electrodo de registro.', {  top: '62%', left: '25%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnEp4" onClick={() => handleButtonClick('Acromio.', { top: '62%', left: '25%'}, 'T')}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Cervicales/01-Espinal-G.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Cervicales/01-Espinal-T.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnEp5" onClick={() => handleButtonClick('TRIANGULO POSTERIOR DEL CUELLO. Borde posterior del esternocleidomastoideo, ligeramente por arriba de su tercio medio', {  top: '12%', left: '32%' }, 'E')}></button>}
            {currentImageIndex === 1 && <button className="btnEp6" onClick={() => handleButtonClick('3 cm lateral del electrodo de registro.', { top: '12%', left: '32%'}, 'R')}></button>}
            {currentImageIndex === 1 && <button className="btnEp7" onClick={() => handleButtonClick('TRAPEZIUS C3, C4 - Fibras superiores con electrodo de superficie colocar 5-8 cm lateral en relacion a la apófisis espinosa C7.', {  top: '12%', left: '32%' }, 'A')}></button>}
            {currentImageIndex === 1 && <button className="btnEp8" onClick={() => handleButtonClick('TRAPEZIUS C3, C4 - Fibras medias con electrodo de superficie, colocarlo en el punto medio entre la espina escapular y la apófisis espinosa de T3.', { top: '12%', left: '32%'}, 'A')}></button>}
            {currentImageIndex === 1 && <button className="btnEp9" onClick={() => handleButtonClick('Acromio.', {  top: '12%', left: '32%' }, 'T')}></button>}
            {currentImageIndex === 1 && <button className="btnEp10" onClick={() => handleButtonClick('3 cm distal del electrodo de registro.', { top: '12%', left: '32%'}, 'R')}></button>}
            {currentImageIndex === 1 && <button className="btnEp11" onClick={() => handleButtonClick('TRAPEZIUS C3, C4 - Fibras inferiores Con electrodo de superficie, colocarlo en el punto medio entre el ángulo inferior escapular y la apófisis espinosa de T7.', {  top: '12%', left: '32%' }, 'A')}></button>}
            {currentImageIndex === 1 && <button className="btnEp12" onClick={() => handleButtonClick('3 cm distal del electrodo de registro.', { top: '12%', left: '32%'}, 'R')}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Cervicales/02-Espinal-G.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Cervicales/02-Espinal-T.png",{ top: '5%', left: '2%' })}></button>}
            
            
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

export default Espinal