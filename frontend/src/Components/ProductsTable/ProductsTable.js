import React, { useEffect, useState } from "react";
import "./ProductsTable.css";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import EditModal from "./../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../Errorbox/Errorbox";
import Products from "../Products/Products";

export default function ProductsTable({ getAllProducts, allProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const [productID, setProductID] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State برای مدیریت لودینگ
  const [mainProductInfos, setMainProductInfos] = useState({});

  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewStock, setProductNewStock] = useState("");
  // const [productNewImg, setProductNewImg] = useState("");
  const [productNewCategory, setProductNewCategory] = useState("");
  const [productNewDiscountPercentage, setProductNewDiscountPercentage] =
    useState("");
  const [productNeweDscription, setProductDescription] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price); // 'fa-IR' برای فرمت فارسی با جداکننده سه‌تایی
  };

  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };

  const deleteModalSubmitAction = () => {
    console.log("مدال تایید شد ");
    setIsLoading(true); // شروع لودینگ
    fetch(`https://dummyjson.com/products/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false); // پایان لودینگ
        setIsShowDeleteModal(false);
        getAllProducts();
      });
    // .catch(() => {
    //   setIsLoading(false); // در صورت بروز خطا نیز لودینگ غیرفعال شود
    // });
  };

  // const closeDetailsmodal = () => {
  //   setIsShowDetailsModal(false);
  // };

  // const updateProductInfos = (event) => {
  //   event.preventDefault();
  // };
  const closeDetailsmodal = () => {
    setIsShowDetailsModal(false);
    console.log("مدال جزییات بسته شد");
  };

  const updateProductInfos = (event) => {
    event.preventDefault();
    /* updating title of product with id 1 */
    fetch(`https://dummyjson.com/products/${productID}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: productNewTitle,
        price: productNewPrice,
        stock: productNewStock,
        category: productNewCategory,
        discountPercentage: productNewDiscountPercentage,
        description: productNeweDscription,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllProducts();
      });
    console.log("محصول ویرایش شد");
    setIsShowEditModal(false);
    //  این برای این است که بعد از زدن دکمه ثبت اطلاعات جدیدی مدال بسته شه
  };

  return (
    <>
      {isLoading && <div className="loading">در حال حذف محصول...</div>}{" "}
      {/* نمایش لودینگ */}
      {allProducts.length ? (
        <table className="products-table">
          <thead>
            <tr className="products-table-heading-tr">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id} className="products-table-tr">
                <td>
                  <img
                    src={product.thumbnail}
                    alt="product image"
                    className="products-table-img"
                  />
                </td>
                <td>{product.title}</td>
                <td>{formatPrice(product.price)} تومان</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowDetailsModal(true);
                      setMainProductInfos(product);
                    }}
                  >
                    جزییات
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setProductID(product.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowEditModal(true);
                      setProductID(product.id);
                      setProductNewTitle(product.title);
                      setProductNewPrice(product.price);
                      setProductNewStock(product.stock);
                      // setProductNewImg(product.img);
                      setProductNewCategory(product.category);
                      setProductNewDiscountPercentage(
                        product.discountPercentage
                      );
                      setProductDescription(product.description);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ محصولی یافت نشد" />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title="ایا از حذف کردن مطمئنی؟"
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsmodal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th> دستبندی </th>
                <th> تخفیف </th>
                <th> توضیحات</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{mainProductInfos.category}</td>
                <td>{mainProductInfos.discountPercentage}%</td>
                <td>{mainProductInfos.description}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={updateProductInfos}
        >
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
              value={productNewTitle}
              onChange={(event) => setProductNewTitle(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="موجودی جدید محصول را وارد نمایید "
              className="edit-product-input"
              value={productNewStock}
              onChange={(event) => setProductNewStock(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="قیمت جدید را وارد نمایید "
              className="edit-product-input"
              value={productNewPrice}
              onChange={(event) => setProductNewPrice(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="دستبندی محصول را وارد کنید"
              className="edit-product-input"
              value={productNewCategory}
              onChange={(event) => setProductNewCategory(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="درصد تخفیف محصول را وارد کنید "
              className="edit-product-input"
              value={productNewDiscountPercentage}
              onChange={(event) =>
                setProductNewDiscountPercentage(event.target.value)
              }
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="توضیحات محصول را ورد کنید"
              className="edit-product-input"
              value={productNeweDscription}
              onChange={(event) =>
                setProductNewDiscountPercentage(event.target.value)
              }
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
