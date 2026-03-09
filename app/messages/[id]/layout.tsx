export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout OVERRIDES parent layout
  // FooterNav will NOT appear here
  return <>{children}</>;
}
