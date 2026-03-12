import Image from "next/image";

export default function PartnerBadge({
  className,
  compact,
  href,
}: {
  className?: string;
  compact?: boolean;
  href?: string;
}) {
  const content = (
    <div className={`inline-flex items-center gap-4 ${className ?? ""}`}>
      <div className="flex items-center gap-3">
        <Image
          src="/coursewaalalogo.png"
          alt="Coursewaala"
          width={92}
          height={30}
          className="h-8 w-auto object-contain"
          unoptimized
        />
      </div>

      <div className="text-left">
        <div className="text-sm font-semibold text-[#0A2C59]">Coursewaala</div>
        {!compact && (
          <div className="text-[13px] text-[#6C7676]">Official Enrollment Partner for Amity Online MBA</div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Coursewaala — Official Enrollment Partner for Amity Online MBA">
        {content}
      </a>
    );
  }

  return content;
}
