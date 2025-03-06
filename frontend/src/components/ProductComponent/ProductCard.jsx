import Card from "../ui/card";
import Button from "../ui/button";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
      <Card title={product.name} description={product.description} />
      <div className="mt-2 flex justify-between">
        <Button onClick={() => onEdit(product)}>Edit</Button>
        <Button onClick={() => onDelete(product)} color="secondary">Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;