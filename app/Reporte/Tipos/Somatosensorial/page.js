'use client'
import { ReportContextProviderR,CheckboxProvider,ButtonContextProvider  } from '@/src/context';
import FooterComponents from '../../../components/FooterComponents';
import HeadComponents from '../../../components/HeadComponents';
import ReportFace from './ReportFace';
import './Style.css';

const Page = () => {

  return (
    <>
      <div className='dont-print'>
        <HeadComponents />
      </div>
      {/* ReportFace enrollado en el contexto */}
      <ReportContextProviderR>
     <ButtonContextProvider >
      < CheckboxProvider>
        <ReportFace />
      </ CheckboxProvider>
      </ButtonContextProvider>
      </ReportContextProviderR>
      <div className='dont-print'>
        <FooterComponents />
      </div>
    </>
  );
};


export default Page;