import { useState, useEffect } from "react"; /*Se agrega useEffect*/
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Auricular/AuricularM.css";


const AuricularM = () => {
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
            original: "/assets/ValoresImg/Cervicales/01-AuricularM.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-AuricularM.png",
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
                {currentImageIndex === 0 && <button className="btnAu1" onClick={() => handleButtonClick('CUELLO PUNTO MEDIO. De forma antidrómica en el borde lateral del músculo esternocleidomastoideo, aproximadamente en su tercio medio u 8cm de distancia en dirección caudal del electrodo de registro.', {  top: '14%', left: '23%' }, 'E')}></button>}
                {currentImageIndex === 0 && <button className="btnAu2" onClick={() => handleButtonClick('LÓBULO DE LA OREJA - Con electrodos de superficie sobre la parte posterior y tercio inferior del lóbulo de la oreja.', { top: '10%', left: '23%'}, 'A')}></button>}
                {currentImageIndex === 0 && <button className="btnAu3" onClick={() => handleButtonClick('2 cm en dirección cefálica a electrodo activo.', {  top: '10%', left: '23%' }, 'R')}></button>}
                {currentImageIndex === 0 && <button className="btnAu4" onClick={() => handleButtonClick('Proceso espinoso C7.', { top: '10%', left: '23%'}, 'T')}></button>}
                {currentImageIndex === 0 && <button className={`btnAur1 ${activeBtn === 'btnAur1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnAur1' ? null : 'btnAur1'); openModal("/assets/ValoresImg/Cervicales/01-AuricularM-G.png",{ top: '2%', left: '2%' })}}></button>}
                {currentImageIndex === 0 && <button className={`btnAur2 ${activeBtn === 'btnAur2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnAur2' ? null : 'btnAur2'); openModal("/assets/ValoresImg/Cervicales/01-AuricularM-T.png",{ top: '5%', left: '2%' })}}></button>}
            
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

export default AuricularM