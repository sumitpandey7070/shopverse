import React from 'react';

interface SkeletonProps {
  className?: string;
  rounded?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', rounded = 'rounded-xl' }) => (
  <div className={`skeleton ${rounded} ${className}`} />
);

export const ProductCardSkeleton: React.FC = () => (
  <div className="dark:bg-dark-card bg-white rounded-2xl overflow-hidden border dark:border-dark-border border-slate-200">
    <Skeleton className="h-56 w-full" rounded="rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-10 w-full" rounded="rounded-xl" />
    </div>
  </div>
);

export const BannerSkeleton: React.FC = () => (
  <Skeleton className="w-full h-[500px]" rounded="rounded-3xl" />
);

export const TableRowSkeleton: React.FC<{ cols?: number }> = ({ cols = 5 }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <Skeleton className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

export default Skeleton;
