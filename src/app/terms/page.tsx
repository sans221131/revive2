import Link from "next/link";

export const metadata = {
  title: "Terms of Use | Coursewaala",
  description: "Terms of Use for Coursewaala landing page (Affiliate Enquiry Partner for Amity University).",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="section-shell">
        <div className="container-shell px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex justify-start">
              <div className="h-1 w-16 rounded-full bg-[#FACB06]" />
            </div>

            <h1 className="mb-3 text-4xl font-bold leading-tight text-[#0A2C59]" style={{ fontFamily: "var(--font-libre-baskerville), serif" }}>
              Terms of Use
            </h1>

            <p className="mb-6 text-sm text-[#6C7676]">Effective Date: 3rd Jan 2026</p>

            <article className="prose prose-lg max-w-none text-[#0A2C59] prose-a:text-[#0A2C59] prose-a:font-medium prose-li:list-inside">
              <h2>1. Agreement to Terms</h2>
              <p>
                These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Coursewaala ("we," "us," or "our"), concerning your access to and use of the amitylp.coursewaala.com website. By accessing the site, you agree that you have read, understood, and agree to be bound by all of these Terms of Use.
              </p>

              <h2>2. Nature of Service (Disclaimer)</h2>
              <p>
                Coursewaala operates exclusively as an Affiliate Enquiry Partner (AEP) for Amity University. We display and showcase program information regarding the Amity Online MBA. We are not the university. We do not grant degrees, make final admission decisions, collect tuition fees on behalf of the university, or deliver the educational programs. All counselling, final admission processing, program delivery, and examinations are solely managed by Amity University.
              </p>

              <h2>3. User Representations</h2>
              <p>
                By using the Website and submitting the inquiry form, you represent and warrant that the registration information you submit will be true, accurate, current, and complete; you will maintain the accuracy of such information; you are not a minor in the jurisdiction in which you reside (or have parental permission to use the site); and you consent to being contacted by Coursewaala and Amity University via phone call, SMS, WhatsApp, or email regarding your educational inquiry, overriding any NDNC registry preferences.
              </p>

              <h2>4. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Website is our proprietary property. All source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Website (collectively, the "Content") owned by Coursewaala are protected by copyright and trademark laws. The "Amity University" name, logo, and course materials are the registered trademarks and intellectual property of Amity University and are used on this site under affiliate authorization.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                In no event will Coursewaala, or our directors, employees, or agents, be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the site or your enrollment (or failure to enroll) in the Amity Online MBA program. We do not guarantee admission to the university.
              </p>

              <h2>6. Third-Party Websites and Content</h2>
              <p>
                The Website may contain links to other websites ("Third-Party Websites"). Such Third-Party Websites are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the site.
              </p>

              <h2>7. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms of Use and your use of the Website are governed by and construed in accordance with the laws of India. Any legal action or proceeding related to your access to, or use of, the Website shall be instituted in a state or federal court in Mumbai, Maharashtra, and you agree to submit to the jurisdiction of, and agree that venue is proper in, these courts.
              </p>

              <h2>8. Contact Us</h2>
              <p>
                In order to resolve a complaint regarding the Website or to receive further information regarding use of the Website, please contact us at:
              </p>
              <p>
                +91 7506879764<br />
                <a className="text-[#0A2C59]" href="mailto:coursewaalaads@gmail.com">coursewaalaads@gmail.com</a>
              </p>

              <p>
                <Link href="/" className="inline-flex items-center text-[#FACB06] font-medium">← Back to home</Link>
              </p>
            </article>

          </div>
        </div>
      </section>
    </main>
  );
}
