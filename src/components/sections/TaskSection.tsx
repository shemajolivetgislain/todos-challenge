import { useDispatch } from "react-redux";
import { setSingleTodo } from "../../app/features/todoSlice";
import TaskCard from "../cards/TaskCard";
import { useTranslation } from "react-i18next";

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

  const handleClick = (todo: Todo) => {
    dispatch(setSingleTodo(todo));
  };

  return (
    <section className="w-full mb-8">
      <main className="grid grid-cols-4 items-center gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {data?.length > 0 ? (
          data.map((todo, index) => (
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
