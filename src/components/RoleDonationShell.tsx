import React, { useMemo, useState } from 'react';
import {
  Ambulance,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  ClipboardList,
  FileText,
  FlaskConical,
  HeartHandshake,
  History,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Pill,
  Settings,
  ShieldCheck,
  Stethoscope,
  TestTube,
  User,
  Users,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { roleHome } from '../lib/roleRoutes';

type RoleDonationShellProps = {
  role?: string;
  user?: any;
  onLogout: () => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
};

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
  highlight?: boolean;
};

const roleConfigs: Record<string, { title: string; subtitle: string; nav: NavItem[] }> = {
  patient: {
    title: 'Patient Panel',
    subtitle: 'My care, bookings, records and support',
    nav: [
      { label: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
      { label: 'Find Hospitals', path: '/patient/requests', icon: Building2 },
      { label: 'Book Doctor', path: '/patient/appointments', icon: Calendar },
      { label: 'Book Lab Tests', path: '/patient/lab-tests', icon: TestTube },
      { label: 'Reports & Results', path: '/patient/reports', icon: FileText },
      { label: 'Prescriptions', path: '/patient/prescriptions', icon: Pill },
      { label: 'Emergency Support', path: '/patient/emergency', icon: Ambulance, highlight: true },
    ],
  },
  doctor: {
    title: 'Doctor Panel',
    subtitle: 'Appointments, patients and session records',
    nav: [
      { label: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
      { label: 'Appointments', path: '/doctor/appointments', icon: Calendar },
      { label: 'Patients', path: '/doctor/patients', icon: Users },
      { label: 'Reports', path: '/doctor/patients', icon: FileText },
      { label: 'Profile', path: '/doctor/profile', icon: User },
    ],
  },
  hospital: {
    title: 'Hospital Panel',
    subtitle: 'Requests, doctors, beds and patient care',
    nav: [
      { label: 'Dashboard', path: '/hospital/dashboard', icon: LayoutDashboard },
      { label: 'Appointments', path: '/hospital/requests', icon: Calendar },
      { label: 'Doctors Management', path: '/hospital/doctors', icon: Stethoscope },
      { label: 'Beds', path: '/hospital/beds', icon: Building2 },
      { label: 'Profile', path: '/hospital/profile', icon: User },
    ],
  },
  admin: {
    title: 'Admin Panel',
    subtitle: 'Users, verification and support operations',
    nav: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'User Management', path: '/admin/users', icon: Users },
      { label: 'Doctor Verification', path: '/admin/verify/doctors', icon: ShieldCheck },
      { label: 'Hospital Verification', path: '/admin/verify/hospitals', icon: Building2 },
    ],
  },
  marketing: {
    title: 'Marketing Panel',
    subtitle: 'Leads, outreach and partnership follow-ups',
    nav: [
      { label: 'Dashboard', path: '/marketing/dashboard', icon: BarChart3 },
      { label: 'Leads', path: '/marketing/dashboard', icon: ClipboardList },
      { label: 'Partners', path: '/marketing/dashboard', icon: Building2 },
      { label: 'History', path: '/marketing/dashboard', icon: History },
    ],
  },
  lab: {
    title: 'Lab Team Panel',
    subtitle: 'Requests, verification, reports and history',
    nav: [
      { label: 'Dashboard', path: '/lab/dashboard', icon: BarChart3 },
      { label: 'Requests', path: '/lab/requests', icon: ClipboardList },
      { label: 'Verification', path: '/lab/verification', icon: ShieldCheck },
      { label: 'Reports', path: '/lab/reports', icon: FileText },
      { label: 'History', path: '/lab/history', icon: History },
      { label: 'Support', path: '/lab/support', icon: FlaskConical },
    ],
  },
  community: {
    title: 'Community Panel',
    subtitle: 'Camp support, outreach and member care',
    nav: [
      { label: 'Dashboard', path: '/community/dashboard', icon: LayoutDashboard },
      { label: 'Members', path: '/community/dashboard', icon: Users },
      { label: 'Health Camps', path: '/health-camps', icon: Calendar },
      { label: 'Support', path: '/community/dashboard', icon: HeartHandshake },
    ],
  },
};

const normalizeRole = (role?: string) => {
  const value = String(role || 'patient').toLowerCase();
  if (value === 'super_admin' || value === 'superadmin') return 'admin';
  if (value === 'volunteer' || value === 'social_organizer') return 'community';
  if (roleConfigs[value]) return value;
  return 'patient';
};

export const RoleDonationShell: React.FC<RoleDonationShellProps> = ({
  role,
  user,
  onLogout,
  onNavigateHome,
  children,
}) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const roleKey = normalizeRole(role);
  const config = roleConfigs[roleKey];
  const homePath = roleHome(role || roleKey);

  const navItems = useMemo(
    () => [
      ...config.nav,
      { label: 'Donate & Support', path: '/donate', icon: HeartHandshake, highlight: true },
      { label: 'Settings', path: homePath, icon: Settings },
    ],
    [config.nav, homePath]
  );

  const go = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8] font-sans text-slate-800 selection:bg-emerald-500 selection:text-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1700px] mx-auto px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen((value) => !value)}
              className="lg:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button onClick={onNavigateHome} className="flex items-center gap-2.5 text-left min-w-0" title="Home">
              <BrandLogo className="w-10 h-10 sm:w-11 sm:h-11 shadow-2xs" />
              <div className="hidden sm:flex flex-col">
                <span className="text-base font-black text-[#0f2e5a] tracking-tight leading-none uppercase">AYUDH VIKAS</span>
                <span className="text-[10px] font-extrabold text-[#006633] tracking-wide uppercase leading-tight">HEALTH CARE NETWORK</span>
                <span className="text-[8px] font-bold text-emerald-700 tracking-wider uppercase border-t border-emerald-200 mt-0.5 pt-0.5">Care Beyond Boundaries</span>
              </div>
            </button>

            <div className="hidden md:block h-8 w-px bg-slate-200 mx-1" />
            <div className="min-w-0">
              <div className="text-sm font-black text-slate-950 truncate">{config.title}</div>
              <div className="text-[11px] font-semibold text-slate-500 truncate">{config.subtitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => go(homePath)} className="hidden sm:flex h-9 px-3 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-black items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button onClick={onNavigateHome} className="hidden md:flex h-9 px-3 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-black items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </button>
            <button className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center" aria-label="Notifications">
              <Bell className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">
                {String(user?.name || user?.displayName || 'A').slice(0, 1).toUpperCase()}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-black text-slate-900 leading-tight">{user?.displayName || user?.name || 'Ayudh User'}</div>
                <div className="text-[10px] font-bold text-emerald-700 leading-tight capitalize">{roleKey.replace('_', ' ')}</div>
              </div>
            </div>
            <button onClick={onLogout} className="h-9 px-3 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-black flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative max-w-[1700px] w-full mx-auto">
        {sidebarOpen && (
          <button
            aria-label="Close menu"
            className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed lg:sticky top-[61px] bottom-0 left-0 z-30
          w-64 bg-[#091b38] text-slate-300 flex flex-col justify-between shrink-0
          transition-transform duration-200 ease-in-out overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          shadow-xl lg:shadow-none min-h-[calc(100vh-61px)]
        `}>
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.path === '/donate';
              return (
                <button
                  key={`${item.label}-${item.path}`}
                  onClick={() => go(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                    active
                      ? 'bg-[#00703c] text-white shadow-sm font-black'
                      : item.highlight
                        ? 'text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200'
                        : 'text-slate-300 hover:bg-[#12284d] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : item.highlight ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-slate-800/80">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-all text-left"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 min-w-0 bg-[#f3f5f8]">
          <div className="p-0 animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
