export const LoadingSpin = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center flex-col gap-4">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="text-gray-600 text-lg font-medium">Loading</span>
    </div>
  );
};
