import React from 'react';
import "./PrivacyPolicy.css";
import CustomAppBar from '../../componets/appbar';

export default function PrivacyPolicy() {
  return (
    <CustomAppBar type="privacyPolicy">
    <div className="privacy-policy-container">
      <header className="policy-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: July 26, 2025</p>
      </header>

      <main className="policy-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to FlutterPilot. We are committed to protecting your personal information and your right to privacy.
            This Privacy Policy describes how your information is collected, used, and shared when you use our web app.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>
            We collect minimal personal data necessary for operation, such as email, usage logs, and cookies to enhance user experience.
          </p>
        </section>

        <section>
          <h2>3. How We Use Information</h2>
          <p>
            We use the collected data to improve our service, provide support, send updates, and ensure platform security.
          </p>
        </section>

        <section>
          <h2>4. Third-Party Services</h2>
          <p>
            We do not sell your data. Some trusted tools may be used for analytics, performance monitoring, or support.
          </p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>
            You can request access, update, or delete your personal data. Just contact our support at
            <a href="mailto:fromamsoftwares@gmail.com"> fromamsoftwares@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>6. Changes to This Policy</h2>
          <p>
            We may revise this Privacy Policy from time to time. We’ll notify you of any significant changes via email or platform notice.
          </p>
        </section>
      </main>
    </div>
    </CustomAppBar>
  );
}