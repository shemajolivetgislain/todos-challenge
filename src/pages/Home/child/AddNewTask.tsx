import React, { useEffect } from "react";
import Modal from "../../../components/Modal";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../components/inputs";
import Button from "../../../components/buttons";
import { useCreateTodoMutation } from "../../../app/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface AddTaskProps {
  closeModal: () => void;
}

// Define the type for the form data
interface FormData {
  todo: string;
}

const AddNewTask: React.FC<AddTaskProps> = ({ closeModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { t } = useTranslation();

  const [
    createTodo,
    {
      isLoading: isCreatingTodoLoading,
      isSuccess: isCreatingTodoSuccess,
      isError: isCreatingTodoError,
      data: createTodoData,
    },
  ] = useCreateTodoMutation();

  // Define the onSubmit handler with the appropriate type
  const onSubmitTodo: SubmitHandler<FormData> = (data) => {
    console.log(data);
    createTodo({ todo: data.todo, completed: false, userId: 5 });
  };

  // Handle success and error
  useEffect(() => {
    if (isCreatingTodoSuccess) {
      toast.success(`Todo ${createTodoData?.todo} added successfully`, {
        autoClose: 1000,
        hideProgressBar: true,
        position: "top-center",
      });
      closeModal();
    }
    if (isCreatingTodoError) {
      toast.error("Something went wrong", {
        autoClose: 1000,
        hideProgressBar: true,
        position: "top-center",
      });
      closeModal();
    }
  }, [
    closeModal,
    createTodoData?.todo,
    isCreatingTodoError,
    isCreatingTodoSuccess,
  ]);

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
            className="!py-1.5 !text-lg max-md:!text-sm "
            label={isCreatingTodoLoading ? "Adding ..." : t("AddTaskButton")}
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

export default AddNewTask;
