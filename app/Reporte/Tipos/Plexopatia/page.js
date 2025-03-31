'use client'
import React from 'react';
import { useState } from 'react';
import { ReportContextProvider,DropProvider } from '@/src/context';
import FooterComponents from '../../../components/FooterComponents';
import HeadComponents from '../../../components/HeadComponents';
import ReportFace from './ReportFace';
import MenuReportes from '../../../components/ReportTemplate/MenuReportes';
import './Style.css';

const Page = () => {
    // Estado global para el texto
    const [topLeftText, setTopLeftText] = useState('');
  return (
    <>
      <div className='dont-print'>
        <HeadComponents />
      </div>
      <div className='dont-print'>
      <MenuReportes
          topLeftText={topLeftText}
          setTopLeftText={setTopLeftText}
        />
      </div>   
      {/* ReportFace enrollado en el contexto */}
      <DropProvider>
      <ReportContextProvider>
        <ReportFace />
      </ReportContextProvider>
      </DropProvider>
      <div className='dont-print'>
        <FooterComponents />
      </div>
    </>
  );
};


export default Page;