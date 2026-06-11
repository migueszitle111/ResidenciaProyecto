import { useState, useEffect } from "react"; /*SE AGREGO useEffect*/
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../PeroneoSuperficial/PeroneoSuperficial.css";


const PeroneoSuperficial = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-PeroneoSuperficial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-PeroneoSuperficial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-PeroneoProfundo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-PeroneoProfundo.png",
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
            {currentImageIndex === 0 && <button className="btnPs1" onClick={() => handleButtonClick('Dorso del pie.', { top: '10%', left: '23%' }, 'T')}></button>}
            {currentImageIndex === 0 && <button className="btnPs2" onClick={() => handleButtonClick('3-4 cm distal del electrodo de registo.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnPs3" onClick={() => handleButtonClick('2 cm distal: registro de la rama cutánea dorsal medial y 1 cm lateral rama cutánea dorsal intermedia.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnPs4" onClick={() => handleButtonClick('3-4 cm distal del electrodo de registo.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnPs5" onClick={() => handleButtonClick('INTERMALEOLAR - Electrodo de superficie, colocar preferetemente barra en la línea media, entre el maléolo lateral y el tendón del tibial anterior, transversal a la intersección de ambos maléolos.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnPs6" onClick={() => handleButtonClick('PIERNA LATERAL. (Antidrómico) 12-14 cm proximal del electrodo activo, anterior al musculo peroneo largo y adyacente al musculo tibial anterior.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 0 && <button className={`btnPerS1 ${activeBtn === 'btnPerS1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnPerS1' ? null : 'btnPerS1'); openModal("/assets/ValoresImg/MiembrosInf/PeroneoSp-G-01.png",{ top: '2%', left: '2%' });}}></button>}
            {currentImageIndex === 0 && <button className={`btnPerS2 ${activeBtn === 'btnPerS2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnPerS2' ? null : 'btnPerS2'); openModal("/assets/ValoresImg/MiembrosInf/PeroneoSp-T-01.png",{ top: '5%', left: '2%' });}}></button>}
            

            {currentImageIndex === 1 && <button className="btnPs7" onClick={() => handleButtonClick('Dorso del pie.', { top: '10%', left: '23%' }, 'T')}></button>}
            {currentImageIndex === 1 && <button className="btnPs8" onClick={() => handleButtonClick('3-4 cm distal del electrodo de registo.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 1 && <button className="btnPs9" onClick={() => handleButtonClick('INTERMALEOLAR - Electrodo de superficie, colocar preferetemente barra en la línea media, entre el maléolo lateral y el tendón del tibial anterior, transversal a la intersección de ambos maléolos.', { top: '10%', left: '23%' }, 'A')}></button>}
            {/* {currentImageIndex === 1 && <button className="btnPs10" onClick={() => handleButtonClick('8', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPs11" onClick={() => handleButtonClick('9', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPs12" onClick={() => handleButtonClick('10', { top: '10%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPs13" onClick={() => handleButtonClick('11', { top: '10%', left: '23%' })}></button>} */}
            {currentImageIndex === 1 && <button className="btnPs14" onClick={() => handleButtonClick('PIERNA LATERAL. La estimulación se aplica de forma antidrómica como primer punto a 12 cm en dirección proximal del electrodo activo justo lateral al tendón extensor largo del primer ortejo en la región lateral de la pierna. Los siguientes puntos de estímulo de aplicaran cada centímetro en dirección distal hasta llegar al electrodo de registro.', { top: '15%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 1 && <button className={`btnPerS1 ${activeBtn === 'btnPerS1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnPerS1' ? null : 'btnPerS1'); openModal("/assets/ValoresImg/MiembrosInf/PeroneoPf-G-02.png",{ top: '2%', left: '2%' });}}></button>}
            
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

export default PeroneoSuperficial