import Navbar from '../components/Navbar';

const ReturnPolicy = () => (
  <>
    <Navbar />
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Return Policy</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Service-Based Platform</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            AJtracker is a digital price tracking service, not a retailer. We do not sell physical products, so traditional return policies do not apply to our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What We Provide</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Our service includes:</p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Price monitoring and tracking</li>
            <li>Price drop notifications</li>
            <li>Price history charts and analytics</li>
            <li>Product watchlist management</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Purchases</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            When you click on product links and make purchases from external retailers (Amazon, Flipkart, etc.), those transactions are governed by the respective retailer's return and refund policies, not ours.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Important:</strong> Always check the return policy of the retailer before making a purchase. AJtracker is not responsible for returns, refunds, or disputes related to purchases made through external links.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Account Closure</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Users can close their AJtracker account at any time by:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Contacting our support team</li>
            <li>Using the account deletion option in settings</li>
            <li>Requesting data export before closure</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            For any issues with our tracking service, we encourage users to contact our support team first. We're committed to resolving concerns promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-700 dark:text-gray-300">
            For questions or concerns, reach out to us at support@ajtracker.com
          </p>
        </section>
      </div>
    </div>
  </>
);

export default ReturnPolicy; 