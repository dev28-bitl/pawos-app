import React, { useEffect, useState } from 'react';
import {
  Image,
  type ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Path, Rect, type SvgProps } from 'react-native-svg';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BellsIcon from './src/assets/icons/notofocation-bell.svg';
import ShieldIcon from './src/assets/icons/privacy.svg';
import HelpIcon from './src/assets/icons/help.svg';
import LogoutIcon from './src/assets/icons/log-out.svg';
import RightArrowIcon from './src/assets/icons/right-arrow.svg';
import PremiumStarIcon from './src/assets/icons/star-premium-member.svg';
import SubscriptionPlanIcon from './src/assets/icons/subscription-plan.svg';
import EditProfileIcon from './src/assets/icons/edit-profile.svg';
import BackButtonIcon from './src/assets/icons/back-button.svg';
import SettingsNavIcon from './src/assets/icons/settings-nav.svg';
import HomeNavIcon from './src/assets/icons/home-nav.svg';
import HealthNavIcon from './src/assets/icons/health-nav.svg';
import ActivityNavIcon from './src/assets/icons/activity-nav.svg';
import RecordsNavIcon from './src/assets/icons/records-icon-nav.svg';
import WeightIcon from './src/assets/icons/weight.svg';
import PawIcon from './src/assets/icons/paw.svg';
import AlertIcon from './src/assets/icons/alert.svg';
import DeleteAccountIcon from './src/assets/icons/delete-account.svg';
import FullNameIcon from './src/assets/icons/full-name.svg';
import EmailAddressIcon from './src/assets/icons/email-address.svg';
import PasswordIcon from './src/assets/icons/password.svg';
import PasswordToggleEyeIcon from './src/assets/icons/password-toggle-eye.svg';
import VerifyEmailIcon from './src/assets/icons/verify-email.svg';
import LogoIcon from './src/assets/icons/logo.svg';
// Newly added icons (PET-XXX feature assets Ã¢â‚¬â€ wired into ASSET/JSX as needed).
import WalkIcon from './src/assets/icons/Walk.svg';
import VetIcon from './src/assets/icons/Vet.svg';
import PushNotificationIcon from './src/assets/icons/push-notification.svg';
import NotificationsIcon from './src/assets/icons/notifications.svg';
import HeartRateIcon from './src/assets/icons/heart.svg';
import HealthAlertsIcon from './src/assets/icons/health-alerts.svg';
import FeedIcon from './src/assets/icons/feed.svg';
import CurrentVitalsIcon from './src/assets/icons/current-vitals.svg';
import SmartCollarIcon from './src/assets/icons/smart-collar.svg';
import LogIcon from './src/assets/icons/Log.svg';
import PawosFinalLogoIcon from './src/assets/icons/Pawos final logo.svg';
import CalendarIcon from './src/assets/icons/calendar.svg';
import BackIcon from './src/assets/icons/back-icon.svg';
import ForwardIcon from './src/assets/icons/forward-icon.svg';

// Keep typography consistent across devices with large accessibility font scales.
const textDefaultProps = (Text as unknown as { defaultProps?: { allowFontScaling?: boolean; maxFontSizeMultiplier?: number } }).defaultProps || {};
textDefaultProps.allowFontScaling = false;
textDefaultProps.maxFontSizeMultiplier = 1;
(Text as unknown as { defaultProps?: { allowFontScaling?: boolean; maxFontSizeMultiplier?: number } }).defaultProps = textDefaultProps;

const inputDefaultProps = (TextInput as unknown as { defaultProps?: { allowFontScaling?: boolean; maxFontSizeMultiplier?: number } }).defaultProps || {};
inputDefaultProps.allowFontScaling = false;
inputDefaultProps.maxFontSizeMultiplier = 1;
(TextInput as unknown as { defaultProps?: { allowFontScaling?: boolean; maxFontSizeMultiplier?: number } }).defaultProps = inputDefaultProps;

const PLACEHOLDER = {
  splashLogo: require('./src/assets/placeholders/splash-logo.png'),
  onboardingHealth: require('./src/assets/placeholders/onboarding-health 1.png'),
  onboardingActivity: require('./src/assets/placeholders/onboarding-activity 1.png'),
  authLogo: require('./src/assets/placeholders/auth-logo.png'),
  authBanner: require('./src/assets/placeholders/login-page-bottom-right.png'),
  loginTopDecor: require('./src/assets/placeholders/login-page-left-top.png'),
  otpHero: require('./src/assets/placeholders/otp-hero.png'),
  // Real profile images for populated look
  profileAvatar: require('./src/assets/placeholders/avatar-256 1.png'),
  petPhoto: require('./src/assets/placeholders/profile-avatar 1.png'),
  icon: require('./src/assets/placeholders/icon-128.png'),
} as const;

const ASSET = {
  splashLogo: PLACEHOLDER.splashLogo,
  healthIllus: PLACEHOLDER.onboardingHealth,
  healthBack: PLACEHOLDER.icon,
  healthBadge: PLACEHOLDER.icon,
  healthNext: PLACEHOLDER.icon,

  actIllus: PLACEHOLDER.onboardingActivity,
  actBack: PLACEHOLDER.icon,
  actChip: PLACEHOLDER.icon,
  actNext: PLACEHOLDER.icon,

  loginLogo: PLACEHOLDER.authLogo,
  loginGoogle: PLACEHOLDER.icon,
  loginBg: PLACEHOLDER.authBanner,
  loginTop: PLACEHOLDER.loginTopDecor,

  otpHero: PLACEHOLDER.otpHero,
  otpLock: PLACEHOLDER.icon,
  otpBack: PLACEHOLDER.icon,

  signupLogo: PLACEHOLDER.authLogo,
  signupGoogle: PLACEHOLDER.icon,
  signupName: PLACEHOLDER.icon,
  signupEmail: PLACEHOLDER.icon,
  signupLock: PLACEHOLDER.icon,
  signupEye: PLACEHOLDER.icon,
  signupApple: PLACEHOLDER.icon,

  profileTopAvatar: PLACEHOLDER.profileAvatar,
  profileAvatar: PLACEHOLDER.profileAvatar,
  profileStar: PLACEHOLDER.icon,
  petCooper: PLACEHOLDER.petPhoto,
  petLuna: PLACEHOLDER.petPhoto,
  petMax: PLACEHOLDER.petPhoto,
  bell: PLACEHOLDER.icon,
  shield: PLACEHOLDER.icon,
  plan: PLACEHOLDER.icon,
  help: PLACEHOLDER.icon,
  chevron: PLACEHOLDER.icon,
  logout: PLACEHOLDER.icon,
  edit: PLACEHOLDER.icon,
  navHome: PLACEHOLDER.icon,
  navHealth: PLACEHOLDER.icon,
  navActivity: PLACEHOLDER.icon,
  navSettings: PLACEHOLDER.icon,
} as const;

type Screen = 'splash' | 'health' | 'activity' | 'login' | 'signup' | 'otp' | 'home' | 'records' | 'add-record' | 'record-detail' | 'profile' | 'edit-profile' | 'create-pet' | 'pet-profile' | 'edit-pet';

export type PetGender = 'Male' | 'Female';
export type PetSpecies = 'Dog' | 'Cat';

export type Pet = {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  dateOfBirth: string; // ISO yyyy-mm-dd
  gender: PetGender;
  weight: string; // kg, stored as string to preserve input
  microchipNumber: string;
  photo: string; // URL or '' (uses placeholder)
};

export const DEFAULT_PETS: Pet[] = [
  { id: 'p-cooper', name: 'Cooper', species: 'Dog', breed: 'Golden Retriever', dateOfBirth: '2022-03-15', gender: 'Male', weight: '28.4', microchipNumber: '985112003456789', photo: '' },
  { id: 'p-luna', name: 'Luna', species: 'Cat', breed: 'Siamese', dateOfBirth: '2021-07-04', gender: 'Female', weight: '4.2', microchipNumber: '985112004567890', photo: '' },
  { id: 'p-max', name: 'Max', species: 'Dog', breed: 'Beagle', dateOfBirth: '2023-11-21', gender: 'Male', weight: '11.8', microchipNumber: '985112005678901', photo: '' },
];

// REC-001: Health record types
export type RecordType = 'Vaccination' | 'Medication' | 'Vet Visit' | 'Surgery' | 'Lab Result' | 'Other';

export type HealthRecord = {
  id: string;
  petId: string;
  type: RecordType;
  title: string;
  description: string;
  recordDate: string; // ISO yyyy-mm-dd
  vetName: string;
  clinicName: string;
  attachmentName?: string;
  attachmentUri?: string;
  createdAt: string; // ISO for sorting
};

// REC-002: Default sample health records
export const DEFAULT_RECORDS: HealthRecord[] = [
  {
    id: 'r-1', petId: 'p-cooper', type: 'Vaccination',
    title: 'Rabies Booster Shot', description: 'Annual rabies vaccination booster administered.',
    recordDate: '2025-10-12', vetName: 'Dr. Sarah Mitchell', clinicName: 'Paw & Claw Veterinary Clinic',
    createdAt: '2025-10-14T09:30:00Z',
  },
  {
    id: 'r-2', petId: 'p-cooper', type: 'Vet Visit',
    title: 'Annual Wellness Checkup', description: 'Complete physical examination, blood work panel, and dental check.',
    recordDate: '2025-09-20', vetName: 'Dr. James Chen', clinicName: 'Happy Paws Animal Hospital',
    createdAt: '2025-09-22T14:00:00Z',
  },
  {
    id: 'r-3', petId: 'p-luna', type: 'Medication',
    title: 'Flea & Tick Prevention', description: 'Monthly topical flea and tick prevention applied.',
    recordDate: '2025-11-01', vetName: 'Dr. Emily Park', clinicName: 'City Vet Clinic',
    attachmentName: 'prescription.pdf',
    createdAt: '2025-11-02T10:15:00Z',
  },
  {
    id: 'r-4', petId: 'p-cooper', type: 'Lab Result',
    title: 'Blood Panel Results', description: 'Complete blood count and chemistry panel. All values within normal range.',
    recordDate: '2025-08-15', vetName: 'Dr. Sarah Mitchell', clinicName: 'Paw & Claw Veterinary Clinic',
    attachmentName: 'lab-results.pdf',
    createdAt: '2025-08-17T16:45:00Z',
  },
  {
    id: 'r-5', petId: 'p-max', type: 'Surgery',
    title: 'Neuter Procedure', description: 'Routine neuter surgery performed successfully. Recovery uneventful.',
    recordDate: '2024-06-10', vetName: 'Dr. Robert Kim', clinicName: 'Greenfield Vet Center',
    createdAt: '2024-06-12T11:00:00Z',
  },
];

// REC-003: Record type display config (color + icon label)
export const RECORD_TYPE_CONFIG: Record<RecordType, { color: string; bgColor: string; icon: string }> = {
  'Vaccination':     { color: '#1F8A44', bgColor: '#DDF1D2', icon: 'ðŸ’‰' },
  'Medication':      { color: '#904D00', bgColor: '#FADBD8', icon: 'ðŸ’Š' },
  'Vet Visit':       { color: '#1A78C1', bgColor: '#D1E5F3', icon: 'ðŸ¥' },
  'Surgery':         { color: '#93000A', bgColor: '#FFDAD6', icon: 'ðŸ”ª' },
  'Lab Result':      { color: '#6A53D7', bgColor: '#E6DEFF', icon: 'ðŸ§ª' },
  'Other':           { color: '#564337', bgColor: '#E8E3E1', icon: 'ðŸ“‹' },
};

const ACCENT = ['#E67E22', '#D1E5F3', '#FADBD8', '#C8E6C9', '#E1D9FB', '#FFE0B2'] as const;

export function petAccentColor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % ACCENT.length;
  return ACCENT[h];
}

// PET-005: Calculate pet's current age in years and months from date of birth.
export function calculatePetAge(dateOfBirth: string): { years: number; months: number; label: string } {
  if (!dateOfBirth) return { years: 0, months: 0, label: 'Unknown' };
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) return { years: 0, months: 0, label: 'Unknown' };
  const now = new Date();
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  if (now.getDate() < dob.getDate()) months -= 1;
  if (months < 0) { years -= 1; months += 12; }
  if (years < 0) years = 0;
  if (months < 0) months = 0;
  return { years, months, label: `${years}y ${months}m` };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  // PET-002/PET-004: pets live in app-level state so edits persist across screens.
  const [pets, setPets] = useState<Pet[]>(DEFAULT_PETS);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  // REC-004: Health records state
  const [records, setRecords] = useState<HealthRecord[]>(DEFAULT_RECORDS);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);

  useEffect(() => {
    if (screen !== 'splash') return;
    const t = setTimeout(() => setScreen('health'), 2000);
    return () => clearTimeout(t);
  }, [screen]);

  const selectedPet = pets.find(p => p.id === selectedPetId) || null;

  const addPet = (pet: Pet) => {
    setPets(prev => [...prev, pet]);
    setSelectedPetId(pet.id);
    setScreen('pet-profile');
  };
  const updatePet = (pet: Pet) => {
    setPets(prev => prev.map(p => (p.id === pet.id ? pet : p)));
    setSelectedPetId(pet.id);
    setScreen('pet-profile');
  };
  const deletePet = (id: string) => {
    setPets(prev => prev.filter(p => p.id !== id));
    setSelectedPetId(null);
    setScreen('profile');
  };

  // REC-005: Record CRUD operations
  const addRecord = (record: HealthRecord) => {
    setRecords(prev => [record, ...prev]);
    setEditingRecordId(null);
    setScreen('records');
  };
  const updateRecord = (record: HealthRecord) => {
    setRecords(prev => prev.map(r => (r.id === record.id ? record : r)));
    setEditingRecordId(null);
    setSelectedRecordId(record.id);
    setScreen('record-detail');
  };
  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    setSelectedRecordId(null);
    setScreen('records');
  };

  const selectedRecord = records.find(r => r.id === selectedRecordId) || null;
  const editingRecord = records.find(r => r.id === editingRecordId) || null;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F5" />
      <SafeAreaView style={s.screen}>
        {screen === 'splash' && <SplashScreen />}
        {screen === 'health' && <HealthScreen onNext={() => setScreen('activity')} onSkip={() => setScreen('activity')} />}
        {screen === 'activity' && <ActivityScreen onBack={() => setScreen('health')} onNext={() => setScreen('login')} onSkip={() => setScreen('login')} />}
        {screen === 'login' && <LoginScreen onSend={() => setScreen('otp')} onCreate={() => setScreen('signup')} />}
        {screen === 'signup' && <SignupScreen onCreate={() => setScreen('otp')} onLogin={() => setScreen('login')} />}
        {screen === 'otp' && <OtpScreen onBack={() => setScreen('login')} onVerify={() => setScreen('home')} />}
        {screen === 'home' && <HomeScreen onProfile={() => setScreen('profile')} onRecords={() => setScreen('records')} />}
        {screen === 'profile' && (
          <ProfileScreen
            onHome={() => setScreen('home')}
            onLogout={() => setScreen('login')}
            onEdit={() => setScreen('edit-profile')}
            pets={pets}
            onOpenPet={(id) => { setSelectedPetId(id); setScreen('pet-profile'); }}
            onAddPet={() => setScreen('create-pet')}
          />
        )}
        {screen === 'edit-profile' && <EditProfileScreen onBack={() => setScreen('profile')} />}
        {screen === 'create-pet' && <CreatePetScreen onBack={() => setScreen('profile')} onCreate={addPet} />}
        {screen === 'pet-profile' && selectedPet && (
          <PetProfileScreen
            pet={selectedPet}
            onBack={() => setScreen('profile')}
            onEdit={() => setScreen('edit-pet')}
            onDelete={() => deletePet(selectedPet.id)}
          />
        )}
        {screen === 'edit-pet' && selectedPet && (
          <EditPetScreen pet={selectedPet} onBack={() => setScreen('pet-profile')} onSave={updatePet} />
        )}
        {/* REC-006: Records screens */}
        {screen === 'records' && (
          <RecordsScreen
            onHome={() => setScreen('home')}
            onAddRecord={() => setScreen('add-record')}
            records={records}
            pets={pets}
            onSelectRecord={(id) => { setSelectedRecordId(id); setScreen('record-detail'); }}
          />
        )}
        {screen === 'add-record' && (
          <AddRecordScreen
            onBack={() => { setEditingRecordId(null); setScreen('records'); }}
            pets={pets}
            onCreate={editingRecord ? updateRecord : addRecord}
            editing={editingRecord}
          />
        )}
        {screen === 'record-detail' && selectedRecord && (
          <RecordDetailScreen
            record={selectedRecord}
            pet={pets.find(p => p.id === selectedRecord.petId) || null}
            onBack={() => setScreen('records')}
            onEdit={() => { setEditingRecordId(selectedRecord.id); setScreen('add-record'); }}
            onDelete={() => deleteRecord(selectedRecord.id)}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function SplashScreen() {
  return (
    <View style={s.fill}>
      <View style={s.topGlow} />
      <View style={s.bottomGlow} />
      <View style={s.center}><LogoIcon width={168} height={168} /></View>
      <View style={s.footer}>
        <View style={s.row}><View style={s.dot} /><View style={s.dotGap}><View style={s.dot} /></View><View style={s.dotGap}><View style={s.dot} /></View></View>
        <Text style={s.powered}>POWERED BY PETCARE PREMIUM SYSTEMS</Text>
        <View style={s.row}><Text style={s.link}>Privacy Policy</Text><Text style={s.sep}>|</Text><Text style={s.link}>Terms of Service</Text></View>
      </View>
    </View>
  );
}

function HealthScreen({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <View style={s.onbWrap}>
      <View style={s.onbHead}><TouchableOpacity style={s.roundBtn} onPress={onSkip}><BackIcon width={18} height={18} fill="#261810" /></TouchableOpacity><TouchableOpacity onPress={onSkip}><Text style={s.skip}>Skip</Text></TouchableOpacity></View>
      <View style={s.onbBody}>
        <View style={s.card320}><Image source={ASSET.healthIllus} style={s.fillImg} /><View style={s.badge}><Image source={ASSET.healthBadge} style={s.icon12} /><Text style={s.badgeTxt}>Healthy</Text></View></View>
        <Text style={s.title}>Comprehensive Health{`\n`}Tracking</Text>
        <Text style={s.sub}>Keep all your pet&apos;s medical records,{`\n`}vaccinations, and vet appointments in{`\n`}one secure place.</Text>
      </View>
      <View style={s.onbFoot}><View style={s.row}><View style={s.indActiveDark} /><View style={s.indDotDark} /><View style={s.indDotDark} /></View><TouchableOpacity onPress={onNext}><View style={s.nextRingDark}><View style={s.nextCoreDark}><ForwardIcon width={20} height={20} fill="#fff" /></View></View></TouchableOpacity></View>
    </View>
  );
}

function ActivityScreen({ onBack, onNext, onSkip }: { onBack: () => void; onNext: () => void; onSkip: () => void }) {
  return (
    <View style={s.onbWrap}>
      <View style={s.onbHead}><TouchableOpacity style={s.roundBtnSm} onPress={onBack}><BackIcon width={18} height={18} fill="#261810" /></TouchableOpacity><TouchableOpacity onPress={onSkip}><Text style={s.skip}>Skip</Text></TouchableOpacity></View>
      <View style={s.onbBody}>
        <View style={s.activityWrap}>
          <View style={s.chip}><View style={s.chipIconWrap}><Image source={ASSET.actChip} style={s.chipIcon} /></View><View><Text style={s.chipLbl}>Live Location</Text><Text style={s.chipVal}>Sunny Park</Text></View></View>
          <Image source={ASSET.actIllus} style={s.activityImg} />
        </View>
        <Text style={s.title}>Monitor Every Step</Text>
        <Text style={s.sub}>Track daily activity levels and GPS{`\n`}location in real-time with our integrated{`\n`}Smart Collar technology.</Text>
      </View>
      <View style={s.onbFoot}><View style={s.row}><View style={s.indDotLight} /><View style={s.indActiveLight} /><View style={s.indDotLight} /></View><TouchableOpacity onPress={onNext}><View style={s.nextRingLight}><View style={s.nextCoreLight}><ForwardIcon width={20} height={20} fill="#fff" /></View></View></TouchableOpacity></View>
    </View>
  );
}

function LoginScreen({ onSend, onCreate }: { onSend: () => void; onCreate: () => void }) {
  return (
    <ScrollView contentContainerStyle={s.authWrap}>
      <View style={s.authTop}><Image source={ASSET.loginTop} style={s.topDecor} /><View style={s.authLogo}><LogoIcon width={96} height={96} /></View><Text style={s.authTitle}>Welcome back</Text><Text style={s.authSub}>Sign in to your account and keep track{`\n`}of your pet&apos;s happiness.</Text></View>
      <View style={s.authCard}>
        <TouchableOpacity style={s.googleBtn}><Image source={ASSET.loginGoogle} style={s.icon24} /><Text style={s.googleTxt}>Continue with Google</Text></TouchableOpacity>
        <View style={s.divider}><View style={s.divLine} /><Text style={s.divTxt}>OR EMAIL</Text><View style={s.divLine} /></View>
        <Text style={s.lbl}>Email address</Text>
        <TextInput style={s.input} placeholder="pawsome@example.com" placeholderTextColor="rgba(86,67,55,0.4)" />
        <TouchableOpacity style={s.primary} onPress={onSend}><Text style={s.primaryTxt}>Send Login Link</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={s.loginCreate} onPress={onCreate}><Text style={s.loginCreateA}>New here? </Text><Text style={s.loginCreateB}>Create an account</Text></TouchableOpacity>
      <Image source={ASSET.loginBg} style={s.bottomDecor} />
      <View style={s.legalFoot}><Text style={s.legalMuted}>Privacy Policy</Text><Text style={s.legalMuted}>Terms of Service</Text><Text style={s.legalMuted}>Help Center</Text></View>
    </ScrollView>
  );
}

function SignupScreen({ onCreate, onLogin }: { onCreate: () => void; onLogin: () => void }) {
  return (
    <ScrollView contentContainerStyle={s.authWrap}>
      <View style={s.authCard}>
        <View style={s.authLogoSm}><LogoIcon width={74} height={74} /></View>
        <Text style={s.authTitle}>Join the Pack</Text>
        <Text style={s.authSub}>The best care for your furry{`\n`}companions starts here.</Text>

        <LabeledInput label="Full Name" placeholder="Enter your full name" iconComponent={FullNameIcon} />
        <LabeledInput label="Email Address" placeholder="example@email.com" iconComponent={EmailAddressIcon} />
        <LabeledInput label="Password" placeholder="Create a strong password" iconComponent={PasswordIcon} rightIconComponent={PasswordToggleEyeIcon} secure />

        <View style={s.termsRow}><View style={s.checkbox} /><Text style={s.terms}>I agree to the <Text style={s.termsAccent}>Terms of Service</Text> and{`\n`}<Text style={s.termsAccent}>Privacy Policy</Text>.</Text></View>

        <TouchableOpacity style={s.primary} onPress={onCreate}><Text style={s.createTxt}>Create Account</Text></TouchableOpacity>

        <View style={s.divider}><View style={s.divLineStrong} /><Text style={s.divTxtMuted}>OR SIGN UP WITH</Text><View style={s.divLineStrong} /></View>

        <View style={s.socialRow}>
          <TouchableOpacity style={s.socialBtn}><Image source={ASSET.signupGoogle} style={s.icon20} /><Text style={s.socialTxt}>Google</Text></TouchableOpacity>
          <TouchableOpacity style={s.socialBtn}><Image source={ASSET.signupApple} style={s.appleIcon} /><Text style={s.socialTxt}>Apple</Text></TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onLogin}><Text style={s.already}>Already have an account? <Text style={s.termsAccent}>Login instead</Text></Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function LabeledInput({
  label,
  placeholder,
  icon,
  iconComponent: IconComponent,
  rightIcon,
  rightIconComponent: RightIconComponent,
  secure,
  value,
  onChange,
  keyboardType,
  maxLength,
}: {
  label: string;
  placeholder: string;
  icon?: ImageSourcePropType;
  iconComponent?: React.ComponentType<SvgProps>;
  rightIcon?: ImageSourcePropType;
  rightIconComponent?: React.ComponentType<SvgProps>;
  secure?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  keyboardType?: 'default' | 'number-pad' | 'numeric' | 'email-address';
  maxLength?: number;
}) {
  return (
    <View style={s.field}>
      <Text style={s.lblDark}>{label}</Text>
      <View style={s.inputRow}>
        <View style={s.inputIconWrap}>
          {IconComponent ? <IconComponent /> : icon ? <Image source={icon} style={s.icon16} /> : null}
        </View>
        <TextInput
          style={s.inputInline}
          placeholder={placeholder}
          placeholderTextColor="rgba(86,67,55,0.4)"
          secureTextEntry={secure}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
        <View style={s.inputRightIconWrap}>
          {RightIconComponent ? <RightIconComponent /> : rightIcon ? <Image source={rightIcon} style={s.eye} /> : null}
        </View>
      </View>
    </View>
  );
}

function OtpScreen({ onBack, onVerify }: { onBack: () => void; onVerify: () => void }) {
  return (
    <View style={s.otpWrap}>
      <View style={s.otpTop}><TouchableOpacity style={s.otpBack} onPress={onBack}><BackIcon width={18} height={18} fill="#261810" /></TouchableOpacity><Text style={s.otpBrand}>Pawos</Text><View style={s.blank} /></View>
      <View style={s.otpCard}><View style={[s.otpHero, { alignItems: 'center', justifyContent: 'center' }]}><View style={s.otpIconContainer}><VerifyEmailIcon width={42} height={36} /></View></View><Text style={s.otpTitle}>Verify your email</Text><Text style={s.otpSub}>We&apos;ve sent a code to your email. Enter{`\n`}the 4-digit numeric code below to{`\n`}proceed.</Text><View style={s.otpRow}><TextInput style={s.otpInput} maxLength={1} keyboardType="number-pad" /><TextInput style={s.otpInput} maxLength={1} keyboardType="number-pad" /><TextInput style={s.otpInput} maxLength={1} keyboardType="number-pad" /><TextInput style={s.otpInput} maxLength={1} keyboardType="number-pad" /></View><TouchableOpacity style={s.otpVerifyBtn} onPress={onVerify}><Text style={s.otpVerifyTxt}>Verify</Text></TouchableOpacity><Text style={s.otpHint}>Didn&apos;t receive the code?</Text><View style={s.row}><Text style={s.otpResend}>Resend code</Text><View style={s.otpDot} /><Text style={s.otpTime}>0:30s</Text></View></View>
      <View style={s.secure}><Image source={ASSET.otpLock} style={s.lock} /><Text style={s.secureTxt}>Secure 256-bit encrypted verification</Text></View>
    </View>
  );
}

function HomeScreen({ onProfile, onRecords }: { onProfile: () => void; onRecords: () => void }) {
  return (
    <View style={s.homeWrap}>
      {/* Figma: Two large decorative blur circles in Hero Section */}
      <View style={s.homeTopGlow} />
      <View style={s.homeBottomGlow} />
      <View style={s.homeHeader}>
        <TouchableOpacity onPress={onProfile} style={s.homeUserBtn}>
          <Image source={ASSET.profileTopAvatar} style={s.homeUserAvatar} />
        </TouchableOpacity>
        <LogoIcon width={111} height={48} />
        <TouchableOpacity style={s.homeBellBtn}>
          <BellsIcon width={19} height={24} fill="#944A00" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={s.homeContent} showsVerticalScrollIndicator={false}>

        {/* Pet Profile Card â€” Figma: Overlay+Border+Shadow+OverlayBlur */}
        <View style={s.homePetCard}>
          {/* Avatar with shadow container + status badge overlay */}
          <View style={s.homePetImgWrap}>
            <Image source={ASSET.petCooper} style={s.homePetImg} />
            {/* Status badge at bottom-right of avatar */}
            <View style={s.homePetStatusBadge}>
              <PawIcon width={10} height={8} fill="#fff" />
            </View>
          </View>
          <View style={s.homePetBody}>
            <View style={s.row}><Text style={s.homePetName}>Cooper</Text><Text style={s.homeActive}>ACTIVE</Text></View>
            <View style={s.homeHealthPill}><PremiumStarIcon width={14} height={14} fill="#9D620F" /><Text style={s.homeHealthTxt}>Excellent Health</Text></View>
          </View>
        </View>

        <View style={s.homeActions}>
          <HomeAction iconName="feed" label="Feed" bgColor="#F8E4CF" iconColor="#9F6516" iconComponent={FeedIcon} />
          <HomeAction iconName="vet" label="Vet" bgColor="#63E491" iconColor="#0B8D4E" iconComponent={VetIcon} />
          <HomeAction iconName="walk" label="Walk" bgColor="#E6E0FB" iconColor="#6A53D7" iconComponent={WalkIcon} />
          <HomeAction iconName="log" label="Log" bgColor="#EEEEEE" iconColor="#4E4E4E" iconComponent={LogIcon} />
        </View>

        <Text style={s.homeSectionTitle}>Current Vitals</Text>
        <View style={s.homeVitalsRow}>
          <View style={s.homeVitalCard}>
            <Text style={s.homeVitalLabel}>Weight</Text>
            <Text style={s.homeVitalValue}>28.4 <Text style={s.homeVitalUnit}>kg</Text></Text>
            <View style={s.homeBarBg}><View style={s.homeBarFill} /></View>
            <Text style={s.homeMuted}>Normal Range</Text>
          </View>
          <View style={s.homeVitalCard}>
            <Text style={s.homeVitalLabel}>Activity</Text>
            <Text style={s.homeVitalValue}>84%</Text>
            <Text style={s.homeVitalAccent}>HIGH</Text>
            <Text style={[s.homeMuted, s.homeActiveToday]}>Active Today</Text>
          </View>
        </View>

        <View style={s.homeRateCard}>
          <View style={s.homeRateLeft}>
            <Text style={s.homeRateTitle}>Heart Rate</Text>
            <View style={s.homeRateValueRow}>
              <Text style={s.homeRateValue}>72</Text>
              <View style={s.homeRateUnitWrap}>
                <Text style={s.homeRateUnit}>bpm</Text>
                <HeartRateIcon width={20} height={18} fill="#BA1A1A" />
              </View>
            </View>
          </View>
          <View style={s.homeRateBars}>
            {([
              { h: 24, o: 0.2 },
              { h: 40, o: 0.4 },
              { h: 48, o: 1.0 },
              { h: 32, o: 0.6 },
              { h: 40, o: 0.3 },
              { h: 44, o: 0.7 },
              { h: 28, o: 0.5 },
            ]).map((b, i) => (
              <View key={i} style={[s.homeRateBar, { height: b.h, backgroundColor: 'rgba(255,140,0,' + b.o + ')' }]} />
            ))}
          </View>
        </View>

        <View style={s.homeSectionHead}>
          <Text style={s.homeSectionTitle}>Upcoming Care</Text>
          <Text style={s.homeViewAll}>View All</Text>
        </View>
        <View style={s.homeCareList}>
          <View style={s.homeCareCard}>
            <View style={s.homeDays}>
              <Text style={s.homeDaysNum}>5</Text>
              <Text style={s.homeDaysLbl}>DAYS</Text>
            </View>
            <View style={s.homeCareBody}>
              <Text style={s.homeCareTitle}>Rabies Booster</Text>
              <Text style={s.homeCareSub}>Urgent Ã¢â‚¬Â¢ Due Oct 12</Text>
            </View>
            <TouchableOpacity style={s.homeBookBtn}><Text style={s.homeBookTxt}>Book</Text></TouchableOpacity>
          </View>
          <View style={[s.homeCareCard, s.homeCareCardAlt]}>
            <View style={[s.homeDays, s.homeDaysAlt]}>
              <CalendarIcon width={18} height={20} fill="#897362" />
            </View>
            <View style={s.homeCareBody}>
              <Text style={s.homeCareTitle}>Annual Checkup</Text>
              <Text style={s.homeCareSub}>Oct 24, 2023</Text>
            </View>
          </View>
        </View>

        <Text style={s.homeSectionTitle}>Recent Activity</Text>
        <View style={s.homeTimeline}>
          <View style={s.homeTimelineItem}>
            <View style={s.homeTimelineRail}>
              <View style={s.homeTimelineDot}><View style={s.homeTimelineDotInner} /></View>
              <View style={s.homeTimelineLine} />
            </View>
            <View style={[s.homeRecentCard, s.homeRecentCardWalk]}>
              <View style={s.homeRecentWalkHead}>
                <View style={s.homeRecentWalkLeft}>
                  <View style={s.homeRecentIconWalk}><WalkIcon width={11} height={18} fill="#5E39E0" /></View>
                  <View>
                    <Text style={s.homeCareTitle}>Morning Walk</Text>
                    <Text style={s.homeRecentSubAlt}>08:30 AM Ã¢â‚¬Â¢ 45 mins</Text>
                  </View>
                </View>
                <Text style={s.homeDistance}>2.4 km</Text>
              </View>
              <View style={s.homeWalkMap}>
                <View style={s.homeWalkMapPill}><WalkIcon width={8} height={10} fill="#5E39E0" /><Text style={s.homeWalkMapPillTxt}>Park Loop Path</Text></View>
              </View>
            </View>
          </View>

          <View style={s.homeTimelineItem}>
            <View style={s.homeTimelineRail}>
              <View style={s.homeTimelineDot} />
            </View>
            <View style={s.homeRecentCard}>
              <View style={s.homeRecentWalkHead}>
                <View style={s.homeRecentWalkLeft}>
                  <View style={s.homeRecentIconFeed}><FeedIcon width={13} height={17} fill="#904D00" /></View>
                  <View>
                    <Text style={s.homeCareTitle}>Breakfast</Text>
                    <Text style={s.homeRecentSubAlt}>07:15 AM Ã¢â‚¬Â¢ 250g Kibble</Text>
                  </View>
                </View>
                <View style={s.homeFeedPill}><Text style={s.homeFeedPillTxt}>Salmon</Text></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={s.nav}>
        <View style={s.navActive}>
          <View style={s.navIconWrap}><HomeNavIcon color="#FFFFFF" /></View>
          <Text style={s.navActiveTxt}>Home</Text>
        </View>
        <NavItem label="Health" iconComponent={HealthNavIcon} />
        <NavItem label="Activity" iconComponent={ActivityNavIcon} />
        <TouchableOpacity style={s.navItem} onPress={onRecords}>
          <View style={s.navIconWrap}><PawIcon width={20} height={20} color="#644B3C" /></View>
          <Text style={s.navTxt}>Records</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={onProfile}>
          <View style={s.navIconWrap}><SettingsNavIcon color="#644B3C" /></View>
          <Text style={s.navTxt}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeAction({
  iconName,
  label,
  bgColor,
  iconColor,
  iconComponent: IconComponent,
}: {
  iconName: string;
  label: string;
  bgColor: string;
  iconColor: string;
  iconComponent?: React.ComponentType<SvgProps>;
}) {
  return (
    <View style={s.homeAction}>
      <View style={[s.homeActionIconWrap, { backgroundColor: bgColor }]}>
        {IconComponent ? <IconIconReplacement Comp={IconComponent} size={20} color={iconColor} /> : <AppIcon name={iconName} size={20} color={iconColor} />}
      </View>
      <Text style={s.homeActionLabel}>{label}</Text>
    </View>
  );
}

function IconIconReplacement({ Comp, size, color }: { Comp: React.ComponentType<SvgProps>; size: number; color?: string }) {
  return <Comp width={size} height={size} fill={color} stroke={color} />;
}

function ProfileScreen({
  onHome,
  onLogout,
  onEdit,
  pets,
  onOpenPet,
  onAddPet,
}: {
  onHome: () => void;
  onLogout: () => void;
  onEdit: () => void;
  pets: Pet[];
  onOpenPet: (id: string) => void;
  onAddPet: () => void;
}) {
  return (
    <View style={s.profileWrap}>
      <View style={s.profileTop}>
        <View style={s.row}>
          <Image source={ASSET.profileTopAvatar} style={s.topAvatar} />
          <Text style={s.profileTitle}>Profile</Text>
        </View>
        <TouchableOpacity onPress={onEdit} hitSlop={12}><EditProfileIcon width={18} height={18} /></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={s.profileContent}>
        <View style={s.profileCard}>
          <Image source={ASSET.profileAvatar} style={s.profileAvatar} />
          <View style={s.profileBody}>
            <Text style={s.profileName}>Alex Harrison</Text>
            <View style={s.premium}>
              <PremiumStarIcon width={12} height={12} />
              <Text style={s.premiumTxt}>Premium Member</Text>
            </View>
          </View>
        </View>

        <View style={s.sectionHead}>
          <Text style={s.sectionTitle}>My Pets</Text>
          <TouchableOpacity onPress={onAddPet}><Text style={s.addNew}>Add New</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.pets}>
          {pets.map(p => (
            <TouchableOpacity key={p.id} style={s.pet} onPress={() => onOpenPet(p.id)}>
              <View style={[s.petRing, { backgroundColor: petAccentColor(p.id) }]}>
                {p.photo
                  ? <Image source={{ uri: p.photo }} style={s.petImg} />
                  : <View style={s.petImgPlaceholder}><PawIcon width={28} height={28} color="#FFFFFF" /></View>}
              </View>
              <Text style={s.petName}>{p.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={s.pet} onPress={onAddPet}>
            <View style={[s.petRing, s.petAddRing]}>
              <AppIcon name="plus" size={26} color="#E67E22" />
            </View>
            <Text style={s.petName}>Add Pet</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={s.sectionTitle}>App Settings</Text>
        <View style={s.settings}>
          <Setting iconName="bell" title="Notifications" iconComponent={BellsIcon} />
          <Setting iconName="shield" title="Privacy & Security" iconComponent={ShieldIcon} />
          <Setting iconName="desktop" title="Subscription Plan" trailing="Pro" iconComponent={SubscriptionPlanIcon} />
          <Setting iconName="question-circle" title="Help & Support" last iconComponent={HelpIcon} />
        </View>

        <TouchableOpacity style={s.logout} onPress={onLogout}>
          <LogoutIcon width={18} height={18} />
          <Text style={s.logoutTxt}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={s.nav}>
        <TouchableOpacity style={s.navItem} onPress={onHome}>
          <View style={s.navIconWrap}><HomeNavIcon color="#644B3C" /></View>
          <Text style={s.navTxt}>Home</Text>
        </TouchableOpacity>
        <NavItem label="Health" iconComponent={HealthNavIcon} />
        <NavItem label="Activity" iconComponent={ActivityNavIcon} />
        <View style={s.navActive}>
          <View style={s.navIconWrap}><SettingsNavIcon color="#FFFFFF" /></View>
          <Text style={s.navActiveTxt}>Settings</Text>
        </View>
      </View>
    </View>
  );
}

function Setting({
  iconName,
  title,
  trailing,
  last,
  iconComponent: IconComponent,
}: {
  iconName: string;
  title: string;
  trailing?: string;
  last?: boolean;
  iconComponent?: React.ComponentType<SvgProps>;
}) {
  return (
    <View style={[s.setting, !last && s.settingBorder]}>
      <View style={s.row}>
        <View style={s.settingIcon}>
          {IconComponent ? <IconComponent /> : <AppIcon name={iconName} size={16} color="#644B3C" />}
        </View>
        <Text style={s.settingTitle}>{title}</Text>
      </View>
      <View style={s.row}>
        {trailing ? <Text style={s.trailing}>{trailing}</Text> : null}
        <RightArrowIcon width={8} height={12} />
      </View>
    </View>
  );
}

function NavItem({ label, iconComponent: IconComponent }: { label: string; iconComponent: React.ComponentType<SvgProps> }) {
  return (
    <View style={s.navItem}>
      <View style={s.navIconWrap}><IconComponent color="#644B3C" /></View>
      <Text style={s.navTxt}>{label}</Text>
    </View>
  );
}

function AppIcon({ name, size = 18, color = '#644B3C' }: { name: string; size?: number; color?: string }) {
  const strokeW = Math.max(2, size * 0.13);
  const common = { stroke: color, strokeWidth: strokeW, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' as const };

  switch (name) {
    case 'bell':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6 9a6 6 0 1 1 12 0v5l2 3H4l2-3z" {...common} />
          <Path d="M10 19a2 2 0 0 0 4 0" {...common} />
        </Svg>
      );
    case 'star':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z" fill={color} />
        </Svg>
      );
    case 'utensils':
    case 'feed':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6 3v7M9 3v7M6 7h3M7.5 10v11M15 3c2 0 3 2 3 4s-1 4-3 4v10" {...common} />
        </Svg>
      );
    case 'plus-circle':
    case 'vet':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x="4" y="7" width="16" height="13" rx="3" {...common} />
          <Path d="M9 7V6a3 3 0 0 1 6 0v1" {...common} />
          <Path d="M12 10v6M9 13h6" {...common} />
        </Svg>
      );
    case 'male':
    case 'walk':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx="12" cy="4" r="2" fill={color} />
          <Path d="M12 7v5l3 2M12 12l-3 3M10 15l-1 6M15 14l2 6" {...common} />
        </Svg>
      );
    case 'history':
    case 'log':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6 7h8M6 12h8M6 17h6" {...common} />
          <Path d="m16 15 2 2 3-3" {...common} />
        </Svg>
      );
    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M3 11.5 12 4l9 7.5M6 10.5V20h12v-9.5" {...common} />
        </Svg>
      );
    case 'paw':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx="7" cy="8" r="2" fill={color} />
          <Circle cx="12" cy="6" r="2" fill={color} />
          <Circle cx="17" cy="8" r="2" fill={color} />
          <Path d="M7 15c0-2.2 2-4 5-4s5 1.8 5 4-2.2 4-5 4-5-1.8-5-4Z" fill={color} />
        </Svg>
      );
    case 'cut':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx="6" cy="7" r="2" {...common} />
          <Circle cx="6" cy="17" r="2" {...common} />
          <Path d="M8 8l12-5M8 16l12 5M10 12h10" {...common} />
        </Svg>
      );
    case 'cog':
    case 'settings':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" {...common} />
          <Path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" {...common} />
        </Svg>
      );
    case 'shield':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 3 5 6v6c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6z" {...common} />
        </Svg>
      );
    case 'desktop':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x="3" y="4" width="18" height="12" rx="2" {...common} />
          <Path d="M9 20h6M12 16v4" {...common} />
        </Svg>
      );
    case 'question-circle':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="9" {...common} />
          <Path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.7-2 2.2-2.5 3.5M12 17h.01" {...common} />
        </Svg>
      );
    case 'sign-out':
    case 'logout':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M10 4H5v16h5M14 8l5 4-5 4M19 12h-9" {...common} />
        </Svg>
      );
    case 'chevron-right':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M9 6l6 6-6 6" {...common} />
        </Svg>
      );
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="2" fill={color} />
        </Svg>
      );
  }
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function EditProfileScreen({ onBack }: { onBack: () => void }) {
  return (
    <ScrollView contentContainerStyle={s.editProfileWrap}>
      <View style={s.profileTop}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.profileTitle}>Edit Profile</Text>
        <TouchableOpacity hitSlop={12}><Text style={s.editSaveTxt}>Save</Text></TouchableOpacity>
      </View>

      <View style={s.authCard}>
        <View style={s.editAvatarWrap}>
          <Image source={ASSET.profileAvatar} style={s.editAvatar} />
          <View style={s.editAvatarBadge}><EditProfileIcon width={14} height={14} /></View>
        </View>
        <Text style={s.editSectionLbl}>Personal Information</Text>
        <LabeledInput label="Full Name" placeholder="Alex Harrison" iconComponent={FullNameIcon} />
        <LabeledInput label="Email Address" placeholder="alex@example.com" iconComponent={EmailAddressIcon} keyboardType="email-address" />
        <LabeledInput label="Phone Number" placeholder="+1 (555) 123-4567" iconComponent={FullNameIcon} keyboardType="number-pad" />
        <View style={s.editDivider} />
        <Text style={s.editSectionLbl}>Security</Text>
        <LabeledInput label="Password" placeholder="Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢" iconComponent={ShieldIcon} secure />
      </View>
      <TouchableOpacity style={s.editDeleteBtn} onPress={onBack}>
        <DeleteAccountIcon width={16} height={16} />
        <Text style={s.editDeleteTxt}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const PET_STEPS = ['Pet', 'About', 'Register'] as const;
type PetStep = (typeof PET_STEPS)[number];

function PetForm({
  value,
  onChange,
  step,
}: {
  value: Pet;
  onChange: (next: Pet) => void;
  step?: PetStep;
}) {
  const set = <K extends keyof Pet>(key: K, v: Pet[K]) => onChange({ ...value, [key]: v });
  const showAll = !step;
  const showAvatar = showAll || step === 'Pet';

  return (
    <View style={s.authCard}>
      {showAvatar && (
        <TouchableOpacity style={s.petFormAvatarWrap} activeOpacity={0.85}>
          {value.photo ? (
            <Image source={{ uri: value.photo }} style={s.petFormAvatar} />
          ) : (
            <View style={[s.petFormAvatar, { backgroundColor: petAccentColor(value.id || 'new') }]}>
              <PawIcon width={42} height={42} color="#FFFFFF" />
            </View>
          )}
          <View style={s.petFormAvatarBadgeWrap}>
            <View style={s.petFormAvatarBadge}><AppIcon name="plus" size={16} color="#FFFFFF" /></View>
          </View>
        </TouchableOpacity>
      )}

      {(showAll || step === 'Pet') && (
        <>
          <Text style={s.editSectionLbl}>Pet Information</Text>
          <LabeledInput label="Pet Name" placeholder="e.g. Cooper" iconComponent={FullNameIcon} value={value.name} onChange={(v) => set('name', v)} />
          <PetField label="Species">
            <SegmentedControl options={['Dog', 'Cat'] as PetSpecies[]} value={value.species} onChange={(v) => set('species', v)} />
          </PetField>
          <LabeledInput label="Breed" placeholder="e.g. Golden Retriever" iconComponent={FullNameIcon} value={value.breed} onChange={(v) => set('breed', v)} />
        </>
      )}

      {(showAll || step === 'About') && (
        <>
          <Text style={s.editSectionLbl}>About</Text>
          <LabeledInput label="Date of Birth" placeholder="yyyy-mm-dd" iconComponent={FullNameIcon} value={value.dateOfBirth} onChange={(v) => set('dateOfBirth', v)} keyboardType="number-pad" maxLength={10} />
          <PetField label="Gender">
            <SegmentedControl options={['Male', 'Female'] as PetGender[]} value={value.gender} onChange={(v) => set('gender', v)} />
          </PetField>
          <LabeledInput label="Weight (kg)" placeholder="e.g. 28.4" iconComponent={WeightIcon} value={value.weight} onChange={(v) => set('weight', v)} keyboardType="numeric" />
        </>
      )}

      {(showAll || step === 'Register') && (
        <>
          <Text style={s.editSectionLbl}>Register</Text>
          <LabeledInput label="Microchip Number" placeholder="15-digit number" iconComponent={ShieldIcon} value={value.microchipNumber} onChange={(v) => set('microchipNumber', v)} keyboardType="number-pad" maxLength={15} />
          {step === 'Register' && (
            <View style={s.petReviewCard}>
              <Text style={s.petReviewLbl}>Review</Text>
              <PetReviewRow label="Name" value={value.name || 'Ã¢â‚¬â€'} />
              <PetReviewRow label="Species" value={value.species} />
              <PetReviewRow label="Breed" value={value.breed || 'Ã¢â‚¬â€'} />
              <PetReviewRow label="Date of Birth" value={value.dateOfBirth || 'Ã¢â‚¬â€'} />
              <PetReviewRow label="Gender" value={value.gender} />
              <PetReviewRow label="Weight" value={value.weight ? `${value.weight} kg` : 'Ã¢â‚¬â€'} last />
            </View>
          )}
        </>
      )}
    </View>
  );
}

function PetField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={s.field}>
      <Text style={s.lblDark}>{label}</Text>
      {children}
    </View>
  );
}

function SegmentedControl<T extends string>({ options, value, onChange }: { options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <View style={s.segmentWrap}>
      {options.map(opt => {
        const active = opt === value;
        return (
          <TouchableOpacity key={opt} style={[s.segment, active && s.segmentActive]} onPress={() => onChange(opt)}>
            <Text style={[s.segmentTxt, active && s.segmentTxtActive]}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function PetReviewRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[s.petReviewRow, !last && s.petReviewBorder]}>
      <Text style={s.petReviewKey}>{label}</Text>
      <Text style={s.petReviewVal}>{value}</Text>
    </View>
  );
}

function PetStepIndicator({ step }: { step: number }) {
  return (
    <View style={s.petStepWrap}>
      {PET_STEPS.map((label, i) => {
        const idx = i + 1;
        const active = step === idx;
        const completed = step > idx;
        return (
          <View key={label} style={s.petStepItem}>
            <View style={[s.petStepCircle, active && s.petStepCircleActive, completed && s.petStepCircleDone]}>
              <Text style={[s.petStepNum, (active || completed) && s.petStepNumActive]}>{completed ? 'Ã¢Å“â€œ' : idx}</Text>
            </View>
            <Text style={[s.petStepLbl, (active || completed) && s.petStepLblActive]}>{label}</Text>
            {i < PET_STEPS.length - 1 && <View style={[s.petStepLine, completed && s.petStepLineDone]} />}
          </View>
        );
      })}
    </View>
  );
}

// PET-001: Create Pet screen Ã¢â‚¬â€ 3-step wizard (Pet Ã¢â€ â€™ About Ã¢â€ â€™ Register)
function CreatePetScreen({ onBack, onCreate }: { onBack: () => void; onCreate: (pet: Pet) => void }) {
  const [draft, setDraft] = useState<Pet>({
    id: `p-${Date.now()}`,
    name: '',
    species: 'Dog',
    breed: '',
    dateOfBirth: '',
    gender: 'Male',
    weight: '',
    microchipNumber: '',
    photo: '',
  });
  const [step, setStep] = useState<number>(1);
  const stepKey: PetStep = PET_STEPS[step - 1];

  const stepValid: Record<number, boolean> = {
    1: draft.name.trim() !== '' && draft.breed.trim() !== '',
    2: draft.dateOfBirth.trim().length === 10,
    3: draft.microchipNumber.trim().length >= 1,
  };
  const canNext = stepValid[step];
  const isLast = step === PET_STEPS.length;

  const handleSave = () => {
    if (!stepValid[3]) return;
    onCreate({ ...draft, name: draft.name.trim(), breed: draft.breed.trim() });
  };

  return (
    <ScrollView contentContainerStyle={s.editProfileWrap} keyboardShouldPersistTaps="handled">
      <View style={s.profileTop}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.profileTitle}>Add Pet</Text>
        {isLast ? (
          <TouchableOpacity onPress={handleSave} disabled={!stepValid[3]} hitSlop={12}>
            <Text style={[s.editSaveTxt, !stepValid[3] && s.editSaveDisabled]}>Save</Text>
          </TouchableOpacity>
        ) : <View style={s.blank} />}
      </View>

      <PetStepIndicator step={step} />
      <PetForm value={draft} onChange={setDraft} step={stepKey} />

      <View style={s.petWizardActions}>
        {step > 1 ? (
          <TouchableOpacity style={s.petWizardBack} onPress={() => setStep(s => s - 1)}>
            <BackButtonIcon width={16} height={16} color="#944A00" />
            <Text style={s.petWizardBackTxt}>Back</Text>
          </TouchableOpacity>
        ) : <View style={s.blank} />}
        {isLast ? (
          <TouchableOpacity
            style={[s.petWizardPrimary, !stepValid[3] && s.petWizardPrimaryDisabled]}
            onPress={handleSave}
            disabled={!stepValid[3]}
          >
            <Text style={s.petWizardPrimaryTxt}>Create Pet Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[s.petWizardPrimary, !canNext && s.petWizardPrimaryDisabled]}
            onPress={() => setStep(s => s + 1)}
            disabled={!canNext}
          >
            <Text style={s.petWizardPrimaryTxt}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

// PET-002: Edit Pet screen Ã¢â‚¬â€ all fields editable, persists on save
function EditPetScreen({ pet, onBack, onSave }: { pet: Pet; onBack: () => void; onSave: (pet: Pet) => void }) {
  const [draft, setDraft] = useState<Pet>(pet);
  const dirty = JSON.stringify(draft) !== JSON.stringify(pet);

  return (
    <ScrollView contentContainerStyle={s.editProfileWrap}>
      <View style={s.profileTop}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.profileTitle}>Edit Pet</Text>
        <TouchableOpacity onPress={() => onSave(draft)} disabled={!dirty} hitSlop={12}>
          <Text style={[s.editSaveTxt, !dirty && s.editSaveDisabled]}>Save</Text>
        </TouchableOpacity>
      </View>
      <PetForm value={draft} onChange={setDraft} />
    </ScrollView>
  );
}

// PET-005: Pet Profile screen (age from DOB; PET-003 delete w/ confirm)
function PetProfileScreen({
  pet,
  onBack,
  onEdit,
  onDelete,
}: {
  pet: Pet;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const age = calculatePetAge(pet.dateOfBirth);
  const accent = petAccentColor(pet.id);
  const photo = pet.photo || '';

  return (
    <View style={s.petProfileWrap}>
      <ScrollView contentContainerStyle={s.petProfileContent} showsVerticalScrollIndicator={false}>
        {photo ? (
          <View style={s.petHeroWrap}>
            <Image source={{ uri: photo }} style={s.petHero} />
            <View style={s.petProfileBackWrap}>
              <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} color="#FFFFFF" /></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onEdit} hitSlop={10} style={s.petHeroEdit}><EditProfileIcon width={18} height={18} /></TouchableOpacity>
          </View>
        ) : (
          <View style={[s.petHeroWrap, { backgroundColor: accent }]}>
            <View style={s.petProfileBackWrap}>
              <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} color="#FFFFFF" /></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onEdit} hitSlop={10} style={s.petHeroEdit}><EditProfileIcon width={18} height={18} color="#FFFFFF" /></TouchableOpacity>
            <View style={s.petHeroPlaceholder}><PawIcon width={80} height={80} color="#FFFFFF" /></View>
          </View>
        )}

        <View style={s.petProfileBody}>
          <Text style={s.petProfileName}>{pet.name}</Text>
          <View style={[s.petSpeciesPill, { backgroundColor: accent }]}><Text style={s.petSpeciesTxt}>{pet.species}</Text></View>
          <Text style={s.petBreed}>{pet.breed}</Text>

          <View style={s.petAgeCard}>
            <Text style={s.petAgeLbl}>Current Age</Text>
            <Text style={s.petAgeValue}>{age.label}</Text>
            <Text style={s.petAgeSub}>{age.years} years, {age.months} months old</Text>
          </View>

          <View style={s.petFactsCard}>
            <PetFact label="Gender" value={pet.gender} />
            <PetFact label="Date of Birth" value={pet.dateOfBirth || 'Ã¢â‚¬â€'} border />
            <PetFact label="Weight" value={pet.weight ? `${pet.weight} kg` : 'Ã¢â‚¬â€'} border />
            <PetFact label="Microchip" value={pet.microchipNumber || 'Ã¢â‚¬â€'} border />
          </View>

          <TouchableOpacity style={s.petEditBtn} onPress={onEdit}>
            <EditProfileIcon width={16} height={16} />
            <Text style={s.petEditBtnTxt}>Edit Pet Details</Text>
          </TouchableOpacity>

          {confirming ? (
            <View style={s.petConfirmCard}>
              <View style={s.row}>
                <AlertIcon width={20} height={20} />
                <Text style={s.petConfirmTitle}>Delete {pet.name}?</Text>
              </View>
              <Text style={s.petConfirmSub}>
                This permanently removes {pet.name} and all associated health records, reminders, and files.
              </Text>
              <View style={s.petConfirmActions}>
                <TouchableOpacity style={s.petConfirmCancel} onPress={() => setConfirming(false)}>
                  <Text style={s.petConfirmCancelTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.petConfirmDelete} onPress={onDelete}>
                  <Text style={s.petConfirmDeleteTxt}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={s.petDeleteLink} onPress={() => setConfirming(true)}>
              <Text style={s.petDeleteLinkTxt}>Delete Pet Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function PetFact({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <View style={[s.petFact, border && s.petFactBorder]}>
      <Text style={s.petFactLbl}>{label}</Text>
      <Text style={s.petFactVal}>{value}</Text>
    </View>
  );
}


// REC-006: Records list screen â€” search, filter chips, record cards, floating add button
function RecordsScreen({
  onHome,
  onAddRecord,
  records,
  pets,
  onSelectRecord,
}: {
  onHome: () => void;
  onAddRecord: () => void;
  records: HealthRecord[];
  pets: Pet[];
  onSelectRecord: (id: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<RecordType | 'All'>('All');

  const filtered = records.filter(r => {
    const matchesType = activeType === 'All' || r.type === activeType;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.vetName.toLowerCase().includes(q) ||
      r.clinicName.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  });

  const petName = (petId: string) => pets.find(p => p.id === petId)?.name ?? 'Unknown Pet';

  const chipTypes: (RecordType | 'All')[] = ['All', 'Vaccination', 'Medication', 'Vet Visit', 'Surgery', 'Lab Result', 'Other'];

  return (
    <View style={s.recWrap}>
      <View style={s.homeTopGlow} />
      <View style={s.homeBottomGlow} />
      <View style={s.recHeader}>
        <TouchableOpacity style={s.otpBack} onPress={onHome}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.recTitle}>Health Records</Text>
        <View style={s.blank} />
      </View>

      <View style={s.recSearchWrap}>
        <View style={s.recSearchBox}>
          <PawIcon width={16} height={16} color="#944A00" />
          <TextInput
            style={s.recSearchInput}
            placeholder="Search records, vets, clinics..."
            placeholderTextColor="#897365"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={12}>
              <Text style={s.recClearTxt}>âœ•</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.recChips}>
        {chipTypes.map(t => {
          const active = activeType === t;
          const cfg = t === 'All' ? null : RECORD_TYPE_CONFIG[t];
          return (
            <TouchableOpacity
              key={t}
              style={[s.recChip, active ? s.recChipActive : null]}
              onPress={() => setActiveType(t)}
            >
              <Text style={[s.recChipTxt, active ? s.recChipTxtActive : null]}>
                {cfg ? `${cfg.icon} ${t}` : 'All'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={s.recCountTxt}>{filtered.length} record{filtered.length === 1 ? '' : 's'}</Text>

      <ScrollView contentContainerStyle={s.recList} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={s.recEmpty}>
            <PawIcon width={48} height={48} color="#DCC1B1" />
            <Text style={s.recEmptyTitle}>No records found</Text>
            <Text style={s.recEmptySub}>
              {query || activeType !== 'All'
                ? 'Try adjusting your search or filters.'
                : 'Add your first health record to get started.'}
            </Text>
          </View>
        ) : (
          filtered.map(r => {
            const cfg = RECORD_TYPE_CONFIG[r.type];
            return (
              <TouchableOpacity
                key={r.id}
                style={s.recCard}
                activeOpacity={0.85}
                onPress={() => onSelectRecord(r.id)}
              >
                <View style={[s.recCardIcon, { backgroundColor: cfg.bgColor }]}>
                  <Text style={s.recCardIconTxt}>{cfg.icon}</Text>
                </View>
                <View style={s.recCardBody}>
                  <View style={s.recCardTop}>
                    <Text style={s.recCardTitle} numberOfLines={1}>{r.title}</Text>
                    <Text style={[s.recCardPill, { backgroundColor: cfg.bgColor, color: cfg.color }]}>{r.type}</Text>
                  </View>
                  <Text style={s.recCardPet} numberOfLines={1}>{petName(r.petId)} â€¢ {formatRecordDate(r.recordDate)}</Text>
                  {r.vetName ? (
                    <Text style={s.recCardVet} numberOfLines={1}>{r.vetName}{r.clinicName ? ` â€¢ ${r.clinicName}` : ''}</Text>
                  ) : null}
                  {r.attachmentName ? (
                    <View style={s.recAttachRow}>
                      <Text style={s.recAttachTxt}>ðŸ“Ž {r.attachmentName}</Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity style={s.recFab} onPress={onAddRecord} activeOpacity={0.9}>
        <Text style={s.recFabTxt}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// REC-002: Add record form â€” type, title, description, date, vet, clinic, attachment
function AddRecordScreen({
  onBack,
  pets,
  onCreate,
  editing,
}: {
  onBack: () => void;
  pets: Pet[];
  onCreate: (record: HealthRecord) => void;
  editing?: HealthRecord | null;
}) {
  const [type, setType] = useState<RecordType>(editing?.type ?? 'Vaccination');
  const [title, setTitle] = useState(editing?.title ?? '');
  const [description, setDescription] = useState(editing?.description ?? '');
  const [recordDate, setRecordDate] = useState(editing?.recordDate ?? new Date().toISOString().slice(0, 10));
  const [vetName, setVetName] = useState(editing?.vetName ?? '');
  const [clinicName, setClinicName] = useState(editing?.clinicName ?? '');
  const [petId, setPetId] = useState(editing?.petId ?? pets[0]?.id ?? '');
  const [attachmentName, setAttachmentName] = useState(editing?.attachmentName ?? '');

  const valid = title.trim().length > 0 && petId.length > 0;

  const handleAttach = () => {
    // Stub file picker â€” in a real app this would launch a document picker.
    setAttachmentName('vaccination_certificate.pdf');
  };

  const handleSave = () => {
    if (!valid) return;
    const record: HealthRecord = {
      id: editing?.id ?? `rec_${Date.now()}`,
      petId,
      type,
      title: title.trim(),
      description: description.trim(),
      recordDate,
      vetName: vetName.trim(),
      clinicName: clinicName.trim(),
      attachmentName: attachmentName || undefined,
      createdAt: editing?.createdAt ?? new Date().toISOString(),
    };
    onCreate(record);
  };

  const types: RecordType[] = ['Vaccination', 'Medication', 'Vet Visit', 'Surgery', 'Lab Result', 'Other'];

  return (
    <ScrollView contentContainerStyle={s.recFormWrap} showsVerticalScrollIndicator={false}>
      <View style={s.recHeader}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.recTitle}>{editing ? 'Edit Record' : 'Add Record'}</Text>
        <TouchableOpacity onPress={handleSave} disabled={!valid} hitSlop={12}>
          <Text style={[s.editSaveTxt, !valid && s.editSaveDisabled]}>Save</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.recFieldLbl}>Record Type</Text>
      <View style={s.recTypeGrid}>
        {types.map(t => {
          const cfg = RECORD_TYPE_CONFIG[t];
          const active = type === t;
          return (
            <TouchableOpacity
              key={t}
              style={[s.recTypeChip, active ? { backgroundColor: cfg.bgColor, borderColor: cfg.color } : null]}
              onPress={() => setType(t)}
            >
              <Text style={s.recTypeChipIcon}>{cfg.icon}</Text>
              <Text style={[s.recTypeChipTxt, active ? { color: cfg.color } : null]}>{t}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={s.recFieldLbl}>Pet</Text>
      <View style={s.recPetPicker}>
        {pets.map(p => {
          const active = petId === p.id;
          return (
            <TouchableOpacity
              key={p.id}
              style={[s.recPetChip, active ? s.recPetChipActive : null]}
              onPress={() => setPetId(p.id)}
            >
              <Text style={[s.recPetChipTxt, active ? s.recPetChipTxtActive : null]}>{p.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={s.recFieldLbl}>Title</Text>
      <TextInput
        style={s.recInput}
        placeholder="e.g. Annual Rabies Vaccination"
        placeholderTextColor="#897365"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={s.recFieldLbl}>Date</Text>
      <TextInput
        style={s.recInput}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#897365"
        value={recordDate}
        onChangeText={setRecordDate}
      />

      <Text style={s.recFieldLbl}>Description</Text>
      <TextInput
        style={[s.recInput, s.recInputMulti]}
        placeholder="Notes, dosage, next due date..."
        placeholderTextColor="#897365"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <Text style={s.recFieldLbl}>Veterinarian</Text>
      <TextInput
        style={s.recInput}
        placeholder="Dr. name"
        placeholderTextColor="#897365"
        value={vetName}
        onChangeText={setVetName}
      />

      <Text style={s.recFieldLbl}>Clinic</Text>
      <TextInput
        style={s.recInput}
        placeholder="Clinic / hospital name"
        placeholderTextColor="#897365"
        value={clinicName}
        onChangeText={setClinicName}
      />

      <Text style={s.recFieldLbl}>Attachment</Text>
      <TouchableOpacity style={s.recAttachBtn} onPress={handleAttach}>
        <Text style={s.recAttachBtnTxt}>
          {attachmentName ? `ðŸ“Ž ${attachmentName}` : '+ Attach file (PDF, image)'}
        </Text>
      </TouchableOpacity>
      {attachmentName ? (
        <TouchableOpacity onPress={() => setAttachmentName('')} hitSlop={12}>
          <Text style={s.recRemoveAttachTxt}>Remove attachment</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}

// REC-003: Record detail view â€” full record + edit/delete actions
function RecordDetailScreen({
  record,
  pet,
  onBack,
  onEdit,
  onDelete,
}: {
  record: HealthRecord;
  pet: Pet | null;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const cfg = RECORD_TYPE_CONFIG[record.type];

  return (
    <ScrollView contentContainerStyle={s.recDetailWrap} showsVerticalScrollIndicator={false}>
      <View style={s.recHeader}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.recTitle}>Record</Text>
        <TouchableOpacity onPress={onEdit} hitSlop={12}>
          <Text style={s.editSaveTxt}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={[s.recDetailHero, { backgroundColor: cfg.bgColor }]}>
        <View style={s.recDetailHeroInner}>
          <Text style={s.recDetailIcon}>{cfg.icon}</Text>
          <Text style={[s.recDetailType, { color: cfg.color }]}>{record.type}</Text>
        </View>
        <Text style={s.recDetailTitle}>{record.title}</Text>
        <Text style={s.recDetailDate}>{formatRecordDate(record.recordDate)}</Text>
      </View>

      <View style={s.recDetailSection}>
        <Text style={s.recDetailLbl}>Pet</Text>
        <Text style={s.recDetailVal}>{pet?.name ?? 'Unknown'}</Text>
      </View>

      {record.description ? (
        <View style={s.recDetailSection}>
          <Text style={s.recDetailLbl}>Description</Text>
          <Text style={s.recDetailDesc}>{record.description}</Text>
        </View>
      ) : null}

      <View style={s.recDetailRowCard}>
        <View style={s.recDetailRow}>
          <Text style={s.recDetailLbl}>Veterinarian</Text>
          <Text style={s.recDetailVal}>{record.vetName || 'â€”'}</Text>
        </View>
        <View style={[s.recDetailRow, s.recDetailRowBorder]}>
          <Text style={s.recDetailLbl}>Clinic</Text>
          <Text style={s.recDetailVal}>{record.clinicName || 'â€”'}</Text>
        </View>
      </View>

      {record.attachmentName ? (
        <View style={s.recDetailSection}>
          <Text style={s.recDetailLbl}>Attachment</Text>
          <View style={s.recDetailAttachCard}>
            <Text style={s.recDetailAttachTxt}>ðŸ“Ž {record.attachmentName}</Text>
          </View>
        </View>
      ) : null}

      {confirming ? (
        <View style={s.petConfirmCard}>
          <View style={s.row}>
            <AlertIcon width={20} height={20} />
            <Text style={s.petConfirmTitle}>Delete this record?</Text>
          </View>
          <Text style={s.petConfirmSub}>This action cannot be undone.</Text>
          <View style={s.petConfirmActions}>
            <TouchableOpacity style={s.petConfirmCancel} onPress={() => setConfirming(false)}>
              <Text style={s.petConfirmCancelTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.petConfirmDelete} onPress={onDelete}>
              <Text style={s.petConfirmDeleteTxt}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={s.recDetailDelete} onPress={() => setConfirming(true)}>
          <Text style={s.recDetailDeleteTxt}>Delete Record</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

// Helper: human-readable record date
function formatRecordDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF8F5' },
  fill: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  blank: { width: 24 },

  topGlow: { position: 'absolute', right: -160, top: -160, width: 320, height: 320, borderRadius: 160, backgroundColor: '#FFEADF', opacity: 0.6 },
  bottomGlow: { position: 'absolute', left: -160, bottom: -160, width: 320, height: 320, borderRadius: 160, backgroundColor: '#FFB783', opacity: 0.2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 192, height: 84 },
  footer: { alignItems: 'center', paddingBottom: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E67E22' },
  dotGap: { paddingLeft: 8 },
  powered: { color: '#897365', fontSize: 12, letterSpacing: 0.6, marginBottom: 6 },
  link: { color: '#564337', fontSize: 12 },
  sep: { color: '#DCC1B1', marginHorizontal: 16 },

  onbWrap: { flex: 1, paddingHorizontal: 20, paddingTop: 32 },
  onbHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  onbBody: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  onbFoot: { alignItems: 'center', gap: 32, paddingBottom: 32 },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF1EA', alignItems: 'center', justifyContent: 'center' },
  roundBtnSm: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FEE3D5', alignItems: 'center', justifyContent: 'center' },
  skip: { color: '#564337', fontSize: 14, fontWeight: '600' },
  card320: { width: '100%', maxWidth: 320, height: 320, borderRadius: 40, backgroundColor: '#fff', padding: 16, overflow: 'hidden', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  fillImg: { width: '100%', height: '100%', borderRadius: 32 },
  badge: { position: 'absolute', top: 16, right: 16, borderRadius: 999, backgroundColor: '#E67E22', paddingHorizontal: 12, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', gap: 4 },
  badgeTxt: { color: '#502600', fontSize: 12 },
  title: { color: '#261810', fontSize: 28, lineHeight: 36, fontWeight: '700', textAlign: 'center', marginBottom: 14 },
  sub: { color: '#564337', fontSize: 16, lineHeight: 26, textAlign: 'center' },
  indActiveDark: { width: 32, height: 8, borderRadius: 999, backgroundColor: '#944A00' },
  indDotDark: { width: 8, height: 8, borderRadius: 999, backgroundColor: '#DCC1B1' },
  indActiveLight: { width: 24, height: 8, borderRadius: 999, backgroundColor: '#E67E22' },
  indDotLight: { width: 8, height: 8, borderRadius: 999, backgroundColor: '#DCC1B1', opacity: 0.4 },
  nextRingDark: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: 'rgba(148,74,0,0.2)', alignItems: 'center', justifyContent: 'center' },
  nextCoreDark: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#944A00', alignItems: 'center', justifyContent: 'center' },
  nextRingLight: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#E67E22', alignItems: 'center', justifyContent: 'center' },
  nextCoreLight: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center' },
  icon12: { width: 12, height: 12 },
  icon14: { width: 14, height: 14 },
  icon16: { width: 16, height: 16, opacity: 0.6, marginRight: 10 },
  icon18: { width: 18, height: 18 },
  icon20: { width: 20, height: 20 },
  icon24: { width: 24, height: 24 },

  activityWrap: { width: '100%', maxWidth: 350, borderRadius: 40, backgroundColor: '#FFF4ED', paddingVertical: 26, alignItems: 'center', marginBottom: 20 },
  activityImg: { width: 298, height: 298 },
  chip: { position: 'absolute', right: 24, top: 48, borderRadius: 12, borderWidth: 1, borderColor: '#FEE3D5', backgroundColor: '#fff', padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  chipIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#D1E5F3', alignItems: 'center', justifyContent: 'center' },
  chipIcon: { width: 16, height: 20 },
  chipLbl: { color: '#564337', fontSize: 12 },
  chipVal: { color: '#944A00', fontSize: 14, fontWeight: '600' },

  // Unified card shadow: 0 4px 20px 0 rgba(0,0,0,0.05)
  cardShadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },

  authWrap: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 24 },
  authTop: { alignItems: 'center' },
  topDecor: { position: 'absolute', left: -40, top: -40, width: 160, height: 180 },
  authLogo: { width: 120, height: 52, marginBottom: 24 },
  authLogoSm: { width: 111, height: 48, marginBottom: 16 },
  authTitle: { color: '#261810', fontSize: 28, lineHeight: 36, fontWeight: '700', marginBottom: 4, textAlign: 'center' },
  authSub: { color: '#564337', fontSize: 16, lineHeight: 24, textAlign: 'center', marginBottom: 24 },
  authCard: { backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  googleBtn: { height: 56, borderRadius: 16, borderWidth: 2, borderColor: '#DCC1B1', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 },
  googleTxt: { color: '#564337', fontSize: 14, fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  divLine: { flex: 1, height: 1, backgroundColor: '#DCC1B1', opacity: 0.5 },
  divLineStrong: { flex: 1, height: 1, backgroundColor: '#DCC1B1' },
  divTxt: { color: '#564337', fontSize: 12, letterSpacing: 0.6, fontWeight: '500' },
  divTxtMuted: { color: '#564337', opacity: 0.6, fontSize: 12 },
  lbl: { color: '#261810', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: { height: 56, borderRadius: 16, backgroundColor: '#FEF5E7', paddingHorizontal: 24, color: '#564337', marginBottom: 16 },
  primary: { height: 56, borderRadius: 999, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center' },
  primaryTxt: { color: '#fff', fontSize: 14, fontWeight: '600' },
  createTxt: { color: '#fff', fontSize: 20, fontWeight: '600' },
  verifyTxt: { color: '#502600', fontSize: 14, fontWeight: '600' },
  loginCreate: { flexDirection: 'row', alignSelf: 'center', marginTop: 24 },
  loginCreateA: { color: '#564337', fontSize: 14 },
  loginCreateB: { color: '#944A00', fontSize: 12, fontWeight: '500' },
  bottomDecor: { position: 'absolute', right: -40, bottom: -290, width: 250, height: 238 },
  legalFoot: { flexDirection: 'row', justifyContent: 'center', gap: 24, paddingVertical: 24 },
  legalMuted: { color: 'rgba(86,67,55,0.6)', fontSize: 12 },

  field: { marginBottom: 16 },
  lblDark: { color: '#564337', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  inputRow: { height: 48, borderRadius: 16, backgroundColor: '#FEF5E7', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  inputIconWrap: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  inputInline: { flex: 1, color: '#564337' },
  inputRightIconWrap: { minWidth: 22, minHeight: 15, alignItems: 'center', justifyContent: 'center' },
  eye: { width: 22, height: 15, opacity: 0.6 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 18 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#DCC1B1' },
  terms: { flex: 1, color: '#564337', fontSize: 14, lineHeight: 20 },
  termsAccent: { color: '#944A00' },
  socialRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  socialBtn: { flex: 1, height: 48, borderWidth: 2, borderColor: '#DCC1B1', borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  socialTxt: { color: '#261810', fontSize: 16 },
  appleIcon: { width: 16, height: 10 },
  already: { color: '#564337', textAlign: 'center', fontSize: 16 },

  otpWrap: { flex: 1, backgroundColor: '#FFF8F5', paddingHorizontal: 20, paddingTop: 8 },
  otpTop: { height: 56, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  otpBack: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  otpBrand: { color: '#944A00', fontSize: 24, fontWeight: '700' },
  otpCard: { marginTop: 8, borderRadius: 24, backgroundColor: '#fff', padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  otpHero: { width: 90, height: 84, marginBottom: 16 },
  otpIconContainer: { width: 72, height: 66, borderRadius: 9999, backgroundColor: '#FFF1EA', alignItems: 'center', justifyContent: 'center' },
  otpTitle: { color: '#261810', fontSize: 28, fontWeight: '700', marginBottom: 8 },
  otpSub: { color: '#564337', fontSize: 16, lineHeight: 24, textAlign: 'center', marginBottom: 24 },
  otpRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  otpInput: { width: 64, height: 80, borderRadius: 12, backgroundColor: '#FFEADF', textAlign: 'center', fontSize: 28, color: '#261810' },
  otpVerifyBtn: { width: 156, height: 56, borderRadius: 999, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center' },
  otpVerifyTxt: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  otpHint: { marginTop: 24, color: '#564337', fontSize: 14 },
  otpResend: { color: '#944A00', opacity: 0.5, fontSize: 14, fontWeight: '600' },
  otpDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#DCC1B1', marginHorizontal: 10 },
  otpTime: { color: '#564337', fontSize: 14, fontWeight: '600' },
  secure: { marginTop: 'auto', marginBottom: 18, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: 6, opacity: 0.6 },
  lock: { width: 10, height: 12 },
  secureTxt: { color: '#564337', fontSize: 12 },

  homeWrap: { flex: 1, backgroundColor: '#F4F0EF' },
  // Two large decorative blur circles matching Figma Overlay+Blur nodes (320Ã—320 each)
  homeTopGlow: { position: 'absolute', right: -90, top: -160, width: 320, height: 320, borderRadius: 160, backgroundColor: '#FFDAB3', opacity: 0.35 },
  homeBottomGlow: { position: 'absolute', left: -180, top: 114, width: 320, height: 320, borderRadius: 160, backgroundColor: '#E8D4B8', opacity: 0.25 },
  homeContent: { paddingHorizontal: 14, paddingTop: 6, paddingBottom: 110 },
  homeHeader: { backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingTop: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, zIndex: 10 },
  homeUserBtn: { width: 48, height: 48, borderRadius: 9999, borderWidth: 2, borderColor: '#F37021', padding: 2, overflow: 'hidden' },
  homeUserAvatar: { width: '100%', height: '100%', borderRadius: 9999 },
  homeBrand: { color: '#1A78C1', fontSize: 24, fontWeight: '700' },
  homeBellWrap: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  homeBellBtn: { width: 35, height: 40, padding: 8, alignItems: 'center', justifyContent: 'center' },
  // Pet profile card â€” Figma: solid warm background, 40px gap to actions below
  homePetCard: { width: '100%', height: 146, borderRadius: 40, backgroundColor: '#FFF5EB', padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 40, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  homePetImgWrap: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  homePetImg: { width: 88, height: 88, borderRadius: 44, margin: 4 },
  // Status badge overlay at bottom-right of avatar â€” Figma: 24Ã—24
  homePetStatusBadge: { position: 'absolute', right: -2, bottom: -2, width: 24, height: 24, borderRadius: 12, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  homePetBody: { flex: 1, marginLeft: 10 },
  homePetName: { color: '#261810', fontSize: 30, lineHeight: 36, fontWeight: '800', marginRight: 8 },
  homeActive: { alignSelf: 'center', backgroundColor: '#DDF1D2', color: '#1F8A44', fontSize: 10, fontWeight: '900', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  homeHealthPill: { marginTop: 6, alignSelf: 'flex-start', borderRadius: 999, backgroundColor: '#F3C47D', paddingHorizontal: 12, paddingVertical: 7, flexDirection: 'row', alignItems: 'center' },
  homeHealthTxt: { color: '#663D0B', fontSize: 12, fontWeight: '600' },
  // Quick Actions â€” Figma: 24px gap to Vitals section below
  homeActions: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  homeAction: { flex: 1, height: 96, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', paddingTop: 16 },
  homeActionIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  homeActionLabel: { color: '#3E2F26', fontSize: 12, fontWeight: '500' },
  homeSectionTitle: { color: '#261810', fontSize: 20, lineHeight: 28, fontWeight: '600', marginBottom: 10 },
  // Vitals row â€” Figma: 24px gap to next section (Upcoming Care)
  homeVitalsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  homeVitalCard: { width: '48.5%', minHeight: 144, borderRadius: 24, backgroundColor: '#fff', padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  homeVitalLabel: { color: '#4F3D31', fontSize: 14, fontWeight: '600', marginBottom: 12 },
  homeVitalValue: { color: '#261810', fontSize: 32, fontWeight: '400' },
  homeVitalUnit: { color: '#6D5B50', fontSize: 16, fontWeight: '400' },
  homeVitalAccent: { color: '#00A66D', fontSize: 10, fontWeight: '700', marginTop: 2, letterSpacing: 1.2 },
  homeBarBg: { height: 6, borderRadius: 6, backgroundColor: '#E8E3E1', marginTop: 14, marginBottom: 6, overflow: 'hidden' },
  homeBarFill: { width: '62%', height: '100%', backgroundColor: '#F39A18' },
  homeMuted: { color: '#6D5B50', fontSize: 12, fontWeight: '500' },
  homeActiveToday: { marginTop: 16 },
  // Heart Rate card â€” Figma: 24px gap to Upcoming Care below
  homeRateCard: { borderRadius: 32, backgroundColor: '#FFFFFF', padding: 24, marginBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  homeRateLeft: {},
  homeRateTitle: { color: '#564334', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  homeRateValueRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  homeRateValue: { color: '#1C1B1B', fontSize: 32, lineHeight: 48, fontWeight: '400' },
  homeRateUnitWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 12 },
  homeRateUnit: { color: '#897362', fontSize: 16, fontWeight: '400' },
  homeRateBars: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 48 },
  homeRateBar: { width: 6, borderRadius: 9999 },
  homeSectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  homeViewAll: { color: '#904D00', fontSize: 14, fontWeight: '600', marginBottom: 10 },
  homeCareList: { gap: 12, marginBottom: 14 },
  homeCareCard: { borderRadius: 24, backgroundColor: '#FFFFFF', padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  homeCareCardAlt: { backgroundColor: '#F6F3F2', borderRadius: 24, borderWidth: 1, borderColor: 'rgba(137, 115, 98, 0.10)' },
  homeDays: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#FFDAD6', alignItems: 'center', justifyContent: 'center' },
  homeDaysAlt: { borderRadius: 16, backgroundColor: 'rgba(137, 115, 98, 0.10)' },
  homeDaysNum: { color: '#93000A', fontSize: 18, fontWeight: '700', lineHeight: 23 },
  homeDaysLbl: { color: '#93000A', fontSize: 10, fontWeight: '900', lineHeight: 15 },
  homeCareBody: { flex: 1, marginLeft: 0 },
  homeCareTitle: { color: '#1C1B1B', fontSize: 14, lineHeight: 18, fontWeight: '600' },
  homeCareSub: { color: '#564334', fontSize: 12, fontWeight: '500' },
  homeBookBtn: { borderRadius: 9999, paddingHorizontal: 24, paddingVertical: 8, backgroundColor: '#904D00', alignItems: 'center', justifyContent: 'center' },
  homeBookTxt: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  homeRecentCard: { flex: 1, borderRadius: 32, backgroundColor: '#FFFFFF', padding: 20, flexDirection: 'column', marginBottom: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  homeRecentCardWalk: { minHeight: 182 },
  homeRecentIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFEADF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  homeRecentBody: { flex: 1 },
  homeDistance: { color: '#5E39E0', fontSize: 14, fontWeight: '700' },
  homeRecentWalkHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  homeRecentWalkLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  homeRecentIconWalk: { width: 27, height: 34, borderRadius: 12, backgroundColor: '#E6DEFF', alignItems: 'center', justifyContent: 'center' },
  homeRecentIconFeed: { width: 29, height: 33, borderRadius: 12, backgroundColor: '#FFDCC3', alignItems: 'center', justifyContent: 'center' },
  homeRecentSubAlt: { color: '#897362', fontSize: 12, fontWeight: '500' },
  homeWalkMap: { height: 96, borderRadius: 16, backgroundColor: '#F0EDED', alignItems: 'center', justifyContent: 'center' },
  homeWalkMapPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFFFFF', borderRadius: 9999, paddingHorizontal: 12, paddingVertical: 4, color: '#5E39E0', fontSize: 10, fontWeight: '700' },
  homeWalkMapPillTxt: { color: '#5E39E0', fontSize: 10, fontWeight: '700' },
  homeFeedPill: { backgroundColor: '#FF8C00', borderRadius: 9999, paddingHorizontal: 12, paddingVertical: 4 },
  homeFeedPillTxt: { color: '#623200', fontSize: 10, fontWeight: '700' },
  homeTimeline: { paddingLeft: 0 },
  homeTimelineItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24 },
  homeTimelineRail: { width: 24, alignItems: 'center', marginRight: 16, marginTop: 2 },
  homeTimelineDot: { width: 24, height: 24, borderRadius: 9999, backgroundColor: '#FFFFFF', borderWidth: 4, borderColor: '#FFDCC3', alignItems: 'center', justifyContent: 'center' },
  homeTimelineDotInner: { width: 8, height: 8, borderRadius: 9999, backgroundColor: '#904D00' },
  homeTimelineLine: { width: 4, flex: 1, minHeight: 60, backgroundColor: '#FFDCC3', marginTop: 4 },
  profileWrap: { flex: 1, backgroundColor: '#FFF8F5', paddingTop: 8 },
  profileTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8 },
  topAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 16 },
  profileTitle: { color: '#944A00', fontSize: 20, fontWeight: '600' },
  profileContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 130, gap: 20 },
  profileCard: { backgroundColor: '#fff', borderRadius: 12, padding: 24, flexDirection: 'row', alignItems: 'center', gap: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  profileAvatar: { width: 80, height: 80, borderRadius: 40 },
  profileBody: { flex: 1 },
  profileName: { color: '#261810', fontSize: 20, fontWeight: '600', marginBottom: 4 },
  premium: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFDCC5', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 },
  premiumTxt: { color: '#713700', fontSize: 12, fontWeight: '500' },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: '#261810', fontSize: 20, fontWeight: '600' },
  addNew: { color: '#944A00', fontSize: 14, fontWeight: '600' },
  pets: { flexDirection: 'row', gap: 16 },
  pet: { alignItems: 'center' },
  petRing: { width: 96, height: 96, borderRadius: 48, padding: 4 },
  petImg: { width: '100%', height: '100%', borderRadius: 44 },
  petName: { marginTop: 4, color: '#261810', fontSize: 14, fontWeight: '600' },
  settings: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  setting: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 22 },
  settingBorder: { borderBottomWidth: 1, borderBottomColor: '#FFF8F5' },
  settingIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFEADF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  settingTitle: { color: '#261810', fontSize: 16 },
  trailing: { color: '#944A00', fontSize: 14, fontWeight: '600', marginRight: 6 },
  chevron: { width: 8, height: 12 },
  logout: { height: 56, borderRadius: 16, borderWidth: 2, borderColor: '#E67E22', backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  logoutTxt: { color: '#E67E22', fontSize: 16 },
  // Bottom navigation â€” glassmorphism pill
  nav: { position: 'absolute', left: 20, right: 20, bottom: 16, borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', paddingVertical: 8, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 32, elevation: 10 },
  navItem: { width: 64, height: 48, alignItems: 'center', justifyContent: 'center', gap: 4 },
  navIconWrap: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
  navTxt: { color: '#564337', fontSize: 10, fontWeight: '500' },
  navActive: { width: 80, height: 56, borderRadius: 999, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center', gap: 4 },
  navActiveTxt: { color: '#fff', fontSize: 10, fontWeight: '700' },

  // Edit Profile screen
  editProfileWrap: { flexGrow: 1, backgroundColor: '#FFF8F5', paddingBottom: 32 },
  editSaveTxt: { color: '#944A00', fontSize: 16, fontWeight: '600' },
  editSaveDisabled: { opacity: 0.35 },
  editDivider: { height: 1, backgroundColor: '#F2E4D9', marginVertical: 8 },
  editAvatarWrap: { alignSelf: 'center', marginVertical: 14, position: 'relative' },
  editAvatar: { width: 110, height: 110, borderRadius: 55 },
  editAvatarBadge: { position: 'absolute', bottom: 2, right: 2, width: 32, height: 32, borderRadius: 16, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFF8F5' },
  editSectionLbl: { color: '#564337', fontSize: 14, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 16 },
  editDeleteBtn: { marginTop: 24, marginHorizontal: 20, height: 56, borderRadius: 16, borderWidth: 2, borderColor: '#F4D7D7', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  editDeleteTxt: { color: '#BA1A1A', fontSize: 16, fontWeight: '600' },

  // Pet list tiles on the Profile screen
  petImgPlaceholder: { width: '100%', height: '100%', borderRadius: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.25)' },
  petAddRing: { backgroundColor: '#FFF1EA', alignItems: 'center', justifyContent: 'center', borderColor: '#FEE3D5', borderWidth: 2 },

  // PetForm (PET-001 / PET-002)
  petFormAvatarWrap: { alignSelf: 'center', marginVertical: 20, position: 'relative' },
  petFormAvatar: { width: 110, height: 110, borderRadius: 55 },
  petFormAvatarBadgeWrap: { position: 'absolute', bottom: 0, right: 0, left: 0, alignItems: 'center' },
  petFormAvatarBadge: { marginLeft: 70, width: 34, height: 34, borderRadius: 17, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFF8F5' },

  // SegmentedControl (Species / Gender)
  segmentWrap: { height: 48, borderRadius: 16, backgroundColor: '#FEF5E7', flexDirection: 'row', padding: 4 },
  segment: { flex: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  segmentActive: { backgroundColor: '#E67E22' },
  segmentTxt: { color: '#564337', fontSize: 14, fontWeight: '600' },
  segmentTxtActive: { color: '#FFFFFF' },

  // Register step review card
  petReviewCard: { marginTop: 16, backgroundColor: '#FEF5E7', borderRadius: 16, padding: 16 },
  petReviewLbl: { color: '#944A00', fontSize: 12, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 12 },
  petReviewRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  petReviewBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(220,193,177,0.5)' },
  petReviewKey: { color: '#564337', fontSize: 14 },
  petReviewVal: { color: '#261810', fontSize: 14, fontWeight: '600' },

  // 3-step wizard indicator
  petStepWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 24 },
  petStepItem: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  petStepCircle: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEE3D5' },
  petStepCircleActive: { backgroundColor: '#E67E22' },
  petStepCircleDone: { backgroundColor: '#944A00' },
  petStepNum: { color: '#944A00', fontSize: 13, fontWeight: '700' },
  petStepNumActive: { color: '#FFFFFF' },
  petStepLbl: { marginLeft: 8, color: '#897365', fontSize: 12, fontWeight: '600' },
  petStepLblActive: { color: '#261810' },
  petStepLine: { flex: 1, height: 2, backgroundColor: '#FEE3D5', marginHorizontal: 6 },
  petStepLineDone: { backgroundColor: '#944A00' },

  // Wizard actions footer
  petWizardActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 24 },
  petWizardPrimary: { flex: 1, marginLeft: 12, height: 56, borderRadius: 999, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center' },
  petWizardPrimaryDisabled: { backgroundColor: '#F2D9C0' },
  petWizardPrimaryTxt: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  petWizardBack: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 16, paddingHorizontal: 4 },
  petWizardBackTxt: { color: '#944A00', fontSize: 16, fontWeight: '600' },

  // PetProfileScreen (PET-005)
  petProfileWrap: { flex: 1, backgroundColor: '#FFF8F5' },
  petProfileContent: { paddingBottom: 40 },
  petHeroWrap: { height: 280, backgroundColor: '#FFEADF', position: 'relative' },
  petHero: { width: '100%', height: '100%' },
  petHeroPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  petProfileBackWrap: { position: 'absolute', top: 14, left: 16, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 16 },
  petHeroEdit: { position: 'absolute', top: 14, right: 16, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 16, padding: 6 },
  petProfileBody: { paddingHorizontal: 20, paddingTop: 18, gap: 12 },
  petProfileName: { color: '#261810', fontSize: 26, fontWeight: '700', textAlign: 'center' },
  petSpeciesPill: { alignSelf: 'center', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 4 },
  petSpeciesTxt: { color: '#3B1E0B', fontSize: 12, fontWeight: '700', letterSpacing: 0.4 },
  petBreed: { color: '#564337', fontSize: 14, textAlign: 'center' },
  petAgeCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', marginTop: 4 },
  petAgeLbl: { color: '#564337', fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6 },
  petAgeValue: { color: '#944A00', fontSize: 28, fontWeight: '700' },
  petAgeSub: { color: '#564337', fontSize: 12, marginTop: 4 },
  petFactsCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', marginTop: 4 },
  petFact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 18 },
  petFactBorder: { borderBottomWidth: 1, borderBottomColor: '#FFF8F5' },
  petFactLbl: { color: '#564337', fontSize: 14 },
  petFactVal: { color: '#261810', fontSize: 14, fontWeight: '600' },
  petEditBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 52, borderRadius: 999, backgroundColor: '#944A00' },
  petEditBtnTxt: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  petDeleteLink: { alignSelf: 'center', marginTop: 8, padding: 12 },
  petDeleteLinkTxt: { color: '#BA1A1A', fontSize: 14, fontWeight: '600' },

  // Delete confirmation (PET-003)
  petConfirmCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, marginTop: 20, borderWidth: 1, borderColor: '#F4D7D7' },
  petConfirmTitle: { color: '#BA1A1A', fontSize: 18, fontWeight: '700', marginLeft: 10 },
  petConfirmSub: { color: '#564337', fontSize: 13, lineHeight: 20, marginTop: 8, marginBottom: 16 },
  petConfirmActions: { flexDirection: 'row', gap: 12 },
  petConfirmCancel: { flex: 1, height: 48, borderRadius: 999, borderWidth: 2, borderColor: '#DCC1B1', alignItems: 'center', justifyContent: 'center' },
  petConfirmCancelTxt: { color: '#944A00', fontSize: 14, fontWeight: '700' },
  petConfirmDelete: { flex: 1, height: 48, borderRadius: 999, backgroundColor: '#BA1A1A', alignItems: 'center', justifyContent: 'center' },
  petConfirmDeleteTxt: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },

  // Records screen (REC-006)
  recWrap: { flex: 1, backgroundColor: '#FFF8F5' },
  recHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, zIndex: 10 },
  recTitle: { color: '#944A00', fontSize: 20, fontWeight: '700' },
  recSearchWrap: { paddingHorizontal: 20, paddingBottom: 12 },
  recSearchBox: { height: 48, borderRadius: 16, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  recSearchInput: { flex: 1, color: '#261810', fontSize: 14, padding: 0 },
  recClearTxt: { color: '#897365', fontSize: 16, paddingHorizontal: 4 },
  recChips: { paddingHorizontal: 20, paddingBottom: 8 },
  recChip: { height: 36, borderRadius: 999, backgroundColor: '#FFFFFF', paddingHorizontal: 14, marginRight: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FEE3D5' },
  recChipActive: { backgroundColor: '#944A00', borderColor: '#944A00' },
  recChipTxt: { color: '#564337', fontSize: 12, fontWeight: '600' },
  recChipTxtActive: { color: '#FFFFFF' },
  recCountTxt: { color: '#897365', fontSize: 12, fontWeight: '600', paddingHorizontal: 20, paddingBottom: 8 },
  recList: { paddingHorizontal: 20, paddingBottom: 120, gap: 12 },
  recEmpty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, gap: 12 },
  recEmptyTitle: { color: '#261810', fontSize: 18, fontWeight: '600' },
  recEmptySub: { color: '#897365', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  recCard: { borderRadius: 20, backgroundColor: '#FFFFFF', padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  recCardIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  recCardIconTxt: { fontSize: 22 },
  recCardBody: { flex: 1 },
  recCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  recCardTitle: { flex: 1, color: '#261810', fontSize: 15, fontWeight: '600', marginRight: 8 },
  recCardPill: { fontSize: 10, fontWeight: '700', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  recCardPet: { color: '#564337', fontSize: 12, fontWeight: '500' },
  recCardVet: { color: '#897365', fontSize: 11, marginTop: 2 },
  recAttachRow: { marginTop: 6 },
  recAttachTxt: { color: '#944A00', fontSize: 11, fontWeight: '500' },
  recFab: { position: 'absolute', right: 20, bottom: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 8 },
  recFabTxt: { color: '#FFFFFF', fontSize: 28, fontWeight: '400', marginTop: -2 },

  // Add Record form (REC-002)
  recFormWrap: { flexGrow: 1, backgroundColor: '#FFF8F5', paddingBottom: 40 },
  recFieldLbl: { color: '#564337', fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 16, paddingHorizontal: 20 },
  recTypeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 20 },
  recTypeChip: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 40, borderRadius: 999, backgroundColor: '#FFFFFF', paddingHorizontal: 14, borderWidth: 1, borderColor: '#FEE3D5' },
  recTypeChipIcon: { fontSize: 16 },
  recTypeChipTxt: { color: '#564337', fontSize: 12, fontWeight: '600' },
  recPetPicker: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 20 },
  recPetChip: { height: 40, borderRadius: 999, backgroundColor: '#FFFFFF', paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FEE3D5' },
  recPetChipActive: { backgroundColor: '#944A00', borderColor: '#944A00' },
  recPetChipTxt: { color: '#564337', fontSize: 13, fontWeight: '600' },
  recPetChipTxtActive: { color: '#FFFFFF' },
  recInput: { minHeight: 48, borderRadius: 16, backgroundColor: '#FEF5E7', paddingHorizontal: 16, paddingVertical: 12, color: '#261810', fontSize: 14, marginHorizontal: 20, marginBottom: 4 },
  recInputMulti: { minHeight: 96, textAlignVertical: 'top' },
  recAttachBtn: { height: 48, borderRadius: 16, borderWidth: 1, borderColor: '#FEE3D5', borderStyle: 'dashed', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 4, marginBottom: 4 },
  recAttachBtnTxt: { color: '#944A00', fontSize: 13, fontWeight: '600' },
  recRemoveAttachTxt: { color: '#BA1A1A', fontSize: 12, fontWeight: '500', paddingHorizontal: 20, marginTop: 6 },

  // Record Detail (REC-003)
  recDetailWrap: { flexGrow: 1, backgroundColor: '#FFF8F5', paddingBottom: 40 },
  recDetailHero: { marginHorizontal: 20, marginTop: 12, borderRadius: 24, padding: 24, alignItems: 'center' },
  recDetailHeroInner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  recDetailIcon: { fontSize: 28 },
  recDetailType: { fontSize: 14, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' },
  recDetailTitle: { color: '#261810', fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  recDetailDate: { color: '#564337', fontSize: 14 },
  recDetailSection: { paddingHorizontal: 20, marginTop: 20 },
  recDetailLbl: { color: '#897365', fontSize: 12, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6 },
  recDetailVal: { color: '#261810', fontSize: 15 },
  recDetailDesc: { color: '#261810', fontSize: 14, lineHeight: 22 },
  recDetailRowCard: { marginHorizontal: 20, marginTop: 20, backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  recDetailRow: { paddingHorizontal: 20, paddingVertical: 16 },
  recDetailRowBorder: { borderTopWidth: 1, borderTopColor: '#FFF8F5' },
  recDetailAttachCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF1EA', borderRadius: 12, padding: 16, marginTop: 4 },
  recDetailAttachTxt: { color: '#944A00', fontSize: 14, fontWeight: '600' },
  recDetailDelete: { alignSelf: 'center', marginTop: 32, padding: 12 },
  recDetailDeleteTxt: { color: '#BA1A1A', fontSize: 14, fontWeight: '600' },
});

