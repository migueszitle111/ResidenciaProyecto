import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Femorocutaneo/Femorocutaneo.css";



const Femorocutaneo = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxFem');
    
    
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
            original: "/assets/ImgTecnicas/Potenciales/Somt/FemoroB.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Somt/FemoroB.png",
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
                        <button className="btnFem1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className={`btnFem2 ${activeBtn === 'btnFem2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnFem2' ? null : 'btnFem2'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Femoro-T01.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ValoresImg/I_Tabla_Gris.png'); }}></button>
                        <button
                            className={`btnFem3 ${activeBtn === 'btnFem3' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'btnFem3' ? null : 'btnFem3');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/FemEstimulo.png",
                                    "Estimulo. Nervio femorocutáneo lateral, colocar el cátodo sobre la cara anterior del muslo, 12 cm distal de la espina iliaca anterosuperior siguiendo una línea imaginaria trazada hasta el borde lateral de la rótula; el ánodo se coloca 3 cm distal" + 
                                    "\n\n Intensidad. 3 a 2.5 veces el umbral sensitivo percibido por el paciente.  \n\n Tierra. M1, C5s o C4’/C3’.",
                                    
                                    { position: { top: '33%', left: '82%' }, size: '0.8rem', }, '/assets/ImgTecnicas/Potenciales/Estimulo.png'
                                );
                            }}
                        ></button>
                        <button className={`btnFem4 ${activeBtn === 'btnFem4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnFem4' ? null : 'btnFem4'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Fem10-20.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ImgTecnicas/Potenciales/Sistema.png');}}></button>

                        {currentImageIndex === 0 && (
                            <button className={`btnFemc ${activeBtn === 'btnFemc' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnFemc' ? null : 'btnFemc');
                                    handleButtonClick('Cortical P37-N45, electrodo activo Cz’ línea media central 2 cm posterior al vértice con referencia en Fpz’.', { top: '7%', left: '25%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/FemCanal1.png", { top: "50%", left: "50%" });  }}
                            >
                                Cz’-Fpz’    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnFemc2 ${activeBtn === 'btnFemc2' ? 'active' : ''}`} onClick={() => {
                                    setActiveBtn(p => p === 'btnFemc2' ? null : 'btnFemc2');
                                    handleButtonClick('Espina iliaca anterosuperior N7, electrodo activo 1 cm medial a la espina ipsilateral al estimulo con electrodo de referencia sobre el trocánter mayor.', { top: '7%', left: '25%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/FemCanal2.png", { top: "50%", left: "50%" });  }}
                            >
                                EIAS-TM    
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnOndasFem ${activeBtn === 'btnOndasFem' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnOndasFem' ? null : 'btnOndasFem');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/FemCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/FemCanal2.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}
                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxFem ${textBoxClass}`}
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
                            width: '325px',
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

export default Femorocutaneo;
