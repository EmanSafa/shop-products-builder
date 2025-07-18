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
  name: "title" | "description" | "imageURL" | "price";
  type: string;
  label: string;
}
