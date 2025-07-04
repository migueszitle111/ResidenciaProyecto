import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../TripleRespuesta/TripleRespuesta.css";



const TripleRespuesta = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxTrp');
    
    
    const [modalText, setModalText] = useState(''); // NUEVO
    const [modalTextPosition, setModalTextPosition] = useState({ top: '80%', left: '50%' }); // posición inicial
    const [modalTextColor, setModalTextColor] = useState('#fff');
    const [modalTextSize, setModalTextSize] = useState('1.2rem');

    // NUEVOS ESTADOS para el segundo imageBox que acepta múltiples imágenes
    const [multiImageBoxVisible, setMultiImageBoxVisible] = useState(false);
    const [multiImageBoxContent, setMultiImageBoxContent] = useState([]); // Ahora es un arreglo de rutas
    const [multiImageBoxPosition, setMultiImageBoxPosition] = useState({ top: '50%', left: '50%' });


    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);/*NUEVO, Para Horizontal*/

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Motores/TripleBs1.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Motores/TripleBs1.png",
        },
        {
            original: "/assets/ImgTecnicas/Potenciales/Motores/TripleBs2.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Motores/TripleBs2.png",
        },
        {
            original: "/assets/ImgTecnicas/Potenciales/Motores/TripBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Motores/TripBs.png",
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
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
        setMultiImageBoxVisible(false); // Ocultar el nuevo cuadro de múltiples imágenes
    };

    const handleButtonClick = (content, position, customClass = 'text-boxTrp') => {
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
                />

                {/* Botones que abren imágenes en el modal */}
                {currentImageIndex === 0 && (
                    <>
                        <button className="btnTrp1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className="btnTrp2" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Motores/Triple1-T01.png")}></button>
                        <button
                            className="btnTrp3"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/MedMxEstimulo.p",
                                    "Cortical a nivel Vertex craneal 1 cm delante de Cz " + 
                                    "\n\n Cervical a nivel de proceso espinoso C5-C6 para Bíceps, C7 Para Flexor radial del carpo y C8-T1 para Primer interóseo dorsal  \n\n Periférico. Opcional en punto de Erb o ventral a apófisis coracoides.",
                                    
                                    { position: { top: '25%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>
                        <button className="btnTrp4" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Motores/Respuesta1-10-20.png")}></button>

                        {currentImageIndex === 0 && (
                            <button className="btnTrpR" onClick={() => {
                                    handleButtonClick('Electrodo activo colocado sobre el vientre muscular punto medio ventral del brazo; referencia sobre el tendón a nivel de pliegue del codo.', { top: '60%', left: '81%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/BicepsBq.png", { top: "50%", left: "50%" });  }}
                            >
                                Bíceps braquial    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnTrpR2" onClick={() => {
                                    handleButtonClick('Electrodo activo en tercio medio del antebrazo sobre la intersección de la línea trazada desde el pliegue del codo al centro de los huesos del carpo; referencia distal al recorrido del tendón 2 cm proximales a muñeca.', { top: '58%', left: '81%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/FloxorCar.png", { top: "50%", left: "50%" });  }}
                            >
                                Flexor radial del carpo     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnTrpR3" onClick={() => {
                                    handleButtonClick('Electrodo activo en espacio dorsal, línea media de membrana cutánea entre dedos pulgar e índice; referencia en articulación metacarpofalángica del pulgar.', { top: '60%', left: '81%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/PrimerInDr.png", { top: "50%", left: "50%" });  }}
                            >
                                Primer interóseo dorsal     
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnRegistro1" onClick={() => {
                                
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/Registro1-0.png", { top: "-58%", left: "50%" });  }}
                            >
                            
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnOndasTrp1" onClick={() => {
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Motores/BicepsBq.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/FloxorCar.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/PrimerInDr.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                    </>
                )}


                                {/* Botones que abren imágenes en el modal */}
                {currentImageIndex === 1 && (
                    <>
                        {/* <button className="btnTrp5" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button> */}
                        <button className="btnTrp6" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Motores/Triple2-T01.png")}></button>
                        <button
                            className="btnTrp7"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/MedMxEimulo.png",
                                    "Cortical a nivel Vertex craneal 1 cm delante de Cz. Opcional con bobina en mariposa C1-C2 o C3-C4." + 
                                    "\n\n Cervical a nivel de proceso espinoso C7 se puede registrar en los tres músculos o individualizar C6 para Bíceps y C8-T1 para ACP y ADM. \n\n Periférico. Opcional en punto de Erb o ventral a apófisis coracoides.",
                                    
                                    { position: { top: '25%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>
                        <button className="btnTrp8" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Motores/Repuesta2-10-20.png")}></button>

                        {currentImageIndex === 1 && (
                            <button className="btnTrpR4" onClick={() => {
                                    handleButtonClick('Electrodo activo colocado sobre el vientre muscular punto medio ventral del brazo; referencia sobre el tendón a nivel de pliegue del codo.', { top: '60%', left: '81%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/BicepBq2.png", { top: "50%", left: "50%" });  }}
                            >
                                Bíceps braquial    
                            </button>
                        )}
                        {currentImageIndex === 1 && (
                            <button className="btnTrpR5" onClick={() => {
                                    handleButtonClick('Electrodo activo en la eminencia hipotenar medial; referencia sobre la articulación metacarpofalángica del quinto dedo.', { top: '60%', left: '81%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/AbductorQut.png", { top: "50%", left: "50%" });  }}
                            >
                                Abductor del dedo meñique    
                            </button>
                        )}
                        {currentImageIndex === 1 && (
                            <button className="btnTrpR6" onClick={() => {
                                    handleButtonClick('Electrodo activo en eminencia tenar lateral; referencia sobre la primera articulación metacarpofalángica.', { top: '60%', left: '81%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/abductorCt.png", { top: "50%", left: "50%" });  }}
                            >
                                Abductor corto del pulgar     
                            </button>
                        )}
                        
                        {currentImageIndex === 1 && (
                            <button className="btnRegistro2" onClick={() => {
                                
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/Registro2.png", { top: "-58%", left: "50%" });  }}
                            >
                            
                            </button>
                        )}

                        {currentImageIndex === 1 && (
                            <button className="btnOndasTrp2" onClick={() => {
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Motores/BicepBq2.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/AbductorQut.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/abductorCt.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                    </>
                )}



                                {/* Botones que abren imágenes en el modal */}
                {currentImageIndex === 2 && (
                    <>
                        {/* <button className="btnTrp9" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button> */}
                        <button className="btnTrp10" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Motores/Triple3-T01.png")}></button>
                        <button
                            className="btnTrp11"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/MedMxEstimo.png",
                                    "Cortical a nivel Vertex craneal 3 cm delante de Cz." + 
                                    "\n\n Lumbosacro a nivel de proceso espinoso L3-L4 para Vasto medial, L4-L5 para Tibial anterior y S1 para Abductor del hallux. \n\n Periférico. Opcional en punto de Erb o ventral a apófisis coracoides.",
                                    
                                    { position: { top: '25%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>
                        <button className="btnTrp12" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Motores/Repuesta3-10-20.png")}></button>

                        {currentImageIndex === 2 && (
                            <button className="btnTrpR7" onClick={() => {
                                    handleButtonClick('Cortical N20-P22, electrodo activo contralateral al estímulo C3’ (C4’) 2 cm posterior a C3 (C4) con referencia en Fpz’.', { top: '60%', left: '19%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/VastoMd.png", { top: "50%", left: "50%" });  }}
                            >
                                Vasto medial    
                            </button>
                        )}
                        {currentImageIndex === 2 && (
                            <button className="btnTrpR8" onClick={() => {
                                    handleButtonClick('Cervical N11-N13, electrodo activo sobre apófisis espinosa de vertebra cervical C5s con referencia a Fpz’.', { top: '60%', left: '19%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/TibialAnt.png", { top: "50%", left: "50%" });  }}
                            >
                                Tibial anterior    
                            </button>
                        )}
                        {currentImageIndex === 2 && (
                            <button className="btnTrpR9" onClick={() => {
                                    handleButtonClick('Erb N9.  Ipsilateral al estimulo, 2-3 cm por arriba de la clavícula e intersección en el borde posterior del musculo ECM', { top: '60%', left: '19%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/AbdutorHallux.png", { top: "50%", left: "50%" });  }}
                            >
                                Abductor del hallux     
                            </button>
                        )}
                        
                        {currentImageIndex === 2 && (
                            <button className="btnRegistro3" onClick={() => {
                                
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/Registro3.png", { top: "-58%", left: "50%" });  }}
                            >
                            
                            </button>
                        )}

                        {currentImageIndex === 2 && (
                            <button className="btnOndasTrp3" onClick={() => {
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Motores/VastoMd.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/TibialAnt.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/AbdutorHallux.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxTrp ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxTrp"
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

            {multiImageBoxVisible && (
                <div
                    className="image-boxTrp" // Reutilizamos la misma clase para los estilos
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
                            width: '590px',
                            textAlign: 'justify',
                            zIndex: 20,
                        }}
                    >
                        {/* {modalText} */}
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

export default TripleRespuesta;
