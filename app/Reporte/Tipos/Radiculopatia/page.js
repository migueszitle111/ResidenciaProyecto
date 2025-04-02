'use client'
import React from 'react';
import { useState } from 'react';
import { ReportContextProviderR,CheckboxProvider,ButtonContextProvider,DropProvider  } from '@/src/context';
import FooterComponents from '../../../components/FooterComponents';
import HeadComponents from '../../../components/HeadComponents';
import MenuReportes from '../../../components/ReportTemplate/MenuReportes';
import ReportFace from './ReportFace';
import './Style.css';

const Page = () => {
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
      <ReportContextProviderR>
     <ButtonContextProvider >
      < CheckboxProvider>
        <ReportFace />
      </ CheckboxProvider>
      </ButtonContextProvider>
      </ReportContextProviderR>
      </DropProvider>
      <div className='dont-print'>
        <FooterComponents />
      </div>
    </>
  );
};


export default Page;