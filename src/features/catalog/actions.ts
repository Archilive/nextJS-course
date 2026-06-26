"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { PRODUCTS_CACHE_TAG } from "@/features/catalog/queries";
import type { ProductFormState } from "@/features/catalog/product-form-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const productSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().trim().min(2, "Le nom est trop court."),
  category: z.string().trim().min(2, "La catégorie est obligatoire."),
  price: z.coerce.number().positive("Le prix doit être positif."),
  stock: z.coerce.number().int().min(0, "Le stock ne peut pas être négatif."),
  description: z.string().trim().min(10, "La description est trop courte."),
});

export async function updateProductAction(
  _previousState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return {
      status: "error",
      message: "Vous devez être admin pour modifier un produit.",
    };
  }

  if (formData.get("intent") === "test-error") {
    return {
      status: "error",
      message: "Erreur de test déclenchée depuis la Server Action.",
    };
  }

  const parsed = productSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    category: formData.get("category"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ?? "Impossible de modifier le produit.",
    };
  }

  try {
    const product = await prisma.product.update({
      where: {
        id: parsed.data.id,
      },
      data: {
        name: parsed.data.name,
        category: parsed.data.category,
        price: parsed.data.price,
        stock: parsed.data.stock,
        description: parsed.data.description,
      },
    });

    revalidateTag(PRODUCTS_CACHE_TAG, "max");
    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath(`/products/${product.slug}`);

    return {
      status: "success",
      message: "Produit mis à jour.",
    };
  } catch {
    return {
      status: "error",
      message: "La mise à jour a échoué.",
    };
  }
}
