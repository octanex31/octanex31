import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';

export const metadata: Metadata = {
  title: 'Refund Policy | OctaNex31',
  alternates: { canonical: '/refund-policy' },
  description:
    'OctaNex31 refund policy covering cancellation, refund timeline, process, and exceptions for our digital services.',
  openGraph: {
    title: 'Refund Policy | OctaNex31',
    description:
      'OctaNex31 refund policy covering cancellation, refund timeline, process, and exceptions.',
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Refund Policy
          </GradientText>
          <p className="text-text-secondary">Last updated: January 1, 2024</p>
        </div>
      </section>

      <Section>
        <div className="prose prose-invert prose-violet mx-auto max-w-3xl">
          <h2>1. Overview</h2>
          <p>
            At OctaNex31, we strive to deliver exceptional digital services that meet or exceed our
            clients&apos; expectations. This Refund Policy outlines the terms and conditions under which
            refunds may be issued for our services.
          </p>
          <p>
            OctaNex31 is owned and operated by <strong>Shivam Salunkhe</strong>, India.
            By purchasing our services, you agree to this Refund Policy.
          </p>

          <h2>2. Setup Fees</h2>
          <p>
            Setup fees cover the initial work including consultation, design, development, testing, and
            deployment. The refund policy for setup fees depends on the stage of the project:
          </p>
          <ul>
            <li>
              <strong>Before Project Start:</strong> Full refund of setup fee if cancellation is requested
              before any work has commenced.
            </li>
            <li>
              <strong>During Discovery Phase:</strong> 75% refund if cancelled within the first 3 days
              of project kickoff.
            </li>
            <li>
              <strong>During Development:</strong> No refund of setup fee once active development has
              begun, as resources have been allocated and work has been performed.
            </li>
            <li>
              <strong>After Delivery:</strong> No refund of setup fee after the project has been delivered
              and accepted by the client.
            </li>
          </ul>

          <h2>3. Monthly Subscriptions</h2>
          <p>
            Monthly subscription fees for maintenance, hosting, and ongoing services are billed in advance.
            Refunds for subscriptions are handled as follows:
          </p>
          <ul>
            <li>Cancellation requests received before the next billing cycle will prevent future charges.</li>
            <li>No refunds for the current month&apos;s subscription fee after the billing date.</li>
            <li>Prepaid annual subscriptions may be refunded on a pro-rata basis for unused months, minus a 10% processing fee.</li>
          </ul>

          <h2>4. Service-Specific Policies</h2>
          <h3>AI Call Assistant</h3>
          <ul>
            <li>7-day free trial available for all plans</li>
            <li>Setup fee is non-refundable after onboarding is completed</li>
            <li>Monthly subscription can be cancelled anytime; unused credits are forfeited</li>
          </ul>

          <h3>Custom App/Website Development</h3>
          <ul>
            <li>Setup fee refunds follow the stages outlined in Section 2</li>
            <li>Milestone-based projects: refunds may be partial based on completed milestones</li>
            <li>Third-party costs (licenses, APIs, subscriptions) are non-refundable</li>
          </ul>

          <h3>Maintenance Plans</h3>
          <ul>
            <li>Monthly plans can be cancelled with 30 days notice</li>
            <li>No refund for services already rendered in the current billing period</li>
          </ul>

          <h2>5. Refund Process</h2>
          <p>To request a refund:</p>
          <ol>
            <li>Email your refund request to <a href="mailto:salunkheshivam18@gmail.com" className="text-violet-light hover:text-cyan">salunkheshivam18@gmail.com</a></li>
            <li>Include your name, project details, and reason for the refund request</li>
            <li>Our team will review your request within 5-7 business days</li>
            <li>If approved, refunds will be processed within 10-15 business days</li>
          </ol>
          <p>
            Refunds will be issued using the original payment method unless otherwise agreed upon.
          </p>

          <h2>6. Refund Exceptions</h2>
          <p>Refunds may be denied or partially denied in the following cases:</p>
          <ul>
            <li>Work has been substantially completed as per the project scope</li>
            <li>Custom integrations or third-party services have been purchased on your behalf</li>
            <li>Services have been delivered and accepted by the client</li>
            <li>Refund request is made more than 30 days after the payment date</li>
            <li>Terms of service or project agreement have been violated</li>
          </ul>

          <h2>7. Dispute Resolution</h2>
          <p>
            If you disagree with a refund decision, please contact us to discuss your concerns. We are
            committed to fair resolution of all disputes. If a resolution cannot be reached, the matter
            will be handled under the governing laws of <strong>India</strong>.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this Refund Policy at any time. Changes will be effective
            immediately upon posting to our website. We encourage clients to review this policy periodically.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Refund Policy, please contact us:
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
