'use client'
import React from 'react';
import './Style.css';
import FooterComponents from '../../../components/FooterComponents';
import HeadComponents from '../../../components/HeadComponents';
import ReportFace from './ReportFace';

const Page = () => {
  return (
    <>
      <div className='dont-print'>
        <HeadComponents />
      </div>
      <ReportFace />
      <div className='dont-print'>
        <FooterComponents />
      </div>
    </>
  );
};

export default Page;
