// src/hooks/useTasks.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchData,
  createTask,
  updateTask,
  deleteTask,
} from "../app/api/apiFetch";


export const useTasks = () => {
  const fetchTasks = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchData,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // Optional: Refetch tasks or perform other actions on success
      // fetchTasks.refetch();
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
  });

  return {
    fetchTasks,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};