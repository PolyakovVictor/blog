import '../style/categoryBar.css';
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryBar: React.FC = () => {

  return (
    <nav className="category-bar">
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item category-item">
          <a className="nav-link active" href="#">Все категории</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link active" href="#">Категория 1</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 2</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 3</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 4</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 5</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 6</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 7</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 8</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 9</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 10</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 11</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 12</a>
        </li>
        <li className="nav-item category-item">
          <a className="nav-link" href="#">Категория 13</a>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryBar;