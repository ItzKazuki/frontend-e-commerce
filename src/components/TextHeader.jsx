export default function TextHeader({ children, className }) {
  return <h1 className={`text-2xl font-bold ml-4 ${className}`}>{children}</h1>
}
