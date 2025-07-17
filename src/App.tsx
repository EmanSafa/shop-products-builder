import ProductCard from "./Components/ProductCard";
import { productList } from "./Data/index";

export const App = () => {
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <>
      <div className="@container mx-auto">
        <div className=" p-3 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
        md:gap-4 ">
          {renderProductList}
        </div>
      </div>
    </>
  );
};
