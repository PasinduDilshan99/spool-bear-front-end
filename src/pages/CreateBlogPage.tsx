// app/blog/create/page.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  X,
  Edit2,
  FileText,
  Type,
  Globe,
  Eye,
  Save,
  AlertCircle,
  CheckCircle,
  Loader2,
  Calendar,
  Tag,
  Hash,
  Plus,
  Trash2,
  User as UserIcon,
  Mail,
  Shield,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { BlogService } from "@/service/blogService";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface BlogFormData {
  title: string;
  subtitle: string;
  description: string;
  imageUrls: string[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
  };
  timestamp: string;
}

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  isUploading?: boolean;
  uploadedUrl?: string;
}

const CreateBlogPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    subtitle: "",
    description: "",
    imageUrls: [],
  });

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090",
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
  ]);

  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([]);

  // Character counters
  const [charCount, setCharCount] = useState({
    title: 0,
    subtitle: 0,
    description: 0,
  });

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update character count
    if (name in charCount) {
      setCharCount((prev) => ({ ...prev, [name]: value.length }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle image file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImageFiles: ImageFile[] = [];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        setError(
          `Invalid file type: ${file.name}. Please upload JPEG, PNG, WebP, or GIF images.`,
        );
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}. Maximum size is 5MB.`);
        return;
      }

      const id = Math.random().toString(36).substr(2, 9);
      newImageFiles.push({
        id,
        file,
        preview: URL.createObjectURL(file),
        isUploading: false,
      });
    });

    setImageFiles((prev) => [...prev, ...newImageFiles]);
    e.target.value = ""; // Reset file input
  };

  // Remove image file
  const removeImageFile = (id: string) => {
    setImageFiles((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      // Revoke object URL to prevent memory leaks
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return updated;
    });
  };

  // Toggle image URL selection
  const toggleImageUrl = (url: string) => {
    setSelectedImageUrls((prev) => {
      if (prev.includes(url)) {
        return prev.filter((u) => u !== url);
      } else {
        return [...prev, url];
      }
    });
  };

  // Remove selected image URL
  const removeSelectedImageUrl = (url: string) => {
    setSelectedImageUrls((prev) => prev.filter((u) => u !== url));
  };

  // Add custom image URL
  const [customImageUrl, setCustomImageUrl] = useState("");
  const handleAddCustomImageUrl = () => {
    if (customImageUrl.trim() && isValidUrl(customImageUrl)) {
      setImageUrls((prev) => [...prev, customImageUrl.trim()]);
      setCustomImageUrl("");
    }
  };

  // Validate URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Simulate image upload
  const simulateImageUpload = async (imageFile: ImageFile): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, you would upload to your server
        // For now, we'll use a placeholder URL
        const mockUrl = `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2)}`;
        resolve(mockUrl);
      }, 1500);
    });
  };

  // Upload all images
  const uploadImages = async () => {
    const uploadedUrls: string[] = [...selectedImageUrls];

    for (const imageFile of imageFiles) {
      try {
        // Mark as uploading
        setImageFiles((prev) =>
          prev.map((img) =>
            img.id === imageFile.id ? { ...img, isUploading: true } : img,
          ),
        );

        // Simulate upload
        const url = await simulateImageUpload(imageFile);

        // Update with uploaded URL
        setImageFiles((prev) =>
          prev.map((img) =>
            img.id === imageFile.id
              ? { ...img, isUploading: false, uploadedUrl: url }
              : img,
          ),
        );

        uploadedUrls.push(url);
      } catch (error) {
        console.error("Error uploading image:", error);
        setImageFiles((prev) =>
          prev.map((img) =>
            img.id === imageFile.id ? { ...img, isUploading: false } : img,
          ),
        );
      }
    }

    return uploadedUrls;
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = "Subtitle is required";
    } else if (formData.subtitle.length > 200) {
      newErrors.subtitle = "Subtitle must be less than 200 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    } else if (formData.description.length > 5000) {
      newErrors.description = "Description must be less than 5000 characters";
    }

    const totalImages = imageFiles.length + selectedImageUrls.length;
    if (totalImages === 0) {
      newErrors.images = "Please select at least one image";
    } else if (totalImages > 10) {
      newErrors.images = "Maximum 10 images allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      // Upload images and get URLs
      const uploadedImageUrls = await uploadImages();

      // Prepare data for API
      const requestData = {
        title: formData.title.trim(),
        subTitle: formData.subtitle.trim(),
        description: formData.description.trim(),
        imageUrls: uploadedImageUrls,
      };

      console.log("Submitting blog:", requestData);

      // Call API
      const result = await BlogService.createBlog(requestData);

      if (result.success) {
        setSuccess(result.message || "Blog created successfully!");

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            title: "",
            subtitle: "",
            description: "",
            imageUrls: [],
          });
          setImageFiles([]);
          setSelectedImageUrls([]);
          setCharCount({ title: 0, subtitle: 0, description: 0 });
          setSuccess(null);

          // Optionally redirect to blogs page or created blog
          // router.push("/blog");
        }, 3000);
      } else {
        throw new Error(result.error || "Failed to create blog");
      }
    } catch (err) {
      console.error("Error creating blog:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the blog",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Preview content
  const getPreviewContent = () => {
    const authorName = user
      ? `${user.firstName} ${user.lastName}`.trim() || user.username
      : "You";

    return {
      ...formData,
      imageUrls: [
        ...selectedImageUrls,
        ...imageFiles.map((img) => img.preview),
      ],
      createdAt: new Date().toISOString(),
      author: authorName,
      authorRole: user?.roles?.[0] || "User",
    };
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      imageFiles.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [imageFiles]);

  useEffect(() => {
    const code = sessionStorage.getItem("uniqueCode");
    if (!code) {
      router.push("/login");
    }
  }, [user, router]);

  const previewContent = getPreviewContent();

  return (
    <div
      className="bg-[#e4e7ec] relative overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}
    >
      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      >
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <button
                onClick={() => router.push("/blogs")}
                className="flex items-center gap-2 font-medium transition-colors mb-4"
                style={{ color: spoolbearTheme.colors.text }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = spoolbearTheme.colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = spoolbearTheme.colors.text;
                }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blogs
              </button>
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{ color: spoolbearTheme.colors.text }}
              >
                Create New Blog Post
              </h1>
              <p
                className="text-lg mt-2"
                style={{ color: spoolbearTheme.colors.muted }}
              >
                Share your travel experiences and stories with the world
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors border"
                style={{
                  backgroundColor: previewMode
                    ? `${spoolbearTheme.colors.accent}15`
                    : "transparent",
                  color: previewMode
                    ? spoolbearTheme.colors.accent
                    : spoolbearTheme.colors.text,
                  borderColor: previewMode
                    ? spoolbearTheme.colors.accent
                    : `${spoolbearTheme.colors.muted}30`,
                }}
                onMouseEnter={(e) => {
                  if (!previewMode) {
                    e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!previewMode) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {previewMode ? (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Mode
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Preview
                  </>
                )}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                style={{ backgroundColor: spoolbearTheme.colors.accent }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.backgroundColor = "#e64800";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.backgroundColor =
                      spoolbearTheme.colors.accent;
                  }
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Publish Blog
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div
              className="mb-6 p-4 rounded-xl flex items-start gap-3 animate-fadeIn"
              style={{
                backgroundColor: `${spoolbearTheme.colors.accent}10`,
                borderColor: spoolbearTheme.colors.accent,
                borderWidth: "1px",
              }}
            >
              <CheckCircle
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                style={{ color: spoolbearTheme.colors.accent }}
              />
              <div>
                <p
                  className="font-medium"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  {success}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: spoolbearTheme.colors.muted }}
                >
                  Your blog is being published. Redirecting in a few seconds...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div
              className="mb-6 p-4 rounded-xl flex items-start gap-3 animate-fadeIn"
              style={{
                backgroundColor: "#fee2e2",
                borderColor: "#ef4444",
                borderWidth: "1px",
              }}
            >
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" />
              <div>
                <p className="font-medium text-red-800">{error}</p>
                <p className="text-sm text-red-600 mt-1">
                  Please check your inputs and try again.
                </p>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            {!previewMode ? (
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Author Info */}
                  <div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: spoolbearTheme.colors.accent,
                        }}
                      >
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Author Information
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          This blog will be published under your account
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className="p-4 rounded-xl"
                        style={{
                          backgroundColor: `${spoolbearTheme.colors.accent}10`,
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <UserIcon
                            className="w-4 h-4"
                            style={{ color: spoolbearTheme.colors.accent }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: spoolbearTheme.colors.text }}
                          >
                            Author
                          </span>
                        </div>
                        <p
                          className="font-semibold"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          @{user?.username}
                        </p>
                      </div>
                      <div
                        className="p-4 rounded-xl"
                        style={{
                          backgroundColor: `${spoolbearTheme.colors.muted}10`,
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Shield
                            className="w-4 h-4"
                            style={{ color: spoolbearTheme.colors.accent }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: spoolbearTheme.colors.text }}
                          >
                            Role
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {user?.roles?.map((role, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white rounded-full text-xs font-medium border"
                              style={{
                                color: spoolbearTheme.colors.text,
                                borderColor: `${spoolbearTheme.colors.accent}30`,
                              }}
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${spoolbearTheme.colors.accent}15`,
                        }}
                      >
                        <Type
                          className="w-5 h-5"
                          style={{ color: spoolbearTheme.colors.accent }}
                        />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Blog Title
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          A catchy title that grabs attention
                        </p>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter your blog title here..."
                      className={`w-full px-4 py-3 text-lg font-medium border-2 rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-transparent transition-all`}
                      style={{
                        borderColor: errors.title
                          ? "#ef4444"
                          : `${spoolbearTheme.colors.muted}30`,
                        backgroundColor: errors.title ? "#fee2e2" : "white",
                        color: spoolbearTheme.colors.text,
                      }}
                      maxLength={100}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-red-600">{errors.title}</div>
                      <div
                        className="text-sm"
                        style={{ color: spoolbearTheme.colors.muted }}
                      >
                        {charCount.title}/100 characters
                      </div>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${spoolbearTheme.colors.accent}15`,
                        }}
                      >
                        <Hash
                          className="w-5 h-5"
                          style={{ color: spoolbearTheme.colors.accent }}
                        />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Subtitle
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          A brief summary or tagline for your blog
                        </p>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      placeholder="Enter a compelling subtitle..."
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-transparent transition-all`}
                      style={{
                        borderColor: errors.subtitle
                          ? "#ef4444"
                          : `${spoolbearTheme.colors.muted}30`,
                        backgroundColor: errors.subtitle ? "#fee2e2" : "white",
                        color: spoolbearTheme.colors.text,
                      }}
                      maxLength={200}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-red-600">
                        {errors.subtitle}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: spoolbearTheme.colors.muted }}
                      >
                        {charCount.subtitle}/200 characters
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${spoolbearTheme.colors.accent}15`,
                        }}
                      >
                        <FileText
                          className="w-5 h-5"
                          style={{ color: spoolbearTheme.colors.accent }}
                        />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Blog Content
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          Share your story, experiences, and insights
                        </p>
                      </div>
                    </div>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Write your blog content here... You can use markdown or HTML formatting."
                      className={`w-full h-64 px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-transparent resize-none transition-all`}
                      style={{
                        borderColor: errors.description
                          ? "#ef4444"
                          : `${spoolbearTheme.colors.muted}30`,
                        backgroundColor: errors.description
                          ? "#fee2e2"
                          : "white",
                        color: spoolbearTheme.colors.text,
                      }}
                      maxLength={5000}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-red-600">
                        {errors.description}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: spoolbearTheme.colors.muted }}
                      >
                        {charCount.description}/5000 characters
                      </div>
                    </div>
                  </div>

                  {/* Images Section */}
                  <div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: spoolbearTheme.colors.accent,
                        }}
                      >
                        <ImageIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Blog Images
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          Add images to make your blog visually appealing
                        </p>
                      </div>
                    </div>

                    {errors.images && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{errors.images}</p>
                      </div>
                    )}

                    {/* Image Upload Area */}
                    <div className="mb-8">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:bg-[#ff5000]/5 transition-all group"
                        style={{
                          borderColor: `${spoolbearTheme.colors.muted}30`,
                        }}
                      >
                        <div
                          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{
                            backgroundColor: `${spoolbearTheme.colors.accent}10`,
                          }}
                        >
                          <Upload
                            className="w-8 h-8"
                            style={{ color: spoolbearTheme.colors.accent }}
                          />
                        </div>
                        <h4
                          className="font-medium mb-2"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Upload Images
                        </h4>
                        <p
                          className="text-sm mb-3"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          Click to browse or drag and drop
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          Supports JPG, PNG, WebP, GIF • Max 5MB per image
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </div>

                    {/* Selected Image Files */}
                    {imageFiles.length > 0 && (
                      <div className="mb-8">
                        <h4
                          className="font-medium mb-4"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Uploaded Images ({imageFiles.length})
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {imageFiles.map((image) => (
                            <div
                              key={image.id}
                              className="relative group rounded-xl overflow-hidden border"
                              style={{
                                borderColor: `${spoolbearTheme.colors.accent}20`,
                              }}
                            >
                              <div
                                className="aspect-square"
                                style={{
                                  backgroundColor: `${spoolbearTheme.colors.muted}10`,
                                }}
                              >
                                <img
                                  src={image.preview}
                                  alt="Uploaded preview"
                                  className="w-full h-full object-cover"
                                />
                                {image.isUploading && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                                  </div>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImageFile(image.id)}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              {image.isUploading && (
                                <div
                                  className="absolute bottom-0 left-0 right-0 h-1"
                                  style={{
                                    backgroundColor:
                                      spoolbearTheme.colors.accent,
                                  }}
                                >
                                  <div className="h-full bg-white/50 animate-pulse"></div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sample Image URLs */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4
                          className="font-medium"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Select from Sample Images
                        </h4>
                        <span
                          className="text-sm"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          {selectedImageUrls.length} selected
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imageUrls.map((url, index) => (
                          <div
                            key={index}
                            onClick={() => toggleImageUrl(url)}
                            className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                              selectedImageUrls.includes(url)
                                ? "border-[#ff5000] ring-2 ring-[#ff5000]/20"
                                : "border-gray-200 hover:border-[#ff5000]/50"
                            }`}
                          >
                            <div
                              className="aspect-square relative"
                              style={{
                                backgroundColor: `${spoolbearTheme.colors.muted}10`,
                              }}
                            >
                              <img
                                src={url}
                                alt={`Sample ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80";
                                }}
                              />
                              {selectedImageUrls.includes(url) && (
                                <div className="absolute inset-0 bg-[#ff5000]/20 flex items-center justify-center">
                                  <CheckCircle
                                    className="w-8 h-8"
                                    style={{
                                      color: spoolbearTheme.colors.accent,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="absolute top-2 right-2">
                              <div className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                {selectedImageUrls.includes(url) ? (
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                      backgroundColor:
                                        spoolbearTheme.colors.accent,
                                    }}
                                  ></div>
                                ) : (
                                  <div
                                    className="w-3 h-3 border rounded-full"
                                    style={{
                                      borderColor: spoolbearTheme.colors.muted,
                                    }}
                                  ></div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selected Image URLs */}
                    {selectedImageUrls.length > 0 && (
                      <div className="mb-6">
                        <h4
                          className="font-medium mb-4"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Selected Images
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedImageUrls.map((url, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                              style={{
                                backgroundColor: `${spoolbearTheme.colors.accent}10`,
                                borderColor: `${spoolbearTheme.colors.accent}30`,
                              }}
                            >
                              <Globe
                                className="w-4 h-4"
                                style={{ color: spoolbearTheme.colors.accent }}
                              />
                              <span
                                className="text-sm truncate max-w-[200px]"
                                style={{ color: spoolbearTheme.colors.text }}
                              >
                                {url.split("/").pop() || `Image ${index + 1}`}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeSelectedImageUrl(url)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Custom Image URL */}
                    <div className="mt-6">
                      <h4
                        className="font-medium mb-3"
                        style={{ color: spoolbearTheme.colors.text }}
                      >
                        Add Custom Image URL
                      </h4>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={customImageUrl}
                          onChange={(e) => setCustomImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                          style={{
                            borderColor: `${spoolbearTheme.colors.muted}30`,
                            color: spoolbearTheme.colors.text,
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCustomImageUrl();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomImageUrl}
                          disabled={
                            !customImageUrl.trim() ||
                            !isValidUrl(customImageUrl)
                          }
                          className="px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                          style={{
                            backgroundColor: `${spoolbearTheme.colors.accent}10`,
                            color: spoolbearTheme.colors.text,
                            borderColor: `${spoolbearTheme.colors.muted}30`,
                            borderWidth: "1px",
                          }}
                          onMouseEnter={(e) => {
                            if (
                              customImageUrl.trim() &&
                              isValidUrl(customImageUrl)
                            ) {
                              e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}20`;
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                          }}
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              /* Preview Section */
              <div className="lg:col-span-2">
                <div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border"
                  style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: spoolbearTheme.colors.accent }}
                    >
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: spoolbearTheme.colors.text }}
                      >
                        Blog Preview
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: spoolbearTheme.colors.muted }}
                      >
                        How your blog will appear to readers
                      </p>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    {/* Preview Header */}
                    <div
                      className="mb-8 pb-6 border-b"
                      style={{
                        borderColor: `${spoolbearTheme.colors.accent}20`,
                      }}
                    >
                      <h1
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{ color: spoolbearTheme.colors.text }}
                      >
                        {previewContent.title || "Your Blog Title"}
                      </h1>
                      {previewContent.subtitle && (
                        <h2
                          className="text-xl md:text-2xl mb-6"
                          style={{ color: spoolbearTheme.colors.accent }}
                        >
                          {previewContent.subtitle}
                        </h2>
                      )}
                      <div
                        className="flex flex-wrap items-center gap-4"
                        style={{ color: spoolbearTheme.colors.muted }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: spoolbearTheme.colors.accent,
                            }}
                          >
                            <UserIcon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p
                              className="font-medium"
                              style={{ color: spoolbearTheme.colors.text }}
                            >
                              {previewContent.author}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: spoolbearTheme.colors.muted }}
                            >
                              {previewContent.authorRole}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar
                            className="w-4 h-4"
                            style={{ color: spoolbearTheme.colors.accent }}
                          />
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Preview Images */}
                    {previewContent.imageUrls.length > 0 && (
                      <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {previewContent.imageUrls
                            .slice(0, 2)
                            .map((url, index) => (
                              <div
                                key={index}
                                className="rounded-xl overflow-hidden"
                              >
                                <img
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-48 object-cover"
                                />
                              </div>
                            ))}
                        </div>
                        <p
                          className="text-sm mt-2 text-center"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          {previewContent.imageUrls.length} images total
                        </p>
                      </div>
                    )}

                    {/* Preview Content */}
                    <div
                      className="leading-relaxed"
                      style={{ color: spoolbearTheme.colors.text }}
                    >
                      {previewContent.description ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: previewContent.description.replace(
                              /\n/g,
                              "<br />",
                            ),
                          }}
                        />
                      ) : (
                        <div
                          className="text-center py-12"
                          style={{ color: spoolbearTheme.colors.muted }}
                        >
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Your blog content will appear here</p>
                        </div>
                      )}
                    </div>

                    {/* Preview Footer */}
                    <div
                      className="mt-8 pt-6 border-t"
                      style={{
                        borderColor: `${spoolbearTheme.colors.accent}20`,
                      }}
                    >
                      <div className="flex flex-wrap gap-2">
                        <Tag
                          className="w-5 h-5"
                          style={{ color: spoolbearTheme.colors.accent }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: spoolbearTheme.colors.text }}
                        >
                          Tags:
                        </span>
                        {["Travel", "Blog", "Personal"].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                              backgroundColor: `${spoolbearTheme.colors.accent}10`,
                              color: spoolbearTheme.colors.text,
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* User Info */}
              <div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border sticky top-24"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  Your Profile
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: spoolbearTheme.colors.accent }}
                    >
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: spoolbearTheme.colors.text }}
                      >
                        {user?.firstName} {user?.lastName}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: spoolbearTheme.colors.muted }}
                      >
                        @{user?.username}
                      </p>
                    </div>
                  </div>

                  <div
                    className="space-y-2 pt-4 border-t"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <div
                      className="flex items-center gap-2 text-sm"
                      style={{ color: spoolbearTheme.colors.muted }}
                    >
                      <Mail
                        className="w-4 h-4"
                        style={{ color: spoolbearTheme.colors.accent }}
                      />
                      <span>{user?.email}</span>
                    </div>
                    {user?.mobileNumber1 && (
                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{ color: spoolbearTheme.colors.muted }}
                      >
                        <Shield
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.accent }}
                        />
                        <span>{user.mobileNumber1}</span>
                      </div>
                    )}
                  </div>

                  <div
                    className="pt-4 border-t"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <div className="flex flex-wrap gap-1">
                      {user?.roles?.map((role, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full text-xs font-medium border"
                          style={{
                            backgroundColor: `${spoolbearTheme.colors.accent}10`,
                            color: spoolbearTheme.colors.text,
                            borderColor: `${spoolbearTheme.colors.accent}30`,
                          }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Publishing Info */}
              <div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  Publishing Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span style={{ color: spoolbearTheme.colors.muted }}>
                      Status
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${spoolbearTheme.colors.accent}15`,
                        color: spoolbearTheme.colors.accent,
                      }}
                    >
                      Draft
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: spoolbearTheme.colors.muted }}>
                      Author
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: spoolbearTheme.colors.text }}
                    >
                      {user?.username}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: spoolbearTheme.colors.muted }}>
                      Publish Date
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: spoolbearTheme.colors.text }}
                    >
                      Now
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: spoolbearTheme.colors.muted }}>
                      Images
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: spoolbearTheme.colors.text }}
                    >
                      {selectedImageUrls.length + imageFiles.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  Content Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-xl text-center"
                    style={{
                      backgroundColor: `${spoolbearTheme.colors.accent}10`,
                    }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ color: spoolbearTheme.colors.accent }}
                    >
                      {charCount.description}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: spoolbearTheme.colors.muted }}
                    >
                      Characters
                    </div>
                  </div>
                  <div
                    className="p-4 rounded-xl text-center"
                    style={{
                      backgroundColor: `${spoolbearTheme.colors.accent}10`,
                    }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ color: spoolbearTheme.colors.accent }}
                    >
                      {Math.ceil(charCount.description / 200)}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: spoolbearTheme.colors.muted }}
                    >
                      Min Read
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-3 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium"
                    style={{ backgroundColor: spoolbearTheme.colors.accent }}
                    onMouseEnter={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.backgroundColor = "#e64800";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.backgroundColor =
                          spoolbearTheme.colors.accent;
                      }
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Publish Blog
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        title: "",
                        subtitle: "",
                        description: "",
                        imageUrls: [],
                      });
                      setImageFiles([]);
                      setSelectedImageUrls([]);
                      setCharCount({ title: 0, subtitle: 0, description: 0 });
                      setErrors({});
                      setError(null);
                      setSuccess(null);
                    }}
                    className="w-full py-3 bg-white border rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                    style={{
                      borderColor: `${spoolbearTheme.colors.muted}30`,
                      color: spoolbearTheme.colors.text,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Form
                  </button>
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="w-full py-3 bg-white border rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                    style={{
                      borderColor: `${spoolbearTheme.colors.muted}30`,
                      color: spoolbearTheme.colors.text,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                    }}
                  >
                    {previewMode ? (
                      <>
                        <Edit2 className="w-4 h-4" />
                        Back to Editing
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Preview Blog
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CreateBlogPage;
