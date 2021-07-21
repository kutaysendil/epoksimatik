import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/create/category" className="nav-link">
              Yeni kategori yarat
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Yeni ürün ekle
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              Siparişleri görüntüle
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Ürünleri Yönet
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminInfo = () => {
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

  return (
    <Layout
      title="Kullanıcı Profili"
      description={`Hoşgeldiniz ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">{adminLinks()}</div>
        <div className="col-6">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
