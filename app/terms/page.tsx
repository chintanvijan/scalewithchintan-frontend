import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Scale with Chintan',
};

export default function TermsPage() {
  const lastUpdated = 'January 1, 2024';

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-lg text-neutral-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              1. Agreement to Terms
            </h2>
            <p className="mb-4 text-neutral-400">
              By accessing or using the Scale with Chintan website ("Service"),
              you agree to be bound by these Terms of Service ("Terms"). If you
              disagree with any part of these terms, then you may not access the
              Service.
            </p>
            <p className="text-neutral-400">
              These Terms apply to all visitors, users, and others who access or
              use the Service.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              2. Use License
            </h2>
            <p className="mb-4 text-neutral-400">
              Permission is granted to temporarily access the materials on Scale
              with Chintan's website for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-neutral-400">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            <p className="mt-4 text-neutral-400">
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by us at any time.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              3. User Accounts
            </h2>
            <p className="mb-4 text-neutral-400">
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. You are
              responsible for safeguarding the password and for all activities
              that occur under your account.
            </p>
            <p className="text-neutral-400">
              You agree not to disclose your password to any third party. You must
              notify us immediately upon becoming aware of any breach of security
              or unauthorized use of your account.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              4. Content
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-white">
              4.1 Our Content
            </h3>
            <p className="mb-4 text-neutral-400">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of Scale with Chintan and
              its licensors. The Service is protected by copyright, trademark, and
              other laws.
            </p>
            <h3 className="mb-2 text-xl font-semibold text-white">
              4.2 User-Generated Content
            </h3>
            <p className="mb-4 text-neutral-400">
              You retain ownership of any content you post, upload, or otherwise
              make available on the Service ("User Content"). By posting User
              Content, you grant us a worldwide, non-exclusive, royalty-free
              license to use, reproduce, modify, and distribute your User Content
              for the purpose of operating and providing the Service.
            </p>
            <p className="text-neutral-400">
              You are responsible for your User Content and represent and warrant
              that:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-neutral-400">
              <li>You own or have the necessary rights to the User Content</li>
              <li>The User Content does not violate any third-party rights</li>
              <li>The User Content is not defamatory, libelous, or offensive</li>
            </ul>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              5. Prohibited Uses
            </h2>
            <p className="mb-4 text-neutral-400">
              You may not use the Service:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-neutral-400">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
              <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
              <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
            </ul>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              6. Intellectual Property
            </h2>
            <p className="mb-4 text-neutral-400">
              The Service and its original content, features, and functionality are
              owned by Scale with Chintan and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>
            <p className="text-neutral-400">
              Our trademarks and trade dress may not be used in connection with
              any product or service without our prior written consent.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              7. Disclaimer
            </h2>
            <p className="mb-4 text-neutral-400">
              The information on this website is provided on an "as is" basis. To
              the fullest extent permitted by law, we exclude all representations,
              warranties, conditions, and terms relating to our website and the use
              of this website.
            </p>
            <p className="text-neutral-400">
              We do not warrant that:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-neutral-400">
              <li>The website will be constantly available, or available at all</li>
              <li>The information on this website is complete, true, accurate, or non-misleading</li>
              <li>The website will be free from errors, viruses, or other harmful components</li>
            </ul>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              8. Limitation of Liability
            </h2>
            <p className="mb-4 text-neutral-400">
              In no event shall Scale with Chintan, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use, goodwill,
              or other intangible losses, resulting from your use of the Service.
            </p>
            <p className="text-neutral-400">
              To the maximum extent permitted by applicable law, our total
              liability to you for all damages shall not exceed the amount you paid
              us in the past twelve months, or $100, whichever is greater.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              9. Indemnification
            </h2>
            <p className="text-neutral-400">
              You agree to defend, indemnify, and hold harmless Scale with Chintan
              and its licensee and licensors, and their employees, contractors,
              agents, officers and directors, from and against any and all claims,
              damages, obligations, losses, liabilities, costs or debt, and expenses
              (including but not limited to attorney's fees), resulting from or
              arising out of your use and access of the Service, or a breach of
              these Terms.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              10. Termination
            </h2>
            <p className="mb-4 text-neutral-400">
              We may terminate or suspend your account and bar access to the
              Service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of the Terms.
            </p>
            <p className="text-neutral-400">
              If you wish to terminate your account, you may simply discontinue
              using the Service. All provisions of the Terms which by their nature
              should survive termination shall survive termination, including,
              without limitation, ownership provisions, warranty disclaimers,
              indemnity, and limitations of liability.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              11. Governing Law
            </h2>
            <p className="text-neutral-400">
              These Terms shall be interpreted and governed by the laws of the
              jurisdiction in which Scale with Chintan operates, without regard to
              its conflict of law provisions. Our failure to enforce any right or
              provision of these Terms will not be considered a waiver of those
              rights.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              12. Changes to Terms
            </h2>
            <p className="text-neutral-400">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will provide
              at least 30 days notice prior to any new terms taking effect.
            </p>
            <p className="text-neutral-400">
              By continuing to access or use our Service after those revisions
              become effective, you agree to be bound by the revised terms. If you
              do not agree to the new terms, please stop using the Service.
            </p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">13. Contact Us</h2>
            <p className="mb-4 text-neutral-400">
              If you have any questions about these Terms of Service, please
              contact us:
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

