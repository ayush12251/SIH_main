import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';
import { Save, User, MapPin, Mail, Link as LinkIcon, Briefcase } from 'lucide-react';

const ProfileSettings = () => {
  const { profile, updateProfileData } = useStudent();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    location: '',
    email: '',
    github: '',
    bio: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        location: profile.location || '',
        email: profile.email || '',
        github: profile.github || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileData(formData);
    showToast('success', 'Profile Updated', 'Your profile details have been saved successfully.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-500 text-sm">Update your personal details, biography, and professional links.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Basic Information */}
          <Card radius="2xl" shadow="sm" padding="large" className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-2">
              <User size={20} className="text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. Alex Rivera"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Professional Title</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase size={16} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. MSc Data Science Candidate"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin size={16} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. Seattle, WA"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="e.g. alex@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Biography</label>
              <textarea 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows={4}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                placeholder="Write a short summary about yourself and your career goals..."
              />
            </div>
          </Card>

          {/* Professional Links */}
          <Card radius="2xl" shadow="sm" padding="large" className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-2">
              <LinkIcon size={20} className="text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Professional Links</h2>
            </div>
            
            <div className="flex flex-col gap-2 max-w-md">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">GitHub Profile</label>
              <input 
                type="text" 
                value={formData.github}
                onChange={(e) => setFormData({...formData, github: e.target.value})}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="e.g. github.com/username"
              />
            </div>
          </Card>

          <div className="flex justify-end mt-4">
            <button 
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-indigo-700 shadow-sm transition-all"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>

      </main>
    </div>
  );
};

export default ProfileSettings;
