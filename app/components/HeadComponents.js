import React from "react";
import Overhead from "./Overhead";
import OverheadMenu from "./OverheadMenu";
import { useSession } from "next-auth/react";

const HeadComponents = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
    </div>
  );
};

export default HeadComponents;
