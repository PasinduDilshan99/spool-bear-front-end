// app/materials/page.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { MaterialService } from "@/service/materialService";
import { Material } from "@/types/material-types";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialSearchBar } from "@/components/material-page-components/MaterialSearchBar";
import { MaterialGrid } from "@/components/material-page-components/MaterialGrid";
import { MaterialListView } from "@/components/material-page-components/MaterialListView";
import { MaterialQuickViewModal } from "@/components/material-page-components/MaterialQuickViewModal";
import { MaterialsSkeleton } from "@/components/material-page-components/MaterialsSkeleton";
import { MaterialsErrorState } from "@/components/material-page-components/MaterialsErrorState";
import { MaterialsEmptyState } from "@/components/material-page-components/MaterialsEmptyState";
import { MaterialsStats } from "@/components/material-page-components/MaterialsStats";
import { MaterialsHeader } from "@/components/material-page-components/MaterialsHeader";
import { MaterialFilters } from "@/components/material-page-components/MaterialFilters";

// Types for filters
export interface FilterState {
  search: string;
  strengths: string[];
  flexibilities: string[];
  materialTypes: string[];
  isAvailable: boolean | null;
  isPopular: boolean | null;
}

export type SortByType = "name" | "price_asc" | "price_desc" | "popularity";
export type ViewModeType = "grid" | "list";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    strengths: [],
    flexibilities: [],
    materialTypes: [],
    isAvailable: null,
    isPopular: null,
  });
  const [sortBy, setSortBy] = useState<SortByType>("popularity");
  const [viewMode, setViewMode] = useState<ViewModeType>("grid");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null,
  );

  const materialService = new MaterialService();

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await materialService.getAllMaterials();
      if (response.code === 200) {
        setMaterials(response.data);
      } else {
        setError(response.message || "Failed to load materials");
      }
    } catch (err) {
      console.error("Failed to load materials:", err);
      setError("Failed to load materials. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = useMemo(() => {
    return {
      strengths: [...new Set(materials.map((m) => m.strength))].filter(Boolean),
      flexibilities: [...new Set(materials.map((m) => m.flexibility))].filter(
        Boolean,
      ),
      materialTypes: [
        ...new Set(materials.map((m) => m.materialType?.name)),
      ].filter(Boolean),
    };
  }, [materials]);

  useEffect(() => {
    let filtered = [...materials];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.materialName.toLowerCase().includes(searchLower) ||
          m.materialDescription.toLowerCase().includes(searchLower),
      );
    }

    if (filters.strengths.length > 0) {
      filtered = filtered.filter((m) => filters.strengths.includes(m.strength));
    }

    if (filters.flexibilities.length > 0) {
      filtered = filtered.filter((m) =>
        filters.flexibilities.includes(m.flexibility),
      );
    }

    if (filters.materialTypes.length > 0) {
      filtered = filtered.filter((m) =>
        filters.materialTypes.includes(m.materialType?.name),
      );
    }

    if (filters.isAvailable !== null) {
      filtered = filtered.filter((m) => m.isAvailable === filters.isAvailable);
    }

    if (filters.isPopular !== null) {
      filtered = filtered.filter((m) => m.isPopular === filters.isPopular);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.materialName.localeCompare(b.materialName);
        case "price_asc":
          return a.pricePerGram - b.pricePerGram;
        case "price_desc":
          return b.pricePerGram - a.pricePerGram;
        case "popularity":
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        default:
          return 0;
      }
    });

    setFilteredMaterials(filtered);
  }, [materials, filters, sortBy]);

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleSortChange = (value: SortByType) => {
    setSortBy(value);
  };

  const handleViewModeChange = (mode: ViewModeType) => {
    setViewMode(mode);
  };

  const handleFilterChange = (
    type: keyof Pick<
      FilterState,
      "strengths" | "flexibilities" | "materialTypes"
    >,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      strengths: [],
      flexibilities: [],
      materialTypes: [],
      isAvailable: null,
      isPopular: null,
    });
  };

  if (loading) {
    return <MaterialsSkeleton />;
  }

  if (error) {
    return <MaterialsErrorState error={error} onRetry={loadMaterials} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <MaterialsHeader />

        <div className="mb-8">
          <MaterialSearchBar
            searchValue={filters.search}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
        </div>

        <div className="mb-8">
          <MaterialFilters
            filterOptions={filterOptions}
            filters={filters}
            materials={materials}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <MaterialsStats
          filteredCount={filteredMaterials.length}
          totalCount={materials.length}
        />

        {filteredMaterials.length === 0 ? (
          <MaterialsEmptyState />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {viewMode === "grid" ? (
                <MaterialGrid
                  materials={filteredMaterials}
                  onQuickView={setSelectedMaterial}
                />
              ) : (
                <MaterialListView
                  materials={filteredMaterials}
                  onQuickView={setSelectedMaterial}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}

        <MaterialQuickViewModal
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
        />
      </div>
    </div>
  );
};

export default MaterialsPage;