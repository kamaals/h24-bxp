/* istanbul ignore file @preserve */
import { UserType } from "@/lib/types/user";

export interface IReduxAppState {
  currentUser: UserType | null;
}
