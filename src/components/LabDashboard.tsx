import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  FlaskConical,
  Headphones,
  History,
  Home,
  Link as LinkIcon,
  Loader2,
  LogOut,
  Menu,
  Phone,
  QrCode,
  RefreshCw,
  Search,
  ShieldCheck,
  Upload,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { BrandLogo } from './BrandLogo';

type LabNav = 'Dashboard' | 'Requests' | 'Verification' | 'Reports' | 'History' | 'Profile' | 'Support';

interface LabDashboardProps {
  onLogout: () => void;
  onNavigateHome: () => void;
  initialNav?: LabNav;
}

const navItems: Array<{ label: LabNav; icon: React.ElementType; path: string }> = [
  { label: 'Dashboard', icon: BarChart3, path: '/lab/dashboard' },
  { label: 'Requests', icon: ClipboardList, path: '/lab/requests' },
  { label: 'Verification', icon: ShieldCheck, path: '/lab/verification' },
  { label: 'Reports', icon: FileText, path: '/lab/reports' },
  { label: 'History', icon: History, path: '/lab/history' },
  { label: 'Profile', icon: UserCheck, path: '/lab/profile' },
  { label: 'Support', icon: Headphones, path: '/lab/support' },
];

const statusClass = (status = '') => {
  const normalized = status.toLowerCase();
  if (normalized.includes('reject')) return 'bg-red-50 text-red-700 border-red-200';
  if (normalized.includes('complete') || normalized.includes('closed')) return 'bg-slate-100 text-slate-700 border-slate-200';
  if (normalized.includes('verified') || normalized.includes('report')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (normalized.includes('accepted')) return 'bg-blue-50 text-blue-700 border-blue-200';
  return 'bg-amber-50 text-amber-700 border-amber-200';
};

const prettyDate = (value?: string) => {
  if (!value) return 'Not scheduled';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const LabDashboard: React.FC<LabDashboardProps> = ({ onLogout, onNavigateHome, initialNav = 'Dashboard' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<LabNav>(initialNav);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [summary, setSummary] = useState<any>({ stats: {}, requests: [], active: [], history: [] });
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [rejectReasons, setRejectReasons] = useState<Record<string, string>>({});
  const [verifyForms, setVerifyForms] = useState<Record<string, { method: string; value: string }>>({});
  const [reportForm, setReportForm] = useState({
    method: 'manual',
    title: '',
    reportType: '',
    reportInformation: '',
    documentLink: '',
    file: null as null | { name: string; type: string; size: number; data: string },
  });

  useEffect(() => setActiveNav(initialNav), [initialNav]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.labSummary();
      setSummary(data);
      const firstActive = data.active?.[0]?.id || data.requests?.[0]?.id || data.history?.[0]?.id || '';
      setSelectedId((current) => current || firstActive);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load lab dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const allBookings = useMemo(
    () => [...(summary.requests || []), ...(summary.active || []), ...(summary.history || [])],
    [summary]
  );
  const activeBookings = useMemo(() => summary.active || [], [summary]);
  const selected = allBookings.find((item: any) => item.id === selectedId) || activeBookings[0] || allBookings[0];
  const filteredRequests = (summary.requests || []).filter((item: any) =>
    `${item.patientName} ${item.patientId} ${item.testName} ${item.phone}`.toLowerCase().includes(query.toLowerCase())
  );
  const verifiedBookings = activeBookings.filter((item: any) => item.patientVerified);
  const reportReady = Boolean(selected?.reportId || selected?.reportStatus === 'Uploaded' || selected?.status === 'Report Uploaded');

  const handleNav = (label: LabNav, path: string) => {
    setActiveNav(label);
    navigate(path);
  };

  const action = async (label: string, fn: () => Promise<unknown>) => {
    setSaving(label);
    setError('');
    try {
      await fn();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed.');
    } finally {
      setSaving('');
    }
  };

  const readFile = (file: File) => new Promise<{ name: string; type: string; size: number; data: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, data: String(reader.result || '') });
    reader.onerror = () => reject(new Error('Unable to read report file.'));
    reader.readAsDataURL(file);
  });

  const saveReport = async () => {
    if (!selected) return;
    await action(`report-${selected.id}`, async () => {
      await api.createLabReport(selected.id, {
        ...reportForm,
        title: reportForm.title || `${selected.testName || 'Lab Test'} Results`,
        reportType: reportForm.reportType || selected.testName || 'Lab Report',
      });
      setReportForm({ method: 'manual', title: '', reportType: '', reportInformation: '', documentLink: '', file: null });
    });
  };

  const closeSession = async () => {
    if (!selected) return;
    const ok = window.confirm('Are you sure you want to close this lab testing session? Test reports must already be updated and the visit pass will expire.');
    if (!ok) return;
    await action(`close-${selected.id}`, () => api.closeLabSession(selected.id));
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] font-sans text-slate-800">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <BrandLogo />
          <button onClick={() => setSidebarOpen((value) => !value)} className="p-2 rounded-lg hover:bg-slate-100" aria-label="Toggle sidebar">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-lg font-black text-[#102a53]">Welcome, {user?.name || 'Lab Team'}</h1>
            <p className="text-xs font-semibold text-slate-500">Diagnostic requests, verification, reports and testing history.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading} className="h-9 px-3 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-black flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button onClick={onNavigateHome} className="h-9 px-3 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-black flex items-center gap-2">
            <Home className="w-4 h-4" /> Home
          </button>
          <button onClick={onLogout} className="h-9 px-3 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-black flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0d2547] h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] p-4 transition-all sticky top-16 overflow-hidden`}>
          <nav className="space-y-2 h-full overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.label, item.path)}
                  className={`w-full h-11 rounded-lg flex items-center gap-3 px-3 text-sm font-black transition-colors ${
                    active ? 'bg-emerald-600 text-white' : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-4 lg:p-6 space-y-4 overflow-hidden">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 p-3 text-sm font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {loading ? (
            <div className="h-[60vh] flex items-center justify-center text-slate-500 font-black gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading lab data
            </div>
          ) : (
            <>
              {activeNav === 'Dashboard' && (
                <DashboardView stats={summary.stats || {}} requests={summary.requests || []} active={summary.active || []} history={summary.history || []} onOpenRequests={() => setActiveNav('Requests')} onOpenReports={() => setActiveNav('Reports')} />
              )}

              {activeNav === 'Requests' && (
                <section className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Lab Test Requests</h2>
                      <p className="text-xs font-semibold text-slate-500">Accept or reject patient lab bookings with a valid reason.</p>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search requests" className="h-10 rounded-lg border border-slate-200 pl-9 pr-3 text-sm font-semibold outline-none focus:border-emerald-400" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {filteredRequests.length ? filteredRequests.map((item: any) => (
                      <BookingCard key={item.id} item={item}>
                        <input
                          value={rejectReasons[item.id] || ''}
                          onChange={(event) => setRejectReasons((prev) => ({ ...prev, [item.id]: event.target.value }))}
                          placeholder="Reason if rejecting"
                          className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-red-400"
                        />
                        <button disabled={Boolean(saving)} onClick={() => action(`accept-${item.id}`, () => api.acceptLabBooking(item.id))} className="h-10 px-4 rounded-lg bg-emerald-600 text-white text-xs font-black">
                          Accept
                        </button>
                        <button disabled={Boolean(saving)} onClick={() => action(`reject-${item.id}`, () => api.rejectLabBooking(item.id, { reason: rejectReasons[item.id] }))} className="h-10 px-4 rounded-lg bg-red-600 text-white text-xs font-black">
                          Reject
                        </button>
                      </BookingCard>
                    )) : <Empty message="No pending lab test requests." />}
                  </div>
                </section>
              )}

              {activeNav === 'Verification' && (
                <section className="rounded-lg border border-slate-200 bg-white p-4">
                  <h2 className="text-lg font-black text-slate-900">Patient Verification</h2>
                  <p className="text-xs font-semibold text-slate-500 mb-4">Verify using mobile number, patient ID, or scanned physical card before report work starts.</p>
                  <div className="space-y-3">
                    {activeBookings.length ? activeBookings.map((item: any) => {
                      const form = verifyForms[item.id] || { method: 'mobile', value: '' };
                      return (
                        <BookingCard key={item.id} item={item}>
                          {item.patientVerified ? (
                            <span className="h-10 px-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" /> Verified
                            </span>
                          ) : (
                            <>
                              <select value={form.method} onChange={(event) => setVerifyForms((prev) => ({ ...prev, [item.id]: { ...form, method: event.target.value } }))} className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-bold">
                                <option value="mobile">Mobile</option>
                                <option value="patientId">Patient ID</option>
                                <option value="card">Physical Card / QR</option>
                              </select>
                              <input value={form.value} onChange={(event) => setVerifyForms((prev) => ({ ...prev, [item.id]: { ...form, value: event.target.value } }))} placeholder="Enter verification value" className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-400" />
                              <button disabled={Boolean(saving)} onClick={() => action(`verify-${item.id}`, () => api.verifyLabPatient(item.id, form))} className="h-10 px-4 rounded-lg bg-blue-600 text-white text-xs font-black">
                                Verify
                              </button>
                            </>
                          )}
                        </BookingCard>
                      );
                    }) : <Empty message="No accepted requests waiting for verification." />}
                  </div>
                </section>
              )}

              {activeNav === 'Reports' && (
                <section className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-4">
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-black text-slate-900">Verified Patients</h2>
                      <button onClick={() => setActiveNav('History')} className="text-xs font-black text-blue-700">History</button>
                    </div>
                    <div className="space-y-2">
                      {verifiedBookings.length ? verifiedBookings.map((item: any) => (
                        <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full text-left rounded-lg border p-3 ${selected?.id === item.id ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                          <div className="font-black text-slate-900">{item.patientName || 'Patient'}</div>
                          <div className="text-xs font-semibold text-slate-500">{item.testName} · {item.testMode}</div>
                          <div className="text-[11px] font-bold text-slate-400">{item.patientId || item.phone}</div>
                        </button>
                      )) : <Empty message="No verified patient sessions yet." />}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    {selected ? (
                      <>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                          <div>
                            <h2 className="text-xl font-black text-slate-900">{selected.patientName || 'Patient'}</h2>
                            <p className="text-sm font-bold text-slate-500">{selected.testName} · {selected.testMode}</p>
                            <p className="text-xs font-semibold text-slate-400">{selected.patientId || 'No patient ID'} · {selected.phone || selected.patientPhone || 'No phone'}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full border text-xs font-black ${statusClass(selected.status)}`}>{selected.status}</span>
                        </div>

                        {!selected.patientVerified && (
                          <div className="rounded-lg border border-amber-200 bg-amber-50 text-amber-700 p-3 text-sm font-bold mb-4">
                            Verify the patient before adding reports/results.
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                          <Info label="Preferred Date" value={selected.preferredDate || 'Not selected'} />
                          <Info label="Preferred Time" value={selected.preferredTime || 'Not selected'} />
                          <Info label="Collection" value={selected.collectionType === 'home' ? 'Home Test' : 'Walk-in'} />
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {['manual', 'link', 'file'].map((method) => (
                              <button key={method} onClick={() => setReportForm((prev) => ({ ...prev, method }))} className={`h-9 px-3 rounded-lg text-xs font-black border ${reportForm.method === method ? 'bg-[#0d2547] text-white border-[#0d2547]' : 'bg-white text-slate-700 border-slate-200'}`}>
                                {method === 'manual' ? 'Manual Result' : method === 'link' ? 'Document Link' : 'Upload File'}
                              </button>
                            ))}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input value={reportForm.title} onChange={(event) => setReportForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Report title" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-400" />
                            <input value={reportForm.reportType} onChange={(event) => setReportForm((prev) => ({ ...prev, reportType: event.target.value }))} placeholder="Report type / test name" className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-400" />
                          </div>
                          {reportForm.method === 'manual' && (
                            <textarea value={reportForm.reportInformation} onChange={(event) => setReportForm((prev) => ({ ...prev, reportInformation: event.target.value }))} placeholder="Write test results / observations" className="min-h-28 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold outline-none focus:border-emerald-400 w-full" />
                          )}
                          {reportForm.method === 'link' && (
                            <div className="relative">
                              <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                              <input value={reportForm.documentLink} onChange={(event) => setReportForm((prev) => ({ ...prev, documentLink: event.target.value }))} placeholder="https://secure-report-url" className="h-10 rounded-lg border border-slate-200 pl-9 pr-3 text-sm font-semibold outline-none focus:border-emerald-400 w-full" />
                            </div>
                          )}
                          {reportForm.method === 'file' && (
                            <label className="h-24 rounded-lg border border-dashed border-slate-300 bg-white flex items-center justify-center text-sm font-bold text-slate-600 gap-2 cursor-pointer">
                              <Upload className="w-5 h-5 text-blue-600" />
                              {reportForm.file?.name || 'Upload PDF/image/document'}
                              <input type="file" className="hidden" onChange={async (event) => {
                                const file = event.target.files?.[0];
                                if (file) setReportForm((prev) => ({ ...prev, file: null }));
                                if (file) setReportForm((prev) => ({ ...prev, file: { name: file.name, type: file.type, size: file.size, data: '' } }));
                                if (file) {
                                  const read = await readFile(file);
                                  setReportForm((prev) => ({ ...prev, file: read }));
                                }
                              }} />
                            </label>
                          )}
                          <div className="flex flex-wrap gap-3 justify-end">
                            <button disabled={!selected.patientVerified || Boolean(saving)} onClick={saveReport} className="h-10 px-4 rounded-lg bg-emerald-600 disabled:bg-slate-300 text-white text-xs font-black flex items-center gap-2">
                              {saving === `report-${selected.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                              Save Test Report
                            </button>
                            <button disabled={!reportReady || Boolean(saving)} onClick={closeSession} className="h-10 px-4 rounded-lg bg-red-600 disabled:bg-slate-300 text-white text-xs font-black">
                              Close Session
                            </button>
                          </div>
                        </div>
                      </>
                    ) : <Empty message="Select a verified patient session." />}
                  </div>
                </section>
              )}

              {activeNav === 'History' && (
                <HistoryView items={summary.history || []} />
              )}

              {activeNav === 'Profile' && (
                <section className="rounded-lg border border-slate-200 bg-white p-5 max-w-3xl">
                  <h2 className="text-lg font-black text-slate-900">Lab Profile</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <Info label="Lab Name" value={summary.lab?.name || user?.name || 'Lab Team'} />
                    <Info label="Lab ID" value={summary.lab?.id || user?.labId || 'Not assigned'} />
                    <Info label="Email" value={user?.email || 'Not provided'} />
                    <Info label="Mobile" value={user?.phone || 'Not provided'} />
                  </div>
                </section>
              )}

              {activeNav === 'Support' && (
                <section className="rounded-lg border border-slate-200 bg-white p-5 max-w-3xl">
                  <h2 className="text-lg font-black text-slate-900">Lab Support</h2>
                  <p className="text-sm font-semibold text-slate-500 mt-1">For lab workflow issues, contact Ayudh Vikas operations support.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="h-10 px-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-black flex items-center gap-2"><Phone className="w-4 h-4" /> 0870-4210820</span>
                    <span className="h-10 px-3 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-sm font-black flex items-center gap-2"><Headphones className="w-4 h-4" /> support@ayudhvikas.org</span>
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

function DashboardView({ stats, requests, active, history, onOpenRequests, onOpenReports }: any) {
  const cards = [
    { label: 'Pending Requests', value: stats.pendingRequests || 0, icon: Clock, color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { label: 'Active Sessions', value: stats.activeSessions || 0, icon: Activity, color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'Reports Uploaded', value: stats.reportsUploaded || 0, icon: FileText, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { label: 'Completed Tests', value: stats.completedSessions || 0, icon: CheckCircle2, color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { label: 'Home Tests', value: stats.homeTests || 0, icon: Home, color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
    { label: 'Walk-ins', value: stats.walkIns || 0, icon: FlaskConical, color: 'bg-rose-50 border-rose-200 text-rose-700' },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`rounded-lg border p-4 ${card.color}`}>
              <Icon className="w-8 h-8 mb-3" />
              <div className="text-3xl font-black text-slate-950">{card.value}</div>
              <div className="text-xs font-black uppercase">{card.label}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel title="Latest Requests" action="View Requests" onAction={onOpenRequests} items={requests} />
        <Panel title="Active Testing Sessions" action="Open Reports" onAction={onOpenReports} items={active} />
        <Panel title="Recent History" items={history} />
      </div>
    </div>
  );
}

function Panel({ title, action, onAction, items }: any) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-black text-slate-900">{title}</h3>
        {action && <button onClick={onAction} className="text-xs font-black text-blue-700 flex items-center gap-1">{action}<ArrowRight className="w-3 h-3" /></button>}
      </div>
      <div className="space-y-2">
        {items?.length ? items.slice(0, 5).map((item: any) => (
          <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <div className="font-black text-slate-900 text-sm">{item.patientName || 'Patient'}</div>
            <div className="text-xs font-semibold text-slate-500">{item.testName || item.packageName}</div>
            <div className="mt-2 flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full border text-[10px] font-black ${statusClass(item.status)}`}>{item.status || 'Pending'}</span>
              <span className="text-[10px] font-bold text-slate-400">{prettyDate(item.updatedAt || item.requestedAt || item.createdAt)}</span>
            </div>
          </div>
        )) : <Empty message="No records yet." />}
      </div>
    </section>
  );
}

function BookingCard({ item, children }: { item: any; children: React.ReactNode; key?: React.Key }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 flex flex-col lg:flex-row lg:items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-black text-slate-900">{item.patientName || 'Patient'}</h3>
          <span className={`px-2 py-1 rounded-full border text-[10px] font-black ${statusClass(item.status)}`}>{item.status || 'Pending'}</span>
        </div>
        <p className="text-sm font-bold text-slate-600">{item.testName || item.packageName || 'Lab Test'} · {item.testMode || 'Walk-in'}</p>
        <p className="text-xs font-semibold text-slate-400">{item.patientId || 'No patient ID'} · {item.phone || item.patientPhone || 'No phone'} · {item.preferredDate || 'No date'} {item.preferredTime || ''}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 lg:items-center">
        {children}
      </div>
    </div>
  );
}

function HistoryView({ items }: { items: any[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-black text-slate-900">Lab Test History</h2>
      <p className="text-xs font-semibold text-slate-500 mb-4">Closed and rejected sessions stay here for audit and follow-up.</p>
      <div className="space-y-3">
        {items.length ? items.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-slate-900">{item.patientName || 'Patient'}</h3>
                <p className="text-sm font-bold text-slate-600">{item.testName || item.packageName} · {item.testMode}</p>
                <p className="text-xs font-semibold text-slate-400">Completed: {prettyDate(item.completedAt || item.closedAt || item.updatedAt)}</p>
              </div>
              <span className={`px-3 py-1 rounded-full border text-xs font-black ${statusClass(item.status)}`}>{item.status}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <Info label="Report" value={item.reportStatus || (item.reportId ? 'Uploaded' : 'Not uploaded')} />
              <Info label="Mode" value={item.collectionType === 'home' ? 'Home Test' : 'Walk-in'} />
              <Info label="Visit Pass" value={item.visitPassStatus || 'EXPIRED'} />
            </div>
          </div>
        )) : <Empty message="No lab history found." />}
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <div className="text-[10px] uppercase font-black text-slate-400">{label}</div>
      <div className="text-sm font-black text-slate-900 break-words">{value}</div>
    </div>
  );
}

function Empty({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
      {message}
    </div>
  );
}
