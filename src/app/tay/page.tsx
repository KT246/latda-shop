"use client";
import { useState, useEffect, useRef } from "react";

const Cart = () => {
  // Giả sử giỏ hàng của bạn có 1 mảng sản phẩm
  const [cartItems, setCartItems] = useState<{ name: string; price: number }[]>(
    []
  );
  const cartEndRef = useRef<HTMLDivElement | null>(null); // Để tham chiếu đến vị trí cuối cùng trong giỏ hàng

  // Hàm thêm sản phẩm mới vào giỏ hàng
  interface Product {
    name: string;
    price: number;
  }

  const addToCart = (product: Product): void => {
    setCartItems((prevItems) => {
      const updatedCart: Product[] = [...prevItems, product];
      return updatedCart;
    });
  };

  // Cuộn giỏ hàng xuống mỗi khi có sản phẩm mới
  useEffect(() => {
    if (cartItems.length > 0) {
      cartEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [cartItems]);

  return (
    <div className="max-h-[400px] overflow-y-auto border p-4">
      <h2 className="text-xl font-semibold">Your Cart</h2>
      <ul className="list-none p-0 m-0">
        {cartItems.map((item, index) => (
          <li key={index} className="py-2 border-b">
            {item.name} - ${item.price.toFixed(2)} {/* Hiển thị tên và giá */}
          </li>
        ))}
        <div ref={cartEndRef} />{" "}
        {/* Vị trí để cuộn xuống khi có sản phẩm mới */}
      </ul>
      <button
        onClick={() => addToCart({ name: "Product A", price: 20 })}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Product A ($20)
      </button>
      <button
        onClick={() => addToCart({ name: "Product B", price: 35 })}
        className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
      >
        Add Product B ($35)
      </button>
    </div>
  );
};

export default Cart;
