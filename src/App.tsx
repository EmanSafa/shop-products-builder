import ProductCard from "./Components/ProductCard";
import { productList, formInputsList, colors, categories } from "./Data/index";
import Model from "./Components/UI/Model";
import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import Button from "./Components/UI/Button";
import Input from "./Components/UI/Input";
import type { IProduct } from "./Components/interfaces";

import ErrorMsg from "./Components/ErrorMsg";
import CircleColor from "./Components/CircleColor";
import { v4 as uuid } from "uuid";
import SelectMenu from "./Components/UI/SelectMenu";
import type { TProductNames } from "./Components/Types";
import toast, { Toaster } from "react-hot-toast";
import ProductValidation from "./Data/Validation/ProductValidation";

export const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [] as string[],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /*_____________ State ____________*/
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setselectedCategory] = useState(categories[0]);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);

  /*_____________ Handler ____________*/

  const openModel = () => setIsOpen(true);
  const closeModel = () => setIsOpen(false);
  const openEditModel = useCallback(() => setIsOpenEditModel(true), []);
  const closeEditModel = () => setIsOpenEditModel(false);
  const openConfirmModal = useCallback(() => setIsOpenConfirmModal(true), []);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onCancel = () => {
    setProduct(defaultProductObj);
    console.log("cancel");
    closeModel();
  };
  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    );

    closeConfirmModal();
    setProducts(filtered);
    toast(`Product ${product.title} Removed! `, {
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const onSumbitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = ProductValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      ...prev,
      {
        ...product,
        colors: tempColors,
        id: uuid(),
        category: selectedCategory,
      },
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    closeModel();
    toast(`Product ${product.title} Added! `, {
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };
  const onSumbitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = ProductValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrors =
      Object.values(errors).some((value) => value.trim() === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrors) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModel();
    toast(`Product ${product.title} Edited! `, {
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  /*_____________ Render ____________*/
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModel={openEditModel}
      setProductToEditIdx={setProductToEditIdx}
      idx={idx}
      openConfirmModal={openConfirmModal}
    />
  ));
  const renderInputTypes = formInputsList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col text-xl text-gray-800">
        <label className="font-medium text-md m-1" htmlFor={input.id}>
          {input.label}
        </label>
        <Input
          type={input.type}
          id={input.id}
          name={input.name}
          value={product[input.name]}
          onChange={onChangeHandler}
        />
        <ErrorMsg msg={errors[input.name]} />
      </div>
    );
  });
  const renderColors = colors.map((color) => {
    return (
      <CircleColor
        key={color}
        color={color}
        onClick={() => {
          if (tempColors.includes(color)) {
            setTempColors((prev) => prev.filter((item) => item !== color));
            return;
          }
          if (productToEdit.colors.includes(color)) {
            setTempColors((prev) => prev.filter((item) => item !== color));
            return;
          }
          setTempColors((prev) => [...prev, color]);
        }}
      />
    );
  });
  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: TProductNames
  ) => {
    return (
      <div className="flex flex-col text-xl text-gray-800">
        <label className="font-medium text-md m-1" htmlFor={id}>
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMsg msg={errors[name]} />
      </div>
    );
  };

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
        {/* Add Product Modal */}
        <Model isOpen={isOpen} isClosed={closeModel} title="ADD A NEW  PRODUCT">
          <form className="space-y-1" onSubmit={onSumbitHandler}>
            {renderInputTypes}
            <SelectMenu
              selected={selectedCategory}
              setSelected={setselectedCategory}
            />
            <div className="space-x-3 flex items-center justify-center m-4  ">
              {renderColors}
            </div>
            <div className="flex items-center flex-wrap space-x-1">
              {tempColors.map((color) => (
                <span
                  key={color}
                  className="p-1 rounded-md text-white text-sm"
                  style={{ background: color }}
                >
                  {color}
                </span>
              ))}
            </div>
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
                onClick={onCancel}
              >
                cancel
              </Button>
            </div>
          </form>
        </Model>
        {/* Edit Product Modal */}
        <Model
          isOpen={isOpenEditModel}
          isClosed={closeEditModel}
          title="EDIT PRODUCT"
        >
          <form className="space-y-1" onSubmit={onSumbitEditHandler}>
            {renderProductEditWithErrorMsg("title", "Product Title", "title")}
            {renderProductEditWithErrorMsg(
              "description",
              "Product Description",
              "description"
            )}
            {renderProductEditWithErrorMsg(
              "imageURL",
              "Product ImageURL",
              "imageURL"
            )}
            {renderProductEditWithErrorMsg("price", "Product Price", "price")}

            <SelectMenu
              selected={productToEdit.category}
              setSelected={(value) =>
                setProductToEdit({ ...productToEdit, category: value })
              }
            />
            <div className="space-x-3 flex items-center justify-center m-4  ">
              {renderColors}
            </div>
            <div className="flex items-center flex-wrap space-x-1">
              {tempColors.concat(productToEdit.colors).map((color) => (
                <span
                  key={color}
                  className="p-1 rounded-md text-white text-sm"
                  style={{ background: color }}
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-indigo-600 hover:bg-indigo-500/30"
                width="w-full"
              >
                Submit
              </Button>
              <Button
                className="bg-white text-black hover:bg-gray-400"
                width="w-full"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Model>
        <Model
          isOpen={isOpenConfirmModal}
          isClosed={closeConfirmModal}
          title="Are you sure you want to remove this Product from your Store?"
          description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        >
          <div className="flex items-center spave-x-3 gap-2">
            <Button
              className="bg-pink-700 hover:bg-red-800"
              width="w-full"
              onClick={removeProductHandler}
            >
              Yes , remove
            </Button>
            <Button
              className="bg-white text-black hover:bg-gray-300"
              width="w-full"
              style={{ color: "black" }}
            >
              Cancel
            </Button>
          </div>
        </Model>
      </div>
      <Toaster />
    </>
  );
};
