import Image from "./UI/Image";
import Button from "./UI/Button";
import type { IProduct } from "./interfaces";
import { txtSlicer } from "./Utilis/functions";

interface IProps {
  product: IProduct;
}
const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, price } = product;
  return (
    <div className="text-lg max-w-sm rounded-md p-2 flex flex-col mx-auto max-h-400 md:mx-0 ">
      <Image
        imageURL={imageURL}
        alt={title}
        className="rounded-md mb-3  md:h-[220px]  "
      />
      <h3>{title}</h3>
      <p>{txtSlicer(description, 100)}</p>
      <div className="flex items-center my-4  space-x-2">
        <span className="w-5 h-5 rounded-full bg-red-500 cursor-pointer"></span>
        <span className="w-5 h-5 rounded-full bg-blue-400  cursor-pointer"></span>
        <span className="w-5 h-5 rounded-full bg-green-400 cursor-pointer"></span>
      </div>
      <div className="flex justify-between items-center">
        <span>${price}</span>
        <Image
          imageURL={imageURL}
          alt={title}
          className="w-15 h-15 rounded-full object-cover"
        />
      </div>
      <div className="flex justify-between space-x-2 my-3">
        <Button className="bg-indigo-600" width="w-full">
          Edit
        </Button>
        <Button className="bg-red-600 " width="w-full">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
