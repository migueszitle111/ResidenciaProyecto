import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Cuadrantes/Cuadrantes.css";

const Cuadrantes = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxCua');

    // Estado existente para un solo imageBox
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });

    // NUEVOS ESTADOS para el segundo imageBox que acepta múltiples imágenes
    const [multiImageBoxVisible, setMultiImageBoxVisible] = useState(false);
    const [multiImageBoxContent, setMultiImageBoxContent] = useState([]); // Ahora es un arreglo de rutas
    const [multiImageBoxPosition, setMultiImageBoxPosition] = useState({ top: '50%', left: '50%' });


    const [modalText, setModalText] = useState('');
    const [modalTextPosition, setModalTextPosition] = useState({ top: '80%', left: '50%' });
    const [modalTextColor, setModalTextColor] = useState('#fff');
    const [modalTextSize, setModalTextSize] = useState('1.2rem');

    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIcon, setModalIcon] = useState('');
    const [activeBtn, setActiveBtn] = useState(null);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Visual/CuadBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Visual/CuadBs.png",
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
        
        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
        setMultiImageBoxVisible(false); // Ocultar el nuevo cuadro de múltiples imágenes
    };

    const handleButtonClick = (content, position, customClass = 'text-boxCua') => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTextBoxClass(customClass);
            setTextBoxVisible(true);
        }   
        // Asegurarse de ocultar los imageBoxes cuando se muestra un text-box
        setImageBoxVisible(false);
        setMultiImageBoxVisible(false);
    };

    const handleImageBoxClick = (image, position) => {
        if (imageBoxVisible && imageBoxContent === image) {
            setImageBoxVisible(false);
        } else {
            setImageBoxContent(image);
            setImageBoxPosition(position);
            setImageBoxVisible(true);
        }
        // Asegurarse de ocultar otros elementos cuando se muestra este imageBox
        
        setMultiImageBoxVisible(false);
    };

    // FUNCIÓN para manejar el nuevo imageBox con múltiples imágenes
    const handleMultiImageBoxClick = (imagesArray, position) => {
        if (multiImageBoxVisible && JSON.stringify(multiImageBoxContent) === JSON.stringify(imagesArray)) {
            setMultiImageBoxVisible(false);
        } else {
            setMultiImageBoxContent(imagesArray);
            setMultiImageBoxPosition(position); // Esta posición puede ser para el contenedor principal
            setMultiImageBoxVisible(true);
        }
        // Asegurarse de ocultar otros elementos cuando se muestra este multiImageBox
        setTextBoxVisible(false);
        setImageBoxVisible(false);
    };


    // Funciones para abrir y cerrar el modal
    const openModal = (
        image,
        text = '',
        options = { position: { top: '80%', left: '50%' }, color: '#fff', size: '1.2rem' },
        icon = ''
    ) => {
        setExtraImage(image);
        setModalText(text);
        setModalTextPosition(options.position || { top: '80%', left: '50%' });
        setModalTextColor(options.color || '#fff');
        setModalTextSize(options.size || '1.2rem');
        setModalIcon(icon);
        setModalVisible(true);
        setTextBoxVisible(false);
        setImageBoxVisible(false);
    };

    const closeModal = () => {
        setModalVisible(false);
        setExtraImage('');
        setModalIcon('');
        setActiveBtn(null);
    };

    const renderGalleryItem = (item) => (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
                src={item.original}
                alt=""
                onContextMenu={e => e.preventDefault()}
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {imageBoxVisible && (
                <img
                    src={imageBoxContent}
                    alt="Overlay"
                    style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'contain', pointerEvents: 'none',
                    }}
                    onContextMenu={e => e.preventDefault()}
                    draggable={false}
                />
            )}
            {multiImageBoxVisible && multiImageBoxContent.map((path, idx) => (
                <img
                    key={idx}
                    src={path}
                    alt=""
                    style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'contain', pointerEvents: 'none',
                    }}
                    onContextMenu={e => e.preventDefault()}
                    draggable={false}
                />
            ))}
        </div>
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
                    renderItem={renderGalleryItem}
                />

                {/* Botones que abren imágenes en el modal */}
                {currentImageIndex === 0 && (
                    <>
                        {/* <button className="btnCua1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button> */}
                        <button className={`btnCua2 ${activeBtn === 'btnCua2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnCua2' ? null : 'btnCua2'); openModal("/assets/ImgTecnicas/Potenciales/Visual/Camp-T01.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }); }}></button>
                        
                        
                        {currentImageIndex === 0 && (
                            <button className={`btnEst1 ${activeBtn === 'btnEst1' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnEst1' ? null : 'btnEst1');
                                        handleButtonClick('Patrón Reverso de Dameros por CUADRANTES  \n (área retroquiasmática: quiasma y tracto óptico). \n Previo a realizar la valoración por hemicampos es necesario tener certeza de la integridad funcional a nivel prequiasmático, para ello se requiere la respuesta indemne por campo completo en cada ojo. ' + 
                                            "\n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del arco visual. \n Elementos de 50’-90’ arco visual.", { top: '55%', left: '20%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/VEP-CUAD_0003_CSI.png", { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnEst3 ${activeBtn === 'btnEst3' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnEst3' ? null : 'btnEst3');
                                        handleButtonClick('Patrón Reverso de Dameros por CUADRANTES  \n (área retroquiasmática: quiasma y tracto óptico). \n Previo a realizar la valoración por hemicampos es necesario tener certeza de la integridad funcional a nivel prequiasmático, para ello se requiere la respuesta indemne por campo completo en cada ojo. ' + 
                                            "\n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del arco visual. \n Elementos de 50’-90’ arco visual.   ", { top: '55%', left: '79%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/VEP-CUAD_0002_CSD.png", { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnEst4 ${activeBtn === 'btnEst4' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnEst4' ? null : 'btnEst4');
                                        handleButtonClick('Patrón Reverso de Dameros por CUADRANTES  \n (área retroquiasmática: quiasma y tracto óptico). \n Previo a realizar la valoración por hemicampos es necesario tener certeza de la integridad funcional a nivel prequiasmático, para ello se requiere la respuesta indemne por campo completo en cada ojo. ' + 
                                            "\n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del arco visual. \n Elementos de 50’-90’ arco visual.  ", { top: '24%', left: '79%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/VEP-CUAD_0000_CID.png", { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnEst2 ${activeBtn === 'btnEst2' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnEst2' ? null : 'btnEst2');
                                        handleButtonClick('Patrón Reverso de Dameros por CUADRANTES  \n (área retroquiasmática: quiasma y tracto óptico). \n Previo a realizar la valoración por hemicampos es necesario tener certeza de la integridad funcional a nivel prequiasmático, para ello se requiere la respuesta indemne por campo completo en cada ojo. ' + 
                                            "\n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del arco visual. \n Elementos de 50’-90’ arco visual. ", { top: '24%', left: '20%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/VEP-CUAD_0001_CII.png", { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}                        
                        
                        {/* <button
                            className="btnCua3"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Visual/CamEstimulo.png",
                                    "Intensidad. 2.5-3 veces al umbral percibido por el paciente en caso del nervio Calcáneo y presencia de contracción visible en sus respectivos dedos para el nervio Plantar.", 
                                    // "\n\n Intensidad. Incremento progresivo hasta obtener una leve contracción visible en los dorsiflexores o extensores de los dedos. \n\n Tierra. M1 o C4’/C3’.",
                                    
                                    { position: { top: '27%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button> */}

                        {/* <button
                            className="btnRegistroInf"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/RegidtroMiSup.png",
                                    "Abductor corto del pulgar  \n\n Activo. Vientre muscular en eminencia tenar lateral. \n Referencia. Primera articulación metacarpofalángica. \n Tierra. dorso de la mano o antebrazo." ,
                                    { position: { top: '62%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>*/}
                        <button
                            className={`btnCua4 ${activeBtn === 'btnCua4' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'btnCua4' ? null : 'btnCua4');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Visual/Cuad-10-20.jpg",
                                    "Canal 1. T1-Fpz \n Temporal posterior izquierdo, colocar electrodo activo 10 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz). \n\n Canal 2. O1-Fpz \n Occipital lateral izquierdo) colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz)." +
                                    "\n\n Canal 3.  Oz-Fpz \n Línea media occipital, colocar electrodo activo 5 cm por arriba del inion, referenciado a Fpz (línea media frontal) 12 cm por arriba del nasion. \n\n Canal 4. O2-Fpz \n Occipital lateral derecho, colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz)."+ 
                                    "\n\n Canal 5. T2-Fpz \n Temporal posterior derecho, colocar electrodo activo 10 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz).",
                                    { position: { top: '7.5%', left: '17%' }, size: '0.7rem', }, '/assets/ImgTecnicas/Potenciales/Sistema.png'
                                );
                            }}
                        ></button>

                        {/* {currentImageIndex === 0 && (
                            <button className="btnCuad" onClick={() => {
                                        handleButtonClick('Lado izquierdo, colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz).', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamCanal1.png", { top: "50%", left: "50%" });   }}
                            >
                                O1-Fpz     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnCuad2" onClick={() => {
                                        handleButtonClick('Línea media occipital, colocar electrodo activo 5 cm por arriba del inion, referenciado a Fpz (línea media frontal) 12 cm por arriba del nasion. ', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamCanal2.png", { top: "50%", left: "50%" });   }}
                            >
                                Oz-Fpz
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnCuad3" onClick={() => {
                                        handleButtonClick('Lado derecho, colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz).', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamCanal3.png", { top: "50%", left: "50%" });   }}
                            >
                                O2-Fpz
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnCuad4" onClick={() => {
                                        handleButtonClick('Testigo opcional, colocar electrodo activo en Fpz referenciado a auricular A1/A2 o viceversa.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamCanal4.png", { top: "50%", left: "50%" });   }}
                            >
                                A1/A2 o M1/M2 – Fpz 
                            </button>
                        )} */}

                        {/* Este botón ahora usará el nuevo handleMultiImageBoxClick con un arreglo de rutas */}
                        {/* {currentImageIndex === 0 && (
                            <button className="btnOndasTb" onClick={() => {
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Visual/CamCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Visual/CamCanal2.png",
                                            "/assets/ImgTecnicas/Potenciales/Visual/CamCanal3.png",
                                            "/assets/ImgTecnicas/Potenciales/Visual/CamCanal4.png"

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )} */}

                    </>
                )}




            {textBoxVisible && (
                <div
                    className={`text-boxCua ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {modalVisible && (
                <div className="modal-gallerySup">
                    <button className={`print-button`} onClick={closeModal}>
                        <img
                            src="/I_X.webp"
                            style={{ filter: 'invert(1)' }}
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    </button>
                    <div className="modal-image-wrapper">
                        {modalIcon && (
                            <img
                                src={modalIcon}
                                className="modal-top-icon"
                                onContextMenu={e => e.preventDefault()}
                                draggable={false}
                            />
                        )}
                        <img
                            src={extraImage}
                            alt="Imagen Extra"
                            className="modal-imageSup"
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    </div>
                    {/* Cuadro de texto flotante y personalizable */}
                    <div
                        className="modal-text-box"
                        style={{
                            position: 'absolute',
                            top: modalTextPosition.top,
                            left: modalTextPosition.left,
                            transform: 'translate(-50%, 0)',
                            background: 'rgba(0, 0, 0)',
                            color: modalTextColor,
                            fontSize: modalTextSize,
                            padding: '12px 20px',
                            borderRadius: '10px',
                            minWidth: '180px',
                            maxWidth: '100%',
                            width: '300px',
                            textAlign: 'justify',
                            zIndex: 20,
                        }}
                    >
                        {modalText.split('\n').map((line, idx) => (
                        <span key={idx}>
                            {line}
                            <br />
                        </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cuadrantes;