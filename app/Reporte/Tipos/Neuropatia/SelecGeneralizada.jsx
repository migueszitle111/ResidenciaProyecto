import { useState } from 'react';
import Draggable from 'react-draggable';
import { Accordion } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';
import { ReportContext } from '@/src/context';
import { useContext } from 'react';


export function MyComponent({ copyConclusions }) {
    // Estado para controlar la imagen actual
    const [activeImage, setActiveImage] = useState(null);

    // Función para verificar y actualizar el estado de la imagen
    function checkDivsGeneralizada(copyConclusions) {
        // Encuentra la regla que coincide con las conclusiones
        const matchingRule = rules.find(rule =>
            copyConclusions.includes('MEDIANO IZQUIERDO, GENERALIZADA A NIVEL DE')
        );

        // Si encuentra una coincidencia, actualiza la imagen activa
        if (matchingRule) {
            setActiveImage(matchingRule.image);
        } else {
            setActiveImage(null); // Si no hay coincidencia, oculta la imagen
        }
    }
}
