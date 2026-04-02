import React from "react";

export const metadata = {
  title: "Privacy Policy | SOFYCODE",
  description: "Privacy Policy for SOFYCODE custom software development.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-24 text-slate-600 dark:text-slate-300">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">1. Introduction</h2>
            <p>Welcome to SOFYCODE. We highly value your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we handle your personal data when you visit our website, platform and use our custom software development services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Identity Data:</strong> names, usernames, or similar identifiers.</li>
              <li><strong>Contact Data:</strong> billing addresses, email addresses and telephone numbers.</li>
              <li><strong>Technical Data:</strong> internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
              <li><strong>Usage Data:</strong> information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. How We Use Your Data</h2>
            <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. At SOFYCODE, securing your data in our software and processes is our highest priority.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@sofycode.com or through our primary consultation calls.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
