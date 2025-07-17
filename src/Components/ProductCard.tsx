import skeakersImg from "./../assets/2.jpg";
import Image from "./Image";
const ProductCard = () => {
  return (
    <div className="text-lg">
      <Image
        imageURL={skeakersImg}
        alt={"Product Name"}
        className="rounded-md mb-3"
      />
      <h3>Nike Sports Sneakers</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam asperiores
        placeat adipisci totam esse dolorem, impedit eaque, deleniti reiciendis,
        qui cumque amet voluptas saepe dolor aspernatur aliquid deserunt est
        necessitatibus.
      </p>
      <div className="flex items-center my-4 m space-x-2">
        <span className="w-5 h-5 rounded-full bg-amber-300 cursor-pointer"></span>
        <span className="w-5 h-5 rounded-full bg-blue-400  cursor-pointer"></span>
        <span className="w-5 h-5 rounded-full bg-green-400 cursor-pointer"></span>
      </div>
      <div className="flex justify-between items-center">
        <span>$1000</span>
        <Image
          imageURL={skeakersImg}
          alt={"Product Name"}
          className="w-15 h-15 rounded-full object-cover"
        />
      </div>
      <div className="flex justify-between space-x-2 my-3">
        <button className="bg-indigo-600 text-white flex-1 h-15 rounded-md  ">
          Edit
        </button>
        <button className="bg-red-600    text-white  flex-1 h-15 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
