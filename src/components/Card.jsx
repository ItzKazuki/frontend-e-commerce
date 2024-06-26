export default function Card({ children, title, className }) {
  return (
    <div className={`card bg-base-200 shadow-xl ${className}`}>
      <div className="card-body">
        <div className="card-title">{title}</div>
        {children}
      </div>
    </div>
  );
}
