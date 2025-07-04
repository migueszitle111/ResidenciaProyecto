import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../DermatomasT/DermatomasT.css";



const DermatomasT = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxDerT');
    
    
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

    const handleButtonClick = (content, position, customClass = 'text-boxDerT') => {
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
                        <button className="btnDerT1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className="btnDerT2" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Somt/DermaT-T01.png")}></button>
                        <button
                            className="btnDerT3"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/RadEstimuloa.png",
                                    "Estimulo: Dos a tres veces el umbral sensitivo percibido por el paciente sobre la superficie cutánea definida por dermatomas; se utilizan electrodos de anillo en los dedos y de superficie en el resto de cuerpo, es de gran utilidad la colocación de una barra de estimulación para orientar el ánodo distal al cátodo en extremidades y lateral a línea media en el tronco." + 
                                    "\n\n Tierra: Ligeramente proximal al sitio de estimulación.",
                                    
                                    { position: { top: '25%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>
                        <button className="btnDerT4" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Somt/Fem10-20.png")}></button>

                        {currentImageIndex === 0 && (
                            <button className="btnDermT" onClick={() => {
                                    handleButtonClick('6-8 cm por arriba del nivel T4.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerTorT2.png", { top: "50%", left: "50%" });  }}
                            >
                                T2    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDermT2" onClick={() => {
                                    handleButtonClick('A nivel lateral de la tetilla.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerTorT4.png", { top: "50%", left: "50%" });  }}
                            >
                                T4    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDermT3" onClick={() => {
                                    handleButtonClick('6-8 cm por debajo del nivel T4 o a nivel del esternón.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerTorT6.png", { top: "50%", left: "50%" });  }}
                            >
                                T6    
                            </button>
                        )}
                                                {currentImageIndex === 0 && (
                            <button className="btnDermT4" onClick={() => {
                                    handleButtonClick('6-8 cm por arriba de T10.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerTorT8.png", { top: "50%", left: "50%" });  }}
                            >
                                T8    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDermT5" onClick={() => {
                                    handleButtonClick('A nivel lateral de la cicatriz umbilical. ', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerTorT10.png", { top: "50%", left: "50%" });  }}
                            >
                                T10    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDermT6" onClick={() => {
                                    handleButtonClick('Discretamente arriba de la región inguinal.  ', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/DerTorT12.png", { top: "50%", left: "50%" });  }}
                            >
                                T12     
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnOndasDerT" onClick={() => {
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
                    className={`text-boxDerT ${textBoxClass}`}
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
                            background: 'rgba(28, 28, 28, 0.842)',
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

export default DermatomasT;
