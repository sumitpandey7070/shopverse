import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import {
  FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiSearch,
  FiEdit2, FiTrash2, FiEye, FiCheck, FiX, FiBarChart2, FiShield, FiSettings
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { users, sellers, products, revenueChartData, categoryChartData } from '@/data';
import Badge from '@/components/ui/Badge';

type AdminTab = 'overview' | 'users' | 'sellers' | 'products' | 'reports';

const PIE_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#f59e0b', '#10b981', '#64748b'];

const statsCards = [
  { label: 'Total Users', value: '2.4M', change: '+8.2%', icon: <FiUsers className="w-5 h-5" />, color: 'from-blue-500 to-indigo-600' },
  { label: 'Active Sellers', value: '48,271', change: '+12.4%', icon: <FiShoppingBag className="w-5 h-5" />, color: 'from-primary-500 to-violet-600' },
  { label: 'Total Products', value: '9.8M', change: '+5.1%', icon: <FiBarChart2 className="w-5 h-5" />, color: 'from-emerald-500 to-teal-600' },
  { label: 'Monthly Revenue', value: '₹13.5Cr', change: '+22.3%', icon: <FiDollarSign className="w-5 h-5" />, color: 'from-amber-500 to-orange-600' },
  { label: 'Pending Approvals', value: '127', change: '+23', icon: <FiShield className="w-5 h-5" />, color: 'from-rose-500 to-red-600' },
  { label: 'Platform Growth', value: '35.8%', change: 'YoY', icon: <FiTrendingUp className="w-5 h-5" />, color: 'from-cyan-500 to-blue-600' },
];

const roleColors: Record<string, any> = { customer: 'info', seller: 'primary', admin: 'danger' };
const statusColors: Record<string, any> = { active: 'success', inactive: 'dark', suspended: 'danger' };

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <FiShield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-black dark:text-white text-slate-900">Admin Dashboard</h1>
          </div>
          <p className="dark:text-slate-400 text-slate-600 text-sm ml-14">ShopVerse Control Center · Last updated just now</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 rounded-xl text-sm font-medium dark:text-slate-300 text-slate-700 hover:border-primary-500/50 transition-all">
            <FiSettings className="w-4 h-4" />
            Settings
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold text-sm hover:shadow-glow-primary transition-all">
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 dark:bg-dark-card bg-slate-100 rounded-2xl w-fit mb-8 overflow-x-auto scrollbar-hide">
        {(['overview', 'users', 'sellers', 'products', 'reports'] as AdminTab[]).map(tab => (
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
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {statsCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-4 hover:shadow-card-dark transition-all"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-3`}>
                    {card.icon}
                  </div>
                  <div className="text-xl font-black dark:text-white text-slate-900">{card.value}</div>
                  <div className="text-xs dark:text-slate-400 text-slate-600 mt-0.5">{card.label}</div>
                  <div className="text-xs text-emerald-400 font-semibold mt-1">{card.change}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Line Chart */}
              <div className="lg:col-span-2 dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
                <h3 className="font-bold dark:text-white text-slate-800 mb-5">Platform Revenue 2024</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip
                      contentStyle={{ background: '#1c1c27', border: '1px solid #2a2a3d', borderRadius: '12px', color: '#fff' }}
                      formatter={(v: any) => [`₹${v.toLocaleString()}`, 'Revenue']}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3, fill: '#6366f1' }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Pie */}
              <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
                <h3 className="font-bold dark:text-white text-slate-800 mb-5">Sales by Category</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={categoryChartData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {categoryChartData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1c1c27', border: '1px solid #2a2a3d', borderRadius: '12px', color: '#fff' }}
                      formatter={(v: any) => [`${v}%`, 'Share']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {categoryChartData.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                        <span className="dark:text-slate-400 text-slate-600">{d.name}</span>
                      </div>
                      <span className="font-semibold dark:text-white text-slate-800">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold dark:text-white text-slate-800">Pending Seller Approvals</h3>
                <Badge variant="warning">3 pending</Badge>
              </div>
              <div className="space-y-3">
                {sellers.filter(s => s.status === 'pending').map(seller => (
                  <div key={seller.id} className="flex items-center gap-4 p-4 dark:bg-dark-surface bg-slate-50 rounded-2xl border dark:border-dark-border border-slate-200">
                    <img src={seller.avatar} alt={seller.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold dark:text-white text-slate-800 text-sm">{seller.storeName}</div>
                      <div className="text-xs dark:text-slate-400 text-slate-600">{seller.email}</div>
                    </div>
                    <Badge variant="warning" size="xs">Pending Review</Badge>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-400 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-9 pr-4 py-2.5 dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 rounded-xl text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                />
              </div>
            </div>
            <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="dark:bg-dark-surface bg-slate-50 border-b dark:border-dark-border border-slate-200">
                    <tr>
                      {['User', 'Email', 'Role', 'Orders', 'Spent', 'Joined', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-semibold dark:text-slate-300 text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-dark-border divide-slate-200">
                    {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())).map(user => (
                      <tr key={user.id} className="dark:hover:bg-dark-surface hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover" />
                            <span className="font-semibold dark:text-white text-slate-800 text-xs">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs dark:text-slate-400 text-slate-600">{user.email}</td>
                        <td className="px-4 py-3"><Badge variant={roleColors[user.role]} size="xs" className="capitalize">{user.role}</Badge></td>
                        <td className="px-4 py-3 text-xs dark:text-slate-300 text-slate-700">{user.orders}</td>
                        <td className="px-4 py-3 text-xs dark:text-slate-300 text-slate-700">₹{user.totalSpent.toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs dark:text-slate-400 text-slate-600">{new Date(user.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</td>
                        <td className="px-4 py-3"><Badge variant={statusColors[user.status]} size="xs" className="capitalize">{user.status}</Badge></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-primary-400 transition-colors">
                              <FiEye className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-amber-400 transition-colors">
                              <FiEdit2 className="w-3.5 h-3.5" />
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

        {activeTab === 'sellers' && (
          <div>
            <h2 className="text-lg font-bold dark:text-white text-slate-800 mb-5">Seller Management</h2>
            <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="dark:bg-dark-surface bg-slate-50 border-b dark:border-dark-border border-slate-200">
                    <tr>
                      {['Seller', 'Store', 'Products', 'Orders', 'Revenue', 'Rating', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-semibold dark:text-slate-300 text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-dark-border divide-slate-200">
                    {sellers.map(seller => (
                      <tr key={seller.id} className="dark:hover:bg-dark-surface hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={seller.avatar} alt={seller.name} className="w-8 h-8 rounded-xl object-cover" />
                            <div>
                              <div className="font-semibold dark:text-white text-slate-800 text-xs">{seller.name}</div>
                              {seller.verified && <span className="text-xs text-emerald-400">✓ Verified</span>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs dark:text-slate-400 text-slate-600">{seller.storeName}</td>
                        <td className="px-4 py-3 text-xs dark:text-slate-300 text-slate-700">{seller.totalProducts}</td>
                        <td className="px-4 py-3 text-xs dark:text-slate-300 text-slate-700">{seller.totalOrders.toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs font-bold dark:text-white text-slate-800">₹{(seller.totalRevenue / 100000).toFixed(1)}L</td>
                        <td className="px-4 py-3 text-xs text-amber-400 font-bold">★ {seller.rating}</td>
                        <td className="px-4 py-3"><Badge variant={seller.status === 'active' ? 'success' : seller.status === 'pending' ? 'warning' : 'danger'} size="xs" className="capitalize">{seller.status}</Badge></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {seller.status === 'pending' ? (
                              <>
                                <button className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"><FiCheck className="w-3.5 h-3.5" /></button>
                                <button className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><FiX className="w-3.5 h-3.5" /></button>
                              </>
                            ) : (
                              <>
                                <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-primary-400 transition-colors"><FiEye className="w-3.5 h-3.5" /></button>
                                <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-red-400 transition-colors"><FiTrash2 className="w-3.5 h-3.5" /></button>
                              </>
                            )}
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

        {activeTab === 'products' && (
          <div>
            <h2 className="text-lg font-bold dark:text-white text-slate-800 mb-5">Product Management</h2>
            <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="dark:bg-dark-surface bg-slate-50 border-b dark:border-dark-border border-slate-200">
                    <tr>
                      {['Product', 'Brand', 'Category', 'Price', 'Discount', 'Stock', 'Rating', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-semibold dark:text-slate-300 text-slate-700 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-dark-border divide-slate-200">
                    {products.slice(0, 10).map(p => (
                      <tr key={p.id} className="dark:hover:bg-dark-surface hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.thumbnail} alt={p.name} className="w-8 h-8 rounded-xl object-cover" />
                            <span className="font-semibold dark:text-white text-slate-800 line-clamp-1 text-xs max-w-[150px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs dark:text-slate-400 text-slate-600">{p.brand}</td>
                        <td className="px-4 py-3 text-xs dark:text-slate-400 text-slate-600 capitalize">{p.category}</td>
                        <td className="px-4 py-3 font-bold dark:text-white text-slate-800 text-xs">₹{p.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs text-emerald-400 font-bold">{p.discount}%</td>
                        <td className="px-4 py-3 text-xs dark:text-slate-300 text-slate-700">{p.stock}</td>
                        <td className="px-4 py-3 text-xs text-amber-400 font-bold">★ {p.rating}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-primary-400 transition-colors"><FiEye className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-amber-400 transition-colors"><FiEdit2 className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded-lg dark:hover:bg-dark-muted hover:bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-red-400 transition-colors"><FiTrash2 className="w-3.5 h-3.5" /></button>
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

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
                <h3 className="font-bold dark:text-white text-slate-800 mb-5">Growth Trend</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={revenueChartData}>
                    <defs>
                      <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#1c1c27', border: '1px solid #2a2a3d', borderRadius: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="orders" stroke="#10b981" fill="url(#growthGrad)" strokeWidth={2} name="Orders" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
                <h3 className="font-bold dark:text-white text-slate-800 mb-5">Quick Reports</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Revenue Report — June 2024', format: 'CSV', size: '2.4 MB' },
                    { label: 'User Analytics Q2 2024', format: 'PDF', size: '1.8 MB' },
                    { label: 'Seller Performance Report', format: 'XLSX', size: '4.1 MB' },
                    { label: 'Product Inventory Audit', format: 'CSV', size: '0.9 MB' },
                    { label: 'Customer Satisfaction Survey', format: 'PDF', size: '3.2 MB' },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between p-3 dark:bg-dark-surface bg-slate-50 rounded-xl border dark:border-dark-border border-slate-200">
                      <div>
                        <div className="text-sm font-medium dark:text-white text-slate-800">{r.label}</div>
                        <div className="text-xs dark:text-slate-500 text-slate-400">{r.format} · {r.size}</div>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-bold text-primary-400 border border-primary-500/30 rounded-lg hover:bg-primary-500/10 transition-colors">
                        Download
                      </button>
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

export default AdminDashboard;
