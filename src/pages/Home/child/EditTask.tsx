import React, { useEffect } from "react";
import Modal from "../../../components/Modal";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../components/inputs";
import Button from "../../../components/buttons";
import { useUpdateTodoMutation } from "../../../app/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// Define the type for the form data
interface FormData {
  todo: string;
}

interface AddTaskProps {
  closeModal: () => void;
}

export const EditTask: React.FC<AddTaskProps> = ({ closeModal }) => {
  const { t } = useTranslation();
  const { singleTodo } = useSelector((state: any) => state.todos);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [
    updateTodo,
    {
      isLoading: isEditToLoading,
      isSuccess: isUpdatingSuccess,
      isError: isEdtingError,
    },
  ] = useUpdateTodoMutation();

  // Define the onEditTodo handler with the appropriate type
  const onEditTodo: SubmitHandler<FormData> = (data) => {
    updateTodo({
      id: singleTodo?.id,
      todo: data.todo,
    });
  };

  // Handle success and error
  useEffect(() => {
    if (isUpdatingSuccess) {
      toast.success("Todo updated successfully", {
        autoClose: 1000,
        hideProgressBar: true,
        position: "top-center",
      });
      closeModal();
    }
    if (isEdtingError) {
      toast.error("Error updating todo");
    }
  }, [isUpdatingSuccess, isEdtingError, closeModal]);

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
        <div className="flex items-center gap-3">
          <Button
            className="!py-1.5 !text-lg max-md:!text-sm "
            type="submit"
            label={isEditToLoading ? "Updating ..." : t("EditTaskButton")}
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
