import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDeleteTodoMutation, useLazyGetAllToDosQuery } from "../../app/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AiOutlineMessage } from "react-icons/ai";
import PicTwo from "../../assets/pics/picTwo.jpg";
import PicThree from "../../assets/pics/picThree.jpg";
import PicFour from "../../assets/pics/picFour.jpg";
import { EditTask } from "../../pages/Home/child/EditTask";

interface TaskCardProps {
  title: string;
  taskNumber: number;
  detail: string;
  className: string;
  onClick: () => void;
  image: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  taskNumber,
  detail,
  className,
  onClick,
  image,
}) => {
  const [openAction, setOpenAction] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { singleTodo } = useSelector((state: any) => state.todos);
  const { t } = useTranslation();

  const toggleAction = () => setOpenAction(!openAction);

  const [getAllToDos] = useLazyGetAllToDosQuery();

  const [
    deleteTodo,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteTodoMutation();

  const handleDelete = () => {
    if (singleTodo) {
      deleteTodo({ id: singleTodo.id });
    }
  };

  const handleEdit = () => {
    setOpenEditModal(true);
    setOpenAction(false);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Todo deleted successfully", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      getAllToDos(undefined);
      setOpenAction(false);
    } else if (isDeleteError) {
      toast.error("Error deleting todo", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      setOpenAction(false);
    }
  }, [isDeleteSuccess, isDeleteError, deleteError, getAllToDos]);

  return (
    <>
      <div className="flex flex-col gap-3 rounded-md shadow-sm shadow-sky-100 border py-5 px-6 h-[31rem] bg-whiteTheme-backgroundColor dark:bg-darkTheme-primaryColor dark:border-darkTheme-borderColor dark:shadow-darkTheme-secondColor">
        <img
          src={image}
          alt="task image"
          className="w-full h-52 object-cover rounded-md"
        />
        <header className="flex items-center justify-between w-full">
          <h1 className={`${className} p-2 font-medium text-sm rounded-md capitalize`}>
            {title}
          </h1>
          <div className="relative">
            <HiOutlineDotsVertical
              size={20}
              className=" dark:text-darkTheme-textColor cursor-pointer"
              onClick={() => {
                toggleAction();
                onClick();
              }}
            />
            {openAction && (
              <span className="absolute top-8 right-0 flex flex-col gap-2 rounded-md shadow-sm shadow-sky-200 py-4 px-6 bg-whiteTheme-backgroundColor dark:bg-darkTheme-secondColor dark:border-darkTheme-borderColor dark:shadow-darkTheme-secondColor z-10">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={handleEdit}
                >
                  <BiMessageSquareEdit
                    size={20}
                    className="text-whiteTheme-primaryColor dark:text-purple-100"
                  />
                  <p className="text-whiteTheme-primaryColor dark:text-purple-100">
                    {t("Edit")}
                  </p>
                </div>
                <hr />
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={handleDelete}
                >
                  <MdOutlineDeleteSweep
                    size={20}
                    className="text-red-700 dark:text-red-200"
                  />
                  <p className="text-red-700 dark:text-red-200">
                    {isDeleteLoading ? "Deleting ..." : t("Delete")}
                  </p>
                </div>
              </span>
            )}
          </div>
        </header>
        <main className="flex flex-col gap-3">
          <h1 className="text-whiteTheme-primaryColor font-semibold text-xl">
            {t("taskCardTitle")} <span>{taskNumber}</span>
          </h1>
          <p className="text-whiteTheme-accentColor font-normal text-sm dark:text-darkTheme-textColor">
            {detail}
          </p>
          <hr />
          <div className="flex items-center justify-between pb-7 ">
            <span className="flex -space-x-1.5 rtl:space-x-reverse">
              <img
                className="w-7 h-7 object-cover border-2 border-white rounded-full dark:border-gray-800"
                src={PicTwo}
                alt="pic1"
              ></img>

              <img
                className="w-7 h-7 object-cover border-2 border-white rounded-full dark:border-gray-800"
                src={PicThree}
                alt="pic3"
              ></img>
              <img
                className="w-7 h-7 object-cover border-2 border-white rounded-full dark:border-gray-800"
                src={PicFour}
                alt="pic4"
              ></img>
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <AiOutlineMessage /> <p>8</p>
            </span>
          </div>
        </main>
      </div>
      {openEditModal && <EditTask closeModal={() => setOpenEditModal(false)} />}
    </>
  );
};

export default TaskCard;
