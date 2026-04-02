"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MaterialDetailsErrorProps } from "@/types/material-types";

export const MaterialDetailsError: React.FC<MaterialDetailsErrorProps> = ({
  error,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {error || "Material not found"}
          </h3>
          <p className="text-gray-600 mb-6">
            The material you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <button
            onClick={() => router.push("/materials")}
            className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-xl hover:shadow-lg transition-all duration-300 w-full font-medium"
          >
            Back to Materials
          </button>
        </div>
      </div>
    </div>
  );
};
