import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((cur, nex) => {
      return cur + nex.count * nex.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Satın Al</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">
          Satın almak için giriş yapın.
        </button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Toplam : {getTotal()} TL</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
