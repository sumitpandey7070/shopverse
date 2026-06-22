import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser, FiPackage, FiHeart, FiMapPin, FiSettings, FiEdit2,
  FiCamera, FiPhone, FiMail, FiCalendar, FiShield, FiLogOut
} from 'react-icons/fi';
import { orders, users } from '@/data';
import Badge from '@/components/ui/Badge';

type UserTab = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'settings';

const statusColors: Record<string, any> = {
  delivered: 'success', shipped: 'info', processing: 'warning', confirmed: 'primary',
  pending: 'dark', cancelled: 'danger', returned: 'danger', out_for_delivery: 'info',
};

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserTab>('profile');
  const user = users[0];

  const navItems: { key: UserTab; label: string; icon: React.ReactNode }[] = [
    { key: 'profile', label: 'My Profile', icon: <FiUser /> },
    { key: 'orders', label: 'My Orders', icon: <FiPackage /> },
    { key: 'wishlist', label: 'Wishlist', icon: <FiHeart /> },
    { key: 'addresses', label: 'Addresses', icon: <FiMapPin /> },
    { key: 'settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black dark:text-white text-slate-900">My Account</h1>
        <p className="dark:text-slate-400 text-slate-600 text-sm mt-1">Manage your profile, orders, and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          {/* Profile Card */}
          <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6 mb-4 text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl object-cover border-2 border-primary-500/30" />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-lg">
                <FiCamera className="w-3.5 h-3.5" />
              </button>
            </div>
            <h3 className="font-bold dark:text-white text-slate-800 text-base">{user.name}</h3>
            <p className="text-sm dark:text-slate-400 text-slate-600">{user.email}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <div className="text-center">
                <div className="font-bold dark:text-white text-slate-800">{user.orders}</div>
                <div className="text-xs dark:text-slate-400 text-slate-600">Orders</div>
              </div>
              <div className="w-px dark:bg-dark-border bg-slate-200" />
              <div className="text-center">
                <div className="font-bold dark:text-white text-slate-800">₹{(user.totalSpent / 1000).toFixed(0)}K</div>
                <div className="text-xs dark:text-slate-400 text-slate-600">Spent</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-all text-left border-l-2
                  ${activeTab === item.key
                    ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                    : 'border-transparent dark:text-slate-400 text-slate-600 dark:hover:bg-dark-surface hover:bg-slate-50 dark:hover:text-white hover:text-slate-900'
                  }`}
              >
                <span className={activeTab === item.key ? 'text-primary-400' : 'dark:text-slate-500 text-slate-400'}>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="border-t dark:border-dark-border border-slate-200">
              <button className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-400 dark:hover:bg-dark-surface hover:bg-slate-50 transition-all">
                <FiLogOut />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

            {activeTab === 'profile' && (
              <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold dark:text-white text-slate-800">Personal Information</h2>
                  <button className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-semibold">
                    <FiEdit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { icon: <FiUser />, label: 'Full Name', value: user.name },
                    { icon: <FiMail />, label: 'Email', value: user.email },
                    { icon: <FiPhone />, label: 'Phone', value: user.phone },
                    { icon: <FiCalendar />, label: 'Joined', value: new Date(user.joinedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) },
                  ].map(field => (
                    <div key={field.label} className="p-4 dark:bg-dark-surface bg-slate-50 rounded-2xl border dark:border-dark-border border-slate-200">
                      <div className="flex items-center gap-2 text-xs dark:text-slate-400 text-slate-500 mb-1">
                        <span>{field.icon}</span>
                        {field.label}
                      </div>
                      <div className="font-semibold dark:text-white text-slate-800">{field.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20 flex items-center gap-3">
                  <FiShield className="w-5 h-5 text-primary-400" />
                  <div>
                    <div className="text-sm font-semibold dark:text-white text-slate-800">Account Verified</div>
                    <div className="text-xs dark:text-slate-400 text-slate-600">Your email and phone are verified</div>
                  </div>
                  <Badge variant="success" className="ml-auto">Verified</Badge>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-bold dark:text-white text-slate-800 mb-4">My Orders</h2>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="font-bold dark:text-white text-slate-800 text-sm">Order #{order.id}</div>
                          <div className="text-xs dark:text-slate-400 text-slate-600 mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        <Badge variant={statusColors[order.status] || 'dark'} size="sm" className="capitalize">{order.status.replace('_', ' ')}</Badge>
                      </div>
                      <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-4">
                        {order.items.map(item => (
                          <div key={item.product.id} className="flex-shrink-0">
                            <img src={item.product.thumbnail} alt={item.product.name} className="w-14 h-14 rounded-xl object-cover border dark:border-dark-border border-slate-200" />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t dark:border-dark-border border-slate-200">
                        <div>
                          <div className="text-xs dark:text-slate-400 text-slate-600">{order.items.reduce((s, i) => s + i.quantity, 0)} items</div>
                          <div className="font-black dark:text-white text-slate-900">₹{order.total.toLocaleString()}</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-xs font-semibold dark:bg-dark-surface bg-slate-100 dark:text-slate-300 text-slate-700 rounded-xl hover:dark:bg-dark-muted hover:bg-slate-200 transition-colors">Track Order</button>
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 text-xs font-semibold text-primary-400 border border-primary-500/30 rounded-xl hover:bg-primary-500/10 transition-colors">Rate Products</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold dark:text-white text-slate-800">Saved Addresses</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-bold hover:bg-primary-600 transition-colors">
                    + Add New Address
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'a1', type: 'home', name: 'Arjun Sharma', address: '12, Linking Road, Bandra West, Mumbai 400050', isDefault: true },
                    { id: 'a2', type: 'work', name: 'Arjun Sharma', address: 'Plot 45, Sector 18, Noida 201301', isDefault: false },
                  ].map(addr => (
                    <div key={addr.id} className={`p-5 rounded-2xl border-2 transition-all ${addr.isDefault ? 'dark:border-primary-500/50 border-primary-400/50 dark:bg-primary-500/5 bg-primary-50/50' : 'dark:border-dark-border border-slate-200 dark:bg-dark-card bg-white'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm px-2 py-0.5 rounded-full capitalize font-semibold ${addr.type === 'home' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>{addr.type}</span>
                          {addr.isDefault && <Badge variant="primary" size="xs">Default</Badge>}
                        </div>
                        <button className="text-xs text-primary-400 hover:underline">Edit</button>
                      </div>
                      <div className="font-semibold dark:text-white text-slate-800 text-sm mb-1">{addr.name}</div>
                      <div className="text-sm dark:text-slate-400 text-slate-600">{addr.address}</div>
                      {!addr.isDefault && (
                        <button className="mt-3 text-xs text-primary-400 hover:underline">Set as Default</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6">
                <h2 className="text-lg font-bold dark:text-white text-slate-800 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  {[
                    { label: 'Email Notifications', desc: 'Receive order updates and promotions via email', enabled: true },
                    { label: 'SMS Notifications', desc: 'Receive order updates via SMS', enabled: true },
                    { label: 'Push Notifications', desc: 'Receive notifications in the app', enabled: false },
                    { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', enabled: false },
                    { label: 'Marketing Emails', desc: 'Receive personalised product recommendations', enabled: true },
                  ].map((setting, i) => (
                    <div key={setting.label} className={`flex items-center justify-between py-4 ${i < 4 ? 'border-b dark:border-dark-border border-slate-200' : ''}`}>
                      <div>
                        <div className="font-semibold dark:text-white text-slate-800 text-sm">{setting.label}</div>
                        <div className="text-xs dark:text-slate-400 text-slate-600 mt-0.5">{setting.desc}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-300 dark:bg-dark-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t dark:border-dark-border border-slate-200">
                  <button className="text-red-400 text-sm font-semibold hover:text-red-300 transition-colors">Delete Account</button>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="text-center py-12">
                <FiHeart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-2">Your Wishlist</h3>
                <p className="dark:text-slate-400 text-slate-600 mb-6">View and manage your saved items</p>
                <a href="/wishlist" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-colors">
                  View Wishlist
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
