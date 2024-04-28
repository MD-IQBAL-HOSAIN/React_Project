// import React, { useState } from 'react';
// import { useCart } from './../CartContext';
// import { Helmet } from 'react-helmet';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import API_URL from './../config';

// const PlaceOrder = () => {
//     const { cart, emptyCart } = useCart();
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         phoneNumber: '',
//         address: '',
//         city: '',
//         state: '',
//         country: '',
//         shippingAddress: '',
//         billingAddress: '',
//         paymentMethod: '',
//         trxid: ''
//     });

//     const grandTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(`${API_URL}orders.php`, {
//                 cart: cart,
//                 formData: formData,
//                 grandTotal: grandTotal
//             });

//             if (response.data.status === 'success') {
//                 emptyCart();

//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Order Placed Successfully!',
//                     text: 'Your order has been placed successfully. Thank you for shopping with us!',
//                     timer: 1000,
//                     showConfirmButton: false
//                 }).then(() => {
//                     // Additional action after the Swal closes, if needed
//                 });

//                 setFormData({
//                     fullName: '',
//                     email: '',
//                     phoneNumber: '',
//                     address: '',
//                     city: '',
//                     state: '',
//                     country: '',
//                     shippingAddress: '',
//                     billingAddress: '',
//                     paymentMethod: '',
//                     trxid: ''
//                 });
//             }
//         } catch (error) {
//             console.error('Error placing order:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Something went wrong while placing your order. Please try again later.',
//             });
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>Place Order</title>
//                 <meta name="description" content='Place Order Page' />
//             </Helmet>
//             <div className='container'>
//                 <div className="row">
//                     <div className="col-6">
//                         <h1>Place Order</h1>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-3">
//                                 <input type="text" className="form-control" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <input type="text" className="form-control" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <textarea className="form-control" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required></textarea>
//                             </div>
//                             <div className="mb-3">
//                                 <input type="text" className="form-control" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <input type="text" className="form-control" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <input type="text" className="form-control" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <textarea className="form-control" name="shippingAddress" placeholder="Shipping Address" value={formData.shippingAddress} onChange={handleChange} required></textarea>
//                             </div>
//                             <div className="mb-3">
//                                 <textarea className="form-control" name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={handleChange} required></textarea>
//                             </div>
//                             <div className="mb-3">
//                                 <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
//                                     <option value="">Select Payment Method</option>
//                                     <option value="credit_card">Credit Card</option>
//                                     <option value="debit_card">Debit Card</option>
//                                     <option value="paypal">PayPal</option>
//                                 </select>
//                             </div>
//                             <div className="mb-3">
//                                 <input type="text" className="form-control" name="trxid" placeholder="Transaction ID (Trxid)" value={formData.trxid} onChange={handleChange} required />
//                             </div>

//                             {/* Add more form fields as needed */}
//                             <button type="submit" className="btn btn-primary">Place Order</button>
//                         </form>
//                     </div>
//                     <div className="col-6">
//                         <h2>Cart Products</h2>
//                         <ul className="list-group">
//                             {cart.map((item, index) => (
//                                 <li key={index} className="list-group-item">
//                                     <div className="row">
//                                         <div className="col-6">{item.name}</div>
//                                         <div className="col-3">Quantity: <span className="badge bg-primary rounded-pill">{item.quantity}</span></div>
//                                         <div className="col-3">Price: ${item.price}</div>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//                 <p>Your order total: ${grandTotal}</p>
//             </div>
//         </>
//     );
// };

// export default PlaceOrder;

// ........................PlaceOrder.....................


import React, { useState } from 'react';
import { useCart } from './../CartContext';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_URL from './../config';

const PlaceOrder = () => {
    const { cart, emptyCart } = useCart();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        country: '',
        shippingAddress: '',
        billingAddress: '',
        paymentMethod: '',
        trxid: ''
    });

    const grandTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}orders.php`, {
                cart: cart,
                formData: formData,
                grandTotal: grandTotal
            });

            if (response.data.status === 'success') {
                emptyCart();
                console.log(response.data.status);

                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully!',
                    text: 'Your order has been placed successfully. Thank you for shopping with us!',
                    timer: 4000,
                    showConfirmButton: false
                }).then(() => {
                    // Additional action after the Swal closes, if needed
                });

                setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                    city: '',
                    country: '',
                    shippingAddress: '',
                    billingAddress: '',
                    paymentMethod: '',
                    trxid: ''
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to place your order. Please try again later.',
                    timer: 4000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while placing your order. Please try again later.',
            });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
        <div style={{ backgroundColor: 'bisque'}}>
            <Helmet>
                <title>Place Order</title>
                <meta name="description" content='Place Order Page' />
            </Helmet>
            <div className='container'>
                <div className="row">
                    <div className="col-6">
                        <h1>Place Order</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <input type="text" className="form-control" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" name="shippingAddress" placeholder="Shipping Address" value={formData.shippingAddress} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-3">
                                <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                                    <option value="">Select Payment Method</option>
                                    <option value="credit_card">Credit Card</option>
                                    <option value="debit_card">Debit Card</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="trxid" placeholder="Transaction ID (Trxid)" value={formData.trxid} onChange={handleChange} required />
                            </div>

                            {/* Add more form fields as needed */}
                            <button type="submit" className="btn btn-primary">Place Order</button>
                        </form>
                    </div>
                    <div className="col-6">
                        <h2>Cart Products</h2>
                        <ul className="list-group">
                            {cart.map((item, index) => (
                                <li key={index} className="list-group-item">
                                    <div className="row">
                                        <div className="col-6">{item.name}</div>
                                        <div className="col-3">Quantity: <span className="badge bg-primary rounded-pill">{item.quantity}</span></div>
                                        <div className="col-3">Price: ${item.price}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <p>Your order total: ${grandTotal}</p>
            </div>
            </div>
        </>
    );
};

export default PlaceOrder;

