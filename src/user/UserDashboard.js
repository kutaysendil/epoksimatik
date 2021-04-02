import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cart" className="nav-link">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/profile/update">
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
  const PurchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Satın Alma Geçmişi</h3>
        <ul className="list-group">
          <li className="list-group-item">Geçmiş</li>
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
          {PurchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
