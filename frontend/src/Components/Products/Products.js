import React from "react";
import ErrorBox from "../Errorbox/Errorbox";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ProductsTable from "../ProductsTable/ProductsTable";

export default function Products() {
  return (
    <>
      <AddNewProduct />
      <ErrorBox msg="هیچ محصولی یافت نشد" />
      {/* به دلیل کار نکردن قسمت سمت سرور این بنر رو هم نمایش میدیم ولی کد های هندل کردن و نحوه هندل کردنش داخل پروداکت تیبل هست */}
      <ProductsTable />
    </>
  );
}
