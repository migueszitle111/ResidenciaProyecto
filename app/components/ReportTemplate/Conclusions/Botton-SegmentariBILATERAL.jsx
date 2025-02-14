import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function NerviusButtonSegmenBILATERAL({ title, value, displayText }) {
  const { updateConclusions, conclusions } = useContext(ReportContext);

  // Mapeo de valores opuestos
  const opposites = {
    car1: 'cari1', car2: 'cari2', car3: 'cari3', car4: 'cari4',
    car5: 'cari5', car6: 'cari6', car7: 'cari7', car8: 'cari8',
    car9: 'cari9', car10: 'cari10', car11: 'cari11', car12: 'cari12',
    car13: 'cari13', car14: 'cari14', car15: 'cari15', car16: 'cari16',
    car17: 'cari17', car18: 'cari18', car19: 'cari19', car20: 'cari20',
    car21: 'cari21', car22: 'cari22', car23: 'cari23', car24: 'cari24',
    car25: 'cari25', car26: 'cari26', car27: 'cari27', car28: 'cari28',
    car29: 'cari29', car30: 'cari30', car31: 'cari31', car32: 'cari32',
    car33: 'cari33', car34: 'cari34', car35: 'cari35', car36: 'cari36',
    car37: 'cari37', car38: 'cari38', car39: 'cari39', car40: 'cari40',
    car41: 'cari41', car42: 'cari42', car43: 'cari43', car44: 'cari44',
    car45: 'cari45', car46: 'cari46', car47: 'cari47', car48: 'cari48',
    car49: 'cari49', car50: 'cari50', car51: 'cari51', car52: 'cari52',
    car53: 'cari53', car54: 'cari54', car55: 'cari55', car56: 'cari56',
    car57: 'cari57', car58: 'cari58', car59: 'cari59', car60: 'cari60',
    car61: 'cari61', car62: 'cari62', car63: 'cari63', car64: 'cari64',
    car65: 'cari65', car66: 'cari66', car67: 'cari67', car68: 'cari68',
    car69: 'cari69', car70: 'cari70', car71: 'cari71', car72: 'cari72',
    car73: 'cari73', car74: 'cari74', car75: 'cari75', car76: 'cari76',
    car77: 'cari77', car78: 'cari78', car79: 'cari79', car80: 'cari80',

  };

  const isSelected = conclusions.some(cl => cl.value === value);
  const oppositeValue = opposites[value];

  function handleClick() {
    updateConclusions({ title, value });
    if (oppositeValue) {
      updateConclusions({ title: ``, value: oppositeValue });
    }
  }

  const classnames = `cursor-pointer w-[3.5px] h-[18px] text-xs flex items-center justify-center text-white transition-colors duration-300 ease-in 
    ${isSelected ? 'bg-[#c44900]' : 'bg-transparent'} rounded-[50px] z-50 relative`;

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}
