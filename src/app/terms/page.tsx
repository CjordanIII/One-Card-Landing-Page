import Link from "next/link";

const accent = "text-[#86F5C2]";
const panel = "bg-gray-900 border border-gray-800";
const text = "text-gray-200";
const subtle = "text-gray-400";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
        <header className="space-y-4">
          <div className="space-y-2">
            <p
              className={`${accent} text-sm font-semibold uppercase tracking-wide`}
            >
              Legal
            </p>
            <h1 className="text-3xl font-semibold">
              One Card Terms of Service
            </h1>
          </div>
          <p className="text-gray-300">
            One Card (a DBA operated by Clarence Jordan) ("One Card," "we,"
            "us," or "our") provides a financial technology platform through the
            website and applications associated with tryonecard.com
            (collectively, the "Services").
          </p>
          <div className={`${panel} rounded-2xl p-4 text-sm ${text} space-y-1`}>
            <div>Version: 1.0</div>
            <div>Last Updated: December 15, 2025</div>
            <div>Effective Date: December 15, 2025</div>
          </div>
          <p className="text-gray-300 text-sm">
            By creating an account, accessing, or using the Services, you agree
            to these Terms of Service ("Terms"). If you do not agree, do not use
            the Services.
          </p>
        </header>

        <div className="space-y-8">
          <section className={`${panel} rounded-2xl p-5 space-y-4`}>
            <h2 className="text-xl font-semibold">1. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                <strong>You / User</strong>: the person using the Services.
              </li>
              <li>
                <strong>Account</strong>: your One Card account.
              </li>
              <li>
                <strong>Connected Account</strong>: a bank account, debit card,
                credit card, or other payment method you link to the Services
                through our Third-Party Providers.
              </li>
              <li>
                <strong>Card</strong>: a virtual and/or physical payment card
                made available to you through a third-party card issuing
                program.
              </li>
              <li>
                <strong>Payment Instruction</strong>: a request you initiate (or
                authorize us to initiate) to route, charge, debit, credit, or
                transfer funds using your Connected Accounts, subject to these
                Terms and partner rules.
              </li>
              <li>
                <strong>Third-Party Providers</strong>: third parties we use to
                provide features such as payment processing, bank connections,
                identity verification, and card issuing (for example, Stripe and
                Lithic).
              </li>
              <li>
                <strong>Content</strong>: the text, graphics, logos, software,
                and other materials in the Services.
              </li>
            </ul>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              2. Who We Are (Important Disclosures)
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>One Card is a financial technology platform.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>We are not a bank and do not provide banking services.</li>
                <li>
                  Unless explicitly stated in writing, we do not accept
                  deposits, hold customer funds, offer interest-bearing
                  accounts, or provide credit or lending.
                </li>
              </ul>
              <p>
                Certain Services may be provided through Third-Party Providers
                and regulated financial institutions (including banks) according
                to their terms and policies. Your ability to use specific
                features may depend on eligibility, verification, fraud checks,
                and partner approvals.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">3. Eligibility</h2>
            <p className="text-gray-300">You must be:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>
                At least 18 years old (or the age of majority where you live, if
                higher), and
              </li>
              <li>Able to enter into a legally binding agreement.</li>
            </ul>
            <p className="text-gray-300">
              By using the Services, you represent and warrant that you meet
              these requirements and will use the Services only in compliance
              with applicable laws and regulations.
            </p>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              4. Account Registration, Security, and Communications
            </h2>
            <div className="space-y-2 text-gray-300">
              <h3 className="font-semibold">4.1 Account Registration</h3>
              <p>
                You agree to provide accurate and complete information when
                creating your Account and to keep it up to date.
              </p>

              <h3 className="font-semibold">4.2 Account Security</h3>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Maintaining the confidentiality of your login credentials
                </li>
                <li>All activity that occurs under your Account</li>
                <li>
                  Immediately notifying us of any unauthorized access or
                  suspected security issue
                </li>
              </ul>

              <h3 className="font-semibold">4.3 Electronic Communications</h3>
              <p>
                You consent to receive communications electronically (email,
                in-app notifications, and other electronic means). These
                communications may include notices about your Account,
                transactions, and legal updates.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              5. Identity Verification, Risk Screening, and Compliance
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>
                To help prevent fraud and comply with legal and partner
                requirements, we and/or our Third-Party Providers may:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Verify your identity (KYC)</li>
                <li>Validate Connected Accounts</li>
                <li>Conduct fraud and risk checks</li>
                <li>Require additional information or documentation</li>
              </ul>
              <p>
                You authorize us to share information you provide with
                Third-Party Providers and other parties as needed to provide the
                Services, perform verification, and comply with legal
                requirements.
              </p>
              <p>
                We may suspend, restrict, or terminate your access if
                verification fails, if we detect suspicious activity, or if
                required by law or partner policy.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              6. Third-Party Providers and Additional Terms
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>Some features depend on Third-Party Providers. For example:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Payment processing and bank linking may be provided by Stripe
                  or similar providers.
                </li>
                <li>
                  Card issuing and card transaction processing may be provided
                  by Lithic or similar providers, along with an issuing bank and
                  card networks.
                </li>
              </ul>
              <p>
                Your use of these features may require acceptance of additional
                terms (e.g., cardholder terms, bank connection terms, identity
                verification terms). If a conflict exists between these Terms
                and required Third-Party Provider terms for a specific feature,
                the Third-Party Provider terms may control only for that
                feature.
              </p>
              <p>
                We are not responsible for Third-Party Provider outages, errors,
                service interruptions, or acts/omissions.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              7. Description of the Services
            </h2>
            <p className="text-gray-300">
              One Card provides tools that may allow you to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>Link Connected Accounts (such as bank accounts and cards)</li>
              <li>
                Use a Card (virtual and/or physical) if available to you through
                partners
              </li>
              <li>
                Configure routing/allocation preferences (for example "split" or
                "smart" allocation rules)
              </li>
              <li>View transaction details and breakdowns</li>
              <li>
                Initiate transfers between Connected Accounts where supported
              </li>
            </ul>
            <p className="text-gray-300">
              Feature availability may vary based on your location, eligibility,
              partner limitations, and compliance requirements. Some features
              may be offered as beta and may change or be discontinued.
            </p>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              8. Authorizations You Grant to One Card
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>
                By using the Services, you authorize One Card (and our
                Third-Party Providers) to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Access permitted information from Connected Accounts you link
                  (with your consent)
                </li>
                <li>
                  Initiate Payment Instructions you approve (including charges,
                  debits, credits, and transfers, as supported)
                </li>
                <li>
                  Tokenize and store identifiers needed to facilitate processing
                  (rather than storing full raw account details whenever
                  possible)
                </li>
                <li>Provide transaction records and confirmations</li>
              </ul>
              <p>
                You understand that banks, card issuers, merchants, and networks
                can decline or reverse transactions for reasons outside our
                control.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              9. Card Program Terms (If a Card Is Provided)
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>If you are issued a Card through the Services:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  The Card is issued by a third-party issuing program and/or
                  bank and may be subject to cardholder terms and network rules.
                </li>
                <li>
                  Merchant authorizations may place holds. Final settlement
                  amounts can differ due to tips, adjustments, partial captures,
                  and reversals.
                </li>
                <li>
                  We may enforce limits or restrictions (MCC blocks, velocity
                  limits, geographic limits, risk flags) to comply with partner
                  rules and fraud controls.
                </li>
              </ul>
              <h3 className="font-semibold">9.1 Disputes and Chargebacks</h3>
              <p>
                Disputes are governed by card network rules and partner
                policies. You agree to provide timely information and
                documentation if you file a dispute. Outcomes are not
                guaranteed.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              10. Bank Linking and Financial Data Access
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>
                When you link bank accounts via a provider (such as Stripe
                Financial Connections), you may be asked to consent to sharing
                certain information, which can include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Account ownership/verification signals</li>
                <li>Bank name, account type, and limited account details</li>
                <li>Balances (where supported)</li>
                <li>Limited transaction information (where supported)</li>
              </ul>
              <p>
                How we use this data: to enable account verification, provide
                transparency in the app, route transactions according to your
                preferences, prevent fraud, and comply with legal and partner
                requirements.
              </p>
              <p>
                We do not use linked account data to offer credit, perform
                underwriting, or make lending decisions unless explicitly stated
                and legally permitted.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              11. Transfers and ACH (If Enabled)
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>If transfers or ACH features are enabled:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Transfers may be subject to cutoff times, holds, reversals,
                  and return codes.
                </li>
                <li>
                  ACH transactions can fail or be returned due to insufficient
                  funds, incorrect details, or bank restrictions.
                </li>
                <li>
                  You authorize us and our providers to initiate debits/credits
                  consistent with your Payment Instructions.
                </li>
                <li>
                  You are responsible for ensuring your Connected Accounts have
                  sufficient funds and are eligible for the requested
                  transactions.
                </li>
              </ul>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              12. Fees and Payment of Fees
            </h2>
            <div className="space-y-2 text-gray-300">
              <h3 className="font-semibold">12.1 Platform Fees</h3>
              <p>
                We may charge fees for certain transactions or features. Fees
                will be disclosed to you in the app, on our website, or at the
                time of the transaction. Examples may include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  A platform fee (for example: approximately 1% of a completed
                  routed transaction, if/when applicable)
                </li>
                <li>Transfer fees (if applicable)</li>
                <li>Failed payment handling or return fees (if applicable)</li>
              </ul>

              <h3 className="font-semibold">12.2 Third-Party Fees</h3>
              <p>
                Banks, card issuers, and providers may charge additional fees
                (overdraft, interest, cash advance, ACH return, wire fees,
                foreign transaction fees). Those are not controlled by One Card.
              </p>

              <h3 className="font-semibold">12.3 Refunds</h3>
              <p>
                Unless required by law or explicitly stated, fees are
                non-refundable.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">13. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>Use the Services only for lawful purposes</li>
              <li>Provide accurate information and keep it updated</li>
              <li>Maintain the security of your Account</li>
              <li>
                Ensure sufficient funds/availability in Connected Accounts for
                authorized transactions
              </li>
              <li>Notify us promptly of unauthorized activity</li>
            </ul>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">14. Prohibited Uses</h2>
            <div className="space-y-2 text-gray-300">
              <p>You may not use the Services for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fraud, money laundering, or illegal activity</li>
                <li>
                  Transactions involving restricted or illegal goods/services
                </li>
                <li>Violations of sanctions laws or export controls</li>
                <li>
                  Abuse of the platform (including manipulation, charge cycling,
                  or attempting to evade fraud controls)
                </li>
                <li>
                  Reverse engineering, scraping, or interfering with the
                  Services
                </li>
              </ul>
              <p>
                We may suspend/terminate accounts and share information with
                providers or authorities where required.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">15. Privacy</h2>
            <p className="text-gray-300">
              Our collection and use of personal information is described in our
              Privacy Policy. If you do not yet have one published, you should
              publish it at /privacy as soon as possible (Stripe and card
              programs commonly require both Terms + Privacy).
            </p>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">16. Intellectual Property</h2>
            <p className="text-gray-300">
              The Services and all associated Content are owned by One Card or
              its licensors and protected by law. You receive a limited,
              non-exclusive, non-transferable license to use the Services for
              personal use as permitted by these Terms. You may not copy,
              modify, sell, lease, distribute, or reverse engineer any part of
              the Services.
            </p>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              17. Beta Features and Changes to the Services
            </h2>
            <p className="text-gray-300">
              We may add, remove, modify, or discontinue features at any time.
              Some features may be labeled beta and may not be reliable or
              available at all times. We are not liable for losses caused by
              changes, feature removals, or service interruptions, subject to
              applicable law.
            </p>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              18. Suspension and Termination
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>You may stop using the Services at any time.</p>
              <p>
                We may suspend or terminate your Account, with or without notice
                where permitted, if:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You violate these Terms</li>
                <li>We suspect fraud or prohibited activity</li>
                <li>Required by law or partner policy</li>
                <li>We cannot verify your identity</li>
                <li>Your Account presents unacceptable risk</li>
              </ul>
              <p>
                You remain responsible for obligations incurred before
                termination.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">19. Disclaimers</h2>
            <div className="space-y-2 text-gray-300">
              <p>
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE
                MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
                EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>WE DO NOT GUARANTEE THAT:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>ANY TRANSACTION WILL BE APPROVED OR COMPLETED</li>
                <li>
                  BALANCE OR TRANSACTION DATA WILL BE REAL-TIME OR ERROR-FREE
                </li>
                <li>
                  THIRD-PARTY PROVIDERS WILL BE AVAILABLE WITHOUT INTERRUPTION
                </li>
              </ul>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              20. Limitation of Liability
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ONE CARD WILL NOT BE
                LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR BUSINESS
                INTERRUPTION.
              </p>
              <p>
                IN ALL CASES, ONE CARD'S TOTAL LIABILITY FOR ANY CLAIM RELATING
                TO THE SERVICES WILL NOT EXCEED THE GREATER OF:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>$100, OR</li>
                <li>
                  THE AMOUNT OF FEES YOU PAID TO ONE CARD IN THE 3 MONTHS PRIOR
                  TO THE EVENT GIVING RISE TO THE CLAIM.
                </li>
              </ul>
              <p>
                Some jurisdictions do not allow certain limitations, so some
                limitations may not apply to you.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">21. Indemnification</h2>
            <p className="text-gray-300">
              You agree to indemnify and hold harmless One Card and its owner,
              contractors, and partners from any claims, losses, liabilities,
              and expenses (including reasonable attorneys' fees) arising from:
              your use of the Services; your violation of these Terms; your
              violation of laws or third-party rights; fraud or misconduct
              associated with your Account.
            </p>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              22. Dispute Resolution and Arbitration
            </h2>
            <div className="space-y-2 text-gray-300">
              <h3 className="font-semibold">22.1 Informal Resolution First</h3>
              <p>
                Before filing a claim, you agree to contact us at{" "}
                <Link
                  href="mailto:support@tryonecard.com"
                  className="underline"
                >
                  support@tryonecard.com
                </Link>{" "}
                and provide: your name and account email; a description of the
                dispute; the relief you want. We will try to resolve the issue
                informally.
              </p>

              <h3 className="font-semibold">22.2 Binding Arbitration</h3>
              <p>
                If informal resolution fails, you and One Card agree to resolve
                disputes by binding arbitration under the Federal Arbitration
                Act, except: small claims court matters (if eligible); requests
                for injunctive relief relating to security, fraud, or
                intellectual property misuse.
              </p>
              <p>
                Arbitration provider: American Arbitration Association (AAA) or
                another reputable provider selected by One Card. Location:
                Dallas County, Texas (or remote/video where allowed). Language:
                English.
              </p>

              <h3 className="font-semibold">22.3 Class Action Waiver</h3>
              <p>
                Disputes must be brought on an individual basis. You waive any
                right to participate in class actions or class arbitrations.
              </p>

              <h3 className="font-semibold">22.4 Time Limit</h3>
              <p>
                Any claim must be brought within one (1) year after the event
                giving rise to the claim, unless a longer period is required by
                law.
              </p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">23. Governing Law</h2>
            <p className="text-gray-300">
              These Terms are governed by the laws of the State of Texas,
              excluding conflict-of-law principles, except where federal law
              applies.
            </p>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">
              24. Changes to These Terms
            </h2>
            <p className="text-gray-300">
              We may update these Terms. When we do, we will update the "Last
              Updated" date. If changes are material, we may provide additional
              notice (email or in-app). Continued use after the effective date
              means you accept the updated Terms.
            </p>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">25. Contact Information</h2>
            <div className="space-y-1 text-gray-300">
              <p>Business Name: One Card (DBA)</p>
              <p>
                Support Email:{" "}
                <Link
                  href="mailto:support@tryonecard.com"
                  className="underline"
                >
                  support@tryonecard.com
                </Link>
              </p>
              <p>Mailing Address: 13660 C F Hawn Fwy, Dallas, TX</p>
            </div>
          </section>

          <section className={`${panel} rounded-2xl p-5 space-y-3`}>
            <h2 className="text-xl font-semibold">26. Change Log</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>v1.0 – Initial release. (December 15, 2025)</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
