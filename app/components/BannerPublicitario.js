import React from "react";
import Image from "next/image";

export default function BannerPublicitarios() {
  return (
    <div>
      <div className="Conteiner mx-auto">
      <div className="w-full lg:w-2/3 flex flex-col mx-auto m-5 rounded-tr-lg rounded-bl-lg p-5">
        <Image
          src="/assets/LandingPage/Page/LP-16.png"
          alt="Banner top"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full lg:w-2/3 flex flex-col mx-auto m-5 rounded-tr-lg rounded-bl-lg p-5">
        <Image
          src="/assets/LandingPage/Page/LP-10.png"
          alt="Banner top"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
      </div>
    </div>
  );
}
