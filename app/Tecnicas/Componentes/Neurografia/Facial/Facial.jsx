import { useState, useEffect } from "react"; /*Se agrega useEffect*/
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Facial/Facial.css";


const Facial = () => {
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
            original: "/assets/ValoresImg/Cervicales/01-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Facial.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/02-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/02-Facial.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/03-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/03-Facial.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/04-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/04-Facial.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/05-Facial.png",
            thumbnail: "/assets/ValoresImg/Cervicales/05-Facial.png",
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
            {currentImageIndex === 0 && <button className="btnFc1" onClick={() => handleButtonClick('MENTALIS.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnFc2" onClick={() => handleButtonClick('Mentalis.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnFc3" onClick={() => handleButtonClick('ORBICULARIS ORIS.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnFc4" onClick={() => handleButtonClick('Orbicularis oris.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnFc5" onClick={() => handleButtonClick('NASALIS.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnFc6" onClick={() => handleButtonClick('Nasalis.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnFc7" onClick={() => handleButtonClick('ORBICULARIS OCULI.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnFc8" onClick={() => handleButtonClick('Orbicularis oculi.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnFc9" onClick={() => handleButtonClick('FRONTALIS.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 0 && <button className="btnFc10" onClick={() => handleButtonClick('Frontalis.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 0 && <button className="btnFc11" onClick={() => handleButtonClick('Hueso cigomatico.', { top: '10%', left: '23%' }, 'T')}></button>}
            {currentImageIndex === 0 && <button className="btnFc12" onClick={() => handleButtonClick('POSTAURICULAR. El cátodo se coloca en el agujero estilomastoideo justo detrás y después del oído, inferior y anterior a la apófisis mastoides.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 0 && <button className={`btnFaci1 ${activeBtn === 'btnFaci1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci1' ? null : 'btnFaci1'); openModal("/assets/ValoresImg/Cervicales/01-Facial-G.png",{ top: '2%', left: '2%' });}}></button>}
            {currentImageIndex === 0 && <button className={`btnFaci2 ${activeBtn === 'btnFaci2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci2' ? null : 'btnFaci2'); openModal("/assets/ValoresImg/Cervicales/02-Facial-T.png",{ top: '5%', left: '2%' });}}></button>}

            {currentImageIndex === 1 && <button className="btnFc13" onClick={() => handleButtonClick('PREAURICULAR. El cátodo se coloca sobre el trago anterior delante de la oreja dirigiendo el ánodo proximalmente.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 1 && <button className="btnFc14" onClick={() => handleButtonClick('ORBICULARIS OCULI - Con electrodo de superficie colocado lateral al borde externo de la órbita.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 1 && <button className="btnFc15" onClick={() => handleButtonClick('Región frontal.', { top: '10%', left: '23%' }, 'T')}></button>}
            {currentImageIndex === 1 && <button className="btnFc16" onClick={() => handleButtonClick('Sobre dorso del tabique nasal 2 cm en dirección lateral, ipsilateral al lado estimulado.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 1 && <button className="btnFc17" onClick={() => handleButtonClick('Sobre el dorso del tabique nasal 1 cm en dirección lateral, ipsilateral al lado estimulado.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 1 && <button className="btnFc18" onClick={() => handleButtonClick('NASALIS - Con electrodo de superficie colocado lateral al centro de la nariz.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 1 && <button className="btnFc19" onClick={() => handleButtonClick('ORBICULARIS ORIS - Con electrodo de superficie colocado lateral al borde externo de la comisura labial.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 1 && <button className="btnFc20" onClick={() => handleButtonClick('Inferior a la mitad del labio menor.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 1 && <button className={`btnFaci1 ${activeBtn === 'btnFaci1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci1' ? null : 'btnFaci1'); openModal("/assets/ValoresImg/Cervicales/02-Facial-G.png",{ top: '2%', left: '2%' });}}></button>}
            {currentImageIndex === 1 && <button className={`btnFaci2 ${activeBtn === 'btnFaci2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci2' ? null : 'btnFaci2'); openModal("/assets/ValoresImg/Cervicales/02-Facial-T.png",{ top: '5%', left: '2%' });}}></button>}
            
            {currentImageIndex === 2 && <button className="btnFc21" onClick={() => handleButtonClick('Región frontal.', { top: '10%', left: '23%' }, 'T')}></button>}
            {currentImageIndex === 2 && <button className="btnFc22" onClick={() => handleButtonClick('Sobre dorso del tabique nasal 2 cm en dirección lateral, ipsilateral al lado estimulado.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 2 && <button className="btnFc23" onClick={() => handleButtonClick('ORBICULARIS OCULI - Con electrodo de superficie colocado lateral al borde externo de la órbita.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 2 && <button className="btnFc24" onClick={() => handleButtonClick('RAMA. 2 a 5 cm en dirección antero medial y orientado hacia el musculo correspondiente.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 2 && <button className="btnFc25" onClick={() => handleButtonClick('PREAURICULAR. El cátodo se coloca sobre el trago anterior delante de la oreja dirigiendo el ánodo proximalmente.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 2 && <button className="btnFc26" onClick={() => handleButtonClick('POSTAURICULAR. El cátodo se coloca en el agujero estilomastoideo justo detrás y después del oído, inferior y anterior a la apófisis mastoides.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 2 && <button className={`btnFaci1 ${activeBtn === 'btnFaci1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci1' ? null : 'btnFaci1'); openModal("/assets/ValoresImg/Cervicales/03-Facial-G.png",{ top: '2%', left: '2%' });}}></button>}            
            {currentImageIndex === 2 && <button className={`btnFaci2 ${activeBtn === 'btnFaci2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci2' ? null : 'btnFaci2'); openModal("/assets/ValoresImg/Cervicales/02-Facial-T.png",{ top: '5%', left: '2%' });}}></button>}

            {currentImageIndex === 3 && <button className="btnFc27" onClick={() => handleButtonClick('Región frontal.', { top: '10%', left: '23%' }, 'T')}></button>}
            {currentImageIndex === 3 && <button className="btnFc28" onClick={() => handleButtonClick('Sobre el dorso del tabique nasal 1 cm en dirección lateral, ipsilateral al lado estimulado.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 3 && <button className="btnFc29" onClick={() => handleButtonClick('NASALIS - Con electrodo de superficie colocado lateral al centro de la nariz.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 3 && <button className="btnFc30" onClick={() => handleButtonClick('RAMA. 2 a 5 cm en dirección antero medial y orientado hacia el musculo correspondiente.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 3 && <button className="btnFc31" onClick={() => handleButtonClick('PREAURICULAR. El cátodo se coloca sobre el trago anterior delante de la oreja dirigiendo el ánodo proximalmente.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 3 && <button className="btnFc32" onClick={() => handleButtonClick('POSTAURICULAR. El cátodo se coloca en el agujero estilomastoideo justo detrás y después del oído, inferior y anterior a la apófisis mastoides.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 3 && <button className={`btnFaci1 ${activeBtn === 'btnFaci1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci1' ? null : 'btnFaci1'); openModal("/assets/ValoresImg/Cervicales/04-Facial-G.png",{ top: '2%', left: '2%' });}}></button>}            
            {currentImageIndex === 3 && <button className={`btnFaci2 ${activeBtn === 'btnFaci2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci2' ? null : 'btnFaci2'); openModal("/assets/ValoresImg/Cervicales/02-Facial-T.png",{ top: '5%', left: '2%' });}}></button>}

            {currentImageIndex === 4 && <button className="btnFc33" onClick={() => handleButtonClick('Región frontal.', { top: '10%', left: '23%' }, 'T')}></button>}
            {currentImageIndex === 4 && <button className="btnFc34" onClick={() => handleButtonClick('Inferior a la mitad del labio menor.', { top: '10%', left: '23%' }, 'R')}></button>}
            {currentImageIndex === 4 && <button className="btnFc35" onClick={() => handleButtonClick('ORBICULARIS ORIS - Con electrodo de superficie colocado lateral al borde externo de la comisura labial.', { top: '10%', left: '23%' }, 'A')}></button>}
            {currentImageIndex === 4 && <button className="btnFc36" onClick={() => handleButtonClick('RAMA. 2 a 5 cm en dirección antero medial y orientado hacia el musculo correspondiente.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 4 && <button className="btnFc37" onClick={() => handleButtonClick('PREAURICULAR. El cátodo se coloca sobre el trago anterior delante de la oreja dirigiendo el ánodo proximalmente.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 4 && <button className="btnFc38" onClick={() => handleButtonClick('POSTAURICULAR. El cátodo se coloca en el agujero estilomastoideo justo detrás y después del oído, inferior y anterior a la apófisis mastoides.', { top: '10%', left: '23%' }, 'E')}></button>}
            {currentImageIndex === 4 && <button className={`btnFaci1 ${activeBtn === 'btnFaci1' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci1' ? null : 'btnFaci1'); openModal("/assets/ValoresImg/Cervicales/05-Facial-G.png",{ top: '2%', left: '2%' });}}></button>}            
            {currentImageIndex === 4 && <button className={`btnFaci2 ${activeBtn === 'btnFaci2' ? 'active' : ''}`} onClick={() => { setActiveBtn(p => p === 'btnFaci2' ? null : 'btnFaci2'); openModal("/assets/ValoresImg/Cervicales/02-Facial-T.png",{ top: '5%', left: '2%' });}}></button>}                        
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

export default Facial