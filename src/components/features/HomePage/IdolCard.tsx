import { OptimizedImage } from "@/components/common/OptimizedImage";
import { Button } from "@/components/ui";
import { rarities, RarityType } from "@/data/rarities";
import { IdolCardProps } from "@/types";
import React from "react";

type ExtendedIdolCardProps = IdolCardProps & {
  imageFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

export const IdolCard: React.FC<ExtendedIdolCardProps> = ({
  name,
  group,
  birthdate,
  birthplace,
  position,
  quote,
  imageSrc,
  rarity,
  onViewProfile,
  countBadge,
  imageFit = 'cover',
}) => {
  const rarityStyles =
    rarity && rarities[rarity as RarityType]
      ? {
          borderColor: rarities[rarity as RarityType].borderColor,
          bgColor: rarities[rarity as RarityType].bgColor,
          textColor: rarities[rarity as RarityType].color,
        }
      : {
          borderColor: "border-retro-brown",
          bgColor: "bg-retro-teal",
          textColor: "text-retro-cream",
        };

  return (
    <div className="relative w-full min-w-0 group" data-cy="idol-card">
      <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 w-full h-full bg-retro-yellow border-3 border-retro-brown rounded-xl transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
      <div className="relative bg-retro-cream border-3 border-retro-brown rounded-xl overflow-hidden transition-transform duration-200 group-hover:-translate-y-1">
        <div className="bg-retro-yellow h-7 sm:h-8 flex items-center px-2.5 sm:px-3 border-b-3 border-retro-brown justify-between gap-2 min-w-0">
          <div className="flex items-center space-x-1.5 shrink-0">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-retro-coral border-2 border-retro-brown" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-retro-yellow border-2 border-retro-brown" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-retro-mint border-2 border-retro-brown" />
          </div>
          <div className="text-retro-brown text-xs sm:text-sm font-medium truncate">
            {group}
          </div>
        </div>

        <div className="relative aspect-[3/4] w-full">
          {imageSrc ? (
            <OptimizedImage
              src={imageSrc}
              alt={`${name} from ${group}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              objectFit={imageFit}
            />
          ) : (
            <div className="absolute inset-0 bg-retro-sage flex items-center justify-center">
              <p className="text-retro-brown text-sm">Image not available</p>
            </div>
          )}
        </div>

        <div className="p-2.5 sm:p-3">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:items-start mb-2">
            <h3 className="text-sm sm:text-base font-bold text-retro-brown leading-tight break-words">
              {name}
            </h3>
            {rarity && (
              <div className={`shrink-0 self-start flex items-center justify-center border-1 rounded-full ${rarityStyles.borderColor}`}>
                <div
                  className={`${rarityStyles.bgColor} px-2 py-0.5 rounded-full text-[10px] sm:text-xs ${rarityStyles.textColor} font-medium whitespace-nowrap`}
                >
                  {rarities[rarity as RarityType].name}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center min-w-0">
              <div className="w-2 h-2 rounded-full bg-retro-coral mr-1.5 shrink-0" />
              <p className="text-retro-navy text-xs truncate">{birthdate}</p>
            </div>

            <div className="flex items-center min-w-0">
              <div className="w-2 h-2 rounded-full bg-retro-yellow mr-1.5 shrink-0" />
              <p className="text-retro-navy text-xs truncate">{birthplace}</p>
            </div>

            <div className="flex items-center min-w-0">
              <div className="w-2 h-2 rounded-full bg-retro-mint mr-1.5 shrink-0" />
              <p className="text-retro-navy text-xs truncate">{position}</p>
            </div>
          </div>

          {quote && (
            <div className="mt-2.5 pt-2.5 border-t-1.5 border-dotted border-retro-brown">
              <p className="italic text-retro-navy text-xs line-clamp-2">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          )}

          {onViewProfile && (
            <Button
              data-cy="view-profile-button"
              onClick={onViewProfile}
              variant="retro"
              size="sm"
              className="mt-2.5 w-full"
            >
              View Profile
            </Button>
          )}
        </div>
      </div>
      {typeof countBadge !== 'undefined' && (
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 sm:translate-x-1/2 sm:-translate-y-[40%] bg-retro-brown text-white rounded-full min-w-6 h-6 px-1 flex items-center justify-center text-[10px] font-bold z-30 ring-2 ring-retro-cream pointer-events-none">
          {countBadge}
        </div>
      )}
    </div>
  );
};