import React from "react";

export const metadata = {
  title: "Terms of Service | SOFYCODE",
  description: "Terms of Service for SOFYCODE custom software development.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen py-24 text-slate-600 dark:text-slate-300">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">1. Agreement to Terms</h2>
            <p>By accessing our website and utilizing the services provided by SOFYCODE, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Our Services</h2>
            <p>SOFYCODE provides custom software development, IT consulting and related technical services. The scope, deliverables, timeline and cost of specific projects are typically agreed upon in separate written contracts or Statements of Work (SOW) which reference these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. Intellectual Property</h2>
            <p>The Service and its original content, features and functionality are and will remain the exclusive property of SOFYCODE and its licensors. For bespoke software development services, intellectual property rights to the final deliverables are assigned to the client upon full payment, unless otherwise stated in the project contract.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. User Obligations</h2>
            <p>You agree not to use the service for any unlawful purpose or in any way that interrupts, damages, impairs, or renders the service less efficient. You are also prohibited from violating or attempting to violate the security of the website or platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Limitation of Liability</h2>
            <p>In no event shall SOFYCODE, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. We will try to provide at least 30 days notice prior to any new terms taking effect.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
