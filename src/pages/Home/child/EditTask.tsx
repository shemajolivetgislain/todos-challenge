import React from "react";
import Modal from "../../../components/Modal";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../components/inputs";
import Button from "../../../components/buttons";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useTasks } from "../../../hooks/useTasks";
import Select from "../../../components/inputs/Select";
import { updateTodo } from "../../../app/features/todoSlice";

// Define the type for the form data
interface FormData {
  todo: string;
  completed: string;
}

interface EditTaskProps {
  closeModal: () => void;
}

export const EditTask: React.FC<EditTaskProps> = ({ closeModal }) => {
  const { t } = useTranslation();
  const { singleTodo } = useSelector((state: any) => state.todos);
  const { updateTaskMutation } = useTasks();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onEditTodo: SubmitHandler<FormData> = (data) => {
    updateTaskMutation.mutate(
      {
        id: singleTodo?.id,
        data: { todo: data.todo, completed: data.completed },
      },
      {
        onSuccess: (updatedTodo) => {
          const updatedData = {
            id: singleTodo?.id,
            todo: data.todo,
            completed: updatedTodo.completed,
          };
          dispatch(updateTodo(updatedData));
          toast.success("Todo updated successfully", {
            autoClose: 1000,
            hideProgressBar: true,
            position: "top-center",
          });
          closeModal();
        },
        onError: () => {
          toast.error("Error updating todo", {
            autoClose: 1000,
            hideProgressBar: true,
            position: "top-center",
          });
        },
      }
    );
  };

  return (
    <Modal title={t("EditTask")} onClose={closeModal}>
      <form
        onSubmit={handleSubmit(onEditTodo)}
        className="flex flex-col gap-5 mt-6"
      >
        <Controller
          name="todo"
          control={control}
          defaultValue={singleTodo?.todo}
          rules={{ required: "To dos is required" }}
          render={({ field }) => (
            <>
              <Input {...field} type="text" defaultValue={singleTodo?.todo} />
              {errors.todo && (
                <p className="text-red-600 text-[13px]">
                  {errors.todo.message}
                </p>
              )}
            </>
          )}
        />
        <Controller
          name="completed"
          control={control}
          defaultValue={singleTodo?.completed}
          rules={{ required: "Task status is required" }}
          render={({ field }) => (
            <>
              <Select
                {...field}
                options={[
                  { value: "false", label: "To Do" },
                  { value: "true", label: "Completed" },
                ]}
                placeholder="Select Status"
              />
              {errors.completed && (
                <p className="text-red-600 text-[13px]">
                  {errors.completed.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex items-center gap-3">
          <Button
            className="!py-1.5 !text-lg max-md:!text-sm "
            type="submit"
            label={
              updateTaskMutation.isPending
                ? "Updating ..."
                : t("EditTaskButton")
            }
          />
          <Button
            className="!bg-white !border-2 !border-red-700 !text-red-700 !py-1 !text-lg hover:!bg-red-700 hover:!text-whiteTheme-secondColor dark:!bg-red-900 dark:!text-darkTheme-textColor "
            onClick={closeModal}
            label={<span className="text-red-700 text-sm">{t("Cancel")}</span>}
          />
        </div>
      </form>
    </Modal>
  );
};
