import React from 'react';
import {
  BookOpen,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  Leaf,
  Scale,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import chiefAdvisorImage from '../assets/images/about-chief-advisor.jpg';
import directorsImage from '../assets/images/about-directors.jpg';
import ecosystemHeroImage from '../assets/images/ayudh-ecosystem-hero.png';
import healthcareImage from '../assets/images/service_deep_cleaning_1784719519754.jpg';
import communityImage from '../assets/images/service_corporate_staffing_1784719493174.jpg';
import poshalaNareshImage from '../assets/images/poshala-naresh.jpg';
import jannuRajuImage from '../assets/images/jannu-raju.jpg';


const leadershipProfiles = [
  {
    name: 'M. Vijender, MA, MBA, (LLB)',
    role: 'Honourable Director',
    image: directorsImage,
    alt: 'M. Vijender, Honourable Director',
    crop: { backgroundSize: '335% auto', backgroundPosition: '4% 44%' },
    summary:
      'Mr. Vijender is the Managing Director of Ayudh Vikas. With an MBA background and strong leadership skills, he drives the organization with a clear vision of delivering reliable manpower solutions, professional cleaning services and impactful healthcare initiatives. His focus on innovation, integrity and customer satisfaction continues to guide the company towards sustainable growth and social impact.',
    highlights: ['MBA-backed leadership', 'Focus on innovation and integrity', 'Customer satisfaction and sustainable growth'],
  },
  {
    name: 'Allam Ashok',
    role: 'Director',
    image: directorsImage,
    alt: 'Allam Ashok, Director',
    crop: { backgroundSize: '335% auto', backgroundPosition: '50% 44%' },
    summary:
      'Mr. Allam Ashok serves as a Director and plays a key role in administration, project coordination and the successful execution of organizational initiatives. His dedication, discipline and commitment to teamwork help strengthen operational efficiency and contribute significantly to the organization’s mission and long-term success.',
    highlights: ['Administration and coordination', 'Team discipline and commitment', 'Operational efficiency and long-term success'],
  },
  {
    name: 'Govindu Vinay Kumar',
    role: 'Director',
    image: directorsImage,
    alt: 'Govindu Vinay Kumar, Director',
    crop: { backgroundSize: '335% auto', backgroundPosition: '95% 42%' },
    summary:
      'Mr. Govindu Vinay Kumar serves as a Director and is responsible for financial planning, budgeting and maintaining transparency in all financial operations. His strategic approach and strong financial management ensure the organization’s stability, accountability and sustainable development.',
    highlights: ['Financial planning and budgeting', 'Transparent operations', 'Strategic financial stability'],
  },
  {
    name: 'Poshala Naresh M.PHAM (LLB)',
    role: 'Director',
    image: poshalaNareshImage,
    alt: 'Poshala Naresh, Director',
    crop: { backgroundSize: 'cover', backgroundPosition: 'center 24%' },
    summary:
      'Mr. Poshala Naresh brings a valuable combination of pharmacy knowledge, legal understanding and public-service commitment to Ayudh Vikas Foundation. His multidisciplinary background supports the organization in healthcare awareness, ethical operations, compliance-oriented planning and responsible community service initiatives.',
    highlights: ['Pharmacy and legal perspective', 'Healthcare awareness support', 'Ethical and responsible planning'],
  },
  {
    name: 'Jannu Raju',
    role: 'Operations Director',
    image: jannuRajuImage,
    alt: 'Jannu Raju, Operations Director',
    crop: { backgroundSize: 'cover', backgroundPosition: 'center 20%' },
    summary:
      'Mr. Jannu Raju serves as Operations Director and supports the day-to-day coordination, execution and monitoring of Ayudh Vikas Foundation activities. His operational focus helps strengthen field-level implementation, team coordination, service delivery and timely follow-up across community and healthcare support programmes.',
    highlights: ['Operational coordination', 'Field execution and follow-up', 'Service delivery management'],
  },
  {
    name: 'Dr. V. Ravinder',
    role: 'Chief Advisor',
    image: chiefAdvisorImage,
    alt: 'Dr. V. Ravinder, Chief Advisor',
    crop: { backgroundSize: '105% auto', backgroundPosition: '20% 9%' },
    summary:
      'Dr. V. Ravinder serves as the Chief Advisor of Ayudh Vikas. With his vast experience and valuable guidance, he supports the organization in strategic decision-making, policy development and overall growth. His wisdom and vision continue to inspire the team and strengthen our commitment to serve the community.',
    highlights: ['Strategic guidance', 'Policy development', 'Community-focused leadership'],
  },
];

const foundationServices = [
  {
    title: 'Health & Medical Support | ఆరోగ్య & వైద్య సహాయం',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Doctor supporting a patient during a health consultation',
    text: 'We work towards health awareness, community and rural health camps, patient support, medical guidance, healthcare coordination and making essential healthcare services more accessible to people.',
    telugu: 'ఆరోగ్య అవగాహన, గ్రామీణ మరియు కమ్యూనిటీ ఆరోగ్య శిబిరాలు, రోగులకు సహాయం, వైద్య మార్గదర్శకత్వం, ఆరోగ్య సేవల సమన్వయం మరియు అవసరమైన వైద్య సేవలను ప్రజలకు చేరువ చేయడానికి మేము కృషి చేస్తున్నాము.',
  },
  {
    title: 'Education & Awareness | విద్య & అవగాహన',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Students learning together in a classroom',
    text: 'We support educational awareness, student development, community education and initiatives that help people make informed decisions about their future.',
    telugu: 'విద్యా అవగాహన, విద్యార్థుల అభివృద్ధి, కమ్యూనిటీ విద్య మరియు ప్రజలు తమ భవిష్యత్తు గురించి మంచి నిర్ణయాలు తీసుకునేందుకు అవసరమైన అవగాహన కార్యక్రమాలకు మేము సహకరిస్తాము.',
  },
  {
    title: 'Social Welfare | సామాజిక సంక్షేమం',
    icon: HandHeart,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Volunteers packing support supplies for community welfare',
    text: 'We work to support vulnerable communities, people in need and families facing difficult circumstances through appropriate social welfare initiatives.',
    telugu: 'బలహీన వర్గాలు, సహాయం అవసరమైన ప్రజలు మరియు కష్టాలను ఎదుర్కొంటున్న కుటుంబాలకు అవసరమైన సామాజిక సంక్షేమ కార్యక్రమాల ద్వారా మద్దతు అందించేందుకు మేము కృషి చేస్తున్నాము.',
  },
  {
    title: 'Women Empowerment & Protection | మహిళా సాధికారత & రక్షణ',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Women participating in a professional empowerment discussion',
    text: 'We promote awareness, dignity, safety, rights and empowerment of women through community-based initiatives.',
    telugu: 'మహిళల గౌరవం, భద్రత, హక్కులు, సాధికారత మరియు సామాజిక అవగాహన కోసం కమ్యూనిటీ ఆధారిత కార్యక్రమాలను ప్రోత్సహిస్తాము.',
  },
  {
    title: 'Environment Protection | పర్యావరణ పరిరక్షణ',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Hands holding a young green plant for environmental protection',
    text: 'We promote environmental awareness, cleanliness, greenery and responsible participation in protecting our earth and natural resources.',
    telugu: 'పర్యావరణ అవగాహన, పరిశుభ్రత, పచ్చదనం మరియు మన భూమి, ప్రకృతి, సహజ వనరుల పరిరక్షణలో ప్రజల భాగస్వామ్యాన్ని ప్రోత్సహిస్తాము.',
  },
  {
    title: 'Temple & Community Development | ఆలయ & సమాజ అభివృద్ధి',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1623059508779-2542c6e83753?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Indian temple architecture and community gathering place',
    text: 'We support appropriate spiritual, cultural, temple development and community welfare initiatives that contribute positively to society.',
    telugu: 'సమాజానికి సానుకూలంగా ఉపయోగపడే ఆధ్యాత్మిక, సాంస్కృతిక, ఆలయ అభివృద్ధి మరియు కమ్యూనిటీ సంక్షేమ కార్యక్రమాలకు మద్దతు ఇస్తాము.',
  },
];

const gratitudeSections = [
  {
    title: 'Gratitude To Public Leadership | ప్రజా నాయకత్వానికి కృతజ్ఞతలు',
    body: [
      'Ayudh Vikas Foundation respectfully expresses heartfelt gratitude to the Honble President of India, the Honble Prime Minister of India, national and state leaders, governors, chief ministers, ministers, elected representatives and all public servants working for public welfare, unity, constitutional responsibility and inclusive growth.',
      'ప్రజాసేవ, రాజ్యాంగ బాధ్యత, జాతీయ ఐక్యత, మానవ గౌరవం మరియు ప్రజా సంక్షేమం కోసం పనిచేస్తున్న గౌరవనీయ నాయకులు మరియు ప్రజాసేవకులందరికీ ఆయుధ్ వికాస్ ఫౌండేషన్ హృదయపూర్వక కృతజ్ఞతలు తెలియజేస్తోంది.',
    ],
  },
  {
    title: 'Gratitude To Service Institutions | సేవా సంస్థలకు కృతజ్ఞతలు',
    body: [
      'We sincerely appreciate government officials, civil servants, NGOs, charitable institutions, social service organizations, volunteers and community groups who serve people with dedication and responsibility.',
      'ప్రజలకు అవసరమైన సేవలను అందిస్తూ, మానవ సంక్షేమం కోసం పనిచేస్తున్న ప్రభుత్వ అధికారులు, స్వచ్ఛంద సంస్థలు, సేవా సంస్థలు, వాలంటీర్లు మరియు కమ్యూనిటీ సంస్థలకు మా హృదయపూర్వక కృతజ్ఞతలు.',
    ],
  },
  {
    title: 'Gratitude To Protectors & Professionals | రక్షకులు మరియు నిపుణులకు కృతజ్ఞతలు',
    body: [
      'Ayudh Vikas Foundation salutes brave soldiers, police personnel, law dignitaries, doctors, nurses, healthcare professionals and everyone who protects lives, justice, dignity, health and peace.',
      'దేశాన్ని కాపాడే వీర జవాన్లు, శాంతిభద్రతలను కాపాడే పోలీస్ సిబ్బంది, న్యాయ ప్రముఖులు, వైద్యులు, నర్సులు మరియు ఆరోగ్య సేవా నిపుణులందరికీ మా గౌరవపూర్వక వందనం.',
    ],
  },
  {
    title: 'Gratitude To Supporters & Team | మద్దతుదారులు మరియు టీమ్ సభ్యులకు కృతజ్ఞతలు',
    body: [
      'We extend heartfelt thanks to supporters, well-wishers, friends, donors, volunteers and dedicated team members whose trust, encouragement, unity and service spirit give strength to our journey.',
      'మా సేవా ప్రయాణాన్ని నమ్మి, మాకు ప్రోత్సాహం, మార్గదర్శకత్వం మరియు సహకారం అందిస్తున్న మద్దతుదారులు, శ్రేయోభిలాషులు, దాతలు, వాలంటీర్లు మరియు టీమ్ సభ్యులందరికీ హృదయపూర్వక ధన్యవాదాలు.',
    ],
  },
];

const FoundationStory: React.FC = () => (
  <section className="overflow-hidden bg-slate-950 text-white">
    <div className="relative min-h-[34rem] px-4 py-16 sm:px-6 lg:px-8">
      <img src={ecosystemHeroImage} alt="Ayudh Vikas Foundation service ecosystem" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/45" />
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
            Ayudh Vikas Foundation
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Care Beyond Boundaries
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">
            Ayudh Vikas Foundation (AVF) is a public charitable and social welfare organization committed to serving society with compassion, responsibility and humanity.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            ఆయుధ్ వికాస్ ఫౌండేషన్ (AVF) ప్రజా సంక్షేమం, సామాజిక సేవ, మానవత్వం మరియు బాధ్యతతో సమాజానికి సేవ చేయాలనే సంకల్పంతో పనిచేస్తున్న సేవా సంస్థ.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <HeartHandshake className="h-9 w-9 text-amber-300" />
            <h2 className="mt-4 text-2xl font-black">Inspired by Sri Sathya Sai Baba</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              AVF draws inspiration from love, compassion, selfless service and humanity. The values of Love All, Serve All and Service to Man is Service to God guide its social service approach.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              ప్రేమ, కరుణ, నిస్వార్థ సేవ మరియు మానవత్వం వంటి విలువలు ప్రజలకు గౌరవంతో, వినయంతో మరియు ఎటువంటి వివక్ష లేకుండా సేవ చేయడానికి మాకు స్ఫూర్తినిస్తున్నాయి.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <img src={healthcareImage} alt="Healthcare and community support" className="h-56 w-full object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-black">Our Purpose | మా లక్ష్యం</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Our purpose is to identify genuine social needs and provide meaningful, practical and sustainable support to individuals, families and communities.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              సమాజంలోని నిజమైన అవసరాలను గుర్తించి, వ్యక్తులు, కుటుంబాలు మరియు సమాజాలకు ఉపయోగకరమైన, ఆచరణాత్మకమైన మరియు స్థిరమైన సహాయాన్ని అందించడం మా ప్రధాన లక్ష్యం.
            </p>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <img src={communityImage} alt="Community development and teamwork" className="h-56 w-full object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-black">Vision & Mission | దృష్టి & కార్యాచరణ</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              To build a healthy, educated, compassionate, responsible and empowered society where every person has the opportunity to live with dignity and hope.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              ప్రజల వద్దకు నేరుగా చేరుకుని ఆరోగ్య అవగాహన, విద్య, సామాజిక సంక్షేమం, మహిళా సాధికారత, పర్యావరణ పరిరక్షణ మరియు సమాజ అభివృద్ధి ద్వారా అర్థవంతమైన సేవలను అందించడం మా కార్యాచరణ లక్ష్యం.
            </p>
          </div>
        </article>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-black tracking-tight">What We Do | మా సేవా రంగాలు</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {foundationServices.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-slate-950/20">
                <div className="relative h-48 overflow-hidden">
                  <img src={service.image} alt={service.imageAlt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-slate-950/75 p-3 text-amber-300 backdrop-blur-md">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{service.text}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{service.telugu}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="overflow-hidden rounded-2xl border border-amber-300/20 bg-amber-300/10">
          <div className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=85"
              alt="Community service values represented by people helping together"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <h2 className="text-2xl font-black text-white">Our Values | మా విలువలు</h2>
              <p className="mt-2 text-sm font-bold text-amber-100">Love • Service • Humanity • Compassion</p>
            </div>
          </div>
          <div className="grid gap-2 p-5 sm:grid-cols-2">
            {['Equality', 'Integrity', 'Responsibility', 'Teamwork', 'Transparency', 'Selfless Service'].map((value) => (
              <span key={value} className="rounded-xl border border-amber-300/20 bg-slate-950/60 px-3 py-2 text-sm font-bold text-amber-50">
                {value}
              </span>
            ))}
          </div>
          <p className="px-5 pb-5 text-sm leading-7 text-amber-100">
            ప్రేమ • సేవ • మానవత్వం • కరుణ • సమానత్వం • నిజాయితీ • బాధ్యత • టీమ్‌వర్క్ • పారదర్శకత
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=85"
            alt="People working together for social support"
            className="h-48 w-full object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-black">Founder & Chairman Message</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              With 15 years of experience in the Healthcare sector, we are moving forward on this path of service with a sincere commitment to make healthcare, social support, and community welfare more accessible to people through Ayudh Vikas Foundation.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              సేవ అనేది కేవలం ఒక కార్యక్రమం కాదు; అది మానవత్వం పట్ల మన బాధ్యత, ఇతరుల జీవితాల్లో మంచి మార్పు తీసుకురావాలనే ఒక పవిత్రమైన సంకల్పం.
            </p>
            <p className="mt-4 text-sm font-black text-amber-200">
              Your blessings are our strength. Your encouragement is our inspiration. Service to humanity is our mission.
            </p>
            <p className="mt-2 text-sm font-bold text-slate-300">
              With Humble Regards, Mandala Vijender, MBA (LLB), Founder & Chairman, Ayudh Vikas Foundation
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900 p-6">
        <div className="flex items-center gap-3">
          <Users className="h-7 w-7 text-amber-300" />
          <h2 className="text-2xl font-black">Our Gratitude | మా కృతజ్ఞతలు</h2>
        </div>
        <div className="mt-6 grid gap-3">
          {gratitudeSections.map((section) => (
            <details key={section.title} className="group rounded-xl border border-white/10 bg-slate-950/70 p-4">
              <summary className="cursor-pointer text-sm font-black text-white marker:text-amber-300">{section.title}</summary>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <Scale className="h-8 w-8 text-amber-300" />
          <h2 className="mt-4 text-2xl font-black">Our Journey Of Service | మా సేవా ప్రయాణం</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The journey of Ayudh Vikas Foundation is not merely the journey of an organization. It is a journey of humanity, compassion and service.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            ఒక చిన్న మంచి పని, ఒక సహాయక హస్తం లేదా ఒక ఆప్యాయమైన మాట కూడా ఒక మంచి మార్పుకు ప్రారంభం కావచ్చు.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-300/20 to-slate-900 p-6">
          <h2 className="text-2xl font-black">Our Motto | మా సేవా నినాదం</h2>
          <p className="mt-4 text-xl font-black text-amber-100">Care Beyond Boundaries</p>
          <p className="mt-3 text-sm leading-7 text-slate-200">Together for Better Health, Better Communities and a Better Future.</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">హద్దులు దాటి మానవతా సేవ. మంచి ఆరోగ్యం కోసం • మంచి సమాజాల కోసం • మంచి భవిష్యత్తు కోసం కలిసి ముందుకు.</p>
        </div>
      </div>
    </div>
  </section>
);

const Flipbook: React.FC = () => (
  <section className="bg-[radial-gradient(circle_at_top,#1e293b_0%,#0f172a_45%,#020617_100%)] px-4 py-14 sm:py-20">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
          <BookOpen className="h-4 w-4" /> Company Profile
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Explore our story</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
          Open the original Ayudh Vikas profile brochure to see the foundation story, leadership, values, and service journey in detail.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300"
            href={`${import.meta.env.BASE_URL}about-us-brochure.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Open brochure PDF
          </a>
          <a
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            href={`${import.meta.env.BASE_URL}about-us-brochure.pdf`}
            download
          >
            Download profile
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#111827,#020617_65%)] p-5 shadow-2xl shadow-slate-950/60 sm:p-7">
        <div className="absolute inset-x-10 bottom-6 h-8 rounded-full bg-black/45 blur-2xl" />
        <div className="relative overflow-hidden rounded-2xl border border-amber-300/20 bg-white shadow-2xl">
          <iframe
            title="Ayudh Vikas Foundation company profile"
            src={`${import.meta.env.BASE_URL}about-us-brochure.pdf#toolbar=0&navpanes=0`}
            className="h-[520px] w-full bg-white"
          />
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-slate-400">
          If the preview does not load on your browser, use Open brochure PDF.
        </p>
      </div>
    </div>
  </section>
);
export const AboutUs: React.FC = () => (
  <>
    <FoundationStory />
    <section className="bg-slate-950 px-4 py-14 text-white sm:py-18 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
            Leadership Team
          </span>
          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Guided by vision. Driven by purpose.
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Meet the leadership behind Ayudh Vikas Manpower, Cleaning, and Healthcare services. Each profile is presented with the person image beside their role, responsibility, and contribution.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {leadershipProfiles.map((profile) => (
            <article
              key={profile.name}
              className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-slate-950/30 backdrop-blur md:grid-cols-[18rem_1fr]"
            >
              {profile.image ? (
                <div
                  className="min-h-72 bg-slate-900 bg-no-repeat md:min-h-full"
                  style={{ backgroundImage: `url(${profile.image})`, ...('crop' in profile ? profile.crop : {}) }}
                  role="img"
                  aria-label={profile.alt}
                />
              ) : (
                <div
                  className="flex min-h-72 flex-col items-center justify-center bg-slate-900 px-6 text-center md:min-h-full"
                  role="img"
                  aria-label={`${profile.name} photo space`}
                >
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-3xl font-black text-amber-200">
                    {profile.name.split(' ').slice(0, 2).map((part) => part[0]).join('')}
                  </div>
                  <div className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-amber-200">Photo space reserved</div>
                  <p className="mt-2 max-w-48 text-xs font-semibold leading-5 text-slate-400">Image will be added after you provide the profile photo.</p>
                </div>
              )}

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-950">
                    {profile.role}
                  </span>
                  <span className="h-px min-w-12 flex-1 bg-gradient-to-r from-amber-300/70 to-transparent" />
                </div>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">{profile.name}</h2>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base lg:leading-8">{profile.summary}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {profile.highlights.map((highlight) => (
                    <div key={highlight} className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-bold text-slate-100">
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <Flipbook />
  </>
);

