import { formatPrice } from "@/features/catalog/format";
import { getProducts } from "@/features/catalog/queries";
import { ProductEditForm } from "@/features/catalog/product-edit-form";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="admin-heading">
        <div>
          <p className="eyebrow">Administration</p>
          <h1>Produits</h1>
        </div>
        <span>{products.length} produits</span>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
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

      <section className="admin-edit-list" aria-labelledby="edit-products-title">
        <div className="admin-heading compact">
          <div>
            <p className="eyebrow">Server Action</p>
            <h2 id="edit-products-title">Modifier les produits</h2>
          </div>
        </div>

        <div className="product-edit-grid">
          {products.map((product) => (
            <article className="product-edit-card" key={product.id}>
              <h3>{product.name}</h3>
              <p>{formatPrice(product.price)}</p>
              <ProductEditForm product={product} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
