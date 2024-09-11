import React from "react";
import Errorbax from "../Errorbax/Errorbax";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ProductsTable from "../ProductsTable/ProductsTable";

export default function Products() {
  return (
    <>
      <AddNewProduct />
      <Errorbax msg="محصولی یافت نشد" />
      <ProductsTable />
    </>
  );
}
