declare module "redux-mock-store" {
  import { Store } from "redux";

  export interface MockStore<S = any, A = any> extends Store<S, A> {
    // Add any additional methods or properties you may need
  }

  export default function configureStore<S = any, A = any>(
    middlewares?: any[]
  ): (initialState?: S) => MockStore<S, A>;
}
