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

  useEffect(() => {
    fetch(
      "http://localhost/phpmyadmin/index.php?route=/sql&db=sazlearn_shop&table=products&pos=0"
    )
      .then((res) => res.json())
      .then((products) => setAllProducts(products));
  }, []);

  const deleteModalCancelAction = () => {
    console.log("مدال کنسل شد");
    setIsShowDeleteModal(false);
  };

  const deleteModalSubmitAction = () => {
    console.log("مدال تایید شد");
    setIsShowDeleteModal(false);
  };

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
      )}

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
}
