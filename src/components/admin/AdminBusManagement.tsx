import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bus, BusType, Driver, DriverStatus } from '../../types';
import {
  Plus, Edit2, Trash2, Eye, User, X, Star, AlertCircle,
  CheckCircle2, Phone, ShieldCheck, ArrowRightLeft, UserMinus
} from 'lucide-react';

export const AdminBusManagement: React.FC = () => {
  const {
    buses,
    drivers,
    addBus,
    updateBus,
    deleteBus,
    assignDriverToBus,
    unassignDriverFromBus,
    updateDriver,
    addDriver,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [viewingBus, setViewingBus] = useState<Bus | null>(null);
  const [driverModalBus, setDriverModalBus] = useState<Bus | null>(null);
  const [deletingBusId, setDeletingBusId] = useState<string | null>(null);

  // Bus Form State
  const [name, setName] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [busType, setBusType] = useState<BusType>('AC Sleeper (2+1)');
  const [layoutType, setLayoutType] = useState<'seater_2_2' | 'sleeper_2_1'>('sleeper_2_1');
  const [totalSeats, setTotalSeats] = useState<number>(30);
  const [hasUpperDeck, setHasUpperDeck] = useState<boolean>(true);
  const [baseFare, setBaseFare] = useState<number>(850);
  const [amenitiesInput, setAmenitiesInput] = useState('AC, WiFi, Water Bottle, Blanket, USB Charging');
  const [cancellationPolicy, setCancellationPolicy] = useState('Free cancellation up to 12 hours before departure. 15% deduction within 12 hours.');

  // Driver Form State (for Add / Edit Bus)
  const [driverName, setDriverName] = useState('');
  const [driverId, setDriverId] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [driverStatus, setDriverStatus] = useState<DriverStatus>('Active');
  const [phoneError, setPhoneError] = useState('');

  // Driver Management Modal local state
  const [dmTab, setDmTab] = useState<'view' | 'edit' | 'assign'>('view');
  const [dmName, setDmName] = useState('');
  const [dmPhone, setDmPhone] = useState('');
  const [dmLicense, setDmLicense] = useState('');
  const [dmStatus, setDmStatus] = useState<DriverStatus>('Active');
  const [dmPhoneError, setDmPhoneError] = useState('');
  const [selectedAssignDriverId, setSelectedAssignDriverId] = useState('');

  // Helper to find driver for a bus
  const getBusDriver = (bus: Bus): Driver | undefined => {
    if (bus.driver && bus.driver.name) {
      return {
        driver_id: bus.driver.driver_id || bus.driver_id || '',
        name: bus.driver.name,
        phone: bus.driver.phone || '',
        license_number: bus.driver.license_number || '',
        status: bus.driver.status || 'Active',
        assigned_bus_id: bus.id
      };
    }
    const found = drivers.find(d => d.driver_id === bus.driver_id || d.assigned_bus_id === bus.id);
    return found;
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-()]/g, '');
    // Allow +91 or 10-digit mobile number format
    return /^(?:\+?\d{1,3})?[6-9]\d{9}$/.test(cleaned) || /^\+?\d{10,13}$/.test(cleaned);
  };

  const handleOpenAdd = () => {
    setName('');
    setBusNumber(`AP-07-BR-${Math.floor(1000 + Math.random() * 9000)}`);
    setOperator('Bharat Super Express');
    setBusType('AC Sleeper (2+1)');
    setLayoutType('sleeper_2_1');
    setTotalSeats(30);
    setHasUpperDeck(true);
    setBaseFare(850);
    setAmenitiesInput('AC, WiFi, Water Bottle, Blanket, USB Charging, Live GPS');
    setCancellationPolicy('Free cancellation up to 12 hours before departure. 15% deduction within 12 hours.');

    // Reset Driver fields with default new driver template
    const newDrvId = `DRV-${Math.floor(100 + Math.random() * 900)}`;
    setDriverId(newDrvId);
    setDriverName('');
    setDriverPhone('');
    setDriverLicense(`DL-AP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setDriverStatus('Active');
    setPhoneError('');

    setEditingBus(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (bus: Bus) => {
    setEditingBus(bus);
    setName(bus.name);
    setBusNumber(bus.busNumber);
    setOperator(bus.operator);
    setBusType(bus.busType);
    setLayoutType(bus.layoutType);
    setTotalSeats(bus.totalSeats);
    setHasUpperDeck(bus.hasUpperDeck);
    setBaseFare(bus.baseFare);
    setAmenitiesInput((bus.amenities || []).join(', '));
    setCancellationPolicy(bus.cancellationPolicy);

    // Populate driver fields from existing bus/driver
    const currentDriver = getBusDriver(bus);
    setDriverId(currentDriver?.driver_id || bus.driver_id || `DRV-${Math.floor(100 + Math.random() * 900)}`);
    setDriverName(currentDriver?.name || bus.driver?.name || '');
    setDriverPhone(currentDriver?.phone || bus.driver?.phone || '');
    setDriverLicense(currentDriver?.license_number || bus.driver?.license_number || '');
    setDriverStatus(currentDriver?.status || bus.driver?.status || 'Active');
    setPhoneError('');

    setIsAddModalOpen(true);
  };

  const handleQuickSelectExistingDriver = (dId: string) => {
    if (!dId) return;
    const d = drivers.find(drv => drv.driver_id === dId);
    if (d) {
      setDriverId(d.driver_id);
      setDriverName(d.name);
      setDriverPhone(d.phone);
      setDriverLicense(d.license_number);
      setDriverStatus(d.status);
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Bus Fields
    if (!name.trim() || !busNumber.trim() || !operator.trim()) {
      showToast('Please fill all required bus fields.', 'error');
      return;
    }

    // Validate Driver Details (Strict Requirement: Every bus must have an assigned driver)
    if (!driverName.trim()) {
      showToast('Driver Name is required. Every bus must have an assigned driver.', 'error');
      return;
    }

    if (!driverPhone.trim()) {
      setPhoneError('Driver Phone Number is required.');
      showToast('Driver Phone Number is required.', 'error');
      return;
    }

    if (!validatePhoneNumber(driverPhone)) {
      setPhoneError('Please enter a valid 10-digit phone number (e.g. +91 98765 43210).');
      showToast('Invalid driver phone number format.', 'error');
      return;
    }

    setPhoneError('');

    const amenities = amenitiesInput.split(',').map(a => a.trim()).filter(Boolean);
    const resolvedDriverId = driverId.trim() || `DRV-${Math.floor(100 + Math.random() * 900)}`;

    const driverPayload = {
      driver_id: resolvedDriverId,
      name: driverName.trim(),
      phone: driverPhone.trim(),
      license_number: driverLicense.trim() || `DL-2026-${resolvedDriverId}`,
      status: driverStatus
    };

    if (editingBus) {
      updateBus(editingBus.id, {
        name,
        busNumber,
        operator,
        busType,
        layoutType,
        totalSeats: Number(totalSeats),
        hasUpperDeck,
        baseFare: Number(baseFare),
        amenities,
        cancellationPolicy,
        driver_id: resolvedDriverId,
        driverId: resolvedDriverId,
        driver: driverPayload
      });
      showToast('Bus and driver details successfully updated.', 'success');
    } else {
      addBus({
        name,
        busNumber,
        operator,
        busType,
        layoutType,
        totalSeats: Number(totalSeats),
        hasUpperDeck,
        baseFare: Number(baseFare),
        amenities,
        cancellationPolicy,
        rating: 4.8,
        totalRatings: 120,
        status: 'ACTIVE',
        driver_id: resolvedDriverId,
        driverId: resolvedDriverId,
        driver: driverPayload
      });
      showToast('New bus registered with assigned driver.', 'success');
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingBusId) {
      deleteBus(deletingBusId);
      setDeletingBusId(null);
    }
  };

  const toggleStatus = (bus: Bus) => {
    const nextStatus = bus.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE';
    updateBus(bus.id, { status: nextStatus });
  };

  // Open Driver Management Modal for a specific bus
  const handleOpenDriverModal = (bus: Bus) => {
    setDriverModalBus(bus);
    const d = getBusDriver(bus);
    if (d) {
      setDmName(d.name);
      setDmPhone(d.phone);
      setDmLicense(d.license_number);
      setDmStatus(d.status);
    } else {
      setDmName('');
      setDmPhone('');
      setDmLicense('');
      setDmStatus('Active');
    }
    setDmPhoneError('');
    setSelectedAssignDriverId('');
    setDmTab('view');
  };

  const handleSaveDriverModalEdit = () => {
    if (!driverModalBus) return;
    if (!dmName.trim()) {
      showToast('Driver Name cannot be empty.', 'error');
      return;
    }
    if (!dmPhone.trim() || !validatePhoneNumber(dmPhone)) {
      setDmPhoneError('Please enter a valid 10-digit phone number.');
      showToast('Valid phone number is required.', 'error');
      return;
    }

    const currentDriver = getBusDriver(driverModalBus);
    const dId = currentDriver?.driver_id || driverModalBus.driver_id || `DRV-${Math.floor(100 + Math.random() * 900)}`;

    const updatedDriverObj: Driver = {
      driver_id: dId,
      name: dmName.trim(),
      phone: dmPhone.trim(),
      license_number: dmLicense.trim() || `DL-2026-${dId}`,
      status: dmStatus,
      assigned_bus_id: driverModalBus.id
    };

    updateDriver(dId, updatedDriverObj);
    updateBus(driverModalBus.id, {
      driver_id: dId,
      driverId: dId,
      driver: {
        driver_id: dId,
        name: updatedDriverObj.name,
        phone: updatedDriverObj.phone,
        license_number: updatedDriverObj.license_number,
        status: updatedDriverObj.status
      }
    });

    // Update modal bus reference
    setDriverModalBus(prev => prev ? {
      ...prev,
      driver_id: dId,
      driver: updatedDriverObj
    } : null);

    setDmTab('view');
    showToast('Driver details updated successfully.', 'success');
  };

  const handleAssignSelectedDriver = () => {
    if (!driverModalBus || !selectedAssignDriverId) {
      showToast('Please select a driver to assign.', 'error');
      return;
    }
    const targetDriver = drivers.find(d => d.driver_id === selectedAssignDriverId);
    if (!targetDriver) return;

    assignDriverToBus(driverModalBus.id, targetDriver);

    setDriverModalBus(prev => prev ? {
      ...prev,
      driver_id: targetDriver.driver_id,
      driver: targetDriver
    } : null);

    setDmName(targetDriver.name);
    setDmPhone(targetDriver.phone);
    setDmLicense(targetDriver.license_number);
    setDmStatus(targetDriver.status);
    setDmTab('view');
    showToast(`Assigned ${targetDriver.name} to ${driverModalBus.name}.`, 'success');
  };

  const handleRemoveDriverFromBus = () => {
    if (!driverModalBus) return;
    unassignDriverFromBus(driverModalBus.id);
    setDriverModalBus(prev => prev ? {
      ...prev,
      driver_id: undefined,
      driverId: undefined,
      driver: undefined
    } : null);
    showToast('Driver removed from bus. Please assign a new driver to this fleet bus.', 'info');
  };

  const filteredBuses = buses.filter(b => {
    const d = getBusDriver(b);
    return (
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.busType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d?.name && d.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (d?.phone && d.phone.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const busBeingDeleted = deletingBusId ? buses.find(b => b.id === deletingBusId) : null;
  const deletingBusDriver = busBeingDeleted ? getBusDriver(busBeingDeleted) : null;

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Bus Fleet Management</h1>
          <p className="text-xs text-slate-500">Manage fleet vehicles, assigned drivers, capacity layouts and operational status.</p>
        </div>

        <button
          id="btn-add-new-bus"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bus</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
        <input
          id="input-search-bus-fleet"
          type="text"
          placeholder="Search bus name, reg number, driver name, phone..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full sm:w-96 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-rose-500"
        />
        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono shrink-0">
          <span>{filteredBuses.length} Fleet Vehicles</span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-slate-500">{drivers.length} Registered Drivers</span>
        </div>
      </div>

      {/* Buses Master Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Bus Name &amp; Operator</th>
                <th className="p-4">Registration</th>
                <th className="p-4">Driver</th>
                <th className="p-4">Coach Type</th>
                <th className="p-4">Berths / Seats</th>
                <th className="p-4">Base Fare</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBuses.map(bus => {
                const driver = getBusDriver(bus);
                return (
                  <tr key={bus.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{bus.name}</div>
                      <div className="text-[11px] text-slate-500">{bus.operator}</div>
                    </td>
                    <td className="p-4 font-mono font-bold text-rose-600">
                      {bus.busNumber}
                    </td>
                    <td className="p-4">
                      {driver ? (
                        <div className="space-y-0.5">
                          <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                            <span>{driver.name}</span>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                              driver.status === 'Active' ? 'bg-emerald-500' :
                              driver.status === 'On Leave' ? 'bg-amber-500' : 'bg-rose-500'
                            }`} title={`Driver: ${driver.status}`} />
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {driver.phone}
                          </div>
                        </div>
                      ) : (
                        <span className="text-rose-600 text-[11px] italic flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" /> Unassigned
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {bus.busType}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-900">{bus.totalSeats}</span>
                      <span className="text-slate-400 text-[10px] block">
                        {bus.hasUpperDeck ? 'Lower + Upper Deck' : 'Single Deck'}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900 text-sm">
                      ₹{bus.baseFare}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(bus)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          bus.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {bus.status}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Bus Action */}
                        <button
                          id={`btn-view-bus-${bus.id}`}
                          onClick={() => setViewingBus(bus)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
                          title="View Bus & Driver Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Driver Action */}
                        <button
                          id={`btn-driver-mgmt-${bus.id}`}
                          onClick={() => handleOpenDriverModal(bus)}
                          className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Manage Driver for this Bus"
                        >
                          <User className="w-3 h-3" />
                          <span>Driver</span>
                        </button>

                        {/* Edit Bus Action */}
                        <button
                          id={`btn-edit-bus-${bus.id}`}
                          onClick={() => handleOpenEdit(bus)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
                          title="Edit Bus"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Bus Action */}
                        <button
                          id={`btn-delete-bus-${bus.id}`}
                          onClick={() => setDeletingBusId(bus.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 cursor-pointer transition-colors"
                          title="Delete Bus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================== */}
      {/* ADD / EDIT BUS MODAL (Includes required DRIVER DETAILS) */}
      {/* ====================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-slate-900">
                {editingBus ? 'Edit Bus Configuration' : 'Add New Bus'}
              </h3>
              <button
                id="btn-close-bus-modal"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* SECTION: BUS DETAILS */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  Bus Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Bus Name *</label>
                    <input
                      id="input-bus-name"
                      type="text"
                      required
                      placeholder="e.g. Bharat Express Multi-Axle"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Registration Number *</label>
                    <input
                      id="input-bus-registration"
                      type="text"
                      required
                      placeholder="e.g. AP-07-TJ-9988"
                      value={busNumber}
                      onChange={e => setBusNumber(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-semibold focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Operator Name *</label>
                    <input
                      id="input-bus-operator"
                      type="text"
                      required
                      placeholder="e.g. Bharat Super Express"
                      value={operator}
                      onChange={e => setOperator(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Coach Type Category</label>
                    <select
                      id="select-bus-type"
                      value={busType}
                      onChange={e => setBusType(e.target.value as BusType)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold cursor-pointer"
                    >
                      <option value="AC Sleeper (2+1)">AC Sleeper (2+1)</option>
                      <option value="Volvo Multi-Axle AC Sleeper">Volvo Multi-Axle AC Sleeper</option>
                      <option value="BharatBenz AC Sleeper">BharatBenz AC Sleeper</option>
                      <option value="Electric AC Sleeper">Electric AC Sleeper (EV)</option>
                      <option value="AC Seater (2+2)">AC Seater (2+2)</option>
                      <option value="Non-AC Seater (2+2)">Non-AC Seater (2+2)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Layout Topology</label>
                    <select
                      id="select-layout-type"
                      value={layoutType}
                      onChange={e => setLayoutType(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold cursor-pointer"
                    >
                      <option value="sleeper_2_1">2+1 Sleeper Berths</option>
                      <option value="seater_2_2">2+2 Pushback Seats</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Total Capacity *</label>
                    <input
                      id="input-total-seats"
                      type="number"
                      required
                      min={12}
                      max={60}
                      value={totalSeats}
                      onChange={e => setTotalSeats(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Base Fare (₹) *</label>
                    <input
                      id="input-base-fare"
                      type="number"
                      required
                      min={200}
                      max={5000}
                      value={baseFare}
                      onChange={e => setBaseFare(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Amenities (Comma separated)</label>
                  <input
                    id="input-amenities"
                    type="text"
                    value={amenitiesInput}
                    onChange={e => setAmenitiesInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Cancellation Policy Text</label>
                  <textarea
                    id="textarea-cancellation-policy"
                    rows={2}
                    value={cancellationPolicy}
                    onChange={e => setCancellationPolicy(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  ></textarea>
                </div>
              </div>

              {/* SECTION: DRIVER DETAILS (REQUIRED) */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Driver Details</span>
                    <span className="text-[10px] text-slate-400 font-normal normal-case">(Every bus must have an assigned driver)</span>
                  </h4>

                  {/* Optional Quick Pick from existing registered drivers */}
                  {drivers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">Or pick existing:</span>
                      <select
                        id="select-existing-driver"
                        onChange={e => handleQuickSelectExistingDriver(e.target.value)}
                        defaultValue=""
                        className="p-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-700 cursor-pointer"
                      >
                        <option value="">Select registered driver...</option>
                        {drivers.map(d => (
                          <option key={d.driver_id} value={d.driver_id}>
                            {d.name} ({d.phone}) - {d.status}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Driver Name *</label>
                    <input
                      id="input-driver-name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={driverName}
                      onChange={e => setDriverName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Driver ID</label>
                    <input
                      id="input-driver-id"
                      type="text"
                      placeholder="e.g. DRV-101"
                      value={driverId}
                      onChange={e => setDriverId(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-semibold focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Phone Number *</label>
                    <input
                      id="input-driver-phone"
                      type="text"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={driverPhone}
                      onChange={e => {
                        setDriverPhone(e.target.value);
                        if (phoneError) setPhoneError('');
                      }}
                      className={`w-full p-2.5 bg-slate-50 border rounded-xl text-slate-900 font-mono font-semibold focus:outline-hidden ${
                        phoneError ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-rose-500'
                      }`}
                    />
                    {phoneError && (
                      <p className="text-rose-500 text-[10px] mt-1 font-medium">{phoneError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Driver License Number</label>
                    <input
                      id="input-driver-license"
                      type="text"
                      placeholder="e.g. DL-AP-2026-009"
                      value={driverLicense}
                      onChange={e => setDriverLicense(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-semibold focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold uppercase mb-1">Driver Status</label>
                    <select
                      id="select-driver-status"
                      value={driverStatus}
                      onChange={e => setDriverStatus(e.target.value as DriverStatus)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  id="btn-cancel-bus-form"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-submit-bus-form"
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
                >
                  {editingBus ? 'Save Changes' : 'Register Bus & Assign Driver'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* DRIVER MANAGEMENT MODAL (View, Edit, Assign, Remove)  */}
      {/* ====================================================== */}
      {driverModalBus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-rose-600" />
                  <span>Driver Management</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Bus: <span className="text-slate-900 font-semibold">{driverModalBus.name}</span> ({driverModalBus.busNumber})
                </p>
              </div>
              <button
                id="btn-close-driver-modal"
                onClick={() => setDriverModalBus(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs inside Driver Modal */}
            <div className="flex gap-2 border-b border-slate-100 pb-2 text-xs">
              <button
                onClick={() => setDmTab('view')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                  dmTab === 'view' ? 'bg-rose-600 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                View Driver
              </button>
              <button
                onClick={() => {
                  const d = getBusDriver(driverModalBus);
                  if (d) {
                    setDmName(d.name);
                    setDmPhone(d.phone);
                    setDmLicense(d.license_number);
                    setDmStatus(d.status);
                  }
                  setDmTab('edit');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                  dmTab === 'edit' ? 'bg-rose-600 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Edit Driver Details
              </button>
              <button
                onClick={() => setDmTab('assign')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                  dmTab === 'assign' ? 'bg-rose-600 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Change / Assign Driver
              </button>
            </div>

            {/* TAB 1: VIEW DRIVER DETAILS */}
            {dmTab === 'view' && (
              <div className="space-y-4">
                {getBusDriver(driverModalBus) ? (
                  (() => {
                    const d = getBusDriver(driverModalBus)!;
                    return (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-base font-bold text-slate-900">{d.name}</div>
                            <div className="text-xs font-mono text-rose-600">{d.driver_id}</div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            d.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            d.status === 'On Leave' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {d.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Phone Number</span>
                            <span className="font-mono text-slate-800">{d.phone}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase font-semibold block">License Number</span>
                            <span className="font-mono text-slate-800">{d.license_number || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Assigned Bus</span>
                            <span className="text-slate-800">{driverModalBus.name}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Reg Number</span>
                            <span className="font-mono text-rose-600">{driverModalBus.busNumber}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                          <button
                            onClick={handleRemoveDriverFromBus}
                            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            title="Unassign this driver from the bus"
                          >
                            <UserMinus className="w-3.5 h-3.5" />
                            <span>Unassign Driver</span>
                          </button>

                          <button
                            onClick={() => setDmTab('edit')}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Details</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
                    <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
                    <p className="text-xs text-slate-600">
                      No driver currently assigned to this bus. Every fleet vehicle requires an assigned driver.
                    </p>
                    <button
                      onClick={() => setDmTab('assign')}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Assign a Driver Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EDIT DRIVER DETAILS */}
            {dmTab === 'edit' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Driver Name *</label>
                  <input
                    type="text"
                    required
                    value={dmName}
                    onChange={e => setDmName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={dmPhone}
                    onChange={e => {
                      setDmPhone(e.target.value);
                      if (dmPhoneError) setDmPhoneError('');
                    }}
                    className={`w-full p-2.5 bg-slate-50 border rounded-xl text-slate-900 font-mono font-semibold focus:outline-hidden ${
                      dmPhoneError ? 'border-rose-500' : 'border-slate-200 focus:border-rose-500'
                    }`}
                  />
                  {dmPhoneError && (
                    <p className="text-rose-500 text-[10px] mt-1 font-medium">{dmPhoneError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Driver License Number</label>
                  <input
                    type="text"
                    value={dmLicense}
                    onChange={e => setDmLicense(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-semibold focus:border-rose-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold uppercase mb-1">Driver Status</label>
                  <select
                    value={dmStatus}
                    onChange={e => setDmStatus(e.target.value as DriverStatus)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDmTab('view')}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDriverModalEdit}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                  >
                    Save Driver Details
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: ASSIGN / CHANGE DRIVER */}
            {dmTab === 'assign' && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-500 text-[11px]">
                  Select a registered driver from the system to assign to this bus:
                </p>

                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {drivers.map(d => {
                    const isCurrent = d.driver_id === driverModalBus.driver_id || d.assigned_bus_id === driverModalBus.id;
                    const isSelected = selectedAssignDriverId === d.driver_id;
                    return (
                      <div
                        key={d.driver_id}
                        onClick={() => setSelectedAssignDriverId(d.driver_id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-rose-50 border-rose-500'
                            : isCurrent
                            ? 'bg-slate-50 border-slate-300'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{d.name}</span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {d.driver_id} • {d.phone} • {d.license_number}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            d.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                            d.status === 'On Leave' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {d.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDmTab('view')}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!selectedAssignDriverId}
                    onClick={handleAssignSelectedDriver}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl cursor-pointer shadow-xs"
                  >
                    Confirm Driver Assignment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* VIEW BUS MODAL (Full Bus and Driver Details)           */}
      {/* ====================================================== */}
      {viewingBus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">{viewingBus.name}</h3>
                <p className="text-xs font-mono text-rose-600">{viewingBus.busNumber} • {viewingBus.operator}</p>
              </div>
              <button
                id="btn-close-view-bus"
                onClick={() => setViewingBus(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bus Specifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600">Bus Information</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Coach Type</span>
                  <span className="text-slate-800 font-medium">{viewingBus.busType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Layout</span>
                  <span className="text-slate-800 font-medium">{viewingBus.layoutType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Total Capacity</span>
                  <span className="text-slate-800 font-medium">{viewingBus.totalSeats} seats</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Base Fare</span>
                  <span className="text-slate-900 font-bold">₹{viewingBus.baseFare}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Fleet Status</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold inline-block ${
                    viewingBus.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {viewingBus.status}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Rating</span>
                  <span className="text-rose-600 font-bold">{viewingBus.rating} / 5.0</span>
                </div>
              </div>

              {viewingBus.amenities && viewingBus.amenities.length > 0 && (
                <div className="text-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold mb-1">Amenities</span>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingBus.amenities.map((a, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Assigned Driver Details */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Assigned Driver Information</span>
              </h4>

              {(() => {
                const d = getBusDriver(viewingBus);
                if (!d) {
                  return (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                      No driver assigned to this vehicle.
                    </div>
                  );
                }
                return (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{d.name}</div>
                        <div className="text-[11px] font-mono text-rose-600">{d.driver_id}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        d.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        d.status === 'On Leave' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {d.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Contact Number</span>
                        <span className="font-mono text-slate-800">{d.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">License Number</span>
                        <span className="font-mono text-slate-800">{d.license_number || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  const b = viewingBus;
                  setViewingBus(null);
                  handleOpenDriverModal(b);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Manage Driver
              </button>
              <button
                onClick={() => setViewingBus(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* DELETE CONFIRMATION MODAL (Includes Driver Information)*/}
      {/* ====================================================== */}
      {deletingBusId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Confirm Bus Deletion</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to remove this bus from the fleet? Associated schedules will also be affected.
            </p>

            {busBeingDeleted && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-2">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Vehicle</span>
                  <span className="font-bold text-slate-900">{busBeingDeleted.name}</span>{' '}
                  <span className="font-mono text-rose-600">({busBeingDeleted.busNumber})</span>
                </div>

                {deletingBusDriver && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Assigned Driver</span>
                    <div className="font-medium text-slate-900">{deletingBusDriver.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Phone: {deletingBusDriver.phone} {deletingBusDriver.license_number && `• License: ${deletingBusDriver.license_number}`}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                id="btn-cancel-delete-bus"
                onClick={() => setDeletingBusId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn-confirm-delete-bus"
                onClick={handleDeleteConfirm}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Delete Bus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
