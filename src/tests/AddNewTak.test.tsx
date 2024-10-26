import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { toast } from "react-toastify";
import AddNewTask from "../pages/Home/child/AddNewTask";
import "@testing-library/jest-dom";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../hooks/useTasks", () => ({
  useTasks: () => ({
    createTaskMutation: {
      mutate: jest.fn((_, { onSuccess }) =>
        onSuccess({ id: 1, userId: 8, todo: "New Task", completed: false })
      ),
      isPending: false,
    },
  }),
}));

const mockStore = configureStore([]);

describe("AddNewTask Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      todos: [],
    });
    jest.clearAllMocks();
  });

  test("should add a new task successfully", async () => {
    const mockCloseModal = jest.fn(); // Mock the close modal function

    render(
      <Provider store={store}>
        <AddNewTask closeModal={mockCloseModal} />
      </Provider>
    );

    // Simulate entering a task
    fireEvent.change(screen.getByPlaceholderText("AddTaskPlaceholder"), {
      target: { value: "New Task" },
    });

    // Simulate submitting the form
    fireEvent.click(screen.getByRole("button", { name: "Add Task" }));

    // Wait for success toast to appear and assert it's called correctly
    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith(
        "Todo New Task added successfully",
        expect.any(Object)
      )
    );

    // Ensure the modal closes after adding a task
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("should show error when todo is not provided", async () => {
    store = mockStore({
      todos: [],
    });

    render(
      <Provider store={store}>
        <AddNewTask closeModal={jest.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(screen.getByText("To dos is required")).toBeInTheDocument();
    });
  });
});
