interface MaterialsStatsProps {
  filteredCount: number;
  totalCount: number;
}

export const MaterialsStats: React.FC<MaterialsStatsProps> = ({
  filteredCount,
  totalCount,
}) => (
  <div className="mb-6 flex items-center justify-between">
    <p className="text-sm text-gray-500">
      Showing{" "}
      <span className="font-semibold text-gray-900">{filteredCount}</span> of{" "}
      <span className="font-semibold text-gray-900">{totalCount}</span>{" "}
      materials
    </p>
  </div>
);
