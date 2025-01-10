import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Tibial/Tibial.css"


const Tibial = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/MiembrosInf/01-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Tibial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Tibial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/03-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/03-Tibial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/04-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/04-Tibial.png",
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
            {currentImageIndex === 0 && <button className="btnTb1" onClick={() => handleButtonClick('3.	Tobillo: Ligeramente detrás y proximal al maléolo medial, línea media entre el borde óseo y el tendón de Aquiles (aproximadamente 8-10 cm del electrodo activo). \n4.	Hueco poplíteo Ligeramente lateral del punto medio sobre el pliegue cutáneo poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb2" onClick={() => handleButtonClick('3.	Tobillo: Ligeramente detrás y proximal al maléolo medial, línea media entre el borde óseo y el tendón de Aquiles (aproximadamente 8-10 cm del electrodo activo). \n4.	Hueco poplíteo Ligeramente lateral del punto medio sobre el pliegue cutáneo poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb3" onClick={() => handleButtonClick('Dorso del pie', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb4" onClick={() => handleButtonClick('Músculo abductor del hallux (ABDH) colocar electrodo de superficie ligeramente proximal y por debajo de la tuberosidad navicular, aproximadamente 1 cm en ambas direcciones.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb5" onClick={() => handleButtonClick('Colocar en la cabeza del primer metatarsiano, o en la articulación metatarsofalángica.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnTb6" onClick={() => handleButtonClick('Estimulación en tobillo y hueco poplíteo, idéntica a técnica previa.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb7" onClick={() => handleButtonClick('Estimulación en tobillo y hueco poplíteo, idéntica a técnica previa.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb8" onClick={() => handleButtonClick('Músculo abductor del quinto ortejo (rama lateral), electrodo activo se coloca directamente debajo del maléolo lateral, dividiendo la distancia hasta la planta del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb9" onClick={() => handleButtonClick('Dorso del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb10" onClick={() => handleButtonClick('Colocar sobre la articulación metatarsiano-falángica del dedo meñique del pie.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 2 && <button className="btnTb11" onClick={() => handleButtonClick('Estimulación en tobillo y hueco poplíteo, idéntica a técnica previa.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb12" onClick={() => handleButtonClick('Músculo abductor del quinto ortejo (rama lateral), electrodo activo se coloca directamente debajo del maléolo lateral, dividiendo la distancia hasta la planta del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb13" onClick={() => handleButtonClick('Dorso del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb14" onClick={() => handleButtonClick('Músculo abductor del quinto ortejo (rama lateral), electrodo activo se coloca directamente debajo del maléolo lateral, dividiendo la distancia hasta la planta del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb15" onClick={() => handleButtonClick('Colocar sobre la articulación metatarsiano-falángica del dedo meñique del pie.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb16" onClick={() => handleButtonClick('Colocar sobre la articulación metatarsiano-falángica del dedo meñique del pie.', { top: '12%', left: '32%' })}></button>}
            
            {currentImageIndex === 3 && <button className="btnTb17" onClick={() => handleButtonClick('Hueco poplíteo Ligeramente lateral del punto medio sobre el pliegue cutáneo poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb18" onClick={() => handleButtonClick('Musculo Gastrocnemio, 8 a 10 cm distal del pliegue de la rodilla con orientación medial o lateral dependiendo de cada cabeza, o misma distancia, pero tomando como referencia una línea horizontal desde los tendones isquiotibiales en hueco poplíteo.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb19" onClick={() => handleButtonClick('Musculo Gastrocnemio, 8 a 10 cm distal del pliegue de la rodilla con orientación medial o lateral dependiendo de cada cabeza, o misma distancia, pero tomando como referencia una línea horizontal desde los tendones isquiotibiales en hueco poplíteo. ', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb20" onClick={() => handleButtonClick('Distal al recorrido del tendón de Aquiles.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb21" onClick={() => handleButtonClick('Justo debajo del borde del vientre del gastrocnemio con orientación lateral o medial. ', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb22" onClick={() => handleButtonClick('Justo debajo del borde del vientre del gastrocnemio con orientación lateral o medial.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb23" onClick={() => handleButtonClick('Musculo Soleo, justo debajo del borde del vientre del gastrocnemio.', { top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb24" onClick={() => handleButtonClick('Sobre Gastrocnemio medial.', { top: '12%', left: '32%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div className="text-boxTb" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Tibial