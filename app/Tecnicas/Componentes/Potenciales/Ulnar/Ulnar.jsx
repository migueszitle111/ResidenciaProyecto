import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Ulnar/Ulnar.css";



const Ulnar = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxUl');
    
    
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
    const [activeBtn, setActiveBtn] = useState(null);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);/*NUEVO, Para Horizontal*/

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Mediano01.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Mediano01.png",
        },
        // {
        //     original: "/assets/ImgTecnicas/Potenciales/Mediano-02.png",
        //     thumbnail: "/assets/ImgTecnicas/Potenciales/Mediano-02.png"
        // },
        // {
        //     original: "/assets/ImgTecnicas/Potenciales/Mediano-03.png",
        //     thumbnail: "/assets/ImgTecnicas/Potenciales/Mediano-03.png"
        // },
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
    };

    const handleButtonClick = (content, position, customClass = 'text-boxUl') => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTextBoxClass(customClass);
            setTextBoxVisible(true);
        }
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
                />

                {/* Botones que abren imágenes en el modal */}
                {currentImageIndex === 0 && (
                    <>
                        <button className="btnUln1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className={`btnUln2 ${activeBtn === 'Uln2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'Uln2' ? null : 'Uln2'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Ulnar-T01.png"); }}></button>
                        <button
                            className={`btnUln3 ${activeBtn === 'Uln3' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'Uln3' ? null : 'Uln3');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/UlEstimulo.png",
                                    "Estimulo. Nervio Ulnar fibras mixtas, con electrodos de superficie colocando el cátodo en dirección proximal a nivel del carpo, medial y adyacente al tendón cubital anterior, ánodo 2-3 cm distal. Es de utilidad ajustar un electrodo de barra con el ánodo en el pliegue de la muñeca y cátodo proximal a esta referencia." + 
                                    "\n\n Intensidad. incremento progresivo hasta obtener una leve contracción visible en el quinto y/o cuarto dedos.  \n\n Tierra. Antebrazo (otros autores prefieren a nivel de Cz).",
                                    
                                    { position: { top: '50%', left: '50%' }, size: '0.8rem', }
                                );
                            }}
                        ></button>
                        <button className={`btnUln4 ${activeBtn === 'Uln4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'Uln4' ? null : 'Uln4'); openModal("/assets/ImgTecnicas/Potenciales/Mediano-10-20.png"); }}></button>

                        {currentImageIndex === 0 && (
                            <button className={`btnUlnr ${activeBtn === 'btnUlnr' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnUlnr' ? null : 'btnUlnr');
                                    handleButtonClick('Cortical N20-P22, electrodo activo contralateral al estímulo C3’ (C4’) 2 cm posterior a C3 (C4) con referencia en Fpz’.', { top: '8%', left: '23%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/UlCanal1.png", { top: "50%", left: "50%" });  }}
                            >
                                C4’-Fpz    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnUlnr2 ${activeBtn === 'btnUlnr2' ? 'active' : ''}`} onClick={() => {
                                    setActiveBtn(p => p === 'btnUlnr2' ? null : 'btnUlnr2');
                                    handleButtonClick('Cervical N11-N13, electrodo activo sobre apófisis espinosa de vertebra cervical C5s con referencia a Fpz’.', { top: '8%', left: '23%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/UlCanal2.png", { top: "50%", left: "50%" });  }}
                            >
                                C5s-Fpz    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnUlnr3 ${activeBtn === 'btnUlnr3' ? 'active' : ''}`} onClick={() => {
                                    setActiveBtn(p => p === 'btnUlnr3' ? null : 'btnUlnr3');
                                    handleButtonClick('Erb N9.  Ipsilateral al estimulo, 2-3 cm por arriba de la clavícula e intersección en el borde posterior del musculo ECM', { top: '8 %', left: '23%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/UlCanal3.png", { top: "50%", left: "50%" });  }}
                            >
                                ErbL-ErbR     
                            </button>
                        )}

                        {/* Este botón ahora usará el nuevo handleMultiImageBoxClick con un arreglo de rutas */}
                        {currentImageIndex === 0 && (
                            <button className={`btnOndasUl ${activeBtn === 'btnOndasUl' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnOndasUl' ? null : 'btnOndasUl');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/UlCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/UlCanal2.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/UlCanal3.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxUl ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxUl"
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
                    className="image-boxUl" // Reutilizamos la misma clase para los estilos
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

export default Ulnar;
