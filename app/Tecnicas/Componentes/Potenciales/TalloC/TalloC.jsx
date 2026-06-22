import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../TalloC/TalloC.css";

const TalloC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxTall');

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
            original: "/assets/ImgTecnicas/Potenciales/Auditivo/TalloBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Auditivo/TalloBs.png",
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

    const handleButtonClick = (content, position, customClass = 'text-boxTall') => {
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
                        {/* <button className="btnTal1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button> */}
                        <button className={`btnTal2 ${activeBtn === 'btnTal2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnTal2' ? null : 'btnTal2'); openModal("/assets/ImgTecnicas/Potenciales/Auditivo/Tallo-T01.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }); }}></button>
                        
                        
                        {/* {currentImageIndex === 0 && (
                            <button className="btnEst" onClick={() => {
                                        handleButtonClick('Patrón Reverso de Dameros CAMPO TOTAL \n\n (Área Prequiasmática: nervio óptico). \n A 100 cm de distancia, estimular de forma monocular con oclusión contralateral. \n Tamaño de pantalla de 10 a 16° del campo visual.\n Elementos de 50’-56’ arco visual (cuadros grandes para visión periférica parafoveal).', { top: '12%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Auditivo/GogEstimulo.png", { top: "50%", left: "50%" });   }}
                            >
                                    
                            </button>
                        )} */}
                        
                        
                        <button
                            className={`btnTal3 ${activeBtn === 'btnTal3' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'btnTal3' ? null : 'btnTal3');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Auditivo/TallEstimulo.png",
                                    "Click monoauricular cuadrado a 10 ms de duración en modalidades de rarefacción y condensación." + 
                                    "\n\n 70 dBnHL de intensidad con enmascaramiento contralateral a 40 dB \n\n Frecuencia a 11.1 Hz ",
                                    
                                    { position: { top: '57%', left: '50%' }, size: '0.8rem', }
                                );
                            }}
                        ></button>

                        {/* <button
                            className="btnRegistroInf"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/RegidtroMiSup.png",
                                    "Abductor corto del pulgar  \n\n Activo. Vientre muscular en eminencia tenar lateral. \n Referencia. Primera articulación metacarpofalángica. \n Tierra. dorso de la mano o antebrazo." ,
                                    { position: { top: '62%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>*/}
                        <button className={`btnTal4 ${activeBtn === 'btnTal4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnTal4' ? null : 'btnTal4'); openModal("/assets/ImgTecnicas/Potenciales/Auditivo/Auditivo-10-20.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }); }}></button> 

                        {currentImageIndex === 0 && (
                            <button className={`btnTallo ${activeBtn === 'btnTallo' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnTallo' ? null : 'btnTallo');
                                        handleButtonClick('Auricular ipsilateral o Mi (mastoides ipsilateral) con referencia al vertex. Registra todos los componentes obligatorios, la colocación en mastoides acorta la latencia de onda I en relación con el montaje auricular; el complejo IV-V es de gran amplitud, pero puede verse como una sola onda ensanchada.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Auditivo/IPSILATERAL.png", { top: "50%", left: "50%" });   }}
                            >
                                Ai-Cz     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnTallo2 ${activeBtn === 'btnTallo2' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnTallo2' ? null : 'btnTallo2');
                                        handleButtonClick('Auricular contralateral o Mc (mastoides contralateral) con referencia al vertex. Onda I ausente pero mejor diferenciación entre ondas IV y V que facilita la marcación individual.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Auditivo/CONTRALATERAL.png", { top: "50%", left: "50%" });   }}
                            >
                                Ac-Cz
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnTallo3 ${activeBtn === 'btnTallo3' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnTallo3' ? null : 'btnTallo3');
                                        handleButtonClick('Auricular ipsilateral (referencial interaural) con referencia contralateral o Mi-Mc. Genera el mejor registro y diferenciación de las ondas I y III cuando no son claras en el montaje ipsilateral por el artefacto de estímulo.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Auditivo/LONGITUDINAL.png", { top: "50%", left: "50%" });   }}
                            >
                                Ai-Ac
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnTallo4 ${activeBtn === 'btnTallo4' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnTallo4' ? null : 'btnTallo4');
                                        handleButtonClick('Proceso espinoso C5 o C2 (extracefálica) con referencia en vertex. Registra la mejor amplitud de la onda V.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Auditivo/CERVICAL.png", { top: "50%", left: "50%" });   }}
                            >
                                C5s-Cz
                            </button>
                        )}

                        {/* Este botón ahora usará el nuevo handleMultiImageBoxClick con un arreglo de rutas */}
                        {currentImageIndex === 0 && (
                            <button className={`btnOndasTallo ${activeBtn === 'btnOndasTallo' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnOndasTallo' ? null : 'btnOndasTallo');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Auditivo/IPSILATERAL.png",
                                            "/assets/ImgTecnicas/Potenciales/Auditivo/CONTRALATERAL.png",
                                            "/assets/ImgTecnicas/Potenciales/Auditivo/LONGITUDINAL.png",
                                            "/assets/ImgTecnicas/Potenciales/Auditivo/CERVICAL.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                    </>
                )}




            {textBoxVisible && (
                <div
                    className={`text-boxTall ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxTall"
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
                    className="image-boxTall" // Reutilizamos la misma clase para los estilos
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

export default TalloC;