export default function LandlordDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
          Landlord <span className="text-[#CFA190]">Dashboard</span>
        </h1>
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] text-[#CFA190] border border-[#CFA190]/20 uppercase tracking-wider">
          Landlord
        </span>
      </div>
      {children}
    </div>
  );
}
