import AlumniCarousel from "../../components/landing/AlumniCarousel";
import CoursesSection from "../../components/landing/CoursesSection";
import FaqFooter from "../../components/landing/FaqFooter";
import HeroLead from "../../components/landing/HeroLead";
import Outcomes from "../../components/landing/Outcomes";
import PillarsGrid from "../../components/landing/PillarsGrid";
import RecognitionStrip from "../../components/landing/RecognitionStrip";
import StickyHeader from "../../components/landing/StickyHeader";
import StudentLifeTabs from "../../components/landing/StudentLifeTabs";

export default function Home() {
	return (
		<div className="min-h-screen bg-[#FFFFFF] text-[#020203]">
			<StickyHeader />
			<main id="main-content">
				<HeroLead />
				<div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-[#FACB06]/30 to-transparent" />
				<RecognitionStrip />
				<div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-[#FACB06]/20 to-transparent" />
				<CoursesSection />
				<div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-[#FACB06]/20 to-transparent" />
				<PillarsGrid />
				<div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-[#FACB06]/20 to-transparent" />
				<StudentLifeTabs />
				<div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-[#FACB06]/20 to-transparent" />
				<Outcomes />
				<div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-[#FACB06]/20 to-transparent" />
				<AlumniCarousel />
				<FaqFooter />
			</main>
		</div>
	);
}
