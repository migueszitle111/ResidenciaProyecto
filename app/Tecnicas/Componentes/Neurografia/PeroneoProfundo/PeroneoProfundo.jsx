import { useState, useEffect } from "react"; /*SE AGREGO useEffect*/
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../PeroneoProfundo/PeroneoProfundo.css";


const PeroneoProfundo = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-PeroneoProfundo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-PeroneoProfundo.png",
        },
        // {
        //     original: "/assets/ValoresImg/MiembrosInf/02-PeroneoProfundo.png",
        //     thumbnail: "/assets/ValoresImg/MiembrosInf/02-PeroneoProfundo.png",
        // },
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
            {currentImageIndex === 0 && <button className="btnPp1" onClick={() => handleButtonClick('3 cm distal sobre dorso del segundo ortejo.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnPp2" onClick={() => handleButtonClick('DORSO DEL PIE - Horizontal al espacio interdigital, entre las cabezas del primer y segundo metatarsiano.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnPp3" onClick={() => handleButtonClick('TOBILLO. (Antidrómico) 12 cm proximal del electrodo activo y justo lateral al tendón extensor largo del primer ortejo.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 0 && <button className="btnPp4" onClick={() => handleButtonClick('Dorso del pie o pierna.', { top: '10%', left: '23%' }, 'T')}></button>}
            {currentImageIndex === 0 && <button className={`btnPerP1 ${activeBtn === 'btnPerP1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnPerP1' ? null : 'btnPerP1'); openModal("/assets/ValoresImg/MiembrosInf/PeroneoPf-G-01.png",{ top: '2%', left: '2%' });}}></button>}
            {currentImageIndex === 0 && <button className={`btnPerP2 ${activeBtn === 'btnPerP2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnPerP2' ? null : 'btnPerP2'); openModal("/assets/ValoresImg/MiembrosInf/PeroneoPf-T-01.png",{ top: '5%', left: '2%' });}}></button>}
            
            {/* {currentImageIndex === 1 && <button className="btnPp5" onClick={() => handleButtonClick('Dorso del pie', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp6" onClick={() => handleButtonClick('3-4 cm distal del electrodo de registo', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp7" onClick={() => handleButtonClick('INTERMALEOLAR - Electrodo de superficie, colocar preferetemente barra en la línea media, entre el maléolo lateral y el tendón del tibial anterior, transversal a la intersección de ambos maléolos', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp8" onClick={() => handleButtonClick('8', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp9" onClick={() => handleButtonClick('9', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp10" onClick={() => handleButtonClick('10', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp11" onClick={() => handleButtonClick('11', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPp12" onClick={() => handleButtonClick('INCHING - La estimulación se aplica de forma antidrómica como primer punto a 12 cm en dirección proximal del electrodo activo justo lateral al tendón extensor largo del primer ortejo en la región lateral de la pierna. Los siguientes puntos de estímulo de aplicaran cada centímetro en dirección distal hasta llegar al electrodo de registro', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/PeroneoPf-G-02.png",{ top: '2%', left: '2%' })}></button>}
             */}
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

export default PeroneoProfundo