import React from "react";
import { useState } from "react";
import "./AddNewProduct.css";

export default function AddNewProduct({ getAllProducts }) {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductStock, setNewProductStock] = useState("");
  const [newProductIamges, setNewProductIamges] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductDiscountPercentage, setNewProductDiscountPercentage] =
    useState("");
  const [newProductDescription, setNewProductDescription] = useState("");

  const newProductsInfos = {
    title: newProductTitle,
    price: newProductPrice,
    stock: newProductStock,
    images: newProductIamges,
    popularity: newProductCategory,
    sale: newProductDiscountPercentage,
    colors: newProductDescription,
  };

  const addNewProduct = (event) => {
    event.preventDefault();
    /* updating title of product with id 1 */
    fetch("https://dummyjson.com/products/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newProductTitle,
        price: newProductPrice,
        stock: newProductStock,
        images: newProductIamges,
        category: newProductCategory,
        discountPercentage: newProductDiscountPercentage,
        description: newProductDescription,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
    console.log("  محصول به لیست اضافه شد   ");
    getAllProducts();
    emptyInputs();
  };

  function emptyInputs() {
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductStock("");
    setNewProductIamges("");
    setNewProductCategory("");
    setNewProductDiscountPercentage("");
    setNewProductDescription("");
  }

  return (
    <div className="products-main">
      <h1 className="products-title">افزودن محصول جدید</h1>

      <form action="#" className="add-products-form">
        <div className="add-products-form-wrap">
          <div className="add-products-form-group">
            <input
              type="text"
              placeholder="اسم محصول را بنویسید"
              className="add-products-input"
              value={newProductTitle}
              onChange={(event) => setNewProductTitle(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <input
              type="text"
              placeholder="قیمت محصول را بنویسید"
              className="add-products-input"
              value={newProductPrice}
              onChange={(event) => setNewProductPrice(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <input
              type="text"
              placeholder="موجودی محصول را بنویسید"
              className="add-products-input"
              value={newProductStock}
              onChange={(event) => setNewProductStock(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <input
              type="text"
              placeholder="آدرس عکس محصول را بنویسید"
              className="add-products-input"
              value={newProductIamges}
              onChange={(event) => setNewProductIamges(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <input
              type="text"
              placeholder="دستبندی محصول را بنویسید"
              className="add-products-input"
              value={newProductCategory}
              onChange={(event) => setNewProductCategory(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <input
              type="text"
              placeholder="درصد تخفیف محصول را بنویسید"
              className="add-products-input"
              value={newProductDiscountPercentage}
              onChange={(event) =>
                setNewProductDiscountPercentage(event.target.value)
              }
            />
          </div>
          <div className="add-products-form-group">
            <input
              type="text"
              placeholder="توضیحات محصول را بنویسید"
              className="add-products-input"
              value={newProductDescription}
              onChange={(event) => setNewProductDescription(event.target.value)}
            />
          </div>
        </div>
        <button className="add-products-submit" onClick={addNewProduct}>
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
