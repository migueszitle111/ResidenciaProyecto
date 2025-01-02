'use client'
import React from 'react';
import './Style.css';
import { ReportContextProvider } from '@/src/context';
import FooterComponents from '../../../components/FooterComponents';
import HeadComponents from '../../../components/HeadComponents';
import ReportFace from './ReportFace';
import MenuReportes from '../../../components/ReportTemplate/MenuReportes';

const Page = () => {
  return (
    <>
      <div className='dont-print'>
        <HeadComponents />
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