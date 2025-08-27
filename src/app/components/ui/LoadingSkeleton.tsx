import React from "react";

interface LoadingSkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = "",
  height = "h-4",
  width = "w-full",
  rounded = "rounded-md",
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse ${height} ${width} ${rounded} ${className}`}
      style={{
        animation: "skeleton-loading 1.5s ease-in-out infinite",
      }}
    />
  );
};

interface StatCardSkeletonProps {
  className?: string;
}

export const StatCardSkeleton: React.FC<StatCardSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <LoadingSkeleton height="h-4" width="w-3/4" />
          <LoadingSkeleton height="h-8" width="w-1/2" />
        </div>
        <LoadingSkeleton height="h-12" width="w-12" rounded="rounded-full" />
      </div>
    </div>
  );
};

interface CardSkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className = "",
  children,
}) => {
  return (
    <div
      className={`bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg ${className}`}
    >
      {children || (
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <LoadingSkeleton height="h-6" width="w-3/4" />
              <LoadingSkeleton height="h-4" width="w-1/2" />
            </div>
            <LoadingSkeleton height="h-6" width="w-6" rounded="rounded-full" />
          </div>
          <div className="space-y-2">
            <LoadingSkeleton height="h-4" width="w-full" />
            <LoadingSkeleton height="h-4" width="w-2/3" />
            <LoadingSkeleton height="h-4" width="w-1/2" />
          </div>
          <div className="flex space-x-2 pt-2">
            <LoadingSkeleton height="h-8" width="w-1/3" rounded="rounded-lg" />
            <LoadingSkeleton height="h-8" width="w-1/3" rounded="rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Table Header */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <LoadingSkeleton key={`header-${i}`} height="h-5" width="w-2/3" />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid gap-4 py-2"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <LoadingSkeleton
              key={`cell-${rowIndex}-${colIndex}`}
              height="h-4"
              width={colIndex === 0 ? "w-3/4" : "w-full"}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface ProgressSkeletonProps {
  className?: string;
}

export const ProgressSkeleton: React.FC<ProgressSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between">
        <LoadingSkeleton height="h-4" width="w-16" />
        <LoadingSkeleton height="h-4" width="w-20" />
      </div>
      <LoadingSkeleton height="h-3" width="w-full" rounded="rounded-full" />
    </div>
  );
};
