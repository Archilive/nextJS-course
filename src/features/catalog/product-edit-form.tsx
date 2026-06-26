"use client";

import { useActionState } from "react";
import { updateProductAction } from "@/features/catalog/actions";
import {
  initialProductFormState,
  type ProductFormState,
} from "@/features/catalog/product-form-state";
import type { Product } from "@/features/catalog/types";

export function ProductEditForm({ product }: { product: Product }) {
  const [state, formAction, isPending] = useActionState<
    ProductFormState,
    FormData
  >(updateProductAction, initialProductFormState);

  return (
    <form className="product-edit-form" action={formAction}>
      <input name="id" type="hidden" value={product.id} />

      <label>
        Nom
        <input name="name" type="text" defaultValue={product.name} required />
      </label>

      <label>
        Catégorie
        <input
          name="category"
          type="text"
          defaultValue={product.category}
          required
        />
      </label>

      <div className="form-row">
        <label>
          Prix
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product.price}
            required
          />
        </label>

        <label>
          Stock
          <input
            name="stock"
            type="number"
            min="0"
            defaultValue={product.stock}
            required
          />
        </label>
      </div>

      <label>
        Description
        <textarea
          name="description"
          defaultValue={product.description}
          rows={3}
          required
        />
      </label>

      {state.status !== "idle" ? (
        <p
          className={state.status === "success" ? "form-success" : "form-error"}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <div className="form-actions">
        <button
          className="primary-button"
          type="submit"
          name="intent"
          value="update"
          disabled={isPending}
        >
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </button>
        <button
          className="secondary-button"
          type="submit"
          name="intent"
          value="test-error"
          disabled={isPending}
        >
          Tester une erreur
        </button>
      </div>
    </form>
  );
}
