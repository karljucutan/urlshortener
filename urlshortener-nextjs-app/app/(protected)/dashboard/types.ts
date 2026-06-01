export type LinkActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type CreateLinkActionState = LinkActionState;
export type UpdateLinkActionState = LinkActionState;
export type DeleteLinkActionState = LinkActionState;

export const initialLinkActionState: LinkActionState = {
  status: "idle",
  message: "",
};

export const initialCreateLinkActionState: CreateLinkActionState =
  initialLinkActionState;
export const initialUpdateLinkActionState: UpdateLinkActionState =
  initialLinkActionState;
export const initialDeleteLinkActionState: DeleteLinkActionState =
  initialLinkActionState;
