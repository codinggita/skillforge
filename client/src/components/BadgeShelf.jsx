export default function BadgeShelf({ earned = [], loading }) {
  if (loading) {
    return (
      <div className="glass rounded-2xl p-6 border border-white/5">
        <h3 className="text-white font-bold text-lg mb-4">Badges</h3>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-14 h-14 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const shown  = earned.slice(0, 8);   // show latest 8
  const extras = earned.length - shown.length;

  return (
    <div className="glass rounded-2xl p-6 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-bold text-lg">Badges</h3>
          <p className="text-gray-500 text-xs mt-0.5">{earned.length} earned</p>
        </div>
        {earned.some((b) => b.isNew) && (
          <span className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-semibold animate-pulse">
            ✨ New badge!
          </span>
        )}
      </div>

      {earned.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-3xl mb-2">🏅</p>
          <p className="text-gray-500 text-sm">No badges yet — keep submitting!</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {shown.map((badge) => (
            <BadgeItem key={badge.id} badge={badge} />
          ))}
          {extras > 0 && (
            <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-xs text-gray-400 font-bold">
              +{extras}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BadgeItem({ badge }) {
  return (
    <div className="relative group">
      <div className={`w-14 h-14 rounded-2xl glass border flex items-center justify-center text-2xl cursor-default transition-all duration-200 hover:scale-110 hover:border-blue-500/40 ${badge.isNew ? "border-blue-500/50 glow-blue" : "border-white/10"}`}>
        {badge.icon}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
        <div className="glass rounded-xl px-3 py-2 border border-white/10 text-center min-w-[120px] max-w-[180px]">
          <p className="text-white text-xs font-bold whitespace-nowrap">{badge.name}</p>
          <p className="text-gray-400 text-[10px] mt-0.5 leading-tight">{badge.description}</p>
        </div>
        <div className="w-2 h-2 bg-gray-900 border-r border-b border-white/10 rotate-45 mx-auto -mt-1" />
      </div>

      {badge.isNew && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-950 animate-bounce" />
      )}
    </div>
  );
}
