import Image from "./UI/Image";
import Button from "./UI/Button";
import type { IProduct } from "./interfaces";
import { txtSlicer } from "./Utilis/functions";
import CircleColor from "./CircleColor";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModel: () => void;
}

const ProductCard = ({ product, setProductToEdit, openEditModel }: IProps) => {
  const OnEdit = () => {
    setProductToEdit(product);
    openEditModel();
  };
  const { title, description, imageURL, price, colors, category } = product;
  const renderColors = colors.map((color) => {
    return <CircleColor key={color} color={color} />;
  });
  return (
    <div className="text-lg max-w-sm rounded-md p-2 flex flex-col mx-auto max-h-400 md:mx-0 ">
      <Image
        imageURL={imageURL}
        alt={title}
        className="rounded-md mb-3  md:h-[220px]  "
      />
      <h3>{title}</h3>
      <p>{txtSlicer(description, 100)}</p>
      <div className="flex items-center flex-wrap space-x-1">
        {!colors.length ? (
          <p className="min-h-[20px]">Not available colors!</p>
        ) : (
          renderColors
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-blue-950">${price}</span>
        <Image
          imageURL={category.imageURL}
          alt={category.name}
          className="w-15 h-15 rounded-full object-cover"
        />
      </div>

      <div className="flex justify-between space-x-2 my-3">
        <Button className="bg-indigo-600" width="w-full" onClick={OnEdit}>
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
