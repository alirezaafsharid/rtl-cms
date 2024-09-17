import React, { useEffect, useState } from "react";
import ErrorBox from "../Errorbox/Errorbox";
import DetailsModal from "../DetailsModal/DetailsModal";

import "./Comments.css";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState("");

  const closeDetailsModal = () => setIsShowDetailsModal(false);

  useEffect(() => {
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
                  <button>حذف</button>
                  <button>ویرایش</button>
                  <button>پاسخ</button>
                  <button>تایید</button>
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
    </div>
  );
}
