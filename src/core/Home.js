import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);
  return (
    <div>
      <Layout
        title="Anasayfa"
        description="Hediyelik Epoksi"
        className="container-fluid"
      >
        <Search />
        <h2 className="mb-4">En Çok Satanlar</h2>
        <div className="row">
          {productsBySell.map((product, i) => (
            <div className="col-4" key={i}>
              <Card product={product} />
            </div>
          ))}
        </div>

        <h2 className="mb-4">Yeni Ürünler</h2>
        <div className="row">
          {productsByArrival.map((product, i) => (
            <div className="col-4" key={i}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Home;
