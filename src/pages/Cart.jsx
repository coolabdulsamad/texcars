import { useSelector, useDispatch } from 'react-redux';
import { InputNumber } from 'antd';
import { removeFromCart, changeCartQuantity } from '../features/reducers/cartSlice'; // Adjust path if needed
import { ASSETS } from '../assets';
import {
  RiDeleteBin5Line,
  RiHeart2Line
} from 'react-icons/ri';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FaPaypal } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cartItems]);

  return (
    <main className='space-y-10'>
      <section className="relative px-4 h-[40vh] bg-primary">
        <img src={ASSETS['lamborghini_ash_car']} alt="Contact Us" className="opacity-40 absolute top-0 left-0 h-full w-full object-cover object-center" />
      </section>

      <section className="px-10">
        <div className="container mx-auto grid md:grid-cols-3 gap-4">
          <aside className="md:col-span-2 divide-y divide-slate-50">
            <div className="flex justify-between items-center py-3 px-4 md:px-6">
              <h3 className="text-lg md:text-xl font-semibold">Shopping Cart</h3>
              <p className="text-text text-xs font-light">{cartItems.length} items</p>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-text text-center py-4">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <figure key={index} className="py-4 px-2 md:px-4 flex gap-2 text-text">
                  <img
                    src={item.image || ASSETS['default_car_image']}
                    alt={item.name}
                    className="w-8 sm:w-10 md:w-12 rounded-sm object-cover"
                  />
                  <div className="relative py-2 flex-1">
                    <h3 className="text-primary/80 text-sm md:text-base font-medium">{item.name}</h3>
                    <p className="text-text text-xs font-medium">&#8358;{parseFloat(item.price).toLocaleString()}</p>
                  </div>
                  <div className="relative space-y-1 flex-1">
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => {
                        dispatch(changeCartQuantity({ id: item.id, quantity: value }));
                      }}
                      className='max-w-10 md:max-w-12'
                    />
                    <p
                      className="mt-2 text-text text-xs font-medium leading-2 flex items-center gap-2 cursor-pointer"
                      onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    >
                      <RiDeleteBin5Line /> Remove
                    </p>
                    <p className="text-text text-xs font-medium leading-2 flex items-center gap-2 cursor-pointer">
                      <RiHeart2Line /> Save for later
                    </p>
                  </div>
                  <p className="text-primary/80 text-sm font-semibold">
                    &#8358;{(item.price * item.quantity).toLocaleString()}
                  </p>
                </figure>
              ))
            )}
          </aside>

          <aside className="flex gap-4 flex-col">
            <div className="flex item-center py-4 px-4 bg-white rounded-md shadow-md flex-col max-auto w-full h-full">
              <h3 className="text-lg md:text-xl font-semibold px-5">Order Summary</h3>
              <hr className="my-4 mx-5 border-slate-500" />
              <div className="flex item-center py-4 gap-4 flex-col w-full">
                <div className="flex justify-between items-center px-5 w-full">
                  <h3 className="text-primary/80 text-sm font-semibold">
                    Item subtotal ({cartItems.length})
                  </h3>
                  <p className="text-black font-bold">&#8358;{total.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center px-5 w-full">
                  <h3 className="text-primary/80 text-sm font-semibold">Delivery</h3>
                  <p className="text-black font-bold">Free</p>
                </div>
              </div>

              <div className="flex px-5 py-4 w-full flex-col gap-5">
                <div className="flex gap-2 flex-col">
                  <div className="flex items-center">
                    <input type="radio" id="standard" name="delivery" defaultChecked />
                    <label htmlFor="standard" className="ml-2 text-sm text-gray-900 mt-[-7px]">
                      Free - Standard delivery
                    </label>
                  </div>
                  <span className="text-[12px] text-primary/70 px-5 mt-[-5px]">
                    Shipment may take 5-6 business days.
                  </span>
                </div>

                <div className="flex gap-2 flex-col">
                  <div className="flex items-center">
                    <input type="radio" id="express" name="delivery" />
                    <label htmlFor="express" className="ml-2 text-sm text-gray-900 mt-[-7px]">
                      &#8358;7.99 - Express delivery
                    </label>
                  </div>
                  <span className="text-[12px] text-primary/70 px-5 mt-[-5px]">
                    Shipment may take 2-3 business days.
                  </span>
                </div>
              </div>

              <hr className="my-4 mx-5 border-slate-500" />

              <div className="flex item-center py-4 gap-4 flex-col w-full">
                <div className="flex justify-between items-center px-5 w-full">
                  <h3 className="text-primary/80 text-sm font-semibold">Estimated tax</h3>
                  <p className="text-black font-bold">--</p>
                </div>
                <div className="flex justify-between items-center px-5 w-full">
                  <h3 className="text-primary/80 text-sm font-semibold">Total</h3>
                  <p className="text-black font-bold">&#8358;{total.toLocaleString()}</p>
                </div>

                <div className="flex gap-5 px-5 py-5">
                  <button className='bg-secondary hover:bg-primary p-3 text-[15px] pr-10 pl-10 text-white rounded-4xl'>
                    Checkout
                  </button>
                  <button className='bg-amber-50 p-3 text-[15px] pr-10 pl-10 text-white rounded-4xl flex hover:text-white'>
                    <FaPaypal className='text-primary mt-1.5 hover:text-white' />
                    <span className='text-xl text-blue-600 ml-1.5 hover:text-blue-600/100'>Pay</span>
                    <span className='text-primary mt-1.5'>Pal</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex item-center py-4 px-4 bg-white rounded-md shadow-md max-auto w-full h-full">
              <h2 className="text-primary px-3 font-bold">Promo code?</h2>
              <AiOutlineQuestionCircle className='mt-1' />
            </div>
            <div className="flex item-center py-4 gap-2 max-auto w-full h-full">
              <div className="relative ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute top-0 left-0 text-gray-600">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" strokeWidth="2" className="absolute top-2 left-3 text-red-500">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3 className="text-primary/80 font-bold text-[13px] ml-8">Need Help?</h3>
              <h3 className="text-primary text-[13px] border-b border-dotted border-primary">Chat now</h3>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
