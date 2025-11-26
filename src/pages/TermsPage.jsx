import React from 'react';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto prose dark:prose-invert">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Terms and Conditions</h1>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Introduction</h2>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">
        Welcome to The Bench. By accessing our website, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Use License</h2>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">
        Permission is granted to temporarily download one copy of the materials (information or software) on The Bench's website for personal, non-commercial transitory viewing only.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Disclaimer</h2>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">
        The materials on The Bench's website are provided on an 'as is' basis. The Bench makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Limitations</h2>
      <p className="text-slate-600 dark:text-neutral-400 mb-4">
        In no event shall The Bench or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on The Bench's website.
      </p>
    </div>
  );
};

export default TermsPage;
