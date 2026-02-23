import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Settings = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Darshan Restaurants',
    address: '123 Food Street, Mumbai, Maharashtra 400001',
    phone: '+91 98765 43210',
    email: 'info@darshanrestaurants.com',
    gstNumber: '27AABCD1234E1Z5',
  });

  const [userProfile, setUserProfile] = useState({
    fullName: 'Admin User',
    email: localStorage.getItem('userEmail') || 'admin@darshanrestaurants.com',
    phone: '+91 98765 43210',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [systemSettings, setSystemSettings] = useState({
    currency: 'INR',
    taxRate: '5',
    lowStockThreshold: '20',
    orderPrefix: 'ORD',
  });

  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurantInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSystemChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings(prev => ({ ...prev, [name]: value }));
  };

  const saveRestaurantInfo = (e) => {
    e.preventDefault();
    alert('Restaurant information updated successfully!');
  };

  const saveUserProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('userEmail', userProfile.email);
    alert('Profile updated successfully!');
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const saveSystemSettings = (e) => {
    e.preventDefault();
    alert('System settings updated successfully!');
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-lime-500 p-6 rounded-2xl shadow-lg text-white">
        <h1 className="text-3xl font-bold">Restaurant Settings</h1>
        <p className="text-emerald-100 mt-1">
          Manage your restaurant profile, system preferences and security.
        </p>
      </div>

      {/* Restaurant Information */}
      <Card padding="lg" className="shadow-md border border-emerald-100">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          🍽️ Restaurant Information
        </h2>

        <form onSubmit={saveRestaurantInfo} className="space-y-4">
          <Input label="Restaurant Name" name="name" value={restaurantInfo.name} onChange={handleRestaurantChange} required />
          <Input label="Address" name="address" value={restaurantInfo.address} onChange={handleRestaurantChange} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Phone Number" name="phone" type="tel" value={restaurantInfo.phone} onChange={handleRestaurantChange} required />
            <Input label="Email Address" name="email" type="email" value={restaurantInfo.email} onChange={handleRestaurantChange} required />
          </div>

          <Input label="GST Number" name="gstNumber" value={restaurantInfo.gstNumber} onChange={handleRestaurantChange} required />

          <div className="flex justify-end">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Restaurant Info
            </Button>
          </div>
        </form>
      </Card>

      {/* User Profile */}
      <Card padding="lg" className="shadow-md border border-emerald-100">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          👤 User Profile
        </h2>

        <form onSubmit={saveUserProfile} className="space-y-4">
          <Input label="Full Name" name="fullName" value={userProfile.fullName} onChange={handleProfileChange} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email Address" name="email" type="email" value={userProfile.email} onChange={handleProfileChange} required />
            <Input label="Phone Number" name="phone" type="tel" value={userProfile.phone} onChange={handleProfileChange} required />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Update Profile
            </Button>
          </div>
        </form>
      </Card>

      {/* Change Password */}
      <Card padding="lg" className="shadow-md border border-emerald-100">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          🔐 Change Password
        </h2>

        <form onSubmit={changePassword} className="space-y-4">
          <Input label="Current Password" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
          <Input label="New Password" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} required />
          <Input label="Confirm New Password" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} required />

          <div className="flex justify-end">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Change Password
            </Button>
          </div>
        </form>
      </Card>

      {/* System Settings */}
      <Card padding="lg" className="shadow-md border border-emerald-100">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          ⚙️ System Settings
        </h2>

        <form onSubmit={saveSystemSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Currency" name="currency" value={systemSettings.currency} onChange={handleSystemChange} required />
            <Input label="Tax Rate (%)" name="taxRate" type="number" step="0.01" value={systemSettings.taxRate} onChange={handleSystemChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Low Stock Threshold" name="lowStockThreshold" type="number" value={systemSettings.lowStockThreshold} onChange={handleSystemChange} required />
            <Input label="Order ID Prefix" name="orderPrefix" value={systemSettings.orderPrefix} onChange={handleSystemChange} required />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save System Settings
            </Button>
          </div>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card padding="lg" className="shadow-md border border-red-200 bg-red-50">
        <h2 className="text-xl font-semibold text-red-700 mb-4">
          🚨 Danger Zone
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
            <div>
              <p className="font-medium text-red-900">Clear All Data</p>
              <p className="text-sm text-red-600">Delete all orders, customers and inventory data.</p>
            </div>
            <Button variant="danger">
              Clear Data
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
            <div>
              <p className="font-medium text-red-900">Reset Application</p>
              <p className="text-sm text-red-600">Reset all settings to default values.</p>
            </div>
            <Button variant="danger">
              Reset Settings
            </Button>
          </div>
        </div>
      </Card>

    </div>
  );
};

export default Settings;