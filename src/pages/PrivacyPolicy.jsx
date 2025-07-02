import Navbar from '../components/Navbar';

const PrivacyPolicy = () => (
  <>
    <Navbar />
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            AJtracker ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our price tracking service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <h3 className="text-lg font-medium mb-2">Personal Information</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
            <li>Email address (for account creation and notifications)</li>
            <li>Name (optional, for personalization)</li>
            <li>Password (encrypted and stored securely)</li>
          </ul>
          
          <h3 className="text-lg font-medium mb-2">Usage Information</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
            <li>Products you track and their URLs</li>
            <li>Price alerts and notification preferences</li>
            <li>Device information and browser type</li>
            <li>Usage patterns and interactions with our service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Provide price tracking and notification services</li>
            <li>Send you price alerts when products reach your target price</li>
            <li>Improve our service and user experience</li>
            <li>Communicate with you about service updates</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibent mb-4">Data Sharing and Disclosure</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>With trusted service providers who assist in our operations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and data</li>
            <li>Export your data</li>
            <li>Opt-out of notifications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have questions about this Privacy Policy, please contact us at privacy@ajtracker.com
          </p>
        </section>
      </div>
    </div>
  </>
);

export default PrivacyPolicy; 