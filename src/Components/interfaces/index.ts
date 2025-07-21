import type { TProductNames } from "../Types";

export interface IProduct {
  id?: string | undefined;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}
export interface IFormInputs {
  id: string;
  name: TProductNames;
  type: string;
  label: string;
}
export interface ICategories {
  id: string;
  name: string;
  imageURL: string;
}
