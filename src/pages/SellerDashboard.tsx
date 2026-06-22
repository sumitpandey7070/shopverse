import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { FiTrendingUp, FiPackage, FiDollarSign, FiStar, FiEdit2, FiTrash2, FiEye, FiPlus, FiSearch } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { products, revenueChartData, orders } from '@/data';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';

type SellerTab = 'overview' | 'products' | 'orders' | 'analytics';

const kpiCards = [
  { label: 'Total Revenue', value: '₹47.8L', change: '+18%', trend: 'up', icon: <FiDollarSign className="w-5 h-5" />, color: 'from-emerald-500 to-teal-500' },
  { label: 'Total Orders', value: '2,847', change: '+12%', trend: 'up', icon: <FiPackage className="w-5 h-5" />, color: 'from-blue-500 to-indigo-500' },
  { label: 'Products Listed', value: '48', change: '+4', trend: 'up', icon: <FiTrendingUp className="w-5 h-5" />, color: 'from-primary-500 to-violet-500' },
  { label: 'Avg. Rating', value: '4.9 ★', change: '+0.1', trend: 'up', icon: <FiStar className="w-5 h-5" />, color: 'from-amber-500 to-orange-500' },
];

const statusMap: Record<string, any> = {
  delivered: 'success', shipped: 'info', processing: 'warning', pending: 'dark', cancelled: 'danger',
};

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SellerTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const sellerProducts = products.slice(0, 8);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-glow-primary">
              <HiSparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-black dark:text-white text-slate-900">Seller Dashboard</h1>
          </div>
          <p className="dark:text-slate-400 text-slate-600 text-sm ml-14">Welcome back, Apple Official Store</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold text-sm hover:shadow-glow-primary transition-all">
          <FiPlus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 dark:bg-dark-card bg-slate-100 rounded-2xl w-fit mb-8 overflow-x-auto scrollbar-hide">
        {(['overview', 'products', 'orders', 'analytics'] as SellerTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-white dark:bg-dark-surface text-primary-500 shadow'
                : 'dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5 hover:shadow-card-dark transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4`}>
                    {card.icon}
                  </div>
                  <div className="text-2xl font-black dark:text-white text-slate-900 mb-1">{card.value}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs dark:text-slate-400 text-slate-600">{card.label}</div>
                    <span className={`text-xs font-bold ${card.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>{card.change}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
              <h3 className="font-bold dark:text-white text-slate-800 mb-6">Revenue Overview (2024)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ background: '#1c1c27', border: '1px solid #2a2a3d', borderRadius: '12px', color: '#fff' }}
                    formatter={(v: any) => [`₹${v.toLocaleString()}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#revGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Top Products */}
            <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
              <h3 className="font-bold dark:text-white text-slate-800 mb-4">Top Products</h3>
              <div className="space-y-3">
                {sellerProducts.slice(0, 5).map((p, i) => (
                  <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl dark:hover:bg-dark-surface hover:bg-slate-50 transition-colors">
                    <span className="w-5 text-xs dark:text-slate-500 text-slate-400 font-bold text-center">#{i + 1}</span>
                    <img src={p.thumbnail} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold dark:text-white text-slate-800 line-clamp-1">{p.name}</div>
                      <div className="text-xs dark:text-slate-400 text-slate-600">{p.reviewCount} reviews</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold dark:text-white text-slate-800">₹{p.price.toLocaleString()}</div>
                      <div className="text-xs text-emerald-400">{p.discount}% off</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-400 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2.5 dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 rounded-xl text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-bold hover:bg-primary-600 transition-colors whitespace-nowrap">
                <FiPlus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="dark:bg-dark-surface bg-slate-50 border-b dark:border-dark-border border-slate-200">
                    <tr>
                      {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-semibold dark:text-slate-300 text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-dark-border divide-slate-200">
                    {sellerProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                      <tr key={p.id} className="dark:hover:bg-dark-surface hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.thumbnail} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                            <div className="min-w-0">
                              <div className="font-semibold dark:text-white text-slate-800 line-clamp-1 text-xs">{p.name}</div>
                              <div className="text-xs dark:text-slate-400 text-slate-500">{p.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 dark:text-slate-400 text-slate-600 capitalize text-xs">{p.category}</td>
                        <td className="px-4 py-3 font-semibold dark:text-white text-slate-800 text-xs">₹{p.price.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${p.stock < 10 ? 'text-orange-400' : p.stock < 30 ? 'text-amber-400' : 'text-emerald-400'}`}>{p.stock}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-amber-400 text-xs">
                            ★ {p.rating}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={p.stock > 0 ? 'success' : 'danger'} size="xs">{p.stock > 0 ? 'Active' : 'Out of Stock'}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-primary-400 transition-colors">
                              <FiEdit2 className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-blue-400 transition-colors">
                              <FiEye className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-red-400 transition-colors">
                              <FiTrash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-lg font-bold dark:text-white text-slate-800 mb-5">Order Management</h2>
            <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="dark:bg-dark-surface bg-slate-50 border-b dark:border-dark-border border-slate-200">
                    <tr>
                      {['Order ID', 'Customer', 'Items', 'Total', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-semibold dark:text-slate-300 text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-dark-border divide-slate-200">
                    {orders.map(order => (
                      <tr key={order.id} className="dark:hover:bg-dark-surface hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs dark:text-slate-300 text-slate-700">{order.id}</td>
                        <td className="px-4 py-3 text-xs dark:text-slate-300 text-slate-700">{order.address.fullName}</td>
                        <td className="px-4 py-3 text-xs dark:text-slate-400 text-slate-600">{order.items.length} items</td>
                        <td className="px-4 py-3 font-bold dark:text-white text-slate-800 text-xs">₹{order.total.toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs dark:text-slate-400 text-slate-600">{new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</td>
                        <td className="px-4 py-3">
                          <Badge variant={statusMap[order.status] || 'dark'} size="xs" className="capitalize">{order.status.replace('_', ' ')}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-xs text-primary-400 hover:underline font-semibold">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
                <h3 className="font-bold dark:text-white text-slate-800 mb-4">Monthly Orders vs Revenue</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={revenueChartData.slice(-6)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#1c1c27', border: '1px solid #2a2a3d', borderRadius: '12px', color: '#fff' }} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="orders" fill="#6366f1" radius={[6, 6, 0, 0]} name="Orders" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
                <h3 className="font-bold dark:text-white text-slate-800 mb-4">Inventory Status</h3>
                <div className="space-y-3">
                  {sellerProducts.slice(0, 6).map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img src={p.thumbnail} alt={p.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold dark:text-white text-slate-800 line-clamp-1">{p.name}</div>
                        <div className="h-1.5 dark:bg-dark-muted bg-slate-200 rounded-full mt-1">
                          <div
                            className={`h-1.5 rounded-full ${p.stock < 10 ? 'bg-red-500' : p.stock < 30 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(100, (p.stock / 100) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${p.stock < 10 ? 'text-red-400' : p.stock < 30 ? 'text-amber-400' : 'text-emerald-400'}`}>{p.stock}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SellerDashboard;
