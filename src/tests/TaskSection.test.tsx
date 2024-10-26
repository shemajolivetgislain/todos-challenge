import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setSingleTodo } from "../app/features/todoSlice";
import TaskSection from "../components/sections/TaskSection";

// Mock the setSingleTodo action from the todoSlice
jest.mock("../app/features/todoSlice", () => ({
  setSingleTodo: jest.fn(),
}));

// Mock the useTranslation hook from react-i18next for translation support
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockStore = configureStore([]);

describe("TaskSection Component", () => {
  let store: any;
  let queryClient: QueryClient;
  let data: { id: number; todo: string; completed: boolean }[];

  beforeEach(() => {
    store = mockStore({
      todos: {
        singleTodo: null, // or provide a mock object as necessary
      },
    });
    store.dispatch = jest.fn();

    // Create a new QueryClient instance for each test
    queryClient = new QueryClient();

    data = [
      { id: 1, todo: "Task 1", completed: false },
      { id: 2, todo: "Task 2", completed: true },
      { id: 3, todo: "Task 3", completed: false },
    ];
  });

  it("renders TaskCard components for each todo", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TaskSection data={data} />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getAllByText("ToDoTasks")).toHaveLength(2);
    expect(screen.getAllByText("CompletedTasks")).toHaveLength(1);
  });

  it("dispatches setSingleTodo action with the correct todo on click", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TaskSection data={data} />
        </QueryClientProvider>
      </Provider>
    );

    const taskCards = screen.getAllByRole("button");
    fireEvent.click(taskCards[0]);

    expect(store.dispatch).toHaveBeenCalledWith(setSingleTodo(data[0]));
  });

  it("displays fallback message when there are no todos", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TaskSection data={[]} />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("You have no pending to dos")).toBeInTheDocument();
  });
});
