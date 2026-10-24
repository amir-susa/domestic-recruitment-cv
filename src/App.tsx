import goldLogoImg from './assets/Tesnim CV Studio Gold Logo.png';
import { useState, useEffect, useRef } from 'react';
import { CVFormContext, defaultCVFormData, type CVFormData } from './context/CVFormContext';
import { PreviewModalButton } from './components/PreviewModalButton';
import { 
  User, FileText, Globe, Award, Briefcase, 
  Upload, Trash2, PlusCircle, Layers, ShieldAlert, AlertCircle, 
  ArrowRightLeft, Check, Maximize2, X, Search 
} from 'lucide-react';

const ARAB_COUNTRIES = [
  "Saudi Arabia", "Kuwait", "United Arab Emirates", "Qatar", 
  "Oman", "Bahrain", "Jordan", "Lebanon", "Iraq", "Egypt", "Other"
];

const NATIONALITIES = ["Ethiopian", "Filipino", "Kenyan", "Ugandan", "Indian", "Sri Lankan", "Indonesian"];
const RELIGIONS = ["Muslim", "Christian", "Orthodox", "Protestant", "Catholic", "Other"];
const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"];
const EDUCATION_LEVELS = ["Primary Education", "Junior School", "High School", "Diploma", "University Degree"];

const ETHIOPIAN_BIRTHPLACES_DATABASE: Record<string, string[]> = {
  "Addis Ababa": [
    "Addis Ababa", "Addis Abeba",
    "Bole", "Kirkos", "Yeka", "Arada", "Lideta", "Nifas Silk-Lafto", "Nefas Silk",
    "Kolfe Keranio", "Kolfe", "Gullele", "Addis Ketema", "Akaki Kality", "Akaki", "Lemi Kura",
    "Mekanisa", "Kaliti", "Piassa", "Merkato"
  ],
  "Dire Dawa": [
    "Dire Dawa", "Diredawa", "Melka Jebdu", "Sabian", "Legehare", "Gendekore"
  ],
  "Oromia": [
    "Adama", "Nazret", "Nazareth", "Bishoftu", "Debre Zeit", "Debrezeit", "Jimma", "Jima",
    "Shashemene", "Shashamane", "Nekemte", "Nekemt", "Asella", "Asela", "Assela",
    "Ambo", "Hagere Hiwot", "Woliso", "Waliso", "Wolisso", "Robe", "Bale Robe", "Goba",
    "Dodola", "Metu", "Mettu", "Gimbi", "Negele Borana", "Negele", "Neghelle", "Yabelo", "Yabello",
    "Moyale", "Burayu", "Sebeta", "Sululta", "Holeta", "Holetta", "Fiche", "Fitche",
    "Batu", "Ziway", "Zway", "Bedele", "Bedelle", "Agaro", "Gambo", "Dembi Dolo", "Dembidolo",
    "Sendafa", "Chancho", "Dukem", "Gelan", "Galan", "Legetafo", "Legetafo Legedadi",
    "Legedadi", "Tulu Bolo", "Ginchi", "Guder", "Ginir", "Goro", "Sinana",
    "Agarfa", "Dello Mena", "Adaba", "Kofele", "Arsi Negele", "Arsi Nagelle", "Kuyera",
    "Bekoji", "Sagure", "Huruta", "Iteya", "Dera", "Sire", "Gedo", "Bako",
    "Shambu", "Arjo", "Kiramu", "Nejo", "Nedjo", "Gidami", "Chelia", "Ejere",
    "Gebre Guracha", "Kuyu", "Debre Libanos", "Mojo", "Modjo", "Koka",
    "Welenchiti", "Wolenchiti", "Metehara", "Boset", "Bishan Guracha", "Dire Inchini",
    "Teji", "Tole", "Jibat", "Wonchi", "Ameya", "Bule Hora", "Hagere Mariam",
    "Adola", "Adola Redde", "Kibre Mengist", "Shakiso", "Wadera", "Mega", "Surupa",
    "Chiro", "Asebe Teferi", "Asebot", "Bedesa", "Hirna", "Gelemso", "Mieso", "Babile",
    "Gursum", "Haramaya", "Alemaya", "Kersa", "Bate", "Deder", "Bordede", "Aweday",
    "Jarso", "Limu Genet", "Seka", "Gera", "Dedo", "Setema", "Shebe", "Chora",
    "Yayu", "Gore", "Alem Gena", "Tulu Dimtu", "Dilla Oromia",
    "Nagelle Borena", "Arero", "Dubluk", "Teltele", "Hidhabu Abote", "Fiche Selale",
    "Muketuri", "Degem", "Bure Oromia", "Becho", "Tiyo", "Sude", "Gololcha",
    "Asasa", "Lemmu", "Bilbilo", "Dhera", "Bokoji", "Gedeb Asasa",
    "Chole", "Shalla", "Abomsa", "Dodota", "Nekemte Town",
    "Bonaya Boshe", "Diga", "Sasiga", "Gute", "Haro Limu", "Lalo Asabi",
    "Gudeya Bila", "Anger Gutin", "Chewaka", "Gimbichu", "Adea", "Lume",
    "Ada'a", "Akaki Beseka", "Sebeta Hawas", "Welmera", "Ejersa Lafo", "Bako Tibe",
    "Ilu Gelan", "Jeldu", "Dandi", "Meta Robi", "Ginde Beret", "Gindeberet",
    "Cheliya", "Toke Kutaye", "Wenchi", "Kersana Malima"
  ],
  "Amhara": [
    "Bahir Dar", "Bahr Dar", "Gondar", "Gonder", "Dessie", "Dese", "Debre Birhan", "Debre Berhan",
    "Debre Markos", "Debre Mark'os", "Kombolcha", "Debre Tabor", "Woldia", "Weldiya",
    "Lalibela", "Injibara", "Finote Selam", "Motta", "Bichena", "Kobo", "Haik", "Hayk",
    "Mehal Meda", "Shewa Robit", "Metema", "Dangila", "Bure", "Burie", "Durbete",
    "Mertule Mariam", "Dejen", "Gohatsion", "Debre Sina", "Kewet", "Ataye", "Atayeh",
    "Majete", "Molale", "Ankober", "Tarmaber", "Senbete", "Kemise", "Komessie", "Bati",
    "Wegel Tena", "Alem Ketema", "Sekota", "Sokota", "Nefas Mewcha", "Addis Zemen",
    "Maksegnit", "Azezo", "Woreta", "Wereta", "Amba Giorgis", "Dembecha", "Chagni",
    "Gimjabet Mariam", "Adet", "Merawi", "Zege", "Tilili", "Debre Elias", "Mota",
    "Sirinka", "Gashena", "Aykel", "Chilga", "Dabat", "Debark", "Gorgora",
    "Genda Wuha", "Dewa Chefa", "Kuy", "Enjibara", "Sekela", "Mankusa", "Jiga",
    "Gonji", "Kolela", "Debre Zebit", "Dibate Amhara", "Fenote Selam", "Bahir Dar Zuria",
    "Wereilu", "Kutaber", "Sayint", "Tenta", "Ambassel", "Mekane Selam", "Akesta",
    "Gubalafto", "Hara", "Hamusit", "Ebinat", "Bete", "Gayint", "Simada",
    "Ayehu", "Tullu Awlia", "Sede Muja", "Mekdela", "Legambo", "Jama", "Kalu",
    "Ambo Mariam", "Gelsha", "Libo Kemkem", "Fogera", "Dera Amhara", "Mekane Birhan",
    "Wogeda", "Shewa Meda", "Debre Werk", "Ejersa Goro", "Bahir Giyorgis",
    "Dagi", "Arb Gebeya", "Kechene", "Efratana Gidim", "Merhabete", "Mojana Wadera",
    "Tarma Ber", "Menz Gera", "Menz Mama", "Menz Lalo", "Basona Werana", "Moretina Jiru",
    "Antsokiya Gemza", "Aleltu", "Shenkora", "Kewet Amhara", "Minjar", "Siyadebrina Wayu"
  ],
  "Tigray": [
    "Mekelle", "Mekele", "Makale", "Adwa", "Adowa", "Axum", "Aksum", "Adigrat",
    "Shire", "Shire Inda Selassie", "Inda Selassie", "Alamata", "Humera", "Wukro",
    "Maychew", "Mai Chew", "Abi Adi", "Adi Gudom", "Hawzen", "Edaga Hamus", "Samre",
    "Korem", "Mai Tsebri", "Maitsebri", "Sheraro", "Dansha", "Rama", "Zalambessa",
    "Adi Remets", "Mekoni", "Chercher", "Hagere Selam Tigray", "Atsbi", "Quiha",
    "Edaga Arbi", "Selekleka", "Endabaguna", "Kwiha", "Wajirat", "Raya Azebo",
    "Mehoni", "Ofla", "Zata", "Tanqua Abergelle", "Dabat Tigray", "Enticho",
    "Freweyni", "Hintalo", "Adi Daero", "Tsegede", "Welkait", "Kafta Humera",
    "May Kadra", "Ahferom", "Adwa Town", "Gulomekeda", "Irob", "Ganta Afeshum",
    "Saesie Tsaeda Emba", "Tselemti", "Dagena", "Seharti", "Laelay Maychew"
  ],
  "Sidama": [
    "Hawassa", "Awassa", "Awasa", "Yirgalem", "Yirga Alem", "Aleta Wondo", "Leku", "Bensa",
    "Dale", "Aposto", "Wendo Genet", "Wondo Genet", "Bona", "Chuko", "Arbegona",
    "Hagere Selam Sidama", "Shebedino", "Bursa", "Daye", "Aroresa", "Loka Abaya",
    "Hula", "Gorche", "Boricha", "Malga", "Bilate Sidama", "Dara", "Bansa Daye"
  ],
  "Central Ethiopia": [
    "Hosaena", "Hosanna", "Hossana", "Wolkite", "Welkite", "Butajira", "Durame", "Worabe", "Worabe Town",
    "Alaba Kulito", "Alaba", "Bonga Gurage", "Gunchire", "Endibir", "Agena", "Emdibir",
    "Wolkite Town", "Hadiya", "Kembata", "Tembaro", "Shone", "Lemo", "Gibe", "Soro",
    "Homacho", "Hobicha", "Doyogena", "Kedida Gamela", "Angacha", "Damboya", "Gimbichu Gurage",
    "Sodo Gurage", "Cheha", "Enemor", "Mareko", "Silte", "Dalocha", "Kibet",
    "Meskan", "Abeshge", "Gumer", "Ezha", "Geta", "Gedebano", "Mesmes"
  ],
  "South Ethiopia": [
    "Arba Minch", "Sodo", "Wolaita Sodo", "Soddo", "Jinka", "Dilla", "Konso", "Sawla",
    "Yirga Chefe", "Chencha", "Boditi", "Areka", "Humbo", "Dimeka", "Key Afer", "Keyafer",
    "Turmi", "Weyto", "Omorate", "Mirab Abaya", "Gidole", "Karat", "Karat Konso",
    "Tercha", "Wacha", "Gesha", "Dolo Odo", "Kibre Mengist", "Bule Hora Town",
    "Wolayita", "Gofa", "Basketo", "Dawro", "Amaro", "Burji", "Derashe", "Gedeo",
    "Bako Gazer", "Hana", "Salamago", "Malie", "Benna Tsemay", "Dassenech",
    "Kucha", "Zala", "Dita", "Loma", "Mareka", "Tocha", "Gena Bosa", "Konta",
    "Amaro Kelle", "Kele", "Arbaminch Zuria", "Gamo", "Gofa Sawla", "Bonke",
    "Wenago", "Kochere", "Yirgachefe", "Gedeb", "Repi", "Chuko Gedeo"
  ],
  "South West Ethiopia Peoples": [
    "Bonga", "Mizan Teferi", "Mizan Tefri", "Tepi", "Sheko", "Masha", "Maji", "Gesha Deka",
    "Tercha Dawro", "Gimbo", "Decha", "Shewa Bench", "Bench Maji", "Kaffa", "Sheka",
    "Yeki", "Gura Ferda", "Debub Bench", "Semen Bench", "Meinit Shasha", "Meinit Goldiya",
    "Telo", "Chena", "Adiyo", "Gewata", "Menjiwo", "Bita", "Cheta", "Ginbo", "Konta Special"
  ],
  "Somali": [
    "Jigjiga", "Jijiga", "Gode", "Kebri Dahar", "Kebridehar", "Kebri Dehar", "Degehabur", "Dagahbur",
    "Warder", "Werder", "Kebri Beyah", "Dolo Ado", "Dollo Ado", "Dolo Bay", "Shilavo",
    "Filtu", "Mustahil", "Aysha", "Ayisha", "Gunagado", "Togochale", "Awbare", "Awbere",
    "Adadle", "Elekere", "Imi", "Kelafo", "Kallafo", "Hudet", "Danan", "Fiq", "Gashamo",
    "Shinile", "Sheneli", "Erer Gota", "Dolo", "Qabri Dahare", "Birkod", "Hart Sheikh",
    "Gursum Somali", "Babile Somali", "Harshin", "Jarar", "Korahe", "Liben", "Afder",
    "Moyale Somali", "Hargele", "Bare", "Charati", "Denan", "Ferfer", "Segeg", "Chinaksen",
    "Lagahida", "Hamaro", "Elkare", "Gura Dhamole", "Mubarak", "Waaf", "Berano"
  ],
  "Afar": [
    "Semera", "Semara", "Asaita", "Asayita", "Awash", "Awash Sebat", "Awash 7", "Logiya", "Logia", "Gewane",
    "Dubti", "Chifra", "Mille", "Dalol", "Abala", "Afambo", "Gelalo", "Erebti",
    "Kuneba", "Amibara", "Sardo", "Teru", "Bidu", "Elidar", "Megale", "Yalo", "Awra",
    "Ewa", "Gulina", "Adaar", "Hadelela", "Dewe", "Dulecha", "Telalak", "Berhale", "Koneba", "Afdera"
  ],
  "Benishangul-Gumuz": [
    "Assosa", "Asosa", "Gilgel Beles", "Metekel", "Kamashi", "Bambasi", "Bambesi", "Mandura",
    "Dibate", "Pawe", "Menge", "Bullen", "Dangur", "Mao-Komo", "Sherkole", "Kurmuk",
    "Gublak", "Wembera", "Debati", "Guba", "Mankush", "Oda", "Homosha", "Undulu",
    "Yaso", "Zayi", "Belojiganfoy", "Sirba Abay", "Agalometi", "Maokomo Special"
  ],
  "Gambela": [
    "Gambela", "Gambella", "Itang", "Abobo", "Gog", "Dimma", "Pugnido", "Pinyudo", "Metti",
    "Akobo", "Jikawo", "Jor", "Gilo", "Lare", "Wanthoa", "Makuey", "Godere", "Mengesh",
    "Agnuak", "Nuer", "Majang", "Mezhenger", "Gambela Town", "Ukuna", "Tergol"
  ],
  "Harari": [
    "Harar", "Harer", "Sofi", "Aw Abdal", "Erer", "Dire Teyara", "Amir Nur", "Abadir",
    "Hakim", "Shenkor", "Jinela", "Hundene", "Sofi Harari", "Kersa Harari", "Dire Teyara Harari"
  ]
};

// Flatten and collect unique primary display names for quick access
const ALL_ETHIOPIAN_PLACES = Array.from(
  new Set(Object.values(ETHIOPIAN_BIRTHPLACES_DATABASE).flat())
);

const STORAGE_KEY = 'magic_cv_form_draft';

export default function App() {
  const [formData, setFormData] = useState<CVFormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { return defaultCVFormData; }
    }
    return defaultCVFormData;
  });

  const [draftRestoredNotice, setDraftRestoredNotice] = useState<boolean>(() => Boolean(localStorage.getItem(STORAGE_KEY)));
  const [isBatchDragging, setIsBatchDragging] = useState(false);
  const [dragActiveField, setDragActiveField] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Birthplace autocomplete local state
  const [birthplaceInput, setBirthplaceInput] = useState<string>(() => formData.placeOfBirth || 'Addis Ababa');
  const [isBirthplaceDropdownOpen, setIsBirthplaceDropdownOpen] = useState<boolean>(false);
  const [isOutsideEthiopia, setIsOutsideEthiopia] = useState<boolean>(false);
  const birthplaceWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (birthplaceWrapperRef.current && !birthplaceWrapperRef.current.contains(event.target as Node)) {
        setIsBirthplaceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to completely reset all candidate details and attachments?')) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData(defaultCVFormData);
      setBirthplaceInput('Addis Ababa');
      setDraftRestoredNotice(false);
    }
  };

  const calculateAge = (dobStr: string, refDateStr?: string): number => {
    if (!dobStr) return 0;
    const birthDate = new Date(dobStr);
    const refDate = refDateStr ? new Date(refDateStr) : new Date();
    if (isNaN(birthDate.getTime()) || isNaN(refDate.getTime())) return 0;
    let age = refDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = refDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && refDate.getDate() < birthDate.getDate())) age--;
    return Math.max(0, age);
  };

  const calculatePassportExpiry = (issueDateStr: string, passportNo: string, dobStr: string) => {
    if (!issueDateStr) return '';
    const issueDate = new Date(issueDateStr);
    if (isNaN(issueDate.getTime())) return '';

    const cleanPass = (passportNo || '').trim().toUpperCase();
    const ageAtIssue = calculateAge(dobStr, issueDateStr);

    let yearsToAdd = 5;
    if (cleanPass.startsWith('EQ') || cleanPass.startsWith('EP')) {
      yearsToAdd = 5;
    } else if (cleanPass.startsWith('E')) {
      yearsToAdd = ageAtIssue >= 25 ? 10 : 5;
    }

    const expiryDate = new Date(issueDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + yearsToAdd);
    expiryDate.setDate(expiryDate.getDate() - 1);
    return expiryDate.toISOString().split('T')[0];
  };

  const handleDobChange = (dobString: string) => {
    const ageVal = dobString ? calculateAge(dobString).toString() : '';
    const expiryStr = calculatePassportExpiry(formData.passportDateOfIssue || '', formData.passportNumber || '', dobString);
    setFormData({
      ...formData,
      dateOfBirth: dobString,
      age: ageVal,
      passportDateOfExpiry: expiryStr || formData.passportDateOfExpiry
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

  const getPassportValidityStatus = () => {
    if (!formData.passportDateOfExpiry) return { valid: true, message: '' };
    const expiry = new Date(formData.passportDateOfExpiry);
    const today = new Date();
    if (isNaN(expiry.getTime())) return { valid: true, message: '' };

    if (expiry < today) {
      return { valid: false, isError: true, message: 'Passport is expired!' };
    }

    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    if (expiry < sixMonthsLater) {
      return { valid: true, isWarning: true, message: 'Warning: Passport has less than 6 months validity left.' };
    }

    if (formData.passportDateOfIssue) {
      const issue = new Date(formData.passportDateOfIssue);
      if (expiry <= issue) {
        return { valid: false, isError: true, message: 'Expiry date must be after issue date!' };
      }
    }

    return { valid: true, message: '' };
  };

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
      if (name.includes('full') || name.includes('body') || name.includes('standing')) {
        processFileRead('fullBodyPhoto', file);
      } else if (name.includes('head') || name.includes('face') || name.includes('passport_photo')) {
        processFileRead('headshotPhoto', file);
      } else if (name.includes('passport') || name.includes('pass')) {
        processFileRead('passportScan', file);
      } else if (name.includes('medical') || name.includes('report') || name.includes('fitness')) {
        processFileRead('medicalScan', file);
      } else {
        processFileRead('headshotPhoto', file);
      }
    });
  };

  const handleSwapImages = (fieldA: keyof CVFormData, fieldB: keyof CVFormData) => {
    setFormData((prev) => ({
      ...prev,
      [fieldA]: prev[fieldB],
      [fieldB]: prev[fieldA],
    }));
  };

  const handleAddExperience = () => {
    const currentExps = formData.previousExperiences || [];
    if (currentExps.length >= 3) return;
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

  const requiredFields = [
    formData.fullName,
    formData.nationality,
    formData.religion,
    formData.placeOfBirth,
    formData.dateOfBirth,
    formData.maritalStatus,
    formData.phoneNo,
    formData.educationalQualification,
    formData.passportNumber,
    formData.passportDateOfIssue,
    formData.passportDateOfExpiry,
    formData.passportPlaceOfIssue,
  ];
  const completedCount = requiredFields.filter((f) => Boolean(f && f.trim() !== '')).length;
  const isFormValid = completedCount === requiredFields.length && getPassportValidityStatus().valid;

  const passportStatus = getPassportValidityStatus();

  // Filter birthplace options based on user query (case-insensitive, prefix match prioritized)
  const query = birthplaceInput.trim().toLowerCase();
  const filteredBirthplaces = query === '' 
    ? ALL_ETHIOPIAN_PLACES.slice(0, 50) 
    : ALL_ETHIOPIAN_PLACES.filter(place => place.toLowerCase().includes(query)).sort((a, b) => {
        const aStartsWith = a.toLowerCase().startsWith(query) ? 0 : 1;
        const bStartsWith = b.toLowerCase().startsWith(query) ? 0 : 1;
        return aStartsWith - bStartsWith;
      });

  return (
      <CVFormContext.Provider value={{ formData, setFormData, resetForm: handleReset }}>
      <div className="min-h-screen bg-[#F1F5F9] text-[#1E293B] flex flex-col font-sans">
        <header className="bg-[#08265F] border-b-4 border-[#0BBF93] shadow-2xl py-5 px-6 sm:px-10 flex items-center justify-between text-white">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-slate-900/60 rounded-xl border-2 border-[#0BBF93]/60 shadow-lg flex items-center justify-center backdrop-blur-sm">
          <img 
            src={goldLogoImg} 
            alt="Tesnim CV Studio Gold Logo" 
            className="h-16 w-auto object-contain drop-shadow-md" 
          />
        </div>
        <div className="flex flex-col text-left">
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white drop-shadow-sm">
            Tesnim CV Studio
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#0BBF93] tracking-wide mt-0.5">
            Tesnim Foreign Employment Agency
          </p>
        </div>
      </div>
      
      {/* Right side agency selector / controls */}
      <div className="flex items-center gap-3 bg-slate-900/40 px-4 py-2 rounded-lg border border-slate-700/60 shadow-inner">
        <span className="text-xs sm:text-sm font-semibold text-slate-300">Primary Agency:</span>
        <select 
          value={formData.selectedPartner || 'darein'} 
          onChange={(e) => setFormData({ ...formData, selectedPartner: e.target.value as any })}
          className="bg-slate-800 text-white font-medium text-xs sm:text-sm px-3 py-1.5 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0BBF93]"
        >
          <option value="darein">Darein Est (Kuwait)</option>
          <option value="al_andalus">Al-Andalus (Kuwait)</option>
          <option value="general_purpose">General Recruitment</option>
        </select>
      </div>
    </header>

        <main className="flex-1 max-w-[1160px] w-full mx-auto p-6 md:p-8 space-y-8">
          {draftRestoredNotice && (
            <div className="bg-[#F0FDF4] border border-[#16A34A]/30 rounded-xl p-4 flex items-center justify-between text-sm font-semibold text-[#16A34A] shadow-xs">
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#16A34A]" />
                <span>Autosaved candidate draft restored successfully.</span>
              </span>
              <button type="button" onClick={() => setDraftRestoredNotice(false)} className="text-[#16A34A] underline cursor-pointer">
                Dismiss
              </button>
            </div>
          )}

          <div className="bg-[#FFFBEB] border border-[#D97706]/30 rounded-xl p-4 flex items-center gap-3 text-xs text-[#D97706] font-medium shadow-xs">
            <ShieldAlert className="w-5 h-5 text-[#D97706] shrink-0" />
            <span>
              <strong>Privacy Notice:</strong> This application processes sensitive candidate details (Passports & Medical Scans). Data is kept strictly in-browser and never exposed through public image caches.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section 1: Basic Personal Details */}
            <div className="bg-white border border-[#CBD5E1] rounded-[12px] p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[#F1F5F9] pb-4 text-[#0F2A5C] font-semibold text-[17px]">
                <User className="w-6 h-6 text-[#0E8F86]" />
                <span>1. Basic & Personal Details</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Candidate Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Nationality *</label>
                  <select
                    value={formData.nationality || 'Ethiopian'}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  >
                    {NATIONALITIES.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Religion *</label>
                  <select
                    value={formData.religion || 'Muslim'}
                    onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  >
                    {RELIGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* Searchable Place of Birth Field with Autocomplete & Outside Ethiopia Toggle */}
                <div className="space-y-1.5 relative" ref={birthplaceWrapperRef}>
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-medium text-[#475569]">Place of Birth *</label>
                    <label className="text-[11px] font-semibold text-[#0E8F86] flex items-center gap-1 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={isOutsideEthiopia}
                        onChange={(e) => {
                          setIsOutsideEthiopia(e.target.checked);
                          if (e.target.checked) {
                            setBirthplaceInput('');
                            setFormData({ ...formData, placeOfBirth: '' });
                          } else {
                            setBirthplaceInput('Addis Ababa');
                            setFormData({ ...formData, placeOfBirth: 'Addis Ababa' });
                          }
                        }}
                        className="rounded accent-[#0E8F86]"
                      />
                      <span>Born outside Ethiopia?</span>
                    </label>
                  </div>

                  {isOutsideEthiopia ? (
                    <input
                      type="text"
                      placeholder="Enter foreign city & country..."
                      value={formData.placeOfBirth || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBirthplaceInput(val);
                        setFormData({ ...formData, placeOfBirth: val });
                      }}
                      className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                    />
                  ) : (
                    <div className="relative">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          placeholder="Search or type Ethiopian city..."
                          value={birthplaceInput}
                          onFocus={() => setIsBirthplaceDropdownOpen(true)}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBirthplaceInput(val);
                            setFormData({ ...formData, placeOfBirth: val });
                            setIsBirthplaceDropdownOpen(true);
                          }}
                          className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] pl-3.5 pr-9 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                        />
                        <Search className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>

                      {isBirthplaceDropdownOpen && (
                        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                          {filteredBirthplaces.length > 0 ? (
                            filteredBirthplaces.map((place) => (
                              <button
                                key={place}
                                type="button"
                                onClick={() => {
                                  setBirthplaceInput(place);
                                  setFormData({ ...formData, placeOfBirth: place });
                                  setIsBirthplaceDropdownOpen(false);
                                }}
                                className="w-full text-left px-3.5 py-2 text-xs hover:bg-[#F0FDF4] hover:text-[#0E8F86] font-medium border-b border-slate-100 last:border-none transition-colors"
                              >
                                {place}
                              </button>
                            ))
                          ) : (
                            <div className="px-3.5 py-2.5 text-xs text-slate-400 italic">
                              Custom location "{birthplaceInput}" will be saved.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => handleDobChange(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <label className="text-[13px] font-medium text-[#475569]">Age</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      readOnly
                      value={formData.age ? `${formData.age} Yrs` : ''}
                      className="w-full bg-[#E2E8F0] border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] font-bold text-[#0F2A5C] cursor-not-allowed pr-14"
                    />
                    <span className="absolute right-2 text-[10px] font-bold bg-[#CBD5E1] text-[#0F2A5C] px-1.5 py-0.5 rounded uppercase">
                      Auto
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Marital Status *</label>
                  <select
                    value={formData.maritalStatus || 'Single'}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  >
                    {MARITAL_STATUSES.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Height (cm)</label>
                  <input
                    type="text"
                    value={formData.height || ''}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Weight (kg)</label>
                  <input
                    type="text"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Phone Number *</label>
                  <input
                    type="text"
                    value={formData.phoneNo || ''}
                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Education Level *</label>
                  <select
                    value={formData.educationalQualification || 'Primary Education'}
                    onChange={(e) => setFormData({ ...formData, educationalQualification: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  >
                    {EDUCATION_LEVELS.map((ed) => <option key={ed} value={ed}>{ed}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Passport Details */}
            <div className="bg-white border border-[#CBD5E1] rounded-[12px] p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[#F1F5F9] pb-4 text-[#0F2A5C] font-semibold text-[17px]">
                <FileText className="w-6 h-6 text-[#0E8F86]" />
                <span>2. Passport Details</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Passport Number *</label>
                  <input
                    type="text"
                    value={formData.passportNumber || ''}
                    onChange={(e) => handlePassportNoChange(e.target.value)}
                    placeholder="e.g. EQ454545 or E1234567"
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Date of Issue *</label>
                  <input
                    type="date"
                    value={formData.passportDateOfIssue || ''}
                    onChange={(e) => handleIssueDateChange(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <label className="text-[13px] font-medium text-[#475569]">Date of Expiry *</label>
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      value={formData.passportDateOfExpiry || ''}
                      onChange={(e) => setFormData({ ...formData, passportDateOfExpiry: e.target.value })}
                      className={`w-full border rounded-[8px] h-[40px] px-3.5 text-[14px] ${
                        passportStatus.isError
                          ? 'bg-[#FEF2F2] border-[#DC2626] text-[#DC2626]'
                          : passportStatus.isWarning
                          ? 'bg-[#FFFBEB] border-[#D97706] text-[#D97706]'
                          : 'bg-[#E2E8F0] border-[#CBD5E1] text-[#0F2A5C] font-bold'
                      }`}
                    />
                    {!passportStatus.isError && !passportStatus.isWarning && (
                      <span className="absolute right-2 text-[10px] font-bold bg-[#CBD5E1] text-[#0F2A5C] px-1.5 py-0.5 rounded uppercase">
                        Auto
                      </span>
                    )}
                  </div>
                </div>

                {passportStatus.message && (
                  <div className={`col-span-2 text-xs font-semibold p-3 rounded-lg flex items-center gap-2 ${
                    passportStatus.isError ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#FFFBEB] text-[#D97706]'
                  }`}>
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{passportStatus.message}</span>
                  </div>
                )}

                <div className="col-span-2 space-y-1.5">
                  <label className="text-[13px] font-medium text-[#475569]">Place of Issue *</label>
                  <input
                    type="text"
                    value={formData.passportPlaceOfIssue || ''}
                    onChange={(e) => setFormData({ ...formData, passportPlaceOfIssue: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
                <div className="flex items-center gap-2 text-[#0F2A5C] font-semibold text-sm">
                  <Globe className="w-4 h-4 text-[#0E8F86]" />
                  <span>Language Proficiency</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#475569]">Arabic Level</label>
                    <select
                      value={formData.languages?.arabic || 'Basic'}
                      onChange={(e) => setFormData({ ...formData, languages: { ...formData.languages, arabic: e.target.value } })}
                      className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Fair">Fair</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#475569]">English Level</label>
                    <select
                      value={formData.languages?.english || 'Basic'}
                      onChange={(e) => setFormData({ ...formData, languages: { ...formData.languages, english: e.target.value } })}
                      className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-3.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
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
            <div className="bg-white border border-[#CBD5E1] rounded-[12px] p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[#F1F5F9] pb-4 text-[#0F2A5C] font-semibold text-[17px]">
                <Award className="w-6 h-6 text-[#0E8F86]" />
                <span>3. Skills & Capabilities</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                {['babySitting', 'washing', 'cleaning', 'cooking', 'sewing', 'driving'].map((skillKey) => {
                  const isActive = Boolean(formData.skills?.[skillKey as keyof typeof formData.skills]);
                  const labelEn: Record<string, string> = {
                    babySitting: 'Baby Sitting', washing: 'Washing', cleaning: 'Cleaning',
                    cooking: 'Cooking', sewing: 'Sewing', driving: 'Driving'
                  };
                  const labelAr: Record<string, string> = {
                    babySitting: 'رعاية الأطفال', washing: 'الغسيل', cleaning: 'التنظيف',
                    cooking: 'الطبخ', sewing: 'الخياطة', driving: 'القيادة'
                  };

                  return (
                    <button
                      key={skillKey}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        skills: { ...formData.skills, [skillKey]: !isActive }
                      })}
                      className={`p-3.5 rounded-[8px] border text-left transition-all flex items-center justify-between cursor-pointer min-h-[44px] ${
                        isActive
                          ? 'bg-[#0F2A5C] border-[#0F2A5C] text-white font-semibold shadow-xs'
                          : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#1E293B] hover:bg-slate-200'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium">{labelEn[skillKey]}</span>
                        <span dir="rtl" className="text-[15px] text-[#0E8F86] font-bold leading-tight">
                          {labelAr[skillKey]}
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isActive ? 'bg-[#0E8F86] text-white' : 'border border-[#CBD5E1] bg-white'}`}>
                        {isActive && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Previous Work Experience */}
            <div className="bg-white border border-[#CBD5E1] rounded-[12px] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between py-5 px-8 border-b border-[#F1F5F9] pb-4 text-[#0F2A5C] font-semibold text-[17px]">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-6 h-6 text-[#0E8F86]" />
                  <span>4. Work Experience (Arab / GCC)</span>
                </div>
                <span className="text-xs text-[#475569] font-semibold">
                  {(formData.previousExperiences || []).length} / 3 Max
                </span>
              </div>

              <div className="space-y-3.5">
                {formData.previousExperiences?.map((exp, idx) => (
                  <div key={idx} className="p-3.5 bg-[#F1F5F9] rounded-[8px] border border-[#CBD5E1] flex flex-wrap md:flex-nowrap items-center gap-2.5">
                    <div className="flex-1 min-w-[130px]">
                      <label className="text-[11px] font-medium text-[#475569] block mb-0.5">Country</label>
                      <select
                        value={exp.country}
                        onChange={(e) => handleExperienceUpdate(idx, 'country', e.target.value)}
                        className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                      >
                        {ARAB_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="w-24">
                      <label className="text-[11px] font-medium text-[#475569] block mb-0.5">Years</label>
                      <select
                        value={exp.years || '0'}
                        onChange={(e) => handleExperienceUpdate(idx, 'years', e.target.value)}
                        className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-2 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => <option key={y} value={y}>{y} Yrs</option>)}
                      </select>
                    </div>

                    <div className="w-24">
                      <label className="text-[11px] font-medium text-[#475569] block mb-0.5">Months</label>
                      <select
                        value={exp.months || '0'}
                        onChange={(e) => handleExperienceUpdate(idx, 'months', e.target.value)}
                        className="w-full bg-white border border-[#CBD5E1] rounded-[8px] h-[40px] px-2 text-[14px] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0E8F86]"
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => <option key={m} value={m}>{m} Mos</option>)}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(idx)}
                      className="w-10 h-10 flex items-center justify-center text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors cursor-pointer mt-3 md:mt-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                {(formData.previousExperiences || []).length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="w-full h-[40px] border-2 border-dashed border-[#0E8F86] hover:bg-[#F0FDF4] text-[#0F2A5C] font-semibold text-xs rounded-[8px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-[#0E8F86]" />
                    <span>Add Previous Work Experience</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Image & Document Attachments */}
          <div className="bg-white border border-[#CBD5E1] rounded-[12px] p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between py-5 px-8 border-b border-[#F1F5F9] pb-4 text-[#0F2A5C] font-semibold text-[17px]">
              <div className="flex items-center gap-2.5">
                <Upload className="w-6 h-6 text-[#0E8F86]" />
                <span>5. Image & Document Attachments</span>
              </div>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsBatchDragging(true); }}
              onDragLeave={() => setIsBatchDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsBatchDragging(false);
                handleBatchUpload(e.dataTransfer.files);
              }}
              className={`border-2 border-dashed rounded-[12px] p-7 text-center transition-all ${
                isBatchDragging ? 'border-[#0E8F86] bg-[#F0FDF4]' : 'border-[#CBD5E1] bg-[#F1F5F9] hover:bg-slate-200'
              }`}
            >
              <Layers className="w-10 h-10 text-[#0F2A5C] mx-auto mb-2" />
              <p className="text-base font-bold text-[#0F2A5C]">BATCH DROP FILES TO AUTO-ASSIGN</p>
              <p className="text-xs text-[#475569] mt-1 font-medium">
                Drag multiple image files here or click to select (Auto-assigns: Headshot, Full Body, Passport, Medical)
              </p>
              <label className="mt-4 inline-block px-6 py-2.5 bg-[#0F2A5C] hover:bg-[#061A40] text-white rounded-[8px] text-xs font-semibold cursor-pointer transition-colors shadow-xs">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {[
                { key: 'headshotPhoto', label: 'Headshot Photo (3:4)', placeholder: 'No Photo' },
                { key: 'fullBodyPhoto', label: 'Full Body Photo (9:16)', placeholder: 'No Photo' },
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
                    className={`border border-[#CBD5E1] bg-[#F1F5F9] rounded-[12px] p-5 flex flex-col items-center justify-between text-center space-y-4 min-h-[260px] transition-all ${
                      dragActiveField === item.key ? 'border-[#0E8F86] bg-[#F0FDF4]' : ''
                    }`}
                  >
                    <span className="text-[13px] font-semibold text-[#0F2A5C]">{item.label}</span>

                    <div className="w-full flex-1 flex items-center justify-center p-2 bg-white rounded-[8px] border border-[#CBD5E1] max-h-[180px] overflow-hidden relative group">
                      {value ? (
                        <div className="relative flex items-center justify-center w-full h-full">
                          <img 
                            src={value} 
                            alt={item.label} 
                            className={`max-h-full max-w-full object-contain rounded shadow-xs cursor-zoom-in ${
                              item.key === 'headshotPhoto' ? 'aspect-[3/4]' : item.key === 'fullBodyPhoto' ? 'aspect-[9/16]' : ''
                            }`}
                            onClick={() => setZoomedImage(value)}
                          />
                          <button
                            type="button"
                            onClick={() => setZoomedImage(value)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white rounded cursor-zoom-in"
                          >
                            <Maximize2 className="w-6 h-6" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[#475569] text-xs font-semibold">{item.placeholder}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="px-3.5 py-2 bg-white border border-[#CBD5E1] hover:border-[#0E8F86] text-[#1E293B] font-semibold text-xs rounded-[8px] cursor-pointer transition-colors shadow-2xs">
                        Choose / Drop
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) processFileRead(fieldKey, e.target.files[0]);
                          }}
                        />
                      </label>

                      {item.key === 'headshotPhoto' && formData.fullBodyPhoto && (
                        <button
                          type="button"
                          onClick={() => handleSwapImages('headshotPhoto', 'fullBodyPhoto')}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-[#1E293B] font-semibold text-xs rounded-[8px] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowRightLeft className="w-4 h-4" />
                          <span>Swap Body</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inline Action Bar */}
          <div className="bg-white border border-[#CBD5E1] rounded-[12px] p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 bg-[#FEF2F2] hover:bg-rose-100 text-[#DC2626] font-semibold rounded-[8px] text-xs transition-colors flex items-center gap-2 cursor-pointer border border-[#DC2626]/30"
            >
              <Trash2 className="w-4 h-4 text-[#DC2626]" />
              <span>Reset All Form Data</span>
            </button>

            <div className="flex flex-wrap items-center gap-4">
              <span className={`text-xs font-semibold px-4 py-2 rounded-[8px] border ${
                isFormValid ? 'bg-[#F0FDF4] text-[#16A34A] border-[#16A34A]/30' : 'bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]'
              }`}>
                {completedCount} / {requiredFields.length} Required Fields
              </span>

              <PreviewModalButton formData={formData} />
              <PreviewModalButton formData={formData} isGenerateOnly={true} />
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-[#CBD5E1] py-8 text-center text-xs text-[#475569] space-y-1.5 mt-8">
          <p className="font-semibold text-sm text-[#0F2A5C]">Tesnim Foreign Employment Agency • Tesnim CV Studio</p>
          <p className="font-medium">Contact: +251 908 282828 / +251 111 280000 │ Email: tesnimagency2828@gmail.com</p>
        </footer>

        {/* Click-to-Zoom Image Modal */}
        {zoomedImage && (
          <div 
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={zoomedImage} alt="Zoomed View" className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" />
          </div>
        )}
      </div>
    </CVFormContext.Provider>
  );
}