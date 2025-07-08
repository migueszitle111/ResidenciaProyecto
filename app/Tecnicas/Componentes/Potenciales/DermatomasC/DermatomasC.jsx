import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../DermatomasC/DermatomasC.css";



const DermatomasC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxDerC');
    
    
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

    const handleButtonClick = (content, position, customClass = 'text-boxDerC') => {
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
                        <button className="btnDer1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className="btnDer2" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Somt/DermaC-T01.png")}></button>
                        <button
                            className="btnDer3"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/RadEstimu.png",
                                    "Cortical: \n Miembros superiores C4’ (C3’)-Fpz’ o Fpz. \n Miembros inferiores Cz’-Fpz’"+
                                    "\n\n Estimulo:  \n Dos a tres veces el umbral sensitivo percibido por el paciente sobre la superficie cutánea definida por dermatomas; se utilizan electrodos de anillo en los dedos y de superficie en el resto de cuerpo, es de gran utilidad la colocación de una barra de estimulación para orientar el ánodo distal al cátodo en extremidades y lateral a línea media en el tronco. " + 
                                    "\n\n Tierra: Ligeramente proximal al sitio de estimulación.",
                                    
                                    { position: { top: '25%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>
                        <button className="btnDer4" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Somt/Sup-10-20.png")}></button>

                        {currentImageIndex === 0 && (
                            <button className="btnDerm" onClick={() => {
                                    handleButtonClick('Fosa supraclavicular 2 cm por arriba de línea media de la clavícula.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/CervicalC4.png", { top: "50%", left: "50%" });  }}
                            >
                                C4    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDerm2" onClick={() => {
                                    handleButtonClick('10 cm proximal al epicóndilo lateral en la superficie lateral del brazo.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/CervicalC5.png", { top: "50%", left: "50%" });  }}
                            >
                                C5    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDerm3" onClick={() => {
                                    handleButtonClick('Electrodos de anillo alrededor del pulgar.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/CervicalC6.png", { top: "50%", left: "50%" });  }}
                            >
                                C6    
                            </button>
                        )}
                                                {currentImageIndex === 0 && (
                            <button className="btnDerm4" onClick={() => {
                                    handleButtonClick('Electrodos de anillo alrededor del dedo medio.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/CervicalC7.png", { top: "50%", left: "50%" });  }}
                            >
                                C7    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDerm5" onClick={() => {
                                    handleButtonClick('Electrodos de anillo alrededor del dedo meñique. ', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/CervicalC8.png", { top: "50%", left: "50%" });  }}
                            >
                                C8    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnDerm6" onClick={() => {
                                    handleButtonClick('5 cm distal al epicóndilo medial en la superficie medial del antebrazo.', { top: '7%', left: '54%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/CervicalT1.png", { top: "50%", left: "50%" });  }}
                            >
                                T1     
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnOndasDerC" onClick={() => {
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/CervicalC4.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/CervicalC5.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/CervicalC6.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/CervicalC7.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/CervicalC8.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/CervicalT1.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxDerC ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxDer"
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
                    className="image-boxDer" // Reutilizamos la misma clase para los estilos
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
                            width: '600px',
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

export default DermatomasC;
