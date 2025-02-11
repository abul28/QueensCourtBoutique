import React from "react";
import { Menu, Search, ShoppingCart, X, Heart, Crown } from "lucide-react";
import "./BodyContent.css";

const clothesData = [
  { id: 1, name: "Silk Saree", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://www.jyothisareemandir.com/cdn/shop/files/rn-image_picker_lib_temp_488826cd-74e7-40dc-a188-ab23a858997d.jpg?v=1736504633" },
  { id: 2, name: "Silk Saree", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://mavuris.com/cdn/shop/files/1000015961_2.jpg?v=1735733097&width=533" },
  { id: 3, name: "Silk Saree", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://www.jyothisareemandir.com/cdn/shop/files/rn-image_picker_lib_temp_a08305b9-59f2-4782-b8ba-50056ab743c6.jpg?v=1735197884" },
  { id: 4, name: "Silk Saree", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://assets.ajio.com/medias/sys_master/root/20240628/lBmS/667e34b21d763220fa5a4e3f/-473Wx593H-461874940-blue-MODEL.jpg" },
  { id: 5, name: "Silk Saree", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://fcity.in/images/products/81285299/3vpl6_512.jpg" },
  { id: 6, name: "Silk Saree", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpTaFgPvJqH2tnuKRSXRb6ihPm3vEU3VKjt2agsZRm9xG4yl4rxpv936lG6PbbduafZ6o&usqp=CAU" },
  { id: 7, name: "Silk Saree", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://images.meesho.com/images/products/214260009/zi58r_512.jpg" },
  { id: 8, name: "Silk Saree", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/sari/b/z/f/free-danko-opara-silk-saree-pure-cotton-sarees-for-summer-daily-original-imagkf2yjxzb9hnt.jpeg?q=20&crop=false" },
  { id: 9, name: "chidithar", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/sari/q/a/j/free-salini-aquiliq-unstitched-original-imagqhhhmghypzr4.jpeg?q=20&crop=false" },
  { id: 10, name: "tops", description: "Pure Banarasi Silk Saree", color: "Pink", price: "₹759", originalPrice: "₹1,899", discount: "60% off", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9K_Jz0TkOkymftOL0YcaeWZM7gwilaNZwQmsy69cvHrl7oJv589Vm41XJSyjTNA-a_y8&usqp=CAU" },
];

const BodyContent = ({ searchQuery }) => {
  // Filter products based on search query
  const filteredProducts = clothesData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Replace this link with your actual WhatsApp group invite link
  const whatsappGroupLink = " https://chat.whatsapp.com/BBkmScIBR1y0fZbLiP2WsI ";

  const handlePurchaseClick = () => {
    if (whatsappGroupLink) {
      window.open(whatsappGroupLink, "_blank");
    } else {
      alert("WhatsApp group link is not set.");
    }
  };

  return (
    <div className="clothes-container">
      <h2 className="section-title">Explore Our Collection</h2>
      <div className="card-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
          <div key={item.id} className="clothing-card">
            <div className="flex">
            <img src={item.image} alt={item.name} className="card-image" />
            {/* Wishlist Icons */}
              <Heart className="icon wishlist-icon" title="Wishlist" />
            </div>          
            <div className="card-info">
              <h3 className="product-name">{item.name}</h3>
              <p className="product-description">{item.description}</p>
              <p className="color-info">{item.color}</p>
              <div className="price-info">
                <span className="current-price">{item.price}</span>
                <span className="original-price">{item.originalPrice}</span>
                <span className="discount">{item.discount}</span>
                <button className="purchase-button" onClick={handlePurchaseClick}>Purchase</button>
              </div>
            </div>
          </div>
          ))
        ) : (
          <div className="search-filter-alert"><p>No products found for "{searchQuery}"</p></div>
        )}
      </div>
    </div>
  );
};

export default BodyContent;
