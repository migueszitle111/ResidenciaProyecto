import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../UlnarSt/UlnarSt.css";



const UlnarSt = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxUlSt');
    
    
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
    const [modalIcon, setModalIcon] = useState('');
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
        setMultiImageBoxVisible(false); // Ocultar el nuevo cuadro de múltiples imágenes
    };

    const handleButtonClick = (content, position, customClass = 'text-boxSup') => {
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
                        <button className="btnUlSt1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className={`btnUlSt2 ${activeBtn === 'UlSt2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'UlSt2' ? null : 'UlSt2'); openModal("/assets/ImgTecnicas/Potenciales/Somt/UlnarSt-T01.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ValoresImg/I_Tabla_Gris.png'); }}></button>
                        <button
                            className={`btnUlSt3 ${activeBtn === 'UlSt3' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'UlSt3' ? null : 'UlSt3');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/UlEstimulo.png",
                                    "Estimulo. Nervio UlnarSt fibras mixtas, con electrodos de superficie colocando el cátodo en dirección proximal a nivel del carpo, medial y adyacente al tendón cubital anterior, ánodo 2-3 cm distal. Es de utilidad ajustar un electrodo de barra con el ánodo en el pliegue de la muñeca y cátodo proximal a esta referencia." + 
                                    "\n\n Intensidad. incremento progresivo hasta obtener una leve contracción visible en el quinto y/o cuarto dedos.  \n\n Tierra. Antebrazo (otros autores prefieren a nivel de Cz).",
                                    
                                    { position: { top: '50%', left: '50%' }, size: '0.8rem', },
                                    '/assets/ImgTecnicas/Potenciales/Estimulo.png'
                                );
                            }}
                        ></button>
                        <button className={`btnUlSt4 ${activeBtn === 'UlSt4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'UlSt4' ? null : 'UlSt4'); openModal("/assets/ImgTecnicas/Potenciales/Mediano-10-20.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ImgTecnicas/Potenciales/Sistema.png'); }}></button>

                        {currentImageIndex === 0 && (
                            <button className={`btnUlStr ${activeBtn === 'UlStr' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'UlStr' ? null : 'UlStr');
                                    handleButtonClick('Cortical N20-P22, electrodo activo contralateral al estímulo C3’ (C4’) 2 cm posterior a C3 (C4) con referencia en Fpz’.', { top: '6%', left: '25%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/UlStCanal1.png", { top: "50%", left: "50%" });  }}
                            >
                                C4’-Fpz    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnUlStr2 ${activeBtn === 'UlStr2' ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveBtn(p => p === 'UlStr2' ? null : 'UlStr2');
                                        handleButtonClick('Cervical N11-N13, electrodo activo sobre apófisis espinosa de vertebra cervical C5s con referencia a Fpz’.', { top: '6%', left: '25%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/UlStCanal2.png", { top: "50%", left: "50%" });  }}
                            >
                                C5s-Fpz    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnUlStr3 ${activeBtn === 'UlStr3' ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveBtn(p => p === 'UlStr3' ? null : 'UlStr3');
                                        handleButtonClick('Erb N9.  Ipsilateral al estimulo, 2-3 cm por arriba de la clavícula e intersección en el borde posterior del musculo ECM.', { top: '6%', left: '25%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/UlStCanal3.png", { top: "50%", left: "50%" });  }}
                            >
                                ErbL-ErbR     
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnOndasUls ${activeBtn === 'OndasUls' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'OndasUls' ? null : 'OndasUls');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/UlStCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/UlStCanal2.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/UlStCanal3.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxUlSt ${textBoxClass}`}
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

export default UlnarSt;
