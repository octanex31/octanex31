import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';

export const metadata: Metadata = {
  title: 'Privacy Policy | OctaNex31',
  alternates: { canonical: '/privacy-policy' },
  description:
    'OctaNex31 privacy policy outlines how we collect, use, and protect your personal information. Owned by Shivam Salunkhe, India.',
  openGraph: {
    title: 'Privacy Policy | OctaNex31',
    description:
      'OctaNex31 privacy policy outlines how we collect, use, and protect your personal information.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Privacy Policy
          </GradientText>
          <p className="text-text-secondary">Last updated: January 1, 2024</p>
        </div>
      </section>

      <Section>
        <div className="prose prose-invert prose-violet mx-auto max-w-3xl">
          <h2>1. Introduction</h2>
          <p>
            OctaNex31 (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
            our website <a href="https://octanex31.vercel.app" className="text-violet-light hover:text-cyan">https://octanex31.vercel.app</a>.
          </p>
          <p>
            OctaNex31 is owned and operated by <strong>Shivam Salunkhe</strong>, based in India.
            By using our website and services, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Personal Data</h3>
          <p>We may collect personally identifiable information such as:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Business name and type</li>
            <li>Message content when you contact us</li>
          </ul>

          <h3>Usage Data</h3>
          <p>We may collect information about how you access and use our website, including:</p>
          <ul>
            <li>Pages visited and time spent on each page</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>IP address</li>
            <li>Referring URLs</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the collected data for the following purposes:</p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our services</li>
            <li>To monitor the usage of our website</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To send you marketing communications (with your consent)</li>
          </ul>

          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain
            information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <p>We use the following types of cookies:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (e.g., Google Analytics).</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
          </ul>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            However, some portions of our website may not function properly without cookies.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>We may employ third-party companies and individuals due to the following reasons:</p>
          <ul>
            <li><strong>Google Analytics:</strong> For website analytics and usage tracking</li>
            <li><strong>Supabase:</strong> For database and authentication services</li>
            <li><strong>Resend:</strong> For email communication services</li>
            <li><strong>reCAPTCHA:</strong> For spam protection on forms</li>
            <li><strong>Vercel:</strong> For website hosting</li>
          </ul>
          <p>
            These third parties have access to your personal information only to perform these tasks on our behalf
            and are obligated not to disclose or use it for any other purpose.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal
            information. However, no method of transmission over the Internet or electronic storage is 100%
            secure. We cannot guarantee absolute security but strive to use commercially acceptable means
            to protect your data.
          </p>

          <h2>7. Your Data Protection Rights</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Right to Access:</strong> Request copies of your personal data.</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data.</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data.</li>
            <li><strong>Right to Restrict Processing:</strong> Request restriction of processing your data.</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your data to another organization.</li>
            <li><strong>Right to Object:</strong> Object to our processing of your personal data.</li>
          </ul>

          <h2>8. Data Retention</h2>
          <p>
            We will retain your personal information only for as long as is necessary for the purposes set out
            in this Privacy Policy. We will retain and use your information to the extent necessary to comply
            with our legal obligations, resolve disputes, and enforce our policies.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect
            personally identifiable information from children. If you are a parent or guardian and you are aware
            that your child has provided us with personal data, please contact us.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting
            the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:salunkheshivam18@gmail.com" className="text-violet-light hover:text-cyan">salunkheshivam18@gmail.com</a></li>
            <li>Website: <a href="https://octanex31.vercel.app" className="text-violet-light hover:text-cyan">https://octanex31.vercel.app</a></li>
            <li>Owner: Shivam Salunkhe, India</li>
          </ul>
        </div>
      </Section>
    </>
  );
}
