"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Linktree-style links (customize these)
const SUPPORT_LINKS: { label: string; href: string }[] = [
  { label: "Home Page", href: "/subscribe" },
  { label: "Teespring Store", href: "https://onecard.creator-spring.com/listing/new-one-card" },
  { label: "Donate (Cash App)", href: "https://cash.app/pools/POOL_06f64e4d-859c-42b0-a97a-c29411a74689" },
  { label: "Donate (PayPal)", href: "https://www.paypal.biz/clarencejordaniii" },
  { label: "Twitter/X", href: "https://x.com/jordan_cla50168" },
];

export default function SubscribeLinktree() {
  // Shared form state
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Anti-spam honeypot (must stay empty). Screenreaders won’t read it.
  const [website, setWebsite] = useState(""); // if filled, we silently no-op

  // Status per action
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msgStatus, setMsgStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [subResp, setSubResp] = useState("");
  const [msgResp, setMsgResp] = useState("");

  // Thank-You modal state
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");

  // minor: stable headers object
  const jsonHeaders = useMemo(() => ({ "Content-Type": "application/json" }), []);

  // helper: tiny jitter to foil the fastest bots
  const tinyDelay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

  const resetStates = () => {
    setSubStatus("idle");
    setMsgStatus("idle");
    setSubResp("");
    setMsgResp("");
  };

  const onSubscribe = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      resetStates();

      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail) {
        setSubStatus("error");
        setSubResp("Please enter an email.");
        return;
      }
      if (website) {
        // honeypot tripped — pretend success
        setModalTitle("You're in! 🎉");
        setModalDesc("Thanks for subscribing to One Card.");
        setOpen(true);
        setEmail("");
        return;
      }

      try {
        setSubStatus("loading");
        await tinyDelay();
        const r = await fetch("/api/subscribe", {
          method: "POST",
          headers: jsonHeaders,
          body: JSON.stringify({ email: cleanEmail }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data?.error || "Failed to subscribe");

        setSubStatus("ok");
        setSubResp("You're on the list. Check your inbox!");
        setModalTitle("You're in! 🎉");
        setModalDesc("Thanks for subscribing to One Card. Check your inbox for a welcome email.");
        setOpen(true);
        setEmail("");
      } catch (err: any) {
        setSubStatus("error");
        setSubResp(err?.message || "Something went wrong");
      }
    },
    [email, website, jsonHeaders]
  );

  const onMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      resetStates();

      const cleanEmail = email.trim().toLowerCase();
      const cleanMsg = message.trim();

      if (!cleanEmail || !cleanMsg) {
        setMsgStatus("error");
        setMsgResp("Email and message are required.");
        return;
      }
      if (website) {
        // honeypot tripped — pretend success
        setModalTitle("Message sent ✉️");
        setModalDesc("Thanks for reaching out. We’ll reply soon.");
        setOpen(true);
        setEmail("");
        setMessage("");
        return;
      }

      try {
        setMsgStatus("loading");
        await tinyDelay();
        const r = await fetch("/api/support", {
          method: "POST",
          headers: jsonHeaders,
          body: JSON.stringify({ email: cleanEmail, message: cleanMsg }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data?.error || "Failed to send message");

        setMsgStatus("ok");
        setMsgResp("Message sent — we’ll reply ASAP.");
        setModalTitle("Message sent ✉️");
        setModalDesc("Thanks for reaching out. We'll get back to you soon at the email you provided.");
        setOpen(true);
        setEmail("");
        setMessage("");
      } catch (err: any) {
        setMsgStatus("error");
        setMsgResp(err?.message || "Something went wrong");
      }
    },
    [email, message, website, jsonHeaders]
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-md px-4 py-12 sm:py-16">
        {/* Brand header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">One Card</h1>
          <p className="mt-1 text-emerald-300/90">All your cards. One tap.</p>
        </div>

        {/* Linktree-style column */}
        <div className="grid gap-3 mb-8">
          {SUPPORT_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center rounded-2xl border border-zinc-800/80 bg-zinc-900/70 px-5 py-3 text-[15px] text-emerald-200 hover:border-emerald-400/80 hover:bg-zinc-900 outline-none focus:ring-2 focus:ring-emerald-500/60 transition"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Toggle area: Message vs Subscribe */}
        <Card className="bg-zinc-900/85 border-zinc-800/90 shadow-lg">
          <CardContent className="p-5 sm:p-6">
            <Tabs defaultValue="subscribe" className="w-full">
              <TabsList className="grid grid-cols-2 bg-black/70 border border-zinc-800 rounded-xl p-1">
                <TabsTrigger
                  value="subscribe"
                  className="text-emerald-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-lg focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Subscribe
                </TabsTrigger>
                <TabsTrigger
                  value="message"
                  className="text-emerald-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-black rounded-lg focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Message me
                </TabsTrigger>
              </TabsList>

              <TabsContent value="subscribe" className="mt-4">
                <form onSubmit={onSubscribe} className="grid gap-3" noValidate>
                  {/* Honeypot */}
                  <div className="hidden">
                    <label htmlFor="website" aria-hidden="true">Website</label>
                    <input
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <label htmlFor="sub-email" className="sr-only">Email</label>
                  <Input
                    id="sub-email"
                    inputMode="email"
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-950 border-zinc-700 text-emerald-200 placeholder:text-emerald-300/65 focus-visible:ring-emerald-500"
                  />
                  <Button
                    disabled={subStatus === "loading"}
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium"
                  >
                    {subStatus === "loading" ? "Subscribing…" : "Subscribe"}
                  </Button>
                  {subStatus !== "idle" && (
                    <p
                      className={`text-sm min-h-[1.25rem] ${subStatus === "ok" ? "text-emerald-300" : "text-red-300"}`}
                      aria-live="polite"
                    >
                      {subResp}
                    </p>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="message" className="mt-4">
                <form onSubmit={onMessage} className="grid gap-3" noValidate>
                  {/* Honeypot shared */}
                  <div className="hidden">
                    <label htmlFor="website2" aria-hidden="true">Website</label>
                    <input
                      id="website2"
                      name="website2"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <label htmlFor="msg-email" className="sr-only">Email</label>
                  <Input
                    id="msg-email"
                    inputMode="email"
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-950 border-zinc-700 text-emerald-200 placeholder:text-emerald-300/65 focus-visible:ring-emerald-500"
                  />
                  <label htmlFor="msg-textarea" className="sr-only">Message</label>
                  <Textarea
                    id="msg-textarea"
                    required
                    placeholder="How can we help?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] bg-zinc-950 border-zinc-700 text-emerald-200 placeholder:text-emerald-300/65 focus-visible:ring-emerald-500"
                  />
                  <Button
                    disabled={msgStatus === "loading"}
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium"
                  >
                    {msgStatus === "loading" ? "Sending…" : "Send message"}
                  </Button>
                  {msgStatus !== "idle" && (
                    <p
                      className={`text-sm min-h-[1.25rem] ${msgStatus === "ok" ? "text-emerald-300" : "text-red-300"}`}
                      aria-live="polite"
                    >
                      {msgResp}
                    </p>
                  )}
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Thank-You Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-emerald-100">
            <DialogHeader>
              <DialogTitle className="text-emerald-400">{modalTitle}</DialogTitle>
              <DialogDescription className="text-emerald-200">{modalDesc}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end gap-2">
              <a href="/" className="mr-2">
                <Button variant="secondary" className="border-zinc-800 text-emerald-300">
                  Back to Home
                </Button>
              </a>
              <Button
                onClick={() => setOpen(false)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-medium"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <p className="text-center text-xs text-emerald-300/80 mt-6">
          © {new Date().getFullYear()} One Card
        </p>
      </section>
    </main>
  );
}
