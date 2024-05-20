export default interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: null;
  groups: IGroups[];
  is_active: boolean;
}
interface IGroups {
  id: number;
  name: string;
}
