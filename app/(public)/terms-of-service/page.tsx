import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';

export const metadata: Metadata = {
  title: 'Terms of Service | OctaNex31',
  alternates: { canonical: '/terms-of-service' },
  description:
    'OctaNex31 terms of service governing the use of our digital services, payments, cancellations, and liability. Governed by Indian law.',
  openGraph: {
    title: 'Terms of Service | OctaNex31',
    description:
      'OctaNex31 terms of service governing the use of our digital services.',
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Terms of Service
          </GradientText>
          <p className="text-text-secondary">Last updated: January 1, 2024</p>
        </div>
      </section>

      <Section>
        <div className="prose prose-invert prose-violet mx-auto max-w-3xl">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the OctaNex31 website and services, you agree to be bound by these Terms
            of Service. If you do not agree with any part of the terms, you may not access our services.
          </p>
          <p>
            OctaNex31 is owned and operated by <strong>Shivam Salunkhe</strong>, India.
            These terms constitute a legally binding agreement between you and OctaNex31.
          </p>

          <h2>2. Services Description</h2>
          <p>
            OctaNex31 provides digital services including but not limited to:
          </p>
          <ul>
            <li>Mobile and web application development</li>
            <li>Website design and development</li>
            <li>AI-powered solutions and automation</li>
            <li>Digital marketing and SEO services</li>
            <li>AI Call Assistant services</li>
            <li>Maintenance and support services</li>
            <li>Consulting and strategy services</li>
          </ul>
          <p>
            All services are provided on a project-by-project basis as agreed upon in the project proposal
            or service agreement.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>As a user of our services, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information when using our services</li>
            <li>Use our services only for lawful purposes</li>
            <li>Not violate any applicable laws or regulations</li>
            <li>Not infringe upon the intellectual property rights of others</li>
            <li>Not attempt to gain unauthorized access to our systems</li>
            <li>Not use our services to transmit harmful code or malware</li>
          </ul>

          <h2>4. Intellectual Property Rights</h2>
          <p>
            Upon full payment for services, the client receives full ownership of the custom code, design
            assets, and deliverables created specifically for their project. OctaNex31 retains the right to
            display the work in our portfolio unless otherwise agreed in writing.
          </p>
          <p>
            OctaNex31 retains ownership of its pre-existing tools, libraries, frameworks, and methodologies
            used in the development process. Any third-party assets, libraries, or tools used remain under
            their respective licenses.
          </p>

          <h2>5. Payments and Pricing</h2>
          <p>Payment terms are as follows:</p>
          <ul>
            <li>Setup fees are one-time charges payable at the start of the project</li>
            <li>Monthly subscriptions are billed on a recurring basis</li>
            <li>All prices are in Indian Rupees (INR) unless specified otherwise</li>
            <li>Payments are due within the timeframe specified in the invoice or agreement</li>
            <li>Late payments may result in service suspension</li>
          </ul>

          <h2>6. Project Timeline and Delivery</h2>
          <p>
            Project timelines provided in proposals are estimates based on the scope of work defined at the
            time of agreement. Delays may occur due to:
          </p>
          <ul>
            <li>Client feedback and approval delays</li>
            <li>Changes in project scope</li>
            <li>Technical challenges or dependencies</li>
            <li>Force majeure events</li>
          </ul>
          <p>
            OctaNex31 will provide regular updates on project progress and communicate any anticipated delays
            promptly.
          </p>

          <h2>7. Cancellation and Termination</h2>
          <p>
            Either party may terminate a service agreement with written notice as specified in the project
            agreement. Upon termination:
          </p>
          <ul>
            <li>Client pays for all work completed up to the termination date</li>
            <li>Delivered work products are transferred to the client upon payment</li>
            <li>Monthly subscriptions may be cancelled with 30 days notice</li>
          </ul>

          <h2>8. Limitation of Liability</h2>
          <p>
            OctaNex31 shall not be liable for any indirect, incidental, special, consequential, or punitive
            damages arising out of or relating to the use of our services. Our total liability shall not
            exceed the total amount paid by you for the specific service giving rise to the claim.
          </p>
          <p>
            We do not guarantee that our services will be uninterrupted, timely, secure, or error-free.
            We are not responsible for any loss of data, revenue, or business opportunity arising from
            the use of our services.
          </p>

          <h2>9. Confidentiality</h2>
          <p>
            Both parties agree to maintain the confidentiality of proprietary information shared during the
            course of the project. This includes business strategies, technical specifications, trade secrets,
            and any other information designated as confidential.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of{' '}
            <strong>India</strong>. Any disputes arising from these terms shall be subject to the exclusive
            jurisdiction of the courts in <strong>India</strong>.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material
            changes via email or a notice on our website. Continued use of our services after changes
            constitutes acceptance of the new terms.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            For any questions regarding these Terms of Service, please contact us:
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
