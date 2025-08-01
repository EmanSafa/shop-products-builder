const ProductValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title  must be between 10 and 80 characters";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description  must be between 10 and 900 characters";
  }
  const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([/\w.,@?^=%&:~+#-]*)?$/;

  if (!product.imageURL.trim() || !urlRegex) {
    errors.imageURL = "Vaild image URL is required";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Vaild price is required";
  }

  return errors;
};

export default ProductValidation;
