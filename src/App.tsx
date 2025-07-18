import ProductCard from "./Components/ProductCard";
import { productList, formInputsList } from "./Data/index";
import Model from "./Components/UI/Model";
import { useState } from "react";
import Button from "./Components/UI/Button";
import Input from "./Components/UI/Input";
export const App = () => {
  /*_____________ State ____________*/
  const [isOpen, setIsOpen] = useState(false);
  /*_____________ Handler ____________*/

  function openModel() {
    setIsOpen(true);
  }

  function closeModel() {
    setIsOpen(false);
  }
  /*_____________ Render ____________*/
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderInputTypes = formInputsList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col text-xl text-gray-800">
        <label className="font-medium text-md m-1" htmlFor={input.id}>
          {input.label}
        </label>
        <Input type={input.type} id={input.id} name={input.name} />
      </div>
    );
  });

  return (
    <>
      <div className="@container mx-auto">
        <Button className="bg-indigo-600 w-full text-xl" onClick={openModel}>
          Add
        </Button>
        <div
          className=" p-3 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
          md:gap-4 "
        >
          {renderProductList}
        </div>
        <Model isOpen={isOpen} isClosed={closeModel} title="ADD A NEW  PRODUCT">
          <form className="space-y-1">
            {renderInputTypes}
            <div className="flex gap-2">
              <Button
                className="bg-indigo-600 hover:bg-indigo-500/30"
                width="w-full"
              >
                Submit
              </Button>
              <Button
                className="bg-gray-400  hover:bg-gray-400/30"
                width="w-full"
                onClick={closeModel}
              >
                cancel
              </Button>
            </div>
          </form>
        </Model>
      </div>
    </>
  );
};
