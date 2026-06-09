import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Pudendos/Pudendos.css";



const Pudendos = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxPud');
    
    
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
            original: "/assets/ImgTecnicas/Potenciales/Somt/PuedenFBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Somt/PuedenFBs.png",
        },
        {
            original: "/assets/ImgTecnicas/Potenciales/Somt/PudMBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Somt/PudMBs.png",
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

    const handleButtonClick = (content, position, customClass = 'text-boxPud') => {
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
                        <button className="btnPud1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className={`btnPud2 ${activeBtn === 'btnPud2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnPud2' ? null : 'btnPud2'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Pudendos-T01.png"); }}></button>
                        <button
                            className={`btnPud3 ${activeBtn === 'btnPud3' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'btnPud3' ? null : 'btnPud3');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/PudFEstimulo.png",
                                    "Colocar electrodo de barra con el cátodo sobre los labios mayores, 1 cm debajo del clítoris, ánodo distal para estímulo izquierdo o derecho; si se cuentan con dos estimuladores independientes se obtienen mejores registros al estimulo bilateral. ", 
                                    { position: { top: '53%', left: '50%' }, size: '0.8rem', }
                                );
                            }}
                        ></button>
                        <button className={`btnPud4 ${activeBtn === 'btnPud4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnPud4' ? null : 'btnPud4'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Pudendos10-20.png")}}></button>

                        {currentImageIndex === 0 && (
                            <button className={`btnPude ${activeBtn === 'btnPude' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnPude' ? null : 'btnPude');
                                    handleButtonClick('Sobre región media del cráneo, 2 cm detrás del vértice Cz (Cz’) con referencia frontal a Fpz’.', { top: '8%', left: '23%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/PudFCanal1.png", { top: "50%", left: "50%" });  }}
                            >
                                Cz’-Fpz’    
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnOndasPud1 ${activeBtn === 'btnOndasPud1' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnOndasPud1' ? null : 'btnOndasPud1');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/PudFCanal1.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                    </>
                )}

                {currentImageIndex === 1 && (
                    <>
                        <button className={`btnPud5 ${activeBtn === 'btnPud5' ? 'active' : ''}`} onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className={`btnPud6 ${activeBtn === 'btnPud6' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnPud6' ? null : 'btnPud6'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Pudendos-T01.png"); }}></button>
                        <button
                            className={`btnPud7 ${activeBtn === 'btnPud7' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'btnPud7' ? null : 'btnPud7');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Somt/PudMEstimulo.png",
                                    "Colocar electrodos de anillo, cátodo en la     base del pene y ánodo 3-4 cm distal o en el cuello del glande. Se puede utilizar un electrodo de barra para estimular lado izquierdo o derecho por separado. ", 
                                    { position: { top: '60%', left: '50%' }, size: '0.8rem', }
                                );
                            }}
                        ></button>
                        <button className={`btnPud8 ${activeBtn === 'btnPud8' ? 'active' : ''}`} onClick={() => {
                            setActiveBtn(p => p === 'btnPud8' ? null : 'btnPud8');
                            openModal("/assets/ImgTecnicas/Potenciales/Somt/Pudendos10-20.png");
                        }}></button>

                        {currentImageIndex === 1 && (
                            <button className={`btnPude2 ${activeBtn === 'btnPude2' ? 'active' : ''}`} onClick={() => {
                                    setActiveBtn(p => p === 'btnPude2' ? null : 'btnPude2');
                                    handleButtonClick('Sobre región media del cráneo, 2 cm detrás del vértice Cz (Cz’) con referencia frontal a Fpz’.', { top: '8%', left: '23%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/PudMCanal1.png", { top: "50%", left: "50%" });  }}
                            >
                                Cz’-Fpz’    
                            </button>
                        )}
                        {currentImageIndex === 1 && (
                            <button className={`btnPude3 ${activeBtn === 'btnPude3' ? 'active' : ''}`} onClick={() => {
                                    setActiveBtn(p => p === 'btnPude3' ? null : 'btnPude3');
                                    handleButtonClick('Electrodo activo sobre apófisis espinosa L1 (L1s) Referenciado a espina iliaca anterosuperior EIAS. Se puede optar por L4s.', { top: '8%', left: '23%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/PudMCanal2.png", { top: "50%", left: "50%" });  }}
                            >
                                L1s-EIAS    
                            </button>
                        )}

                        {currentImageIndex === 1 && (
                            <button className={`btnOndasPud2 ${activeBtn === 'btnOndasPud2' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnOndasPud2' ? null : 'btnOndasPud2');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/PudMCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/PudMCanal2.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxPud ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxPud"
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
                    className="image-boxPud" // Reutilizamos la misma clase para los estilos
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

export default Pudendos;
