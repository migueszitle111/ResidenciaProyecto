import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../DermatomasL/DermatomasL.css";



const DermatomasL = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxDerL');
    
    
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
            original: "/assets/ImgTecnicas/Potenciales/Somt/DermatomaBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Somt/DermatomaBs.png",
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

    const handleButtonClick = (content, position, customClass = 'text-boxDerL') => {
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
                        <button className="btnDerL1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className="btnDerL2" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Somt/DermaL-T01.png")}></button>
                        <button
                            className="btnDerL3"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/RadEstimulo.png",
                                    "Estimulo. Nervio Radial superficial mediante electrodos de barra sobre el borde dorsolateral de la muñeca, 2 cm proximal a la apófisis estiloides radial; ánodo 3 cm distalmente." + 
                                    "\n\n Intensidad.  El triple o 2.5 veces por arriba del umbral sensitivo percibido por el paciente.  \n\n Tierra. Antebrazo (otros autores prefieren a nivel de Cz).",
                                    
                                    { position: { top: '53%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>
                        <button className="btnDerL4" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Somt/Fem10-20.png")}></button>

                        {currentImageIndex === 0 && (
                            <button className="btnDermL" onClick={() => {
                                    handleButtonClick('4-5 cm por debajo de T12.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerLumL1.png", { top: "50%", left: "50%" });  }}
                            >
                                L1    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDermL2" onClick={() => {
                                    handleButtonClick('8-10 cm por debajo de T12.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerLumL2.png", { top: "50%", left: "50%" });  }}
                            >
                                L2    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDermL3" onClick={() => {
                                    handleButtonClick('Punto medio de una línea oblicua trazada entre la creta iliaca anterosuperior, hasta el cóndilo medial de la tibia.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerLumL3.png", { top: "50%", left: "50%" });  }}
                            >
                                L3    
                            </button>
                        )}
                                                {currentImageIndex === 0 && (
                            <button className="btnDermL4" onClick={() => {
                                    handleButtonClick('Punto medio de una línea horizontal trazada desde el maléolo medial, hasta el cóndilo medial de la tibia.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerLumL4.png", { top: "50%", left: "50%" });  }}
                            >
                                L4    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDermL5" onClick={() => {
                                    handleButtonClick('Borde medial en el dorso del segundo metatarsiano. ', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerLumL5.png", { top: "50%", left: "50%" });  }}
                            >
                                L5    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDermL6" onClick={() => {
                                    handleButtonClick('Borde lateral en el dorso del quinto metatarsiano.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerLumS1.png", { top: "50%", left: "50%" });  }}
                            >
                                S1     
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnOndasDerL" onClick={() => {
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/DerLumL1.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/DerLumL2.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/DerLumL3.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/DerLumL4.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/DerLumL5.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/DerLumS1.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxDerL ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxDerL"
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
                    className="image-boxDerL" // Reutilizamos la misma clase para los estilos
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
                            background: 'rgba(8, 8, 8, 0.377)',
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

export default DermatomasL;
