const Disclosure = () => (
  <div className="max-w-4xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-6">Disclosure Statement</h1>
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Affiliate Relationships</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          AJtracker may participate in affiliate marketing programs with various e-commerce platforms. This means we may earn a small commission when you click on certain product links and make a purchase, at no additional cost to you.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Transparency:</strong> These affiliate relationships do not influence our price tracking accuracy or the products we choose to monitor. Our primary goal is to provide accurate price information to help you save money.
          </p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Collection and Usage</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We collect product pricing data from publicly available sources on e-commerce websites. This information is used solely for providing price tracking services to our users.
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li>We do not collect personal information from external websites</li>
          <li>Price data is obtained through legitimate web scraping methods</li>
          <li>We respect robots.txt files and rate limiting</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Service Limitations</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Please be aware of the following limitations:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Price information may not always be real-time due to technical constraints</li>
          <li>Some products may become unavailable for tracking due to website changes</li>
          <li>Price accuracy depends on the source websites and their data structure</li>
          <li>We cannot guarantee price alert delivery due to email service limitations</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          AJtracker integrates with several third-party services:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li><strong>Firebase:</strong> For user authentication and data storage</li>
          <li><strong>Email Services:</strong> For sending price alert notifications</li>
          <li><strong>Analytics Tools:</strong> To improve user experience (anonymized data)</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Product information, images, and descriptions displayed on AJtracker belong to their respective owners and retailers. We use this information under fair use principles for price comparison purposes only.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">No Investment Advice</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Price trends and historical data provided by AJtracker are for informational purposes only and should not be considered as investment or purchasing advice. Users should make their own informed decisions.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Disclosure</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We may update this disclosure statement periodically. Users will be notified of significant changes through email or platform notifications.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 dark:text-gray-300">
          For questions about this disclosure or our practices, contact us at legal@ajtracker.com
        </p>
      </section>
    </div>
  </div>
);

export default Disclosure; 