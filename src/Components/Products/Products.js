import React from "react";
import Errorbax from "../Errorbax/Errorbax";
import AddNewProduct from "../AddNewProduct/AddNewProduct";

export default function Products() {
  return (
    <>
      <AddNewProduct />
      <Errorbax msg="محصولی یافت نشد" />;
    </>
  );
}
