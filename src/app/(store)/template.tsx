export default function StoreTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="page-fade">{children}</div>;
}
