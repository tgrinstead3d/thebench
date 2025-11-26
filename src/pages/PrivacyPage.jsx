import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto prose dark:prose-invert">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Privacy Policy</h1>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">
        We collect information you provide directly to us, such as when you create an account, create a profile, or communicate with us. This may include your name, email address, and other contact or profile information.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. How We Use Your Information</h2>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">
        We use the information we collect to operate, maintain, and improve our services, to communicate with you, and to personalize your experience.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Cookies</h2>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">
        We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Contact Us</h2>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">
        If you have any questions about this Privacy Policy, please contact us.
      </p>
    </div>
  );
};

export default PrivacyPage;
