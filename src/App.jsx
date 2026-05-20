import React, { useState } from "react";
import "./index.css";


const CONTACT_EMAIL = "hana@kidypay.com";
const CONTACT_PHONE = "8452129394";
const CONTACT_PHONE_DISPLAY = "(845) 212-9394";

const faqs = [
  {
    q: "How can my company get back up to 100% of child care costs?",
    a: "In New York, the benefit can be split between a refundable New York State credit and a federal tax credit. The state side can cover up to 50% of qualified child care costs as a refundable credit. The federal side may cover up to another 40% or 50%, depending on business size, as a dollar-for-dollar tax credit against federal tax liability."
  },
  {
    q: "What does refundable mean?",
    a: "Refundable means the state credit may still be paid back to the company even if the company does not owe enough New York State tax. This is why the New York State credit is especially powerful."
  },
  {
    q: "Is the federal credit also refundable?",
    a: "No. The federal credit is generally nonrefundable. It can reduce your federal tax bill dollar-for-dollar, but the company needs enough federal tax liability to fully use it. Unused federal credit may be subject to general business credit carryforward rules."
  },
  {
    q: "What expenses can qualify?",
    a: "Qualified costs may include contracting with licensed child care providers, reserving spaces for employees, paying eligible child care facility costs, operating or supporting a qualified child care facility, and certain child care resource and referral costs."
  },
  {
    q: "What ages can be covered?",
    a: "For children under age 5, full-day child care may generally be part of the program. For school-age children, care may be structured for eligible before-school, after-school, vacation, or part-day care needs, depending on the provider and the program structure."
  },
  {
    q: "Is the child care benefit taxable to employees?",
    a: "Dependent care benefits may need to be reported on the employee’s W-2. For 2026, up to $7,500 may generally be excluded from taxable wages if the requirements are met. The exclusion can also be limited by the earned income of the employee and spouse. Amounts above the allowed exclusion are generally taxable wages."
  },
  {
    q: "How does a Dependent Care FSA help?",
    a: "A Dependent Care FSA can allow employees to use pre-tax dollars for eligible child care costs. This can reduce taxable income and help manage the employee-side reporting issue, especially when coordinated correctly with employer-provided child care benefits."
  },
  {
    q: "What does KidyPay do?",
    a: "KidyPay helps structure the program, coordinate with licensed child care providers, manage payments, organize child care benefit records, and prepare year-end documentation for the company and its accountant."
  }
];

function Logo({ light = false }) {
  return (
    <div className="inline-flex items-end leading-none select-none">
      <div className="relative flex items-end">
        <span
          className={`${light ? "text-white" : "text-[#072A63]"} text-[54px] md:text-[68px] font-[600] leading-none`}
          style={{
            fontFamily: 'Avenir Next, Inter, Helvetica, Arial, sans-serif',
            letterSpacing: '-0.03em',
            transform: 'translateY(2px)'
          }}
        >
          KidyPa
        </span>

        <span
          className="relative text-[78px] md:text-[92px] font-[600] leading-[0.78]"
          style={{
            marginLeft: '-2px',
            fontFamily: 'Avenir Next, Inter, Helvetica, Arial, sans-serif',
            letterSpacing: '-0.015em',
            display: 'inline-block',
            paddingBottom: '0.25em',
            marginBottom: '-0.25em',
            background: 'linear-gradient(to bottom, #5cb847 0%, #1e7a28 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          y

          <span
            className="absolute left-1/2 top-0 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full text-[14px] font-semibold"
            style={{
              transform: 'translate(-50%, -42%)',
              background: 'linear-gradient(to bottom, #5cb847 0%, #1e7a28 100%)',
              boxShadow: '0 4px 12px rgba(67,169,63,0.22)',
              WebkitTextFillColor: 'white',
              color: 'white',
            }}
          >
            $
          </span>
        </span>
      </div>
    </div>
  );
}

function Button({ children, variant = "primary", onClick, type = "button", className = "" }) {
  const style = variant === "primary" ? "bg-[#168A3A] text-white hover:bg-[#10722F]" : "bg-white text-[#0B1F3A] border border-slate-200 hover:bg-slate-50";
  return <button type={type} onClick={onClick} className={`rounded-2xl px-6 py-4 text-sm font-black shadow-sm transition ${style} ${className}`}>{children}</button>;
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow && <p className="text-sm font-black uppercase tracking-[0.25em] text-[#168A3A]">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p>}
    </div>
  );
}

function CreditCard({ color, title, percent, subtitle, cap, notes }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className={`${color === "green" ? "bg-[#168A3A]" : "bg-[#0B1F3A]"} px-6 py-4 text-center text-xl font-black text-white`}>
        {title}
      </div>
      <div className="p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className={`text-7xl font-black ${color === "green" ? "text-[#168A3A]" : "text-[#0B1F3A]"}`}>{percent}</div>
          <div>
            <p className="text-xl font-black uppercase leading-tight text-[#0B1F3A]">{subtitle}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{notes}</p>
          </div>
        </div>
        <div className="mt-7 border-t border-slate-200 pt-6">
          <p className="text-sm font-black uppercase tracking-wide text-slate-500">Annual Cap</p>
          <p className={`mt-1 text-4xl font-black ${color === "green" ? "text-[#168A3A]" : "text-[#0B1F3A]"}`}>{cap}</p>
        </div>
      </div>
    </div>
  );
}

function ExampleRow({ spend, state, federalSmall, federalLarge }) {
  const smallTotal = state + federalSmall;
  const largeTotal = state + federalLarge;
  const money = n => "$" + n.toLocaleString();
  return (
    <tr className="border-t border-slate-100">
      <td className="px-4 py-4 font-bold text-slate-700">{money(spend)}</td>
      <td className="px-4 py-4 font-bold text-[#168A3A]">{money(state)}</td>
      <td className="px-4 py-4 font-bold text-[#0B1F3A]">{money(federalSmall)}</td>
      <td className="px-4 py-4 font-bold text-[#0B1F3A]">{money(federalLarge)}</td>
      <td className="px-4 py-4 font-black text-[#168A3A]">{money(smallTotal)} / {money(largeTotal)}</td>
    </tr>
  );
}

function FAQItem({ item, open, setOpen }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <button onClick={setOpen} className="flex w-full items-center justify-between gap-4 p-6 text-left">
        <span className="text-lg font-black text-[#0B1F3A]">{item.q}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-xl font-black text-[#168A3A]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="px-6 pb-6 text-base leading-7 text-slate-600">{item.a}</p>}
    </div>
  );
}

function BookingForm() {
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", date: "", time: "", notes: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submitBooking = async e => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xkoejrvz", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          company: form.company,
          name: form.name,
          email: form.email,
          phone: form.phone,
          preferred_date: form.date,
          preferred_time: form.time,
          notes: form.notes,
          _subject: "KidyPay credit review booking request",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ company: "", name: "", email: "", phone: "", date: "", time: "", notes: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") return (
    <div className="mt-5 rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
      <div className="text-4xl mb-3">✅</div>
      <p className="text-xl font-black text-[#168A3A] mb-2">Request received!</p>
      <p className="text-sm text-slate-600 leading-relaxed">Thank you — we'll be in touch shortly to confirm your credit review appointment.</p>
      <button onClick={() => setStatus("idle")} className="mt-5 text-sm font-bold text-[#168A3A] hover:underline">Submit another request</button>
    </div>
  );

  return (
    <form onSubmit={submitBooking} className="mt-5 space-y-3 text-sm font-bold text-slate-700">
      <div className="grid gap-3 md:grid-cols-2">
        <input name="company" value={form.company} onChange={update} required placeholder="Company name" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168A3A]" />
        <input name="name" value={form.name} onChange={update} required placeholder="Your name" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168A3A]" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input name="email" value={form.email} onChange={update} required type="email" placeholder="Your email" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168A3A]" />
        <input name="phone" value={form.phone} onChange={update} placeholder="Phone number" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168A3A]" />
      </div>
      
      <div className="grid gap-3 md:grid-cols-2">
        <input name="date" value={form.date} onChange={update} type="date" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168A3A]" />
        <select name="time" value={form.time} onChange={update} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168A3A]">
          <option value="">Preferred time</option>
          <option>9:00 AM</option>
          <option>10:00 AM</option>
          <option>11:00 AM</option>
          <option>12:00 PM</option>
          <option>1:00 PM</option>
          <option>2:00 PM</option>
          <option>3:00 PM</option>
          <option>4:00 PM</option>
          <option>5:00 PM</option>
        </select>
      </div>
      <textarea name="notes" value={form.notes} onChange={update} placeholder="Anything you want us to know?" className="h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168A3A]" />
      <button type="submit" disabled={status === "sending"}
        className="w-full rounded-2xl bg-[#168A3A] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:bg-[#10722F] disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Request Review"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600 bg-red-50 rounded-xl px-4 py-2.5">Something went wrong — please try again or email us directly at {CONTACT_EMAIL}</p>
      )}
    </form>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {["Credits", "Savings", "Eligible Costs", "Employee Tax", "FAQ"].map(x => <a key={x} href={`#${x.toLowerCase().replaceAll(' ', '-')}`} className="text-sm font-black text-slate-700 hover:text-[#168A3A]">{x}</a>)}
          </nav>
          <a href="#schedule" className="rounded-2xl bg-[#168A3A] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:bg-[#10722F]">Schedule a Call</a>
        </div>
      </header>

      <main>
        <section className="overflow-hidden bg-gradient-to-br from-white via-white to-green-50">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-green-100 bg-white px-4 py-2 text-sm font-black text-[#168A3A] shadow-sm">New York + Federal Employer-Provided Child Care Credit</div>
              <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight text-[#0B1F3A] md:text-7xl">
                Turn child care costs into powerful tax credits.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-600">
                By providing child care for your employees, your company may be able to get back up to <span className="font-black text-[#168A3A]">100%</span> of qualified costs through a refundable New York State credit plus a federal dollar-for-dollar tax credit.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#credits" className="rounded-2xl bg-[#168A3A] px-6 py-4 text-center text-sm font-black text-white shadow-sm transition hover:bg-[#10722F]">See How It Works</a>
                <a href="#schedule" className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center text-sm font-black text-[#0B1F3A] shadow-sm transition hover:bg-slate-50">Contact Us</a>
              </div>
            </div>
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-xl">
              <p className="text-center text-sm font-black uppercase tracking-[0.25em] text-slate-500">Potential Annual Benefit</p>
              <div className="mt-5 rounded-[2rem] bg-[#0B1F3A] p-7 text-white">
                <p className="text-lg font-bold text-green-200">State refundable credit</p>
                <p className="mt-1 text-5xl font-black">$500,000</p>
                <div className="my-6 h-px bg-white/20" />
                <p className="text-lg font-bold text-green-200">Federal tax credit</p>
                <p className="mt-1 text-5xl font-black">$600,000</p>
                <div className="my-6 h-px bg-white/20" />
                <p className="text-lg font-bold text-green-200">Total possible benefit</p>
                <p className="mt-1 text-6xl font-black text-[#7ACB59]">$1.1M</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">Subject to eligibility, qualified expenses, caps, and federal tax liability.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="credits" className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Two credits" title="State credit first. Federal credit behind it." text="The New York State credit is the key because it is refundable. The federal credit can add major value when the company has enough federal tax liability." />
            <div className="grid gap-6 lg:grid-cols-2">
              <CreditCard color="green" title="New York State Credit" percent="50%" subtitle="Refundable Credit" cap="$500,000" notes="Covers up to 50% of qualified child care facility expenditures. If the credit is more than your state tax due, the balance may come back as a refund." />
              <CreditCard color="navy" title="Federal Credit" percent="40–50%" subtitle="Dollar-for-Dollar Tax Credit" cap="$500,000–$600,000" notes="General businesses may qualify for 40%; eligible small businesses may qualify for 50%. This credit reduces federal tax liability and is generally nonrefundable." />
            </div>
            <div className="mt-6 rounded-[2rem] bg-green-50 p-6 text-center">
              <p className="text-xl font-black text-[#0B1F3A]">Combined value can reach up to 90% for larger companies and up to 100% for eligible small businesses.</p>
              <p className="mt-2 text-slate-600">The state credit may be refundable. The federal credit depends on the company’s federal tax bill and other credit limitations.</p>
            </div>
          </div>
        </section>

        <section id="savings" className="bg-slate-50 px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Savings examples" title="How much can a company save?" text="These sample numbers show the concept. Actual credit should be reviewed by the company’s accountant based on the company’s facts." />
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                  <thead className="bg-[#0B1F3A] text-white">
                    <tr>
                      <th className="px-4 py-4">Qualified annual child care cost</th>
                      <th className="px-4 py-4">NY refundable credit</th>
                      <th className="px-4 py-4">Federal credit: small business</th>
                      <th className="px-4 py-4">Federal credit: other business</th>
                      <th className="px-4 py-4">Potential total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ExampleRow spend={100000} state={50000} federalSmall={50000} federalLarge={40000} />
                    <ExampleRow spend={250000} state={125000} federalSmall={125000} federalLarge={100000} />
                    <ExampleRow spend={500000} state={250000} federalSmall={250000} federalLarge={200000} />
                    <ExampleRow spend={1000000} state={500000} federalSmall={500000} federalLarge={400000} />
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">Maximum combined cap may reach $1.1M per year: $500K NY State refundable credit + up to $600K federal credit for eligible small businesses.</p>
          </div>
        </section>

        <section id="eligible-costs" className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Eligible costs" title="What child care costs can qualify?" text="The program must be structured properly and connected to qualified child care services for employees." />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><h3 className="text-2xl font-black text-[#0B1F3A]">Licensed providers</h3><p className="mt-4 leading-7 text-slate-600">Payments to licensed child care centers, family day care providers, or qualified child care programs may be eligible when the arrangement is properly structured.</p></div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><h3 className="text-2xl font-black text-[#0B1F3A]">School-based care</h3><p className="mt-4 leading-7 text-slate-600">Schools with a legally recognized child care designation may qualify for eligible child care programming, especially before-school, after-school, or care outside the regular school day.</p></div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><h3 className="text-2xl font-black text-[#0B1F3A]">Age structure</h3><p className="mt-4 leading-7 text-slate-600">For children under age 5, full-day care may generally fit the program. For ages 5 to 13, the eligible care is usually part-day care, such as after school, vacation days, and similar care needs.</p></div>
            </div>
          </div>
        </section>

        <section id="employee-tax" className="bg-[#0B1F3A] px-5 py-16 text-white">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Employee tax treatment" title="Taxable income, W-2 reporting, and FSA planning" text="The company credit can be very strong, but the employee-side tax treatment should also be planned correctly." />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-7 text-slate-900 shadow-sm">
                <h3 className="text-3xl font-black text-[#0B1F3A]">Dependent care benefit reporting</h3>
                <p className="mt-4 leading-7 text-slate-600">Employer-provided child care can be a taxable income benefit and may need to be reported on the employee’s W-2.</p>
                <div className="mt-6 rounded-2xl bg-green-50 p-5">
                  <p className="text-xl font-black text-[#168A3A]">Up to $7,500 exclusion for 2026</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">If requirements are met, up to $7,500 may be excluded from taxable wages. The exclusion can be limited by the earned income of the employee and spouse. Amounts above the allowed exclusion are generally taxable wages.</p>
                </div>
              </div>
              <div className="rounded-[2rem] bg-white p-7 text-slate-900 shadow-sm">
                <h3 className="text-3xl font-black text-[#0B1F3A]">Using a Dependent Care FSA</h3>
                <p className="mt-4 leading-7 text-slate-600">A Dependent Care FSA lets employees use pre-tax dollars for eligible child care expenses. When coordinated with the employer child care benefit, it can help reduce taxable income and organize the reporting properly.</p>
                <ul className="mt-6 space-y-3 text-slate-700">
                  <li>✓ Pre-tax child care dollars</li>
                  <li>✓ Helps reduce taxable wages</li>
                  <li>✓ Must be coordinated with employer-paid benefits</li>
                  <li>✓ Should be reviewed with payroll/accounting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="KidyPay handles the process" title="We make the program easy to run" text="Your company does not need to build the system alone. KidyPay helps coordinate the providers, payments, records, and year-end documentation." />
            <div className="grid gap-5 md:grid-cols-4">
              {[
                ["1", "Set up the company program", "We help structure the child care benefit and collect the needed company details."],
                ["2", "Contract with providers", "We coordinate with licensed child care centers, schools, and eligible providers."],
                ["3", "Manage payments", "We help organize payments to child care providers and track the related records."],
                ["4", "Prepare year-end documents", "We prepare documentation for your accountant to review and file with the tax return."],
              ].map(([num, title, text]) => (
                <div key={num} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#168A3A] text-xl font-black text-white">{num}</div>
                  <h3 className="text-xl font-black text-[#0B1F3A]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-slate-50 px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Q&A" title="Common questions companies ask" text="A simple explanation for business owners, CFOs, HR teams, and accountants." />
            <div className="space-y-4">
              {faqs.map((item, index) => <FAQItem key={item.q} item={item} open={openFaq === index} setOpen={() => setOpenFaq(openFaq === index ? -1 : index)} />)}
            </div>
          </div>
        </section>

        <section id="schedule" className="px-5 py-16">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0B1F3A] shadow-xl">
            <div className="grid gap-8 p-8 text-white lg:grid-cols-[1fr_0.8fr] lg:p-12">
              <div>
                <Logo light />
                <h2 className="mt-8 text-4xl font-black md:text-5xl">Ready to see what your company can save?</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">KidyPay helps companies provide child care benefits, support working parents, and prepare clean documentation for tax filing.</p>
                <div className="mt-8 space-y-2 text-base font-bold text-slate-200">
                  <p>Phone: <a href={`tel:${CONTACT_PHONE}`} className="text-white hover:text-green-200">{CONTACT_PHONE_DISPLAY}</a></p>
                  <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:text-green-200">{CONTACT_EMAIL}</a></p>
                </div>
              </div>
              <div className="rounded-[2rem] bg-white p-7 text-[#0B1F3A]">
                <h3 className="text-2xl font-black">Schedule a credit review</h3>
                <BookingForm />
              </div>
            </div>
          </div>
          <p className="mx-auto mt-5 max-w-5xl text-center text-xs leading-5 text-slate-500">This page is for general informational purposes only and is not tax or legal advice. Companies should review eligibility, payroll reporting, and tax filing with their accountant or tax advisor.</p>
        </section>
      </main>
    </div>
  );
}

