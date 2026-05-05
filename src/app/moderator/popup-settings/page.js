// app/moderator/popup-settings/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Loader2, Bell, Package, Settings, AlertCircle, Eye, CheckCircle, Calendar, User, Shield } from 'lucide-react';

export default function ModeratorPopupSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    activePopup: 'promotional',
    priority: 'promotional_first',
    newsletter: {
      isActive: true,
      intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
      maxShows: 3
    },
    promotional: {
      isActive: true,
      useExistingPromotionalSettings: true
    },
    globalSettings: {
      enabledForLoggedInUsers: true,
      enabledForLoggedOutUsers: true,
      delayBeforeFirstPopup: 5,
      popupFrequency: 'session'
    }
  });
  
  const [dbData, setDbData] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('🔍 Fetching popup settings...');
      const response = await fetch('http://localhost:5000/api/popup-settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      console.log('📦 API Response:', data);
      
      if (data.success) {
        console.log('✅ Settings loaded:', data.data);
        setSettings(data.data);
        setDbData(data.data);
      } else {
        console.error('❌ Failed to load settings:', data.error);
        toast.error('Failed to fetch settings');
      }
    } catch (error) {
      console.error('❌ Error fetching settings:', error);
      toast.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/popup-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          activePopup: settings.activePopup,
          priority: settings.priority,
          newsletter: settings.newsletter,
          promotional: settings.promotional,
          globalSettings: settings.globalSettings
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Popup settings updated successfully!');
        fetchSettings();
      } else {
        toast.error(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const addNewsletterInterval = () => {
    setSettings({
      ...settings,
      newsletter: {
        ...settings.newsletter,
        intervals: [...settings.newsletter.intervals, { delay: 15 }]
      }
    });
  };

  const removeNewsletterInterval = (index) => {
    if (settings.newsletter.intervals.length <= 1) {
      toast.error('At least one interval is required');
      return;
    }
    const newIntervals = settings.newsletter.intervals.filter((_, i) => i !== index);
    setSettings({
      ...settings,
      newsletter: { ...settings.newsletter, intervals: newIntervals }
    });
  };

  const updateNewsletterInterval = (index, delay) => {
    const newIntervals = [...settings.newsletter.intervals];
    newIntervals[index] = { delay: parseInt(delay) || 0 };
    setSettings({
      ...settings,
      newsletter: { ...settings.newsletter, intervals: newIntervals }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getActivePopupInfo = () => {
    if (!dbData) return null;
    
    switch(dbData.activePopup) {
      case 'promotional':
        return {
          name: 'Promotional Popup',
          icon: <Package className="w-5 h-5" />,
          color: 'text-[#6B4F3A]',
          bgColor: 'bg-[#6B4F3A]/10',
          borderColor: 'border-[#6B4F3A]',
          description: 'Product promotion popup is currently active',
          status: dbData.promotional?.isActive ? 'Active' : 'Inactive'
        };
      case 'newsletter':
        return {
          name: 'Newsletter Popup',
          icon: <Bell className="w-5 h-5" />,
          color: 'text-[#3bc24f]',
          bgColor: 'bg-[#3bc24f]/10',
          borderColor: 'border-[#3bc24f]',
          description: 'Newsletter signup popup is currently active',
          status: dbData.newsletter?.isActive ? 'Active' : 'Inactive'
        };
      case 'none':
        return {
          name: 'No Popup',
          icon: <AlertCircle className="w-5 h-5" />,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-300',
          description: 'All popups are disabled',
          status: 'Disabled'
        };
      default:
        return null;
    }
  };

  const activePopupInfo = getActivePopupInfo();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Moderator Badge */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-6 h-6 text-[#6B4F3A]" />
              <h1 className="text-2xl font-bold text-[#6B4F3A] font-serif">Popup Settings</h1>
            </div>
            <p className="text-sm text-gray-600">
              Configure which popup appears on your website
            </p>
          </div>
          <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Moderator Access
          </div>
        </div>

        {/* Current Database Settings Card */}
        {dbData && (
          <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] px-6 py-3">
              <h2 className="text-white font-semibold text-sm flex items-center gap-2">
                <Database className="w-4 h-4" />
                Currently Active Popup Configuration
              </h2>
            </div>
            
            <div className="p-5">
              {/* Active Popup Status */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activePopupInfo?.bgColor}`}>
                    {activePopupInfo?.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Currently Active Popup</p>
                    <p className="text-lg font-bold text-gray-900">{activePopupInfo?.name}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${activePopupInfo?.bgColor} ${activePopupInfo?.color}`}>
                  {activePopupInfo?.status}
                </span>
              </div>

              {/* Newsletter Details (if active) */}
              {dbData.activePopup === 'newsletter' && dbData.newsletter && (
                <div className="mb-4 pb-3 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">NEWSLETTER CONFIGURATION</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Initial Delay:</span>
                      <p className="font-medium text-gray-900">{dbData.newsletter.intervals?.[0]?.delay || 5} seconds</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Max Shows:</span>
                      <p className="font-medium text-gray-900">{dbData.newsletter.maxShows} times</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Intervals:</span>
                      <p className="font-medium text-gray-900">
                        {dbData.newsletter.intervals?.map((int, i) => (
                          <span key={i} className="inline-block mr-3">
                            {i === 0 ? 'First: ' : `${i}: `}{int.delay}s
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Promotional Details (if active) */}
              {dbData.activePopup === 'promotional' && dbData.promotional && (
                <div className="mb-4 pb-3 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">PROMOTIONAL CONFIGURATION</p>
                  <div className="text-sm">
                    <span className="text-gray-500">Status:</span>
                    <p className="font-medium text-gray-900">
                      {dbData.promotional.isActive ? 'Active' : 'Inactive'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      * Uses promotional settings from Promotional Settings page
                    </p>
                  </div>
                </div>
              )}

           

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Created: {formatDate(dbData.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Updated: {formatDate(dbData.updatedAt)}</span>
                </div>
              </div>
              
              {dbData.updatedBy && (
                <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>Last updated by: {typeof dbData.updatedBy === 'object' ? (dbData.updatedBy.name || dbData.updatedBy.email || dbData.updatedBy._id) : dbData.updatedBy}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Active Popup Selection */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#6B4F3A]" />
              Edit Popup Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setSettings({ ...settings, activePopup: 'promotional' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.activePopup === 'promotional'
                    ? 'border-[#6B4F3A] bg-[#F5E6D3] shadow-md'
                    : 'border-gray-200 hover:border-[#6B4F3A]/50 hover:bg-gray-50'
                }`}
              >
                <Package className={`w-8 h-8 mx-auto mb-2 ${settings.activePopup === 'promotional' ? 'text-[#6B4F3A]' : 'text-gray-400'}`} />
                <p className={`font-medium text-sm ${settings.activePopup === 'promotional' ? 'text-[#6B4F3A]' : 'text-gray-700'}`}>
                  Promotional Only
                </p>
                <p className="text-xs text-gray-500 mt-1">Show product promotions</p>
              </button>
              
              <button
                onClick={() => setSettings({ ...settings, activePopup: 'newsletter' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.activePopup === 'newsletter'
                    ? 'border-[#3bc24f] bg-[#F5E6D3] shadow-md'
                    : 'border-gray-200 hover:border-[#3bc24f]/50 hover:bg-gray-50'
                }`}
              >
                <Bell className={`w-8 h-8 mx-auto mb-2 ${settings.activePopup === 'newsletter' ? 'text-[#3bc24f]' : 'text-gray-400'}`} />
                <p className={`font-medium text-sm ${settings.activePopup === 'newsletter' ? 'text-[#3bc24f]' : 'text-gray-700'}`}>
                  Newsletter Only
                </p>
                <p className="text-xs text-gray-500 mt-1">Show newsletter signup</p>
              </button>
              
              <button
                onClick={() => setSettings({ ...settings, activePopup: 'none' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.activePopup === 'none'
                    ? 'border-gray-400 bg-gray-100 shadow-md'
                    : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <AlertCircle className={`w-8 h-8 mx-auto mb-2 ${settings.activePopup === 'none' ? 'text-gray-500' : 'text-gray-400'}`} />
                <p className={`font-medium text-sm ${settings.activePopup === 'none' ? 'text-gray-700' : 'text-gray-600'}`}>
                  None
                </p>
                <p className="text-xs text-gray-500 mt-1">Disable all popups</p>
              </button>
            </div>
          </div>

          {/* Newsletter Settings - Same as Admin */}
          {settings.activePopup === 'newsletter' && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#6B4F3A]" />
                  Newsletter Popup Settings
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.newsletter.isActive}
                    onChange={(e) => setSettings({
                      ...settings,
                      newsletter: { ...settings.newsletter, isActive: e.target.checked }
                    })}
                    className="w-4 h-4 rounded focus:ring-[#6B4F3A]"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
              </div>
              
              {settings.newsletter.isActive && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timing Intervals (seconds)
                    </label>
                    <div className="space-y-2">
                      {settings.newsletter.intervals.map((interval, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 w-32">
                            {idx === 0 ? 'Initial delay:' : `After close ${idx}:`}
                          </span>
                          <input
                            type="number"
                            value={interval.delay}
                            onChange={(e) => updateNewsletterInterval(idx, e.target.value)}
                            min="0"
                            step="1"
                            className="w-24 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] outline-none"
                          />
                          <span className="text-sm text-gray-500">seconds</span>
                          {idx > 0 && (
                            <button
                              onClick={() => removeNewsletterInterval(idx)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={addNewsletterInterval}
                      className="mt-2 text-sm text-[#6B4F3A] hover:underline"
                    >
                      + Add Another Interval
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Shows per Session
                    </label>
                    <select
                      value={settings.newsletter.maxShows}
                      onChange={(e) => setSettings({
                        ...settings,
                        newsletter: { ...settings.newsletter, maxShows: parseInt(e.target.value) }
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] outline-none"
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num} time{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          )}

      

          {/* Save Button */}
          <div className="p-6 border-t border-gray-200 bg-[#FAF7F2]">
            <button
              onClick={saveSettings}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Settings
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Changes will take effect immediately on page reload
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Database icon component
const Database = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);