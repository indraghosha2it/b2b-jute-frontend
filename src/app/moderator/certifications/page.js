'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit, Eye, Loader2, CheckCircle, XCircle, X, Upload, 
  Image as ImageIcon, FolderPlus, Link as LinkIcon, Calendar, Award, 
  Tag, AlertCircle, ChevronDown, Globe, Hash, FileText
} from 'lucide-react';
import { toast } from 'sonner';

// Certification Types
const CERTIFICATION_TYPES = [
  { value: 'Quality', label: 'Quality', icon: '🏆' },
  { value: 'Organic', label: 'Organic', icon: '🌿' },
  { value: 'Ethical', label: 'Ethical', icon: '🤝' },
  { value: 'Environmental', label: 'Environmental', icon: '🌍' },
  { value: 'Safety', label: 'Safety', icon: '🛡️' },
  { value: 'Trade', label: 'Trade', icon: '📦' },
  { value: 'Sustainability', label: 'Sustainability', icon: '♻️' },
  { value: 'Other', label: 'Other', icon: '📜' }
];

// Badge Text Options
const BADGE_OPTIONS = [
  'Certified', 'Verified', 'Approved', 'Accredited', 'Registered', 'Compliant'
];

// Cloudinary upload function
const uploadToCloudinary = async (file, folder = 'certifications') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'b2b-products');
  formData.append('folder', folder);
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export default function ModeratorCertificationsPage() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCertFile, setUploadingCertFile] = useState(false);
  const [viewingCert, setViewingCert] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'Quality',
    issuingAuthority: '',
    description: '',
    badgeText: 'Certified',
    issueDate: '',
    expiryDate: '',
    certificateNumber: '',
    verificationLink: '',
    country: '',
    isFeatured: false,
    displayOrder: 0,
    logoUrl: '',
    logoPublicId: '',
    certificateFileUrl: '',
    certificateFilePublicId: ''
  });

  const logoInputRef = useRef(null);
  const certFileInputRef = useRef(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/certifications/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCertifications(data.data);
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      toast.error('Failed to load certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'Quality',
      issuingAuthority: '',
      description: '',
      badgeText: 'Certified',
      issueDate: '',
      expiryDate: '',
      certificateNumber: '',
      verificationLink: '',
      country: '',
      isFeatured: false,
      displayOrder: 0,
      logoUrl: '',
      logoPublicId: '',
      certificateFileUrl: '',
      certificateFilePublicId: ''
    });
    setEditingCert(null);
  };

  const editCertification = (cert) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name || '',
      type: cert.type || 'Quality',
      issuingAuthority: cert.issuingAuthority || '',
      description: cert.description || '',
      badgeText: cert.badgeText || 'Certified',
      issueDate: cert.issueDate ? cert.issueDate.split('T')[0] : '',
      expiryDate: cert.expiryDate ? cert.expiryDate.split('T')[0] : '',
      certificateNumber: cert.certificateNumber || '',
      verificationLink: cert.verificationLink || '',
      country: cert.country || '',
      isFeatured: cert.isFeatured || false,
      displayOrder: cert.displayOrder || 0,
      logoUrl: cert.logo || '',
      logoPublicId: cert.logoPublicId || '',
      certificateFileUrl: cert.certificateFile || '',
      certificateFilePublicId: cert.certificateFilePublicId || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewCertification = (cert) => {
    setViewingCert(cert);
    setShowViewModal(true);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload an image file (JPEG, PNG, WEBP, SVG)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo must be less than 2MB');
      return;
    }

    setUploadingLogo(true);
    try {
      const { url, publicId } = await uploadToCloudinary(file);
      setFormData(prev => ({
        ...prev,
        logoUrl: url,
        logoPublicId: publicId
      }));
      toast.success('Logo uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload logo');
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({
      ...prev,
      logoUrl: '',
      logoPublicId: ''
    }));
    if (logoInputRef.current) logoInputRef.current.value = '';
    toast.info('Logo removed');
  };

  const handleCertificateFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload an image or PDF file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File must be less than 5MB');
      return;
    }

    setUploadingCertFile(true);
    try {
      const { url, publicId } = await uploadToCloudinary(file);
      setFormData(prev => ({
        ...prev,
        certificateFileUrl: url,
        certificateFilePublicId: publicId
      }));
      toast.success('Certificate file uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload certificate file');
    } finally {
      setUploadingCertFile(false);
      if (certFileInputRef.current) certFileInputRef.current.value = '';
    }
  };

  const removeCertificateFile = () => {
    setFormData(prev => ({
      ...prev,
      certificateFileUrl: '',
      certificateFilePublicId: ''
    }));
    if (certFileInputRef.current) certFileInputRef.current.value = '';
    toast.info('Certificate file removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast.error('Certification name is required');
      return;
    }
    if (!formData.issuingAuthority) {
      toast.error('Issuing authority is required');
      return;
    }
    if (!formData.logoUrl) {
      toast.error('Certification logo is required');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const url = editingCert 
        ? `http://localhost:5000/api/certifications/admin/${editingCert._id}`
        : 'http://localhost:5000/api/certifications';
      const method = editingCert ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingCert ? 'Certification updated' : 'Certification created');
        resetForm();
        fetchCertifications();
      } else {
        toast.error(data.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving certification:', error);
      toast.error('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/certifications/admin/${id}/toggle`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Certification ${data.data.isActive ? 'activated' : 'deactivated'}`);
        fetchCertifications();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          Certifications & Compliance
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage ISO, SGS, Fair Trade certificates and more
        </p>
      </div>

      {/* Add/Edit Form - Above the Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#F5E6D3] to-white">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-[#6B4F3A]" />
            <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              {editingCert ? 'Edit Certification' : 'Add New Certification'}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {editingCert ? 'Update certification details' : 'Fill in the details to add a new certification'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certification Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., ISO 9001:2015"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certification Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
              >
                {CERTIFICATION_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Authority <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="issuingAuthority"
                value={formData.issuingAuthority}
                onChange={handleInputChange}
                placeholder="e.g., ISO, SGS, Fair Trade International"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Badge Text
              </label>
              <select
                name="badgeText"
                value={formData.badgeText}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
              >
                {BADGE_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="e.g., Bangladesh, International"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Brief description of what this certification means for our customers..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition resize-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Verification Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Number
              </label>
              <input
                type="text"
                name="certificateNumber"
                value={formData.certificateNumber}
                onChange={handleInputChange}
                placeholder="e.g., CERT-12345"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verification Link
              </label>
              <input
                type="url"
                name="verificationLink"
                value={formData.verificationLink}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Media Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certification Logo <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {formData.logoUrl ? (
                  <div className="relative inline-block">
                    <img src={formData.logoUrl} alt="Logo" className="w-24 h-24 object-contain rounded-lg border" />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      ref={logoInputRef}
                      className="hidden"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                      onChange={handleLogoUpload}
                    />
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={uploadingLogo}
                      className="flex flex-col items-center justify-center w-full cursor-pointer"
                    >
                      {uploadingLogo ? (
                        <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload logo</p>
                          <p className="text-xs text-gray-400">JPEG, PNG, WEBP, SVG (max 2MB)</p>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Certificate File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate File (PDF/Image)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {formData.certificateFileUrl ? (
                  <div className="relative inline-block">
                    {formData.certificateFileUrl.match(/\.(jpeg|jpg|png|webp)$/i) ? (
                      <img src={formData.certificateFileUrl} alt="Certificate" className="w-24 h-24 object-contain rounded-lg border" />
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={removeCertificateFile}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      ref={certFileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                      onChange={handleCertificateFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => certFileInputRef.current?.click()}
                      disabled={uploadingCertFile}
                      className="flex flex-col items-center justify-center w-full cursor-pointer"
                    >
                      {uploadingCertFile ? (
                        <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload certificate</p>
                          <p className="text-xs text-gray-400">PDF, JPEG, PNG (max 5MB)</p>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="w-5 h-5 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
            />
            <div>
              <span className="font-medium text-gray-700">Show on Homepage</span>
              <p className="text-sm text-gray-500">Featured certifications will appear in the trust section</p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            {editingCert && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel Edit
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition disabled:opacity-50 flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingCert ? 'Update Certification' : 'Create Certification'}
            </button>
          </div>
        </form>
      </div>

      {/* Certifications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Logo</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Issuing Authority</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Featured</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {certifications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    No certifications found. Fill the form above to create one.
                  </td>
                </tr>
              ) : (
                certifications.map((cert) => (
                  <tr key={cert._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <img src={cert.logo} alt={cert.name} className="w-10 h-10 object-contain" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{cert.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{cert.type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cert.issuingAuthority}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(cert._id, cert.isActive)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition ${
                          cert.isActive 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {cert.isActive ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {cert.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {cert.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          <Eye className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => viewCertification(cert)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => editCertification(cert)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {/* No Delete button for moderator */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && viewingCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowViewModal(false)} />
            
            <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F5E6D3] flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#6B4F3A]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Certification Details</h2>
                    <p className="text-sm text-gray-500">{viewingCert.name}</p>
                  </div>
                </div>
                <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Logo */}
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-[#FAF7F2] rounded-lg p-3 flex items-center justify-center">
                    <img src={viewingCert.logo} alt={viewingCert.name} className="max-w-full max-h-full object-contain" />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Certification Name</label>
                    <p className="font-medium text-gray-900">{viewingCert.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Type</label>
                    <p className="font-medium text-gray-900">{viewingCert.type}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Issuing Authority</label>
                    <p className="font-medium text-gray-900">{viewingCert.issuingAuthority}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Badge Text</label>
                    <p className="font-medium text-gray-900">{viewingCert.badgeText}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Country</label>
                    <p className="font-medium text-gray-900">{viewingCert.country || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Certificate Number</label>
                    <p className="font-medium text-gray-900">{viewingCert.certificateNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Issue Date</label>
                    <p className="font-medium text-gray-900">
                      {viewingCert.issueDate ? new Date(viewingCert.issueDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Expiry Date</label>
                    <p className="font-medium text-gray-900">
                      {viewingCert.expiryDate ? new Date(viewingCert.expiryDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {viewingCert.description && (
                  <div>
                    <label className="text-xs text-gray-500">Description</label>
                    <p className="text-sm text-gray-700 mt-1">{viewingCert.description}</p>
                  </div>
                )}

                {/* Verification Link */}
                {viewingCert.verificationLink && (
                  <div>
                    <label className="text-xs text-gray-500">Verification Link</label>
                    <a 
                      href={viewingCert.verificationLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[#6B4F3A] hover:underline block mt-1"
                    >
                      {viewingCert.verificationLink} <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${viewingCert.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-700">Status: {viewingCert.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  {viewingCert.isFeatured && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-700">Featured on Homepage</span>
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-4 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}