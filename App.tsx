import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  ActivityIndicator,
  Alert,
  Image,
  LayoutAnimation,
  Modal,
  type ImageSourcePropType,
  Platform,
  SectionList,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Svg, { Circle, Path, Polyline, Rect, type SvgProps } from 'react-native-svg';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
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
import RemindersNavIcon from './src/assets/icons/reminders-icon-nav.svg';
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
// Newly added icons (PET-XXX feature assets - wired into ASSET/JSX as needed).
import WalkIcon from './src/assets/icons/Walk.svg';
import VetIcon from './src/assets/icons/Vet.svg';
import PushNotificationIcon from './src/assets/icons/push-notification.svg';
import OverdueIcon from './src/assets/icons/overdue.svg';
import UpcomingIcon from './src/assets/icons/upcoming.svg';
import NotificationsIcon from './src/assets/icons/notifications.svg';
import HeartRateIcon from './src/assets/icons/heart.svg';
import HealthAlertsIcon from './src/assets/icons/health-alerts.svg';
import FeedIcon from './src/assets/icons/feed.svg';
import CurrentVitalsIcon from './src/assets/icons/current-vitals.svg';
import ExcellentHealthIcon from './src/assets/icons/excellent-health.svg';
import TickIcon from './src/assets/icons/tick.svg';
import VaccineIcon from './src/assets/icons/vaccine.svg';
import MedicationIcon from './src/assets/icons/medication.svg';
import CheckupIcon from './src/assets/icons/checkup.svg';
import SurgeryIcon from './src/assets/icons/surgery.svg';
import LabResultIcon from './src/assets/icons/lab-result.svg';
import OtherRecordsIcon from './src/assets/icons/other-records.svg';
import SmartCollarIcon from './src/assets/icons/smart-collar.svg';
import LogIcon from './src/assets/icons/Log.svg';
import PawosFinalLogoIcon from './src/assets/icons/Pawos final logo.svg';
import CalendarIcon from './src/assets/icons/calendar.svg';
import BackIcon from './src/assets/icons/back-icon.svg';
import ForwardIcon from './src/assets/icons/forward-icon.svg';
import GoogleIcon from './src/assets/icons/google-icon.svg';
import IosIcon from './src/assets/icons/ios-icon.svg';

const supabaseModule = (() => {
  try {
    return require('@supabase/supabase-js') as {
      createClient?: (url: string, key: string) => unknown;
    };
  } catch {
    return null;
  }
})();

const notificationsModule = (() => {
  try {
    return require('expo-notifications') as {
      setBadgeCountAsync?: (count: number) => Promise<void>;
      scheduleNotificationAsync?: (input: unknown) => Promise<string>;
      requestPermissionsAsync?: () => Promise<{ status?: string; granted?: boolean }>;
      getPermissionsAsync?: () => Promise<{ status?: string; granted?: boolean }>;
      getExpoPushTokenAsync?: () => Promise<{ data?: string } | string>;
    };
  } catch {
    return null;
  }
})();

const dateTimePickerModule = (() => {
  try {
    return require('@react-native-community/datetimepicker') as {
      default?: React.ComponentType<{
        value: Date;
        mode?: 'date' | 'time' | 'datetime';
        minimumDate?: Date;
        onChange?: (event: unknown, date?: Date) => void;
      }>;
    };
  } catch {
    return null;
  }
})();

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
  petCooper: require('./src/assets/placeholders/cooper.jpg'),
  petLuna: require('./src/assets/placeholders/luna.jpg'),
  petMax: require('./src/assets/placeholders/max.jpg'),
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
  petCooper: PLACEHOLDER.petCooper,
  petLuna: PLACEHOLDER.petLuna,
  petMax: PLACEHOLDER.petMax,
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

type Screen =
  | 'splash'
  | 'health'
  | 'activity'
  | 'activity-tracker'
  | 'login'
  | 'signup'
  | 'otp'
  | 'home'
  | 'reminders'
  | 'add-reminder'
  | 'records'
  | 'add-record'
  | 'record-detail'
  | 'ocr-scan'
  | 'ocr-review'
  | 'suggested-reminders'
  | 'share-record'
  | 'profile'
  | 'notification-history'
  | 'edit-profile'
  | 'create-pet'
  | 'pet-profile'
  | 'edit-pet'
  | 'privacy-security';

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

export type ReminderType = 'Vaccine' | 'Medication' | 'Checkup' | 'Custom';
export type ReminderRecurrence = 'None' | 'Monthly' | 'Quarterly' | 'Yearly' | 'Custom';
export type ActivityType = 'Walk' | 'Feed' | 'Play' | 'Medication' | 'Vet Visit';

export type Reminder = {
  id: string;
  petId: string;
  type: ReminderType;
  title: string;
  dueDate: string; // ISO yyyy-mm-dd
  recurrence: ReminderRecurrence;
  customWeeks?: number;
  notifyDays: number;
  pushEnabled: boolean;
  emailEnabled: boolean;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
};

type ReminderWithPet = Reminder & { petName: string };

type PetActivityLog = {
  id: string;
  petId: string;
  type: ActivityType;
  title: string;
  durationMinutes?: number;
  distanceKm?: number;
  notes?: string;
  createdAt: string;
};

type NotificationChannel = 'push' | 'email';

type NotificationPreferences = {
  push: boolean;
  email: boolean;
};

type NotificationHistoryEntry = {
  id: string;
  reminderId: string;
  channel: NotificationChannel;
  title: string;
  message: string;
  sentAt: string;
  recipient: string;
  petName: string;
};

type NotificationKind = 'Reminder' | 'Health' | 'Activity' | 'System' | 'Account';

type AppNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  createdAt: string;
};

type UserProfile = {
  id: string;
  email: string;
  expoPushToken: string;
  pushTokenUpdatedAt?: string;
};

type ReminderPrefill = {
  petId?: string;
  type?: ReminderType;
  title?: string;
};

const RECURRENCE_OPTIONS: ReminderRecurrence[] = ['None', 'Monthly', 'Quarterly', 'Yearly', 'Custom'];
const NOTIFY_DAY_OPTIONS = [1, 3, 5, 7, 14, 30] as const;
const NOTIFICATION_DEDUPE_HOURS = 23;
const NOTIFICATION_HISTORY_DAYS = 30;
const NOTIFICATION_FIRE_HOUR = 8;

const DEFAULT_REMINDERS: Reminder[] = [
  {
    id: 'rem-1',
    petId: 'p-cooper',
    type: 'Vaccine',
    title: 'Rabies Booster',
    dueDate: '2026-06-20',
    recurrence: 'Yearly',
    notifyDays: 7,
    pushEnabled: true,
    emailEnabled: true,
    completed: false,
    createdAt: '2026-05-15T10:30:00Z',
  },
  {
    id: 'rem-2',
    petId: 'p-luna',
    type: 'Medication',
    title: 'Flea Prevention',
    dueDate: '2026-07-08',
    recurrence: 'Monthly',
    notifyDays: 3,
    pushEnabled: true,
    emailEnabled: true,
    completed: false,
    createdAt: '2026-06-10T09:15:00Z',
  },
];

const DEFAULT_ACTIVITY_LOGS: PetActivityLog[] = [
  {
    id: 'act-1',
    petId: 'p-cooper',
    type: 'Walk',
    title: 'Morning walk',
    durationMinutes: 45,
    distanceKm: 2.4,
    notes: 'Park loop path with steady pace.',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-2',
    petId: 'p-luna',
    type: 'Play',
    title: 'Laser play session',
    durationMinutes: 20,
    notes: 'High activity indoors.',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-3',
    petId: 'p-max',
    type: 'Feed',
    title: 'Evening meal',
    notes: 'Salmon kibble, full portion finished.',
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
];

type OCRConfidenceLevel = 'high' | 'medium' | 'low';

type OCRConfidence = {
  type: OCRConfidenceLevel;
  title: OCRConfidenceLevel;
  date: OCRConfidenceLevel;
  vetName: OCRConfidenceLevel;
  clinicName: OCRConfidenceLevel;
};

type OCRResult = {
  type: RecordType;
  title: string;
  date: string;
  vetName: string;
  clinicName: string;
  confidence: OCRConfidence;
};

type ShareLinkState = {
  token: string;
  url: string;
  expiryDays: number | null;
  revoked: boolean;
  passwordRequired: boolean;
  password: string;
};

const SUGGESTION_INTERVALS: Partial<Record<RecordType, { months: number; label: string; recurrence: 'Yearly' | 'Monthly' }>> = {
  Vaccination: { months: 12, label: '1 year from last dose', recurrence: 'Yearly' },
  Medication: { months: 1, label: '1 month after last dose', recurrence: 'Monthly' },
};

function addMonths(base: Date, months: number): Date {
  const next = new Date(base);
  next.setMonth(next.getMonth() + months);
  return next;
}

function addDays(base: Date, days: number): Date {
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  return next;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function tomorrowIso(): string {
  return toIsoDate(addDays(new Date(), 1));
}

function getNextDueDate(currentIso: string, recurrence: ReminderRecurrence, customWeeks?: number): string | null {
  const current = new Date(currentIso);
  if (isNaN(current.getTime())) return null;
  if (recurrence === 'Monthly') return toIsoDate(addMonths(current, 1));
  if (recurrence === 'Quarterly') return toIsoDate(addMonths(current, 3));
  if (recurrence === 'Yearly') return toIsoDate(addMonths(current, 12));
  if (recurrence === 'Custom' && (customWeeks || 0) > 0) return toIsoDate(addDays(current, (customWeeks || 0) * 7));
  return null;
}

function getReminderTypeFromRecord(recordType: RecordType): ReminderType {
  if (recordType === 'Vaccination') return 'Vaccine';
  if (recordType === 'Medication') return 'Medication';
  if (recordType === 'Vet Visit') return 'Checkup';
  return 'Custom';
}

function useFocusEffect(isFocused: boolean, effect: () => void | (() => void)) {
  useEffect(() => {
    if (!isFocused) return;
    return effect();
  }, [isFocused, effect]);
}

function getFieldStyle(conf: OCRConfidenceLevel) {
  if (conf === 'high') {
    return {
      inputBg: '#ECFDF5',
      inputBorder: '#A7F3D0',
      label: 'High confidence',
      labelColor: '#10B981',
    };
  }
  if (conf === 'medium') {
    return {
      inputBg: '#FFFBEB',
      inputBorder: '#FDE68A',
      label: 'Please verify',
      labelColor: '#F59E0B',
    };
  }
  return {
    inputBg: '#FFFFFF',
    inputBorder: '#E5E7EB',
    label: 'Not detected',
    labelColor: '#EF4444',
  };
}

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
  'Vaccination':     { color: '#1F8A44', bgColor: '#DDF1D2', icon: 'V' },
  'Medication':      { color: '#904D00', bgColor: '#FADBD8', icon: 'M' },
  'Vet Visit':       { color: '#1A78C1', bgColor: '#D1E5F3', icon: 'VV' },
  'Surgery':         { color: '#93000A', bgColor: '#FFDAD6', icon: 'S' },
  'Lab Result':      { color: '#6A53D7', bgColor: '#E6DEFF', icon: 'L' },
  'Other':           { color: '#564337', bgColor: '#E8E3E1', icon: 'O' },
};

function RecordTypeIcon({ type, size = 20 }: { type: RecordType; size?: number }) {
  if (type === 'Vaccination') return <VaccineIcon width={size} height={size} />;
  if (type === 'Medication') return <MedicationIcon width={size} height={size} />;
  if (type === 'Vet Visit') return <CheckupIcon width={size} height={size} />;
  if (type === 'Surgery') return <SurgeryIcon width={size} height={size} />;
  if (type === 'Lab Result') return <LabResultIcon width={size} height={size} />;
  return <OtherRecordsIcon width={size} height={size} />;
}

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

function getPetImageSource(pet: Pet): ImageSourcePropType {
  if (pet.photo) return { uri: pet.photo };
  if (pet.id === 'p-cooper') return ASSET.petCooper;
  if (pet.id === 'p-luna') return ASSET.petLuna;
  if (pet.id === 'p-max') return ASSET.petMax;
  return PLACEHOLDER.petPhoto;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  // PET-002/PET-004: pets live in app-level state so edits persist across screens.
  const [pets, setPets] = useState<Pet[]>(DEFAULT_PETS);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  // REC-004: Health records state
  const [records, setRecords] = useState<HealthRecord[]>(DEFAULT_RECORDS);
  const [reminders, setReminders] = useState<Reminder[]>(DEFAULT_REMINDERS);
  const [activityLogs, setActivityLogs] = useState<PetActivityLog[]>(DEFAULT_ACTIVITY_LOGS);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [draftPetId, setDraftPetId] = useState<string | null>(null);
  const [draftPrefill, setDraftPrefill] = useState<Partial<HealthRecord> | null>(null);
  const [ocrPetId, setOcrPetId] = useState<string | null>(null);
  const [ocrImageUri, setOcrImageUri] = useState<string>('');
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [suggestedRecord, setSuggestedRecord] = useState<HealthRecord | null>(null);
  const [shareTarget, setShareTarget] = useState<{ recordId: string; recordTitle: string } | null>(null);
  const [addReminderPrefill, setAddReminderPrefill] = useState<ReminderPrefill | null>(null);
  const [refreshRemindersToken, setRefreshRemindersToken] = useState(0);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    push: true,
    email: true,
  });
  const [notificationHistory, setNotificationHistory] = useState<NotificationHistoryEntry[]>([]);
  const [lastNotificationsViewedAt, setLastNotificationsViewedAt] = useState<string>(new Date(0).toISOString());
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-1',
    email: 'alex@example.com',
    expoPushToken: '',
  });

  useEffect(() => {
    if (screen !== 'splash') return;
    const t = setTimeout(() => setScreen('health'), 2000);
    return () => clearTimeout(t);
  }, [screen]);

  useEffect(() => {
    const isFabric = !!(globalThis as unknown as { nativeFabricUIManager?: unknown }).nativeFabricUIManager;
    if (Platform.OS === 'android' && !isFabric && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const selectedPet = pets.find(p => p.id === selectedPetId) || null;

  const overdueCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return reminders.filter(r => !r.completed && r.dueDate < today).length;
  }, [reminders]);

  useEffect(() => {
    if (!notificationsModule?.setBadgeCountAsync) return;
    notificationsModule.setBadgeCountAsync(overdueCount).catch(() => undefined);
  }, [overdueCount]);

  const pruneNotificationHistory = useCallback((entries: NotificationHistoryEntry[]) => {
    const cutoff = Date.now() - NOTIFICATION_HISTORY_DAYS * 24 * 60 * 60 * 1000;
    return entries
      .filter((entry) => new Date(entry.sentAt).getTime() >= cutoff)
      .sort((a, b) => b.sentAt.localeCompare(a.sentAt));
  }, []);

  const wasSentInDedupeWindow = useCallback((
    entries: NotificationHistoryEntry[],
    reminderId: string,
    channel: NotificationChannel,
    nowMs: number,
  ) => {
    const windowMs = NOTIFICATION_DEDUPE_HOURS * 60 * 60 * 1000;
    return entries.some((entry) => {
      if (entry.reminderId !== reminderId || entry.channel !== channel) return false;
      const sentMs = new Date(entry.sentAt).getTime();
      return Number.isFinite(sentMs) && nowMs - sentMs < windowMs;
    });
  }, []);

  const sendPushNotificationNow = useCallback(async (title: string, message: string) => {
    if (!notificationsModule?.scheduleNotificationAsync) return false;
    try {
      await notificationsModule.scheduleNotificationAsync({
        content: { title, body: message },
        trigger: null,
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  const sendReminderEmailNow = useCallback(async (payload: {
    reminderId: string;
    title: string;
    message: string;
    recipient: string;
  }) => {
    const endpoint = (globalThis as unknown as { __REMINDER_EMAIL_ENDPOINT__?: string }).__REMINDER_EMAIL_ENDPOINT__;
    if (!endpoint) {
      // Local fallback keeps behavior testable when no backend email endpoint is configured.
      return true;
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  const captureExpoPushTokenOnLaunch = useCallback(async () => {
    if (!notificationsModule?.getExpoPushTokenAsync) return;
    try {
      let permissions = await notificationsModule.getPermissionsAsync?.();
      if (permissions?.granted === false || permissions?.status === 'denied') {
        permissions = await notificationsModule.requestPermissionsAsync?.();
      }
      if (permissions?.granted === false || permissions?.status === 'denied') {
        setUserProfile((prev) => ({ ...prev, expoPushToken: '', pushTokenUpdatedAt: new Date().toISOString() }));
        return;
      }

      const tokenResult = await notificationsModule.getExpoPushTokenAsync();
      const token = typeof tokenResult === 'string' ? tokenResult : tokenResult?.data || '';
      const updatedAt = new Date().toISOString();

      setUserProfile((prev) => ({
        ...prev,
        expoPushToken: token,
        pushTokenUpdatedAt: updatedAt,
      }));

      const url = (globalThis as unknown as { __SUPABASE_URL__?: string }).__SUPABASE_URL__;
      const anonKey = (globalThis as unknown as { __SUPABASE_ANON_KEY__?: string }).__SUPABASE_ANON_KEY__;
      if (supabaseModule?.createClient && url && anonKey && token) {
        try {
          const client = supabaseModule.createClient(url, anonKey) as {
            from: (name: string) => {
              upsert: (payload: unknown) => Promise<unknown>;
            };
          };
          await client.from('profiles').upsert({
            id: userProfile.id,
            email: userProfile.email,
            expo_push_token: token,
            push_token_updated_at: updatedAt,
          });
        } catch {
          // Keep local profile state even when backend sync is unavailable.
        }
      }
    } catch {
      setUserProfile((prev) => ({ ...prev, pushTokenUpdatedAt: new Date().toISOString() }));
    }
  }, [userProfile.email, userProfile.id]);

  useEffect(() => {
    captureExpoPushTokenOnLaunch();
  }, [captureExpoPushTokenOnLaunch]);

  const dispatchReminderNotifications = useCallback(async () => {
    const nowMs = Date.now();
    const nowIso = new Date(nowMs).toISOString();
    const petNameById = new Map(pets.map((pet) => [pet.id, pet.name]));
    const staged: NotificationHistoryEntry[] = [];
    const currentHistory = pruneNotificationHistory(notificationHistory);

    for (const reminder of reminders) {
      if (reminder.completed) continue;

      const dueDate = new Date(`${reminder.dueDate}T00:00:00`);
      if (isNaN(dueDate.getTime())) continue;

      const windowStart = addDays(dueDate, -Math.max(0, reminder.notifyDays));
      windowStart.setHours(NOTIFICATION_FIRE_HOUR, 0, 0, 0);
      if (nowMs < windowStart.getTime()) continue;

      const petName = petNameById.get(reminder.petId) || 'Unknown Pet';
      const title = `${reminder.title} reminder`;
      const message = `${petName}: ${reminder.title} is due on ${formatRecordDate(reminder.dueDate)}.`;

      const channels: Array<{ channel: NotificationChannel; enabled: boolean }> = [
        { channel: 'push', enabled: reminder.pushEnabled && notificationPreferences.push },
        { channel: 'email', enabled: reminder.emailEnabled && notificationPreferences.email },
      ];

      for (const { channel, enabled } of channels) {
        if (!enabled) continue;
        const mergedHistory = [...staged, ...currentHistory];
        if (wasSentInDedupeWindow(mergedHistory, reminder.id, channel, nowMs)) continue;

        const sent = channel === 'push'
          ? await sendPushNotificationNow(title, message)
          : await sendReminderEmailNow({
            reminderId: reminder.id,
            title,
            message,
            recipient: userProfile.email,
          });

        if (!sent) continue;

        staged.push({
          id: `nh_${reminder.id}_${channel}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          reminderId: reminder.id,
          channel,
          title,
          message,
          sentAt: nowIso,
          recipient: channel === 'push' ? (userProfile.expoPushToken || 'device') : userProfile.email,
          petName,
        });
      }
    }

    if (staged.length > 0 || currentHistory.length !== notificationHistory.length) {
      setNotificationHistory((prev) => pruneNotificationHistory([...staged, ...prev]));
    }
  }, [
    notificationHistory,
    notificationPreferences,
    pets,
    pruneNotificationHistory,
    reminders,
    sendPushNotificationNow,
    sendReminderEmailNow,
    userProfile.email,
    userProfile.expoPushToken,
    wasSentInDedupeWindow,
  ]);

  useEffect(() => {
    dispatchReminderNotifications();
    const intervalId = setInterval(() => {
      dispatchReminderNotifications().catch(() => undefined);
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [dispatchReminderNotifications]);

  const fetchRemindersJoined = useCallback(async (): Promise<ReminderWithPet[]> => {
    const fallback = reminders
      .map(r => ({ ...r, petName: pets.find(p => p.id === r.petId)?.name || 'Unknown Pet' }))
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

    const url = (globalThis as unknown as { __SUPABASE_URL__?: string }).__SUPABASE_URL__;
    const anonKey = (globalThis as unknown as { __SUPABASE_ANON_KEY__?: string }).__SUPABASE_ANON_KEY__;
    if (!supabaseModule?.createClient || !url || !anonKey) {
      return fallback;
    }

    try {
      const client = supabaseModule.createClient(url, anonKey) as {
        from: (name: string) => {
          select: (columns: string) => {
            order: (column: string, options?: { ascending?: boolean }) => Promise<{ data?: unknown[]; error?: { message?: string } }>;
          };
        };
      };

      const response = await client
        .from('reminders')
        .select('id,pet_id,type,title,due_date,recurrence,custom_weeks,notify_days,push_enabled,email_enabled,completed,completed_at,created_at,pets(name)')
        .order('due_date', { ascending: true });

      if (!response?.data || response.error) {
        return fallback;
      }

      const mapped = response.data.map((row: unknown) => {
        const r = row as {
          id: string;
          pet_id: string;
          type: ReminderType;
          title: string;
          due_date: string;
          recurrence: ReminderRecurrence;
          custom_weeks?: number;
          notify_days?: number;
          push_enabled?: boolean;
          email_enabled?: boolean;
          completed?: boolean;
          completed_at?: string;
          created_at: string;
          pets?: { name?: string } | Array<{ name?: string }>;
        };

        const petObj = Array.isArray(r.pets) ? r.pets[0] : r.pets;
        return {
          id: r.id,
          petId: r.pet_id,
          type: r.type,
          title: r.title,
          dueDate: r.due_date,
          recurrence: r.recurrence,
          customWeeks: r.custom_weeks,
          notifyDays: r.notify_days ?? 3,
          pushEnabled: r.push_enabled ?? true,
          emailEnabled: r.email_enabled ?? true,
          completed: !!r.completed,
          completedAt: r.completed_at,
          createdAt: r.created_at,
          petName: petObj?.name || pets.find(p => p.id === r.pet_id)?.name || 'Unknown Pet',
        } satisfies ReminderWithPet;
      });

      const localCache = mapped.map(({ petName, ...base }) => base);
      setReminders(localCache);
      return mapped;
    } catch {
      return fallback;
    }
  }, [pets, reminders]);

  const createReminder = useCallback(async (input: Omit<Reminder, 'id' | 'createdAt' | 'completed' | 'completedAt'>) => {
    const next: Reminder = {
      ...input,
      id: `rem_${Date.now()}`,
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: undefined,
    };

    setReminders(prev => [next, ...prev]);
    setRefreshRemindersToken(v => v + 1);
    setScreen('reminders');
  }, []);

  const markReminderComplete = useCallback((id: string) => {
    setReminders(prev => {
      const target = prev.find(r => r.id === id);
      if (!target) return prev;

      const recurringNext = getNextDueDate(target.dueDate, target.recurrence, target.customWeeks);
      if (recurringNext) {
        return prev.map(r => (r.id === id ? { ...r, dueDate: recurringNext, completed: false, completedAt: new Date().toISOString() } : r));
      }
      return prev.map(r => (r.id === id ? { ...r, completed: true, completedAt: new Date().toISOString() } : r));
    });
    setRefreshRemindersToken(v => v + 1);
  }, []);

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
  const saveRecord = (record: HealthRecord, mode: 'create' | 'edit') => {
    if (mode === 'edit') {
      setRecords(prev => prev.map(r => (r.id === record.id ? record : r)));
      setEditingRecordId(null);
      setSelectedRecordId(record.id);
      setScreen('record-detail');
      return;
    }

    setRecords(prev => [record, ...prev]);
    setEditingRecordId(null);
    setSelectedRecordId(record.id);

    if (SUGGESTION_INTERVALS[record.type]) {
      setSuggestedRecord(record);
      setScreen('suggested-reminders');
      return;
    }
    setScreen('records');
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    setSelectedRecordId(null);
    setScreen('records');
  };

  const addActivityLog = useCallback((entry: Omit<PetActivityLog, 'id' | 'createdAt'>) => {
    setActivityLogs((prev) => [
      {
        ...entry,
        id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const selectedRecord = records.find(r => r.id === selectedRecordId) || null;
  const editingRecord = records.find(r => r.id === editingRecordId) || null;
  const notificationsFeed = useMemo<AppNotification[]>(() => {
    const fromHistory = notificationHistory.map((item) => ({
      id: `hist_${item.id}`,
      kind: 'Reminder' as const,
      title: item.title,
      message: item.message,
      createdAt: item.sentAt,
    }));

    const fromRecords = records.slice(0, 6).map((record) => ({
      id: `rec_${record.id}`,
      kind: 'Health' as const,
      title: `${record.type} record added`,
      message: `${record.title} for ${pets.find((p) => p.id === record.petId)?.name || 'your pet'}.`,
      createdAt: record.createdAt,
    }));

    const fromReminders = reminders.slice(0, 6).map((reminder) => ({
      id: `rem_${reminder.id}`,
      kind: 'Reminder' as const,
      title: reminder.completed ? 'Reminder completed' : 'Reminder scheduled',
      message: `${reminder.title} for ${pets.find((p) => p.id === reminder.petId)?.name || 'your pet'} (${formatRecordDate(reminder.dueDate)}).`,
      createdAt: reminder.completedAt || reminder.createdAt,
    }));

    const systemGenerated: AppNotification[] = [
      {
        id: 'sys_token_sync',
        kind: 'System',
        title: 'Push token sync',
        message: userProfile.pushTokenUpdatedAt ? 'Device push token synchronized successfully.' : 'Push token sync pending. Open app with notification permission enabled.',
        createdAt: userProfile.pushTokenUpdatedAt || new Date().toISOString(),
      },
      {
        id: 'acct_welcome',
        kind: 'Account',
        title: 'Welcome to Pawos',
        message: 'Your account is ready. Configure reminders and health tracking from the dashboard.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'act_daily',
        kind: 'Activity',
        title: 'Daily activity summary',
        message: 'Today: 2.4 km walk and one meal logged.',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      },
    ];

    return [...fromHistory, ...fromRecords, ...fromReminders, ...systemGenerated]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 50);
  }, [notificationHistory, records, pets, reminders, userProfile.pushTokenUpdatedAt]);

  const unreadNotificationCount = useMemo(() => {
    const viewedAtMs = new Date(lastNotificationsViewedAt).getTime();
    return notificationsFeed.filter((item) => new Date(item.createdAt).getTime() > viewedAtMs).length;
  }, [notificationsFeed, lastNotificationsViewedAt]);

  const openNotifications = useCallback(() => {
    setLastNotificationsViewedAt(new Date().toISOString());
    setScreen('notification-history');
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F5" />
      <SafeAreaView style={s.screen}>
        {screen === 'splash' && <SplashScreen />}
        {screen === 'health' && <HealthScreen onNext={() => setScreen('activity')} onSkip={() => setScreen('login')} />}
        {screen === 'activity' && <ActivityScreen onBack={() => setScreen('health')} onNext={() => setScreen('login')} onSkip={() => setScreen('login')} />}
        {screen === 'login' && <LoginScreen onSend={() => setScreen('otp')} onCreate={() => setScreen('signup')} />}
        {screen === 'signup' && <SignupScreen onCreate={() => setScreen('otp')} onLogin={() => setScreen('login')} />}
        {screen === 'otp' && <OtpScreen onBack={() => setScreen('login')} onVerify={() => setScreen('home')} />}
        {screen === 'home' && (
          <HomeScreen
            onProfile={() => setScreen('profile')}
            onRecords={() => setScreen('records')}
            onReminders={() => setScreen('reminders')}
            onNotifications={openNotifications}
            onActivity={() => setScreen('activity-tracker')}
            notificationCount={unreadNotificationCount}
            overdueCount={overdueCount}
          />
        )}
        {screen === 'activity-tracker' && (
          <ActivityTrackerScreen
            pets={pets}
            logs={activityLogs}
            onBack={() => setScreen('home')}
            onHome={() => setScreen('home')}
            onRecords={() => setScreen('records')}
            onReminders={() => setScreen('reminders')}
            onSettings={() => setScreen('profile')}
            onAddLog={addActivityLog}
          />
        )}
        {screen === 'reminders' && (
          <RemindersScreen
            reminders={reminders}
            pets={pets}
            onHome={() => setScreen('home')}
            onHealth={() => setScreen('records')}
            onActivity={() => setScreen('activity-tracker')}
            onSettings={() => setScreen('profile')}
            onAddReminder={() => {
              setAddReminderPrefill(null);
              setScreen('add-reminder');
            }}
            onMarkComplete={markReminderComplete}
            onFetchReminders={fetchRemindersJoined}
            refreshToken={refreshRemindersToken}
            overdueCount={overdueCount}
          />
        )}
        {screen === 'add-reminder' && (
          <AddReminderScreen
            pets={pets}
            prefill={addReminderPrefill}
            onBack={() => {
              setAddReminderPrefill(null);
              setScreen('reminders');
            }}
            onSave={createReminder}
          />
        )}
        {screen === 'profile' && (
          <ProfileScreen
            onHome={() => setScreen('home')}
            onRecords={() => setScreen('records')}
            onReminders={() => setScreen('reminders')}
            onActivity={() => setScreen('activity-tracker')}
            onLogout={() => setScreen('login')}
            onEdit={() => setScreen('edit-profile')}
            onPrivacySecurity={() => setScreen('privacy-security')}
            pets={pets}
            overdueCount={overdueCount}
            notificationPreferences={notificationPreferences}
            onUpdateNotificationPreferences={setNotificationPreferences}
            onOpenNotificationHistory={openNotifications}
            userEmail={userProfile.email}
            pushTokenUpdatedAt={userProfile.pushTokenUpdatedAt}
            onOpenPet={(id) => { setSelectedPetId(id); setScreen('pet-profile'); }}
            onAddPet={() => setScreen('create-pet')}
          />
        )}
        {screen === 'notification-history' && (
          <NotificationHistoryScreen
            onBack={() => setScreen('profile')}
            items={notificationsFeed}
          />
        )}
        {screen === 'edit-profile' && <EditProfileScreen onBack={() => setScreen('profile')} />}
        {screen === 'privacy-security' && (
          <PrivacySecurityScreen
            onBack={() => setScreen('profile')}
            userEmail={userProfile.email}
            pets={pets}
          />
        )}
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
            onOpenManualAdd={(petId) => {
              setDraftPetId(petId);
              setDraftPrefill(null);
              setEditingRecordId(null);
              setScreen('add-record');
            }}
            onOpenOCR={(petId) => {
              setOcrPetId(petId);
              setScreen('ocr-scan');
            }}
            records={records}
            pets={pets}
            onSelectRecord={(id) => { setSelectedRecordId(id); setScreen('record-detail'); }}
            onShareRecord={(recordId, recordTitle) => {
              setShareTarget({ recordId, recordTitle });
              setScreen('share-record');
            }}
          />
        )}
        {screen === 'ocr-scan' && (
          <OCRScanScreen
            petId={ocrPetId || pets[0]?.id || ''}
            pets={pets}
            onBack={() => setScreen('records')}
            onSkipManual={(petId) => {
              setDraftPetId(petId);
              setDraftPrefill(null);
              setScreen('add-record');
            }}
            onExtracted={(result, imageUri, petId) => {
              setOcrResult(result);
              setOcrImageUri(imageUri);
              setOcrPetId(petId);
              setScreen('ocr-review');
            }}
          />
        )}
        {screen === 'ocr-review' && ocrResult && (
          <OCRReviewScreen
            ocrResult={ocrResult}
            petId={ocrPetId || pets[0]?.id || ''}
            scannedImageUri={ocrImageUri}
            onRetake={() => setScreen('ocr-scan')}
            onEditManually={(prefill, petId) => {
              setDraftPrefill(prefill);
              setDraftPetId(petId);
              setScreen('add-record');
            }}
            onConfirm={(record) => saveRecord(record, 'create')}
          />
        )}
        {screen === 'add-record' && (
          <AddRecordScreen
            onBack={() => { setEditingRecordId(null); setScreen('records'); }}
            pets={pets}
            onSave={saveRecord}
            editing={editingRecord}
            prefill={draftPrefill}
            initialPetId={draftPetId}
          />
        )}
        {screen === 'record-detail' && selectedRecord && (
          <RecordDetailScreen
            record={selectedRecord}
            pet={pets.find(p => p.id === selectedRecord.petId) || null}
            onBack={() => setScreen('records')}
            onEdit={() => {
              setEditingRecordId(selectedRecord.id);
              setDraftPrefill(null);
              setDraftPetId(null);
              setScreen('add-record');
            }}
            onShare={() => {
              setShareTarget({ recordId: selectedRecord.id, recordTitle: selectedRecord.title });
              setScreen('share-record');
            }}
            onCreateReminder={() => {
              setAddReminderPrefill({
                petId: selectedRecord.petId,
                type: getReminderTypeFromRecord(selectedRecord.type),
                title: selectedRecord.title,
              });
              setScreen('add-reminder');
            }}
            onDelete={() => deleteRecord(selectedRecord.id)}
          />
        )}
        {screen === 'suggested-reminders' && suggestedRecord && (
          <SuggestedRemindersScreen
            savedRecord={suggestedRecord}
            petName={pets.find(p => p.id === suggestedRecord.petId)?.name || 'Unknown'}
            onClose={() => {
              setSuggestedRecord(null);
              setScreen('home');
            }}
            onAccept={() => {
              createReminder({
                petId: suggestedRecord.petId,
                type: getReminderTypeFromRecord(suggestedRecord.type),
                title: `${suggestedRecord.title} follow-up`,
                dueDate: toIsoDate(addMonths(new Date(suggestedRecord.recordDate), SUGGESTION_INTERVALS[suggestedRecord.type]?.months || 1)),
                recurrence: (SUGGESTION_INTERVALS[suggestedRecord.type]?.recurrence || 'Monthly') as ReminderRecurrence,
                notifyDays: 7,
                pushEnabled: true,
                emailEnabled: true,
                customWeeks: undefined,
              });
              setSuggestedRecord(null);
              Alert.alert('Reminder added', 'Reminder added successfully.');
            }}
          />
        )}
        {screen === 'share-record' && shareTarget && (
          <ShareRecordScreen
            recordId={shareTarget.recordId}
            recordTitle={shareTarget.recordTitle}
            onBack={() => setScreen(selectedRecord ? 'record-detail' : 'records')}
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
      <View style={s.onbFoot}><View style={s.onbIndicatorRow}><View style={s.indActiveDark} /><View style={s.indDotDark} /><View style={s.indDotDark} /></View><TouchableOpacity onPress={onNext}><View style={s.nextRingDark}><View style={s.nextCoreDark}><ForwardIcon width={20} height={20} fill="#fff" /></View></View></TouchableOpacity></View>
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
      <View style={s.onbFoot}><View style={s.onbIndicatorRow}><View style={s.indDotLight} /><View style={s.indActiveLight} /><View style={s.indDotLight} /></View><TouchableOpacity onPress={onNext}><View style={s.nextRingLight}><View style={s.nextCoreLight}><ForwardIcon width={20} height={20} fill="#fff" /></View></View></TouchableOpacity></View>
    </View>
  );
}

function LoginScreen({ onSend, onCreate }: { onSend: () => void; onCreate: () => void }) {
  return (
    <ScrollView contentContainerStyle={s.authWrap}>
      <View style={s.authTop}><Image source={ASSET.loginTop} style={s.topDecor} /><View style={s.authLogo}><LogoIcon width={96} height={96} /></View><Text style={s.authTitle}>Welcome back</Text><Text style={s.authSub}>Sign in to your account and keep track{`\n`}of your pet&apos;s happiness.</Text></View>
      <View style={s.authCard}>
        <TouchableOpacity style={s.googleBtn}><GoogleIcon width={24} height={24} /><Text style={s.googleTxt}>Continue with Google</Text></TouchableOpacity>
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
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <ScrollView contentContainerStyle={s.authWrap}>
      <View style={s.authCard}>
        <View style={s.authLogoSm}><LogoIcon width={74} height={74} /></View>
        <Text style={s.authTitle}>Join the Pack</Text>
        <Text style={s.authSub}>The best care for your furry{`\n`}companions starts here.</Text>

        <LabeledInput label="Full Name" placeholder="Enter your full name" iconComponent={FullNameIcon} />
        <LabeledInput label="Email Address" placeholder="example@email.com" iconComponent={EmailAddressIcon} />
        <LabeledInput label="Password" placeholder="Create a strong password" iconComponent={PasswordIcon} rightIconComponent={PasswordToggleEyeIcon} secure />

        <TouchableOpacity style={s.termsRow} onPress={() => setAcceptedTerms((prev) => !prev)} activeOpacity={0.85}>
          <View style={[s.checkbox, acceptedTerms && s.checkboxChecked]}>
            {acceptedTerms ? <TickIcon width={10} height={8} /> : null}
          </View>
          <Text style={s.terms}>I agree to the <Text style={s.termsAccent}>Terms of Service</Text> and{`\n`}<Text style={s.termsAccent}>Privacy Policy</Text>.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.primary, !acceptedTerms && s.primaryDisabled]}
          onPress={onCreate}
          disabled={!acceptedTerms}
        >
          <Text style={s.createTxt}>Create Account</Text>
        </TouchableOpacity>

        <View style={s.divider}><View style={s.divLineStrong} /><Text style={s.divTxtMuted}>OR SIGN UP WITH</Text><View style={s.divLineStrong} /></View>

        <View style={s.socialRow}>
          <TouchableOpacity style={s.socialBtn}><GoogleIcon width={20} height={20} /><Text style={s.socialTxt}>Google</Text></TouchableOpacity>
          <TouchableOpacity style={s.socialBtn}><IosIcon width={20} height={20} /><Text style={s.socialTxt}>iOS</Text></TouchableOpacity>
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

function HomeScreen({
  onProfile,
  onRecords,
  onReminders,
  onNotifications,
  onActivity,
  notificationCount,
  overdueCount,
}: {
  onProfile: () => void;
  onRecords: () => void;
  onReminders: () => void;
  onNotifications: () => void;
  onActivity: () => void;
  notificationCount: number;
  overdueCount: number;
}) {
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
        <TouchableOpacity style={s.homeBellBtn} onPress={onNotifications}>
          <BellsIcon width={19} height={24} fill="#944A00" />
          {notificationCount > 0 ? (
            <View style={s.homeBellBadge}>
              <Text style={s.homeBellBadgeTxt}>{notificationCount > 99 ? '99+' : notificationCount}</Text>
            </View>
          ) : null}
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
              <TickIcon width={10} height={8} />
            </View>
          </View>
          <View style={s.homePetBody}>
            <View style={s.row}><Text style={s.homePetName}>Cooper</Text><Text style={s.homeActive}>ACTIVE</Text></View>
            <View style={s.homeHealthPill}><ExcellentHealthIcon width={15} height={14} /><Text style={s.homeHealthTxt}>Excellent Health</Text></View>
          </View>
        </View>

        <View style={s.homeActions}>
          <HomeAction iconName="feed" label="Feed" bgColor="#F8E4CF" iconColor="#9F6516" iconComponent={FeedIcon} onPress={onActivity} />
          <HomeAction iconName="vet" label="Vet" bgColor="#63E491" iconColor="#0B8D4E" iconComponent={VetIcon} onPress={onActivity} />
          <HomeAction iconName="walk" label="Walk" bgColor="#E6E0FB" iconColor="#6A53D7" iconComponent={WalkIcon} onPress={onActivity} />
          <HomeAction iconName="log" label="Log" bgColor="#EEEEEE" iconColor="#4E4E4E" iconComponent={LogIcon} onPress={onActivity} />
        </View>

        <View style={s.homeSectionHead}>
          <Text style={s.homeSectionTitle}>Current Vitals</Text>
          <View style={s.homeVitalsIconBtn}><CurrentVitalsIcon width={18} height={18} /></View>
        </View>
        <View style={s.homeVitalsRow}>
          <View style={s.homeVitalCard}>
            <View style={s.homeVitalHead}>
              <Text style={s.homeVitalLabel}>Weight</Text>
              <View style={s.homeTrendPill}><Text style={s.homeTrendGlyph}>↘</Text></View>
            </View>
            <Text style={s.homeVitalValue}>28.4 <Text style={s.homeVitalUnit}>kg</Text></Text>
            <View style={s.homeBarBg}><View style={s.homeBarFill} /></View>
            <Text style={s.homeMuted}>Normal Range</Text>
          </View>
          <View style={[s.homeVitalCard, s.homeVitalCardCenter]}>
            <Text style={s.homeVitalLabel}>Activity</Text>
            <View style={s.homeVitalCenter}>
              <Text style={s.homeVitalValue}>84%</Text>
              <Text style={s.homeVitalAccent}>HIGH</Text>
            </View>
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
          <TouchableOpacity onPress={onReminders} hitSlop={8}>
            <Text style={s.homeViewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={s.homeCareList}>
          <View style={s.homeCareCard}>
            <View style={s.homeDays}>
              <Text style={s.homeDaysNum}>5</Text>
              <Text style={s.homeDaysLbl}>DAYS</Text>
            </View>
            <View style={s.homeCareBody}>
              <Text style={s.homeCareTitle}>Rabies Booster</Text>
              <Text style={s.homeCareSub}>Urgent - Due Oct 12</Text>
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
                    <Text style={s.homeRecentSubAlt}>08:30 AM - 45 mins</Text>
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
                    <Text style={s.homeRecentSubAlt}>07:15 AM - 250g Kibble</Text>
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
          <View style={s.navIconWrap}><HomeNavIcon color="#E67E22" fill="#E67E22" stroke="#E67E22" /></View>
          <Text style={s.navActiveTxt}>Home</Text>
        </View>
        <TouchableOpacity style={s.navItem} onPress={onRecords}>
          <View style={s.navIconWrap}><HealthNavIcon color="#644B3C" /></View>
          <Text style={s.navTxt}>Health</Text>
        </TouchableOpacity>
        <NavItem label="Activity" iconComponent={ActivityNavIcon} onPress={onActivity} />
        <NavItem label="Reminders" iconComponent={RemindersNavIcon} onPress={onReminders} badgeCount={overdueCount} />
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
  onPress,
}: {
  iconName: string;
  label: string;
  bgColor: string;
  iconColor: string;
  iconComponent?: React.ComponentType<SvgProps>;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={s.homeAction} onPress={onPress} activeOpacity={0.85}>
      <View style={[s.homeActionIconWrap, { backgroundColor: bgColor }]}>
        {IconComponent ? <IconIconReplacement Comp={IconComponent} size={20} color={iconColor} /> : <AppIcon name={iconName} size={20} color={iconColor} />}
      </View>
      <Text style={s.homeActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function IconIconReplacement({ Comp, size, color }: { Comp: React.ComponentType<SvgProps>; size: number; color?: string }) {
  return <Comp width={size} height={size} fill={color} stroke={color} />;
}

function ProfileScreen({
  onHome,
  onRecords,
  onReminders,
  onActivity,
  onLogout,
  onEdit,
  onPrivacySecurity,
  pets,
  overdueCount,
  notificationPreferences,
  onUpdateNotificationPreferences,
  onOpenNotificationHistory,
  userEmail,
  pushTokenUpdatedAt,
  onOpenPet,
  onAddPet,
}: {
  onHome: () => void;
  onRecords: () => void;
  onReminders: () => void;
  onActivity: () => void;
  onLogout: () => void;
  onEdit: () => void;
  onPrivacySecurity: () => void;
  pets: Pet[];
  overdueCount: number;
  notificationPreferences: NotificationPreferences;
  onUpdateNotificationPreferences: React.Dispatch<React.SetStateAction<NotificationPreferences>>;
  onOpenNotificationHistory: () => void;
  userEmail: string;
  pushTokenUpdatedAt?: string;
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
                <Image source={getPetImageSource(p)} style={s.petImg} />
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
          <Setting
            iconName="bell"
            title="Notification History"
            iconComponent={BellsIcon}
            onPress={onOpenNotificationHistory}
          />
          <Setting iconName="shield" title="Privacy & Security" iconComponent={ShieldIcon} onPress={onPrivacySecurity} />
          <Setting iconName="desktop" title="Subscription Plan" trailing="Pro" iconComponent={SubscriptionPlanIcon} />
          <Setting iconName="question-circle" title="Help & Support" last iconComponent={HelpIcon} />
        </View>

        <Text style={s.sectionTitle}>Notifications</Text>
        <View style={s.settings}>
          <View style={[s.setting, s.settingBorder]}>
            <View style={s.settingIcon}><PushNotificationIcon width={16} height={16} /></View>
            <View style={s.settingBody}>
              <Text style={s.settingTitle}>Push Channel</Text>
              <Text style={s.settingSub}>Enable push reminders on this device</Text>
            </View>
            <Switch
              value={notificationPreferences.push}
              onValueChange={(value) => onUpdateNotificationPreferences((prev) => ({ ...prev, push: value }))}
            />
          </View>
          <View style={[s.setting, s.settingBorder]}>
            <View style={s.settingIcon}><EmailAddressIcon width={16} height={16} /></View>
            <View style={s.settingBody}>
              <Text style={s.settingTitle}>Email Channel</Text>
              <Text style={s.settingSub}>Send reminder emails to {userEmail}</Text>
            </View>
            <Switch
              value={notificationPreferences.email}
              onValueChange={(value) => onUpdateNotificationPreferences((prev) => ({ ...prev, email: value }))}
            />
          </View>
          <View style={s.setting}>
            <View style={s.settingIcon}><NotificationsIcon width={16} height={16} /></View>
            <View style={s.settingBody}>
              <Text style={s.settingTitle}>Push Token Sync</Text>
              <Text style={s.settingSub}>
                {pushTokenUpdatedAt ? `Updated ${formatRecordDate(pushTokenUpdatedAt.slice(0, 10))}` : 'Pending token capture'}
              </Text>
            </View>
          </View>
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
        <TouchableOpacity style={s.navItem} onPress={onRecords}>
          <View style={s.navIconWrap}><HealthNavIcon color="#644B3C" /></View>
          <Text style={s.navTxt}>Health</Text>
        </TouchableOpacity>
        <NavItem label="Activity" iconComponent={ActivityNavIcon} onPress={onActivity} />
        <NavItem label="Reminders" iconComponent={RemindersNavIcon} onPress={onReminders} badgeCount={overdueCount} />
        <View style={s.navActive}>
          <View style={s.navIconWrap}><SettingsNavIcon color="#E67E22" fill="#E67E22" stroke="#E67E22" /></View>
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
  onPress,
  iconComponent: IconComponent,
  sub,
}: {
  iconName: string;
  title: string;
  trailing?: string;
  last?: boolean;
  onPress?: () => void;
  iconComponent?: React.ComponentType<SvgProps>;
  sub?: string;
}) {
  return (
    <TouchableOpacity style={[s.setting, !last && s.settingBorder]} onPress={onPress} disabled={!onPress}>
      {IconComponent ? <View style={s.settingIcon}><IconComponent width={16} height={16} /></View> : <AppIcon name={iconName} size={16} color="#644B3C" />}
      <View style={[s.settingLabelWrap, sub && s.settingBody]}>
        <Text style={s.settingTitle}>{title}</Text>
        {sub ? <Text style={s.settingSub}>{sub}</Text> : null}
      </View>
      <View style={[s.row, s.settingRight]}>
        {trailing ? <Text style={s.trailing}>{trailing}</Text> : null}
        <RightArrowIcon width={8} height={12} />
      </View>
    </TouchableOpacity>
  );
}

// ──────────────────────────────────────────────
// Privacy & Security Page Icons (inline SVG)
// ──────────────────────────────────────────────
function ClockIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={10} stroke="#644B3C" strokeWidth={2} />
      <Path d="M12 6v6l4 2" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function DevicesIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect x={4} y={5} width={12} height={14} rx={2} stroke="#644B3C" strokeWidth={2} />
      <Path d="M18 9h2a1 1 0 011 1v8a1 1 0 01-1 1h-2" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function FingerprintIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M7 13a5 5 0 0110 0c0 3-2 5-2 7" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
      <Path d="M10 17a3 3 0 004 0" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
      <Path d="M12 4a9 9 0 019 9c0 2-.5 4-1.5 6" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function TimerIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={13} r={8} stroke="#644B3C" strokeWidth={2} />
      <Path d="M12 9v4l3 2" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
      <Path d="M9 2h6" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function PinIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect x={5} y={11} width={14} height={10} rx={2} stroke="#644B3C" strokeWidth={2} />
      <Circle cx={12} cy={16} r={1.5} fill="#644B3C" />
      <Path d="M8 11V7a4 4 0 118 0v4" stroke="#644B3C" strokeWidth={2} />
    </Svg>
  );
}
function AnalyticsIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M3 20h18M6 16V8m6 8V4m6 12v-6" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function AdIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect x={3} y={3} width={18} height={18} rx={3} stroke="#644B3C" strokeWidth={2} />
      <Path d="M3 9h18M9 21V9" stroke="#644B3C" strokeWidth={2} />
    </Svg>
  );
}
function VetShareIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
      <Path d="M22 4L12 14.01l-3-3" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function ActivityDataIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function PetShareIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
      <Circle cx={9} cy={7} r={4} stroke="#644B3C" strokeWidth={2} />
      <Path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function ExportIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function ConnectedAppsIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
      <Path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function CacheIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Polyline points="3 6 5 6 21 6" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
      <Path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#644B3C" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// ──────────────────────────────────────────────
// Privacy & Security Screen
// ──────────────────────────────────────────────
function PrivacySecurityScreen({
  onBack,
  userEmail,
  pets,
}: {
  onBack: () => void;
  userEmail: string;
  pets: Pet[];
}) {
  const [biometricLock, setBiometricLock] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const [shareWithVet, setShareWithVet] = useState(true);
  const [exerciseData, setExerciseData] = useState(true);

  return (
    <View style={s.profileWrap}>
      <View style={s.profileTop}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.profileTitle}>Privacy & Security</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={s.privacyContent}>
        {/* ── Account Security ── */}
        <Text style={s.sectionTitle}>Account Security</Text>
        <View style={s.settings}>
          <Setting
            iconName="lock"
            title="Change Password"
            iconComponent={PasswordIcon}
            sub="Update your password regularly"
          />
          <View style={[s.setting, s.settingBorder]}>
            <View style={s.settingIcon}><ShieldIcon width={16} height={16} /></View>
            <View style={s.settingBody}>
              <Text style={s.settingTitle}>Two-Factor Authentication</Text>
              <Text style={s.settingSub}>Add an extra layer of protection via SMS code</Text>
            </View>
            <Switch value={twoFactor} onValueChange={setTwoFactor} />
          </View>
          <Setting
            iconName="clock"
            title="Login Activity"
            trailing="2 hours ago"
            iconComponent={ClockIcon}
            sub="Last sign-in from Samsung A14"
          />
          <Setting
            iconName="devices"
            title="Active Sessions"
            trailing="2 devices"
            last
            iconComponent={DevicesIcon}
          />
        </View>

        {/* ── App Lock (Biometric) ── */}
        <Text style={s.sectionTitle}>App Lock</Text>
        <View style={s.settings}>
          <View style={[s.setting, s.settingBorder]}>
            <View style={s.settingIcon}><FingerprintIcon width={16} height={16} /></View>
            <View style={s.settingBody}>
              <Text style={s.settingTitle}>Biometric Lock</Text>
              <Text style={s.settingSub}>Require Face / Fingerprint to open Pawos</Text>
            </View>
            <Switch value={biometricLock} onValueChange={setBiometricLock} />
          </View>
          <Setting
            iconName="timer"
            title="Auto-Lock After"
            trailing="Immediately"
            iconComponent={TimerIcon}
            sub="Lock when app goes to background"
          />
          <Setting
            iconName="keypad"
            title="PIN Code"
            trailing="Not set"
            last
            iconComponent={PinIcon}
            sub="4-digit backup unlock method"
          />
        </View>

        {/* ── Data Privacy ── */}
        <Text style={s.sectionTitle}>Data Privacy</Text>
        <View style={s.settings}>
          <View style={[s.setting, s.settingBorder]}>
            <View style={s.settingIcon}><AnalyticsIcon width={16} height={16} /></View>
            <View style={s.settingBody}>
              <Text style={s.settingTitle}>Analytics & Diagnostics</Text>
              <Text style={s.settingSub}>Help improve Pawos by sharing anonymous usage data</Text>
            </View>
            <Switch value={analytics} onValueChange={setAnalytics} />
          </View>
          <View style={[s.setting, s.settingBorder]}>
            <View style={s.settingIcon}><AdIcon width={16} height={16} /></View>
            <View style={s.settingBody}>
              <Text style={s.settingTitle}>Personalized Ads</Text>
              <Text style={s.settingSub}>Allow partners to show ads based on your activity</Text>
            </View>
            <Switch value={personalizedAds} onValueChange={setPersonalizedAds} />
          </View>
          <View style={[s.setting, s.settingBorder]}>
            <View style={s.settingIcon}><VetShareIcon width={16} height={16} /></View>
            <View style={s.settingBody}>
              <Text style={s.settingTitle}>Share Health Records with Vet</Text>
              <Text style={s.settingSub}>Let linked veterinarians view your pet records</Text>
            </View>
            <Switch value={shareWithVet} onValueChange={setShareWithVet} />
          </View>
          <View style={[s.setting]}>
            <View style={s.settingIcon}><ActivityDataIcon width={16} height={16} /></View>
            <View style={s.settingBody}>
              <Text style={s.settingTitle}>Exercise Data Collection</Text>
              <Text style={s.settingSub}>Required for activity tracking & health insights</Text>
            </View>
            <Switch value={exerciseData} onValueChange={setExerciseData} />
          </View>
        </View>

        {/* ── Pet Data Sharing ── */}
        <Text style={s.sectionTitle}>Pet Data Sharing</Text>
        <View style={s.settings}>
          {pets.map((pet, idx) => (
            <View key={pet.id} style={[s.setting, idx < pets.length - 1 && s.settingBorder]}>
              <View style={s.settingIcon}><PetShareIcon width={16} height={16} /></View>
              <View style={s.settingBody}>
                <Text style={s.settingTitle}>{pet.name}'s Records</Text>
                <Text style={s.settingSub}>Share {pet.name}'s data with linked vets</Text>
              </View>
              <Switch value={shareWithVet} onValueChange={(v) => setShareWithVet(v)} />
            </View>
          ))}
          <Setting
            iconName="download"
            title="Export My Data"
            iconComponent={ExportIcon}
            onPress={() => {}}
            sub="Download a copy of all pet records (GDPR)"
            last
          />
        </View>

        {/* ── Permissions & Control ── */}
        <Text style={s.sectionTitle}>Permissions & Control</Text>
        <View style={s.settings}>
          <Setting
            iconName="bell"
            title="Manage Notifications"
            iconComponent={BellsIcon}
            sub="System notification permissions"
          />
          <Setting
            iconName="link"
            title="Connected Apps"
            trailing="Google, Apple Health"
            iconComponent={ConnectedAppsIcon}
            sub="Third-party services with access to your data"
          />
          <Setting
            iconName="trash"
            title="Clear Cache"
            trailing="12.4 MB"
            last
            iconComponent={CacheIcon}
            sub="Free up local storage without deleting data"
          />
        </View>

        {/* ── Danger Zone ── */}
        <TouchableOpacity style={s.editDeleteBtn} onPress={() => Alert.alert('Delete Account', 'This action cannot be undone. All your pets, records, and reminders will be permanently deleted.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => {} }])}>
          <DeleteAccountIcon width={16} height={16} />
          <Text style={s.editDeleteTxt}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.logout} onPress={onBack}>
          <LogoutIcon width={18} height={18} />
          <Text style={s.logoutTxt}>Log Out of All Devices</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={s.privacyFooter}>
          Pawos is committed to protecting your privacy. Your data is encrypted in transit and at rest.
          {'\n'}Last updated: July 2026 · View Full Privacy Policy
        </Text>
      </ScrollView>
    </View>
  );
}

function NotificationHistoryScreen({
  onBack,
  items,
}: {
  onBack: () => void;
  items: AppNotification[];
}) {
  const [activeKind, setActiveKind] = useState<'All' | NotificationKind>('All');

  const recent = useMemo(() => {
    const cutoff = Date.now() - NOTIFICATION_HISTORY_DAYS * 24 * 60 * 60 * 1000;
    return items
      .filter((item) => new Date(item.createdAt).getTime() >= cutoff)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [items]);

  const visibleItems = useMemo(() => {
    if (activeKind === 'All') {
      return recent;
    }
    return recent.filter((item) => item.kind === activeKind);
  }, [recent, activeKind]);

  const filterKinds: Array<'All' | NotificationKind> = ['All', 'Reminder', 'Health', 'Activity', 'System', 'Account'];

  return (
    <View style={s.profileWrap}>
      <View style={s.profileTop}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.profileTitle}>Notifications</Text>
        <View style={s.blank} />
      </View>

      <ScrollView contentContainerStyle={s.notifHistoryContent}>
        <Text style={s.notifHistoryIntro}>All notification types from the last 30 days.</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.notifFilterRow}>
          {filterKinds.map((kind) => {
            const active = activeKind === kind;
            return (
              <TouchableOpacity
                key={kind}
                style={[s.notifFilterChip, active && s.notifFilterChipActive]}
                onPress={() => setActiveKind(kind)}
              >
                <Text style={[s.notifFilterTxt, active && s.notifFilterTxtActive]}>{kind}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {visibleItems.length === 0 ? (
          <View style={s.notifHistoryEmpty}>
            <Text style={s.notifHistoryEmptyTitle}>No notifications found</Text>
            <Text style={s.notifHistoryEmptySub}>Try a different filter or check back when new alerts are generated.</Text>
          </View>
        ) : (
          visibleItems.map((item) => (
            <View key={item.id} style={s.notifHistoryCard}>
              <View style={s.notifHistoryHead}>
                <Text style={s.notifHistoryChannel}>{item.kind.toUpperCase()}</Text>
                <Text style={s.notifHistoryDate}>{new Date(item.createdAt).toLocaleString()}</Text>
              </View>
              <Text style={s.notifHistoryTitle}>{item.title}</Text>
              <Text style={s.notifHistoryMessage}>{item.message}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

function ActivityTrackerScreen({
  pets,
  logs,
  onBack,
  onHome,
  onRecords,
  onReminders,
  onSettings,
  onAddLog,
}: {
  pets: Pet[];
  logs: PetActivityLog[];
  onBack: () => void;
  onHome: () => void;
  onRecords: () => void;
  onReminders: () => void;
  onSettings: () => void;
  onAddLog: (entry: Omit<PetActivityLog, 'id' | 'createdAt'>) => void;
}) {
  const [activePetId, setActivePetId] = useState<string>(pets[0]?.id || '');
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [selectedType, setSelectedType] = useState<ActivityType>('Walk');
  const [customDuration, setCustomDuration] = useState('');
  const [customDistance, setCustomDistance] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const activityTypes: ActivityType[] = ['Walk', 'Feed', 'Play', 'Medication', 'Vet Visit'];

  useEffect(() => {
    if (!activePetId && pets[0]?.id) {
      setActivePetId(pets[0].id);
    }
  }, [activePetId, pets]);

  const activePet = pets.find((pet) => pet.id === activePetId) || pets[0] || null;

  const petLogs = useMemo(() => {
    return logs
      .filter((log) => !activePet || log.petId === activePet.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [logs, activePet]);

  const todayStart = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  }, []);

  const todayLogs = petLogs.filter((log) => new Date(log.createdAt).getTime() >= todayStart);
  const todayWalkDistance = todayLogs.reduce((sum, log) => sum + (log.distanceKm || 0), 0);
  const todayMinutes = todayLogs.reduce((sum, log) => sum + (log.durationMinutes || 0), 0);

  const addQuickLog = (type: ActivityType) => {
    if (!activePet) return;
    if (type === 'Walk') {
      onAddLog({
        petId: activePet.id,
        type,
        title: 'Quick walk log',
        durationMinutes: 30,
        distanceKm: 1.6,
        notes: 'Logged from Activity page.',
      });
      return;
    }
    if (type === 'Feed') {
      onAddLog({
        petId: activePet.id,
        type,
        title: 'Meal logged',
        notes: 'Standard meal portion completed.',
      });
      return;
    }
    onAddLog({
      petId: activePet.id,
      type,
      title: `${type} logged`,
      durationMinutes: 20,
      notes: 'Quick activity log entry.',
    });
  };

  const openTypePicker = () => {
    setSelectedType('Walk');
    setCustomDuration('30');
    setCustomDistance('1.6');
    setCustomNotes('');
    setShowTypePicker(true);
  };

  const durationRequired = selectedType !== 'Feed';
  const durationTrimmed = customDuration.trim();
  const distanceTrimmed = customDistance.trim();

  const durationNumber = Number(durationTrimmed);
  const distanceNumber = Number(distanceTrimmed);

  const durationError = durationRequired
    ? (!durationTrimmed ? 'Duration is required.' : (!Number.isFinite(durationNumber) || durationNumber <= 0 ? 'Duration must be a positive number.' : ''))
    : (durationTrimmed && (!Number.isFinite(durationNumber) || durationNumber <= 0) ? 'Duration must be a positive number.' : '');

  const distanceError = distanceTrimmed && (!Number.isFinite(distanceNumber) || distanceNumber <= 0)
    ? 'Distance must be a positive number.'
    : '';

  const canSaveSelectedType = !durationError && !distanceError;

  const addSelectedTypeLog = () => {
    if (!activePet) return;
    if (!canSaveSelectedType) return;
    const parsedDuration = Number(customDuration);
    const parsedDistance = Number(customDistance);
    const durationMinutes = Number.isFinite(parsedDuration) && parsedDuration > 0 ? parsedDuration : undefined;
    const distanceKm = Number.isFinite(parsedDistance) && parsedDistance > 0 ? parsedDistance : undefined;

    onAddLog({
      petId: activePet.id,
      type: selectedType,
      title: `${selectedType} logged`,
      durationMinutes,
      distanceKm,
      notes: customNotes.trim() || 'Added from activity type picker.',
    });

    setShowTypePicker(false);
  };

  return (
    <View style={s.profileWrap}>
      <View style={s.profileTop}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.profileTitle}>Pet Activity</Text>
        <View style={s.blank} />
      </View>

      <ScrollView contentContainerStyle={s.activityContent}>
        <Text style={s.activityIntro}>Track walks, meals and play sessions for each pet.</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.activityPetRow}>
          {pets.map((pet) => {
            const active = pet.id === activePet?.id;
            return (
              <TouchableOpacity
                key={pet.id}
                style={[s.activityPetChip, active && s.activityPetChipActive]}
                onPress={() => setActivePetId(pet.id)}
              >
                <Text style={[s.activityPetChipTxt, active && s.activityPetChipTxtActive]}>{pet.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={s.activityStatsRow}>
          <View style={s.activityStatCard}>
            <Text style={s.activityStatLabel}>Today Logs</Text>
            <Text style={s.activityStatValue}>{todayLogs.length}</Text>
          </View>
          <View style={s.activityStatCard}>
            <Text style={s.activityStatLabel}>Distance</Text>
            <Text style={s.activityStatValue}>{todayWalkDistance.toFixed(1)} km</Text>
          </View>
          <View style={s.activityStatCard}>
            <Text style={s.activityStatLabel}>Active Time</Text>
            <Text style={s.activityStatValue}>{todayMinutes} min</Text>
          </View>
        </View>

        <Text style={s.activitySectionTitle}>Quick Add</Text>
        <View style={s.activityQuickRow}>
          <TouchableOpacity style={s.activityQuickBtn} onPress={() => addQuickLog('Walk')}><Text style={s.activityQuickBtnTxt}>+ Walk</Text></TouchableOpacity>
          <TouchableOpacity style={s.activityQuickBtn} onPress={() => addQuickLog('Feed')}><Text style={s.activityQuickBtnTxt}>+ Feed</Text></TouchableOpacity>
          <TouchableOpacity style={s.activityQuickBtn} onPress={() => addQuickLog('Play')}><Text style={s.activityQuickBtnTxt}>+ Play</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={s.activityTypePickerBtn} onPress={openTypePicker}>
          <Text style={s.activityTypePickerBtnTxt}>+ Add Activity Type</Text>
        </TouchableOpacity>

        <Text style={s.activitySectionTitle}>Recent Activity</Text>
        {petLogs.length === 0 ? (
          <View style={s.activityEmpty}><Text style={s.activityEmptyTxt}>No activities logged yet.</Text></View>
        ) : (
          petLogs.slice(0, 20).map((log) => (
            <View key={log.id} style={s.activityCard}>
              <View style={s.activityCardHead}>
                <Text style={s.activityTypePill}>{log.type.toUpperCase()}</Text>
                <Text style={s.activityDate}>{new Date(log.createdAt).toLocaleString()}</Text>
              </View>
              <Text style={s.activityTitle}>{log.title}</Text>
              <Text style={s.activityMeta}>
                {`${log.durationMinutes ? `${log.durationMinutes} min` : 'Duration n/a'}${log.distanceKm ? ` • ${log.distanceKm.toFixed(1)} km` : ''}`}
              </Text>
              {log.notes ? <Text style={s.activityNotes}>{log.notes}</Text> : null}
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={showTypePicker} transparent animationType="fade" onRequestClose={() => setShowTypePicker(false)}>
        <TouchableOpacity style={s.activityTypeOverlay} activeOpacity={1} onPress={() => setShowTypePicker(false)}>
          <TouchableOpacity activeOpacity={1} style={s.activityTypeModal} onPress={() => undefined}>
            <Text style={s.activityTypeTitle}>Select Activity Type</Text>
            <Text style={s.activityTypeSub}>Choose the type to add a new activity log.</Text>
            <View style={s.activityTypeChipWrap}>
              {activityTypes.map((type) => {
                const active = selectedType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[s.activityTypeChip, active && s.activityTypeChipActive]}
                    onPress={() => setSelectedType(type)}
                  >
                    <Text style={[s.activityTypeChipTxt, active && s.activityTypeChipTxtActive]}>{type}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={s.activityFieldLabel}>Duration (minutes)</Text>
            <TextInput
              style={s.activityFieldInput}
              keyboardType="numeric"
              value={customDuration}
              onChangeText={setCustomDuration}
              placeholder="e.g. 30"
              placeholderTextColor="#9A8A80"
            />
            {durationError ? <Text style={s.activityFieldError}>{durationError}</Text> : null}
            <Text style={s.activityFieldLabel}>Distance (km)</Text>
            <TextInput
              style={s.activityFieldInput}
              keyboardType="decimal-pad"
              value={customDistance}
              onChangeText={setCustomDistance}
              placeholder="e.g. 1.6"
              placeholderTextColor="#9A8A80"
            />
            {distanceError ? <Text style={s.activityFieldError}>{distanceError}</Text> : null}
            <Text style={s.activityFieldLabel}>Notes</Text>
            <TextInput
              style={[s.activityFieldInput, s.activityNotesInput]}
              value={customNotes}
              onChangeText={setCustomNotes}
              placeholder="Optional details"
              placeholderTextColor="#9A8A80"
              multiline
            />
            <TouchableOpacity
              style={[s.activityTypeSaveBtn, !canSaveSelectedType && s.activityTypeSaveBtnDisabled]}
              onPress={addSelectedTypeLog}
              disabled={!canSaveSelectedType}
            >
              <Text style={s.activityTypeSaveBtnTxt}>Add {selectedType}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <View style={s.nav}>
        <TouchableOpacity style={s.navItem} onPress={onHome}>
          <View style={s.navIconWrap}><HomeNavIcon color="#644B3C" fill="#644B3C" stroke="#644B3C" /></View>
          <Text style={s.navTxt}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={onRecords}>
          <View style={s.navIconWrap}><HealthNavIcon color="#644B3C" /></View>
          <Text style={s.navTxt}>Health</Text>
        </TouchableOpacity>
        <View style={s.navActive}>
          <View style={s.navIconWrap}><ActivityNavIcon color="#E67E22" fill="#E67E22" stroke="#E67E22" /></View>
          <Text style={s.navActiveTxt}>Activity</Text>
        </View>
        <TouchableOpacity style={s.navItem} onPress={onReminders}>
          <View style={s.navIconWrap}><RemindersNavIcon color="#644B3C" fill="#644B3C" stroke="#644B3C" /></View>
          <Text style={s.navTxt}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={onSettings}>
          <View style={s.navIconWrap}><SettingsNavIcon color="#644B3C" fill="#644B3C" stroke="#644B3C" /></View>
          <Text style={s.navTxt}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NavItem({
  label,
  iconComponent: IconComponent,
  onPress,
  badgeCount,
  active,
}: {
  label: string;
  iconComponent: React.ComponentType<SvgProps>;
  onPress?: () => void;
  badgeCount?: number;
  active?: boolean;
}) {
  const iconColor = active ? '#E67E22' : '#644B3C';
  return (
    <TouchableOpacity style={s.navItem} onPress={onPress} disabled={!onPress}>
      <View style={s.navIconWrap}>
        <IconComponent color={iconColor} fill={iconColor} stroke={iconColor} />
        {(badgeCount || 0) > 0 ? (
          <View style={s.navBadge}><Text style={s.navBadgeTxt}>{(badgeCount || 0) > 9 ? '9+' : badgeCount}</Text></View>
        ) : null}
      </View>
      <Text style={active ? s.navActiveTxt : s.navTxt}>{label}</Text>
    </TouchableOpacity>
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
    case 'alert-circle':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="9" {...common} />
          <Path d="M12 8v4M12 16h.01" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </Svg>
      );
    case 'more-vertical':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r={1.5} fill={color} />
          <Circle cx="12" cy="6" r={1.5} fill={color} />
          <Circle cx="12" cy="18" r={1.5} fill={color} />
        </Svg>
      );
    case 'check-circle':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="9" {...common} />
          <Path d="m9 12 2 2 4-4" {...common} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
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
        <LabeledInput label="Password" placeholder="********" iconComponent={ShieldIcon} secure />
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
              <PetReviewRow label="Name" value={value.name || '-'} />
              <PetReviewRow label="Species" value={value.species} />
              <PetReviewRow label="Breed" value={value.breed || '-'} />
              <PetReviewRow label="Date of Birth" value={value.dateOfBirth || '-'} />
              <PetReviewRow label="Gender" value={value.gender} />
              <PetReviewRow label="Weight" value={value.weight ? `${value.weight} kg` : '-'} last />
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
  const photoSource = getPetImageSource(pet);

  return (
    <View style={s.petProfileWrap}>
      <ScrollView contentContainerStyle={s.petProfileContent} showsVerticalScrollIndicator={false}>
        {photoSource ? (
          <View style={s.petHeroWrap}>
            <Image source={photoSource} style={s.petHero} />
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
            <PetFact label="Date of Birth" value={pet.dateOfBirth || '-'} border />
            <PetFact label="Weight" value={pet.weight ? `${pet.weight} kg` : '-'} border />
            <PetFact label="Microchip" value={pet.microchipNumber || '-'} border />
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
  onOpenManualAdd,
  onOpenOCR,
  records,
  pets,
  onSelectRecord,
  onShareRecord,
}: {
  onHome: () => void;
  onOpenManualAdd: (petId: string) => void;
  onOpenOCR: (petId: string) => void;
  records: HealthRecord[];
  pets: Pet[];
  onSelectRecord: (id: string) => void;
  onShareRecord: (recordId: string, recordTitle: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<RecordType | 'All'>('All');
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [targetPetId, setTargetPetId] = useState(pets[0]?.id || '');

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
              <Text style={s.recClearTxt}>X</Text>
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
              {cfg ? (
                <View style={s.recChipContent}>
                  <RecordTypeIcon type={t as RecordType} size={13} />
                  <Text style={[s.recChipTxt, active ? s.recChipTxtActive : null]}>{t}</Text>
                </View>
              ) : (
                <Text style={[s.recChipTxt, active ? s.recChipTxtActive : null]}>All</Text>
              )}
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
                  <RecordTypeIcon type={r.type} size={20} />
                </View>
                <View style={s.recCardBody}>
                  <View style={s.recCardTop}>
                    <Text style={s.recCardTitle} numberOfLines={1}>{r.title}</Text>
                    <Text style={[s.recCardPill, { backgroundColor: cfg.bgColor, color: cfg.color }]}>{r.type}</Text>
                  </View>
                  <Text style={s.recCardPet} numberOfLines={1}>{petName(r.petId)} - {formatRecordDate(r.recordDate)}</Text>
                  {r.vetName ? (
                    <Text style={s.recCardVet} numberOfLines={1}>{r.vetName}{r.clinicName ? ` - ${r.clinicName}` : ''}</Text>
                  ) : null}
                  {r.attachmentName ? (
                    <View style={s.recAttachRow}>
                      <Text style={s.recAttachTxt}>Attachment: {r.attachmentName}</Text>
                    </View>
                  ) : null}
                  <TouchableOpacity onPress={() => onShareRecord(r.id, r.title)}>
                    <Text style={s.recShareLink}>Share record</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity style={s.recFab} onPress={() => setShowFabMenu(true)} activeOpacity={0.9}>
        <Text style={s.recFabTxt}>+</Text>
      </TouchableOpacity>

      <Modal visible={showFabMenu} transparent animationType="fade" onRequestClose={() => setShowFabMenu(false)}>
        <TouchableOpacity style={s.recFabOverlay} onPress={() => setShowFabMenu(false)} activeOpacity={1}>
          <View style={s.recFabMenu}>
            <Text style={s.recFabMenuTitle}>Add Health Record</Text>
            <Text style={s.recFabMenuSub}>Select a pet and entry method.</Text>

            <View style={s.recPetPicker}>
              {pets.map(p => (
                <TouchableOpacity
                  key={p.id}
                  style={[s.recPetChip, targetPetId === p.id ? s.recPetChipActive : null]}
                  onPress={() => setTargetPetId(p.id)}
                >
                  <Text style={[s.recPetChipTxt, targetPetId === p.id ? s.recPetChipTxtActive : null]}>{p.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[s.recFabMenuBtn, s.recFabMenuBtnPrimary]}
              onPress={() => {
                setShowFabMenu(false);
                onOpenOCR(targetPetId || pets[0]?.id || '');
              }}
            >
              <Text style={s.recFabMenuBtnPrimaryTxt}>OCR Upload and Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={s.recFabMenuBtn}
              onPress={() => {
                setShowFabMenu(false);
                onOpenManualAdd(targetPetId || pets[0]?.id || '');
              }}
            >
              <Text style={s.recFabMenuBtnTxt}>Enter Manually</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// REC-002: Add record form â€” type, title, description, date, vet, clinic, attachment
function AddRecordScreen({
  onBack,
  pets,
  onSave,
  editing,
  prefill,
  initialPetId,
}: {
  onBack: () => void;
  pets: Pet[];
  onSave: (record: HealthRecord, mode: 'create' | 'edit') => void;
  editing?: HealthRecord | null;
  prefill?: Partial<HealthRecord> | null;
  initialPetId?: string | null;
}) {
  const [type, setType] = useState<RecordType>((editing?.type ?? prefill?.type ?? 'Vaccination') as RecordType);
  const [title, setTitle] = useState(editing?.title ?? prefill?.title ?? '');
  const [description, setDescription] = useState(editing?.description ?? prefill?.description ?? '');
  const [recordDate, setRecordDate] = useState(editing?.recordDate ?? prefill?.recordDate ?? new Date().toISOString().slice(0, 10));
  const [vetName, setVetName] = useState(editing?.vetName ?? prefill?.vetName ?? '');
  const [clinicName, setClinicName] = useState(editing?.clinicName ?? prefill?.clinicName ?? '');
  const [petId, setPetId] = useState(editing?.petId ?? initialPetId ?? prefill?.petId ?? pets[0]?.id ?? '');
  const [attachmentName, setAttachmentName] = useState(editing?.attachmentName ?? prefill?.attachmentName ?? '');
  const [attachmentUri] = useState(editing?.attachmentUri ?? prefill?.attachmentUri ?? '');

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
      attachmentUri: attachmentUri || undefined,
      createdAt: editing?.createdAt ?? new Date().toISOString(),
    };
    onSave(record, editing ? 'edit' : 'create');
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
              <RecordTypeIcon type={t} size={16} />
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
          {attachmentName ? `Attachment: ${attachmentName}` : '+ Attach file (PDF, image)'}
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
  onShare,
  onCreateReminder,
  onDelete,
}: {
  record: HealthRecord;
  pet: Pet | null;
  onBack: () => void;
  onEdit: () => void;
  onShare: () => void;
  onCreateReminder: () => void;
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
          <RecordTypeIcon type={record.type} size={26} />
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
            <Text style={s.recDetailAttachTxt}>Attachment: {record.attachmentName}</Text>
          </View>
        </View>
      ) : null}

      <TouchableOpacity style={s.recDetailShare} onPress={onShare}>
        <Text style={s.recDetailShareTxt}>Share Record</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.recDetailReminder} onPress={onCreateReminder}>
        <Text style={s.recDetailReminderTxt}>Create Reminder</Text>
      </TouchableOpacity>

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

function RemindersScreen({
  reminders,
  pets,
  onHome,
  onHealth,
  onActivity,
  onSettings,
  onAddReminder,
  onMarkComplete,
  onFetchReminders,
  refreshToken,
  overdueCount,
}: {
  reminders: Reminder[];
  pets: Pet[];
  onHome: () => void;
  onHealth: () => void;
  onActivity: () => void;
  onSettings: () => void;
  onAddReminder: () => void;
  onMarkComplete: (id: string) => void;
  onFetchReminders: () => Promise<ReminderWithPet[]>;
  refreshToken: number;
  overdueCount: number;
}) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Overdue' | 'Upcoming' | 'Completed'>('All');
  const [rows, setRows] = useState<ReminderWithPet[]>([]);

  const hydrate = useCallback(async () => {
    const data = await onFetchReminders();
    setRows(data);
  }, [onFetchReminders]);

  useFocusEffect(true, () => {
    hydrate();
    return undefined;
  });

  useEffect(() => {
    hydrate();
  }, [hydrate, refreshToken]);

  const today = new Date().toISOString().slice(0, 10);

  const overdueReminders = useMemo(
    () => rows.filter(r => !r.completed && r.dueDate < today),
    [rows, today],
  );

  const upcomingReminders = useMemo(
    () => rows.filter(r => !r.completed && r.dueDate >= today),
    [rows, today],
  );

  const completedReminders = useMemo(
    () => rows.filter(r => r.completed),
    [rows],
  );

  const sections = useMemo(() => {
    if (activeFilter === 'Completed') {
      return [{ title: 'COMPLETED', data: completedReminders }];
    }
    if (activeFilter === 'Overdue') {
      return [{ title: 'OVERDUE', data: overdueReminders }];
    }
    if (activeFilter === 'Upcoming') {
      return [{ title: 'UPCOMING', data: upcomingReminders }];
    }
    // All
    return [
      { title: 'OVERDUE', data: overdueReminders },
      { title: 'UPCOMING', data: upcomingReminders },
    ];
  }, [activeFilter, completedReminders, overdueReminders, upcomingReminders]);

  const getPetById = (id: string) => pets.find(p => p.id === id) || null;

  const getOverdueLabel = (due: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(due).getTime()) / 86400000);
    if (diff <= 1) return 'OVERDUE YESTERDAY';
    if (diff < 7) return `OVERDUE ${diff} DAYS`;
    return `OVERDUE ${Math.ceil(diff / 7)} WEEKS`;
  };

  const getDateGroup = (due: string) => {
    const today = new Date(); today.setHours(0,0,0,0);
    const d = new Date(due); d.setHours(0,0,0,0);
    const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff <= 7) return `${diff} days`;
    return formatRecordDate(due);
  };

  return (
    <View style={s.remWrap}>
      {/* ── Top Header ── */}
      <View style={s.remTopHeader}>
        <TouchableOpacity onPress={onHome} hitSlop={12}>
          <BackIcon width={20} height={20} fill="#261810" />
        </TouchableOpacity>
        <Text style={s.remTopTitle}>Reminders</Text>
        <TouchableOpacity style={s.remAddBtn} onPress={onAddReminder} activeOpacity={0.7}>
          <AppIcon name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.remScrollContent} showsVerticalScrollIndicator={false}>
        {/* ── Hero heading ── */}
        <View style={s.remHero}>
          <Text style={s.remHeroTitle}>Reminders</Text>
          <Text style={s.remHeroSub}>Keep your furry friends healthy and happy.{`\n`}Here are the tasks that need your attention today.</Text>
        </View>

        {/* ── Filter chips (horizontal scroll) ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.remFilterRow}>
          {[{key:'All', icon:null}, {key:'Overdue', icon:OverdueIcon}, {key:'Upcoming', icon:UpcomingIcon}, {key:'Completed', icon:null}].map(f => {
            const isActive = activeFilter === f.key || (f.key === 'All' && activeFilter === 'Upcoming');
            const count = f.key === 'All' ? rows.length : f.key === 'Overdue' ? overdueReminders.length : f.key === 'Upcoming' ? upcomingReminders.length : completedReminders.length;
            const IconComp = f.icon;
            return (
              <TouchableOpacity
                key={f.key}
                style={[s.remFilterChip, isActive && s.remFilterChipActive]}
                onPress={() => setActiveFilter(f.key as typeof activeFilter)}
                activeOpacity={0.75}
              >
                {IconComp && <IconComp width={14} height={14} />}
                <Text style={[s.remFilterChipTxt, isActive && s.remFilterChipTxtActive]}>
                  {f.key} {count > 0 ? `(${count})` : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Overdue Section ── */}
        {(activeFilter === 'All' || activeFilter === 'Overdue') && overdueReminders.length > 0 && (
          <View style={s.remOverdueBlock}>
            <View style={s.remSectionRow}>
              <OverdueIcon width={20} height={20} />
              <Text style={s.remSectionTitleRed}>Overdue</Text>
            </View>
            <View style={s.remOverdueCards}>
              {overdueReminders.map(item => {
                const pet = getPetById(item.petId);
                return (
                  <View key={item.id} style={[s.remItemCard, s.remItemCardOverdue]}>
                    <Image source={pet ? getPetImageSource(pet) : ASSET.petCooper} style={s.remItemAvatar} />
                    <View style={s.remItemBody}>
                      <Text style={s.remItemBadge}>{getOverdueLabel(item.dueDate)}</Text>
                      <Text style={s.remItemTitle}>{item.title}</Text>
                      <Text style={s.remItemSub}>{`${item.petName} \u2022 ${item.recurrence !== 'None' ? item.recurrence : item.type}`}</Text>
                    </View>
                    <TouchableOpacity style={[s.remCheckBtn, s.remCheckBtnRed]} onPress={() => onMarkComplete(item.id)} activeOpacity={0.8}>
                      <TickIcon width={16} height={13} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* ── Upcoming Section ── */}
        {(activeFilter === 'All' || activeFilter === 'Upcoming') && (
          <View style={s.remUpcomingBlock}>
            <View style={s.remSectionRow}>
              <UpcomingIcon width={18} height={20} />
              <Text style={s.remSectionTitleOrange}>Upcoming Reminders</Text>
            </View>

            {upcomingReminders.length === 0 ? (
            <View style={s.remEmpty}>
              <Text style={s.remEmptyTitle}>No upcoming reminders</Text>
              <Text style={s.remEmptySub}>Tap + to add a new reminder.</Text>
            </View>
          ) : (
            <View style={s.remUpcomingCards}>
              {upcomingReminders.map(item => {
                const pet = getPetById(item.petId);
                const due = new Date(item.dueDate);
                const timeStr = due.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
                return (
                  <View key={item.id} style={[s.remItemCard, s.remItemCardUpcoming]}>
                    <Image source={pet ? getPetImageSource(pet) : ASSET.petCooper} style={s.remItemAvatar} />
                    <View style={s.remItemBody}>
                      <View style={s.remUpcomingHeader}>
                        <View style={s.remDateChip}><Text style={s.remDateChipTxt}>{getDateGroup(item.dueDate)}</Text></View>
                        <TouchableOpacity activeOpacity={0.6}>
                          <AppIcon name="more-vertical" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                      </View>
                      <Text style={s.remItemTitle}>{item.title}</Text>
                      <Text style={s.remItemSub}>{`${item.petName} \u2022 ${timeStr}`}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        )}

        {/* ── Completed Section (when active) ── */}
        {activeFilter === 'Completed' && completedReminders.length > 0 && (
          <View style={s.remUpcomingBlock}>
            <View style={s.remSectionRow}>
              <AppIcon name="check-circle" size={18} color="#10B981" />
              <Text style={{ ...s.remSectionTitleOrange, color: '#10B981' }}>Completed</Text>
            </View>
            <View style={s.remUpcomingCards}>
              {completedReminders.map(item => (
                <View key={item.id} style={[s.remItemCard, { opacity: 0.6 }]}>
                  <View style={s.remUpcomingHeader}>
                    <View style={[s.remDateChip, { backgroundColor: '#F0FDF4' }]}><Text style={[s.remDateChipTxt, { color: '#059669' }]}>Done</Text></View>
                  </View>
                  <Text style={s.remItemTitle}>{item.title}</Text>
                  <Text style={s.remItemSub}>{item.petName}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── Empty state when filter has no results ── */}
        {activeFilter === 'Overdue' && overdueReminders.length === 0 && (
          <View style={s.remEmpty}>
            <Text style={s.remEmptyTitle}>No overdue reminders</Text>
            <Text style={s.remEmptySub}>You're all caught up!</Text>
          </View>
        )}
        {activeFilter === 'Completed' && completedReminders.length === 0 && (
          <View style={s.remEmpty}>
            <Text style={s.remEmptyTitle}>No completed reminders</Text>
            <Text style={s.remEmptySub}>Completed reminders will appear here.</Text>
          </View>
        )}
      </ScrollView>

      <View style={s.nav}>
        <TouchableOpacity style={s.navItem} onPress={onHome}>
          <View style={s.navIconWrap}><HomeNavIcon color="#644B3C" /></View>
          <Text style={s.navTxt}>Home</Text>
        </TouchableOpacity>
        <NavItem label="Health" iconComponent={HealthNavIcon} onPress={onHealth} />
        <NavItem label="Activity" iconComponent={ActivityNavIcon} onPress={onActivity} />
        <View style={s.navActive}>
          <View style={s.navIconWrap}>
            <RemindersNavIcon color="#E67E22" fill="#E67E22" stroke="#E67E22" />
            {overdueCount > 0 ? (
              <View style={s.navBadge}><Text style={s.navBadgeTxt}>{overdueCount > 9 ? '9+' : overdueCount}</Text></View>
            ) : null}
          </View>
          <Text style={s.navActiveTxt}>Reminders</Text>
        </View>
        <NavItem label="Settings" iconComponent={SettingsNavIcon} onPress={onSettings} />
      </View>
    </View>
  );
}

// ReminderCard kept for backward compat; main rendering moved inline into RemindersScreen.
function ReminderCard(props: Parameters<typeof ReminderCard>[0]) {
  /* no-op — card rendering is now inline in RemindersScreen */
  return null;
}

const addReminderSchema = yup.object({
  type: yup.mixed<ReminderType>().oneOf(['Vaccine', 'Medication', 'Checkup', 'Custom']).required(),
  petId: yup.string().trim().required(),
  title: yup.string().trim().required(),
  dueDate: yup.string().required(),
  recurrence: yup.mixed<ReminderRecurrence>().oneOf(['None', 'Monthly', 'Quarterly', 'Yearly', 'Custom']).required(),
  customWeeks: yup.number().optional(),
  notifyDays: yup.number().required(),
  pushEnabled: yup.boolean().required(),
  emailEnabled: yup.boolean().required(),
});

function AddReminderScreen({
  pets,
  prefill,
  onBack,
  onSave,
}: {
  pets: Pet[];
  prefill: ReminderPrefill | null;
  onBack: () => void;
  onSave: (input: Omit<Reminder, 'id' | 'createdAt' | 'completed' | 'completedAt'>) => Promise<void> | void;
}) {
  const [availablePets, setAvailablePets] = useState<Pet[]>(pets);
  const [showPetPicker, setShowPetPicker] = useState(false);
  const [showRecurrencePicker, setShowRecurrencePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pushPermissionDenied, setPushPermissionDenied] = useState(false);
  const DatePickerComponent = dateTimePickerModule?.default;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(addReminderSchema),
    mode: 'onChange',
    defaultValues: {
      type: prefill?.type || 'Custom',
      petId: prefill?.petId || pets[0]?.id || '',
      title: prefill?.title || '',
      dueDate: tomorrowIso(),
      recurrence: 'None',
      customWeeks: 1,
      notifyDays: 3,
      pushEnabled: true,
      emailEnabled: true,
    },
  });

  const selectedPetId = watch('petId');
  const selectedType = watch('type');
  const recurrence = watch('recurrence');
  const notifyDays = watch('notifyDays');
  const dueDate = watch('dueDate');
  const title = watch('title');
  const customWeeks = watch('customWeeks');
  const pushEnabled = watch('pushEnabled');

  const selectedPetName = availablePets.find(p => p.id === selectedPetId)?.name || 'Pet';
  const notifyAt = useMemo(() => {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) return 'Invalid date';
    return formatRecordDate(addDays(date, -notifyDays).toISOString());
  }, [dueDate, notifyDays]);

  useEffect(() => {
    if (!supabaseModule?.createClient) return;
    const url = (globalThis as unknown as { __SUPABASE_URL__?: string }).__SUPABASE_URL__;
    const anonKey = (globalThis as unknown as { __SUPABASE_ANON_KEY__?: string }).__SUPABASE_ANON_KEY__;
    if (!url || !anonKey) return;

    const loadPets = async () => {
      try {
        const client = supabaseModule.createClient!(url, anonKey) as {
          from: (name: string) => {
            select: (columns: string) => Promise<{ data?: Array<{ id: string; name: string; species: PetSpecies }>; error?: { message?: string } }>;
          };
        };
        const response = await client.from('pets').select('id,name,species');
        if (response?.data && !response.error) {
          const mapped = response.data.map((p) => ({
            id: p.id,
            name: p.name,
            species: p.species,
            breed: '',
            dateOfBirth: '',
            gender: 'Male' as PetGender,
            weight: '',
            microchipNumber: '',
            photo: '',
          }));
          setAvailablePets(mapped);
          if (!mapped.find(p => p.id === selectedPetId) && mapped[0]) {
            setValue('petId', mapped[0].id, { shouldValidate: true });
          }
        }
      } catch {
        // Keep local pet list when remote fetch fails.
      }
    };

    loadPets();
  }, [pets, selectedPetId, setValue]);

  useEffect(() => {
    if (!notificationsModule?.getPermissionsAsync) return;
    notificationsModule.getPermissionsAsync().then((result) => {
      const denied = result?.granted === false || result?.status === 'denied';
      setPushPermissionDenied(denied);
      if (denied) {
        setValue('pushEnabled', false, { shouldValidate: true });
      }
    }).catch(() => undefined);
  }, [setValue]);

  const onSubmit = handleSubmit(async (values) => {
    if (values.pushEnabled && notificationsModule?.requestPermissionsAsync) {
      const permission = await notificationsModule.requestPermissionsAsync();
      const denied = permission?.granted === false || permission?.status === 'denied';
      setPushPermissionDenied(denied);
      if (denied) {
        setValue('pushEnabled', false, { shouldValidate: true });
      }
    }

    await onSave({
      petId: values.petId,
      type: values.type,
      title: values.title.trim(),
      dueDate: values.dueDate,
      recurrence: values.recurrence,
      customWeeks: values.recurrence === 'Custom' ? values.customWeeks : undefined,
      notifyDays: values.notifyDays,
      pushEnabled: values.pushEnabled,
      emailEnabled: values.emailEnabled,
    });
  });

  return (
    <ScrollView contentContainerStyle={s.addRemWrap} keyboardShouldPersistTaps="handled">
      <View style={s.recHeader}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.recTitle}>Add Reminder</Text>
        <TouchableOpacity onPress={onSubmit} disabled={!isValid || isSubmitting}>
          <Text style={[s.editSaveTxt, (!isValid || isSubmitting) && s.remSaveDisabled]}>Save</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.recFieldLbl}>Type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.remTypeRow}>
        {(['Vaccine', 'Medication', 'Checkup', 'Custom'] as ReminderType[]).map((type) => {
          const active = selectedType === type;
          return (
            <TouchableOpacity key={type} style={[s.remTypeChip, active && s.remTypeChipActive]} onPress={() => setValue('type', type, { shouldValidate: true })}>
              <Text style={[s.remTypeTxt, active && s.remTypeTxtActive]}>{type}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={s.recFieldLbl}>Pet</Text>
      <TouchableOpacity style={s.remPickerRow} onPress={() => setShowPetPicker(true)}>
        <Text style={s.remPickerValue}>{selectedPetName}</Text>
        <Text style={s.remPickerChevron}>{'>'}</Text>
      </TouchableOpacity>

      <Text style={s.recFieldLbl}>Title *</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={s.recInput}
            placeholder="Reminder title"
            placeholderTextColor="#897365"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={s.recFieldLbl}>Due Date *</Text>
      <TouchableOpacity
        style={s.remPickerRow}
        onPress={() => {
          if (!DatePickerComponent) {
            Alert.alert('Date picker unavailable', 'Native date picker is not linked in this build yet. Rebuild the app to enable it.');
            return;
          }
          setShowDatePicker(true);
        }}
      >
        <Text style={s.remPickerValue}>{formatRecordDate(dueDate)}</Text>
        <Text style={s.remPickerChevron}>{'>'}</Text>
      </TouchableOpacity>

      <Text style={s.recFieldLbl}>Recurrence</Text>
      <TouchableOpacity style={s.remPickerRow} onPress={() => setShowRecurrencePicker(true)}>
        <Text style={s.remPickerValue}>{recurrence === 'Custom' ? `Custom (every ${customWeeks || 1} week)` : recurrence}</Text>
        <Text style={s.remPickerChevron}>{'>'}</Text>
      </TouchableOpacity>

      {recurrence === 'Custom' ? (
        <Controller
          control={control}
          name="customWeeks"
          render={({ field: { value } }) => (
            <TextInput
              style={s.recInput}
              value={String(value || 1)}
              onChangeText={(v) => setValue('customWeeks', Math.max(1, Number(v) || 1), { shouldValidate: true })}
              keyboardType="number-pad"
              placeholder="Every X weeks"
              placeholderTextColor="#897365"
            />
          )}
        />
      ) : null}

      <Text style={s.recFieldLbl}>Notify Before</Text>
      <TouchableOpacity
        style={s.remPickerRow}
        onPress={() => {
          Alert.alert('Notify Before', 'Choose lead time', [
            ...NOTIFY_DAY_OPTIONS.map(days => ({
              text: `${days} day${days > 1 ? 's' : ''}`,
              onPress: () => setValue('notifyDays', days, { shouldValidate: true }),
            })),
            { text: 'Cancel', style: 'cancel' as const },
          ]);
        }}
      >
        <Text style={s.remPickerValue}>{`${notifyDays} day${notifyDays > 1 ? 's' : ''}`}</Text>
        <Text style={s.remPickerChevron}>{'>'}</Text>
      </TouchableOpacity>

      <Text style={s.recFieldLbl}>Notification Channels</Text>
      <View style={s.remToggleRow}>
        <Text style={s.remToggleLabel}>Push</Text>
        <Switch
          value={pushEnabled}
          onValueChange={(v) => setValue('pushEnabled', v, { shouldValidate: true })}
          disabled={pushPermissionDenied}
        />
      </View>
      {pushPermissionDenied ? (
        <TouchableOpacity onPress={() => Alert.alert('Permission Required', 'Enable push notifications in Settings to use this channel.') }>
          <Text style={s.remPermissionLink}>Enable push in Settings</Text>
        </TouchableOpacity>
      ) : null}
      <Controller
        control={control}
        name="emailEnabled"
        render={({ field: { value } }) => (
          <View style={s.remToggleRow}>
            <Text style={s.remToggleLabel}>Email</Text>
            <Switch value={value} onValueChange={(v) => setValue('emailEnabled', v, { shouldValidate: true })} />
          </View>
        )}
      />

      <View style={s.remPreviewCard}>
        <Text style={s.remPreviewTxt}>{`${selectedPetName} will be notified about ${title || 'this reminder'} on ${notifyAt} at 8:00 AM IST`}</Text>
      </View>

      <TouchableOpacity style={[s.primary, (!isValid || isSubmitting) && s.remSaveBtnDisabled]} onPress={onSubmit} disabled={!isValid || isSubmitting}>
        <Text style={s.primaryTxt}>Save Reminder</Text>
      </TouchableOpacity>

      <Modal visible={showPetPicker} transparent animationType="slide" onRequestClose={() => setShowPetPicker(false)}>
        <TouchableOpacity style={s.remSheetOverlay} onPress={() => setShowPetPicker(false)} activeOpacity={1}>
          <View style={s.remSheet}>
            <Text style={s.remSheetTitle}>Select Pet</Text>
            {availablePets.map((pet) => {
              const selected = pet.id === selectedPetId;
              const emoji = pet.species === 'Cat' ? 'CAT' : 'DOG';
              return (
                <TouchableOpacity
                  key={pet.id}
                  style={s.remSheetRow}
                  onPress={() => {
                    setValue('petId', pet.id, { shouldValidate: true });
                    setShowPetPicker(false);
                  }}
                >
                  <Text style={s.remSheetRowTxt}>{`${emoji} ${pet.name}`}</Text>
                  {selected ? <View style={s.remSheetCheckBadge}><TickIcon width={10} height={8} /></View> : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={showRecurrencePicker} transparent animationType="slide" onRequestClose={() => setShowRecurrencePicker(false)}>
        <TouchableOpacity style={s.remSheetOverlay} onPress={() => setShowRecurrencePicker(false)} activeOpacity={1}>
          <View style={s.remSheet}>
            <Text style={s.remSheetTitle}>Select Recurrence</Text>
            {RECURRENCE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={s.remSheetRow}
                onPress={() => {
                  setValue('recurrence', option, { shouldValidate: true });
                  setShowRecurrencePicker(false);
                }}
              >
                <Text style={s.remSheetRowTxt}>{option}</Text>
                {recurrence === option ? <View style={s.remSheetCheckBadge}><TickIcon width={10} height={8} /></View> : null}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {showDatePicker && DatePickerComponent ? (
        <DatePickerComponent
          value={new Date(dueDate)}
          mode="date"
          minimumDate={addDays(new Date(), 1)}
          onChange={(_, date) => {
            if (Platform.OS === 'android') setShowDatePicker(false);
            if (!date) return;
            setValue('dueDate', toIsoDate(date), { shouldValidate: true });
          }}
        />
      ) : null}
    </ScrollView>
  );
}

function OCRScanScreen({
  petId,
  pets,
  onBack,
  onSkipManual,
  onExtracted,
}: {
  petId: string;
  pets: Pet[];
  onBack: () => void;
  onSkipManual: (petId: string) => void;
  onExtracted: (result: OCRResult, imageUri: string, petId: string) => void;
}) {
  const [selectedPetId, setSelectedPetId] = useState(petId || pets[0]?.id || '');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const processWithOCR = (imageUri: string) => {
    setProcessing(true);
    setProgress(0.1);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 0.95) return prev;
        return Math.min(prev + 0.15, 0.95);
      });
    }, 220);

    setTimeout(() => {
      clearInterval(timer);
      setProgress(1);
      setProcessing(false);

      const result: OCRResult = {
        type: 'Vaccination',
        title: 'Rabies Booster',
        date: new Date().toISOString().slice(0, 10),
        vetName: 'Dr. Sample Vet',
        clinicName: 'Paw Care Clinic',
        confidence: {
          type: 'high',
          title: 'medium',
          date: 'high',
          vetName: 'medium',
          clinicName: 'low',
        },
      };

      onExtracted(result, imageUri, selectedPetId || pets[0]?.id || '');
    }, 1800);
  };

  return (
    <View style={s.ocrWrap}>
      <View style={s.recHeader}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.recTitle}>Scan Document</Text>
        <View style={s.blank} />
      </View>

      <ScrollView contentContainerStyle={s.ocrContent}>
        <Text style={s.ocrHeading}>OCR Upload and Scan</Text>
        <Text style={s.ocrSub}>Capture or upload a medical file to pre-fill health record fields.</Text>

        <Text style={s.recFieldLbl}>Pet</Text>
        <View style={s.recPetPicker}>
          {pets.map(p => (
            <TouchableOpacity
              key={p.id}
              style={[s.recPetChip, selectedPetId === p.id ? s.recPetChipActive : null]}
              onPress={() => setSelectedPetId(p.id)}
            >
              <Text style={[s.recPetChipTxt, selectedPetId === p.id ? s.recPetChipTxtActive : null]}>{p.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={s.ocrPrimaryTile} onPress={() => processWithOCR('camera://mock-capture.jpg')}>
          <Text style={s.ocrTileTitle}>Scan with Camera</Text>
          <Text style={s.ocrTileSub}>Best for physical documents</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.ocrSecondaryTile} onPress={() => processWithOCR('file://mock-upload.pdf')}>
          <Text style={s.ocrTileTitleSmall}>Upload from Gallery</Text>
          <Text style={s.ocrTileSub}>PDF, JPEG, PNG - max 50 MB</Text>
        </TouchableOpacity>

        <View style={s.ocrDisclaimer}>
          <Text style={s.ocrDisclaimerTxt}>AI extraction can make mistakes. Always verify before saving.</Text>
        </View>

        <TouchableOpacity style={s.ocrSkipBtn} onPress={() => onSkipManual(selectedPetId || pets[0]?.id || '')}>
          <Text style={s.ocrSkipTxt}>Skip - Enter Manually</Text>
        </TouchableOpacity>
      </ScrollView>

      {processing ? (
        <View style={s.ocrProcessingOverlay}>
          <View style={s.ocrProcessingCard}>
            <ActivityIndicator color="#1A7BC4" />
            <Text style={s.ocrProcessingTxt}>Extracting text...</Text>
            <View style={s.ocrProgressTrack}>
              <View style={[s.ocrProgressFill, { width: `${Math.round(progress * 100)}%` }]} />
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

function OCRReviewScreen({
  ocrResult,
  petId,
  scannedImageUri,
  onRetake,
  onEditManually,
  onConfirm,
}: {
  ocrResult: OCRResult;
  petId: string;
  scannedImageUri: string;
  onRetake: () => void;
  onEditManually: (prefill: Partial<HealthRecord>, petId: string) => void;
  onConfirm: (record: HealthRecord) => void;
}) {
  const [type, setType] = useState<RecordType>(ocrResult.type);
  const [title, setTitle] = useState(ocrResult.title);
  const [recordDate, setRecordDate] = useState(ocrResult.date);
  const [vetName, setVetName] = useState(ocrResult.vetName);
  const [clinicName, setClinicName] = useState(ocrResult.clinicName);

  const valid = type && title.trim() && recordDate.trim();

  const save = () => {
    if (!valid) return;
    onConfirm({
      id: `rec_${Date.now()}`,
      petId,
      type,
      title: title.trim(),
      description: 'Imported via OCR',
      recordDate: recordDate.trim(),
      vetName: vetName.trim(),
      clinicName: clinicName.trim(),
      attachmentName: scannedImageUri.split('/').pop() || 'scanned-document.jpg',
      attachmentUri: scannedImageUri,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <ScrollView contentContainerStyle={s.ocrReviewWrap}>
      <View style={s.recHeader}>
        <TouchableOpacity onPress={onRetake}><Text style={s.ocrRetakeTxt}>Retake</Text></TouchableOpacity>
        <Text style={s.recTitle}>Review Details</Text>
        <View style={s.blank} />
      </View>

      <View style={s.ocrSuccessBanner}>
        <Text style={s.ocrSuccessTxt}>Document scanned - please review</Text>
      </View>

      <OCRField
        label="Type"
        value={type}
        onChangeText={(txt) => setType((txt as RecordType) || 'Other')}
        conf={ocrResult.confidence.type}
      />
      <OCRField label="Title" value={title} onChangeText={setTitle} conf={ocrResult.confidence.title} />
      <OCRField label="Date" value={recordDate} onChangeText={setRecordDate} conf={ocrResult.confidence.date} />
      <OCRField label="Vet Name" value={vetName} onChangeText={setVetName} conf={ocrResult.confidence.vetName} />
      <OCRField label="Clinic Name" value={clinicName} onChangeText={setClinicName} conf={ocrResult.confidence.clinicName} />

      <View style={s.ocrThumbCard}>
        <Text style={s.ocrThumbName} numberOfLines={1}>{scannedImageUri.split('/').pop() || 'scanned-document.jpg'}</Text>
        <Text style={s.ocrThumbMeta}>Original attached</Text>
      </View>

      <TouchableOpacity style={[s.primary, !valid && s.editSaveDisabled]} onPress={save} disabled={!valid}>
        <Text style={s.primaryTxt}>Confirm and Save Record</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={s.ocrSkipBtn}
        onPress={() => onEditManually({ type, title, recordDate, vetName, clinicName, attachmentUri: scannedImageUri }, petId)}
      >
        <Text style={s.ocrSkipTxt}>Edit All Fields Manually</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function OCRField({
  label,
  value,
  onChangeText,
  conf,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  conf: OCRConfidenceLevel;
}) {
  const style = getFieldStyle(conf);
  return (
    <View style={s.ocrFieldWrap}>
      <View style={s.ocrFieldLabelRow}>
        <Text style={s.ocrFieldLabel}>{label}</Text>
        <Text style={[s.ocrFieldConfidence, { color: style.labelColor }]}>{style.label}</Text>
      </View>
      <TextInput
        style={[s.ocrFieldInput, { backgroundColor: style.inputBg, borderColor: style.inputBorder }]}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

function SuggestedRemindersScreen({
  savedRecord,
  petName,
  onClose,
  onAccept,
}: {
  savedRecord: HealthRecord;
  petName: string;
  onClose: () => void;
  onAccept: () => void;
}) {
  const cfg = SUGGESTION_INTERVALS[savedRecord.type];
  if (!cfg) {
    onClose();
    return null;
  }

  const dueDate = addMonths(new Date(savedRecord.recordDate), cfg.months);

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <View style={s.sugOverlay}>
        <View style={s.sugSheet}>
          <TouchableOpacity style={s.sugClose} onPress={onClose}><Text style={s.sugCloseTxt}>X</Text></TouchableOpacity>
          <Text style={s.sugHead}>We found a follow-up reminder</Text>
          <Text style={s.sugSub}>{savedRecord.title} for {petName}</Text>

          <View style={s.sugCard}>
            <Text style={s.sugBadge}>{savedRecord.type}</Text>
            <Text style={s.sugTitle}>{savedRecord.title} - Next Dose</Text>
            <Text style={s.sugMeta}>{formatRecordDate(dueDate.toISOString())} - {cfg.recurrence}</Text>

            <View style={s.sugBtns}>
              <TouchableOpacity style={s.sugDismiss} onPress={onClose}>
                <Text style={s.sugDismissTxt}>Dismiss</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.sugAccept} onPress={onAccept}>
                <Text style={s.sugAcceptTxt}>Accept Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={s.sugFoot}>You can edit date and recurrence after accepting.</Text>
        </View>
      </View>
    </Modal>
  );
}

function ShareRecordScreen({
  recordId,
  recordTitle,
  onBack,
}: {
  recordId: string;
  recordTitle: string;
  onBack: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState<ShareLinkState | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = `${recordId}-${Date.now().toString(36)}`;
      setLink({
        token,
        url: `https://pawos.in/s/${token}`,
        expiryDays: 7,
        revoked: false,
        passwordRequired: false,
        password: '',
      });
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [recordId]);

  const updateExpiry = () => {
    if (!link) return;
    Alert.alert('Link expires in', 'Choose expiry window', [
      { text: '1 day', onPress: () => setLink({ ...link, expiryDays: 1 }) },
      { text: '7 days', onPress: () => setLink({ ...link, expiryDays: 7 }) },
      { text: '30 days', onPress: () => setLink({ ...link, expiryDays: 30 }) },
      { text: 'Never', onPress: () => setLink({ ...link, expiryDays: null }) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const doShare = async () => {
    if (!link || link.revoked) return;
    await Share.share({ message: link.url, title: recordTitle });
  };

  const revoke = () => {
    if (!link) return;
    Alert.alert('Revoke link', 'Are you sure you want to revoke this link?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Revoke',
        style: 'destructive',
        onPress: () => {
          setLink({ ...link, revoked: true });
          Alert.alert('Link revoked', 'This link is no longer valid.');
          onBack();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={s.shareWrap}>
      <View style={s.recHeader}>
        <TouchableOpacity style={s.otpBack} onPress={onBack}><BackButtonIcon width={16} height={16} /></TouchableOpacity>
        <Text style={s.recTitle}>Share Record</Text>
        <View style={s.blank} />
      </View>

      <Text style={s.shareHeading}>Share "{recordTitle}"</Text>
      <Text style={s.shareSub}>Anyone with the link can view this record until it expires.</Text>

      {loading ? (
        <View style={s.shareLoading}><ActivityIndicator color="#1A7BC4" /></View>
      ) : (
        <>
          <View style={s.shareLinkRow}>
            <Text style={s.shareUrl} numberOfLines={1}>{link?.url || ''}</Text>
            <TouchableOpacity onPress={() => Alert.alert('Link copied', 'Copy to clipboard can be wired here with @react-native-clipboard/clipboard.') }>
              <Text style={s.shareCopy}>Copy</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={s.shareExpiryRow} onPress={updateExpiry}>
            <Text style={s.shareExpiryLbl}>Link expires in</Text>
            <Text style={s.shareExpiryVal}>{link?.expiryDays == null ? 'Never' : `${link?.expiryDays} day(s)`}</Text>
          </TouchableOpacity>

          <View style={s.shareSwitchRow}>
            <Text style={s.shareExpiryLbl}>Require link password</Text>
            <Switch
              value={!!link?.passwordRequired}
              onValueChange={(value) => setLink(prev => (prev ? { ...prev, passwordRequired: value } : prev))}
            />
          </View>

          {link?.passwordRequired ? (
            <TextInput
              style={s.recInput}
              placeholder="Set 4-digit PIN or passphrase"
              placeholderTextColor="#897365"
              value={link.password}
              onChangeText={(value) => setLink(prev => (prev ? { ...prev, password: value } : prev))}
            />
          ) : null}

          <TouchableOpacity style={s.primary} onPress={doShare}>
            <Text style={s.primaryTxt}>Share via...</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.shareRevoke} onPress={revoke}>
            <Text style={s.shareRevokeTxt}>Revoke Link</Text>
          </TouchableOpacity>
        </>
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
  onbIndicatorRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
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
  authLogoSm: { width: 111, height: 48, marginBottom: 16, alignSelf: 'center' },
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
  primaryDisabled: { opacity: 0.45 },
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
  checkboxChecked: { backgroundColor: '#E67E22', borderColor: '#E67E22', alignItems: 'center', justifyContent: 'center' },
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
  homeBellBtn: { width: 35, height: 40, padding: 8, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  homeBellBadge: { position: 'absolute', top: 1, right: -2, minWidth: 16, height: 16, borderRadius: 999, backgroundColor: '#EF4444', paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center' },
  homeBellBadgeTxt: { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
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
  homeVitalsIconBtn: { width: 26, height: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  // Vitals row â€” Figma: 24px gap to next section (Upcoming Care)
  homeVitalsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 16 },
  homeVitalCard: { width: '48.5%', minHeight: 144, borderRadius: 24, backgroundColor: '#fff', padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  homeVitalCardCenter: { justifyContent: 'space-between' },
  homeVitalHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  homeVitalLabel: { color: '#4F3D31', fontSize: 14, fontWeight: '600', marginBottom: 12 },
  homeTrendPill: { minWidth: 32, height: 16, borderRadius: 999, backgroundColor: '#CFEFD8', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 7 },
  homeTrendGlyph: { color: '#0C8A4D', fontSize: 11, fontWeight: '700', marginTop: -1 },
  homeVitalValue: { color: '#261810', fontSize: 32, fontWeight: '400' },
  homeVitalUnit: { color: '#6D5B50', fontSize: 16, fontWeight: '400' },
  homeVitalCenter: { alignItems: 'center', marginTop: -2 },
  homeVitalAccent: { color: '#00A66D', fontSize: 10, fontWeight: '700', marginTop: 2, letterSpacing: 1.1 },
  homeBarBg: { height: 6, borderRadius: 6, backgroundColor: '#E8E3E1', marginTop: 14, marginBottom: 6, overflow: 'hidden' },
  homeBarFill: { width: '62%', height: '100%', backgroundColor: '#F39A18' },
  homeMuted: { color: '#6D5B50', fontSize: 12, fontWeight: '500' },
  homeActiveToday: { marginTop: 6, alignSelf: 'center' },
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
  settings: { backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  setting: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14, minHeight: 56 },
  settingBody: { flex: 1, marginLeft: 10, minWidth: 0 },
  settingBorder: { borderBottomWidth: 1, borderBottomColor: '#FFF8F5' },
  settingIcon: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  settingTitle: { color: '#261810', fontSize: 16, flexShrink: 1 },
  settingSub: { color: '#897365', fontSize: 12, marginTop: 2, flexShrink: 1 },
  trailing: { color: '#944A00', fontSize: 14, fontWeight: '600', marginRight: 6 },
  settingLabelWrap: { flex: 1, minWidth: 0 },
  settingRight: { alignSelf: 'center' },
  chevron: { width: 8, height: 12 },
  notifHistoryContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 120, gap: 12 },
  notifHistoryIntro: { color: '#564337', fontSize: 13, marginBottom: 4 },
  notifFilterRow: { flexDirection: 'row', gap: 8, paddingBottom: 4, paddingRight: 20 },
  notifFilterChip: { height: 32, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, borderColor: '#F2D5C2', backgroundColor: '#FFF2E9', alignItems: 'center', justifyContent: 'center' },
  notifFilterChipActive: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
  notifFilterTxt: { color: '#944A00', fontSize: 12, fontWeight: '700' },
  notifFilterTxtActive: { color: '#FFFFFF' },
  notifHistoryEmpty: { marginTop: 24, borderRadius: 16, backgroundColor: '#FFFFFF', padding: 20, alignItems: 'center' },
  notifHistoryEmptyTitle: { color: '#261810', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  notifHistoryEmptySub: { color: '#897365', fontSize: 13, textAlign: 'center' },
  notifHistoryCard: { borderRadius: 16, backgroundColor: '#FFFFFF', padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  notifHistoryHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  notifHistoryChannel: { color: '#944A00', fontSize: 11, fontWeight: '800' },
  notifHistoryDate: { color: '#897365', fontSize: 11 },
  notifHistoryTitle: { color: '#261810', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  notifHistoryMessage: { color: '#564337', fontSize: 13, lineHeight: 18 },
  notifHistoryMeta: { color: '#897365', fontSize: 11, marginTop: 6 },
  activityContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 120, gap: 12 },
  activityIntro: { color: '#564337', fontSize: 13, marginBottom: 2 },
  activityPetRow: { flexDirection: 'row', gap: 8, paddingRight: 20 },
  activityPetChip: { height: 34, borderRadius: 999, borderWidth: 1, borderColor: '#F2D5C2', backgroundColor: '#FFF2E9', paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
  activityPetChipActive: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
  activityPetChipTxt: { color: '#944A00', fontSize: 12, fontWeight: '700' },
  activityPetChipTxtActive: { color: '#FFFFFF' },
  activityStatsRow: { flexDirection: 'row', gap: 8 },
  activityStatCard: { flex: 1, borderRadius: 14, backgroundColor: '#FFFFFF', padding: 12, alignItems: 'center' },
  activityStatLabel: { color: '#897365', fontSize: 11, marginBottom: 4 },
  activityStatValue: { color: '#261810', fontSize: 16, fontWeight: '800' },
  activitySectionTitle: { color: '#261810', fontSize: 15, fontWeight: '800', marginTop: 4 },
  activityQuickRow: { flexDirection: 'row', gap: 8 },
  activityQuickBtn: { flex: 1, height: 40, borderRadius: 12, backgroundColor: '#FFE8D6', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F3CBAE' },
  activityQuickBtnTxt: { color: '#944A00', fontSize: 13, fontWeight: '700' },
  activityTypePickerBtn: { height: 42, borderRadius: 12, borderWidth: 1, borderColor: '#E67E22', backgroundColor: '#FFF8F2', alignItems: 'center', justifyContent: 'center' },
  activityTypePickerBtnTxt: { color: '#944A00', fontSize: 13, fontWeight: '700' },
  activityTypeOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', paddingHorizontal: 20 },
  activityTypeModal: { borderRadius: 18, backgroundColor: '#FFFFFF', padding: 18 },
  activityTypeTitle: { color: '#261810', fontSize: 16, fontWeight: '800' },
  activityTypeSub: { color: '#564337', fontSize: 13, marginTop: 4, marginBottom: 12 },
  activityTypeChipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  activityTypeChip: { height: 34, borderRadius: 999, borderWidth: 1, borderColor: '#F2D5C2', backgroundColor: '#FFF2E9', paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
  activityTypeChipActive: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
  activityTypeChipTxt: { color: '#944A00', fontSize: 12, fontWeight: '700' },
  activityTypeChipTxtActive: { color: '#FFFFFF' },
  activityFieldLabel: { color: '#564337', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  activityFieldInput: { height: 40, borderRadius: 10, borderWidth: 1, borderColor: '#ECD8CB', backgroundColor: '#FFF9F5', paddingHorizontal: 12, color: '#261810', marginBottom: 10 },
  activityFieldError: { color: '#BA1A1A', fontSize: 11, marginTop: -6, marginBottom: 8 },
  activityNotesInput: { minHeight: 72, height: 72, textAlignVertical: 'top', paddingTop: 10 },
  activityTypeSaveBtn: { height: 44, borderRadius: 12, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center' },
  activityTypeSaveBtnDisabled: { backgroundColor: '#E5B993' },
  activityTypeSaveBtnTxt: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  activityEmpty: { marginTop: 8, borderRadius: 16, backgroundColor: '#FFFFFF', padding: 20, alignItems: 'center' },
  activityEmptyTxt: { color: '#897365', fontSize: 13 },
  activityCard: { borderRadius: 14, backgroundColor: '#FFFFFF', padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
  activityCardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  activityTypePill: { color: '#944A00', fontSize: 11, fontWeight: '800' },
  activityDate: { color: '#897365', fontSize: 11 },
  activityTitle: { color: '#261810', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  activityMeta: { color: '#564337', fontSize: 12 },
  activityNotes: { color: '#897365', fontSize: 12, marginTop: 6 },
  logout: { height: 56, borderRadius: 16, borderWidth: 2, borderColor: '#E67E22', backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  logoutTxt: { color: '#E67E22', fontSize: 16 },
  // Bottom navigation â€” glassmorphism pill
  nav: { position: 'absolute', left: 20, right: 20, bottom: 16, borderRadius: 9999, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', paddingVertical: 6, paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 32, elevation: 10 },
  navItem: { flex: 1, height: 50, alignItems: 'center', justifyContent: 'center', gap: 3 },
  navIconWrap: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
  navBadge: { position: 'absolute', top: -6, right: -10, minWidth: 16, height: 16, borderRadius: 999, backgroundColor: '#EF4444', paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center' },
  navBadgeTxt: { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
  navTxt: { color: '#564337', fontSize: 10, fontWeight: '500' },
  navActive: { flex: 1, height: 50, borderRadius: 999, alignItems: 'center', justifyContent: 'center', gap: 3 },
  navActiveTxt: { color: '#E67E22', fontSize: 10, fontWeight: '700' },

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
  privacyContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 130, gap: 20 },
  privacyFooter: { color: '#B09080', fontSize: 11, textAlign: 'center', lineHeight: 18, marginTop: 16, marginBottom: 24 },

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
  recChipContent: { flexDirection: 'row', alignItems: 'center', gap: 6 },
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
  recShareLink: { color: '#1A7BC4', fontSize: 12, fontWeight: '600', marginTop: 8 },
  recFab: { position: 'absolute', right: 20, bottom: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 8 },
  recFabTxt: { color: '#FFFFFF', fontSize: 28, fontWeight: '400', marginTop: -2 },
  recFabOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.32)', justifyContent: 'flex-end', padding: 20 },
  recFabMenu: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, gap: 10 },
  recFabMenuTitle: { color: '#261810', fontSize: 16, fontWeight: '700' },
  recFabMenuSub: { color: '#897365', fontSize: 12, marginBottom: 6 },
  recFabMenuBtn: { height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#D8E3EE', alignItems: 'center', justifyContent: 'center' },
  recFabMenuBtnPrimary: { backgroundColor: '#1A7BC4', borderColor: '#1A7BC4' },
  recFabMenuBtnTxt: { color: '#1A7BC4', fontSize: 13, fontWeight: '600' },
  recFabMenuBtnPrimaryTxt: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },

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
  recDetailShare: { marginHorizontal: 20, marginTop: 18, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#CDE3F8', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFF8FF' },
  recDetailShareTxt: { color: '#1A7BC4', fontSize: 14, fontWeight: '700' },
  recDetailReminder: { marginHorizontal: 20, marginTop: 10, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#CDE6D9', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0FBF5' },
  recDetailReminderTxt: { color: '#0D7A4A', fontSize: 14, fontWeight: '700' },
  recDetailDelete: { alignSelf: 'center', marginTop: 32, padding: 12 },
  recDetailDeleteTxt: { color: '#BA1A1A', fontSize: 14, fontWeight: '600' },

  // Reminders list — redesigned per reference mockup
  remWrap: { flex: 1, backgroundColor: '#FFF8F5' },
  remTopHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 4, paddingBottom: 4, backgroundColor: '#FFF8F5' },
  remTopTitle: { color: '#261810', fontSize: 18, fontWeight: '800' },
  remAddBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center' },
  remScrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 130 },
  remHero: { paddingTop: 4, paddingBottom: 20 },
  remHeroTitle: { color: '#261810', fontSize: 28, lineHeight: 34, fontWeight: '800' },
  remHeroSub: { color: '#897365', fontSize: 15, lineHeight: 22, marginTop: 6 },
  remFilterRow: { flexDirection: 'row', gap: 8, marginBottom: 16, paddingVertical: 4 },
  remFilterChip: { borderRadius: 999, backgroundColor: '#F5EDE8', paddingHorizontal: 14, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6 },
  remFilterChipActive: { backgroundColor: '#E67E22' },
  remFilterChipTxt: { color: '#897365', fontSize: 13, fontWeight: '600' },
  remFilterChipTxtActive: { color: '#FFFFFF' },
  remSectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4, marginBottom: 12 },
  remSectionTitleRed: { color: '#DC2626', fontSize: 17, fontWeight: '700' },
  remSectionTitleOrange: { color: '#C27B03', fontSize: 17, fontWeight: '700' },
  remOverdueBlock: { marginBottom: 24 },
  remOverdueCards: { gap: 10 },
  remUpcomingBlock: { marginBottom: 24 },
  remUpcomingCards: { gap: 10 },
  // Unified reminder item card (used by both overdue & upcoming)
  remItemCard: { borderRadius: 16, backgroundColor: '#FFFFFF', padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2, flexDirection: 'row', alignItems: 'center' },
  remItemCardOverdue: {},
  remItemCardUpcoming: {},
  remItemAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 14 },
  remItemBody: { flex: 1, minWidth: 0 },
  remItemBadge: { color: '#DC2626', fontSize: 10, fontWeight: '800', letterSpacing: 0.5, marginBottom: 4 },
  remItemTitle: { color: '#261810', fontSize: 16, fontWeight: '700' },
  remItemSub: { color: '#897365', fontSize: 13, marginTop: 2 },
  remCheckBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#DC2626', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginLeft: 8 },
  remCheckBtnRed: {},
  remUpcomingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  remDateChip: { borderRadius: 999, backgroundColor: '#DBEAFE', paddingHorizontal: 12, paddingVertical: 4 },
  remDateChipTxt: { color: '#1D4ED8', fontSize: 12, fontWeight: '700' },
  remPetThumbs: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  remThumbAvatar: { width: 24, height: 24, borderRadius: 12 },
  remThumbCount: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center' },
  remThumbCountTxt: { color: '#B45309', fontSize: 11, fontWeight: '800' },
  remFab: { position: 'absolute', bottom: 80, right: 20, width: 54, height: 54, borderRadius: 27, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 14, elevation: 6 },
  remFabTxt: { color: '#FFFFFF', fontSize: 26, lineHeight: 28, fontWeight: '700' },
  remEmpty: { paddingVertical: 48, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, marginTop: 8 },
  remEmptyTitle: { color: '#261810', fontSize: 16, fontWeight: '600' },
  remEmptySub: { color: '#897365', fontSize: 13, marginTop: 6 },

  // Add reminder
  addRemWrap: { flexGrow: 1, backgroundColor: '#FFF8F5', paddingBottom: 36 },
  remSaveDisabled: { opacity: 0.4 },
  remTypeRow: { paddingHorizontal: 20, gap: 8 },
  remTypeChip: { minHeight: 36, borderRadius: 999, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  remTypeChipActive: { backgroundColor: '#1A7BC4', borderColor: '#1A7BC4' },
  remTypeTxt: { color: '#4B5563', fontSize: 12, fontWeight: '700' },
  remTypeTxtActive: { color: '#FFFFFF' },
  remPickerRow: { marginHorizontal: 20, minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  remPickerValue: { color: '#1F2937', fontSize: 14, fontWeight: '600' },
  remPickerChevron: { color: '#9CA3AF', fontSize: 14, fontWeight: '700' },
  remToggleRow: { marginHorizontal: 20, marginTop: 10, minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  remToggleLabel: { color: '#1F2937', fontSize: 14, fontWeight: '600' },
  remPermissionLink: { marginHorizontal: 20, marginTop: 6, color: '#1A7BC4', fontSize: 12, fontWeight: '600' },
  remPreviewCard: { marginHorizontal: 20, marginTop: 14, borderRadius: 12, backgroundColor: '#EFF8FF', borderWidth: 1, borderColor: '#CDE3F8', padding: 12 },
  remPreviewTxt: { color: '#1E3A5F', fontSize: 12, lineHeight: 18 },
  remSaveBtnDisabled: { opacity: 0.45 },
  remSheetOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  remSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 16, maxHeight: '55%' },
  remSheetTitle: { color: '#1F2937', fontSize: 16, fontWeight: '700', marginBottom: 8 },
  remSheetRow: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  remSheetRowTxt: { color: '#374151', fontSize: 14, fontWeight: '600' },
  remSheetCheckBadge: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#1A7BC4', alignItems: 'center', justifyContent: 'center' },

  // OCR flow
  ocrWrap: { flex: 1, backgroundColor: '#FFF8F5' },
  ocrContent: { paddingHorizontal: 20, paddingBottom: 32 },
  ocrHeading: { color: '#261810', fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  ocrSub: { color: '#564337', fontSize: 14, textAlign: 'center', marginTop: 6, marginBottom: 10 },
  ocrPrimaryTile: { backgroundColor: '#EFF8FF', borderRadius: 18, borderStyle: 'dashed', borderWidth: 1, borderColor: '#1A7BC4', padding: 22, marginTop: 8 },
  ocrSecondaryTile: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#D8E3EE', padding: 16, marginTop: 12 },
  ocrTileTitle: { color: '#1A2F4A', fontSize: 16, fontWeight: '700' },
  ocrTileTitleSmall: { color: '#1A2F4A', fontSize: 14, fontWeight: '700' },
  ocrTileSub: { color: '#6B7280', fontSize: 12, marginTop: 4 },
  ocrDisclaimer: { backgroundColor: '#FFF7ED', borderWidth: 1, borderColor: '#FCD9BD', borderRadius: 12, padding: 12, marginTop: 14 },
  ocrDisclaimerTxt: { color: '#9A3412', fontSize: 12 },
  ocrSkipBtn: { marginTop: 14, height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#D8E3EE', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  ocrSkipTxt: { color: '#1A7BC4', fontSize: 13, fontWeight: '600' },
  ocrProcessingOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  ocrProcessingCard: { width: '84%', borderRadius: 16, backgroundColor: '#FFFFFF', padding: 16 },
  ocrProcessingTxt: { color: '#261810', fontSize: 14, fontWeight: '600', marginTop: 8, marginBottom: 8 },
  ocrProgressTrack: { height: 8, borderRadius: 999, backgroundColor: '#E5E7EB', overflow: 'hidden' },
  ocrProgressFill: { height: '100%', backgroundColor: '#1A7BC4' },

  // OCR review
  ocrReviewWrap: { flexGrow: 1, backgroundColor: '#FFF8F5', paddingBottom: 32 },
  ocrRetakeTxt: { color: '#1A7BC4', fontSize: 14, fontWeight: '600' },
  ocrSuccessBanner: { marginHorizontal: 20, marginTop: 12, borderRadius: 12, backgroundColor: '#ECFDF5', borderWidth: 1, borderColor: '#A7F3D0', padding: 12 },
  ocrSuccessTxt: { color: '#065F46', fontSize: 13, fontWeight: '600' },
  ocrFieldWrap: { marginTop: 14, paddingHorizontal: 20 },
  ocrFieldLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  ocrFieldLabel: { color: '#564337', fontSize: 13, fontWeight: '600' },
  ocrFieldConfidence: { fontSize: 11, fontWeight: '700' },
  ocrFieldInput: { minHeight: 46, borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, color: '#261810' },
  ocrThumbCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', padding: 12 },
  ocrThumbName: { color: '#261810', fontSize: 12, fontWeight: '600' },
  ocrThumbMeta: { color: '#6B7280', fontSize: 11, marginTop: 2 },

  // Suggested reminders
  sugOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  sugSheet: { backgroundColor: '#FFF8F5', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  sugClose: { alignSelf: 'flex-end', width: 28, height: 28, borderRadius: 14, backgroundColor: '#F3ECE9', alignItems: 'center', justifyContent: 'center' },
  sugCloseTxt: { color: '#564337', fontSize: 12, fontWeight: '700' },
  sugHead: { color: '#261810', fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  sugSub: { color: '#564337', fontSize: 13, textAlign: 'center', marginTop: 6 },
  sugCard: { marginTop: 16, borderWidth: 1.5, borderColor: '#1A7BC4', borderRadius: 10, backgroundColor: '#FFFFFF', padding: 14 },
  sugBadge: { alignSelf: 'flex-start', borderRadius: 999, backgroundColor: '#EAF4FD', color: '#1A7BC4', fontSize: 10, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 4, overflow: 'hidden' },
  sugTitle: { color: '#1F2937', fontSize: 14, fontWeight: '700', marginTop: 8 },
  sugMeta: { color: '#6B7280', fontSize: 11, marginTop: 4 },
  sugBtns: { flexDirection: 'row', gap: 10, marginTop: 14 },
  sugDismiss: { flex: 1, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#F5C2C7', alignItems: 'center', justifyContent: 'center' },
  sugDismissTxt: { color: '#B91C1C', fontSize: 12, fontWeight: '700' },
  sugAccept: { flex: 1, height: 38, borderRadius: 10, backgroundColor: '#1A7BC4', alignItems: 'center', justifyContent: 'center' },
  sugAcceptTxt: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  sugFoot: { color: '#6B7280', fontSize: 11, textAlign: 'center', marginTop: 12 },

  // Share record
  shareWrap: { flexGrow: 1, backgroundColor: '#FFF8F5', paddingBottom: 30 },
  shareHeading: { color: '#261810', fontSize: 20, fontWeight: '700', paddingHorizontal: 20, marginTop: 12 },
  shareSub: { color: '#564337', fontSize: 13, paddingHorizontal: 20, marginTop: 4 },
  shareLoading: { marginTop: 20, alignItems: 'center', justifyContent: 'center' },
  shareLinkRow: { marginHorizontal: 20, marginTop: 16, backgroundColor: '#EEF2F6', borderRadius: 12, minHeight: 48, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  shareUrl: { flex: 1, color: '#1F2937', fontSize: 12, marginRight: 12 },
  shareCopy: { color: '#1A7BC4', fontSize: 13, fontWeight: '700' },
  shareExpiryRow: { marginHorizontal: 20, marginTop: 12, minHeight: 48, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  shareExpiryLbl: { color: '#374151', fontSize: 13, fontWeight: '600' },
  shareExpiryVal: { color: '#1A7BC4', fontSize: 13, fontWeight: '700' },
  shareSwitchRow: { marginHorizontal: 20, marginTop: 12, minHeight: 48, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  shareRevoke: { marginHorizontal: 20, marginTop: 14, height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#F5C2C7', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  shareRevokeTxt: { color: '#B91C1C', fontSize: 13, fontWeight: '700' },
});

