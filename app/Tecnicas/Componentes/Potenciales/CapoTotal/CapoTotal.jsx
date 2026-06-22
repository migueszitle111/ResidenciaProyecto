import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../CapoTotal/CapoTotal.css";

const CapoTotal = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('itext-boxCap');

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
    const [activeBtn, setActiveBtn] = useState(null);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Visual/CampBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Visual/CampBs.png",
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

    const handleButtonClick = (content, position, customClass = 'itext-boxCap') => {
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
                        {/* <button className="btnCap1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button> */}
                        <button className={`btnCap2 ${activeBtn === 'btnCap2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnCap2' ? null : 'btnCap2'); openModal("/assets/ImgTecnicas/Potenciales/Visual/Camp-T01.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }); }}></button>
                        
                        
                        {currentImageIndex === 0 && (
                            <button className={`btnEstcap ${activeBtn === 'btnEstcap' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'btnEstcap' ? null : 'btnEstcap');
                                        handleButtonClick('Patrón Reverso de Dameros CAMPO TOTAL \n\n (Área Prequiasmática: nervio óptico). \n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del campo visual.\n Elementos de 50’-56’ arco visual (cuadros grandes para visión periférica parafoveal).', { top: '12%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamEstimulo.png", { top: "50%", left: "50%" });   }}
                            >
                                    
                            </button>
                        )}

                        <button className={`btnCap4 ${activeBtn === 'btnCap4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnCap4' ? null : 'btnCap4'); openModal("/assets/ImgTecnicas/Potenciales/Visual/Cam10-20.jpg","", {position: { top: '120%', left: '50%' }, size: '0rem', }); }}></button> 

                        {currentImageIndex === 0 && (
                            <button className={`btnCapo ${activeBtn === 'btnCapo' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnCapo' ? null : 'btnCapo');
                                        handleButtonClick('Lado izquierdo, colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz).', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamCanal1.png", { top: "50%", left: "50%" });   }}
                            >
                                O1-Fpz     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnCapo2 ${activeBtn === 'btnCapo2' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnCapo2' ? null : 'btnCapo2');
                                        handleButtonClick('Línea media occipital, colocar electrodo activo 5 cm por arriba del inion, referenciado a Fpz (línea media frontal) 12 cm por arriba del nasion. ', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamCanal2.png", { top: "50%", left: "50%" });   }}
                            >
                                Oz-Fpz
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnCapo3 ${activeBtn === 'btnCapo3' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnCapo3' ? null : 'btnCapo3');
                                        handleButtonClick('Lado derecho, colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz).', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamCanal3.png", { top: "50%", left: "50%" });   }}
                            >
                                O2-Fpz
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnCapo4 ${activeBtn === 'btnCapo4' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnCapo4' ? null : 'btnCapo4');
                                        handleButtonClick('Testigo opcional, colocar electrodo activo en Fpz referenciado a auricular A1/A2 o viceversa.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamCanal4.png", { top: "50%", left: "50%" });   }}
                            >
                                A1/A2 o M1/M2 – Fpz 
                            </button>
                        )}

                        {/* Este botón ahora usará el nuevo handleMultiImageBoxClick con un arreglo de rutas */}
                        {currentImageIndex === 0 && (
                            <button className={`btnOndasCap ${activeBtn === 'btnOndasCap' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnOndasCap' ? null : 'btnOndasCap');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Visual/CamCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Visual/CamCanal2.png",
                                            "/assets/ImgTecnicas/Potenciales/Visual/CamCanal3.png",
                                            "/assets/ImgTecnicas/Potenciales/Visual/CamCanal4.png"

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                    </>
                )}


                {/* {currentImageIndex === 1 && (
                    <>
                        
                        <button className={`btnCap2 ${activeBtn === 'btnCap2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnCap2' ? null : 'btnCap2'); openModal("/assets/ImgTecnicas/Potenciales/Visual/Camp-T01.png"); }}></button>
                        
                        
                        {currentImageIndex === 1 && (
                            <button className={`btnEst ${activeBtn === 'btnEst' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'btnEst' ? null : 'btnEst');
                                        handleButtonClick('Patrón Reverso de Dameros CAMPO TOTAL \n\n (Área Prequiasmática: nervio óptico). \n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del campo visual.\n Elementos de 28’-32’ arco visual (cuadros pequeños para visión central foveal).', { top: '12%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CamEstimulo2.png", { top: "50%", left: "50%" });   }}
                            >
                                    
                            </button>
                        )}

                        <button className={`btnCap4 ${activeBtn === 'btnCap4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnCap4' ? null : 'btnCap4'); openModal("/assets/ImgTecnicas/Potenciales/Visual/Cam10-20.jpg"); }}></button> 

                        {currentImageIndex === 1 && (
                            <button className={`btnCapo ${activeBtn === 'btnCapo' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnCapo' ? null : 'btnCapo');
                                        handleButtonClick('Lado izquierdo, colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz).', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CampCanal1.png", { top: "50%", left: "50%" });   }}
                            >
                                O1-Fpz     
                            </button>
                        )}
                        {currentImageIndex === 1 && (
                            <button className={`btnCapo2 ${activeBtn === 'btnCapo2' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnCapo2' ? null : 'btnCapo2');
                                        handleButtonClick('Línea media occipital, colocar electrodo activo 5 cm por arriba del inion, referenciado a Fpz (línea media frontal) 12 cm por arriba del nasion. ', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CampCanal2.png", { top: "50%", left: "50%" });   }}
                            >
                                Oz-Fpz
                            </button>
                        )}

                        {currentImageIndex === 1 && (
                            <button className={`btnCapo3 ${activeBtn === 'btnCapo3' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnCapo3' ? null : 'btnCapo3');
                                        handleButtonClick('Lado derecho, colocar electrodo activo 5 cm lateral a la línea media occipital (Oz) referenciado a línea media frontal (Fpz).', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CampCanal3.png", { top: "50%", left: "50%" });   }}
                            >
                                O2-Fpz
                            </button>
                        )}

                        {currentImageIndex === 1 && (
                            <button className={`btnCapo4 ${activeBtn === 'btnCapo4' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnCapo4' ? null : 'btnCapo4');
                                        handleButtonClick('Testigo opcional, colocar electrodo activo en Fpz referenciado a auricular A1/A2 o viceversa.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Visual/CampCanal4.png", { top: "50%", left: "50%" });   }}
                            >
                                A1/A2 o M1/M2 – Fpz 
                            </button>
                        )}

                       
                        {currentImageIndex === 1 && (
                            <button className={`btnOndasTb ${activeBtn === 'btnOndasTb' ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveBtn(p => p === 'btnOndasTb' ? null : 'btnOndasTb');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Visual/CampCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Visual/CampCanal2.png",
                                            "/assets/ImgTecnicas/Potenciales/Visual/CampCanal3.png",
                                            "/assets/ImgTecnicas/Potenciales/Visual/CampCanal4.png"

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                    </>
                )} */}


            {textBoxVisible && (
                <div
                    className={`itext-boxCap ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxCap"
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
                    className="image-boxCap" // Reutilizamos la misma clase para los estilos
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

export default CapoTotal;