import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    //API BAGLAN!
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Kategori Adı</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Kategori Oluştur</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <h3 className="text-success">{name} isimli kategori oluşturuldu</h3>
      );
    }
  };
  const showError = () => {
    if (error) {
      return (
        <h3 className="text-danger">
          {name} isimli kategori zaten var olduğu için oluşturulamadı.
        </h3>
      );
    }
  };
  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning ">
        Admin Paneline Dön
      </Link>
    </div>
  );
  return (
    <Layout title="Kategori Ekle" description={`Hoşgeldiniz ${user.name}`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
