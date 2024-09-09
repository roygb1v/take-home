interface FormState {
  isLoading: boolean;
  error: string | null;
  isRegistered: boolean;
}

type FormAction =
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "FAILURE"; payload: string }
  | { type: "RESET" };

export const initialState: FormState = {
  isLoading: false,
  error: null,
  isRegistered: false,
};

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SUBMIT":
      return { ...state, isLoading: true, error: null };
    case "SUCCESS":
      return { ...state, isLoading: false, isRegistered: true, error: null };
    case "FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
