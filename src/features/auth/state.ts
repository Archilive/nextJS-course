export type AuthActionState = {
  message: string;
  status: "idle" | "error";
};

export const initialAuthActionState: AuthActionState = {
  message: "",
  status: "idle",
};
