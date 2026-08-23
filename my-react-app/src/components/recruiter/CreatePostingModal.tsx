import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useJobs } from '../../context/JobsContext';
import { useToast } from '../../context/ToastContext';

interface CreatePostingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostingModal: React.FC<CreatePostingModalProps> = ({ isOpen, onClose }) => {
  const { addJob } = useJobs();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Remote',
    pay: '',
    term: 'Summer 2024',
    requiredSkills: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert comma-separated string to array
    const skillsArray = formData.requiredSkills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    addJob({
      ...formData,
      requiredSkills: skillsArray
    });

    showToast('success', 'Posting Created', `${formData.title} has been successfully published.`);
    
    // Reset and close
    setFormData({
      title: '', department: '', location: '', type: 'Remote', pay: '', term: 'Summer 2024', requiredSkills: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-gray-900">Create New Posting</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto">
          <form id="create-posting-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Job Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. Frontend Intern"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Department</label>
                <input 
                  required
                  type="text" 
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. Engineering"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Location</label>
                <input 
                  required
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. New York, NY"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Work Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pay Range</label>
                <input 
                  type="text" 
                  value={formData.pay}
                  onChange={(e) => setFormData({...formData, pay: e.target.value})}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. $30-45/hr"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Term</label>
                <input 
                  type="text" 
                  value={formData.term}
                  onChange={(e) => setFormData({...formData, term: e.target.value})}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. Summer 2024"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Required Skills (Comma separated)
              </label>
              <input 
                required
                type="text" 
                value={formData.requiredSkills}
                onChange={(e) => setFormData({...formData, requiredSkills: e.target.value})}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="e.g. Python, SQL, React"
              />
              <p className="text-xs text-gray-500 mt-1">
                The Matching Engine uses these skills to calculate ATS scores for candidates.
              </p>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 mt-auto">
          <button 
            onClick={onClose}
            type="button" 
            className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="create-posting-form"
            className="px-6 py-2.5 bg-indigo-600 rounded-xl text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Publish Posting
          </button>
        </div>

      </div>
    </div>
  );
};
