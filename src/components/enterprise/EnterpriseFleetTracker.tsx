import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Activity, AlertTriangle, CheckCircle, Clock, Database, MapPin, RefreshCw, Search, Shield, Zap } from 'lucide-react';

export interface EnterpriseFleetTrackerProps {
  title?: string;
  operatorId?: string;
  refreshIntervalMs?: number;
  onStateChange?: (state: any) => void;
  theme?: 'light' | 'dark' | 'system';
}

export const EnterpriseFleetTracker: React.FC<EnterpriseFleetTrackerProps> = ({
  title = 'Enterprise Management Dashboard',
  operatorId = 'OP_GLOBAL_001',
  refreshIntervalMs = 5000,
  onStateChange,
  theme = 'light',
}}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<any>({ total: 1250, active: 980, alerts: 14, efficiency: 94.8 });

  const mockDataItems = useMemo(() => {
    return Array.from({ length: 40 }).map((_, idx) => ({
      id: `ITEM_${idx + 1}`,
      name: `Resource Node ${idx + 1}`,
      category: idx % 2 === 0 ? 'PRIMARY' : 'SECONDARY',
      status: idx % 5 === 0 ? 'WARNING' : idx % 7 === 0 ? 'CRITICAL' : 'OPERATIONAL',
      score: Math.floor(Math.random() * 40) + 60,
      lastUpdated: new Date().toLocaleTimeString(),
      details: `Detailed metadata for resource node ${idx + 1} operating under ${operatorId}`,
    }));
  }, [operatorId]);

  const filteredItems = useMemo(() => {
    return mockDataItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [mockDataItems, searchQuery, filterStatus]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setMetrics((prev: any) => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 5),
        efficiency: +(prev.efficiency + (Math.random() * 0.4 - 0.2)).toFixed(1),
      }));
      setLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleRefresh, refreshIntervalMs);
    return () => clearInterval(interval);
  }, [handleRefresh, refreshIntervalMs]);

  const renderSection1 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 1</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #1</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 1.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">21 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">270 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">91%</span></div>
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 2</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #2</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 2.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">32 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">390 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">92%</span></div>
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 3</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #3</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 3.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">43 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">510 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">93%</span></div>
      </div>
    </div>
  );

  const renderSection4 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 4</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #4</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 4.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">54 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">630 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">94%</span></div>
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 5</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #5</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 5.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">15 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">750 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">95%</span></div>
      </div>
    </div>
  );

  const renderSection6 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 6</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #6</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 6.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">26 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">870 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">96%</span></div>
      </div>
    </div>
  );

  const renderSection7 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 7</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #7</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 7.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">37 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">190 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">97%</span></div>
      </div>
    </div>
  );

  const renderSection8 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 8</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #8</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 8.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">48 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">310 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">98%</span></div>
      </div>
    </div>
  );

  const renderSection9 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 9</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #9</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 9.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">59 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">430 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">99%</span></div>
      </div>
    </div>
  );

  const renderSection10 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 10</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #10</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 10.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">20 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">550 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">90%</span></div>
      </div>
    </div>
  );

  const renderSection11 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 11</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #11</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 11.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">31 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">670 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">91%</span></div>
      </div>
    </div>
  );

  const renderSection12 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 12</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #12</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 12.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">42 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">790 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">92%</span></div>
      </div>
    </div>
  );

  const renderSection13 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 13</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #13</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 13.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">53 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">910 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">93%</span></div>
      </div>
    </div>
  );

  const renderSection14 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 14</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #14</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 14.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">14 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">230 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">94%</span></div>
      </div>
    </div>
  );

  const renderSection15 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 15</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #15</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 15.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">25 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">350 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">95%</span></div>
      </div>
    </div>
  );

  const renderSection16 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 16</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #16</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 16.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">36 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">470 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">96%</span></div>
      </div>
    </div>
  );

  const renderSection17 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 17</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #17</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 17.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">47 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">590 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">97%</span></div>
      </div>
    </div>
  );

  const renderSection18 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 18</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #18</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 18.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">58 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">710 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">98%</span></div>
      </div>
    </div>
  );

  const renderSection19 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 19</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #19</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 19.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">19 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">830 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">99%</span></div>
      </div>
    </div>
  );

  const renderSection20 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 20</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #20</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 20.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">30 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">150 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">90%</span></div>
      </div>
    </div>
  );

  const renderSection21 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 21</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #21</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 21.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">41 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">270 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">91%</span></div>
      </div>
    </div>
  );

  const renderSection22 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 22</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #22</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 22.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">52 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">390 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">92%</span></div>
      </div>
    </div>
  );

  const renderSection23 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 23</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #23</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 23.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">13 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">510 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">93%</span></div>
      </div>
    </div>
  );

  const renderSection24 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 24</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #24</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 24.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">24 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">630 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">94%</span></div>
      </div>
    </div>
  );

  const renderSection25 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 25</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #25</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 25.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">35 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">750 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">95%</span></div>
      </div>
    </div>
  );

  const renderSection26 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 26</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #26</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 26.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">46 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">870 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">96%</span></div>
      </div>
    </div>
  );

  const renderSection27 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 27</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #27</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 27.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">57 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">190 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">97%</span></div>
      </div>
    </div>
  );

  const renderSection28 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 28</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #28</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 28.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">18 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">310 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">98%</span></div>
      </div>
    </div>
  );

  const renderSection29 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 29</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #29</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 29.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">29 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">430 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">99%</span></div>
      </div>
    </div>
  );

  const renderSection30 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 30</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #30</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 30.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">40 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">550 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">90%</span></div>
      </div>
    </div>
  );

  const renderSection31 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 31</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #31</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 31.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">51 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">670 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">91%</span></div>
      </div>
    </div>
  );

  const renderSection32 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 32</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #32</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 32.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">12 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">790 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">92%</span></div>
      </div>
    </div>
  );

  const renderSection33 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 33</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #33</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 33.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">23 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">910 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">93%</span></div>
      </div>
    </div>
  );

  const renderSection34 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 34</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #34</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 34.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">34 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">230 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">94%</span></div>
      </div>
    </div>
  );

  const renderSection35 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 35</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #35</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 35.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">45 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">350 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">95%</span></div>
      </div>
    </div>
  );

  const renderSection36 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 36</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #36</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 36.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">56 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">470 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">96%</span></div>
      </div>
    </div>
  );

  const renderSection37 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 37</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #37</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 37.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">17 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">590 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">97%</span></div>
      </div>
    </div>
  );

  const renderSection38 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 38</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #38</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 38.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">28 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">710 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">98%</span></div>
      </div>
    </div>
  );

  const renderSection39 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 39</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #39</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 39.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">39 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">830 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">99%</span></div>
      </div>
    </div>
  );

  const renderSection40 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 40</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #40</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 40.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">50 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">150 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">90%</span></div>
      </div>
    </div>
  );

  const renderSection41 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 41</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #41</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 41.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">11 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">270 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">91%</span></div>
      </div>
    </div>
  );

  const renderSection42 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 42</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #42</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 42.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">22 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">390 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">92%</span></div>
      </div>
    </div>
  );

  const renderSection43 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 43</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #43</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 43.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">33 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">510 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">93%</span></div>
      </div>
    </div>
  );

  const renderSection44 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 44</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #44</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 44.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">44 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">630 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">94%</span></div>
      </div>
    </div>
  );

  const renderSection45 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 45</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #45</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 45.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">55 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">750 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">95%</span></div>
      </div>
    </div>
  );

  const renderSection46 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 46</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #46</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 46.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">16 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">870 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">96%</span></div>
      </div>
    </div>
  );

  const renderSection47 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 47</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #47</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 47.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">27 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">190 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">97%</span></div>
      </div>
    </div>
  );

  const renderSection48 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 48</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #48</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 48.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">38 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">310 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">98%</span></div>
      </div>
    </div>
  );

  const renderSection49 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 49</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #49</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 49.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">49 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">430 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">99%</span></div>
      </div>
    </div>
  );

  const renderSection50 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 50</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #50</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 50.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">10 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">550 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">90%</span></div>
      </div>
    </div>
  );

  const renderSection51 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 51</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #51</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 51.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">21 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">670 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">91%</span></div>
      </div>
    </div>
  );

  const renderSection52 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 52</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #52</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 52.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">32 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">790 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">92%</span></div>
      </div>
    </div>
  );

  const renderSection53 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 53</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #53</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 53.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">43 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">910 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">93%</span></div>
      </div>
    </div>
  );

  const renderSection54 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 54</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #54</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 54.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">54 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">230 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">94%</span></div>
      </div>
    </div>
  );

  const renderSection55 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 55</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #55</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 55.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">15 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">350 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">95%</span></div>
      </div>
    </div>
  );

  const renderSection56 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 56</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #56</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 56.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">26 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">470 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">96%</span></div>
      </div>
    </div>
  );

  const renderSection57 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 57</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #57</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 57.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">37 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">590 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">97%</span></div>
      </div>
    </div>
  );

  const renderSection58 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 58</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #58</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 58.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">48 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">710 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">98%</span></div>
      </div>
    </div>
  );

  const renderSection59 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 59</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #59</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 59.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">59 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">830 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">99%</span></div>
      </div>
    </div>
  );

  const renderSection60 = () => (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 text-base">Subsystem Panel 60</h4>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Panel #60</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Live operational telematics and telemetry feed for subsystem 60.</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Latency</span><span className="font-bold text-gray-700">20 ms</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Requests</span><span className="font-bold text-gray-700">150 /s</span></div>
        <div className="bg-gray-50 p-2 rounded"><span className="text-gray-500 block">Health</span><span className="font-bold text-green-600">90%</span></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">Operator: <span className="font-mono font-semibold text-blue-600">{operatorId}</span></p>
          </div>
          <button onClick={handleRefresh} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm font-medium">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection4()}
          {renderSection5()}
          {renderSection6()}
          {renderSection7()}
          {renderSection8()}
          {renderSection9()}
          {renderSection10()}
          {renderSection11()}
          {renderSection12()}
          {renderSection13()}
          {renderSection14()}
          {renderSection15()}
          {renderSection16()}
          {renderSection17()}
          {renderSection18()}
          {renderSection19()}
          {renderSection20()}
          {renderSection21()}
          {renderSection22()}
          {renderSection23()}
          {renderSection24()}
          {renderSection25()}
          {renderSection26()}
          {renderSection27()}
          {renderSection28()}
          {renderSection29()}
          {renderSection30()}
          {renderSection31()}
          {renderSection32()}
          {renderSection33()}
          {renderSection34()}
          {renderSection35()}
          {renderSection36()}
          {renderSection37()}
          {renderSection38()}
          {renderSection39()}
          {renderSection40()}
          {renderSection41()}
          {renderSection42()}
          {renderSection43()}
          {renderSection44()}
          {renderSection45()}
          {renderSection46()}
          {renderSection47()}
          {renderSection48()}
          {renderSection49()}
          {renderSection50()}
          {renderSection51()}
          {renderSection52()}
          {renderSection53()}
          {renderSection54()}
          {renderSection55()}
          {renderSection56()}
          {renderSection57()}
          {renderSection58()}
          {renderSection59()}
          {renderSection60()}
        </div>
      </div>
    </div>
  );
};
