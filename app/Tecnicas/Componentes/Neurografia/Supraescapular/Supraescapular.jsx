import { useState, useEffect } from "react"; /*SE AGREGO useEffect*/
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Supraescapular/Supraescapular.css"


const Supraescapular = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-Supraescapular.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-Supraescapular.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-Supraescapular.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-Supraescapular.png",
            
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
            {currentImageIndex === 0 && <button className="btnSp1" onClick={() => handleButtonClick('Articulación acromoclavicular.', {  top: '62%', left: '25%' }, 'T')}></button>}
            {currentImageIndex === 0 && <button className="btnSp2" onClick={() => handleButtonClick('No se requiere. En caso de utilizar aguja monopolar como registro, colocar su referencia con electrodo de superfície a 2 cm en dirección lateral hacia su inserción.', { top: '62%', left: '25%'}, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnSp3" onClick={() => handleButtonClick('SUPRASPINATUS C5, C6 - Insertar guja concéntrica en el punto medio del trayecto del musculo, a 2 cm del borde superior de la espina de la escapula, tomando como referencia su tercio medio; se inserta de forma lenta hasta hacer contacto con la cortical ósea y retirar mínimamente.', {  top: '58%', left: '25%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnSp4" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', { top: '62%', left: '25%'}, 'E')}></button>}
            {currentImageIndex === 0 && <button className={`btnSupra1 ${activeBtn === 'btnSupra1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnSupra1' ? null : 'btnSupra1'); openModal("/assets/ValoresImg/MiembrosSp/supraescapular-G-01.png",{ top: '2%', left: '2%' });}}></button>}
            {currentImageIndex === 0 && <button className={`btnSupra2 ${activeBtn === 'btnSupra2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnSupra2' ? null : 'btnSupra2'); openModal("/assets/ValoresImg/MiembrosSp/supraescapular-T-01.png",{ top: '2%', left: '2%' });}}></button>}
                        
            {currentImageIndex === 1 && <button className="btnSp5" onClick={() => handleButtonClick('No se requiere. En caso de utilizar aguja monopolar como registro, colocar su referencia com electrodo de superfície a 2 cm en direccion distal.', {  top: '25%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 1 && <button className="btnSp6" onClick={() => handleButtonClick('INFRASPINATUS C5, C6 - Electrodo de aguja concéntrica, insertar 3-5 cm por debajo de la espina de la escapula, línea media imaginaria del vértice escapular al tercio medio de la espina.', { top: '25%', left: '23%'}, 'A')}></button>}
            {currentImageIndex === 1 && <button className="btnSp7" onClick={() => handleButtonClick('Articulación acromoclavicular.', {  top: '25%', left: '23%' }, 'T')}></button>}
            {currentImageIndex === 1 && <button className="btnSp8" onClick={() => handleButtonClick('ERB. Fosa supraclavicular, 2 cm por arriba de la clavícula y borde posterior del esternocleidomastoideo, entre el escaleno anterior y el escaleno medio.', { top: '25%', left: '23%'}, 'E')}></button>}
            {currentImageIndex === 1 && <button className={`btnSupra1 ${activeBtn === 'btnSupra1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnSupra1' ? null : 'btnSupra1'); openModal("/assets/ValoresImg/MiembrosSp/supraescapular-G-02.png",{ top: '2%', left: '2%' });}}></button>}
            {currentImageIndex === 1 && <button className={`btnSupra2 ${activeBtn === 'btnSupra2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnSupra2' ? null : 'btnSupra2'); openModal("/assets/ValoresImg/MiembrosSp/supraescapular-T-02.png",{ top: '2%', left: '2%' });}}></button>}

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

export default Supraescapular