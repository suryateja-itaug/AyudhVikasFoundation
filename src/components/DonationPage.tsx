import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Banknote,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Droplet,
  FileBadge,
  GraduationCap,
  Heart,
  HeartHandshake,
  HeartPulse,
  Home,
  Landmark,
  MapPin,
  Pill,
  Search,
  ShieldCheck,
  Shirt,
  Stethoscope,
  Syringe,
  Upload,
  UserRound,
  Users,
  Utensils,
} from 'lucide-react';
import { api } from '../lib/api';
import familyHeroImage from '../assets/images/indian_family_hero_1785560495834.jpg';
import supportHeroImage from '../assets/images/support_agent_female_1785560510481.jpg';

interface DonationPageProps {
  onBackToHome: () => void;
}

type Flow = 'types' | 'money' | 'support' | 'organ' | 'blood' | 'inkind';

const donationTypes = [
  { id: 'food', title: 'Food Donation', telugu: 'ఆహార దానం', action: 'Donate Now', icon: Utensils, accent: 'bg-orange-500' },
  { id: 'medicine', title: 'Medicine Donation', telugu: 'మందుల సహాయం', action: 'Offer Help', icon: Pill, accent: 'bg-emerald-700' },
  { id: 'clothes', title: 'Clothes Donation', telugu: 'దుస్తుల దానం', action: 'Donate Now', icon: Shirt, accent: 'bg-orange-500' },
  { id: 'money', title: 'Money Donation', telugu: 'నగదు దానం', action: 'Contribute', icon: Banknote, accent: 'bg-emerald-700' },
  { id: 'housing', title: 'House Fee Support', telugu: 'ఇల్లు/ఫీజు సహాయం', action: 'Sponsor', icon: Home, accent: 'bg-emerald-700' },
  { id: 'books', title: 'Books Donation', telugu: 'పుస్తకాల దానం', action: 'Donate Books', icon: BookOpen, accent: 'bg-emerald-700' },
  { id: 'stationery', title: 'Stationery Donation', telugu: 'విద్యా సామగ్రి', action: 'Donate', icon: Landmark, accent: 'bg-emerald-700' },
  { id: 'blood', title: 'Blood Donation', telugu: 'రక్తదానం', action: 'Register as Donor', icon: Droplet, accent: 'bg-red-700' },
  { id: 'organ', title: 'Organ Donation', telugu: 'అవయవదానం', action: 'Pledge Now', icon: HeartPulse, accent: 'bg-emerald-700' },
  { id: 'equipment', title: 'Medical Equipment Donation', telugu: 'వైద్య పరికరాలు', action: 'Donate / Lend', icon: Stethoscope, accent: 'bg-orange-500' },
  { id: 'education', title: 'Education Support', telugu: 'విద్యా సహాయం', action: 'Sponsor a Child', icon: GraduationCap, accent: 'bg-emerald-700' },
];

const amountOptions = ['500', '1000', '2000', '5000', '10000'];
const causes = ['Any urgent patient medical support', 'Sponsor a child education', 'Food support for patient family', 'Medicine support for chronic care', 'Health camp diagnostics support'];
const paymentMethods = ['Credit/Debit Card', 'Net Banking', 'UPI', 'Direct QR Code'];
const districts = ['Warangal', 'Hanamkonda', 'Mulugu', 'Jangaon', 'Mahabubabad', 'Bhupalpally'];
const mandals = ['Hanamkonda', 'Kazipet', 'Warangal', 'Parkal', 'Narsampet', 'Mulugu'];

export const DonationPage: React.FC<DonationPageProps> = ({ onBackToHome }) => {
  const [mode, setMode] = useState<'donate' | 'support'>('donate');
  const [activeFlow, setActiveFlow] = useState<Flow>('types');
  const [selected, setSelected] = useState(donationTypes[0]);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState(causes[1]);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [panCard, setPanCard] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const [supportForm, setSupportForm] = useState({
    fullName: '',
    address: '',
    phone: '',
    aadhaar: '',
    category: 'For Education',
    priority: 'Emergency',
    need: '',
  });
  const [supportDocs, setSupportDocs] = useState<Record<string, string>>({});

  const [organForm, setOrganForm] = useState({
    fullName: '',
    mobile: '',
    dateOfBirth: '',
    gender: '',
    pledgeType: 'pledge',
    district: '',
    mandal: '',
    village: '',
    pincode: '',
    message: '',
    consent: false,
  });

  const [bloodForm, setBloodForm] = useState({
    fullName: '',
    mobile: '',
    alternateMobile: '',
    donorNumber: '',
    dateOfBirth: '',
    bloodGroup: '',
    lastDonationDate: '',
    totalDonations: '',
    district: '',
    mandal: '',
    village: '',
    pincode: '',
    hideDetails: false,
    aadhaar: '',
    certificate: '',
    awards: '',
    recognition: '',
  });

  const activeAmount = customAmount || amount;
  const headline = useMemo(() => (mode === 'donate' ? 'మీ సహాయం ఒక జీవితంలో మార్పు' : 'మాకు మీ అవసరం చెప్పండి'), [mode]);

  const chooseDonationType = (item: typeof donationTypes[number]) => {
    setSelected(item);
    setSubmitted(false);
    if (item.id === 'money') setActiveFlow('money');
    else if (item.id === 'organ') setActiveFlow('organ');
    else if (item.id === 'blood') setActiveFlow('blood');
    else setActiveFlow('inkind');
  };

  const saveEnquiry = async (payload: any) => {
    setSaving(true);
    setSubmitted(false);
    try {
      await api.create('enquiries', {
        ...payload,
        status: 'New',
        requestedAt: new Date().toISOString(),
        source: 'donation_page',
      });
      setSubmitted(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full bg-[#f4faf8] text-slate-900 font-sans">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={onBackToHome} className="mb-5 flex items-center gap-2 text-xs font-black text-slate-600 hover:text-emerald-700">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <section className="text-center max-w-4xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">Donate & Support Network</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-black text-slate-950 leading-tight">మీ సహాయం - ఒకరి జీవితంలో మార్పు</h1>
          <p className="mt-3 text-sm md:text-base font-bold text-slate-600">
            మీ దానం ఆహారం, మందులు, విద్య, రక్తదానం లేదా వైద్య సహాయంగా అవసరమైన కుటుంబాలకు చేరుతుంది.
          </p>
        </section>

        <section className="mt-8 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              setMode('donate');
              setActiveFlow('types');
              setSubmitted(false);
            }}
            className={`h-16 rounded-lg shadow-sm border text-white font-black transition-all ${mode === 'donate' ? 'bg-emerald-700 border-emerald-800 scale-[1.01]' : 'bg-emerald-600 border-emerald-700'}`}
          >
            <span className="block text-lg">I Want to Donate</span>
            <span className="block text-xs opacity-90">నేను సహాయం చేయదలచుకున్నాను</span>
          </button>
          <button
            onClick={() => {
              setMode('support');
              setActiveFlow('support');
              setSubmitted(false);
            }}
            className={`h-16 rounded-lg shadow-sm border text-white font-black transition-all ${mode === 'support' ? 'bg-blue-700 border-blue-800 scale-[1.01]' : 'bg-blue-600 border-blue-700'}`}
          >
            <span className="block text-lg">I Need Support</span>
            <span className="block text-xs opacity-90">నాకు సహాయం కావాలి</span>
          </button>
        </section>

        {activeFlow === 'types' && (
          <>
            <section className="mt-7 text-center">
              <h2 className="text-xl md:text-2xl font-black text-slate-900">{headline}</h2>
              <p className="text-sm font-black text-slate-700 mt-1">Choose Donation Type - విరాళం రకాన్ని ఎంచుకోండి</p>
            </section>

            <section className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {donationTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => chooseDonationType(item)} className="text-left rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-800" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-black text-slate-900 leading-tight">{item.title}</div>
                        <div className="text-sm font-black text-slate-600">{item.telugu}</div>
                      </div>
                    </div>
                    <div className={`mt-4 h-9 rounded-md text-white text-xs font-black flex items-center justify-center ${item.accent}`}>
                      {item.action}
                    </div>
                  </button>
                );
              })}
            </section>
          </>
        )}

        <section className="mt-8">
          {activeFlow === 'money' && (
            <MoneyDonationForm
              amount={amount}
              customAmount={customAmount}
              activeAmount={activeAmount}
              cause={cause}
              donorName={donorName}
              donorPhone={donorPhone}
              donorEmail={donorEmail}
              panCard={panCard}
              paymentMethod={paymentMethod}
              submitted={submitted}
              setAmount={setAmount}
              setCustomAmount={setCustomAmount}
              setCause={setCause}
              setDonorName={setDonorName}
              setDonorPhone={setDonorPhone}
              setDonorEmail={setDonorEmail}
              setPanCard={setPanCard}
              setPaymentMethod={setPaymentMethod}
              setSubmitted={setSubmitted}
              onBack={() => setActiveFlow('types')}
            />
          )}

          {activeFlow === 'support' && (
            <SupportRequestForm
              form={supportForm}
              docs={supportDocs}
              saving={saving}
              submitted={submitted}
              setForm={setSupportForm}
              setDocs={setSupportDocs}
              onSubmit={() => saveEnquiry({
                type: 'support_seeker',
                fullName: supportForm.fullName,
                presentAddress: supportForm.address,
                phone: supportForm.phone,
                aadhaarNumber: supportForm.aadhaar,
                supportCategory: supportForm.category,
                priority: supportForm.priority,
                needDescription: supportForm.need,
                documents: supportDocs,
              })}
            />
          )}

          {activeFlow === 'organ' && (
            <OrganDonationForm
              form={organForm}
              saving={saving}
              submitted={submitted}
              setForm={setOrganForm}
              onBack={() => setActiveFlow('types')}
              onSubmit={() => saveEnquiry({ type: 'organ_donation_pledge', ...organForm })}
            />
          )}

          {activeFlow === 'blood' && (
            <BloodDonationForm
              form={bloodForm}
              saving={saving}
              submitted={submitted}
              setForm={setBloodForm}
              onBack={() => setActiveFlow('types')}
              onSubmit={() => saveEnquiry({ type: 'blood_donor_registration', ...bloodForm })}
            />
          )}

          {activeFlow === 'inkind' && (
            <InKindHelp selected={selected} onBack={() => setActiveFlow('types')} />
          )}
        </section>
      </main>
    </div>
  );
};

function BackToTypes({ onBack, tone = 'emerald' }: { onBack?: () => void; tone?: 'emerald' | 'red' | 'blue' }) {
  if (!onBack) return null;
  const toneClass = tone === 'red' ? 'text-red-700' : tone === 'blue' ? 'text-blue-700' : 'text-emerald-700';
  return (
    <button onClick={onBack} className={`mb-4 text-xs font-black ${toneClass} flex items-center gap-1`}>
      <ArrowLeft className="w-3.5 h-3.5" />
      Back to donation types
    </button>
  );
}

function MoneyDonationForm(props: any) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.setSubmitted(true);
      }}
      className="max-w-4xl mx-auto rounded-xl border border-emerald-100 bg-white p-4 md:p-5 shadow-sm"
    >
      <BackToTypes onBack={props.onBack} />
      <h3 className="text-center text-2xl md:text-3xl font-black text-slate-950">నగదు విరాళం - మీ వివరాలు నమోదు చేయండి</h3>
      <div className="mt-5 rounded-xl overflow-hidden bg-slate-900 text-white min-h-[150px] relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: `url(${familyHeroImage})` }} />
        <div className="absolute inset-y-0 left-0 w-full md:w-[58%] bg-emerald-800/80" />
        <div className="relative p-5 md:p-7 max-w-xl">
          <h4 className="text-2xl font-black">I Want to Donate</h4>
          <p className="mt-2 text-sm font-semibold text-emerald-50">Enter your details and choose how your donation should support families through Ayudh Vikas Foundation.</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <FieldGroup label="Choose Donation Amount">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {amountOptions.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  props.setAmount(value);
                  props.setCustomAmount('');
                }}
                className={`h-10 rounded-lg border text-sm font-black ${!props.customAmount && props.amount === value ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300'}`}
              >
                Rs. {value}
              </button>
            ))}
          </div>
          <input value={props.customAmount} onChange={(event) => props.setCustomAmount(event.target.value.replace(/[^\d]/g, ''))} placeholder="Custom Amount" className="mt-2 w-full sm:w-56 h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-500" />
        </FieldGroup>

        <FieldGroup label="Cause Sponsorship (Optional)">
          <select value={props.cause} onChange={(event) => props.setCause(event.target.value)} className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-500 bg-white">
            {causes.map((item) => <option key={item}>{item}</option>)}
          </select>
        </FieldGroup>

        <FieldGroup label="Your Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required value={props.donorName} onChange={(event) => props.setDonorName(event.target.value)} placeholder="Name" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-500" />
            <input required value={props.donorPhone} onChange={(event) => props.setDonorPhone(event.target.value)} placeholder="Phone Number" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-500" />
            <input value={props.donorEmail} onChange={(event) => props.setDonorEmail(event.target.value)} placeholder="Email" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-500" />
            <input value={props.panCard} onChange={(event) => props.setPanCard(event.target.value.toUpperCase())} placeholder="PAN Card (for tax exemption)" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-500" />
          </div>
        </FieldGroup>

        <FieldGroup label="Payment Method">
          <RadioTiles options={paymentMethods} value={props.paymentMethod} onChange={props.setPaymentMethod} tone="emerald" />
        </FieldGroup>
      </div>

      <button className="mt-5 w-full h-12 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm">విరాళం పంపండి (Complete Donation) - Rs. {props.activeAmount}</button>
      <p className="mt-3 text-center text-xs font-semibold text-slate-500">Footer info: donations may be eligible for 80G tax exemption. Our team will verify and share receipts.</p>
      {props.submitted && <SuccessMessage>Thank you {props.donorName || 'Donor'}. Rs. {props.activeAmount} is selected for {props.cause} via {props.paymentMethod}. We will contact {props.donorPhone || 'your phone number'} shortly.</SuccessMessage>}
      <div className="mt-5 text-center text-xs font-black text-slate-700">Ayudh Vikas Foundation<br />+88 92367667526</div>
    </form>
  );
}

function SupportRequestForm({ form, docs, saving, submitted, setForm, setDocs, onSubmit }: any) {
  const update = (patch: any) => setForm((prev: any) => ({ ...prev, ...patch }));
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="max-w-4xl mx-auto rounded-xl border border-blue-100 bg-white p-4 md:p-5 shadow-sm"
    >
      <h3 className="text-center text-2xl md:text-3xl font-black text-slate-950">సహాయం కోసం అభ్యర్థన - వివరాలు నమోదు చేయండి</h3>
      <div className="mt-5 rounded-xl overflow-hidden bg-slate-900 text-white min-h-[150px] relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${supportHeroImage})` }} />
        <div className="absolute inset-y-0 left-0 w-full md:w-[58%] bg-blue-700/80" />
        <div className="relative p-5 md:p-7 max-w-xl">
          <h4 className="text-2xl font-black">I Need Support</h4>
          <p className="mt-2 text-sm font-semibold text-blue-50">Continue for support. Our counsellor and health care team can check your request and guide next steps.</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <FieldGroup label="Personal Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required value={form.fullName} onChange={(event) => update({ fullName: event.target.value })} placeholder="Full Name" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-blue-500" />
            <input required value={form.address} onChange={(event) => update({ address: event.target.value })} placeholder="Present Address (చిరునామా)" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-blue-500" />
            <input required value={form.phone} onChange={(event) => update({ phone: event.target.value })} placeholder="Phone Number" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-blue-500" />
            <input value={form.aadhaar} onChange={(event) => update({ aadhaar: event.target.value.replace(/[^\d]/g, '').slice(0, 12) })} placeholder="Aadhaar Number" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-blue-500" />
          </div>
        </FieldGroup>
        <FieldGroup label="Support Category">
          <select value={form.category} onChange={(event) => update({ category: event.target.value })} className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-blue-500 bg-white">
            {['For Education', 'Medical Emergency', 'Medicine Support', 'Food Support', 'Hospital Visit Support', 'Other Social Support'].map((item) => <option key={item}>{item}</option>)}
          </select>
        </FieldGroup>
        <FieldGroup label="Priority / Urgency">
          <RadioTiles options={['Emergency', 'High priority', 'Standard']} value={form.priority} onChange={(value: string) => update({ priority: value })} tone="blue" />
        </FieldGroup>
        <FieldGroup label="Upload Documents / Proofs">
          <UploadProofs docs={docs} setDocs={setDocs} tone="blue" />
        </FieldGroup>
        <FieldGroup label="Briefly Describe Your Need">
          <textarea required value={form.need} onChange={(event) => update({ need: event.target.value })} placeholder="మీ అవసరం గురించి క్లుప్తంగా వివరించండి..." className="w-full min-h-24 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500" />
        </FieldGroup>
      </div>
      <button disabled={saving} className="mt-5 w-full h-12 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-black text-sm">{saving ? 'Submitting...' : 'సమర్పించండి (Submit Request)'}</button>
      {submitted && <SuccessMessage>Your support request has been submitted. Admin team can now review it under Support Seekers.</SuccessMessage>}
    </form>
  );
}

function OrganDonationForm({ form, saving, submitted, setForm, onSubmit, onBack }: any) {
  const update = (patch: any) => setForm((prev: any) => ({ ...prev, ...patch }));
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }} className="space-y-4">
      <BackToTypes onBack={onBack} />
      <HeroPanel tone="organ" title="Organ Donation" subtitle="Pledge & Awareness" quote="Give the Gift of Life" />
      <FeatureStrip tone="organ" items={[
        [Users, 'Why Organ Donation?', 'Save lives, give hope'],
        [UserRound, 'Who Can Pledge?', 'Anyone above 18 years'],
        [ClipboardCheck, 'How It Works?', 'Simple & secure process'],
        [ShieldCheck, 'Official Registration', 'Through Govt. portal'],
        [CircleHelp, 'FAQ', 'Answers to common questions'],
      ]} />
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_220px] gap-4">
        <InfoSidebar tone="organ" title="Information Sections" items={[
          [HeartPulse, 'Why Organ Donation?', 'Know the importance'],
          [UserRound, 'Who Can Pledge?', 'Eligibility & conditions'],
          [ClipboardCheck, 'Organ Donation Process', 'Step by step guide'],
          [FileBadge, 'Official Registration', 'Govt. of India portal'],
          [Users, 'Family Awareness', 'Support & awareness'],
          [CircleHelp, 'Frequently Asked Questions', 'Ask your questions'],
        ]} />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-emerald-600 text-white flex items-center justify-center"><ClipboardCheck className="w-6 h-6" /></div>
            <div>
              <h3 className="text-xl font-black text-slate-950">Organ Donation Pledge / Enrollment</h3>
              <p className="text-sm font-semibold text-slate-600">Fill the details below to take your pledge or get more information.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Full Name *" value={form.fullName} onChange={(value) => update({ fullName: value })} placeholder="Enter your birth name" required />
            <Input label="Mobile Number *" value={form.mobile} onChange={(value) => update({ mobile: value })} placeholder="Enter mobile number" required />
            <Input label="Age / Date of Birth *" value={form.dateOfBirth} onChange={(value) => update({ dateOfBirth: value })} placeholder="DD / MM / YYYY" required />
            <Select label="Gender *" value={form.gender} onChange={(value) => update({ gender: value })} options={['Male', 'Female', 'Other']} placeholder="Select Gender" />
          </div>
          <FieldGroup label="Pledge Type">
            <RadioTiles options={['I agree to take Organ Donation Pledge', 'I want more information']} value={form.pledgeType === 'pledge' ? 'I agree to take Organ Donation Pledge' : 'I want more information'} onChange={(value: string) => update({ pledgeType: value.includes('agree') ? 'pledge' : 'info' })} tone="emerald" />
          </FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <Select label="District *" value={form.district} onChange={(value) => update({ district: value })} options={districts} placeholder="Select District" />
            <Select label="Mandal *" value={form.mandal} onChange={(value) => update({ mandal: value })} options={mandals} placeholder="Select Mandal" />
            <Input label="Area / Village *" value={form.village} onChange={(value) => update({ village: value })} placeholder="Enter area / Village" required />
            <Input label="Pincode" value={form.pincode} onChange={(value) => update({ pincode: value })} placeholder="Enter Pincode" />
          </div>
          <FieldGroup label="Additional Information / Message">
            <textarea value={form.message} onChange={(event) => update({ message: event.target.value })} placeholder="Enter your message optional..." className="w-full min-h-20 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold outline-none focus:border-emerald-500" />
          </FieldGroup>
          <label className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-700">
            <input type="checkbox" checked={form.consent} onChange={(event) => update({ consent: event.target.checked })} />
            I agree to be contacted by Ayudh Vikas Foundation regarding organ donation.
          </label>
          <div className="mt-4 flex gap-3">
            <button disabled={saving} className="h-11 px-8 rounded-lg bg-emerald-700 text-white text-sm font-black">{saving ? 'Submitting...' : 'Submit Pledge'}</button>
            <button type="button" onClick={() => update({ fullName: '', mobile: '', dateOfBirth: '', gender: '', district: '', mandal: '', village: '', pincode: '', message: '', consent: false })} className="h-11 px-8 rounded-lg border border-slate-300 text-slate-700 text-sm font-black">Reset</button>
          </div>
          {submitted && <SuccessMessage>Your organ donation pledge has been submitted. Our team will contact you.</SuccessMessage>}
        </div>
        <RightHopePanel tone="organ" />
      </div>
    </form>
  );
}

function BloodDonationForm({ form, saving, submitted, setForm, onSubmit, onBack }: any) {
  const update = (patch: any) => setForm((prev: any) => ({ ...prev, ...patch }));
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }} className="space-y-4">
      <BackToTypes onBack={onBack} tone="red" />
      <HeroPanel tone="blood" title="Blood Donation Network" subtitle="Give Blood | Save Lives | Build a Healthier Tomorrow" quote="A single drop of blood can make a huge difference in someone's life." />
      <FeatureStrip tone="blood" items={[
        [Search, 'Find a Donor', 'Search available donors'],
        [Droplet, 'Request Blood', 'For emergency or planned'],
        [CalendarDays, 'Blood Camps', 'Upcoming & past camps'],
        [Award, 'Donor Recognition', 'Certificates & awards'],
      ]} />
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_220px] gap-4">
        <InfoSidebar tone="blood" title="Blood Donation" items={[
          [UserRound, 'Register as Donor', 'Join our donor network'],
          [Droplet, 'Request Blood', 'For emergency / planned'],
          [Users, 'Donor Directory', 'Search by blood group'],
          [CalendarDays, 'Blood Camps', 'Upcoming & past camps'],
          [Award, 'Awards & Recognition', 'Certificates & achievements'],
          [CircleHelp, 'FAQs', 'Common questions'],
        ]} />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-2 mb-4 overflow-hidden rounded-lg">
            <div className="h-11 bg-red-700 text-white flex items-center justify-center text-sm font-black">I WANT TO DONATE BLOOD</div>
            <div className="h-11 bg-slate-100 text-slate-900 flex items-center justify-center text-sm font-black">I Need Blood</div>
          </div>
          <h3 className="text-lg font-black text-slate-950 flex items-center gap-2"><Droplet className="w-5 h-5 text-red-700" /> Donor Enrollment Form</h3>
          <p className="text-sm font-semibold text-slate-600 mb-3">Fill the details to join our blood donor network.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Full Name *" value={form.fullName} onChange={(value) => update({ fullName: value })} placeholder="Enter full name" required />
            <Input label="Mobile Number *" value={form.mobile} onChange={(value) => update({ mobile: value })} placeholder="Enter mobile number" required />
            <Input label="Alternate Mobile" value={form.alternateMobile} onChange={(value) => update({ alternateMobile: value })} placeholder="Enter alternate Mobile" />
            <Input label="Donor ID / Card Number" value={form.donorNumber} onChange={(value) => update({ donorNumber: value })} placeholder="Enter donor card number if available" />
            <Input label="Date of Birth / Age *" value={form.dateOfBirth} onChange={(value) => update({ dateOfBirth: value })} placeholder="DD/MM/YYYY" required />
            <Select label="Blood Group *" value={form.bloodGroup} onChange={(value) => update({ bloodGroup: value })} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} placeholder="Select Blood Group" />
            <Input label="Last Donation Date" value={form.lastDonationDate} onChange={(value) => update({ lastDonationDate: value })} placeholder="DD/MM/YYYY" />
            <Input label="Total Donors (if any)" value={form.totalDonations} onChange={(value) => update({ totalDonations: value })} placeholder="Enter number" />
            <Select label="District *" value={form.district} onChange={(value) => update({ district: value })} options={districts} placeholder="Select District" />
            <Select label="Mandal *" value={form.mandal} onChange={(value) => update({ mandal: value })} options={mandals} placeholder="Select Mandal" />
            <Select label="Area / Village *" value={form.village} onChange={(value) => update({ village: value })} options={['Hanamkonda', 'Subedari', 'Kazipet', 'Warangal', 'Other']} placeholder="Select Area / Village" />
            <Input label="Pincode" value={form.pincode} onChange={(value) => update({ pincode: value })} placeholder="Enter pincode" />
            <Input label="Aadhaar Number (Optional)" value={form.aadhaar} onChange={(value) => update({ aadhaar: value })} placeholder="Enter full name" />
            <label className="text-xs font-black text-slate-800">
              Upload Donation Certificate
              <input type="file" onChange={(event) => update({ certificate: event.target.files?.[0]?.name || '' })} className="mt-1 w-full h-10 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold" />
            </label>
            <Input label="Awards & Recognition (if any)" value={form.awards} onChange={(value) => update({ awards: value })} placeholder="Enter awards or certificates" />
            <Input label="Previous Donation Details" value={form.recognition} onChange={(value) => update({ recognition: value })} placeholder="Enter donation history if any" />
          </div>
          <label className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-700">
            <input type="checkbox" checked={form.hideDetails} onChange={(event) => update({ hideDetails: event.target.checked })} />
            Hide My Details (Only Blood Group will be shown in network)
          </label>
          <div className="mt-4 flex gap-3 justify-end">
            <button disabled={saving} className="h-11 px-8 rounded-lg bg-red-700 text-white text-sm font-black">{saving ? 'Submitting...' : 'Register as Donor'}</button>
            <button type="button" onClick={() => update({ fullName: '', mobile: '', alternateMobile: '', donorNumber: '', dateOfBirth: '', bloodGroup: '', lastDonationDate: '', totalDonations: '', district: '', mandal: '', village: '', pincode: '', hideDetails: false, aadhaar: '', certificate: '', awards: '', recognition: '' })} className="h-11 px-8 rounded-lg border border-red-200 text-red-700 text-sm font-black">Reset</button>
          </div>
          {submitted && <SuccessMessage>Your blood donor registration has been submitted. Our team will verify and contact you.</SuccessMessage>}
        </div>
        <RightHopePanel tone="blood" />
      </div>
    </form>
  );
}

function InKindHelp({ selected, onBack }: any) {
  return (
    <div className="max-w-4xl mx-auto rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
      <BackToTypes onBack={onBack} />
      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
        {React.createElement(selected.icon, { className: 'w-6 h-6 text-emerald-700' })}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-black text-slate-950">{selected.title}</h3>
        <p className="text-sm font-bold text-slate-600 mt-1">This donation type needs coordination from our support team. Select Money Donation for online payment, or contact us to arrange {selected.title.toLowerCase()}.</p>
      </div>
      <a href="tel:08704210820" className="h-11 px-5 rounded-lg bg-emerald-700 text-white text-sm font-black flex items-center justify-center">Contact Team</a>
    </div>
  );
}

function HeroPanel({ tone, title, subtitle, quote }: { tone: 'organ' | 'blood'; title: string; subtitle: string; quote: string }) {
  const isBlood = tone === 'blood';
  return (
    <div className={`rounded-xl overflow-hidden border ${isBlood ? 'border-red-100 bg-red-50' : 'border-emerald-100 bg-emerald-50'}`}>
      <div className="min-h-[180px] relative grid grid-cols-1 md:grid-cols-[260px_1fr_240px]">
        <div className={`hidden md:flex items-center justify-center ${isBlood ? 'bg-red-100' : 'bg-emerald-100'}`}>
          {isBlood ? <Droplet className="w-24 h-24 text-red-700" /> : <HeartPulse className="w-24 h-24 text-emerald-700" />}
        </div>
        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-4xl font-black text-slate-950">{title}</h2>
          <div className={`text-2xl font-black mt-1 ${isBlood ? 'text-red-700' : 'text-emerald-700'}`}>{subtitle}</div>
          <p className="mt-4 text-lg font-bold text-slate-700">{quote}</p>
        </div>
        <div className={`p-6 flex flex-col justify-center items-center text-center ${isBlood ? 'text-red-800' : 'text-emerald-800'}`}>
          {isBlood ? <Droplet className="w-20 h-20" /> : <BadgeCheck className="w-20 h-20" />}
          <div className="mt-2 text-2xl font-black italic">{isBlood ? 'Donate Blood Save Lives' : 'Be a Donor Be a Hero'}</div>
        </div>
      </div>
    </div>
  );
}

function FeatureStrip({ items, tone }: { items: Array<[any, string, string]>; tone: 'organ' | 'blood' }) {
  const color = tone === 'blood' ? 'text-red-700 bg-red-50' : 'text-emerald-700 bg-emerald-50';
  return (
    <div className={`grid gap-3 ${items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'} sm:grid-cols-2 grid-cols-1`}>
      {items.map(([Icon, title, subtitle]) => (
        <div key={title} className="rounded-lg border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-sm">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}><Icon className="w-6 h-6" /></div>
          <div>
            <div className="font-black text-slate-900 text-sm">{title}</div>
            <div className="text-xs font-semibold text-slate-500">{subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoSidebar({ title, items, tone }: { title: string; items: Array<[any, string, string]>; tone: 'organ' | 'blood' }) {
  const header = tone === 'blood' ? 'bg-red-700' : 'bg-[#0d4a73]';
  const iconClass = tone === 'blood' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-[#0d4a73] border-emerald-100';
  return (
    <aside className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className={`${header} text-white px-4 py-3 font-black`}>{title}</div>
      <div className="divide-y divide-slate-100">
        {items.map(([Icon, label, sub]) => (
          <div key={label} className="p-3 flex gap-3">
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${iconClass}`}><Icon className="w-5 h-5" /></div>
            <div>
              <div className="font-black text-slate-900 text-sm">{label}</div>
              <div className="text-xs font-semibold text-slate-500">{sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${tone === 'blood' ? 'bg-red-50 text-red-900' : 'bg-emerald-50 text-slate-800'} m-3 rounded-lg p-3 text-xs font-semibold`}>
        <strong>Note:</strong> Ayudh Vikas Foundation facilitates counselling, awareness, and registration assistance.
      </div>
    </aside>
  );
}

function RightHopePanel({ tone }: { tone: 'organ' | 'blood' }) {
  const isBlood = tone === 'blood';
  const items = isBlood
    ? [[ShieldCheck, 'Free Health Checkups'], [Award, 'Recognition & Awards'], [FileBadge, 'Certificate of Appreciation'], [Droplet, 'Be a Life Saver']]
    : [[HeartPulse, 'One Donor Can Save 8 Lives'], [Stethoscope, '50,000+ People Waiting for Transplants'], [HeartHandshake, 'Be a Donor Be a Blessing']];
  return (
    <aside className={`rounded-xl border p-4 shadow-sm ${isBlood ? 'border-red-100 bg-red-50' : 'border-emerald-100 bg-emerald-50'}`}>
      <h3 className="text-center text-lg font-black text-slate-950">{isBlood ? 'Donor Benefits' : 'Your Pledge Creates Hope'}</h3>
      <div className="mt-4 space-y-3">
        {items.map(([Icon, label]: any) => (
          <div key={label} className="rounded-lg bg-white border border-white p-3 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${isBlood ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}><Icon className="w-5 h-5" /></div>
            <div className="font-black text-slate-900 text-sm">{label}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <label className="block text-sm font-black text-slate-900 mb-2">{label}</label>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, required }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <label className="text-xs font-black text-slate-800">
      {label}
      <input required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-1 w-full h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-500" />
    </label>
  );
}

function Select({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (value: string) => void; options: string[]; placeholder: string }) {
  return (
    <label className="text-xs font-black text-slate-800">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-500 bg-white">
        <option value="">{placeholder}</option>
        {options.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  );
}

function RadioTiles({ options, value, onChange, tone }: { options: string[]; value: string; onChange: (value: string) => void; tone: 'emerald' | 'blue' }) {
  const active = tone === 'blue' ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-emerald-600 bg-emerald-50 text-emerald-800';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      {options.map((option) => (
        <label key={option} className={`min-h-10 rounded-lg border px-3 py-2 flex items-center gap-2 text-xs font-black cursor-pointer ${value === option ? active : 'border-slate-200 text-slate-700'}`}>
          <input type="radio" checked={value === option} onChange={() => onChange(option)} />
          {option}
        </label>
      ))}
    </div>
  );
}

function UploadProofs({ docs, setDocs, tone }: { docs: Record<string, string>; setDocs: React.Dispatch<React.SetStateAction<Record<string, string>>>; tone: 'blue' | 'emerald' }) {
  const border = tone === 'blue' ? 'hover:border-blue-400' : 'hover:border-emerald-400';
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {[
        ['collegeFeeNotice', 'Upload College Fee Notice / కాలేజ్ ఫీజు నోటీసు'],
        ['marksMemo', 'Upload Marks Memo / మార్క్స్ మెమో'],
        ['incomeCertificate', 'Upload Income Certificate / ఆదాయ ధృవీకరణ పత్రం'],
      ].map(([key, label]) => (
        <label key={key} className={`min-h-16 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-center text-[11px] font-black text-slate-600 flex items-center justify-center gap-2 cursor-pointer ${border}`}>
          <Upload className="w-4 h-4 shrink-0" />
          {docs[key] || label}
          <input type="file" className="hidden" onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) setDocs((prev) => ({ ...prev, [key]: file.name }));
          }} />
        </label>
      ))}
    </div>
  );
}

function SuccessMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 text-xs font-black flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
