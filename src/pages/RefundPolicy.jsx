import Navbar from '../components/Navbar';

const RefundPolicy = () => (
  <>
    <Navbar />
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Free Service Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            AJtracker is currently offered as a free service to all users. Since there are no charges for using our price tracking platform, refunds are not applicable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Future Premium Features</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If we introduce premium features or paid subscriptions in the future, this policy will be updated to include:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Clear refund eligibility criteria</li>
            <li>Refund processing timeframes</li>
            <li>Cancellation procedures</li>
            <li>Pro-rated refund calculations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Service Interruptions</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            While we strive to provide reliable service, AJtracker is provided "as is" without warranties. We are not liable for any inconvenience caused by service interruptions, missed price alerts, or technical issues.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Export</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Instead of monetary refunds, users can request to export their tracked products data and price history before closing their account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            For questions about this policy or account issues, contact us at support@ajtracker.com
          </p>
        </section>
      </div>
    </div>
  </>
);

export default RefundPolicy; 