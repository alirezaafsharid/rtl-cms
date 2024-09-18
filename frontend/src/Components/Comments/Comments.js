import React, { Children, useEffect, useState } from "react";
import ErrorBox from "../Errorbox/Errorbox";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";

import "./Comments.css";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [commentsID, setCommentsID] = useState(null);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState("");

  const closeDetailsModal = () => setIsShowDetailsModal(false);
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeAcceptModal = () => setIsShowAcceptModal(false);
  const acceptModal = () => {
    console.log("کامنت تایید شد");
    setIsShowAcceptModal(false);
  };

  const deleteComment = () => {
    fetch(`https://dummyjson.com/comments/${commentsID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        // حذف کامنت از لیست  ***************************************************************
        setAllComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentsID)
        );
        getAllComments();
      });
    console.log("کامنت با موفقیت ریمو شد");
  };
  const updateComment = (event) => {
    event.preventDefault();
    console.log("متن کامنت آپدیت شد");
    /* updating body of comment with id  */
    fetch(`https://dummyjson.com/comments/${commentsID}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: mainCommentBody,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    setIsShowEditModal(false);
    getAllComments();
  };

  function getAllComments() {
    // fetch("https://dummyjson.com/comments")
    //   .then((res) => res.json())
    //   .then((comments) => setAllComments(comments));
    // fetch("https://dummyjson.com/comments")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(" کامنت های دریافتی رو", data),
    //       setAllComments(data.comments);
    //   });
    // fetch("https://dummyjson.com/comments")
    //   .then((res) => res.json())
    //   .then((comments) => {
    //     console.log(comments); // نمایش کامنت‌ها در کنسول برای بررسی
    //     setAllComments(comments.comments); // ذخیره کامنت‌ها در state
    //   });
    fetch("https://dummyjson.com/comments")
      .then((res) => res.json())
      .then((data) => {
        console.log("کامنت ها دریافت شد:", data);
        setAllComments(data.comments);
      });
    console.log("کامنت ها دریافت شد");
  }

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className="cms-main">
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th> اسم کاربر</th>
              <th> آیدی کاربر </th>
              <th> کامنت </th>
              <th> شماره کامنت </th>
              <th> تعداد لایک </th>
            </tr>
          </thead>

          <tbody>
            {allComments.map((comments) => (
              <tr key={comments.id}>
                <td>{comments.user.fullName}</td>
                <td>{comments.user.id}</td>
                <td>
                  <button
                    onClick={() => {
                      setMainCommentBody(comments.body);
                      setIsShowDetailsModal(true);
                    }}
                  >
                    دیدن متن
                  </button>
                </td>
                <td>{comments.id}</td>
                <td>{comments.likes}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setCommentsID(comments.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => {
                      setIsShowEditModal(true);
                      setMainCommentBody(comments.body);
                      setCommentsID(comments.id);
                    }}
                  >
                    ویرایش
                  </button>
                  <button>پاسخ</button>
                  <button onClick={() => setIsShowAcceptModal(true)}>
                    تایید
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد" />
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <p className="text-modal">{mainCommentBody}</p>
          <button className="text-modal-close-btn" onClick={closeDetailsModal}>
            بستن
          </button>
        </DetailsModal>
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title="ایا از حذف کردن مطمئنی؟"
          cancelAction={closeDeleteModal}
          onHide={closeDeleteModal}
          submitAction={deleteComment}
        />
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateComment}>
          <textarea
            value={mainCommentBody}
            onChange={(event) => setMainCommentBody(event.target.value)}
          ></textarea>
        </EditModal>
      )}
      {isShowAcceptModal && (
        <DeleteModal
          title="ایا از تایید کامنت مطمئنی؟"
          cancelAction={closeAcceptModal}
          onHide={closeDeleteModal}
          submitAction={acceptModal}
        />
      )}
    </div>
  );
}
