import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './../AuthContext';
import { Link } from 'react-router-dom';
import './../App.css';
import { useCart } from './../CartContext';
import Swal from 'sweetalert2'
import axios from 'axios';
import API_URL from './../config';

export const Products = () => {
  const { authData } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}products.php`);
        const data = await response.json();
        setProducts(data);

        // Get unique categories from the products data
        const uniqueCategories = [...new Set(data.map((product) => product.category_name))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const deleteProduct = (productId) => {
    try {
      //
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await axios.post(`${API_URL}deleteproduct.php`, { id: productId });
          console.log(response.data);
          // After successful deletion, update the list of products
          setProducts(products.filter(product => product.id !== productId));
          Swal.fire({
            title: "Deleted!",
            text: response.data.message,
            icon: "success"
          });
        }
      });
      //

    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_name === selectedCategory)
    : products;
  return authData.status && (
    <div className="container-fluid " style={{ backgroundColor: 'rgba(128, 128, 128, 0.3)' }}>

      {/* add product */}
      <div className='mb-3 '>
        {authData.user.role == '2' && (
          <Link className="btn btn-outline-success me-2 p-2 mt-2" to="/add">
            Add Product
          </Link>
        )}
      </div>

      {/* <h2 className="my-4">Products - {selectedCategory || 'All Categories'}</h2> */}
      <div className="mb-3">
        {/* <label htmlFor="category-filter" className="form-label">
          Filter by Category:
        </label> */}
        <select id="category-filter" className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <img src={`${product.images}`} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text font-weight-bold">Price: ${product.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/product/${product.id}`} className="btn btn-outline-primary">
                    Details
                  </Link>
                  {authData?.user.role === '2' && (
                    <button onClick={() => deleteProduct(product.id)} className="btn btn-outline-danger">Delete <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg></button>
                  )}
                  <button onClick={() => addToCart(product)} className="btn btn-outline-success">Cart <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
                  </svg></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Footer strat */}

        <footer className="bd-footer py-4 py-md-5 mt-5 bg-body-tertiary">
          <div className="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
            <div className="row">
              <div class="col-lg-3 mb-3">
                <a className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none" href="/" aria-label="Bootstrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="d-block me-2" viewBox="0 0 118 94" role="img"><title>BIJOY eComm. Store</title><path fillRule="evenodd" clipRule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor" /></svg>
                  <span className="fs-5">BIJOY eComm. Store</span>
                </a>
                <ul className="list-unstyled small">
                  <li className="mb-2">Designed and built with all the love in the world by the <a href="/docs/5.3/about/team/">BIJOY Ecommerce Team</a> with the help of <a href="https://github.com/twbs/bootstrap/graphs/contributors">our contributors</a>.</li>
                  <li className="mb-2">Code licensed <a href="https://github.com/twbs/bootstrap/blob/main/LICENSE" target="_blank" rel="license noopener">MIT</a>, docs <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener">CC BY 3.0</a>.</li>
                  <li className="mb-2">BIJOY Web site version: 1.0.0</li>
                </ul>
              </div>
              <div className="col-6 col-lg-2 offset-lg-1 mb-3">
                <h5>Links</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/docs/5.3/">Docs</a></li>
                  <li className="mb-2"><a href="/">Home</a></li>
                  <li className="mb-2"><a href="/docs/5.3/examples/">Examples</a></li>
                  <li className="mb-2"><a href="https://icons.getbootstrap.com/">Icons</a></li>
                  <li className="mb-2"><a href="https://themes.getbootstrap.com/">Themes</a></li>
                  <li className="mb-2"><a href="https://blog.getbootstrap.com/">Blog</a></li>
                  <li className="mb-2"><a href="https://cottonbureau.com/people/bootstrap" target="_blank" rel="noopener">Swag Store</a></li>
                </ul>
              </div>
              <div className="col-6 col-lg-2 mb-3">
                <h5>Guides</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/docs/5.3/getting-started/">Getting started</a></li>
                  <li className="mb-2"><a href="/docs/5.3/examples/starter-template/">Starter template</a></li>
                  <li className="mb-2"><a href="/docs/5.3/getting-started/webpack/">Webpack</a></li>
                  <li className="mb-2"><a href="/docs/5.3/getting-started/parcel/">Parcel</a></li>
                  <li className="mb-2"><a href="/docs/5.3/getting-started/vite/">Vite</a></li>
                </ul>
              </div>
              <div className="col-6 col-lg-2 mb-3">
                <h5>Projects</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="https://github.com/twbs/bootstrap" target="_blank" rel="noopener">BIJOY</a></li>
                  <li className="mb-2"><a href="https://github.com/twbs/bootstrap/tree/v4-dev" target="_blank" rel="noopener">Ecom.</a></li>
                  <li className="mb-2"><a href="https://github.com/twbs/icons" target="_blank" rel="noopener">Icons</a></li>
                  <li className="mb-2"><a href="https://github.com/twbs/rfs" target="_blank" rel="noopener">RFS</a></li>
                  <li className="mb-2"><a href="https://github.com/twbs/examples/" target="_blank" rel="noopener">Examples repo</a></li>
                </ul>
              </div>
              <div className="col-6 col-lg-2 mb-3">
                <h5>Community</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="https://github.com/twbs/bootstrap/issues" target="_blank" rel="noopener">Issues</a></li>
                  <li className="mb-2"><a href="https://github.com/twbs/bootstrap/discussions" target="_blank" rel="noopener">Discussions</a></li>
                  <li className="mb-2"><a href="https://github.com/sponsors/twbs" target="_blank" rel="noopener">Corporate sponsors</a></li>
                  <li className="mb-2"><a href="https://opencollective.com/bootstrap" target="_blank" rel="noopener">Open Collective</a></li>
                  <li className="mb-2"><a href="https://stackoverflow.com/questions/tagged/bootstrap-5" target="_blank" rel="noopener">Stack Overflow</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* Footer end */}
    </div>
  )
}