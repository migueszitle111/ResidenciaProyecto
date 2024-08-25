import { useState } from 'react';

function MenuReportes() {
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setSelectedTab(null);
    }
  };

  return (
    <div className="bg-[#1c1c1c] md:p-2 flex flex-col m-5 rounded-tr-lg rounded-bl-lg">
      <button onClick={() => handleMenuClick(null)} className="text-sm font-semibold text-white mb-2 cursor-pointer text-left inline-block">
        Menu
      </button>

      {isMenuOpen && selectedTab === null && (
        <div className="flex gap-4">
          <a onClick={() => handleTabClick('Sistema Nervioso')} className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Sistema Nervioso
          </a>
          <a onClick={() => handleTabClick('Vias Neurologicas')} className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Vias Neurologicas
          </a>
        </div>
      )}

      {selectedTab === 'Sistema Nervioso' && (
        <div className="flex flex-wrap gap-4">
          <a onClick={() => handleTabClick(null)} className="text-sm font-semibold text-white mb-3 cursor-pointer underline">
            Reportes anatomicos: 
          </a>
          <a href="./Dermatomas" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Dermatomas
          </a>
          <a href="./Miopatia" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Miopatia
          </a>
          <a href="./Neuronopatia" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Neuronopatia
          </a>
          <a href="./Neuropatia" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Neuropatia
          </a>
          <a href="./Plexopatia" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Plexopatia
          </a>
          <a href="./Polineuropatia" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Polineuropatia
          </a>
          <a href="./Radiculopatia" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Radiculopatia
          </a>
          <a href="./Radiculopatia_Posteior" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Radiculopatia Posteior
          </a>
          <a href="./Union_Nueromuscular" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Union Nueromuscular
          </a>
        </div>
      )}

      {selectedTab === 'Vias Neurologicas' && (
        <div className="flex flex-wrap gap-4">
          <a onClick={() => handleTabClick(null)} className="text-sm font-semibold text-white mb-3 cursor-pointer underline">
            Vias Neurologicas
          </a>
          <a href="./Auditivo" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Auditivo
          </a>
          <a href="./Motores" className="text-sm font-semibold text-white mb-3 cursor-pointer">
            Motores
          </a>
          <a href="./Somatossensorial_Trigemino"  className="text-sm font-semibold text-white mb-3 cursor-pointer">
              Somatossensorial Trigemino
          </a>
          <a href="./Trigemino_Facial"  className="text-sm font-semibold text-white mb-3 cursor-pointer">
              Trigemino Facial
          </a>
          <a href="./Visual"  className="text-sm font-semibold text-white mb-3 cursor-pointer">
              Visual
          </a>
        </div>
      )}
    </div>
  );
}

export default MenuReportes;