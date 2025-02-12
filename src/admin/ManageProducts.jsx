// src/components/ManageProducts.js
import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/Firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, } from "@firebase/firestore";
import "./ManageProducts.css";

const imgbbAPIKey = "4bb18285639da8bf34011af33da014a6";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    color: "",
    originalPrice: "",
    discount: "",
    price: "",
    imageUrl: "",
    id: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productsArray);
    };
    fetchProducts();
  }, []);

  // Calculate the price after discount
  useEffect(() => {
    const { originalPrice, discount } = newProduct;
    if (originalPrice && discount) {
      const discountAmount = (originalPrice * discount) / 100;
      const discountedPrice = originalPrice - discountAmount;
      setNewProduct((prev) => ({
        ...prev,
        price: discountedPrice.toFixed(2),
      }));
    } else {
      setNewProduct((prev) => ({ ...prev, price: "" }));
    }
  }, [newProduct.originalPrice, newProduct.discount]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle image upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to ImgBB and get URL
  const uploadImageToImgBB = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return "";
    }
  };

  // Add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      // Upload image to ImgBB
      if (imageFile) {
        imageUrl = await uploadImageToImgBB();
      }

      await addDoc(collection(firestore, "products"), {
        ...newProduct,
        imageUrl,
      });

      setNewProduct({
        name: "",
        description: "",
        color: "",
        originalPrice: "",
        discount: "",
        price: "",
        imageUrl: "",
      });
      setImageFile(null);
      setImagePreview("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Edit a product
  const handleEditProduct = (product) => {
    setNewProduct(product);
    setImagePreview(product.imageUrl);
    setIsEditing(true);
  };

  // Update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      let updatedImageUrl = newProduct.imageUrl;

      if (imageFile) {
        updatedImageUrl = await uploadImageToImgBB();
      }

      const productRef = doc(firestore, "products", newProduct.id);
      await updateDoc(productRef, {
        ...newProduct,
        imageUrl: updatedImageUrl,
      });

      setIsEditing(false);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(firestore, "products", id));
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-management-container">
      <h2>Manage Products</h2>
      <form onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={newProduct.color}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={newProduct.originalPrice}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={newProduct.discount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
          readOnly
        />
        <input type="file" onChange={handleImageUpload} />
        {imagePreview && (
          <img src={imagePreview} alt="Product Preview" className="preview" />
        )}
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.name}</h4>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="thumbnail"
            /> <br/>
            <button className="action-buttons edit" onClick={() => handleEditProduct(product)}>Edit</button>
            <button className="action-buttons delete" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
