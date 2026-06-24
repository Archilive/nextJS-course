import { formatPrice } from "@/features/catalog/format";
import { getProducts } from "@/features/catalog/queries";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="admin-heading">
        <div>
          <p className="eyebrow">Back office</p>
          <h1>Products</h1>
        </div>
        <span>{products.length} products</span>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Slug</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.stock}</td>
                <td>{product.slug}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
