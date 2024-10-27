import MainHolder from "../../components/MianHolder";
import TodosFilters from "../../components/sections/TodosFilters";
import { HomeHeader } from "./child/HomeHeader";

const HomePage: React.FC = () => {
  return (
    <MainHolder className="flex flex-col gap-5 !h-full">
      <HomeHeader />
      <TodosFilters />
    </MainHolder>
  );
};

export default HomePage;
