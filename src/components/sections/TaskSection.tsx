import { useDispatch } from "react-redux";
import { setSingleTodo } from "../../app/features/todoSlice";
import TaskCard from "../cards/TaskCard";
import { useTranslation } from "react-i18next";

import ImageOne from "../../assets/images/1.jpg";
import ImageTwo from "../../assets/images/2.jpg";
import ImageThree from "../../assets/images/3.jpg";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

interface TaskSectionProps {
  data: Todo[];
}

const TaskSection: React.FC<TaskSectionProps> = ({ data }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const images = [ImageOne, ImageTwo, ImageThree];

  const handleClick = (todo: Todo) => {
    dispatch(setSingleTodo(todo));
  };

  return (
    <section className="w-full mb-8">
      <main className="grid grid-cols-4 items-center gap-8 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1">
        {data?.length > 0 ? (
          data?.map((todo, index) => (
            <TaskCard
              title={todo.completed ? t("CompletedTasks") : t("ToDoTasks")}
              taskNumber={index + 1}
              detail={todo.todo}
              className={
                todo.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }
              key={todo.id}
              onClick={() => handleClick(todo)}
              image={images[index % images.length]}
            />
          ))
        ) : (
          <span>
            <p>You have no pending to dos</p>
          </span>
        )}
      </main>
    </section>
  );
};

export default TaskSection;
