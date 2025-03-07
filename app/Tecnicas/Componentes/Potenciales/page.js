'use client'
import { ReportContextProvider } from '@/src/context';
import FooterComponents from '../../../components/FooterComponents';
import HeadComponents from '../../../components/HeadComponents';
import MenuBotonesPt from './MenuBotones';

const Page = () => {
  return (
    <>
      <div className='dont-print'>
        <HeadComponents />
      </div>
      <div className='dont-print'>
      {/* <MenuReportes /> */}
      </div>   
      {/* ReportFace enrollado en el contexto */}
      <ReportContextProvider>
        <MenuBotonesPt />
      </ReportContextProvider>
      <div className='dont-print'>
        <FooterComponents />
      </div>
    </>
  );
};


export default Page;