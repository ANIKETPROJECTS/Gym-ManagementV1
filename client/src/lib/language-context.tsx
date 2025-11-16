import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile & Settings',
    
    // Profile & Settings Page
    'profile.title': 'Profile & Settings',
    'profile.personalInfo': 'Personal Information',
    'profile.healthProfile': 'Health Profile',
    'profile.notifications': 'Notification Preferences',
    'profile.privacy': 'Privacy Settings',
    'profile.subscription': 'Subscription Management',
    'profile.payments': 'Payment History',
    'profile.appearance': 'Appearance',
    'profile.language': 'Language',
    
    // Personal Information
    'personal.name': 'Name',
    'personal.phone': 'Phone Number',
    'personal.email': 'Email Address',
    'personal.bio': 'Bio',
    'personal.address': 'Address',
    'personal.photo': 'Profile Photo',
    'personal.uploadPhoto': 'Upload Photo',
    'personal.save': 'Save Changes',
    
    // Health Profile
    'health.medicalConditions': 'Medical Conditions',
    'health.injuries': 'Injuries',
    'health.fitnessLevel': 'Fitness Level',
    'health.limitations': 'Physical Limitations',
    'health.beginner': 'Beginner',
    'health.intermediate': 'Intermediate',
    'health.advanced': 'Advanced',
    'health.addCondition': 'Add Condition',
    'health.addInjury': 'Add Injury',
    
    // Notifications
    'notif.email': 'Email Notifications',
    'notif.sessionReminders': 'Session Reminders',
    'notif.achievements': 'Achievement Alerts',
    'notif.workouts': 'Workout Notifications',
    'notif.diet': 'Diet Plan Updates',
    'notif.messages': 'Messages',
    
    // Privacy
    'privacy.showEmail': 'Show Email to Others',
    'privacy.showPhone': 'Show Phone to Others',
    'privacy.showProgress': 'Show Progress to Others',
    'privacy.publicProfile': 'Public Profile',
    
    // Subscription
    'sub.currentPlan': 'Current Plan',
    'sub.price': 'Price',
    'sub.billingCycle': 'Billing Cycle',
    'sub.nextBilling': 'Next Billing Date',
    'sub.features': 'Features',
    'sub.upgradePlan': 'Upgrade Plan',
    'sub.cancelSubscription': 'Cancel Subscription',
    'sub.monthly': 'Monthly',
    
    // Payment History
    'payment.date': 'Date',
    'payment.amount': 'Amount',
    'payment.status': 'Status',
    'payment.invoice': 'Invoice',
    'payment.receipt': 'Receipt',
    'payment.method': 'Payment Method',
    'payment.download': 'Download',
    'payment.noHistory': 'No payment history available',
    
    // Appearance
    'appearance.darkMode': 'Dark Mode',
    'appearance.theme': 'Theme',
    'appearance.light': 'Light',
    'appearance.dark': 'Dark',
    
    // Language
    'lang.select': 'Select Language',
    'lang.english': 'English',
    'lang.hindi': 'Hindi',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.update': 'Update',
    'common.loading': 'Loading...',
    'common.success': 'Success!',
    'common.error': 'Error',
    'common.confirm': 'Confirm',
    
    // Messages
    'msg.profileUpdated': 'Profile updated successfully',
    'msg.settingsSaved': 'Settings saved successfully',
    'msg.error': 'An error occurred. Please try again.',
    
    // Additional Profile Page strings
    'profile.memberSince': 'Member since',
    'profile.editProfile': 'Edit Profile',
    'profile.contactInfo': 'Contact Information',
    'profile.fullName': 'Full Name',
    'profile.bioPlaceholder': 'Tell us about yourself, your fitness goals...',
    'profile.active': 'Active',
    'profile.plan': 'Plan',
    'health.healthProfileDesc': 'Manage your health information and fitness level',
    'health.selectFitnessLevel': 'Select your fitness level',
    'health.medicalPlaceholder': 'List any medical conditions (e.g., diabetes, hypertension...)',
    'health.separateComma': 'Separate multiple conditions with commas',
    'health.injuriesPlaceholder': 'List any injuries or surgeries (e.g., knee injury, back surgery...)',
    'health.separateItems': 'Separate multiple items with commas',
    'health.limitationsPlaceholder': 'Describe any physical limitations or restrictions...',
    'health.saveProfile': 'Save Health Profile',
    'common.saving': 'Saving...',
    'sub.perMonth': '/month',
    'sub.workoutVideos': 'Access to all recorded workout videos',
    'sub.dietManagement': 'Personalized diet management',
    'sub.progressTracking': 'Progress tracking and analytics',
    'sub.changePlan': 'Change Plan',
    'payment.viewReceipts': 'View your invoices and payment receipts',
    'notif.notifPrefs': 'Notification Preferences',
    'notif.emailDesc': 'Receive email updates about your progress',
    'notif.sessionDesc': 'Get notified before live sessions',
    'notif.achievementsDesc': 'Celebrate your milestones',
    'appearance.appearanceTitle': 'Appearance',
    'appearance.appearanceDesc': 'Customize how FitPro looks to you',
    'appearance.darkModeDesc': 'Switch between light and dark themes',
    'lang.languageRegion': 'Language & Region',
    'lang.preferredLanguage': 'Preferred Language',
    'lang.selectLanguage': 'Select language',
    'lang.hindiDisplay': 'हिंदी (Hindi)',
    'lang.englishDisplay': 'English',
    'lang.savePreferences': 'Save Preferences',
    'goals.fitnessGoals': 'Fitness Goals',
    'goals.targetWeight': 'Target Weight (lbs)',
    'goals.weeklyGoal': 'Weekly Workout Goal',
    'goals.updateGoals': 'Update Goals',
    'privacy.privacySettings': 'Privacy Settings',
    'privacy.privacyDesc': 'Control what information is visible to others',
    'privacy.showEmailDesc': 'Allow others to see your email',
    'privacy.showPhoneDesc': 'Allow others to see your phone number',
    'privacy.showProgressDesc': 'Allow trainers to see your workout progress',
    'privacy.savePrivacy': 'Save Privacy Settings',
    'tabs.personal': 'Personal',
    'tabs.health': 'Health',
    'tabs.subscription': 'Subscription',
    'tabs.payments': 'Payments',
    'tabs.preferences': 'Preferences',
    'tabs.privacy': 'Privacy',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.profile': 'प्रोफाइल और सेटिंग्स',
    
    // Profile & Settings Page
    'profile.title': 'प्रोफाइल और सेटिंग्स',
    'profile.personalInfo': 'व्यक्तिगत जानकारी',
    'profile.healthProfile': 'स्वास्थ्य प्रोफाइल',
    'profile.notifications': 'सूचना प्राथमिकताएं',
    'profile.privacy': 'गोपनीयता सेटिंग्स',
    'profile.subscription': 'सदस्यता प्रबंधन',
    'profile.payments': 'भुगतान इतिहास',
    'profile.appearance': 'दिखावट',
    'profile.language': 'भाषा',
    
    // Personal Information
    'personal.name': 'नाम',
    'personal.phone': 'फोन नंबर',
    'personal.email': 'ईमेल पता',
    'personal.bio': 'बायो',
    'personal.address': 'पता',
    'personal.photo': 'प्रोफाइल फोटो',
    'personal.uploadPhoto': 'फोटो अपलोड करें',
    'personal.save': 'परिवर्तन सहेजें',
    
    // Health Profile
    'health.medicalConditions': 'चिकित्सा स्थितियां',
    'health.injuries': 'चोटें',
    'health.fitnessLevel': 'फिटनेस स्तर',
    'health.limitations': 'शारीरिक सीमाएं',
    'health.beginner': 'शुरुआती',
    'health.intermediate': 'मध्यवर्ती',
    'health.advanced': 'उन्नत',
    'health.addCondition': 'स्थिति जोड़ें',
    'health.addInjury': 'चोट जोड़ें',
    
    // Notifications
    'notif.email': 'ईमेल सूचनाएं',
    'notif.sessionReminders': 'सत्र अनुस्मारक',
    'notif.achievements': 'उपलब्धि अलर्ट',
    'notif.workouts': 'वर्कआउट सूचनाएं',
    'notif.diet': 'आहार योजना अपडेट',
    'notif.messages': 'संदेश',
    
    // Privacy
    'privacy.showEmail': 'दूसरों को ईमेल दिखाएं',
    'privacy.showPhone': 'दूसरों को फोन दिखाएं',
    'privacy.showProgress': 'दूसरों को प्रगति दिखाएं',
    'privacy.publicProfile': 'सार्वजनिक प्रोफाइल',
    
    // Subscription
    'sub.currentPlan': 'वर्तमान योजना',
    'sub.price': 'कीमत',
    'sub.billingCycle': 'बिलिंग चक्र',
    'sub.nextBilling': 'अगली बिलिंग तारीख',
    'sub.features': 'विशेषताएं',
    'sub.upgradePlan': 'योजना अपग्रेड करें',
    'sub.cancelSubscription': 'सदस्यता रद्द करें',
    'sub.monthly': 'मासिक',
    
    // Payment History
    'payment.date': 'तारीख',
    'payment.amount': 'राशि',
    'payment.status': 'स्थिति',
    'payment.invoice': 'चालान',
    'payment.receipt': 'रसीद',
    'payment.method': 'भुगतान विधि',
    'payment.download': 'डाउनलोड',
    'payment.noHistory': 'कोई भुगतान इतिहास उपलब्ध नहीं',
    
    // Appearance
    'appearance.darkMode': 'डार्क मोड',
    'appearance.theme': 'थीम',
    'appearance.light': 'लाइट',
    'appearance.dark': 'डार्क',
    
    // Language
    'lang.select': 'भाषा चुनें',
    'lang.english': 'अंग्रेज़ी',
    'lang.hindi': 'हिंदी',
    
    // Common
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.add': 'जोड़ें',
    'common.update': 'अपडेट करें',
    'common.loading': 'लोड हो रहा है...',
    'common.success': 'सफलता!',
    'common.error': 'त्रुटि',
    'common.confirm': 'पुष्टि करें',
    
    // Messages
    'msg.profileUpdated': 'प्रोफाइल सफलतापूर्वक अपडेट हुआ',
    'msg.settingsSaved': 'सेटिंग्स सफलतापूर्वक सहेजी गईं',
    'msg.error': 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
    
    // Additional Profile Page strings
    'profile.memberSince': 'सदस्य बने',
    'profile.editProfile': 'प्रोफाइल संपादित करें',
    'profile.contactInfo': 'संपर्क जानकारी',
    'profile.fullName': 'पूरा नाम',
    'profile.bioPlaceholder': 'अपने बारे में बताएं, अपने फिटनेस लक्ष्य...',
    'profile.active': 'सक्रिय',
    'profile.plan': 'योजना',
    'health.healthProfileDesc': 'अपनी स्वास्थ्य जानकारी और फिटनेस स्तर प्रबंधित करें',
    'health.selectFitnessLevel': 'अपना फिटनेस स्तर चुनें',
    'health.medicalPlaceholder': 'कोई चिकित्सा स्थिति बताएं (जैसे, मधुमेह, उच्च रक्तचाप...)',
    'health.separateComma': 'अनेक स्थितियों को अल्पविराम से अलग करें',
    'health.injuriesPlaceholder': 'कोई चोट या सर्जरी बताएं (जैसे, घुटने की चोट, पीठ की सर्जरी...)',
    'health.separateItems': 'अनेक वस्तुओं को अल्पविराम से अलग करें',
    'health.limitationsPlaceholder': 'कोई शारीरिक सीमाएं या प्रतिबंध बताएं...',
    'health.saveProfile': 'स्वास्थ्य प्रोफाइल सहेजें',
    'common.saving': 'सहेज रहे हैं...',
    'sub.perMonth': '/महीना',
    'sub.workoutVideos': 'सभी रिकॉर्ड किए गए वर्कआउट वीडियो तक पहुंच',
    'sub.dietManagement': 'व्यक्तिगत आहार प्रबंधन',
    'sub.progressTracking': 'प्रगति ट्रैकिंग और विश्लेषण',
    'sub.changePlan': 'योजना बदलें',
    'payment.viewReceipts': 'अपने बिल और भुगतान रसीदें देखें',
    'notif.notifPrefs': 'सूचना प्राथमिकताएं',
    'notif.emailDesc': 'अपनी प्रगति के बारे में ईमेल अपडेट प्राप्त करें',
    'notif.sessionDesc': 'लाइव सत्र से पहले सूचना प्राप्त करें',
    'notif.achievementsDesc': 'अपनी उपलब्धियां मनाएं',
    'appearance.appearanceTitle': 'स्वरूप',
    'appearance.appearanceDesc': 'FitPro का स्वरूप अनुकूलित करें',
    'appearance.darkModeDesc': 'लाइट और डार्क थीम के बीच स्विच करें',
    'lang.languageRegion': 'भाषा और क्षेत्र',
    'lang.preferredLanguage': 'पसंदीदा भाषा',
    'lang.selectLanguage': 'भाषा चुनें',
    'lang.hindiDisplay': 'हिंदी (Hindi)',
    'lang.englishDisplay': 'English',
    'lang.savePreferences': 'प्राथमिकताएं सहेजें',
    'goals.fitnessGoals': 'फिटनेस लक्ष्य',
    'goals.targetWeight': 'लक्षित वजन (पाउंड)',
    'goals.weeklyGoal': 'साप्ताहिक वर्कआउट लक्ष्य',
    'goals.updateGoals': 'लक्ष्य अपडेट करें',
    'privacy.privacySettings': 'गोपनीयता सेटिंग्स',
    'privacy.privacyDesc': 'दूसरों को कौन सी जानकारी दिखाई देगी, नियंत्रित करें',
    'privacy.showEmailDesc': 'दूसरों को आपका ईमेल देखने दें',
    'privacy.showPhoneDesc': 'दूसरों को आपका फ़ोन नंबर देखने दें',
    'privacy.showProgressDesc': 'प्रशिक्षकों को अपनी वर्कआउट प्रगति देखने दें',
    'privacy.savePrivacy': 'गोपनीयता सेटिंग्स सहेजें',
    'tabs.personal': 'व्यक्तिगत',
    'tabs.health': 'स्वास्थ्य',
    'tabs.subscription': 'सदस्यता',
    'tabs.payments': 'भुगतान',
    'tabs.preferences': 'प्राथमिकताएं',
    'tabs.privacy': 'गोपनीयता',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('fitpro-language');
    return (stored === 'hi' || stored === 'en') ? stored : 'en';
  });

  useEffect(() => {
    localStorage.setItem('fitpro-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
