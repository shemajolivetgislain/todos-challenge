import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface TodoLink {
  title: string;
  path: string;
  size: number;
}

interface TodosPathLink {
  links: TodoLink[];
}

const TodosLink = (): TodosPathLink => {
  const {
    allTodosSize = 0,
    incompleteTodosSize = 0,
    completeTodosSize = 0,
  } = useSelector((state: any) => state.todos || {});

  const { t } = useTranslation();

  const totalTodos = allTodosSize;
  const incompleteTodos = incompleteTodosSize;
  const completeTodos = completeTodosSize;

  const todosPathLink: TodosPathLink = {
    links: [
      {
        title: t("AllTasks"),
        path: "all",
        size: totalTodos,
      },
      {
        title: t("ToDoTasks"),
        path: "todo",
        size: incompleteTodos,
      },
      {
        title: t("CompletedTasks"),
        path: "completed",
        size: completeTodos,
      },
    ],
  };

  return todosPathLink;
};

export default TodosLink;
