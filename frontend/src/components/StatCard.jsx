export default function StatCard({ title, value, icon: Icon, tone = "blue" }) {
  const toneStyles = {
    blue: "bg-blue-50 text-blue-800 ring-blue-200",
    green: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    red: "bg-rose-50 text-rose-800 ring-rose-200"
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
        </div>
        <div className={`rounded-xl p-3 ring-1 ${toneStyles[tone] || toneStyles.blue}`}>
          {Icon && <Icon size={20} />}
        </div>
      </div>
    </div>
  );
}
