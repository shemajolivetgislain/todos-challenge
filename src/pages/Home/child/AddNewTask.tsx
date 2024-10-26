import React from "react";
import Modal from "../../../components/Modal";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../components/inputs";
import Button from "../../../components/buttons";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { addTodo } from "../../../app/features/todoSlice";
import { useDispatch } from "react-redux";
import { useTasks } from "../../../hooks/useTasks";

interface AddTaskProps {
  closeModal: () => void;
}

interface FormData {
  todo: string;
}

const AddNewTask: React.FC<AddTaskProps> = ({ closeModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      todo: "",
    },
  });
  const { t } = useTranslation();
  const { createTaskMutation } = useTasks();
  const dispatch = useDispatch();

  const onSubmitTodo: SubmitHandler<FormData> = (data) => {
    createTaskMutation.mutate(
      { userId: 8, todo: data.todo, completed: false },
      {
        onSuccess: (newTodo) => {
          dispatch(addTodo(newTodo));
          toast.success(`Todo ${newTodo.todo} added successfully`, {
            autoClose: 1000,
            hideProgressBar: true,
            position: "top-center",
          });
          closeModal();
        },
        onError: () => {
          toast.error("Something went wrong", {
            autoClose: 1000,
            hideProgressBar: true,
            position: "top-center",
          });
        },
      }
    );
  };

  return (
    <Modal title={t("AddNewtaskTitle")} onClose={closeModal}>
      <form
        onSubmit={handleSubmit(onSubmitTodo)}
        className="flex flex-col gap-5 mt-6"
      >
        <Controller
          name="todo"
          control={control}
          rules={{ required: "To dos is required" }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                type="text"
                placeholder={t("AddTaskPlaceholder")}
                id="todo-input"
              />
              {errors.todo && (
                <p className="text-red-600 text-[13px]">
                  {errors.todo.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            className="!py-1.5 !text-lg max-md:!text-sm"
            label={
              createTaskMutation.isPending ? "Adding ..." : t("AddTaskButton")
            }
            disabled={createTaskMutation.isPending}
          />
          <Button
            className="!bg-white !border-2 !border-red-700 !text-red-700 !py-1 !text-lg max-md:!text-sm hover:!bg-red-700 hover:!text-whiteTheme-secondColor dark:!bg-red-900 dark:!text-darkTheme-textColor"
            onClick={closeModal}
            label={<span className="text-red-700">{t("Cancel")}</span>}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddNewTask;
