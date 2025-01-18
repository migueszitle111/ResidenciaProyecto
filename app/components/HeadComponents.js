import { useSession } from "next-auth/react";
import Overhead from "./Overhead";
import OverheadMenu from "./OverheadMenu";

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
