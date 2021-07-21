import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {getPurchaseHistory} from "./apiUser"
import moment from "moment"

const UserDashboard = () => {
  const [history, setHistory] = useState([])
  const {
    user: { _id, name, email, role }
} = isAuthenticated();
  const token = isAuthenticated().token;


  const init = (userId,token)=>{
    getPurchaseHistory(userId,token)
    .then(data=>{
      if(data.error){
          console.log(data.error);
      }else{
        setHistory(data)
      }
    })
  }

  useEffect(() => {
    init(_id,token)
  }, [])
  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cart" className="nav-link">
              Sepetim
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Profili Güncelle
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Kullanıcı Bilgileri</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Kayıtlı Kullanıcı"}
          </li>
        </ul>
      </div>
    );
  };
  const purchaseHistory = history => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">Satın Alma Geçmişi</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history.map((h, i) => {
                        return (
                            <div key={i}>
                                <hr />
                                {h.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Ürün adı: {p.name}</h6>
                                            <h6>Ürün fiyatı: ${p.price}</h6>
                                            <h6>
                                                Satın alma tarihi:{" "}
                                                {moment(p.createdAt).fromNow()}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};
  return (
    <Layout
      title="Kullanıcı Profili"
      description={`Hoşgeldiniz ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
