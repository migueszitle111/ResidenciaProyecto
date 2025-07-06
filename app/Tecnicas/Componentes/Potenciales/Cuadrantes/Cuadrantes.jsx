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


    const openModal = (
        image,
        text = '',
        options = { position: { top: '80%', left: '50%' }, color: '#fff', size: '1.2rem' }
    ) => {
        setExtraImage(image);
        setModalText(text);
        setModalTextPosition(options.position || { top: '80%', left: '50%' });
        setModalTextColor(options.color || '#fff');
        setModalTextSize(options.size || '1.2rem');
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
        <div className=" py-20 gallery-container">

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
                />

                {/* Botones que abren imágenes en el modal */}
                {currentImageIndex === 0 && (
                    <>
                        {/* <button className="btnCua1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button> */}
                        <button className="btnCua2" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Visual/Camp-T01.png")}></button>
                        
                        
                        {currentImageIndex === 0 && (
                            <button className="btnEst1" onClick={() => {
                                        handleButtonClick('Patrón Reverso de Dameros por CUADRANTES  \n (área retroquiasmática: quiasma y tracto óptico). \n Previo a realizar la valoración por hemicampos es necesario tener certeza de la integridad funcional a nivel prequiasmático, para ello se requiere la respuesta indemne por campo completo en cada ojo. ' + 
                                            "\n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del arco visual. \n Elementos de 50’-90’ arco visual.", { top: '55%', left: '20%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/VEP-CUAD_0003_CSI.png", { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnEst3" onClick={() => {
                                        handleButtonClick('Patrón Reverso de Dameros por CUADRANTES  \n (área retroquiasmática: quiasma y tracto óptico). \n Previo a realizar la valoración por hemicampos es necesario tener certeza de la integridad funcional a nivel prequiasmático, para ello se requiere la respuesta indemne por campo completo en cada ojo. ' + 
                                            "\n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del arco visual. \n Elementos de 50’-90’ arco visual.   ", { top: '55%', left: '79%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/VEP-CUAD_0002_CSD.png", { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnEst4" onClick={() => {
                                        handleButtonClick('Patrón Reverso de Dameros por CUADRANTES  \n (área retroquiasmática: quiasma y tracto óptico). \n Previo a realizar la valoración por hemicampos es necesario tener certeza de la integridad funcional a nivel prequiasmático, para ello se requiere la respuesta indemne por campo completo en cada ojo. ' + 
                                            "\n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del arco visual. \n Elementos de 50’-90’ arco visual.  ", { top: '24%', left: '79%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/VEP-CUAD_0000_CID.png", { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnEst2" onClick={() => {
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
                            className="btnCua4"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Visual/Cuad-10-20.jpg",
                                    "Canal 1. T1-Fpz \n Temporal posterior izquierdo, colocar electrodo activo 10 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz). \n\n Canal 2. O1-Fpz \n Occipital lateral izquierdo) colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz)." +
                                    "\n\n Canal 3.  Oz-Fpz \n Línea media occipital, colocar electrodo activo 5 cm por arriba del inion, referenciado a Fpz (línea media frontal) 12 cm por arriba del nasion. \n\n Canal 4. O2-Fpz \n Occipital lateral derecho, colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz)."+ 
                                    "\n\n Canal 5. T2-Fpz \n Temporal posterior derecho, colocar electrodo activo 10 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz).",
                                    { position: { top: '55%', left: '50%' }, size: '0.7rem', }
                                )
                            }
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
            {imageBoxVisible && (
            <div
                className="image-boxCua"
                style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
                }}
            >
                <img
                src={imageBoxContent}
                alt="Cuadro dinámico"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    position: "relative",
                }}
                className="zoomable-image"
                />
            </div>
            )}

            {/* NUEVO: Contenedor para múltiples imágenes que se enciman */}
            {multiImageBoxVisible && (
                <div
                    className="image-boxCua" // Reutilizamos la misma clase para los estilos
                    style={{
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}
                >
                    {multiImageBoxContent.map((imagePath, index) => (
                        <img
                            key={index}
                            src={imagePath}
                            alt={`Cuadro dinámico ${index + 1}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                position: "absolute", // Mantiene las imágenes dentro del contenedor
                                // Opcional: Puedes ajustar el zIndex si quieres un orden específico
                                // zIndex: 10 + index,
                            }}
                            className="zoomable-image"
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    ))}
                    {/* Botón para cerrar el multiImageBox */}

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
                    {/* Cuadro de texto flotante y personalizable */}
                    <div
                        className="modal-text-box"
                        style={{
                            position: 'absolute',
                            top: modalTextPosition.top,
                            left: modalTextPosition.left,
                            transform: 'translate(-50%, 0)',
                            background: 'rgba(69, 69, 69)',
                            color: modalTextColor,
                            fontSize: modalTextSize,
                            padding: '12px 20px',
                            borderRadius: '10px',
                            minWidth: '180px',
                            maxWidth: '100%',
                            width: '690px',
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