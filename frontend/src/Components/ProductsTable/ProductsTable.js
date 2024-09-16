import React, { useEffect, useState } from "react";
import "./ProductsTable.css";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import EditModal from "./../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../Errorbox/Errorbox";
import Products from "../Products/Products";

export default function ProductsTable() {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productID, setProductID] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State برای مدیریت لودینگ

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

  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };

  const deleteModalSubmitAction = () => {
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

  const closeDetailsmodal = () => {
    setIsShowDetailsModal(false);
  };

  const updateProductInfos = (event) => {
    event.preventDefault();
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
                <td>{product.price} تومان</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    className="products-table-btn"
                    onClick={() => setIsShowDetailsModal(true)}
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
        </EditModal>
      )}
    </>
  );
}
