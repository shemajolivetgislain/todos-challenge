// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskCard from "../components/cards/TaskCard";
// import { deleteTodo } from "../../app/features/todoSlice";
import { useTasks } from "../hooks/useTasks";

jest.mock("../hooks/useTasks");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock("../pages/Home/child/EditTask", () => ({
  EditTask: ({ closeModal }: { closeModal: () => void }) => (
    <div>
      Edit Task Modal<button onClick={closeModal}>Close</button>
    </div>
  ),
}));

const mockStore = configureStore([]);
const store = mockStore({
  todos: { singleTodo: { id: 1, title: "Sample Task" } },
});

describe("TaskCard Component", () => {
  const mockDeleteTaskMutation = jest.fn();

  beforeEach(() => {
    (useTasks as jest.Mock).mockReturnValue({
      deleteTaskMutation: { mutate: mockDeleteTaskMutation, isPending: false },
    });
  });

  const defaultProps = {
    title: "Sample Task",
    taskNumber: 1,
    detail: "This is a sample task detail.",
    className: "sample-class",
    onClick: jest.fn(),
    image: "sample-image-url",
  };

  const renderComponent = (props = {}) => {
    render(
      <Provider store={store}>
        <TaskCard {...defaultProps} {...props} />
      </Provider>
    );
  };

  it("renders TaskCard with provided props", () => {
    renderComponent();
    expect(screen.getByText("Sample Task")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample task detail.")
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "task image" })).toHaveAttribute(
      "src",
      "sample-image-url"
    );
  });

  it("toggles action menu when dots icon is clicked", () => {
    renderComponent();

    const dotsIcon = screen.getByRole("button", { name: /dots icon/i });
    fireEvent.click(dotsIcon);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("opens edit modal when Edit is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /dots icon/i }));
    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Edit Task Modal")).toBeInTheDocument();
  });

  it("calls delete function and shows success toast on delete", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /dots icon/i }));
    fireEvent.click(screen.getByText("Delete"));

    expect(mockDeleteTaskMutation).toHaveBeenCalledWith(
      store.getState().todos.singleTodo.id,
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    );
  });

  it('displays "Deleting ..." label when delete mutation is pending', () => {
    (useTasks as jest.Mock).mockReturnValue({
      deleteTaskMutation: { mutate: mockDeleteTaskMutation, isPending: true },
    });

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /dots icon/i }));
    expect(screen.getByText("Deleting ...")).toBeInTheDocument();
  });
});
