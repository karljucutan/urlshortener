export type CreateLinkActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialCreateLinkActionState: CreateLinkActionState = {
  status: "idle",
  message: "",
};
