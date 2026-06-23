import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Tibial/Tibial.css";

const Tibial = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxTb');

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
    const [modalIcon, setModalIcon] = useState('');
    const [activeBtn, setActiveBtn] = useState(null);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Somt/TibialBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Somt/TibialBs.png",
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
                        {/* <button className="btnTib1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button> */}
                        <button className={`btnTib2 ${activeBtn === 'btnTib2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnTib2' ? null : 'btnTib2'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Tib-T01.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ValoresImg/I_Tabla_Gris.png'); }}></button>
                        <button
                            className={`btnTib3 ${activeBtn === 'btnTib3' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'btnTib3' ? null : 'btnTib3');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/TbEstimulo1.png",
                                    "Estimulo. Nervio Tibial fibras mixtas, colocar el cátodo entre maléolo medial y tendón de Aquiles, 1 cm por debajo del borde superior del maléolo, el ánodo se coloca a 3 cm en dirección distal al cátodo." + 
                                    "\n\n Intensidad. Incremento progresivo hasta obtener una leve contracción visible en el primer y/o quinto ortejos.\n\n Tierra. Pierna, entre estimulo y primer relevo de registros, otros autores prefieren en M1 o C4’/C3’.",
                                    
                                    { position: { top: '20%', left: '86%' }, size: '0.8rem', }, '/assets/ImgTecnicas/Potenciales/Estimulo.png'
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
                        <button className={`btnTib4 ${activeBtn === 'btnTib4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnTib4' ? null : 'btnTib4'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Tb-10-20.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ImgTecnicas/Potenciales/Sistema.png'); }}></button> 

                        {currentImageIndex === 0 && (
                            <button className={`btnTibia ${activeBtn === 'btnTibia' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnTibia' ? null : 'btnTibia');
                                        handleButtonClick('Cortical P37-N45, electrodo activo Cz’ línea media central 2 cm posterior al vértice con referencia en Fpz’.', { top: '7%', left: '25%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/TibCanal1.png", { top: "50%", left: "50%" });   }}
                            >
                                Cz’-Fpz´     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnTibia3 ${activeBtn === 'btnTibia3' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnTibia3' ? null : 'btnTibia3');
                                        handleButtonClick('N22 Lumbar electrodo activo en apófisis espinosa L4s con referencia a L1s o espina iliaca anterosuperior (opcional montaje T12s).', { top: '7%', left: '25%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/TibCanal2.png", { top: "50%", left: "50%" });   }}
                            >
                                L4s-L1s     
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnTibia4 ${activeBtn === 'btnTibia4' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnTibia4' ? null : 'btnTibia4');
                                        handleButtonClick('Fosa poplítea N7, electrodo activo discretamente lateral a la línea media, 2 cm proximal al pliegue cutáneo, referenciado a cara medial línea interarticular de la rodilla ipsilateral.', { top: '7%', left: '25%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/TibCanal3.png", { top: "50%", left: "50%" });   }}
                            >
                                Hpi-Hpc     
                            </button>
                        )}

                        {/* Este botón ahora usará el nuevo handleMultiImageBoxClick con un arreglo de rutas */}
                        {currentImageIndex === 0 && (
                            <button className={`btnOndasTb1 ${activeBtn === 'btnOndasTb1' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnOndasTb1' ? null : 'btnOndasTb1');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/TibCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/TibCanal2.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/TibCanal3.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxTb ${textBoxClass}`}
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
                            width: '250px',
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

export default Tibial;