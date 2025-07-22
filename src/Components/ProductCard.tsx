import Image from "./UI/Image";
import Button from "./UI/Button";
import type { IProduct } from "./interfaces";
import { txtSlicer, numberWithCommas } from "./Utilis/functions";
import CircleColor from "./CircleColor";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModel: () => void;
  setProductToEditIdx: (value: number) => void;
  idx: number;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModel,
  idx,
  setProductToEditIdx,
}: IProps) => {
  const OnEdit = () => {
    setProductToEdit(product);
    openEditModel();
    setProductToEditIdx(idx);
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
      <h3 className="font-bold text-xl">{title}</h3>
      <p>{txtSlicer(description, 100)}</p>
      <div className="flex items-center flex-wrap space-x-1">
        {!colors.length ? (
          <p className="min-h-[20px]">Not available colors!</p>
        ) : (
          renderColors
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-blue-900 font-bold">
          ${numberWithCommas(price)}
        </span>
        <div className="flex items-center  ">
          <span className="text-sm p-1 font-medium">{category.name}</span>
          <Image
            imageURL={category.imageURL}
            alt={category.name}
            className="w-15 h-15 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex justify-between space-x-2 my-3">
        <Button className="bg-indigo-600" width="w-full" onClick={OnEdit}>
          Edit
        </Button>
        <Button className="bg-pink-700 " width="w-full">
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
