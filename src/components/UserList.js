/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { fetchAllUsers } from "../store/slices/users";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  // Redux
  const { list: users } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  console.log('Redux', users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Hooks
  const [datas, setDatas] = useState([]);

  const getData = async () => {
    try {
      const data = await users;
      setDatas(data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (datas) {
      getData();
    }
  }, [datas]);

  console.log('Hooks', datas);

  return (
    <div className="container">
      <div className="row mt-3">
        {users.map((user) => (
          <div key={user.id} className="col-md-3">
            <div className="card">
              <img src={user.avatar} alt="avatar" />
              <div className="card-body">
                <h5>{`${user.first_name} ${user.last_name}`}</h5>
                <p className="card-text">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
