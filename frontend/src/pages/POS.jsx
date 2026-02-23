import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { fetchPosProducts, checkoutOrder } from '../api/pos';

const POS = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const items = await fetchPosProducts();
        if (mounted) setMenuItems(items);
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load menu items');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(menuItems.map(i => i.category))).filter(Boolean);
    return ['All', ...unique];
  }, [menuItems]);

  // Filter menu items based on category and search
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      // keep existing UI behavior: cart expects {id,name,price,image,category,quantity}
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Update item quantity
  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  const gst = subtotal * 0.05; // 5% GST
  const total = subtotal + gst;

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setCustomerName('');
  };

  // Print receipt (now also persists order + updates inventory)
  const printReceipt = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    try {
      await checkoutOrder({
        customerName: customerName || 'Walk-in Customer',
        gstRate: 0.05,
        payment: { method: 'CASH', amount: Number(total.toFixed(2)) },
        items: cart.map(i => ({ productId: i.id, quantity: i.quantity }))
      });
    } catch (e) {
      alert(e.message || 'Checkout failed');
      return;
    }

    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - Darshan Restaurants</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; }
            h1 { text-align: center; font-size: 24px; margin-bottom: 5px; }
            .subtitle { text-align: center; color: #666; margin-bottom: 20px; font-size: 14px; }
            .divider { border-top: 2px dashed #000; margin: 15px 0; }
            .info { margin-bottom: 15px; }
            .info strong { display: inline-block; width: 100px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th { text-align: left; padding: 8px 4px; border-bottom: 2px solid #000; font-size: 12px; }
            td { padding: 6px 4px; font-size: 12px; }
            .totals { margin-top: 15px; }
            .totals div { display: flex; justify-content: space-between; padding: 5px 0; }
            .total-line { border-top: 2px solid #000; padding-top: 10px; font-weight: bold; font-size: 16px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            @media print {
              body { padding: 10px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>🍽️ Darshan Restaurants</h1>
          <div class="subtitle">Billing & Inventory Management</div>
          <div class="divider"></div>

          <div class="info">
            <div><strong>Customer:</strong> ${customerName || 'Walk-in Customer'}</div>
            <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</div>
            <div><strong>Time:</strong> ${new Date().toLocaleTimeString('en-IN')}</div>
          </div>

          <div class="divider"></div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${cart.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: right;">₹${item.price}</td>
                  <td style="text-align: right;">₹${Number(item.price) * item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="divider"></div>

          <div class="totals">
            <div><span>Subtotal:</span><span>₹${subtotal.toFixed(2)}</span></div>
            <div><span>GST (5%):</span><span>₹${gst.toFixed(2)}</span></div>
            <div class="total-line"><span>Total:</span><span>₹${total.toFixed(2)}</span></div>
          </div>

          <div class="divider"></div>

          <div class="footer">
            <p>Thank you for dining with us!</p>
            <p>Visit us again soon!</p>
          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    receiptWindow.document.close();

    // optional: clear cart after checkout
    clearCart();
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] gap-6">
      {/* Left Panel - Menu Items */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Card padding="md" className="flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu Items</h2>

            {/* Search Bar */}
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            {loading && <p className="text-gray-500 text-sm mt-2">Loading menu...</p>}
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-primary-500 hover:shadow-md transition-all text-left"
                >
                  <div className="text-4xl mb-2">{item.image}</div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-primary-600">₹{item.price}</p>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Right Panel - Cart */}
      <div className="w-96 flex flex-col">
        <Card padding="md" className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Order</h2>

          {/* Customer Name */}
          <Input
            label="Customer Name"
            type="text"
            placeholder="Enter customer name (optional)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mb-4"
          />

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🛒</div>
                <p>Cart is empty</p>
                <p className="text-sm">Add items to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">₹{item.price} each</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <p className="font-bold text-gray-900">₹{Number(item.price) * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">GST (5%)</span>
              <span className="font-semibold">₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-primary-600">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 space-y-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={printReceipt}
              disabled={cart.length === 0}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Receipt
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={clearCart}
              disabled={cart.length === 0}
            >
              Clear Cart
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default POS;
