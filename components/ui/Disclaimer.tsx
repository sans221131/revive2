export default function Disclaimer({ className }: { className?: string }) {
  return (
    <div className={`rounded-lg border border-[#E6E8EC] bg-[#F7F7F7] px-4 py-3 text-sm text-[#6C7676] ${className ?? ""}`}>
      <div className="flex items-start gap-3">
        <span className="mt-1 h-2 w-2 rounded-full bg-[#FACB06]" aria-hidden="true" />
        <div className="leading-snug">
          <p>
            <strong className="text-[#0A2C59]">Disclaimer:</strong> As an Affiliate Enquiry Partner (AEP) of Amity
            University, we display and showcase program information of Amity University. Counselling, Admission,
            Program delivery and examination is solely managed by Amity University and as an AEP, we have no role to
            play in it.
          </p>
        </div>
      </div>
    </div>
  );
}
