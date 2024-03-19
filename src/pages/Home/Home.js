import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title">Добро пожаловать в наш обувной магазин!</h1>
      <p className="home__subtext">
        Задание выполнено в рамках стажировки в coMagic.dev
      </p>
      <article className="home__article">
        <h2 className="home__article-title">
          Создание интернет-магазина с использованием Ant Design и React.
        </h2>
        <p>Магазин должен содержать: </p>
        <ul className="home__list">
          <li className="home__list-item">категории товаров</li>
          <li className="home__list-item">
            карточки товаров с изображениями, ценами и описаниями
          </li>
          <li className="home__list-item">корзину для покупок</li>
          <li className="home__list-item">страницу оформления заказа</li>
        </ul>
        <p>
          Должна быть предусмотрена возможность авторизации и регистрации
          пользователей, а также личный кабинет с историей покупок.
        </p>
        <p>
          Все компоненты должны быть разработаны с использованием Ant Design, а
          состояние приложения должно сохраняться с помощью Mobx.
        </p>
      </article>
    </div>
  );
};

export default Home;
