import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Inferiores/Inferiores.css";



const Inferiores = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxInf');
    
    
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
            original: "/assets/ImgTecnicas/Potenciales/Somt/InferiorBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Somt/InferiorBs.png",
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

    const handleButtonClick = (content, position, customClass = 'text-boxInf') => {
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
                        {/* <button className="btnInf1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button> */}
                        <button className="btnInf2" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Somt/Inferior-T01.png")}></button>
                        <button
                            className="btnInf3"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/InfEstimulo.png",
                                    "Nervio Tibial derecho, fibras mixtas a nivel del tobillo. \n El nervio Tibial representa el estándar de estimulación en miembros inferiores por la alta tasa de registros exitosos en todos los relevos. " + 
                                    "\n Intensidad, incremento progresivo hasta obtener una leve contracción visible en el primer y/o quinto ortejos.  \n Frecuencia a 2 a 5 Hz. \n Duración 0.2-0.3 ms.",
                                    
                                    { position: { top: '60%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>
                        <button className="btnInf4" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Somt/Fem10-20.png")}></button>

                        {currentImageIndex === 0 && (
                            <button className="btnInfe" onClick={() => {
                                    handleButtonClick('Sobre región media del cráneo, 2 cm detrás del vértice Cz (Cz’) con referencia frontal a Fpz’.', { top: '7%', left: '24%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/InfeCanal1.png", { top: "50%", left: "50%" });  }}
                            >
                                Cz’-Fpz’    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnInfe2" onClick={() => {
                                    handleButtonClick('Registro bipolar C1’ activo con su referencia longitudinal contralateral C2’. Puede mejorar la amplitud y morfología de las respuestas corticales con relación al montaje referencial, pero más susceptible a contaminación por ruido de fondo muscular. Es común en miembros pélvicos la lateralización paradójica.', { top: '8%', left: '24%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/InfeCanal2.png", { top: "50%", left: "50%" });  }}
                            >
                                C1’-C2’    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnInfe3" onClick={() => {
                                    handleButtonClick('Registro de campo lejano colocando el electrodo activo en la apófisis espinosa de la quinta vertebra cervical (5Cs) y referenciado a Fpz’. Se puede optar por la colocación en M1 como en la monitorización intraoperatoria.', { top: '8%', left: '24%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/InfeCanal3.png", { top: "50%", left: "50%" });  }}
                            >
                                C5s-Fpz’     
                            </button>
                        )}
                                                {currentImageIndex === 0 && (
                            <button className="btnInfe4" onClick={() => {
                                    handleButtonClick('Apófisis espinosa L1 referenciada a espina iliaca anterosuperior para ampliar el campo de registro. Se puede modificar el montaje hacia niveles torácicos (T12s, T6s, etc).', { top: '7%', left: '24%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/InfeCanal4.png", { top: "50%", left: "50%" });  }}
                            >
                                L1s-EIAS    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnInfe5" onClick={() => {
                                    handleButtonClick('Electrodo activo sobre apófisis espinosa L4 (L4s) localizada un nivel por arriba de la línea que une las crestas iliacas (división L4-L5). Referenciado a L1s, 5 cm en dirección ascendente.', { top: '6%', left: '24%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/InfeCanal5.png", { top: "50%", left: "50%" });  }}
                            >
                                L4s-L1s      
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnInfe6" onClick={() => {
                                    handleButtonClick('Hueco poplíteo, electrodo activo discretamente lateral a la línea media 2 cm proximal al pliegue cutáneo, referenciado a cara medial línea interarticular de la rodilla ipsilateral.', { top: '6%', left: '24%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/InfeCanal6.png", { top: "50%", left: "50%" });  }}
                            >
                                Hpi-Hpc      
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnOndasSup" onClick={() => {
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/InfeCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/InfeCanal2.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/InfeCanal3.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/InfeCanal4.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/InfeCanal5.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/InfeCanal6.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxInf ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxInf"
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
                    className="image-boxInf" // Reutilizamos la misma clase para los estilos
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

export default Inferiores;
