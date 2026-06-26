import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const ASSET = {
  splashLogo: 'https://www.figma.com/api/mcp/asset/73ba8f9d-5d4e-44bc-bc0d-0a7bdd8d9e45',
  healthIllus: 'https://www.figma.com/api/mcp/asset/44011342-c95a-4b70-829c-493f4d3544b0',
  healthBack: 'https://www.figma.com/api/mcp/asset/e278cebf-d067-4b9f-aa9b-dbc5188cdb00',
  healthBadge: 'https://www.figma.com/api/mcp/asset/f31159aa-28e6-4084-9a1f-ca7b9b406dd8',
  healthNext: 'https://www.figma.com/api/mcp/asset/242e8866-0f84-498c-8bb8-641caecaed4b',

  actIllus: 'https://www.figma.com/api/mcp/asset/287035dc-08a0-4b1f-b9ed-15f195226605',
  actBack: 'https://www.figma.com/api/mcp/asset/2f785859-7480-442f-aeca-31bb602768c2',
  actChip: 'https://www.figma.com/api/mcp/asset/bd690cb8-de36-4f31-96a5-c7e48f2606cc',
  actNext: 'https://www.figma.com/api/mcp/asset/8d796b4d-5b5d-4679-858b-ebebbd686cdc',

  loginLogo: 'https://www.figma.com/api/mcp/asset/75916971-4c76-4fa3-b642-f0ecd3ed0b96',
  loginGoogle: 'https://www.figma.com/api/mcp/asset/ca226210-6e9d-421e-a436-59d2bf0e8a1d',
  loginBg: 'https://www.figma.com/api/mcp/asset/14b28fac-e0fc-4030-a3f0-90d288390fa7',
  loginTop: 'https://www.figma.com/api/mcp/asset/4ba6abb8-f332-461f-a174-ff0744bd3195',

  otpHero: 'https://www.figma.com/api/mcp/asset/f4826bc9-79b8-490d-9812-b51be10996a6',
  otpLock: 'https://www.figma.com/api/mcp/asset/9c4fd608-a221-4940-be5a-0e96d44ee92e',
  otpBack: 'https://www.figma.com/api/mcp/asset/5445a23a-65e9-4a19-b9d6-fbe7dffdc63a',

  signupLogo: 'https://www.figma.com/api/mcp/asset/fcc1980a-014a-4980-8157-b103e9550195',
  signupGoogle: 'https://www.figma.com/api/mcp/asset/d25ac022-76ad-415f-a45b-312cdde89375',
  signupName: 'https://www.figma.com/api/mcp/asset/86c07f07-d6ff-4f80-88b0-7bb7c687ddfd',
  signupEmail: 'https://www.figma.com/api/mcp/asset/d3b0a50f-6305-4f0f-9cff-5d02fe6e3400',
  signupLock: 'https://www.figma.com/api/mcp/asset/585d077e-62f4-4967-b4a8-38ad90a1c887',
  signupEye: 'https://www.figma.com/api/mcp/asset/eb0c0b50-a2d9-4c15-ac2f-e6858efb9a12',
  signupApple: 'https://www.figma.com/api/mcp/asset/c98bdd83-1074-4e7b-9b27-063ef3aee4f4',

  profileTopAvatar: 'https://www.figma.com/api/mcp/asset/afb62911-9f4e-4a51-bc99-5850918da754',
  profileAvatar: 'https://www.figma.com/api/mcp/asset/b6e6aba4-4454-4fab-abf1-5c3e8276568e',
  profileStar: 'https://www.figma.com/api/mcp/asset/c6e38211-0e02-4385-b742-786c7befd0c5',
  petCooper: 'https://www.figma.com/api/mcp/asset/0ab42dba-3d5b-4be2-bb21-c7253b2fdcf7',
  petLuna: 'https://www.figma.com/api/mcp/asset/e6be2065-0f59-4dd1-8bab-efc985939d10',
  petMax: 'https://www.figma.com/api/mcp/asset/af769141-0c24-4214-8064-afbe11e4f349',
  bell: 'https://www.figma.com/api/mcp/asset/d24669f9-0838-4097-bc1a-28254f4fe957',
  shield: 'https://www.figma.com/api/mcp/asset/7bd86ec9-f940-460b-a90f-2551125545f8',
  plan: 'https://www.figma.com/api/mcp/asset/4e0f7492-7f84-41bb-ae8b-7db2727f3369',
  help: 'https://www.figma.com/api/mcp/asset/4daf59a5-c176-4cd0-8b10-6b21f63a257a',
  chevron: 'https://www.figma.com/api/mcp/asset/bd20259a-5505-4433-997a-38bec07e4044',
  logout: 'https://www.figma.com/api/mcp/asset/a6c2f4fa-6214-453b-9024-3d2f379d7930',
  edit: 'https://www.figma.com/api/mcp/asset/ae451dfb-976a-4eb0-90bc-06bde8117c18',
  navHome: 'https://www.figma.com/api/mcp/asset/edb447b3-983f-4c4b-9342-60f1ec553584',
  navHealth: 'https://www.figma.com/api/mcp/asset/7dc250d4-982f-4148-a57c-74870fe3c0ad',
  navActivity: 'https://www.figma.com/api/mcp/asset/595a10b7-d2e0-4b9e-b3c2-4f816559c009',
  navSettings: 'https://www.figma.com/api/mcp/asset/6efb6faf-e340-4e98-aa0a-f55cd99bc0de',
} as const;

type Screen = 'splash' | 'health' | 'activity' | 'login' | 'signup' | 'otp' | 'home' | 'profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');

  useEffect(() => {
    if (screen !== 'splash') return;
    const t = setTimeout(() => setScreen('health'), 2000);
    return () => clearTimeout(t);
  }, [screen]);

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
        {screen === 'home' && <HomeScreen onProfile={() => setScreen('profile')} />}
        {screen === 'profile' && <ProfileScreen onHome={() => setScreen('home')} onLogout={() => setScreen('login')} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function SplashScreen() {
  return (
    <View style={s.fill}>
      <View style={s.topGlow} />
      <View style={s.bottomGlow} />
      <View style={s.center}><Image source={{ uri: ASSET.splashLogo }} style={s.logo} /></View>
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
      <View style={s.onbHead}><View style={s.roundBtn}><Image source={{ uri: ASSET.healthBack }} style={s.icon14} /></View><TouchableOpacity onPress={onSkip}><Text style={s.skip}>Skip</Text></TouchableOpacity></View>
      <View style={s.onbBody}>
        <View style={s.card320}><Image source={{ uri: ASSET.healthIllus }} style={s.fillImg} /><View style={s.badge}><Image source={{ uri: ASSET.healthBadge }} style={s.icon12} /><Text style={s.badgeTxt}>Healthy</Text></View></View>
        <Text style={s.title}>Comprehensive Health{`\n`}Tracking</Text>
        <Text style={s.sub}>Keep all your pet&apos;s medical records,{`\n`}vaccinations, and vet appointments in{`\n`}one secure place.</Text>
      </View>
      <View style={s.onbFoot}><View style={s.row}><View style={s.indActiveDark} /><View style={s.indDotDark} /><View style={s.indDotDark} /></View><TouchableOpacity onPress={onNext}><View style={s.nextRingDark}><View style={s.nextCoreDark}><Image source={{ uri: ASSET.healthNext }} style={s.icon18} /></View></View></TouchableOpacity></View>
    </View>
  );
}

function ActivityScreen({ onBack, onNext, onSkip }: { onBack: () => void; onNext: () => void; onSkip: () => void }) {
  return (
    <View style={s.onbWrap}>
      <View style={s.onbHead}><TouchableOpacity style={s.roundBtnSm} onPress={onBack}><Image source={{ uri: ASSET.actBack }} style={s.icon14} /></TouchableOpacity><TouchableOpacity onPress={onSkip}><Text style={s.skip}>Skip</Text></TouchableOpacity></View>
      <View style={s.onbBody}>
        <View style={s.activityWrap}>
          <View style={s.chip}><View style={s.chipIconWrap}><Image source={{ uri: ASSET.actChip }} style={s.chipIcon} /></View><View><Text style={s.chipLbl}>Live Location</Text><Text style={s.chipVal}>Sunny Park</Text></View></View>
          <Image source={{ uri: ASSET.actIllus }} style={s.activityImg} />
        </View>
        <Text style={s.title}>Monitor Every Step</Text>
        <Text style={s.sub}>Track daily activity levels and GPS{`\n`}location in real-time with our integrated{`\n`}Smart Collar technology.</Text>
      </View>
      <View style={s.onbFoot}><View style={s.row}><View style={s.indDotLight} /><View style={s.indActiveLight} /><View style={s.indDotLight} /></View><TouchableOpacity onPress={onNext}><View style={s.nextRingLight}><View style={s.nextCoreLight}><Image source={{ uri: ASSET.actNext }} style={s.icon18} /></View></View></TouchableOpacity></View>
    </View>
  );
}

function LoginScreen({ onSend, onCreate }: { onSend: () => void; onCreate: () => void }) {
  return (
    <ScrollView contentContainerStyle={s.authWrap}>
      <View style={s.authTop}><Image source={{ uri: ASSET.loginTop }} style={s.topDecor} /><Image source={{ uri: ASSET.loginLogo }} style={s.authLogo} /><Text style={s.authTitle}>Welcome back</Text><Text style={s.authSub}>Sign in to your account and keep track{`\n`}of your pet&apos;s happiness.</Text></View>
      <View style={s.authCard}>
        <TouchableOpacity style={s.googleBtn}><Image source={{ uri: ASSET.loginGoogle }} style={s.icon24} /><Text style={s.googleTxt}>Continue with Google</Text></TouchableOpacity>
        <View style={s.divider}><View style={s.divLine} /><Text style={s.divTxt}>OR EMAIL</Text><View style={s.divLine} /></View>
        <Text style={s.lbl}>Email address</Text>
        <TextInput style={s.input} placeholder="pawsome@example.com" placeholderTextColor="rgba(86,67,55,0.4)" />
        <TouchableOpacity style={s.primary} onPress={onSend}><Text style={s.primaryTxt}>Send Login Link</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={s.loginCreate} onPress={onCreate}><Text style={s.loginCreateA}>New here? </Text><Text style={s.loginCreateB}>Create an account</Text></TouchableOpacity>
      <Image source={{ uri: ASSET.loginBg }} style={s.bottomDecor} />
      <View style={s.legalFoot}><Text style={s.legalMuted}>Privacy Policy</Text><Text style={s.legalMuted}>Terms of Service</Text><Text style={s.legalMuted}>Help Center</Text></View>
    </ScrollView>
  );
}

function SignupScreen({ onCreate, onLogin }: { onCreate: () => void; onLogin: () => void }) {
  return (
    <ScrollView contentContainerStyle={s.authWrap}>
      <View style={s.authCard}>
        <Image source={{ uri: ASSET.signupLogo }} style={s.authLogoSm} />
        <Text style={s.authTitle}>Join the Pack</Text>
        <Text style={s.authSub}>The best care for your furry{`\n`}companions starts here.</Text>

        <LabeledInput label="Full Name" placeholder="Enter your full name" icon={ASSET.signupName} />
        <LabeledInput label="Email Address" placeholder="example@email.com" icon={ASSET.signupEmail} />
        <LabeledInput label="Password" placeholder="Create a strong password" icon={ASSET.signupLock} rightIcon={ASSET.signupEye} secure />

        <View style={s.termsRow}><View style={s.checkbox} /><Text style={s.terms}>I agree to the <Text style={s.termsAccent}>Terms of Service</Text> and{`\n`}<Text style={s.termsAccent}>Privacy Policy</Text>.</Text></View>

        <TouchableOpacity style={s.primary} onPress={onCreate}><Text style={s.createTxt}>Create Account</Text></TouchableOpacity>

        <View style={s.divider}><View style={s.divLineStrong} /><Text style={s.divTxtMuted}>OR SIGN UP WITH</Text><View style={s.divLineStrong} /></View>

        <View style={s.socialRow}>
          <TouchableOpacity style={s.socialBtn}><Image source={{ uri: ASSET.signupGoogle }} style={s.icon20} /><Text style={s.socialTxt}>Google</Text></TouchableOpacity>
          <TouchableOpacity style={s.socialBtn}><Image source={{ uri: ASSET.signupApple }} style={s.appleIcon} /><Text style={s.socialTxt}>Apple</Text></TouchableOpacity>
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
  rightIcon,
  secure,
}: {
  label: string;
  placeholder: string;
  icon: string;
  rightIcon?: string;
  secure?: boolean;
}) {
  return (
    <View style={s.field}>
      <Text style={s.lblDark}>{label}</Text>
      <View style={s.inputRow}><Image source={{ uri: icon }} style={s.icon16} /><TextInput style={s.inputInline} placeholder={placeholder} placeholderTextColor="rgba(86,67,55,0.4)" secureTextEntry={secure} />{rightIcon ? <Image source={{ uri: rightIcon }} style={s.eye} /> : null}</View>
    </View>
  );
}

function OtpScreen({ onBack, onVerify }: { onBack: () => void; onVerify: () => void }) {
  return (
    <View style={s.otpWrap}>
      <View style={s.otpTop}><TouchableOpacity style={s.otpBack} onPress={onBack}><Image source={{ uri: ASSET.otpBack }} style={s.icon14} /></TouchableOpacity><Text style={s.otpBrand}>Pawos</Text><View style={s.blank} /></View>
      <View style={s.otpCard}><Image source={{ uri: ASSET.otpHero }} style={s.otpHero} /><Text style={s.otpTitle}>Verify your email</Text><Text style={s.otpSub}>We&apos;ve sent a code to your email. Enter{`\n`}the 4-digit numeric code below to{`\n`}proceed.</Text><View style={s.otpRow}><TextInput style={s.otpInput} maxLength={1} keyboardType="number-pad" /><TextInput style={s.otpInput} maxLength={1} keyboardType="number-pad" /><TextInput style={s.otpInput} maxLength={1} keyboardType="number-pad" /><TextInput style={s.otpInput} maxLength={1} keyboardType="number-pad" /></View><TouchableOpacity style={s.otpVerifyBtn} onPress={onVerify}><Text style={s.otpVerifyTxt}>Verify</Text></TouchableOpacity><Text style={s.otpHint}>Didn&apos;t receive the code?</Text><View style={s.row}><Text style={s.otpResend}>Resend code</Text><View style={s.otpDot} /><Text style={s.otpTime}>0:30s</Text></View></View>
      <View style={s.secure}><Image source={{ uri: ASSET.otpLock }} style={s.lock} /><Text style={s.secureTxt}>Secure 256-bit encrypted verification</Text></View>
    </View>
  );
}

function HomeScreen({ onProfile }: { onProfile: () => void }) {
  return (
    <View style={s.homeWrap}>
      <View style={s.homeTopGlow} />
      <ScrollView contentContainerStyle={s.homeContent} showsVerticalScrollIndicator={false}>
        <View style={s.homeHeader}>
          <TouchableOpacity onPress={onProfile} style={s.homeUserBtn}>
            <Image source={{ uri: ASSET.profileTopAvatar }} style={s.homeUserAvatar} />
          </TouchableOpacity>
          <Text style={s.homeBrand}>Pawos</Text>
          <View style={s.homeBellWrap}><AppIcon name="bell" size={18} color="#4F3D31" /></View>
        </View>

        <View style={s.homePetCard}>
          <Image source={{ uri: ASSET.petCooper }} style={s.homePetImg} />
          <View style={s.homePetBody}>
            <View style={s.row}><Text style={s.homePetName}>Cooper</Text><Text style={s.homeActive}>ACTIVE</Text></View>
            <View style={s.homeHealthPill}><AppIcon name="star" size={12} color="#9D620F" /><Text style={s.homeHealthTxt}>Excellent Health</Text></View>
          </View>
        </View>

        <View style={s.homeActions}>
          <HomeAction iconName="utensils" label="Feed" />
          <HomeAction iconName="plus-circle" label="Vet" />
          <HomeAction iconName="male" label="Walk" />
          <HomeAction iconName="history" label="Log" />
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
          <View>
            <Text style={s.homeRateTitle}>Heart Rate</Text>
            <Text style={s.homeRateValue}>72 <Text style={s.homeVitalUnit}>bpm</Text> ❤</Text>
          </View>
          <Text style={s.homeRateBars}>| | | | |</Text>
        </View>

        <View style={s.homeSectionHead}>
          <Text style={s.homeSectionTitle}>Upcoming Care</Text>
          <Text style={s.homeViewAll}>View All</Text>
        </View>
        <View style={s.homeCareCard}>
          <View style={s.homeDays}><Text style={s.homeDaysTxt}>5{`\n`}DAYS</Text></View>
          <View style={s.homeCareBody}><Text style={s.homeCareTitle}>Rabies Booster</Text><Text style={s.homeCareSub}>Urgent · Due Oct 12</Text></View>
          <TouchableOpacity style={s.homeBookBtn}><Text style={s.homeBookTxt}>Book</Text></TouchableOpacity>
        </View>

        <Text style={s.homeSectionTitle}>Recent Activity</Text>
        <View style={s.homeRecentCard}>
          <View style={s.homeRecentIcon}><AppIcon name="walk" size={16} color="#8A7264" /></View>
          <View style={s.homeRecentBody}><Text style={s.homeCareTitle}>Morning Walk</Text><Text style={s.homeCareSub}>08:50 AM · 45 mins</Text></View>
          <Text style={s.homeDistance}>2.4 km</Text>
        </View>
      </ScrollView>

      <View style={s.nav}><View style={s.navActive}><AppIcon name="home" size={18} color="#fff" /><Text style={s.navActiveTxt}>Home</Text></View><NavItem iconName="paw" label="Health" /><NavItem iconName="cut" label="Activity" /><TouchableOpacity style={s.navItem} onPress={onProfile}><AppIcon name="settings" size={18} color="#644B3C" /><Text style={s.navTxt}>Settings</Text></TouchableOpacity></View>
    </View>
  );
}

function HomeAction({ iconName, label }: { iconName: string; label: string }) {
  return <View style={s.homeAction}><AppIcon name={iconName} size={20} color="#644B3C" /><Text style={s.homeActionLabel}>{label}</Text></View>;
}

function ProfileScreen({ onHome, onLogout }: { onHome: () => void; onLogout: () => void }) {
  return (
    <View style={s.profileWrap}>
      <View style={s.profileTop}><View style={s.row}><Image source={{ uri: ASSET.profileTopAvatar }} style={s.topAvatar} /><Text style={s.profileTitle}>Profile</Text></View><Image source={{ uri: ASSET.edit }} style={s.icon18} /></View>
      <ScrollView contentContainerStyle={s.profileContent}>
        <View style={s.profileCard}><Image source={{ uri: ASSET.profileAvatar }} style={s.profileAvatar} /><View style={s.profileBody}><Text style={s.profileName}>Alex Harrison</Text><View style={s.premium}><Image source={{ uri: ASSET.profileStar }} style={s.icon12} /><Text style={s.premiumTxt}>Premium Member</Text></View></View></View>

        <View style={s.sectionHead}><Text style={s.sectionTitle}>My Pets</Text><Text style={s.addNew}>Add New</Text></View>
        <View style={s.pets}><Pet name="Cooper" img={ASSET.petCooper} color="#E67E22" /><Pet name="Luna" img={ASSET.petLuna} color="#D1E5F3" /><Pet name="Max" img={ASSET.petMax} color="#FADBD8" /></View>

        <Text style={s.sectionTitle}>App Settings</Text>
        <View style={s.settings}><Setting iconName="bell" title="Notifications" /><Setting iconName="shield" title="Privacy & Security" /><Setting iconName="desktop" title="Subscription Plan" trailing="Pro" /><Setting iconName="question-circle" title="Help & Support" last /></View>

        <TouchableOpacity style={s.logout} onPress={onLogout}><AppIcon name="logout" size={18} color="#E67E22" /><Text style={s.logoutTxt}>Log Out</Text></TouchableOpacity>
      </ScrollView>
      <View style={s.nav}><TouchableOpacity style={s.navItem} onPress={onHome}><AppIcon name="home" size={18} color="#644B3C" /><Text style={s.navTxt}>Home</Text></TouchableOpacity><NavItem iconName="paw" label="Health" /><NavItem iconName="cut" label="Activity" /><View style={s.navActive}><AppIcon name="settings" size={18} color="#fff" /><Text style={s.navActiveTxt}>Settings</Text></View></View>
    </View>
  );
}

function Pet({ name, img, color }: { name: string; img: string; color: string }) {
  return <View style={s.pet}><View style={[s.petRing, { backgroundColor: color }]}><Image source={{ uri: img }} style={s.petImg} /></View><Text style={s.petName}>{name}</Text></View>;
}

function Setting({ iconName, title, trailing, last }: { iconName: string; title: string; trailing?: string; last?: boolean }) {
  return <View style={[s.setting, !last && s.settingBorder]}><View style={s.row}><View style={s.settingIcon}><AppIcon name={iconName} size={16} color="#644B3C" /></View><Text style={s.settingTitle}>{title}</Text></View><View style={s.row}>{trailing ? <Text style={s.trailing}>{trailing}</Text> : null}<AppIcon name="chevron-right" size={12} color="#8A7264" /></View></View>;
}

function NavItem({ iconName, label }: { iconName: string; label: string }) {
  return <View style={s.navItem}><AppIcon name={iconName} size={18} color="#644B3C" /><Text style={s.navTxt}>{label}</Text></View>;
}

function AppIcon({ name, size = 18, color = '#644B3C' }: { name: string; size?: number; color?: string }) {
  const strokeW = Math.max(1.4, size * 0.09);
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
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6 3v7M9 3v7M6 7h3M7.5 10v11M15 3c2 0 3 2 3 4s-1 4-3 4v10" {...common} />
        </Svg>
      );
    case 'plus-circle':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="9" {...common} />
          <Path d="M12 8v8M8 12h8" {...common} />
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
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4M12 8v4l3 2" {...common} />
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
  card320: { width: '100%', maxWidth: 320, height: 320, borderRadius: 40, backgroundColor: '#fff', padding: 16, overflow: 'hidden', marginBottom: 20 },
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

  authWrap: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 24 },
  authTop: { alignItems: 'center' },
  topDecor: { position: 'absolute', left: -40, top: -40, width: 160, height: 180 },
  authLogo: { width: 120, height: 52, marginBottom: 24 },
  authLogoSm: { width: 111, height: 48, marginBottom: 16 },
  authTitle: { color: '#261810', fontSize: 28, lineHeight: 36, fontWeight: '700', marginBottom: 4, textAlign: 'center' },
  authSub: { color: '#564337', fontSize: 16, lineHeight: 24, textAlign: 'center', marginBottom: 24 },
  authCard: { backgroundColor: '#fff', borderRadius: 24, padding: 24 },
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
  inputInline: { flex: 1, color: '#564337' },
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
  otpCard: { marginTop: 8, borderRadius: 24, backgroundColor: '#fff', padding: 24, alignItems: 'center' },
  otpHero: { width: 90, height: 84, marginBottom: 16 },
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
  homeTopGlow: { position: 'absolute', left: -40, top: -20, width: 240, height: 220, borderBottomRightRadius: 120, borderBottomLeftRadius: 60, backgroundColor: '#FFE2C8' },
  homeContent: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 110 },
  homeHeader: { height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  homeUserBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#D58B33', overflow: 'hidden' },
  homeUserAvatar: { width: '100%', height: '100%' },
  homeBrand: { color: '#1A78C1', fontSize: 24, fontWeight: '700' },
  homeBellWrap: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  homePetCard: { borderRadius: 24, backgroundColor: '#FCEFD7', padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  homePetImg: { width: 86, height: 86, borderRadius: 43, borderWidth: 3, borderColor: '#fff' },
  homePetBody: { flex: 1, marginLeft: 10 },
  homePetName: { color: '#261810', fontSize: 38, lineHeight: 42, fontWeight: '800', marginRight: 8 },
  homeActive: { alignSelf: 'center', backgroundColor: '#DDF1D2', color: '#1F8A44', fontSize: 10, fontWeight: '700', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  homeHealthPill: { marginTop: 6, alignSelf: 'flex-start', borderRadius: 999, backgroundColor: '#F3C47D', paddingHorizontal: 12, paddingVertical: 7, flexDirection: 'row', alignItems: 'center' },
  homeHealthTxt: { color: '#663D0B', fontSize: 16, fontWeight: '600' },
  homeActions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  homeAction: { width: 76, height: 84, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 8 },
  homeActionLabel: { color: '#3E2F26', fontSize: 14 },
  homeSectionTitle: { color: '#261810', fontSize: 34, lineHeight: 40, fontWeight: '700', marginBottom: 10 },
  homeVitalsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  homeVitalCard: { width: '48.5%', minHeight: 144, borderRadius: 24, backgroundColor: '#fff', padding: 14 },
  homeVitalLabel: { color: '#4F3D31', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  homeVitalValue: { color: '#261810', fontSize: 34, fontWeight: '700' },
  homeVitalUnit: { color: '#6D5B50', fontSize: 18, fontWeight: '500' },
  homeVitalAccent: { color: '#00A66D', fontSize: 12, fontWeight: '700', marginTop: 2, letterSpacing: 1.2 },
  homeBarBg: { height: 6, borderRadius: 6, backgroundColor: '#E8E3E1', marginTop: 14, marginBottom: 6, overflow: 'hidden' },
  homeBarFill: { width: '62%', height: '100%', backgroundColor: '#F39A18' },
  homeMuted: { color: '#6D5B50', fontSize: 14 },
  homeActiveToday: { marginTop: 16 },
  homeRateCard: { borderRadius: 22, backgroundColor: '#fff', padding: 16, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  homeRateTitle: { color: '#4F3D31', fontSize: 15, marginBottom: 4 },
  homeRateValue: { color: '#261810', fontSize: 42, lineHeight: 48, fontWeight: '700' },
  homeRateBars: { color: '#F0A126', fontSize: 38, letterSpacing: 2, fontWeight: '700' },
  homeSectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  homeViewAll: { color: '#A65F00', fontSize: 20, fontWeight: '600', marginBottom: 10 },
  homeCareCard: { borderRadius: 20, backgroundColor: '#fff', padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  homeDays: { width: 54, height: 54, borderRadius: 14, backgroundColor: '#FFE0DF', alignItems: 'center', justifyContent: 'center' },
  homeDaysTxt: { color: '#B62828', textAlign: 'center', fontSize: 12, fontWeight: '700' },
  homeCareBody: { flex: 1, marginLeft: 10 },
  homeCareTitle: { color: '#261810', fontSize: 24, lineHeight: 28, fontWeight: '700' },
  homeCareSub: { color: '#6D5B50', fontSize: 14 },
  homeBookBtn: { height: 38, borderRadius: 999, paddingHorizontal: 22, backgroundColor: '#A65F00', alignItems: 'center', justifyContent: 'center' },
  homeBookTxt: { color: '#fff', fontSize: 18, fontWeight: '700' },
  homeRecentCard: { borderRadius: 20, backgroundColor: '#fff', padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  homeRecentIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFEADF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  homeRecentBody: { flex: 1 },
  homeDistance: { color: '#7059F6', fontSize: 22, fontWeight: '700' },

  profileWrap: { flex: 1, backgroundColor: '#FFF8F5', paddingTop: 8 },
  profileTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8 },
  topAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 16 },
  profileTitle: { color: '#944A00', fontSize: 20, fontWeight: '600' },
  profileContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 130, gap: 20 },
  profileCard: { backgroundColor: '#fff', borderRadius: 12, padding: 24, flexDirection: 'row', alignItems: 'center', gap: 16 },
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
  settings: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' },
  setting: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 22 },
  settingBorder: { borderBottomWidth: 1, borderBottomColor: '#FFF8F5' },
  settingIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFEADF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  settingTitle: { color: '#261810', fontSize: 16 },
  trailing: { color: '#944A00', fontSize: 14, fontWeight: '600', marginRight: 6 },
  chevron: { width: 8, height: 12 },
  logout: { height: 56, borderRadius: 16, borderWidth: 2, borderColor: '#E67E22', backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  logoutTxt: { color: '#E67E22', fontSize: 16 },
  nav: { position: 'absolute', left: 20, right: 20, bottom: 16, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.85)', paddingVertical: 8, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  navItem: { width: 64, height: 48, alignItems: 'center', justifyContent: 'center', gap: 4 },
  navTxt: { color: '#564337', fontSize: 10 },
  navActive: { width: 80, height: 56, borderRadius: 999, backgroundColor: '#E67E22', alignItems: 'center', justifyContent: 'center', gap: 2 },
  navActiveTxt: { color: '#fff', fontSize: 11, fontWeight: '600' },
});

