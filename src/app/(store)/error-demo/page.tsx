import { connection } from "next/server";

export default async function ErrorDemoPage() {
  await connection();

  throw new Error("Intentional error demo");
}
