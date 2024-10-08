function Navbutton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <a
        className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 p-2 text-white shadow-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 hover:shadow-indigo-500/50"
        href={href}
      >
        {children}
      </a>
    </div>
  );
}

export default Navbutton;
