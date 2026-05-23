import { useState, useEffect } from "react"; /*SE AGREGO useEffect*/
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../UlnarSt/UlnarSt.css";


const UlnarSt = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-UlnarSt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-UlnarSt.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-UlnarSt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-UlnarSt.png",
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
                {currentImageIndex === 0 && <button className="btnUSt1" onClick={() => handleButtonClick('MUÑECA. Estimulo Antidrómico a 14 cm con dirección proximal del electrodo de registro, medial y adyacente al tendón cubital anterior.', {  top: '10%', left: '25%' }, 'E')}></button>}
                {currentImageIndex === 0 && <button className="btnUSt2" onClick={() => handleButtonClick('DEDO MEÑIQUE O QUINTO DEDO - Ligeramente distal a la articulación metacarpofalángica, evitando colocar electrodo sobre pliegue cutáneo.', { top: '10%', left: '25%'}, 'A')}></button>}
                {currentImageIndex === 0 && <button className="btnUSt3" onClick={() => handleButtonClick('CUARTO DEDO - Ligeramente distal a la articulación metacarpofalángica, evitando colocar electrodo sobre pliegue cutáneo.', {  top: '10%', left: '25%' }, 'A')}></button>}
                {currentImageIndex === 0 && <button className="btnUSt4" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo en articulación interfalangica distal.', { top: '10%', left: '25%'}, 'R')}></button>}
                {currentImageIndex === 0 && <button className="btnUSt5" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo en articulación interfalangica distal.', {  top: '10%', left: '25%' }, 'R')}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/01UlnarStG.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/01UlnarStT.png",{ top: '2%', left: '2%' })}></button>}
            
                {currentImageIndex === 1 && <button className="btnUSt6" onClick={() => handleButtonClick('4 cm distalmente sobre dorso del 4to dedo, falange proximal.', {  top: '10%', left: '70%' }, 'R')}></button>}
                {currentImageIndex === 1 && <button className="btnUSt7" onClick={() => handleButtonClick('DORSO DE LA MANO - Punto medio entre 4to y 5to metacarpianos.', { top: '10%', left: '70%'}, 'A')}></button>}
                {currentImageIndex === 1 && <button className="btnUSt8" onClick={() => handleButtonClick('MUÑECA. Estimulo Antidrómico a 14 cm con dirección proximal del electrodo de registro, medial y adyacente al tendón cubital anterior.', {  top: '10%', left: '70%' }, 'E')}></button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/02UlnarStG.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/01UlnarStT.png",{ top: '2%', left: '2%' })}></button>}
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

export default UlnarSt