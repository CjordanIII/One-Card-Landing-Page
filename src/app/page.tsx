// One Card – Landing Page + Simulator (Next.js/React)
// Theme: Black, Gray, Mint-Green (accessible contrast)
// Uses shadcn/ui + Tailwind + lucide-react. Mobile-first + performant (no external images).
// Includes: sticky CTA, scrollable sections, and the transaction split simulator at the bottom.
// NOTE: This is a single-file page. Drop into a Next.js route and it should render.
"use client" 
import { useMemo, useState } from "react" 
import { Card, CardContent } from "@/components/ui/card" 
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input" 
import { Slider } from "@/components/ui/slider" 
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs" 
import { Check, CreditCard, Trash, Shield, Zap, ChartPie, ArrowRight } from "lucide-react"
import Image from "next/image" 

// ---------------------------
// Theme helpers (tailwind classes)
// ---------------------------
// Mint palette
// -- mint-300: #86F5C2
// -- mint-400: #58EAB0
// -- mint-500: #2EE6A6
// -- emerald-ish fallback: #34D399
// Dark bg: #0B0D10 / gray-950

const mintText = "text-[#86F5C2]"       // bright mint for headings on black
const mintSolid = "bg-[#2EE6A6]" 
const mintOutline = "ring-1 ring-[#2EE6A6]/40" 
const darkBg = "bg-gray-950" 
const darkPanel = "bg-gray-900 border border-gray-800" 
const subtleText = "text-gray-400" 
const strongText = "text-gray-100" 

// ---------------------------
// Types & helpers
// ---------------------------

type Strategy = "sequential" | "percentage" 
type CapMode = "none" | "cap" 

interface FundingCard {
  id: string 
  brand: string 
  last4: string 
  balance: number  // available to spend right now (simulated in MVP)
  priority: number  // lower number runs first in sequential
  pct: number  // 0-100 percentage share in percentage strategy
}

interface Transaction {
  id: string 
  total: number 
  strategy: Strategy 
  capMode: CapMode 
  timestamp: string 
  lines: Record<string, number> 
  remaining: number 
  applied: boolean  // whether this fake transaction was applied to balances
}

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100 
}

export function computeSequentialSplit(
  total: number,
  cards: FundingCard[],
  capMode: CapMode
): { lines: Record<string, number>; remaining: number } {
  let need = round2(total) 
  const ordered = [...cards].sort((a, b) => a.priority - b.priority) 
  const lines: Record<string, number> = Object.fromEntries(cards.map((c) => [c.id, 0])) 

  for (const c of ordered) {
    if (need <= 0) break 
    const limit = capMode === "cap" ? c.balance : Number.POSITIVE_INFINITY 
    const take = round2(Math.min(limit, need)) 
    lines[c.id] = take 
    need = round2(need - take) 
  }
  return { lines, remaining: need } 
}

export function computePercentageSplit(
  total: number,
  cards: FundingCard[],
  capMode: CapMode
): { lines: Record<string, number>; remaining: number } {
  const pctSum = cards.reduce((a, c) => a + (c.pct || 0), 0) || 1 
  const normalized = cards.map((c) => ({ ...c, _norm: (c.pct || 0) / pctSum })) 

  const lines: Record<string, number> = Object.fromEntries(cards.map((c) => [c.id, 0])) 
  const need = round2(total) 

  // First pass: target shares
  for (const c of normalized) {
    let share = round2(need * c._norm) 
    if (capMode === "cap") share = Math.min(share, c.balance) 
    lines[c.id] = round2(share) 
  }

  // Re-distribute leftover to cards with headroom
  const assigned = Object.values(lines).reduce((a, b) => a + b, 0) 
  let leftover = round2(total - assigned) 
  if (leftover > 0) {
    for (const c of normalized) {
      if (leftover <= 0) break 
      const limit = capMode === "cap" ? c.balance : Number.POSITIVE_INFINITY 
      const headroom = round2(Math.max(0, limit - lines[c.id])) 
      const add = round2(Math.min(headroom, leftover)) 
      if (add > 0) {
        lines[c.id] = round2(lines[c.id] + add) 
        leftover = round2(leftover - add) 
      }
    }
  }

  return { lines, remaining: round2(total - Object.values(lines).reduce((a, b) => a + b, 0)) } 
}

// ---------------------------
// Lightweight runtime tests (console.assert)
// ---------------------------


// ---------------------------
// Navigation Header
// ---------------------------

function Header() {
  return (
    <header className={`${darkBg} sticky top-0 z-50 border-b border-gray-800`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="One Card Logo" 
            width={150} 
            height={40}
            className="h-8 w-auto"
            priority
          />
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#how" className="text-gray-300 hover:text-white transition-colors">How it works</a>
          <a href="#security" className="text-gray-300 hover:text-white transition-colors">Security</a>
          <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
          <Button className={`${mintSolid} text-gray-900 hover:opacity-90 font-medium`}>
            Join waitlist
          </Button>
        </div>
        <div className="md:hidden">
          <Image 
            src="/small-logo.png" 
            alt="One Card" 
            width={32} 
            height={32}
            className="h-8 w-8"
            priority
          />
        </div>
      </div>
    </header>
  )
}

// ---------------------------
// Landing Page
// ---------------------------

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${mintOutline} ${mintText}`}>
      {children}
    </span>
  ) 
}

function Section({ id, title, subtitle, children }: { id: string ; title: string ; subtitle?: string ; children: React.ReactNode }) {
  return (
    <section id={id} className="py-8 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className={`text-xl md:text-4xl font-semibold ${mintText}`}>{title}</h2>
          {subtitle && <p className="mt-2 text-sm md:text-base text-gray-300 max-w-3xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  ) 
}

function FeatureCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }> ; title: string ; desc: string }) {
  return (
    <div className={`${darkPanel} rounded-2xl p-5`}>
      <div className="flex items-center gap-3">
        <div className={`${mintSolid} text-gray-900 rounded-xl p-2`}><Icon className="w-5 h-5"/></div>
        <div className="text-lg text-gray-100 font-medium">{title}</div>
      </div>
      <p className="mt-3 text-sm text-gray-300">{desc}</p>
    </div>
  ) 
}

function Hero() {
  return (
    <section className={`relative ${darkBg} pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden`}>
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20" style={{background:"radial-gradient(closest-side,#2EE6A6,#0B0D10)"}}/>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div>
          <Badge>Early Access</Badge>
          <h1 className={`mt-4 text-2xl md:text-5xl font-semibold leading-tight ${strongText}`}>
            One Card — <span className={mintText}>combine your balances</span> at checkout
          </h1>
          <p className="mt-3 text-gray-300 text-sm md:text-lg">
            Link your existing cards and set how to fund every purchase — sequentially or by percentage. The merchant sees one card  you control the split.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button className={`${mintSolid} text-gray-900 hover:opacity-90 font-medium w-full sm:w-auto justify-center`}>Join the waitlist <ArrowRight className="w-4 h-4 ml-2"/></Button>
            <a href="#demo" className="inline-flex items-center justify-center rounded-md px-4 py-2 ring-1 ring-gray-700 text-gray-200 hover:bg-gray-900 w-full sm:w-auto text-center">
              See demo
            </a>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div><div className={`text-xl font-bold ${mintText}`}>2</div><div className={subtleText}>funding modes</div></div>
            <div><div className={`text-xl font-bold ${mintText}`}>JIT</div><div className={subtleText}>virtual card ready*</div></div>
            <div><div className={`text-xl font-bold ${mintText}`}>PCI</div><div className={subtleText}>tokenized inputs</div></div>
          </div>
        </div>

        {/* Lightweight, generated-look hero visual (pure CSS) */}
        <div className="relative">
          <div className={`${darkPanel} rounded-2xl p-4 md:p-6`}>
            <div className="text-sm text-gray-300">Checkout • $28.75</div>
            <div className="mt-3 space-y-3">
              {[{b:"Visa",l:"4242"},{b:"Mastercard",l:"4444"},{b:"Discover",l:"1111"}].map((x,i)=> (
                <div key={i} className="rounded-xl bg-gray-950 border border-gray-800 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-200">{x.b} ••{x.l}</div>
                    <div className={`${mintText}`}>$ {(i===0?6:i===1?15:7.75).toFixed(2)}</div>
                  </div>
                  <div className="mt-2 h-2 w-full bg-gray-800 rounded">
                    <div className="h-2 rounded" style={{width:`${i===0?21:i===1?52:27}%`,background:"linear-gradient(90deg,#2EE6A6,#86F5C2)"}}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-400">* Visual mock. Real product uses tokenization and issuer JIT funding.</div>
          </div>
        </div>
      </div>

      {/* Sticky CTA on mobile */}
      <div className="md:hidden fixed bottom-4 inset-x-4">
        <div className="flex gap-2">
          <a href="#demo" className="flex-1 inline-flex items-center justify-center rounded-lg bg-gray-900 text-gray-200 py-3 ring-1 ring-gray-800">Demo</a>
          <Button className={`flex-1 ${mintSolid} text-gray-900 font-medium py-3`}>Join waitlist</Button>
        </div>
      </div>
    </section>
  ) 
}

function Features() {
  return (
    <Section id="features" title="Why One Card?" subtitle="A single card at checkout. Your rules behind the scenes.">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <FeatureCard icon={Zap} title="Instant rules" desc="Choose sequential drain or percentage-based sharing. Adjust per card."/>
        <FeatureCard icon={Shield} title="Bank-level security" desc="Tokenization only. No raw card data in the app. Virtual card funding."/>
        <FeatureCard icon={ChartPie} title="Clear tracking" desc="Every purchase is journaled with exact sources and amounts."/>
      </div>
    </Section>
  ) 
}

function HowItWorks() {
  const steps = [
    { t: "Link", d: "Connect your existing cards via a secure provider." },
    { t: "Set rules", d: "Pick sequential or percentage, caps, and priorities." },
    { t: "Tap once", d: "Use the One Card. We split funding automatically." },
    { t: "Track", d: "See a ledger of sources for every transaction." },
  ] 
  return (
    <Section id="how" title="How it works">
      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {steps.map((s, i) => (
          <li key={i} className={`${darkPanel} rounded-2xl p-5`}>
            <div className={`${mintSolid} text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-semibold`}>{i+1}</div>
            <div className="mt-3 text-gray-100 font-medium">{s.t}</div>
            <p className="text-sm text-gray-300 mt-1">{s.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  ) 
}

function SecurityNote() {
  return (
    <Section id="security" title="Security & compliance">
      <div className={`${darkPanel} rounded-2xl p-6 text-sm text-gray-300`}>
        We avoid raw PAN entry by using a PCI-compliant tokenization provider (e.g., Stripe Financial Connections / Plaid).
        Funding executes via issuer <em>just‑in‑time</em> controls so merchants see one charge. KYC/AML and program compliance apply for production.
      </div>
    </Section>
  ) 
}

// ---------------------------
// Demo / Simulator (from prior page, styled to green/black)
// ---------------------------

const demoCards: FundingCard[] = [
  { id: "c1", brand: "Visa", last4: "4242", balance: 6.0, priority: 1, pct: 20 },
  { id: "c2", brand: "Mastercard", last4: "4444", balance: 15.0, priority: 2, pct: 30 },
  { id: "c3", brand: "Discover", last4: "1111", balance: 40.0, priority: 3, pct: 50 },
] 

function Simulator() {
  const [tab, setTab] = useState("wallet") 
  const [cards, setCards] = useState<FundingCard[]>(demoCards) 
  const [merchantTotal, setMerchantTotal] = useState(28.75) 
  const [strategy, setStrategy] = useState<Strategy>("sequential") 
  const [capMode, setCapMode] = useState<CapMode>("cap") 
  const [splits, setSplits] = useState<Record<string, number>>(
    Object.fromEntries(demoCards.map((c) => [c.id, 0]))
  ) 
  const [transactions, setTransactions] = useState<Transaction[]>([]) 
  // Link-card form state (mock)
  const [newCardNumber, setNewCardNumber] = useState("") 
  const [newExp, setNewExp] = useState("") 
  const [newCvc, setNewCvc] = useState("") 
  const [newZip, setNewZip] = useState("") 

  const totalSplit = useMemo(() => Object.values(splits).reduce((a, b) => a + b, 0), [splits]) 
  const remaining = Math.max(0, round2(merchantTotal - totalSplit)) 

  const recompute = () => {
    if (strategy === "sequential") {
      const r = computeSequentialSplit(merchantTotal, cards, capMode) 
      setSplits(r.lines) 
      return 
    }
    if (strategy === "percentage") {
      const r = computePercentageSplit(merchantTotal, cards, capMode) 
      setSplits(r.lines) 
      return 
    }
  } 

  const confirmSplit = () => {
    const lines = cards
      .filter((c) => (splits[c.id] || 0) > 0)
      .map((c) => `${c.brand} ••${c.last4}: $${(splits[c.id] || 0).toFixed(2)}`)
      .join("\n") 

    const msg =
      `Charging $${merchantTotal.toFixed(2)} via "${strategy}" strategy as:\n` +
      lines +
      (remaining > 0
        ? `\n\nRemaining: $${remaining.toFixed(2)} (needs funding)`
        : `\n\nAll set! ✅`) 

    alert(msg) 
  } 

  const setPriority = (id: string, pr: number) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, priority: pr } : c))) 
  } 
  const setPct = (id: string, pct: number) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, pct } : c))) 
  } 

  const simulateTransaction = (apply = false) => {
    const r = strategy === "sequential"
      ? computeSequentialSplit(merchantTotal, cards, capMode)
      : computePercentageSplit(merchantTotal, cards, capMode) 

    const tx: Transaction = {
      id: String(Date.now()),
      total: merchantTotal,
      strategy,
      capMode,
      timestamp: new Date().toISOString(),
      lines: r.lines,
      remaining: r.remaining,
      applied: apply,
    } 

    setTransactions((prev) => [tx, ...prev]) 

    if (apply && r.lines) {
      setCards((prev) => prev.map((c) => ({ ...c, balance: round2(c.balance - (r.lines[c.id] || 0)) }))) 
    }

    setSplits(r.lines) 
  } 

  const clearTransactions = () => setTransactions([]) 
  const removeTransaction = (id: string) => setTransactions((prev) => prev.filter((t) => t.id !== id)) 

  const saveCard = () => {
    // Basic validation: require at least 4 digits for last4
    const digits = (newCardNumber || "").replace(/\D/g, "") 
    if (digits.length < 4) {
      alert("Enter a valid card number (last 4 digits required).") 
      return 
    }

    const last4 = digits.slice(-4) 
    // crude brand detection
    let brand = "Card" 
    if (digits.startsWith("4")) brand = "Visa" 
    else if (/^5[1-5]/.test(digits) || digits.startsWith("5")) brand = "Mastercard" 
    else if (digits.startsWith("6")) brand = "Discover" 

    const nextPriority = (cards.length || 0) + 1 

    const newCard: FundingCard = {
      id: `c_${Date.now()}`,
      brand,
      last4,
      balance: 0.0,
      priority: nextPriority,
      pct: 0,
    } 

    setCards((prev) => [...prev, newCard]) 
    // clear form
    setNewCardNumber("") 
    setNewExp("") 
    setNewCvc("") 
    setNewZip("") 
    // switch to wallet tab to show added card
    setTab("wallet") 
  } 

  return (
    <section id="demo" className="py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className={`text-2xl md:text-4xl font-semibold ${mintText}`}>Try the split logic</h2>
          <p className="mt-2 text-sm md:text-base text-gray-300">Edit balances, choose a strategy, and simulate a purchase.</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full mb-6 gap-2 text-xs sm:text-sm">
            <TabsTrigger className="w-full" value="wallet">Wallet</TabsTrigger>
            <TabsTrigger className="w-full" value="split">Split Payment</TabsTrigger>
            <TabsTrigger className="w-full" value="link">Link Card</TabsTrigger>
          </TabsList>

          <TabsContent value="wallet">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {cards.map((c) => (
                <Card key={c.id} className={`${darkPanel} rounded-2xl`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm uppercase tracking-wide text-gray-300">{c.brand}</div>
                      <CreditCard className="w-4 h-4 text-gray-400"/>
                    </div>
                    <div className="mt-1 text-lg text-gray-200">•• {c.last4}</div>
                    <div className="mt-3 text-sm text-gray-400">Available</div>
                    <div className={`text-2xl font-semibold ${mintText}`}>${c.balance.toFixed(2)}</div>
                    <div className="mt-3 text-xs text-gray-400">Priority: {c.priority} • Pct: {c.pct}%</div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input
                        className="w-full bg-gray-950 border-gray-800 text-gray-200 placeholder:text-gray-500"
                        type="number"
                        step="0.01"
                        value={c.balance}
                        onChange={(e) => setCards((prev) => prev.map((x) => x.id === c.id ? { ...x, balance: round2(Number(e.target.value || 0)) } : x))}
                      />
                      <Button className={`${mintSolid} text-gray-900 w-full sm:w-auto hover:opacity-90`} onClick={() => setCards((prev) => prev.filter((x) => x.id !== c.id))}><Trash className="w-4 h-4"/></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className={`${darkPanel} rounded-2xl`}>
                <CardContent className="p-4 space-y-3">
                  <div className="text-sm text-gray-300">Simulator</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input type="number" step="0.01" value={merchantTotal} onChange={(e) => setMerchantTotal(Number(e.target.value || 0))} className="w-full bg-gray-950 border-gray-800 text-gray-200"/>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ">
                    
                        <Button onClick={() => simulateTransaction(true)} className="bg-gray-800 text-gray-100 ring-1 ring-gray-700 w-full sm:w-auto">Simulate & Apply</Button>
                      </div>
                    </div>
                  <div className="text-xs text-gray-400">“Apply” deducts from the fake balances</div>
                </CardContent>
              </Card>

              <Card className={`${darkPanel} rounded-2xl`}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-300">Transactions</div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" className="bg-gray-800 text-gray-100 ring-1 ring-gray-700" onClick={clearTransactions}>Clear</Button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-auto">
                    {transactions.length === 0 && <div className="text-xs text-gray-500">No simulated transactions yet</div>}
                    {transactions.map((t) => (
                      <div key={t.id} className="p-2 rounded bg-gray-950 border border-gray-800">
                        <div className="flex items-center justify-between text-xs text-gray-300">
                          <div>{new Date(t.timestamp).toLocaleString()}</div>
                          <div>{t.applied ? "Applied" : "Simulated"}</div>
                        </div>
                        <div className="text-sm mt-1 text-gray-200">Total: ${t.total.toFixed(2)} • Strategy: {t.strategy}</div>
                        <div className="text-xs mt-2 text-gray-300">
                          {Object.entries(t.lines).filter(([,v])=>v>0).map(([id,amt]) => {
                            const card = cards.find(c=>c.id===id) || demoCards.find(d=>d.id===id) 
                            return (
                              <div key={id} className="flex items-center justify-between">
                                <div className="text-xs">{card?.brand} ••{card?.last4}</div>
                                <div className="text-xs">${(amt||0).toFixed(2)}</div>
                              </div>
                            ) 
                          })}
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <Button variant="secondary" className="bg-gray-800 text-gray-100 ring-1 ring-gray-700" onClick={() => removeTransaction(t.id)}>Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Split Payment */}
          <TabsContent value="split">
            <Card className={`${darkPanel} rounded-2xl`}>
              <CardContent className="p-4 space-y-5">
                <div className="flex flex-wrap items-end gap-3">
                  <div className="grow min-w-[220px]">
                    <label className="text-sm text-gray-300">Purchase Total</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={merchantTotal}
                      onChange={(e) => setMerchantTotal(Number(e.target.value || 0))}
                      className="bg-gray-950 border-gray-800 text-gray-200"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant={strategy === "sequential" ? "default" : "secondary"} className={`${strategy==="sequential"?mintSolid:"bg-gray-800 text-gray-100 ring-1 ring-gray-700"} text-gray-900`} onClick={() => setStrategy("sequential")}>
                      Sequential
                    </Button>
                    <Button variant={strategy === "percentage" ? "default" : "secondary"} className={`${strategy==="percentage"?mintSolid:"bg-gray-800 text-gray-100 ring-1 ring-gray-700"} text-gray-900`} onClick={() => setStrategy("percentage")}>
                      Percentage
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button className={`${capMode==="cap"?mintSolid:"bg-gray-800 text-gray-100 ring-1 ring-gray-700"} text-gray-900`} onClick={() => setCapMode("cap")}>
                      Cap by balance
                    </Button>
                    <Button className={`${capMode==="none"?mintSolid:"bg-gray-800 text-gray-100 ring-1 ring-gray-700"} text-gray-900`} onClick={() => setCapMode("none")}>
                      Ignore caps
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <Button variant="secondary" className="bg-gray-800 text-gray-100 ring-1 ring-gray-700" onClick={recompute}>Auto-calc</Button>
                    <Button onClick={confirmSplit} className={`${mintSolid} text-gray-900`}>Confirm Split</Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {cards.map((c) => (
                    <div key={c.id} className="rounded-xl p-4 bg-gray-950 border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-200">{c.brand} ••{c.last4}</div>
                        <div className="text-xs text-gray-400">Balance: ${c.balance.toFixed(2)}</div>
                      </div>

                      {strategy === "sequential" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <div className="text-xs text-gray-400 mb-1">Priority (1 runs first)</div>
                              <Input
                                type="number"
                                className="w-full bg-gray-950 border-gray-800 text-gray-200"
                                value={c.priority}
                                onChange={(e) => setPriority(c.id, Math.max(1, Math.floor(Number(e.target.value || 1))))}
                              />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Assigned (manual override)</div>
                              <div className="flex flex-col sm:flex-row items-center gap-3">
                              <Slider
                                value={[splits[c.id] || 0]}
                                min={0}
                                max={capMode === "cap" ? c.balance : merchantTotal}
                                step={0.5}
                                onValueChange={([v]) => setSplits({ ...splits, [c.id]: round2(v) })}
                                className="flex-1"
                              />
                              <Input
                                className="w-full sm:w-28 bg-gray-950 border-gray-800 text-gray-200"
                                type="number"
                                step="0.01"
                                value={splits[c.id] || 0}
                                onChange={(e) => setSplits({ ...splits, [c.id]: round2(Number(e.target.value || 0)) })}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Percentage of each purchase</div>
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                              <Slider
                                value={[c.pct]}
                                min={0}
                                max={100}
                                step={1}
                                onValueChange={([v]) => setPct(c.id, Math.round(v))}
                                className="flex-1"
                              />
                              <Input
                                className="w-full sm:w-24 bg-gray-950 border-gray-800 text-gray-200"
                                type="number"
                                step="1"
                                value={c.pct}
                                onChange={(e) =>
                                  setPct(
                                    c.id,
                                    Math.max(0, Math.min(100, Math.round(Number(e.target.value || 0))))
                                  )
                                }
                              />
                              <div className="text-xs text-gray-400">%</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Calculated share</div>
                            <div className="text-sm text-gray-200">${round2((merchantTotal * (c.pct || 0)) / 100).toFixed(2)} (pre-cap)</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-gray-300">Assigned: ${totalSplit.toFixed(2)}</div>
                  <div className={`text-sm ${remaining > 0 ? "text-amber-300" : mintText}`}>
                    {remaining > 0 ? `Remaining: $${remaining.toFixed(2)}` : (
                      <span className="inline-flex items-center"><Check className="w-4 h-4 mr-1"/>Covered</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Link Card (mock) */}
          <TabsContent value="link">
            <Card className={`${darkPanel} rounded-2xl`}>
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="text-sm text-gray-300 mb-1">Add a card (mock)</div>
                  <Input 
                    placeholder="Card number" 
                    value={newCardNumber}
                    onChange={(e) => setNewCardNumber(e.target.value)}
                    className="bg-gray-950 border-gray-800 text-gray-200 placeholder:text-gray-500" 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input 
                    placeholder="MM/YY" 
                    value={newExp}
                    onChange={(e) => setNewExp(e.target.value)}
                    className="bg-gray-950 border-gray-800 text-gray-200 placeholder:text-gray-500" 
                  />
                  <Input 
                    placeholder="CVC" 
                    value={newCvc}
                    onChange={(e) => setNewCvc(e.target.value)}
                    className="bg-gray-950 border-gray-800 text-gray-200 placeholder:text-gray-500" 
                  />
                  <Input 
                    placeholder="ZIP" 
                    value={newZip}
                    onChange={(e) => setNewZip(e.target.value)}
                    className="bg-gray-950 border-gray-800 text-gray-200 placeholder:text-gray-500" 
                  />
                </div>
                <Button onClick={saveCard} className={`${mintSolid} text-gray-900 w-full`}>Save Card</Button>
                <div className="text-xs text-gray-500">
                  Production note: use Stripe Elements / Financial Connections or Plaid to tokenize &mdash; don&apos;t collect raw PAN data.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  ) 
}

function Footer() {
  return (
    <footer className={`${darkBg} py-10 border-t border-gray-800 w-full`}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-400 text-sm">© {new Date().getFullYear()} One Card. All rights reserved.</div>
        <div className="flex items-center gap-4 text-sm">
          <a className="text-gray-300 hover:text-white" href="#features">Features</a>
          <a className="text-gray-300 hover:text-white" href="#how">How it works</a>
          <a className="text-gray-300 hover:text-white" href="#security">Security</a>
          <a className="text-gray-300 hover:text-white" href="#demo">Demo</a>
        </div>
      </div>
    </footer>
  ) 
}

export default function OneCardLanding() {
  return (
    <main className={`${darkBg} ${strongText} overflow-x-clip`}>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <SecurityNote />
      <Simulator />
      <Footer />
    </main>
  )
}
