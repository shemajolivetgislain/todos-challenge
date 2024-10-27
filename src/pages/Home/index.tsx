import MainHolder from "../../components/MianHolder";
import { HomeHeader } from "./child/HomeHeader";

const HomePage: React.FC = () => {
  return (
    <MainHolder className="flex flex-col gap-5">
      <HomeHeader />
    </MainHolder>
  );
};

export default HomePage;
