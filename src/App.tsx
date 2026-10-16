import React, { useState } from 'react';
import { CVFormContext, defaultCVFormData, type CVFormData } from './context/CVFormContext';
import { PreviewModalButton } from './components/PreviewModalButton';
import { 
  RefreshCw, Sparkles, User, FileText, Globe, Award, Briefcase, 
  Upload, Trash2, PlusCircle, CheckCircle2, Layers, Download, Printer, Check
} from 'lucide-react';

const ARAB_COUNTRIES = [
  "Saudi Arabia",
  "Kuwait",
  "United Arab Emirates",
  "Qatar",
  "Oman",
  "Bahrain",
  "Jordan",
  "Lebanon",
  "Iraq",
  "Egypt",
  "Other"
];

const emptyCVFormData: CVFormData = {
  fullName: '',
  selectedPartner: 'al_andalus',
  refNo: '',
  date: new Date().toISOString().split('T')[0],
  nationality: 'Ethiopian',
  religion: 'Muslim',
  placeOfBirth: '',
  dateOfBirth: '',
  age: '',
  height: '',
  weight: '',
  maritalStatus: 'Single',
  numberOfChildren: '0',
  phoneNo: '',
  educationalQualification: 'Primary Education',
  passportNumber: '',
  passportDateOfIssue: '',
  passportPlaceOfIssue: '',
  passportDateOfExpiry: '',
  headshotPhoto: '',
  fullBodyPhoto: '',
  passportScan: '',
  medicalScan: '',
  languages: {
    arabic: 'Basic',
    english: 'Basic',
  },
  skills: {
    babySitting: false,
    washing: false,
    cleaning: false,
    cooking: false,
    sewing: false,
    driving: false,
  },
  previousExperiences: [],
};

export default function App() {
  const [formData, setFormData] = useState<CVFormData>(defaultCVFormData);
  const [isBatchDragging, setIsBatchDragging] = useState(false);
  const [dragActiveField, setDragActiveField] = useState<string | null>(null);

  // 6. Reset button clearing all information
  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all form fields and attachments?')) {
      setFormData(emptyCVFormData);
    }
  };

  // 7. Generate CV trigger
  const handleGeneratePdf = (partnerId?: string) => {
    const selected = partnerId || formData.selectedPartner;
    setFormData((prev) => ({ ...prev, selectedPartner: selected }));
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // 4 & 5. Smart Age and Passport Expiration Logic
  const calculateAgeAtDate = (dobStr: string, refDateStr?: string): number => {
    if (!dobStr) return 0;
    const birthDate = new Date(dobStr);
    const refDate = refDateStr ? new Date(refDateStr) : new Date();
    if (isNaN(birthDate.getTime()) || isNaN(refDate.getTime())) return 0;
    let age = refDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = refDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && refDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return Math.max(0, age);
  };

  const calculatePassportExpiry = (issueDateStr: string, passportNo: string, dobStr: string) => {
    if (!issueDateStr) return '';
    const issueDate = new Date(issueDateStr);
    if (isNaN(issueDate.getTime())) return '';

    const cleanPass = (passportNo || '').trim().toUpperCase();
    const ageAtIssue = calculateAgeAtDate(dobStr, issueDateStr);

    let yearsToAdd = 5;

    // Rule 5:
    // Passports starting with EQ or EP => 5 years - 1 day
    // Passports starting with E: if age < 25 => 5 years - 1 day; if age >= 25 => 10 years - 1 day
    if (cleanPass.startsWith('EQ') || cleanPass.startsWith('EP')) {
      yearsToAdd = 5;
    } else if (cleanPass.startsWith('E')) {
      if (ageAtIssue >= 25) {
        yearsToAdd = 10;
      } else {
        yearsToAdd = 5;
      }
    } else {
      yearsToAdd = 5;
    }

    const expiryDate = new Date(issueDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + yearsToAdd);
    expiryDate.setDate(expiryDate.getDate() - 1);
    return expiryDate.toISOString().split('T')[0];
  };

  const handleDobChange = (dobString: string) => {
    const calculatedAge = dobString ? calculateAgeAtDate(dobString).toString() : '';
    const updatedExpiry = calculatePassportExpiry(formData.passportDateOfIssue || '', formData.passportNumber || '', dobString);
    setFormData({
      ...formData,
      dateOfBirth: dobString,
      age: calculatedAge,
      passportDateOfExpiry: updatedExpiry || formData.passportDateOfExpiry
    });
  };

  const handleIssueDateChange = (issueDateStr: string) => {
    const expiryStr = calculatePassportExpiry(issueDateStr, formData.passportNumber || '', formData.dateOfBirth || '');
    setFormData({
      ...formData,
      passportDateOfIssue: issueDateStr,
      passportDateOfExpiry: expiryStr || formData.passportDateOfExpiry
    });
  };

  const handlePassportNoChange = (passportNo: string) => {
    const expiryStr = calculatePassportExpiry(formData.passportDateOfIssue || '', passportNo, formData.dateOfBirth || '');
    setFormData({
      ...formData,
      passportNumber: passportNo,
      passportDateOfExpiry: expiryStr || formData.passportDateOfExpiry
    });
  };

  // 2 & 3. Drag and Drop & Batch File Upload Assigning
  const processFileRead = (field: keyof CVFormData, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleBatchUpload = (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const name = file.name.toLowerCase();
      if (name.includes('head') || name.includes('face') || name.includes('photo')) {
        processFileRead('headshotPhoto', file);
      } else if (name.includes('full') || name.includes('body') || name.includes('standing')) {
        processFileRead('fullBodyPhoto', file);
      } else if (name.includes('passport') || name.includes('pass')) {
        processFileRead('passportScan', file);
      } else if (name.includes('medical') || name.includes('report') || name.includes('fitness')) {
        processFileRead('medicalScan', file);
      }
    });
  };

  // 9. Work Experience (Max 3 countries with separate Year / Month counters)
  const handleAddExperience = () => {
    const currentExps = formData.previousExperiences || [];
    if (currentExps.length >= 3) {
      alert('Maximum of 3 countries allowed in work experience.');
      return;
    }
    const updated = [...currentExps, { country: 'Saudi Arabia', years: '2', months: '0', period: '2 Years' }];
    setFormData({ ...formData, previousExperiences: updated });
  };

  const handleRemoveExperience = (index: number) => {
    const updated = [...(formData.previousExperiences || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, previousExperiences: updated });
  };

  const handleExperienceUpdate = (index: number, key: string, value: string) => {
    const updated = [...(formData.previousExperiences || [])];
    const item = { ...updated[index], [key]: value };

    const y = parseInt(item.years || '0', 10);
    const m = parseInt(item.months || '0', 10);
    const parts = [];
    if (y > 0) parts.push(`${y} ${y === 1 ? 'Year' : 'Years'}`);
    if (m > 0) parts.push(`${m} ${m === 1 ? 'Month' : 'Months'}`);
    item.period = parts.length > 0 ? parts.join(', ') : 'None';

    updated[index] = item;
    setFormData({ ...formData, previousExperiences: updated });
  };

  return (
    <CVFormContext.Provider value={{ formData, setFormData }}>
      <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans pb-28">
        {/* Top App Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#08265F] to-[#0BBF93] flex items-center justify-center font-black text-white text-xl shadow-xs">
              CV
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight">Magic CV Generator</h1>
              <p className="text-xs text-[#08265F] font-bold">Tesnim Foreign Employment Agency</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
              <label className="text-xs font-bold text-slate-600 pl-1">Primary Agency:</label>
              <select
                value={formData.selectedPartner}
                onChange={(e) => setFormData({ ...formData, selectedPartner: e.target.value })}
                className="bg-white text-slate-900 font-bold text-xs rounded-lg px-3 py-1.5 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
              >
                <option value="al_andalus">Al-Andalus (KSA / GCC)</option>
                <option value="darein">Darein Est (Kuwait)</option>
                <option value="general_purpose">General Purpose (Tesnim)</option>
              </select>
            </div>
          </div>
        </header>

        {/* Main Application Container */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">
          {/* Header Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#08265F] flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#0BBF93]" />
                <span>Candidate Profile & CV Manager</span>
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Fill in candidate details below. Use the bottom action bar to preview or generate formatted CV documents.
              </p>
            </div>
          </div>

          {/* Form Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1: Basic & Personal Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-[#08265F] font-extrabold text-base">
                <User className="w-5 h-5 text-[#0BBF93]" />
                <span>1. Basic & Personal Details</span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Candidate Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="FULL CANDIDATE NAME"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Reference Number</label>
                  <input
                    type="text"
                    value={formData.refNo || ''}
                    onChange={(e) => setFormData({ ...formData, refNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                {/* 4. Calendar Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Date</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nationality</label>
                  <input
                    type="text"
                    value={formData.nationality || ''}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Religion</label>
                  <input
                    type="text"
                    value={formData.religion || ''}
                    onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Place of Birth</label>
                  <input
                    type="text"
                    value={formData.placeOfBirth || ''}
                    onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                {/* 4. Calendar Selection + Auto Age */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Date of Birth (Auto Age)</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => handleDobChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Age (Years)</label>
                  <input
                    type="text"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-2 text-xs font-black text-[#08265F] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Marital Status</label>
                  <input
                    type="text"
                    value={formData.maritalStatus || ''}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Height (cm)</label>
                  <input
                    type="text"
                    value={formData.height || ''}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Weight (kg)</label>
                  <input
                    type="text"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phoneNo || ''}
                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Education Level</label>
                  <input
                    type="text"
                    value={formData.educationalQualification || ''}
                    onChange={(e) => setFormData({ ...formData, educationalQualification: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Passport Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-[#08265F] font-extrabold text-base">
                <FileText className="w-5 h-5 text-[#0BBF93]" />
                <span>2. Passport Details</span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Passport Number *</label>
                  <input
                    type="text"
                    value={formData.passportNumber || ''}
                    onChange={(e) => handlePassportNoChange(e.target.value)}
                    placeholder="e.g. EQ454545 or E1234567"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                {/* 4 & 5. Issue Date & Smart Expiration Logic */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Date of Issue</label>
                  <input
                    type="date"
                    value={formData.passportDateOfIssue || ''}
                    onChange={(e) => handleIssueDateChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Date of Expiry (Auto)</label>
                  <input
                    type="date"
                    value={formData.passportDateOfExpiry || ''}
                    onChange={(e) => setFormData({ ...formData, passportDateOfExpiry: e.target.value })}
                    className="w-full bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-2 text-xs font-black text-[#08265F] focus:outline-none"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Place of Issue</label>
                  <input
                    type="text"
                    value={formData.passportPlaceOfIssue || ''}
                    onChange={(e) => setFormData({ ...formData, passportPlaceOfIssue: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                  />
                </div>
              </div>

              {/* Language Proficiency */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-[#08265F] font-bold text-sm">
                  <Globe className="w-4 h-4 text-[#0BBF93]" />
                  <span>Language Proficiency</span>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Arabic Level</label>
                    <select
                      value={formData.languages?.arabic || 'Basic'}
                      onChange={(e) => setFormData({ ...formData, languages: { ...formData.languages, arabic: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Fair">Fair</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">English Level</label>
                    <select
                      value={formData.languages?.english || 'Basic'}
                      onChange={(e) => setFormData({ ...formData, languages: { ...formData.languages, english: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Fair">Fair</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Skills & Capabilities */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-[#08265F] font-extrabold text-base">
                <Award className="w-5 h-5 text-[#0BBF93]" />
                <span>3. Skills & Capabilities</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {['babySitting', 'washing', 'cleaning', 'cooking', 'sewing', 'driving'].map((skillKey) => {
                  const isActive = Boolean(formData.skills?.[skillKey as keyof typeof formData.skills]);
                  const labelNames: Record<string, string> = {
                    babySitting: 'Baby Sitting / رعاية الأطفال',
                    washing: 'Washing / الغسيل',
                    cleaning: 'Cleaning / التنظيف',
                    cooking: 'Cooking / الطبخ',
                    sewing: 'Sewing / الخياطة',
                    driving: 'Driving / القيادة',
                  };

                  return (
                    <button
                      key={skillKey}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        skills: { ...formData.skills, [skillKey]: !isActive }
                      })}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#08265F] border-[#08265F] text-white font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs font-bold">{labelNames[skillKey]}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isActive ? 'bg-[#0BBF93] text-slate-950' : 'border border-slate-300 bg-white'}`}>
                        {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Previous Work Experience (Max 3, Separate Year/Month Counters) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-[#08265F] font-extrabold text-base">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#0BBF93]" />
                  <span>4. Work Experience (Arab / GCC)</span>
                </div>
                <span className="text-xs text-slate-500 font-bold">
                  {(formData.previousExperiences || []).length} / 3 Max
                </span>
              </div>

              <div className="space-y-3">
                {formData.previousExperiences?.map((exp, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap md:flex-nowrap items-center gap-2">
                    {/* Country Selector */}
                    <div className="flex-1 min-w-[140px]">
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Country</label>
                      <select
                        value={exp.country}
                        onChange={(e) => handleExperienceUpdate(idx, 'country', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                      >
                        {ARAB_COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Separate Year Counter */}
                    <div className="w-24">
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Years</label>
                      <select
                        value={exp.years || '0'}
                        onChange={(e) => handleExperienceUpdate(idx, 'years', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => (
                          <option key={y} value={y}>{y} {y === 1 ? 'Year' : 'Years'}</option>
                        ))}
                      </select>
                    </div>

                    {/* Separate Month Counter */}
                    <div className="w-24">
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Months</label>
                      <select
                        value={exp.months || '0'}
                        onChange={(e) => handleExperienceUpdate(idx, 'months', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => (
                          <option key={m} value={m}>{m} {m === 1 ? 'Month' : 'Months'}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer mt-3 md:mt-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {(formData.previousExperiences || []).length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="w-full py-2.5 border-2 border-dashed border-[#0BBF93] hover:bg-emerald-50/50 text-[#08265F] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-[#0BBF93]" />
                    <span>Add Previous Work Experience</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Image & Document Attachments + Batch Upload Dropzone */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-[#08265F] font-extrabold text-base">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#0BBF93]" />
                <span>5. Image & Document Attachments</span>
              </div>
            </div>

            {/* 2 & 3. Batch Upload Drag-and-Drop Banner */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsBatchDragging(true); }}
              onDragLeave={() => setIsBatchDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsBatchDragging(false);
                handleBatchUpload(e.dataTransfer.files);
              }}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                isBatchDragging ? 'border-[#0BBF93] bg-emerald-50' : 'border-slate-300 bg-slate-50/80 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-8 h-8 text-[#08265F] mx-auto mb-2" />
              <p className="text-sm font-extrabold text-[#08265F]">BATCH DROP FILES TO AUTO-ASSIGN</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Drag multiple image files here or click to select (Auto-detects: Headshot, Full Body, Passport, Medical)
              </p>
              <label className="mt-3 inline-block px-5 py-2 bg-[#08265F] hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs">
                Select Multiple Files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleBatchUpload(e.target.files || [])}
                />
              </label>
            </div>

            {/* Individual Drag and Drop Upload Containers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {[
                { key: 'headshotPhoto', label: 'Headshot Photo (Passport Size)', placeholder: 'No Photo' },
                { key: 'fullBodyPhoto', label: 'Full Body Photo', placeholder: 'No Photo' },
                { key: 'passportScan', label: 'Passport Copy Scan', placeholder: 'No Scan' },
                { key: 'medicalScan', label: 'Medical Fitness Scan', placeholder: 'No Scan' },
              ].map((item) => {
                const fieldKey = item.key as keyof CVFormData;
                const value = formData[fieldKey] as string | undefined;

                return (
                  <div
                    key={item.key}
                    onDragOver={(e) => { e.preventDefault(); setDragActiveField(item.key); }}
                    onDragLeave={() => setDragActiveField(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActiveField(null);
                      if (e.dataTransfer.files?.[0]) {
                        processFileRead(fieldKey, e.dataTransfer.files[0]);
                      }
                    }}
                    className={`border border-slate-200 bg-slate-50/60 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-3 transition-all ${
                      dragActiveField === item.key ? 'border-[#0BBF93] bg-emerald-50/50' : ''
                    }`}
                  >
                    <span className="text-xs font-extrabold text-[#08265F]">{item.label}</span>
                    {value ? (
                      <img src={value} alt={item.label} className="w-28 h-32 object-cover rounded-lg border border-slate-300 shadow-xs" />
                    ) : (
                      <div className="w-28 h-32 border-2 border-dashed border-slate-300 bg-white rounded-lg flex items-center justify-center text-slate-400 text-xs font-bold">
                        {item.placeholder}
                      </div>
                    )}
                    <label className="px-4 py-1.5 bg-white border border-slate-300 hover:border-[#0BBF93] text-slate-800 font-bold text-xs rounded-lg cursor-pointer transition-colors shadow-2xs">
                      Choose / Drop File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            processFileRead(fieldKey, e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* 8. Consolidated Action Buttons Bar at End of Page */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-6 z-40 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer border border-slate-300"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset All Form Data</span>
            </button>

            <div className="flex items-center gap-3">
              <PreviewModalButton formData={formData} onGeneratePdf={handleGeneratePdf} />

              <button
                type="button"
                onClick={() => handleGeneratePdf()}
                className="px-6 py-2.5 bg-[#0BBF93] hover:bg-[#09a882] text-slate-950 font-black rounded-xl text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Generate CV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </CVFormContext.Provider>
  );
}