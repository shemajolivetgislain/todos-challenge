import { useEffect, useState } from "react";
import TodosLink from "../../constants/todosPath";
import Button from "../buttons";
import { IoMdAdd } from "react-icons/io";
// import AddNewTaskModal from "../../pages/Home/AddNewTaskModal";
import TaskSection from "./TaskSection";
import { useLazyGetAllToDosQuery } from "../../app/api";
import {
  setTodos,
  setAllTodos,
  setCompleteTodos,
  setImcompleteTodos,
} from "../../app/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AddNewTask from "../../pages/Home/child/AddNewTask";
import { CgArrowsExchangeAlt } from "react-icons/cg";

interface Tab {
  path: string;
  title: string;
  size: number;
}

const TodosFilters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Path links
  const todosPathLink = TodosLink();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { todos } = useSelector((state: any) => state.todos);

  const [
    getAllToDos,
    { isLoading: isTodosLoading, isSuccess: isTodosSuccess, data: todosData },
  ] = useLazyGetAllToDosQuery();

  useEffect(() => {
    getAllToDos(undefined);
  }, [getAllToDos]);

  // Saving data into global state
  useEffect(() => {
    if (isTodosSuccess && todosData) {
      dispatch(setTodos(todosData.todos));
      dispatch(setAllTodos(todosData.todos.length));
      dispatch(
        setCompleteTodos(
          todosData.todos.filter((todo: any) => todo.completed === true).length
        )
      );
      dispatch(
        setImcompleteTodos(
          todosData.todos.filter((todo: any) => todo.completed === false).length
        )
      );
    }
  }, [isTodosSuccess, todosData, dispatch]);

  // Handling tab changes
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.path);
    if (todosData) {
      if (tab.path === "all") {
        dispatch(setTodos(todosData.todos));
        dispatch(setAllTodos(todosData.todos.length));
      } else if (tab.path === "completed") {
        const filtered = todosData.todos.filter(
          (todo: any) => todo.completed === true
        );
        dispatch(setTodos(filtered));
      } else if (tab.path === "todo") {
        const filtered = todosData.todos.filter(
          (todo: any) => todo.completed === false
        );
        dispatch(setTodos(filtered));
      }
    }
  };

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="w-full h-20 max-md:h-full rounded-md bg-whiteTheme-backgroundColor shadow-sm shadow-purple-100 px-7 max-md:pb-5 max-sm:px-3 flex max-md:gap-5 justify-between items-center max-md:flex-col dark:bg-darkTheme-primaryColor dark:shadow-darkTheme-borderColor ">
        <ul className=" flex items-center gap-9 pt-3 max-md:gap-4 max-sm:gap-2">
          {todosPathLink.links.map((tab: Tab, index: number) => (
            <li
              key={index}
              className={` text-sm ${
                tab.path === activeTab &&
                "border-b-[5px] border-whiteTheme-primaryColor text-whiteTheme-primaryColor font-semibold "
              } py-5 cursor-pointer text-whiteTheme-accentColor max-sm:text-sm`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.title}{" "}
              <span className="ml-1 p-2 max-md:p-1 max-sm:text-sm bg-whiteTheme-lightAccent rounded-md dark:bg-darkTheme-secondColor dark:text-darkTheme-textColor ">
                {tab.size}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {" "}
          <Button
            className={
              "!border-[1px] !border-whiteTheme-accentColor !bg-white !text-whiteTheme-accentColor hover:!bg-whiteTheme-primaryColor hover:!text-whiteTheme-secondColor dark:!bg-darkTheme-secondColor dark:!text-darkTheme-textColor dark:hover:!bg-darkTheme-primaryColor dark:hover:!text-darkTheme-accentColor max-md:!px-2 max-sm:hidden"
            }
            label={
              <span className="flex gap-2 items-center">
                <CgArrowsExchangeAlt size={25} />
                <p className="max-sm:hidden"> {t("filterAndSort")}</p>
              </span>
            }
          />
          <Button
            className={
              "!border-[1px] !border-whiteTheme-accentColor !bg-white !text-whiteTheme-accentColor hover:!bg-whiteTheme-primaryColor hover:!text-whiteTheme-secondColor dark:!bg-darkTheme-secondColor dark:!text-darkTheme-textColor dark:hover:!bg-darkTheme-primaryColor dark:hover:!text-darkTheme-accentColor max-md:!px-2"
            }
            label={
              <span className="flex gap-2 items-center">
                <IoMdAdd />
                <p className="max-SM:hidden"> {t("taskAddTitle")}</p>
              </span>
            }
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      {isTodosLoading ? (
        <span>
          <p>Loading .....</p>
        </span>
      ) : isTodosSuccess ? (
        <TaskSection data={todos} />
      ) : (
        <span>
          <p>Failed to load todos</p>
        </span>
      )}
      {showModal && <AddNewTask closeModal={() => setShowModal(false)} />}
    </section>
  );
};

export default TodosFilters;
