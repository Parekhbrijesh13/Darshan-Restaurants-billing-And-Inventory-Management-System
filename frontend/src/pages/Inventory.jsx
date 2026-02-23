import React, { useState, useEffect, useMemo } from "react";
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { fetchInventory } from "../api/inventory";
import { deleteInventory } from "../api/inventory";
import { updateInventory } from "../api/inventory";
import { addInventory } from "../api/inventory";

const Inventory = () => {

  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("");
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    quantity: '',
    unit: '',
    reorderLevel: '',
    price: '',
    active: true
  });

    /*const [formData, setFormData] = useState({
      name: "",
      active: true
    });*/

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetchInventory()
      .then(data => {
        setInventory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Inventory fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Dynamic categories
  const inventoryCategories = useMemo(() => {
    const unique = new Set(inventory.map(item => item.category));
    return ['All', ...unique];
  }, [inventory]);

  // Filter inventory
  const filteredInventory = inventory.filter(item => {
    const matchesSearch =
      item.productName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Low stock count
  const lowStockCount = inventory.filter(
    item => item.quantity <= item.lowStockThreshold
  ).length;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      productName: item.productName,
      category: item.category,
      quantity: item.quantity.toString(),
      unit: item.unit || '',
      lowStockThreshold: item.lowStockThreshold.toString(),
      price: item.price?.toString() || '',
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      category: '',
      quantity: '',
      unit: '',
      lowStockThreshold: '',
      price: '',
    });
    setSelectedItem(null);
  };

  if (loading) {
    return <div className="p-6">Loading inventory...</div>;
  }

const handleAddItem = async (e) => {
  e.preventDefault();

  try {
    const data = await addInventory(
      selectedProductId,
      quantity,
      lowStockThreshold
    );

    console.log("Created:", data);

    alert("Inventory added successfully");
    setShowAddModal(false);

  } catch (error) {
    console.error("Add failed:", error);
    alert(error.message);
  }
};
const handleEditItem = (item) => {
  setSelectedItem(item);
  setShowEditModal(true);
};

const handleDeleteItem = async (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  try {
    await deleteInventory(productId);

    // Remove from UI instantly
    setInventory(prev =>
      prev.filter(item => item.productId !== productId)
    );

  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete item");
  }
};

const handleAddCategory = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8081/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Category added successfully!");
      setFormData({ name: "", active: true });
    } else {
      alert("Failed to add category");
    }

  } catch (error) {
    console.error("Error:", error);
  }
};
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-emerald-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
            Inventory Management
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your restaurant inventory efficiently
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          {/* Add Inventory - Primary Action */}
          <Button
            className="flex items-center gap-2
                       px-5 py-2.5 text-sm font-medium
                       bg-emerald-600 text-white
                       hover:bg-emerald-700
                       shadow-md hover:shadow-lg
                       transition-all duration-200
                       rounded-lg"
            onClick={() => setShowAddModal(true)}
          >
            <span className="text-lg">📦</span>
            Add Inventory
          </Button>

          {/* Add Category - Secondary Action */}
          <Button
            className="flex items-center gap-2
                       px-5 py-2.5 text-sm font-medium
                       bg-emerald-50 text-emerald-700
                       border border-emerald-200
                       hover:bg-emerald-600 hover:text-white
                       hover:border-emerald-600
                       shadow-sm hover:shadow-md
                       transition-all duration-200
                       rounded-lg"
            onClick={() => setShowAddCategoryModal(true)}
          >
            <span className="text-lg">🏷️</span>
            Add Category
          </Button>

        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <span className="font-medium text-red-600">
            ⚠️ {lowStockCount} items are low in stock
          </span>
          <span className="text-xs text-red-400">Check immediately</span>
        </div>
      )}

      {/* Filters */}
      <Card padding="md" className="rounded-2xl shadow-sm border border-emerald-100 bg-white">
        <h2 className="text-lg font-semibold text-emerald-700 mb-4">
          Search & Filter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={inventoryCategories.map(cat => ({ value: cat, label: cat }))}
          />
        </div>
      </Card>

      {/* Table */}
      <Card padding="none" className="rounded-2xl shadow-sm border border-emerald-100 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {filteredInventory.map(item => (
                <tr key={item.productId} className="hover:bg-emerald-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{item.productName}</td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-gray-700">{item.quantity}</td>
                  <td className="px-6 py-4 text-gray-700">{item.lowStockThreshold}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        item.quantity <= item.lowStockThreshold
                          ? "danger"
                          : "success"
                      }
                    >
                      {item.quantity <= item.lowStockThreshold
                        ? "Low Stock"
                        : "In Stock"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <div className="flex items-center gap-3">

                      {/* Edit Button */}
                      <Button
                        size="sm"
                        className="flex items-center gap-2 px-4 py-2
                                   bg-emerald-50 text-emerald-700
                                   border border-emerald-200
                                   hover:bg-emerald-600 hover:text-white
                                   hover:border-emerald-600
                                   transition-all duration-200
                                   shadow-sm hover:shadow-md rounded-lg"
                        onClick={() => openEditModal(item)}
                      >
                        ✏️ Edit
                      </Button>

                      {/* Delete Button */}
                      <Button
                        size="sm"
                        className="flex items-center gap-2 px-4 py-2
                                   bg-gray-50 text-gray-600
                                   border border-gray-200
                                   hover:bg-red-600 hover:text-white
                                   hover:border-red-600
                                   transition-all duration-200
                                   shadow-sm hover:shadow-md rounded-lg"
                        onClick={() => handleDeleteItem(item.productId)}
                      >
                        🗑 Delete
                      </Button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>


      {/* Add Item Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Inventory Item"
        size="md"
      >
        <form onSubmit={handleAddItem} className="space-y-4">

          <Input
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter item name"
            required
          />

          <Input
            label="Category ID"
            name="categoryId"
            type="number"
            value={formData.categoryId}
            onChange={handleInputChange}
            placeholder="Enter category ID"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="0"
              required
            />
            <Input
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              placeholder="e.g., kg, pcs"
              required
            />
          </div>

          <Input
            label="Reorder Level"
            name="reorderLevel"
            type="number"
            value={formData.reorderLevel}
            onChange={handleInputChange}
            placeholder="Minimum quantity"
            required
          />

          <Input
            label="Price (₹)"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0.00"
            required
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              Add Item
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>

        </form>
      </Modal>


      {/* Add category Modal */}
            <Modal
              isOpen={showCategoryModal}
              onClose={() => {
                setShowAddCategoryModal(false);
                resetForm();
              }}
              title="Add New Category Item"
              size="md"
            >

                    <form onSubmit={handleAddCategory} className="space-y-4">
                      {/* Name */}
                      <Input
                        label="Category Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter category name"
                        required
                      />

                      {/* Active Checkbox */}
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="active"
                          checked={formData.active}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        <label className="text-gray-700 font-medium">Active</label>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button type="submit" variant="primary" className="flex-1">
                          Add Category
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            resetForm();
                            if (onCancel) onCancel();
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
            </Modal>



      {/* Edit Item Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        title="Edit Inventory Item"
        size="md"
      >
        <form onSubmit={handleEditItem} className="space-y-4">
          <Input
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter item name"
            required
          />
          
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            options={inventoryCategories.filter(cat => cat !== 'All').map(cat => ({ value: cat, label: cat }))}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="0"
              required
            />
            <Input
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              placeholder="e.g., pieces, kg, plates"
              required
            />
          </div>
          
          <Input
            label="Reorder Level"
            name="reorderLevel"
            type="number"
            value={formData.reorderLevel}
            onChange={handleInputChange}
            placeholder="Minimum quantity threshold"
            required
          />
          
          <Input
            label="Price (₹)"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0.00"
            required
          />
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowEditModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Inventory;
