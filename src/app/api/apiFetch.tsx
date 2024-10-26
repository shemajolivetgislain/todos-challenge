// src/utils/httpRequest.ts
import HttpRequest from "../../utils/httpRequest";

export const fetchData = async () => {
  return await HttpRequest.get("https://dummyjson.com/todos");
};

export const createTask = async (data: any) => {
  return await HttpRequest.post("https://dummyjson.com/todos/add", data);
};

export const updateTask = async ({ id, data }: { id: number; data: any }) => {
  return await HttpRequest.put(`https://dummyjson.com/todos/${id}`, data);
};

export const deleteTask = async (id: any) => {
  return await HttpRequest.delete(`https://dummyjson.com/todos/${id}`);
};
