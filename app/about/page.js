export const metadata = {
  title: "About",
  description:
    "Learn how TeamPicker works, how teams are generated fairly, and why no data is ever stored.",
  alternates: { canonical: "https://team-member.netlify.app/about" },
  openGraph: {
    title: "About — TeamPicker",
    description: "Learn how TeamPicker generates fair random teams instantly.",
    url: "https://team-member.netlify.app/about",
  },
};

const STEPS = [
  { n: "1", title: "Add Members", desc: "Enter the name of every participant one by one using the input box on the Home page." },
  { n: "2", title: "Choose Team Count", desc: "Select how many teams you want to form — anywhere between 2 and 6 teams." },
  { n: "3", title: "Generate", desc: "Click Generate Teams. Names are shuffled using a proven algorithm and distributed evenly." },
  { n: "4", title: "View Results", desc: "The final teams are displayed instantly. Start over any time to run a fresh selection." },
];

const FAQS = [
  {
    q: "Is it truly random?",
    a: "Yes. TeamPicker uses the Fisher-Yates shuffle algorithm — the gold standard for unbiased random permutations — powered by your browser's built-in random number generator. Every possible combination has an equal chance.",
  },
  {
    q: "Is any data stored or tracked?",
    a: "No. TeamPicker runs entirely in your browser. No names, results, or usage data are ever sent to any server. Once you close the tab, everything is gone. There are no accounts and nothing to sign up for.",
  },
  {
    q: "How many members can I add?",
    a: "There is no hard limit. You can add as many members as you like. The tool works best when the number of members is divisible by the number of teams so all teams are equal in size.",
  },
  {
    q: "Can I use this on my phone?",
    a: "Yes. TeamPicker is fully responsive and works on any modern mobile browser, tablet, or desktop — no app installation needed.",
  },
];

export default function AboutPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            About Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Fair teams, zero effort
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            TeamPicker was built to take the bias and awkwardness out of group
            formation — making every split instant, transparent, and genuinely random.
          </p>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold mb-1">100%</p>
            <p className="text-blue-200 text-xs sm:text-sm font-medium">Browser-based</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold mb-1">Free</p>
            <p className="text-blue-200 text-xs sm:text-sm font-medium">No account needed</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold mb-1">Fair</p>
            <p className="text-blue-200 text-xs sm:text-sm font-medium">Unbiased algorithm</p>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How It Works</h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">Four simple steps from names to teams.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-base flex items-center justify-center mb-4">
                  {s.n}
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((f) => (
              <div key={f.q} className="border border-slate-200 rounded-xl p-5 sm:p-6">
                <h3 className="font-bold text-slate-900 text-base mb-2 flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </span>
                  {f.q}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed pl-6">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
            Ready to pick your teams?
          </h2>
          <p className="text-slate-500 mb-8 text-sm sm:text-base">
            It takes less than a minute. No signup required.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors shadow-sm touch-manipulation"
          >
            Go to Team Picker
          </a>
        </div>
      </section>

    </main>
  );
}
