// import React from "react";
// import ErrorBox from "../Errorbox/Errorbox";
// import AddNewProduct from "../AddNewProduct/AddNewProduct";
// import ProductsTable from "../ProductsTable/ProductsTable";

// export default function Products() {
//   return (
//     <>
//       <AddNewProduct />
//       <ErrorBox msg="هیچ محصولی یافت نشد" />
//       {/* به دلیل کار نکردن قسمت سمت سرور این بنر رو هم نمایش میدیم ولی کد های هندل کردن و نحوه هندل کردنش داخل پروداکت تیبل هست */}
//       <ProductsTable />
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ProductsTable from "../ProductsTable/ProductsTable";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((products) => {
        if (Array.isArray(products.products)) {
          setAllProducts(products.products);
        }
      });
  };

  return (
    <>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductsTable
        allProducts={allProducts}
        getAllProducts={getAllProducts}
      />
    </>
  );
}
