import { useSession } from "next-auth/react";
import Overhead from "./Overhead";
import OverheadMenu from "./OverheadMenu";

const HeadComponents = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white" style={{ height: '0.2px' }} />
    </div>
  );
};

export default HeadComponents;
