export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="mt-6 space-y-4">

        <div className="p-4 bg-gray-900 rounded-lg">
          Account Settings
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          Privacy
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          Notifications
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          Security
        </div>

      </div>
    </main>
  );
}