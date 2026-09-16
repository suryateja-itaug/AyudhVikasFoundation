import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  IndianRupee,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { api } from '../lib/api';

const statusClass = (status = '') => {
  const value = status.toUpperCase();
  if (value.includes('ENROLLED') || value.includes('ACTIVE') || value.includes('SUCCESS')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (value.includes('PENDING') || value.includes('PROCESSING') || value.includes('REVIEW')) return 'bg-amber-50 text-amber-700 border-amber-200';
  if (value.includes('FAILED') || value.includes('REJECT')) return 'bg-red-50 text-red-700 border-red-200';
  return 'bg-slate-50 text-slate-700 border-slate-200';
};

export const AdminFund360Panel: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState('');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.adminFund360();
      setItems(res.items || []);
    } catch (err: any) {
      setError(err?.message || 'Unable to load FUND 365 records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const user = item.user || {};
      return [user.name, user.phone, user.email, item.account?.status, item.participation?.type]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q));
    });
  }, [items, query]);

  const stats = useMemo(() => {
    const enrolled = items.filter((item) => item.account?.status === 'ENROLLED').length;
    const pending = items.filter((item) => String(item.account?.status || '').includes('PENDING')).length;
    const total = items.reduce((sum, item) => sum + Number(item.summary?.totalContributions || 0), 0);
    return { enrolled, pending, total };
  }, [items]);

  const updateRecord = async (collection: string, record: any, payload: any) => {
    if (!record?.id) return;
    setSavingId(record.id);
    setError('');
    try {
      await api.updateAdminFund360(collection, record.id, payload);
      await load();
    } catch (err: any) {
      setError(err?.message || 'Unable to update FUND 365 record');
    } finally {
      setSavingId('');
    }
  };

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Enrolled Participants', value: stats.enrolled, icon: ShieldCheck, toneClass: 'bg-emerald-50 text-emerald-700' },
          { label: 'Pending Actions', value: stats.pending, icon: Clock, toneClass: 'bg-amber-50 text-amber-700' },
          { label: 'Verified Contributions', value: `Rs. ${stats.total.toLocaleString('en-IN')}`, icon: IndianRupee, toneClass: 'bg-emerald-100 text-emerald-800' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl border border-emerald-200 bg-white p-4 shadow-2xs">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${card.toneClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xl font-black text-slate-950">{card.value}</div>
              <div className="text-[11px] font-black uppercase tracking-wide text-slate-500">{card.label}</div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-emerald-200 bg-white shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-emerald-100 bg-emerald-50/70 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-black text-emerald-950">FUND 365 Programme Management</h3>
            <p className="text-[11px] text-emerald-800/75 font-semibold mt-0.5">
              Real participant accounts, payments, milestones, benefits and service contributions.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search participant"
                className="pl-8 pr-3 py-2 rounded-lg border border-emerald-200 bg-white text-xs font-semibold min-w-[220px] focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              onClick={load}
              disabled={loading}
              className="px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black flex items-center gap-1.5 disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Sync
            </button>
          </div>
        </div>

        {error && (
          <div className="m-4 rounded-lg border border-red-200 bg-red-50 text-red-700 p-3 text-xs font-black flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="h-48 flex items-center justify-center text-slate-500 text-sm font-black gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading FUND 365 records
          </div>
        ) : filtered.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-sm font-black">
            <Sparkles className="w-8 h-8 text-slate-300 mb-2" />
            No FUND 365 records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-emerald-50 text-emerald-700 uppercase text-[10px] font-black">
                <tr>
                  <th className="text-left px-4 py-2">Participant</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Type</th>
                  <th className="text-left px-4 py-2">Contribution</th>
                  <th className="text-left px-4 py-2">Milestones</th>
                  <th className="text-right px-4 py-2">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => {
                  const milestone = item.milestones?.find((entry: any) => entry.year === 2) || item.milestones?.[0];
                  const benefit = item.benefits?.find((entry: any) => entry.year === 3) || item.benefits?.[0];
                  return (
                    <tr key={item.account?.id} className="hover:bg-emerald-50/60 align-top">
                      <td className="px-4 py-3">
                        <div className="font-black text-slate-900">{item.user?.name || 'Ayudh User'}</div>
                        <div className="text-[10px] text-slate-500 font-semibold">{item.user?.phone || item.user?.email || item.userId}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-md border text-[10px] font-black ${statusClass(item.account?.status)}`}>
                          {item.account?.status || 'NOT_ENROLLED'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-700">{item.participation?.type || 'Not selected'}</td>
                      <td className="px-4 py-3 font-black text-slate-900">Rs. {Number(item.summary?.totalContributions || 0).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-slate-600">
                        <div>{milestone ? `Y${milestone.year}: ${milestone.status}` : 'No milestones'}</div>
                        <div>{benefit ? `Benefit: ${benefit.status}` : 'No benefit records'}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {milestone && (
                            <button
                              onClick={() => updateRecord('milestones', milestone, { status: 'COMPLETED', completedAt: new Date().toISOString() })}
                              disabled={savingId === milestone.id}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-black disabled:opacity-60"
                            >
                              <CheckCircle2 className="w-3 h-3 inline mr-1" />
                              Complete milestone
                            </button>
                          )}
                          {benefit && (
                            <button
                              onClick={() => updateRecord('benefits', benefit, { status: 'SCHEDULED' })}
                              disabled={savingId === benefit.id}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-black disabled:opacity-60"
                            >
                              Schedule benefit
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
