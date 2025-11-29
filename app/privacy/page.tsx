import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Scale with Chintan',
};

export default function PrivacyPage() {
  const lastUpdated = 'January 1, 2024';

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950">
      <Navigation />

      <main className="flex-grow mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              1. Introduction
            </h2>
            <p className="mb-4 text-neutral-400">
              Welcome to Scale with Chintan ("we," "our," or "us"). We are
              committed to protecting your personal information and your right to
              privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website.
            </p>
            <p className="text-neutral-400">
              Please read this privacy policy carefully. If you do not agree with
              the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              2. Information We Collect
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-white">
              2.1 Information You Provide
            </h3>
            <p className="mb-4 text-neutral-400">
              We may collect information that you voluntarily provide to us when
              you:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-neutral-400">
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our contact forms</li>
              <li>Leave comments on blog posts</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <h3 className="mb-2 text-xl font-semibold text-white">
              2.2 Automatically Collected Information
            </h3>
            <p className="mb-4 text-neutral-400">
              When you visit our website, we automatically collect certain
              information about your device, including:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-neutral-400">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages you visit and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Date and time of your visit</li>
            </ul>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              3. How We Use Your Information
            </h2>
            <p className="mb-4 text-neutral-400">
              We use the information we collect to:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-neutral-400">
              <li>Provide, maintain, and improve our website</li>
              <li>Send you newsletters and updates (with your consent)</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze website usage and trends</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="mb-4 text-neutral-400">
              We use cookies and similar tracking technologies to track activity
              on our website and store certain information. Cookies are files with
              a small amount of data which may include an anonymous unique
              identifier.
            </p>
            <p className="mb-4 text-neutral-400">
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept cookies,
              you may not be able to use some portions of our website.
            </p>
            <p className="text-neutral-400">
              We use cookies for the following purposes:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-neutral-400">
              <li>To enable certain functions of the website</li>
              <li>To provide analytics and improve user experience</li>
              <li>To store your preferences</li>
            </ul>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              5. Third-Party Services
            </h2>
            <p className="mb-4 text-neutral-400">
              We may use third-party services that collect, monitor, and analyze
              information to help us improve our website. These third parties may
              have access to your personal information only to perform these tasks
              on our behalf and are obligated not to disclose or use it for any
              other purpose.
            </p>
            <p className="text-neutral-400">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to review the privacy policies of any third-party
              sites you visit.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              6. Data Security
            </h2>
            <p className="mb-4 text-neutral-400">
              We implement appropriate technical and organizational security
              measures to protect your personal information. However, no method of
              transmission over the Internet or electronic storage is 100% secure,
              and we cannot guarantee absolute security.
            </p>
            <p className="text-neutral-400">
              While we strive to use commercially acceptable means to protect your
              personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              7. Your Rights
            </h2>
            <p className="mb-4 text-neutral-400">
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-neutral-400">
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to processing of your information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="mt-4 text-neutral-400">
              To exercise these rights, please contact us using the information
              provided in the Contact section below.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              8. Children's Privacy
            </h2>
            <p className="text-neutral-400">
              Our website is not intended for children under the age of 13. We do
              not knowingly collect personal information from children under 13.
              If you are a parent or guardian and believe your child has provided
              us with personal information, please contact us, and we will delete
              such information from our records.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-neutral-400">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">10. Contact Us</h2>
            <p className="mb-4 text-neutral-400">
              If you have any questions about this Privacy Policy, please contact
              us:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-neutral-400">
              <li>Email: hello@scalewithchintan.com</li>
              <li>Website: https://scalewithchintan.com</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

