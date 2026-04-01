// components/product/ErrorState.tsx
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#e4e7ec] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 max-w-sm w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4 border border-orange-100">
          <AlertCircle size={26} className="text-[#FF5000]" />
        </div>
        <h3 className="font-black text-[#101113] mb-2 text-base">
          Failed to Load
        </h3>
        <p className="text-sm text-gray-500 mb-6">{error}</p>
        <button
          onClick={() => router.back()}
          className="w-full py-3 bg-[#FF5000] text-white rounded-xl font-bold text-sm hover:bg-[#CC4000] transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
