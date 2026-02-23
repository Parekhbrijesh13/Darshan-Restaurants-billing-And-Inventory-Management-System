import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const AddProductPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center relative z-10 -mt-6">

        {/* Left Side Design Panel */}
       <div className="hidden md:flex flex-col justify-center space-y-6 p-10 bg-gradient-to-br from-emerald-600 via-green-600 to-lime-500 text-white rounded-3xl shadow-xl">

         <div className="text-6xl">🍽️</div>

         <h1 className="text-4xl font-semibold tracking-wide">
           Add New Dish
         </h1>

         <p className="text-white/90 text-sm leading-relaxed">
           Create and manage your restaurant menu items effortlessly.
           Update pricing, availability and presentation in one place.
         </p>

         <div className="mt-4 h-[2px] w-16 bg-white/70 rounded-full"></div>

         <p className="text-xs text-white/80">
           Fresh • Quality • Taste
         </p>

       </div>

        {/* Form Card */}
        <Card className="p-8 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md border border-gray-100 transition-all duration-300">

          <div className="mb-10 text-center">
            <div className="backdrop-blur-md bg-white/60 border border-emerald-100 shadow-lg rounded-2xl px-8 py-5 inline-block">

              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
                Product Details
              </h2>

              <p className="text-emerald-600 text-sm mt-2">
                Fill all required fields carefully
              </p>

              <div className="mt-4 h-[3px] w-24 bg-gradient-to-r from-emerald-600 to-lime-500 mx-auto rounded-full"></div>
            </div>
          </div>

          <AddProductForm />
        </Card>
      </div>
    </div>
  );
};

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    category_id: "",
    sku: "",
    name: "",
    description: "",
    price: "",
    image_emoji: "",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: formData.category_id,
          sku: formData.sku,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          imageEmoji: formData.image_emoji,
          active: formData.active,
        }),
      });

      await response.json();
      alert("Product added successfully!");

      setFormData({
        category_id: "",
        sku: "",
        name: "",
        description: "",
        price: "",
        image_emoji: "",
        active: true,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Category */}
        <div>
          <label className="text-gray-600 text-sm font-medium mb-1 block">
            Category ID
          </label>
          <Input
            type="number"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            placeholder="Enter Category ID"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="text-gray-600 text-sm font-medium mb-1 block">
            SKU
          </label>
          <Input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Stock Keeping Unit"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>

        {/* Name */}
        <div>
          <label className="text-gray-600 text-sm font-medium mb-1 block">
            Product Name
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-gray-600 text-sm font-medium mb-1 block">
            Price
          </label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="₹ Price"
            step="0.01"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>

        {/* Image Emoji */}
        <div>
          <label className="text-gray-600 text-sm font-medium mb-1 block">
            Image Emoji
          </label>
          <Input
            type="text"
            name="image_emoji"
            value={formData.image_emoji}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>

        {/* Active */}
        <div className="flex items-center mt-6 space-x-3">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-400"
          />
          <label className="text-gray-700 text-sm font-medium">
            Product Active
          </label>
        </div>

      </div>

      {/* Description */}
      <div>
        <label className="text-gray-600 text-sm font-medium mb-1 block">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Optional description"
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 text-sm resize-none"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        className="w-full py-3 text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
      >
        Add Product
      </Button>
    </form>
  );
};

export default AddProductPage;