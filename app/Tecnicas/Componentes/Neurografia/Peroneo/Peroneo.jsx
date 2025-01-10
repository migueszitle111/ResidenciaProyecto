import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Peroneo/Peroneo.css"


const Peroneo = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Peroneo.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Peroneo.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/03-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/03-Peroneo.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/04-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/04-Peroneo.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/05-Peroneo.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/05-Peroneo.png",
        },
    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
    };

    const handleButtonClick = (content, position) => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTextBoxVisible(true);
        }
    };


    return (
        
        <div  className=" py-20 gallery-container">
        <ImageGallery items={images}
            onSlide={handleSlide}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={false}
            showNav={false}
            showThumbnails={true}
            thumbnailPosition="bottom"
            bulletclass="bullet"
        />
        <div>
            {/* Primera Imagen */}
            {currentImageIndex === 0 && <button className="btnPr1" onClick={() => handleButtonClick('Articulación metatarsofalángica del quinto ortejo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr2" onClick={() => handleButtonClick('Músculo Extensor corto de los dedos (ECD) región anterolateral mediotarsiana proximal. Pedir flexoextensión activa de los dedos para palpar musculatura o trazar una línea imaginaria desde el centro del maléolo lateral hasta la articulación metatarsofalángica del quinto ortejo y colocar electrodo de superficie en el centro del tercio proximal', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr3" onClick={() => handleButtonClick('1.	Tobillo. 8 cm proximal del electrodo activo, discretamente lateral al tendón del tibial anterior \n2.	Fíbula: Detrás y discretamente por debajo de la cabeza del peroné. \n3. Rodilla: En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr4" onClick={() => handleButtonClick('Dorso del pie o talón.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr5" onClick={() => handleButtonClick('1.	Tobillo. 8 cm proximal del electrodo activo, discretamente lateral al tendón del tibial anterior \n2.	Fíbula: Detrás y discretamente por debajo de la cabeza del peroné. \n3. Rodilla: En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnPr6" onClick={() => handleButtonClick('1.	Tobillo. 8 cm proximal del electrodo activo, discretamente lateral al tendón del tibial anterior \n2.	Fíbula: Detrás y discretamente por debajo de la cabeza del peroné. \n3. Rodilla: En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnPr7" onClick={() => handleButtonClick('1.	Fíbula: Detrás y discretamente por debajo de la cabeza del peroné. \n2. Rodilla: En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPr8" onClick={() => handleButtonClick('Tibia medial o rodilla. ', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPr9" onClick={() => handleButtonClick('1.	Fíbula: Detrás y discretamente por debajo de la cabeza del peroné. \n2. Rodilla: En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPr10" onClick={() => handleButtonClick('Músculo Tibial anterior. Cara lateral de la tibia, el electrodo de superficie se coloca en la unión del tercio proximal y medio de la pierna, en el punto exacto de una línea trazada entre la tuberosidad tibial y el maléolo lateral.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnPr11" onClick={() => handleButtonClick('4 cm distal al electrodo activo sobre el tendón del tibial anterior.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 2 && <button className="btnPr12" onClick={() => handleButtonClick('1. Fíbula: Detrás y discretamente por debajo de la cabeza del peroné. \n2. Rodilla: En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPr13" onClick={() => handleButtonClick('1. Fíbula: Detrás y discretamente por debajo de la cabeza del peroné. \n2. Rodilla: En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPr14" onClick={() => handleButtonClick('Músculo Peroneo lateral largo. El electrodo de superficie se coloca a 8 cm distal del punto de estimulación de la fíbula sobre una línea trazada entre maléolo lateral y la cabeza del peroné.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPr15" onClick={() => handleButtonClick('4 cm distal de electrodo activo sobre el recorrido del tendón.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnPr16" onClick={() => handleButtonClick('Tibia medial.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 3 && <button className="btnPr17" onClick={() => handleButtonClick('1. Fíbula: Detrás y discretamente por debajo de la cabeza del peroné. \n2. Rodilla: En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnPr18" onClick={() => handleButtonClick('1. Fíbula: Detrás y discretamente por debajo de la cabeza del peroné. \n2. Rodilla: En el punto de la sección transversal entre el tendón lateral de los isquiotibiales y el pliegue del hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnPr19" onClick={() => handleButtonClick('Tibia medial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnPr20" onClick={() => handleButtonClick('Músculo Extensor largo del primer ortejo. Electrodo de superficie colocado entre el tercio distal y medio de la pierna a 2 cm lateral del borde de la tibia. ', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnPr21" onClick={() => handleButtonClick('4 cm distal del electrodo activo.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 4 && <button className="btnPr22" onClick={() => handleButtonClick('22', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr23" onClick={() => handleButtonClick('23', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr24" onClick={() => handleButtonClick('24', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr25" onClick={() => handleButtonClick('25', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr26" onClick={() => handleButtonClick('26', { top: '12%', left: '32%' })}></button>}           
            {currentImageIndex === 4 && <button className="btnPr27" onClick={() => handleButtonClick('27', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 4 && <button className="btnPr28" onClick={() => handleButtonClick('28', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxPr" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Peroneo