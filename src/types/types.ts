import Gender from "./enum"

export type SignUp = {
    username: string;
  email: string;
  address: string;
  phone_number: string;
  password: string;
  gender: Gender;
  terms: boolean;
  file: File;
  date: Date;
  year: number;
  expertise: string[];
}