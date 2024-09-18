import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
// import EditeModal from "../EditModal";
// import DetailsModal from "../DetailsModal";
import ErrorBox from "../Errorbox/Errorbox";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [usersID, setUsersID] = useState(null);
  // ------------------------------------------------------------------------------------------------

  const closeDeleteModal = () => setIsShowDeleteModal(false);
  // ------------------------------------------------------------------------------------------------
  function getAllUsers() {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((users) => setUsers(users.users));
    console.log("لیست کاربران نمایش داده شد", users);
  }
  useEffect(() => {
    getAllUsers();
  }, []);
  // ------------------------------------------------------------------------------------------------
  const deleteUser = () => {
    fetch(`https://dummyjson.com/users/${usersID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        // حذف کامنت از لیست  ***************************************************************
        setAllUsers((prevUser) =>
          prevUser.filter((users) => users.id !== usersID)
        );
        getAllUsers();
      });
    console.log("کامنت با موفقیت ریمو شد");
  };
  // ----------------------------------------------------------------------------------------------------
  return (
    <>
      <div className="cms-main">
        <h1 className="cms-title">لیست کاربران</h1>

        {users.length ? (
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>یوزرنیم</th>
                <th>رمز عبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
              </tr>
            </thead>

            <tbody>
              {users.map((users) => (
                <tr key={users.id}>
                  <td>
                    {users.firstName}-{users.lastName}
                  </td>
                  <td>{users.username}</td>
                  <td>{users.password}</td>
                  <td>{users.phone}</td>
                  <td>{users.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setUsersID(users.id);
                      }}
                    >
                      حذف
                    </button>
                    <button>جزییات</button>
                    <button>ویرایش</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <ErrorBox msg="هیچ کاربری یافت نشد" />
        )}
        {isShowDeleteModal && (
          <DeleteModal
            title="ایا از حذف کردن مطمئنی؟"
            cancelAction={closeDeleteModal}
            onHide={closeDeleteModal}
            submitAction={deleteUser}
          />
        )}
      </div>
    </>
  );
}
