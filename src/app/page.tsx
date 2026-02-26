import AlumniCarousel from "../../components/landing/AlumniCarousel";
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
				<RecognitionStrip />
				<PillarsGrid />
				<StudentLifeTabs />
				<Outcomes />
				<AlumniCarousel />
				<FaqFooter />
			</main>
		</div>
	);
}
