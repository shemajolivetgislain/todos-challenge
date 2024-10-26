import { LOCAL_API_URL } from "../../constants";
import HttpRequest from "../../utils/httpRequest";

export const fetchData = async () => {
  return await HttpRequest.get(`${LOCAL_API_URL}/todos`);
};

export const createTask = async (data: any) => {
  return await HttpRequest.post(`${LOCAL_API_URL}/todos/add`, data);
};

export const updateTask = async ({ id, data }: { id: number; data: any }) => {
  return await HttpRequest.put(`${LOCAL_API_URL}/todos/${id}`, data);
};

export const deleteTask = async (id: any) => {
  return await HttpRequest.delete(`${LOCAL_API_URL}/todos/${id}`);
};
