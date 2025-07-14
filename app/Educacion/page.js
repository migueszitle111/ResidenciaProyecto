'use client';
import { useSession } from 'next-auth/react';

import FlipBookGallery from '../components/FlipBookGallery';  // ⬅️  único import nuevo
import Overhead        from '../components/Overhead';
import OverheadMenu    from '../components/OverheadMenu';
import SubMenu         from '../components/Submenu';
import Footer          from '../components/Footer';

export default function Educacion() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.roles === 'admin';

  return (
    <div className="Conteiner">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <SubMenu />

      <section className="items-center px-5 xl:px-24 py-5">
        <h1 className="BannerTitlepage">Educación</h1>

        {/* galería de flipbooks */}
        <FlipBookGallery />
      </section>

      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
