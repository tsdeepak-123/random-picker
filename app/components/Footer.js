import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 border-b border-slate-700">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span className="font-bold text-lg">TeamPicker</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fair, instant, and anonymous team generation for any group activity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-slate-300 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-slate-300 hover:text-white text-sm transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Privacy</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              No data is stored or sent to any server. Everything runs locally in your browser.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} TeamPicker. Free to use.</p>
          <p className="text-slate-600 text-xs">Built for fair team selection</p>
        </div>
      </div>
    </footer>
  );
}
