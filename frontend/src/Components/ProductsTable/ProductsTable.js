import React, { useEffect, useState } from "react";
import "./ProductsTable.css";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import EditModal from "./../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../Errorbox/Errorbox";

export default function ProductsTable() {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productID, setProductID] = useState([]);

  // useEffect(() => {
  //   getAllproducts()
  // }, []);برنامه زمپ کار نکرد دیگه

  // const getAllproducts = () => {
  //   fetch(
  //     //     "http://localhost:8000/api/products/"
  //     //   )
  //     //     .then((res) => res.json())
  //     //     .then((products) => setAllProducts(products));
  // }
  // این کارو هم برای این کرد که بعد از حذف کردن یک محصول صفحه رندر بشه و دیگه
  // محصول پاک شده رو نشون نده یا درواقع بره و از سرور محصولاتی که هست رو دوباره بیاره

  const deleteModalCancelAction = () => {
    console.log("مدال کنسل شد");
    setIsShowDeleteModal(false);
  };

  const deleteModalSubmitAction = () => {
    console.log("مدال تایید شد");
    console.log(productID);
    // fetch(`http://localhost:8000/api/products/${productID}`, {
    //   method: "DELETE",
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    setIsShowDeleteModal(false);
    // getAllproducts()
  };
}
// ;برنامه زمپ کار نکرد دیگه
// وقتی بخای ان کامنت کنی به مشکلات ساختاری میخوری با گذاشتن پرانتزو اینا حل میشه

const closeDetailsmodal = () => {
  setIsShowDetailsModal(false);
  console.log("مدال جزییات بسته شد");
};

const updateProductInfos = (event) => {
  event.preventDefault();
  console.log("محصول ویرایش شد");
};

return (
  <>
    {/* {allProducts.length ? (
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
                    src={product.img}
                    alt="oil image"
                    className="products-table-img"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price} تومان</td>
                <td>{product.count}</td>
                <td>
                  <button
                    className="products-table-btn"
                    onClick={() => setIsShowDetailsModal(true)}
                  >
                    جزییات
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => setIsShowDeleteModal(true)}
                  >
                    حذف
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => setIsShowEditModal(true)}
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
      )} */}
    {/* ./././././././././././../././././././././././../././././././././././../././././././././././../././././././././././../././././././././././. */}
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
        <tr className="products-table-tr">
          <td>
            <img
              src="/img/oil.jpeg"
              alt="oil image"
              className="products-table-img"
            />
          </td>
          <td>روغن سرخ کردنی</td>
          <td>92000 تومان</td>
          <td>82</td>
          <td>
            <button
              className="products-table-btn"
              onClick={() => setIsShowDetailsModal(true)}
            >
              جزییات
            </button>
            <button
              className="products-table-btn"
              onClick={
                () => setIsShowDeleteModal(true)
                // setProductID(product.id)
              }
            >
              حذف
            </button>
            <button
              className="products-table-btn"
              onClick={() => setIsShowEditModal(true)}
            >
              ویرایش
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    {/* ./././././././././././../././././././././././../././././././././././../././././././././././../././././././././././../././././././././././. */}
    {isShowDeleteModal && (
      <DeleteModal
        submitAction={deleteModalSubmitAction}
        cancelAction={deleteModalCancelAction}
      />
    )}
    {isShowDetailsModal && <DetailsModal onHide={closeDetailsmodal} />}
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
          />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input
            type="text"
            placeholder="عنوان جدید را وارد کنید"
            className="edit-product-input"
          />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input
            type="text"
            placeholder="عنوان جدید را وارد کنید"
            className="edit-product-input"
          />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input
            type="text"
            placeholder="عنوان جدید را وارد کنید"
            className="edit-product-input"
          />
        </div>
      </EditModal>
    )}
  </>
);
