import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Coursewaala",
  description: "Privacy Policy for Coursewaala landing page (Affiliate Enquiry Partner for Amity University).",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="section-shell">
        <div className="container-shell px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex justify-start">
              <div className="h-1 w-16 rounded-full bg-[#FACB06]" />
            </div>

            <h1 className="mb-3 text-4xl font-bold leading-tight text-[#0A2C59]" style={{ fontFamily: "var(--font-libre-baskerville), serif" }}>
              Privacy Policy
            </h1>

            <p className="mb-6 text-sm text-[#6C7676]">Effective Date: 3rd Jan 2026</p>

            <section className="prose prose-lg max-w-none text-[#0A2C59] prose-a:text-[#0A2C59] prose-a:font-medium prose-li:list-inside">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Coursewaala ("we," "our," or "us"). We are committed to protecting your personal
              information and your right to privacy. This Privacy Policy governs the privacy policies and
              practices of our landing page, amitylp.coursewaala.com (the "Website"), which operates as an
              Affiliate Enquiry Partner (AEP) for Amity University.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you express an interest
              in obtaining information about Amity Online MBA programs. The personal information that we collect
              depends on the context of your interactions with us and the Website, and includes:
            </p>
            <ul>
              <li>
                <strong>Personal Information Provided by You:</strong> Full Name, Mobile Number, Email Address,
                and City of Residence.
              </li>
              <li>
                <strong>Automatically Collected Information:</strong> We automatically collect certain
                information when you visit, use, or navigate the Website. This information does not reveal your
                specific identity but may include device and usage information, such as your IP address,
                browser and device characteristics, operating system, referring URLs, and information about how
                and when you use our Website.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the personal information collected via our Website for the following business purposes:</p>
            <ul>
              <li>
                <strong>To Facilitate Contact:</strong> To call, email, or text you regarding your inquiry about
                the Amity Online MBA program and provide admission counselling.
              </li>
              <li>
                <strong>To Share with our Partner:</strong> To forward your inquiry details securely to Amity
                University's official admissions team so they can process your application or answer specific
                academic queries.
              </li>
              <li>
                <strong>For Analytics and Marketing:</strong> To monitor and analyze website traffic, run
                retargeting campaigns, and measure the effectiveness of our advertising campaigns (e.g., via
                Google Ads).
              </li>
            </ul>

            <h2>4. Will Your Information Be Shared With Anyone?</h2>
            <p>
              Yes. By submitting the inquiry form, you explicitly consent to us sharing your personal data with
              Amity University. We only share your information with this specific institution for the purpose of
              fulfilling your request for course information and admissions counselling. We do not sell, rent, or
              trade your personal information to third-party data brokers or unrelated marketing agencies.
            </p>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies (like web beacons and pixels, including Google Ads
              tracking) to access or store information. You can set your browser to refuse all or some browser
              cookies, but this may affect how the website functions.
            </p>

            <h2>6. Data Retention and Security</h2>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out
              in this Privacy Policy, unless a longer retention period is required by law. We have implemented
              appropriate technical and organizational security measures designed to protect the security of any
              personal information we process.
            </p>

            <h2>7. Your Privacy Rights</h2>
            <p>Under applicable Indian laws, you have the right to:</p>
            <ul>
              <li>Request access to the personal data we hold about you.</li>
              <li>Request that we update or correct your personal data.</li>
              <li>
                Request that we delete your personal data from our systems (and request we notify Amity University
                to do the same).
              </li>
              <li>Opt-out of future marketing communications.</li>
            </ul>

            <h2>8. Contact Us</h2>
            <p>
              If you have questions or comments about this notice, you may email our Grievance Officer at
              <a className="text-[#0A2C59]" href="mailto:coursewaalaads@gmail.com"> coursewaalaads@gmail.com</a> or by
              post to:
            </p>
            <address>
              Coursewaala<br />
              604, 6th Flr, New Excelsior Bldg, Fort<br />
              Mumbai, Maharashtra, India, 400001
            </address>

            <p>
              This Privacy Policy is effective as of the date set out at the top of this page.
            </p>

            <p>
              <Link href="/" className="inline-flex items-center text-[#FACB06] font-medium">← Back to home</Link>
            </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
