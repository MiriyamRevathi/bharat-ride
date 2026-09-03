import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User, Phone, Shield, Lock, CheckCircle2, Save, Bus, KeyRound,
  AlertCircle, FileText
} from 'lucide-react';

export const DriverProfile: React.FC = () => {
  const {
    currentDriver,
    buses,
    updateDriverProfile,
    showToast
  } = useApp();

  if (!currentDriver) return null;

  const assignedBus = buses.find(
    b => b.driver_id === currentDriver.driver_id ||
         b.driver?.driver_id === currentDriver.driver_id ||
         (currentDriver.assigned_bus_id && b.id === currentDriver.assigned_bus_id)
  );

  const [name, setName] = useState(currentDriver.name);
  const [phone, setPhone] = useState(currentDriver.phone);
  const [licenseNumber, setLicenseNumber] = useState(currentDriver.license_number || '');
  const [status, setStatus] = useState(currentDriver.status || 'Active');

  // Password fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Driver Name cannot be empty.', 'error');
      return;
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    updateDriverProfile(currentDriver.driver_id, {
      name: name.trim(),
      phone: phone.trim(),
      license_number: licenseNumber.trim(),
      status: status as any
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    const expectedOld = currentDriver.password || 'driver123';
    if (oldPassword && oldPassword !== expectedOld) {
      setPasswordError('Current password does not match.');
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    updateDriverProfile(currentDriver.driver_id, {
      password: newPassword
    });

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            Authorized Personnel Settings
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Verified Driver
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Driver Profile &amp; Preferences
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your personal details, emergency mobile contact, driving license, and credentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Driver Overview Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-xs">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 to-orange-500 text-white font-black text-2xl flex items-center justify-center mb-4 shadow-md shadow-rose-950/20">
            {currentDriver.name.charAt(0)}
          </div>
          <h2 className="text-lg font-bold text-slate-900">{currentDriver.name}</h2>
          <span className="text-xs font-mono text-rose-600 mt-0.5">{currentDriver.driver_id}</span>

          <span
            className={`mt-3 text-xs font-bold px-3 py-1 rounded-full border ${
              currentDriver.status === 'Active'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : currentDriver.status === 'On Leave'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            Duty Status: {currentDriver.status}
          </span>

          <div className="w-full mt-6 pt-5 border-t border-slate-100 text-left text-xs space-y-3">
            <div>
              <span className="text-slate-500 block text-[11px]">Assigned Bus</span>
              <span className="font-bold text-slate-900">
                {assignedBus ? `${assignedBus.busNumber} (${assignedBus.name})` : 'None'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Fleet Type</span>
              <span className="font-semibold text-slate-700">
                {assignedBus?.type || 'Standard Intercity'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">License Number</span>
              <span className="font-mono text-slate-700">{currentDriver.license_number || 'DL-PENDING'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile & Change Password */}
        <div className="md:col-span-2 space-y-6">
          {/* Form 1: Profile Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-rose-600" />
              <span>Personal Information</span>
            </h3>

            <form onSubmit={handleSaveDetails} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                    Driver Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                    Commercial Driving License
                  </label>
                  <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="e.g. DL-AP-2018-00918"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                    Duty Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 cursor-pointer"
                  >
                    <option value="Active">Active (Ready for Trips)</option>
                    <option value="On Leave">On Leave (Temporary Leave)</option>
                    <option value="Inactive">Inactive (Off Duty)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile Details</span>
                </button>
              </div>
            </form>
          </div>

          {/* Form 2: Change Password */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-rose-600" />
              <span>Change Password</span>
            </h3>

            {passwordError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                  Current Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password (demo: driver123)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
