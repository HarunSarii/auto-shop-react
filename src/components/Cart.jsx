import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/slices/CartSlice";

const Cart = ({ cartItems }) => {
  const dispatch = useDispatch();

  const addToCartButton = (product) => {
    dispatch(addToCart(product));
  };

  const decreaseCart = (product) => {
    dispatch(removeFromCart(product.id));
  };

  const totalPrice = cartItems?.reduce((total, product) => {
    return total + parseFloat(product.price) * product.quantity;
  }, 0);
  return (
    <div className="container">
      <div>
        {cartItems?.length === 0 ? (
          <div className="">
            <div className="">
              <p className="text-muted text-sm p-2">
                There is no product to show in your cart!
              </p>
            </div>
          </div>
        ) : (
          <>
            {cartItems?.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between w-100 p-2 bg-white shadow-sm text-black"
              >
                <div className="d-flex flex-column">
                  <p className="text-dark small mb-0 ">{item.name}</p>
                  <p className="text-primary small">{item.price}₺</p>
                </div>
                <div className="d-flex align-items-baseline p-1">
                  <span
                    className="cursor-pointer bg-gray-200 rounded-md p-1 shadow-md"
                    onClick={() => decreaseCart(item)}
                  >
                    &#8722;
                  </span>{" "}
                  <p className="text-dark mx-2">{item.quantity}</p>
                  <span
                    className="cursor-pointer bg-gray-200 rounded-md p-1 shadow-md"
                    onClick={() => addToCartButton(item)}
                  >
                    &#43;
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="mt-3">
        {totalPrice === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 p-2 bg-white shadow-sm text-black">
            {/* <h1 className="text-black">Add some products</h1> */}
          </div>
        ) : (
          <div className="d-flex flex-column justify-between w-100 p-2 bg-white shadow-sm text-black">
            <p className="text-black">
              Total Price:
              <span className="text-primary font-weight-bold ml-2">
                {totalPrice}₺
              </span>
            </p>
            <button className="btn btn-primary btn-block mt-3">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
