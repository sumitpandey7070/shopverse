import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

const sizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

export const StarRating: React.FC<StarRatingProps> = ({
  rating, reviewCount, size = 'sm', showCount = true, className = ''
}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} className="star-filled" />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="star-filled" />);
    else stars.push(<FaRegStar key={i} className="star-empty" />);
  }
  return (
    <div className={`flex items-center gap-1 ${sizes[size]} ${className}`}>
      <div className="flex items-center gap-0.5">{stars}</div>
      <span className="font-semibold text-amber-400">{rating.toFixed(1)}</span>
      {showCount && reviewCount !== undefined && (
        <span className="dark:text-slate-400 text-slate-500">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
};

export default StarRating;
