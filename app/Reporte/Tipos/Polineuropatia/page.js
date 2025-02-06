'use client'
import { ReportContextProvider } from '@/src/context';
import FooterComponents from '../../../components/FooterComponents';
import HeadComponents from '../../../components/HeadComponents';
import MenuReportes from '../../../components/ReportTemplate/MenuReportes';
import ReportFace from './ReportFace';
import './Style.css';

const Page = () => {
  return (
    <>
      <div className='dont-print'>
        <HeadComponents />
      </div>
      <div className='dont-print'>
      <MenuReportes />
      </div>   
      {/* ReportFace enrollado en el contexto */}
      <ReportContextProvider>
        <ReportFace />
      </ReportContextProvider>
      <div className='dont-print'>
        <FooterComponents />
      </div>
    </>
  );
};


export default Page;