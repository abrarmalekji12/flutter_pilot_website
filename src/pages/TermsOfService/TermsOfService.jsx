import React from "react";
import { Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";
import { useLegalPageStyles } from "../../styles/legalPageStyles";
import { studioUrl } from "../../utils/studioLinks";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";

// Facts on this page are taken from FlutterPilot's source; re-check them when
// the product changes:
//   operator / address      src/pages/AboutUs/AboutUs.jsx, Google Play listing (publisher "AMSoftwares")
//   Android package         com.builder.flutterpilot (src/utils/studioLinks.js)
//   credit costs, export    src/content/pricing.js
//   payment channels        flutterpilot-pro lib/ui/credits/ (Play Billing, User Choice Billing, App Store IAP)
//   store refund reversal   flutterpilot-cloudflare controllers/play.js (REFUND / REVOKE notifications)
//   AI model providers      src/pages/PrivacyPolicy/PrivacyPolicy.jsx
export const TERMS_EFFECTIVE_DATE = "November 7, 2026";
const SUPPORT_EMAIL = "support@flutterpilot.com";
const PLAY_LISTING_URL = "https://play.google.com/store/apps/details?id=com.builder.flutterpilot";

export default function TermsOfService() {
  const classes = commonStyles();
  const localClasses = useLegalPageStyles();

  const Section = ({ id, title, children }) => (
    <section id={id} className={classes.contentSection} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className={classes.contentHeading}>{title}</h2>
      {children}
    </section>
  );
  const P = ({ children }) => <p className={`${classes.contentText} ${localClasses.textBlock}`}>{children}</p>;
  const List = ({ items }) => (
    <ul className={classes.contentList}>
      {items.map((item, index) => (
        <li key={index} className={classes.contentListItem}>{item}</li>
      ))}
    </ul>
  );
  const Mail = () => (
    <a href={`mailto:${SUPPORT_EMAIL}`} className={classes.contentLink}>{SUPPORT_EMAIL}</a>
  );
  const PrivacyLink = ({ children = "Privacy Policy" }) => (
    <RouterLink to="/privacy-policy/" className={classes.contentLink}>{children}</RouterLink>
  );
  const External = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes.contentLink}>{children}</a>
  );

  return (
    <CustomAppBar type="termsOfService">
      <div className={classes.responsiveContainer}>
        <Container className={localClasses.headerCard} maxWidth={false} disableGutters>
          <p className={localClasses.eyebrow}><GavelOutlinedIcon fontSize="small" aria-hidden="true" /> Legal</p>
          <h1 className={localClasses.title}>Terms of Service</h1>
          <p className={localClasses.subtitle}>
            Effective date: {TERMS_EFFECTIVE_DATE}. These Terms govern your use of FlutterPilot, including the{" "}
            <strong>AI App Builder – FlutterPilot</strong> Android app (package <code>com.builder.flutterpilot</code>),
            published on Google Play by AM Softwares.
          </p>
        </Container>

        <main className={localClasses.sectionGap}>
          <div className={localClasses.policyCard}>
            <Section id="agreement" title="1. Agreement and who we are">
              <P>
                These Terms of Service ("Terms") are a legal agreement between you and <strong>AM Softwares</strong>,
                listed as the developer "AMSoftwares" on Google Play, with its address at Kolikhad Farm, Modasa, Gujarat,
                India, 383315 ("FlutterPilot", "we", "us" or "our"). By creating an account, installing or using any part
                of the Service described below, you agree to these Terms. If you do not agree, do not use the Service.
              </P>
              <P>
                If we transfer the Service to a successor business (for example, a company we incorporate to operate
                FlutterPilot), we will tell you before the transfer takes effect and identify the new operator on this page.
              </P>
            </Section>

            <Section id="service" title="2. The Service and where it applies">
              <P>
                FlutterPilot is an AI-assisted visual builder for Flutter applications. Depending on the platform, it lets
                you generate screens and app structure from prompts, edit widgets visually, add
                navigation, actions and state, connect data sources such as REST APIs and Google Sheets, preview apps,
                export Flutter source code, build Android APKs in the cloud, and publish hosted web apps (together, the
                "Service").
              </P>
              <P>These Terms apply to every official FlutterPilot client, including:</P>
              <List
                items={[
                  <>
                    the Android app <strong>AI App Builder – FlutterPilot</strong>, package{" "}
                    <code>com.builder.flutterpilot</code>, available on{" "}
                    <External href={PLAY_LISTING_URL}>Google Play</External>;
                  </>,
                  "the FlutterPilot iOS app on the Apple App Store;",
                  <>
                    the FlutterPilot Studio web app at{" "}
                    <External href={studioUrl({ campaign: "terms-of-service", content: "policy-text" })}>
                      studio.flutterpilot.com
                    </External>
                    ;
                  </>,
                  "the FlutterPilot desktop apps for macOS and Windows; and",
                  "flutterpilot.com, its documentation and related FlutterPilot online services, such as cloud builds and web hosting.",
                ]}
              />
              <P>
                These Terms cover your use of FlutterPilot itself. They do <strong>not</strong> act as terms of service for
                apps that you or other customers create with FlutterPilot (see Section 10).
              </P>
            </Section>

            <Section id="eligibility" title="3. Eligibility and your account">
              <List
                items={[
                  "You must be at least 18 years old, or the age of majority where you live, to create an account or make purchases. If you are younger, you may use the Service only with the involvement and consent of a parent or legal guardian who agrees to these Terms on your behalf.",
                  "If you use the Service for a business or other organisation, you confirm that you are authorised to accept these Terms for it, and \"you\" includes that organisation.",
                  "You must give accurate account information and keep it up to date. You are responsible for keeping your sign-in credentials secure and for all activity under your account.",
                  "Accounts are personal. Do not share, sell or transfer your account or credits to another person without our written permission.",
                  <>Tell us promptly at <Mail /> if you believe your account has been accessed without your authorisation.</>,
                ]}
              />
            </Section>

            <Section id="acceptable-use" title="4. Acceptable use">
              <P>You agree not to use the Service, or any app created with it, to:</P>
              <List
                items={[
                  "break any applicable law or regulation, or infringe anyone's intellectual property, privacy or other rights;",
                  "create, publish or distribute malware, spyware, phishing or deceptive apps, or apps that collect personal data without proper notice and consent;",
                  "create content that is sexually exploitative of minors, promotes violence, terrorism or hatred, harasses others, or is otherwise unlawful;",
                  "impersonate any person or organisation, or misrepresent an app's origin or affiliation;",
                  "send spam or unsolicited communications, or commit fraud, including payment or credit fraud;",
                  "attempt to gain unauthorised access to the Service, other accounts, or our systems or networks, or probe, scan or test their vulnerability without our written permission;",
                  "interfere with or overload the Service, including by automated or scripted use designed to bypass usage limits or free allowances;",
                  "copy, resell, sublicense or offer the Service (or access to it) to third parties as a competing service, or reverse engineer it except where the law expressly allows; or",
                  "use AI features to generate content that breaches the usage policies of the underlying AI model providers.",
                ]}
              />
              <P>
                We may remove content, stop a build or hosted app, or restrict an account that we reasonably believe
                breaches this section.
              </P>
            </Section>

            <Section id="ai" title="5. AI-generated content and its limitations">
              <P>
                FlutterPilot uses third-party AI models, including models from Google (Gemini), OpenAI, Anthropic (Claude),
                Mistral AI and xAI (Grok), to generate screens, code, actions, sample data and other output ("AI Output")
                from prompts and project context you provide ("Input"). Which provider handles a request depends on the
                model or feature you choose.
              </P>
              <List
                items={[
                  "AI Output is generated automatically and may be incorrect, incomplete, insecure, inconsistent or similar to output produced for other users. It is not professional, legal, medical, financial or security advice.",
                  "You are responsible for reviewing, testing and correcting AI Output before relying on it, and especially before releasing an app to end users.",
                  "You must have the rights needed to submit your Input, including any images, documents, data or third-party content.",
                  "We do not guarantee that a particular prompt will produce a particular result. Credits used for a generation request are not refunded merely because you are unhappy with the output, except where Section 7 says otherwise.",
                ]}
              />
              <P>
                How Input is processed and shared with AI providers is described in our <PrivacyLink />.
              </P>
            </Section>

            <Section id="ownership" title="6. Your content, generated apps and exported code">
              <P>
                <strong>Your content.</strong> You keep any rights you have in the projects, Input, designs, data and other
                material you add to the Service ("Your Content"). You grant us a worldwide, non-exclusive, royalty-free
                licence to host, store, process, reproduce and display Your Content only as needed to operate, secure and
                improve the Service for you, to build and host the apps you ask us to, and to comply with law. This licence
                ends when Your Content is deleted from the Service, except for copies we must keep by law or that remain in
                routine backups for a limited time.
              </P>
              <P>
                <strong>Generated apps and exported source code.</strong> As between you and us, and subject to these
                Terms and third-party rights, the app projects you create and the Flutter source code you export from them
                belong to you, and you may use, modify, publish and commercialise them. To the extent FlutterPilot code,
                templates, components or other material of ours is included in an export, we grant you a perpetual,
                worldwide, non-exclusive, royalty-free licence to use, modify and distribute it as part of your app.
                This does not give you any right to the FlutterPilot service itself, its brand, or to redistribute our
                templates or components on their own as a competing template library or builder.
              </P>
              <P>
                <strong>Third-party material.</strong> Exported projects may depend on open-source packages, fonts, icons,
                images and SDKs that are licensed by their owners under their own terms. You are responsible for complying
                with those licences. Because AI Output may resemble existing material, we cannot guarantee that AI Output
                is free of third-party rights.
              </P>
            </Section>

            <Section id="credits" title="7. Credits, pricing, purchases and refunds">
              <P>
                <strong>Credits.</strong> Many features run on FlutterPilot credits. FlutterPilot is pay-as-you-go: we do
                not currently sell subscriptions, and buying a credit pack is a one-time purchase that does not renew.
                Credits are used for actions such as AI generation, cloud Android APK builds and publishing hosted web
                apps. Exporting your Flutter source code does not use credits. The Service shows the credit cost of an
                action, or how it is calculated, before or when you use it, and costs may vary by AI model.
              </P>
              <P>
                <strong>Free credits and allowances.</strong> We may offer free credits, such as sign-up credits, a free
                monthly credit grant or a daily free-model allowance. These are promotional, are not a subscription or a
                charge, and we may change or end them at any time.
              </P>
              <P>
                <strong>Nature of credits.</strong> Credits are a limited, revocable licence to use features of the
                Service. They have no cash value, are not legal tender or a stored-value account, cannot be redeemed for
                money, and cannot be sold or transferred, except where the law requires otherwise. We may change the
                price of credit packs and the credit cost of features for the future; changes do not reduce credits
                already in your balance.
              </P>
              <P><strong>How you pay.</strong></P>
              <List
                items={[
                  <>
                    <strong>Google Play (Android app).</strong> Purchases are processed by Google Play Billing under the
                    Google Play Terms of Service. Where Google offers user choice billing in your country, you may instead
                    choose FlutterPilot's own checkout; that purchase is then processed by our payment provider, not by
                    Google.
                  </>,
                  <>
                    <strong>Apple App Store (iOS app).</strong> Purchases are processed by Apple under Apple's terms.
                  </>,
                  <>
                    <strong>Web and desktop.</strong> Purchases are processed by our third-party payment provider (currently
                    Razorpay). Checkout shows the price in your local currency where available; taxes may apply.
                  </>,
                ]}
              />
              <P>
                Store purchases use the price shown by the store, which may differ from our web price. We do not receive or
                store your full card details.
              </P>
              <P><strong>Refunds.</strong></P>
              <List
                items={[
                  <>
                    Refunds for purchases made through Google Play or the Apple App Store are handled by Google or Apple
                    under their refund policies. You can request one from the store; for Google Play see the{" "}
                    <External href="https://support.google.com/googleplay/answer/2479637">Google Play refund help page</External>.
                  </>,
                  <>
                    For purchases made through our own checkout, contact <Mail /> with your order details. We will refund or
                    re-credit any charge made in error, including a payment that was taken but did not add credits to your
                    account.
                  </>,
                  "Otherwise, credits that have been delivered to your account are generally non-refundable, particularly once they have been used, except where these Terms or applicable consumer law give you a right to a refund.",
                  "If a purchase is refunded, charged back or reversed by a store or payment provider, we may remove the corresponding credits from your balance. If those credits have already been used, your balance may become negative or we may restrict paid features until it is settled.",
                ]}
              />
              <P>Nothing in this section limits any rights you have under mandatory consumer-protection law.</P>
            </Section>

            <Section id="third-parties" title="8. Third-party services and integrations">
              <P>
                The Service relies on, and lets you connect to, services operated by others, for example Google Sign-In,
                Google Sheets and Drive, REST APIs you configure, AI model providers, app stores, payment providers, and
                cloud hosting and build infrastructure. When you connect or use a third-party service:
              </P>
              <List
                items={[
                  "your use of it is also governed by that provider's terms and privacy policy;",
                  "you are responsible for having the rights, permissions, credentials and plans needed for any account, API or data you connect, and for any charges the third party makes;",
                  "you authorise us to access and exchange data with that service on your behalf as needed to provide the feature you use; and",
                  "we are not responsible for third-party services, their availability, or changes they make that affect FlutterPilot features.",
                ]}
              />
              <P>
                Apple and Google are not parties to these Terms and are not responsible for the Service, except for their
                own purchase processing under their terms.
              </P>
            </Section>

            <Section id="privacy" title="9. Privacy and data protection">
              <P>
                Our <PrivacyLink /> explains what personal data we collect, how we use it, which providers process it, how
                we handle Google user data, and your rights. It forms part of these Terms. You can delete your account and
                associated data at any time with the <strong>Delete Account</strong> option in account settings in the
                FlutterPilot apps and web app, or by contacting <Mail />.
              </P>
              <P>
                If Your Content, connected data sources or apps you build include personal data about other people, you
                are responsible for having a lawful basis and any required notices or consents to process it, and for
                complying with applicable data-protection law.
              </P>
            </Section>

            <Section id="your-apps" title="10. Your responsibility for apps you create and publish">
              <P>
                You are the developer and publisher of any app you build with FlutterPilot, including APKs, exported
                projects and web apps we host for you. FlutterPilot is a tool and is not the publisher of your apps. You are
                solely responsible for:
              </P>
              <List
                items={[
                  "the content, functionality, security and quality of your apps, and testing them before release;",
                  "your own terms of service, privacy policy and data-safety or privacy disclosures for each app — these Terms and our Privacy Policy do not cover your app's users;",
                  "complying with the policies of Google Play, the Apple App Store and any other store or platform where you distribute your app, and with laws that apply to your app and its users;",
                  "obtaining your own developer accounts, signing keys, and any certificates, licences or approvals your app needs; and",
                  "support, claims and complaints from your app's users.",
                ]}
              />
              <P>
                APKs built in the cloud are intended for testing and sharing. We do not guarantee that any app built with
                FlutterPilot will be accepted by an app store or meet a particular platform's requirements.
              </P>
              <P>
                We may take down a hosted web app, or refuse a build, that breaches these Terms or the law, or that we are
                required to remove.
              </P>
            </Section>

            <Section id="availability" title="11. Availability, changes, suspension and termination">
              <List
                items={[
                  "We work to keep the Service available, but it is provided on an \"as available\" basis and may be interrupted for maintenance, updates, outages of third-party providers or events outside our control.",
                  "We may add, change or remove features, AI models, export targets and integrations. If we discontinue the Service as a whole, we will try to give you reasonable notice so you can export your projects.",
                  "You may stop using the Service and delete your account at any time.",
                  "We may suspend or terminate your access, remove content, or take down hosted apps if you materially or repeatedly breach these Terms, if required by law, or to protect users, third parties or the Service. Where reasonable, we will tell you why and give you a chance to respond.",
                  "When your account is deleted or terminated, your projects, hosted apps and remaining credits may be deleted and cannot be recovered. Export anything you want to keep first. Unused purchased credits are not refunded on termination for breach, except where the law requires.",
                  "Sections that by their nature should continue after termination — including 6, 7 (as to payments owed and reversals), 10, 12, 13, 14 and 15 — survive.",
                ]}
              />
            </Section>

            <Section id="ip" title="12. FlutterPilot's intellectual property">
              <P>
                The Service, including its software, editor, AI workflows, templates, components, documentation, website,
                design and the FlutterPilot name and logo, is owned by us or our licensors and is protected by
                intellectual-property laws. Except for the rights expressly granted in these Terms, we reserve all rights.
                You may not use our name, logo or branding in a way that suggests we endorse or publish your app without
                our written permission.
              </P>
              <P>
                If you send us feedback or suggestions, we may use them without restriction or payment to you.
              </P>
              <P>
                If you believe content on the Service infringes your rights, contact <Mail /> with enough detail for us to
                identify the content and your claim.
              </P>
            </Section>

            <Section id="disclaimers" title="13. Disclaimers">
              <P>
                To the maximum extent permitted by law, the Service, AI Output, templates, builds and hosting are provided
                "as is" and "as available", without warranties of any kind, whether express or implied, including
                warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, or that the
                Service will be uninterrupted, secure or error-free. You use AI Output and the apps you create at your own
                risk.
              </P>
            </Section>

            <Section id="liability" title="14. Limitation of liability and indemnity">
              <P>To the maximum extent permitted by law:</P>
              <List
                items={[
                  "we are not liable for any indirect, incidental, special, consequential or punitive damages, or for loss of profits, revenue, data, goodwill or business opportunity, arising from or related to the Service, even if we were told they were possible; and",
                  "our total liability for all claims arising from or related to the Service or these Terms is limited to the greater of (a) the amount you paid us for the Service in the 12 months before the event giving rise to the claim, or (b) INR 5,000 (or its equivalent in your currency).",
                ]}
              />
              <P>
                Nothing in these Terms excludes or limits liability that cannot be excluded or limited by law, such as
                liability for fraud, or for death or personal injury caused by negligence, or your statutory rights as a
                consumer.
              </P>
              <P>
                You agree to indemnify and hold us harmless from third-party claims, losses and reasonable costs arising
                from Your Content, the apps you create or publish, or your breach of these Terms or the law, to the extent
                permitted by law.
              </P>
            </Section>

            <Section id="law" title="15. Governing law and disputes">
              <P>
                These Terms are governed by the laws of India, without regard to conflict-of-law rules. Before starting any
                formal proceedings, please contact us at <Mail /> so we can try to resolve the issue informally; we will
                respond within a reasonable time. If a dispute cannot be resolved informally within 30 days, it will be
                subject to the exclusive jurisdiction of the competent courts in Gujarat, India.
              </P>
              <P>
                If you are a consumer, you also keep the protection of any mandatory laws of the country where you live,
                and the right to bring a claim in the courts or consumer forums available to you there.
              </P>
            </Section>

            <Section id="changes" title="16. Changes to these Terms">
              <P>
                We may update these Terms from time to time, for example to reflect changes to the Service, pricing model,
                payment methods, our legal operator or the law. We will change the effective date above and, for material
                changes, notify you in the app, by email or by a notice on this page before the change takes effect. If you
                continue to use the Service after an update takes effect, you accept the updated Terms. If you do not agree,
                stop using the Service and delete your account.
              </P>
            </Section>

            <Section id="general" title="17. General">
              <List
                items={[
                  "These Terms, together with the Privacy Policy and any prices or rules shown in the Service at the time of purchase, are the entire agreement between you and us about the Service.",
                  "If any part of these Terms is found unenforceable, the rest remains in effect. Our failure to enforce a provision is not a waiver.",
                  "You may not assign these Terms without our consent. We may assign them to an affiliate or successor operator of the Service, with notice to you.",
                  "Where these Terms are translated, the English version prevails to the extent permitted by law.",
                ]}
              />
            </Section>

            <Section id="contact" title="18. Contact">
              <P>
                For questions about these Terms, purchases, refunds or your account, contact us at <Mail /> or through our{" "}
                <RouterLink to="/contact/" className={classes.contentLink}>contact page</RouterLink>.
              </P>
              <p className={classes.contentText}>
                AM Softwares (Google Play developer: AMSoftwares), Kolikhad Farm, Modasa, Gujarat, India, 383315.
              </p>
            </Section>
          </div>
        </main>
      </div>
    </CustomAppBar>
  );
}
