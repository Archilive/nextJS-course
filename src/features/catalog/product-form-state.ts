export type ProductFormState = {
  message: string;
  status: "idle" | "success" | "error";
};

export const initialProductFormState: ProductFormState = {
  message: "",
  status: "idle",
};
