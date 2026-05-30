import React from "react";
import Image from "next/image";

export default function BannerPublicitarios() {
  return (
    <div>
      <div className="Conteiner mx-auto">
     
      <div className="w-full lg:w-2/3 flex flex-col mx-auto m-2 rounded-tr-lg rounded-bl-lg p-5">
        <a href="mailto:lab@medxproapp.com" className="cursor-pointer">
          <Image
            src="/assets/LandingPage/Page/LP-10.png"
            alt="Banner top"
            width={1200}
            height={400}
            className="w-full h-auto object-cover"
          />
        </a>
      </div>
      </div>
    </div>
  );
}
