import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Frontalis.css";



const ExtHallucisL = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxAnt');
    
    
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
        original: "/assets/ImgTecnicas/miogImg/base22.png",
        thumbnail: "/assets/ImgTecnicas/miogImg/base22.png",
        layers: [
            "/assets/ImgTecnicas/miogImg/base22.png",
            "/assets/ImgTecnicas/miogImg/ELE_73.png", // segunda imagen encima
        ]
    },
];

    // Detecta el cambio de orientación
    useEffect(() => {
        const handleOrientationChange = () => {
            if (window.innerHeight < window.innerWidth) {
                setIsLandscape(true);  // En modo horizontal.0
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
    };

    const handleButtonClick = (content, position, customClass = 'text-boxAnt') => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTextBoxClass(customClass);
            setTextBoxVisible(true);
        }
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
    <div style={{ position: "relative", width: "100%", height: "100%", }}>
        {(item.layers || [item.original]).map((src, index) => (
            <img
                key={index}
                src={src}
                alt=""
                onContextMenu={e => e.preventDefault()}
                draggable={false}
                style={{
                    width: "80%",
                    height: "100%",
                    objectFit: "contain",
                    position: index === 0 ? "relative" : "absolute",
                    top: 15,
                    left: 180,
                }}
            />
        ))}
    </div>
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
        <div  className=" py-20 bg-white gallery-container">

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
                    renderItem={renderGalleryItem}   // ← esto faltaba
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showBullets={false}
                    showNav={false}
                    showThumbnails={false}
                    thumbnailPosition="bottom"
                />
                {/* strong>Título:</strong> Texto normal aquí, y <strong>esta parte en negritas</strong>. */}

                {/* Botones que abren imágenes en el modal */}
                {currentImageIndex === 0 && (
                    <>
                        <button className="btnAn1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>



                        <button className="btnAntb" onClick={() => {
                                handleButtonClick('Posición del paciente: Sedente \n\nPuntos de referencia palpables: Tendón dorsal del hallux; borde anterior fíbula' +
                        '\n\nPunto de entrada exacto: Tercio medio anterolateral, 2 cm lateral a cresta tibial \n\nOrientación y profundidad estimada de aguja: Perpendicular; 1–2 cm' + 
                        '\n\nPrecauciones: A. tibial anterior; N. fibular profundo \n\nManiobra de activación y/o nota ecográfica: Extensión del hallux; (US recomendable)', { top: "5%", left: "24.4%"});
                                handleImageBoxClick("/assets/ImgTecnicas/miogImg/LupaELE_73.png", { top: "50%", left: "50%" });
                            }}
                        >
                            PUNTO MOTOR
                        </button>

                        {/* Cuadros de texto informativos - imagen 0 */}
                        <div className="info-box info-box-19">
                            <strong>EXTENSOR HALLUCIS LONGUS</strong> <strong></strong>
                        </div>
                        <div className="info-box info-box-2">
                            <strong>Extensor largo del hallux</strong><strong></strong>
                        </div>
                        <div className="info-box info-box-3">
                            <strong>Inervación: </strong>N. fibular profundo (L5–S1)<strong></strong>
                        </div>
                        <div className="info-box info-box-4">
                            <strong> Origen: </strong>Fíbula medial y membrana interósea<strong></strong>
                        </div>
                        <div className="info-box info-box-5">
                            <strong>Inserción: </strong>Falange distal hallux (dorso)<strong></strong>
                        </div>
                        <div className="info-box info-box-6">
                            <strong>Función: </strong>Extensión IP hallux / Dorsiflexión tobillo<strong></strong>
                        </div>
                        <div className="info-box info-box-7">
                            <strong>Tipo de fibras: </strong>Predominio IIa/IIx<strong></strong>
                        </div>
                        <div className="info-box info-box-8">
                            <strong>Cantidad de fibras: </strong>≈0.18–0.25 millones<strong></strong>
                        </div>
                        <div className="info-box info-box-9">
                            <strong>Unidades motoras: </strong>≈250–350<strong></strong>
                        </div>
                        <div className="static-text-box">
                            
                        </div>

                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxAnt ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxAnt"
                style={{
                top: 100,
                left: 280,
                width: "70%",
                height: "70%",
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
                    className="image-boxAnt" // Reutilizamos la misma clase para los estilos
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


export default ExtHallucisL;
