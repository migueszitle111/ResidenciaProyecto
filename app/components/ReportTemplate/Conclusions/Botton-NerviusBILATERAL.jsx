import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function NerviusButtonBILATERAL({ title, value, displayText }) {
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
    car37: 'cari37', car38: 'cari38', car39: 'cari39', car40: 'cari40'
  };

  const isSelected = conclusions.some(cl => cl.value === value);
  const oppositeValue = opposites[value];

  function handleClick() {
    updateConclusions({ title, value });
    if (oppositeValue) {
      updateConclusions({ title: ` `, value: oppositeValue });
    }
  }

  const classnames = `cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in 
    ${isSelected ? 'bg-[#c44900]' : 'bg-transparent'} rounded-[50px] z-50 relative`;

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}







