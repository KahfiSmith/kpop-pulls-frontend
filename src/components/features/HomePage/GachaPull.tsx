import { OptimizedImage } from "@/components/common/OptimizedImage";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { pityConfig, rarities, RarityType } from "@/data/rarities";
import { useGacha, useSoundEffects } from "@/hooks";
import { Volume2, VolumeX, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

const pityTiers: { key: keyof typeof pityConfig; rarity: RarityType }[] = [
  { key: "rare", rarity: "rare" },
  { key: "epic", rarity: "epic" },
  { key: "legendary", rarity: "legendary" },
  { key: "mythical", rarity: "mythical" },
];

function PityBar({
  label,
  current,
  max,
  rarity,
}: {
  label: string;
  current: number;
  max: number;
  rarity: RarityType;
}) {
  const info = rarities[rarity];
  const progress = Math.min((current / max) * 100, 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-semibold text-retro-brown">
        <span>{label}</span>
        <span>
          {current}/{max}
        </span>
      </div>
      <div className="retro-stat-bar">
        <div
          className={`retro-stat-fill ${info.bgColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export const GachaPull: React.FC = () => {
  const {
    pullIdol,
    animation,
    skipAnimation,
    pullHistory,
    pityCounter,
    stats,
  } = useGacha();
  const { playSound, isMuted, toggleMute } = useSoundEffects();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (animation.isPlaying && !isMuted) {
      switch (animation.step) {
        case "pulling":
          break;
        case "reveal":
          playSound("/sounds/anime-wow.mp3");
          break;
      }
    }
  }, [
    animation.isPlaying,
    animation.step,
    animation.result,
    isMuted,
    playSound,
  ]);

  const handlePull = () => {
    pullIdol();
  };

  return (
    <div className="w-full">
      <div className="retro-panel p-4 sm:p-6">
        <div
          className="relative h-80 sm:h-96 w-full bg-retro-navy border-3 border-retro-brown rounded-xl mb-6 overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(253,210,111,0.15),transparent_60%)]" />

          {animation.isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center">
              {animation.step === "pulling" && (
                <div className="animate-pulse flex flex-col items-center z-10">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-retro-yellow rounded-full animate-spin border-8 border-retro-brown border-t-transparent" />
                  <p className="text-retro-cream mt-4 text-lg sm:text-xl font-bold font-bungee">
                    Pulling...
                  </p>
                </div>
              )}

              {animation.step === "reveal" && animation.result && (
                <div className="animate-fadeIn z-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 ${
                        rarities[animation.result.idol.rarity].bgColor
                      } opacity-30`}
                    />
                    <div className="transform scale-110 animate-scaleIn">
                      {animation.result.idol.image && (
                        <div className="relative">
                          <OptimizedImage
                            src={animation.result.idol.image}
                            alt={animation.result.idol.name}
                            width={300}
                            height={300}
                            className="rounded-xl border-4 border-retro-brown shadow-lg h-full w-full object-cover"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {animation.step === "complete" && animation.result && (
                <div className="flex flex-col items-center animate-fadeIn transition-all duration-500 z-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 ${
                        rarities[animation.result.idol.rarity].bgColor
                      } opacity-30`}
                    />
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center animate-slideUp px-4">
                    <div className="text-center">
                      <p className="text-retro-cream text-xl font-bungee mb-2">
                        {animation.result.pityPull
                          ? "Pity activated!"
                          : "Congratulations!"}
                      </p>
                      <p className="text-retro-yellow text-base sm:text-lg mb-4">
                        You pulled a{" "}
                        <span className="font-bold">
                          {rarities[animation.result.idol.rarity].name}
                        </span>{" "}
                        card!
                      </p>
                      <Button
                        data-cy="continue-button"
                        onClick={() => skipAnimation()}
                        variant="retro"
                        size="lg"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <OptimizedImage
                src="/images/gacha-machine.png"
                alt="Gacha Machine"
                width={170}
                height={170}
                className="mb-4 animate-float"
                sizes="170px"
                objectFit="contain"
                style={{ imageRendering: "crisp-edges" }}
              />
              <p className="text-retro-cream text-base sm:text-lg mb-5 font-medium">
                Ready for your next pull?
              </p>
              <Button
                data-cy="gacha-pull-button"
                onClick={handlePull}
                variant="retro"
                size="lg"
              >
                Pull Card
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex gap-2 shrink-0">
            <Button
              data-cy="toggle-mute-button"
              onClick={toggleMute}
              variant="retro-sage"
              size="sm"
              aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
            >
              {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              {isMuted ? "Unmute" : "Mute"}
            </Button>

            <Button
              data-cy="toggle-stats-button"
              onClick={() => setShowStats(!showStats)}
              variant="retro-mint"
              size="sm"
            >
              <BarChart3 className="size-4" />
              {showStats ? "Hide Stats" : "Show Stats"}
            </Button>
          </div>

          <div className="flex-1 retro-panel-inset p-4">
            <p className="font-bold text-retro-brown text-sm mb-3">Pity Progress</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pityTiers.map(({ key, rarity }) => (
                <PityBar
                  key={key}
                  label={rarities[rarity].name}
                  current={pityCounter[key]}
                  max={pityConfig[key]}
                  rarity={rarity}
                />
              ))}
            </div>
          </div>
        </div>

        {showStats && (
          <div
            className="mt-5 p-4 retro-panel-inset"
            data-cy="stats-panel"
          >
            <h3 className="text-lg font-bold text-retro-brown mb-3">
              Pull Statistics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              <div className="retro-panel-inset p-3 text-center">
                <p className="text-xs font-semibold text-retro-navy">Total Pulls</p>
                <p className="text-xl font-bold text-retro-brown">{stats.totalPulls}</p>
              </div>

              {(["common", "rare", "epic", "legendary", "mythical"] as RarityType[]).map(
                (rarity) => (
                  <div
                    key={rarity}
                    className={`p-3 rounded-lg border-2 border-retro-brown text-center ${rarities[rarity].bgColor}`}
                  >
                    <p className="text-xs font-semibold">{rarities[rarity].name}</p>
                    <p className={`text-xl font-bold ${rarities[rarity].textColor}`}>
                      {stats.rarityDistribution[rarity]}
                    </p>
                    <p className="text-xs text-retro-navy">
                      {stats.totalPulls > 0
                        ? Math.round(
                            (stats.rarityDistribution[rarity] / stats.totalPulls) * 100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                )
              )}

              <div className="retro-panel-inset p-3 text-center bg-retro-yellow/30">
                <p className="text-xs font-semibold text-retro-navy">Pity Pulls</p>
                <p className="text-xl font-bold text-retro-brown">{stats.pityPulls}</p>
                <p className="text-xs text-retro-navy">
                  {stats.totalPulls > 0
                    ? Math.round((stats.pityPulls / stats.totalPulls) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>

            {pullHistory.pulls.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-bold text-retro-brown mb-2">
                  Recent Pulls
                </h4>
                <div
                  className="rounded-lg border-2 border-retro-brown overflow-hidden"
                  data-cy="recent-pulls-table"
                >
                  <div className="max-h-36 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-retro-mint/50 border-b-2 border-retro-brown">
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Time
                          </TableHead>
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Idol
                          </TableHead>
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Group
                          </TableHead>
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Rarity
                          </TableHead>
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Pity
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pullHistory.pulls.slice(0, 10).map((pull, index) => (
                          <TableRow
                            key={index}
                            className={`${
                              index % 2 === 0 ? "bg-white/70" : "bg-retro-cream/30"
                            } hover:bg-retro-yellow/20 transition-colors`}
                          >
                            <TableCell className="p-2 text-xs">
                              {new Date(pull.timestamp).toLocaleTimeString()}
                            </TableCell>
                            <TableCell className="p-2 text-xs font-medium">
                              {pull.idol.stageName}
                            </TableCell>
                            <TableCell className="p-2 text-xs">
                              {pull.idol.group}
                            </TableCell>
                            <TableCell className="p-2 text-xs">
                              <span
                                className={`font-semibold ${rarities[pull.idol.rarity].textColor}`}
                              >
                                {rarities[pull.idol.rarity].name}
                              </span>
                            </TableCell>
                            <TableCell className="p-2 text-xs">
                              {pull.pityPull ? (
                                <span className="font-semibold text-retro-brown">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-retro-navy/50">No</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};