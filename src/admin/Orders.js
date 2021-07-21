import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import "moment/locale/tr";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">
          Toplam sipariş : {orders.length}
        </h1>
      );
    } else {
      return <h1 className="text-danger">Henüz sipariş yok</h1>;
    }
  };

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("güncelleme olmadı", data.error);
      } else {
        loadOrders();
      }
    });
  };
  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );
  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Durum : {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option> Durumu güncelle</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title="Siparişler"
      description={`Hoşgeldiniz ${user.name} şiparişleri buradan yönetebilirsin.`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  {" "}
                  <span className="bg-primary">Sipariş ID: {o._id}</span>
                </h2>
                <ul className="list-group-mb-2">
                  <li className="list-group-item">
                    Sipariş durumu: {showStatus(o)}
                  </li>
                  <li className="list-group-item">
                    Sipariş veren kişi: {o.user.name}
                    <br />
                    ID: {o.user._id}
                  </li>
                  <li className="list-group-item">{o.transaction_id}</li>
                  <li className="list-group-item">Fiyat: {o.amount} TL</li>
                  <li className="list-group-item">
                    Sipariş Tarihi: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Sipariş adresi: {o.address}
                  </li>
                </ul>
                <h3 className="font-italic mt-4 mb-4">
                  Sipariş verilen toplam ürün sayısı : {o.products.length}
                </h3>

                {o.products.map((p, pIndex) => (
                  <div
                    className="mb-4"
                    key={pIndex}
                    style={{ padding: "20px", border: "1px solid indigo" }}
                  >
                    {showInput("Ürün adı", p.name)}
                    {showInput("Ürün fiyatı", p.price)}
                    {showInput("Ürün Adedi", p.count)}
                    {showInput("Ürün ID", p._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
