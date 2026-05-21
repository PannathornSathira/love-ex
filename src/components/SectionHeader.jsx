export function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={`section-header align-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
