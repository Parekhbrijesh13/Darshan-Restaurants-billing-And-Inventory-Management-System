import React from 'react';
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { dashboardStats, salesData, categorySales, monthlySales } from '../data/salesData';

const Dashboard = () => {

  const COLORS = ['#10b981', '#0ea5e9', '#f59e0b', '#8b5cf6', '#ef4444'];

  const statCards = [
    {
      title: "Today's Sales",
      value: `₹${dashboardStats.todaySales.toLocaleString()}`,
      change: '+12.5%',
      icon: '💰',
      bg: 'from-emerald-500 to-lime-500',
    },
    {
      title: "Today's Orders",
      value: dashboardStats.todayOrders,
      change: '+8.3%',
      icon: '📋',
      bg: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Active Orders',
      value: dashboardStats.activeOrders,
      change: 'In Progress',
      icon: '🔄',
      bg: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'Low Stock Items',
      value: dashboardStats.lowStockItems,
      change: 'Alert',
      icon: '⚠️',
      bg: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-emerald-50 min-h-screen">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Welcome back! Here's what's happening today in your restaurant.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            padding="md"
            hover
            className="rounded-2xl shadow-sm border border-emerald-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs mt-1 text-emerald-600 font-medium">
                  {stat.change}
                </p>
              </div>

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.bg} flex items-center justify-center text-2xl text-white shadow-md`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sales Trend */}
        <Card
          title="Sales Trend (Last 7 Days)"
          padding="md"
          className="rounded-2xl shadow-sm border border-emerald-100 bg-white"
        >
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric'
                    })
                  }
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => `₹${value.toLocaleString()}`}
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString('en-IN')
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  name="Sales (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Sales */}
        <Card
          title="Sales by Category"
          padding="md"
          className="rounded-2xl shadow-sm border border-emerald-100 bg-white"
        >
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySales}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {categorySales.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value}%`,
                    props.payload.name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Monthly Sales */}
        <Card
          title="Monthly Sales Comparison"
          padding="md"
          className="lg:col-span-2 rounded-2xl shadow-sm border border-emerald-100 bg-white"
        >
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Bar
                  dataKey="sales"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                  name="Sales (₹)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card
          title="Quick Stats"
          padding="md"
          className="rounded-2xl shadow-sm border border-emerald-100 bg-white"
        >
          <div className="space-y-4">

            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-xl font-bold text-gray-900">
                  {dashboardStats.totalCustomers}
                </p>
              </div>
              <div className="text-2xl">👥</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-xl font-bold text-gray-900">
                  ₹{dashboardStats.avgOrderValue}
                </p>
              </div>
              <div className="text-2xl">💳</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <div>
                <p className="text-sm text-gray-600">Today's Orders</p>
                <p className="text-xl font-bold text-gray-900">
                  {dashboardStats.todayOrders}
                </p>
              </div>
              <div className="text-2xl">📦</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
              <div>
                <p className="text-sm text-red-600 font-medium">
                  Low Stock Alert
                </p>
                <p className="text-xl font-bold text-red-700">
                  {dashboardStats.lowStockItems} Items
                </p>
              </div>
              <div className="text-2xl">⚠️</div>
            </div>

          </div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;