'use client'
import { ReportContextProvider,CheckboxProvider,ButtonProvider } from '@/src/context';
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
      <ReportContextProvider>
     <ButtonProvider>
      < CheckboxProvider>
     
        <ReportFace />
      
      </ CheckboxProvider>
      </ButtonProvider>
      </ReportContextProvider>
      <div className='dont-print'>
        <FooterComponents />
      </div>
    </>
  );
};


export default Page;