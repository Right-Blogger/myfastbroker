'use client';

import React from 'react';
import { X, Shield, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'disclaimer' | 'advertiser' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    disclaimer: 'Financial & Regulatory Risk Disclaimer',
    advertiser: 'Advertiser & Affiliate Disclosure'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="bg-[#0c0c0e] w-full max-w-3xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative max-h-[85vh] flex flex-col text-[#e5e7eb]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-[#080809] border-b border-white/10 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Legal & Compliance
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {titles[type]}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-gray-300 text-sm leading-relaxed space-y-4">
          {type === 'privacy' && (
            <>
              <p className="text-xs text-gray-400">Last Updated: September 2025</p>
              <h3 className="text-base font-bold text-white">1. Information We Collect</h3>
              <p>
                MyFastBroker (myfastbroker.news, also associated with myfastbroker.com) respects your privacy. We do not sell personal identification data to third-party telemarketers. When you use our calculators or submit queries to our editorial team via collab.topagency@gmail.com, we collect only the necessary contact details to fulfill your request.
              </p>
              <h3 className="text-base font-bold text-white">2. Cookies and Analytics</h3>
              <p>
                We use privacy-preserving analytical cookies to measure aggregate platform engagement, comparison tool usage, and popular search queries. This helps us ensure calculators provide accurate real-time values.
              </p>
              <h3 className="text-base font-bold text-white">3. Data Retention and GDPR / CCPA Rights</h3>
              <p>
                You retain the right to request access, rectification, or erasure of any communication records stored on our servers. For data privacy requests, contact our compliance officer at collab.topagency@gmail.com.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p className="text-xs text-gray-400">Last Updated: September 2025</p>
              <h3 className="text-base font-bold text-white">1. Acceptance of Terms</h3>
              <p>
                By accessing MyFastBroker (myfastbroker.news) or its subsidiary domains (myfastbroker.com, myfast broker.com, my fastbroker.com), you agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately.
              </p>
              <h3 className="text-base font-bold text-white">2. Non-Advisory Nature</h3>
              <p>
                MyFastBroker provides financial news, educational guides, comparison tables, and mathematical estimation tools. MyFastBroker is not a registered investment advisor, broker-dealer, commodity trading advisor (CTA), or financial intermediary. All materials are published strictly for informational purposes.
              </p>
              <h3 className="text-base font-bold text-white">3. Verification of Third-Party Terms</h3>
              <p>
                While our research team conducts regular audits of fee schedules and terms, brokerage firms may alter their pricing, margin rates, and contractual conditions at their discretion. Users are advised to review the final terms on the respective broker&apos;s official website prior to funding an account.
              </p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">High Risk Warning:</strong> Complex financial products including foreign exchange, options, futures, and CFDs carry high risk of rapid capital loss due to leverage.
                </div>
              </div>
              <h3 className="text-base font-bold text-white">Statutory Regulatory Notice</h3>
              <p>
                In compliance with US SEC, FINRA, CFTC, UK FCA, and Australian ASIC regulations, users are notified that past performance is never an indicator of future results. No mathematical model, calculator, or platform rating provided on myfastbroker.news guarantees profitability or capital preservation.
              </p>
              <p>
                Before participating in margin trading or complex derivative strategies, thoroughly evaluate your investment objectives, risk tolerance, and financial condition.
              </p>
            </>
          )}

          {type === 'advertiser' && (
            <>
              <h3 className="text-base font-bold text-white">How MyFastBroker Remains 100% Free</h3>
              <p>
                MyFastBroker is committed to complete transparency. To maintain our full-time research team and provide free calculators, comparison tools, and news on myfastbroker.news, we may receive compensation through affiliate partnerships when users open an account via links on our site.
              </p>
              <h3 className="text-base font-bold text-white">Editorial Independence Guarantee</h3>
              <p>
                Our commercial relationships never influence our editorial ratings or algorithmically generated review scores. Brokers cannot pay for top-ranking placement or favorable star ratings. If a broker fails our safety criteria or charges abusive fees, they receive a low rating regardless of affiliate relationships.
              </p>
              <p>
                For partnership or listing inquiries, reach out directly to our corporate desk at <strong className="text-white">collab.topagency@gmail.com</strong>.
              </p>
            </>
          )}
        </div>

        <div className="p-4 bg-[#080809] border-t border-white/10 flex justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 accent-gradient hover:opacity-90 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
