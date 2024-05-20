import IUser from "./User";

export default interface IClient {
  id: number;
  name: string;
  users: IUser[];
}
