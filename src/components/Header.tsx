export default function Header() {
  return (
    <header className="bg-navy py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-white font-serif text-xl tracking-wide">
            James P. Bennett &amp; Company
          </h1>
          <p className="text-blue-200 text-xs tracking-widest uppercase mt-0.5">
            Est. 1932
          </p>
        </div>
        <p className="text-blue-200 text-sm hidden sm:block">
          Benefits Intelligence Platform
        </p>
      </div>
    </header>
  );
}
