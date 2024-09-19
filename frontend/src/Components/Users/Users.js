import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
// import DetailsModal from "../DetailsModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../Errorbox/Errorbox";
import "./Users.css";

// ----------------------------------------------------------------------------------------
export default function Users() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [usersID, setUsersID] = useState(null);

  const [userNewFirstname, setUserNewFirstname] = useState("");
  const [userNewLastname, setUserNewLastname] = useState("");
  const [userNewUsername, setUserNewUsername] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewPhone, setUserNewPhone] = useState("");
  // const [userNewCity, setUserNewCity] = useState('')
  const [userNewEmail, setUserNewEmail] = useState("");
  // const [userNewAddress, setUserNewAddress] = useState('')
  // const [userNewBuy, setUserNewBuy] = useState('')
  // const [userNewScore, setUserNewScore] = useState('')

  // ------------------------------------------------------------------------------------------------
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
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
  const updateUsers = (event) => {
    event.preventDefault();
    const userNewInfos = {
      firstName: userNewFirstname,
      lastName: userNewLastname,
      username: userNewUsername,
      password: userNewPassword,
      phone: userNewPhone,
      email: userNewEmail,
    };
    /* updating lastName of user with id 2 */
    fetch(`https://dummyjson.com/users/${usersID}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userNewInfos),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    console.log("اطلاعات کاربر ویرایش شد");
    setIsShowEditModal(false);
    getAllUsers();
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
                    {/* <button>جزییات</button> */}
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setUsersID(users.id);
                        setUserNewFirstname(users.firstName);
                        setUserNewLastname(users.lastName);
                        setUserNewUsername(users.username);
                        setUserNewPassword(users.password);
                        setUserNewPhone(users.phone);
                        setUserNewEmail(users.email);
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
        {isShowEditModal && (
          <EditModal onClose={closeEditModal} onSubmit={updateUsers}>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                className="edit-user-info-input"
                value={userNewFirstname}
                onChange={(event) => setUserNewFirstname(event.target.value)}
                placeholder="مقدار جدید را وارد نمایید"
              />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                className="edit-user-info-input"
                value={userNewLastname}
                onChange={(event) => setUserNewLastname(event.target.value)}
                placeholder="مقدار جدید را وارد نمایید"
              />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                className="edit-user-info-input"
                value={userNewUsername}
                onChange={(event) => setUserNewUsername(event.target.value)}
                placeholder="مقدار جدید را وارد نمایید"
              />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                className="edit-user-info-input"
                value={userNewPassword}
                onChange={(event) => setUserNewPassword(event.target.value)}
                placeholder="مقدار جدید را وارد نمایید"
              />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                className="edit-user-info-input"
                value={userNewPhone}
                onChange={(event) => setUserNewPhone(event.target.value)}
                placeholder="مقدار جدید را وارد نمایید"
              />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input
                type="text"
                className="edit-user-info-input"
                value={userNewEmail}
                onChange={(event) => setUserNewEmail(event.target.value)}
                placeholder="مقدار جدید را وارد نمایید"
              />
            </div>
          </EditModal>
        )}
      </div>
    </>
  );
}
