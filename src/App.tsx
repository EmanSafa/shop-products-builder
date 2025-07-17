import ProductCard from "./Components/ProductCard";

export const App = () => {
  return (
    <>
      <div className=" p-3 grid  gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> 
      </div>
    </>
  );
};
