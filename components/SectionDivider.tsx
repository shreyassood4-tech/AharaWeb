export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-20" aria-hidden="true">
      <div className="relative w-[120px] h-px bg-gold" style={{ opacity: 0.6 }}>
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-1 h-1 rounded-full bg-gold"
        />
      </div>
    </div>
  );
}
