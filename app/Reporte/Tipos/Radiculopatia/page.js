'use client'
import { ReportContextProvider } from '@/src/context';
import FooterComponents from '../../../components/FooterComponents';
import HeadComponents from '../../../components/HeadComponents';
import ReportFace from './ReportFace';
import './Style.css';
import { CheckboxProvider } from './MenuBotones'; // Cambiado a CheckboxProvider

const Page = () => {

  return (
    <>
      <div className='dont-print'>
        <HeadComponents />
      </div>
      {/* ReportFace enrollado en el contexto */}
      < CheckboxProvider>
      <ReportContextProvider>
        <ReportFace />
      </ReportContextProvider>
      </ CheckboxProvider>
      <div className='dont-print'>
        <FooterComponents />
      </div>
    </>
  );
};


export default Page;