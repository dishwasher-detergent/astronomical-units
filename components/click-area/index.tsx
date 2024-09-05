"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"
import { useTheme } from "next-themes";

import { auIncrement } from "@/atoms/au";
import { Button } from "@/components/ui/button";
import { crew } from "@/atoms/crew";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { calculateUpgradeMultiplier } from "@/lib/utils";
import { LOCALE } from "@/constants/GLOBAL";

export function ClickArea() {
  const setClicks = useSetAtom(auIncrement);
  const crewAtom = useAtomValue(crew);
  const item = EQUIPMENT_LIST.crew;
  const multiplier = calculateUpgradeMultiplier(crewAtom, item);
  const [init, setInit] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          push: {
            quantity: 1,            
          },
        },
      },
      particles: {
        number: {
          value: 0
        },
        color: {
          value: theme == 'dark' ? "#fff" : '#000'
        },
        shape: {
          type: ["star"],
        },
        opacity: {
          value: { min: 0, max: 1 },
          animation: {
            enable: true,
            speed: 1,
            startValue: "max",
            destroy: "min"
          }
        },
        size: {
          value: { min: 3, max: 7 }
        },
        life: {
          duration: {
            sync: true,
            value: .5
          },
          count: 1
        },
        move: {
          enable: true,
          gravity: {
            enable: true
          },
          drift: {
            min: -2,
            max: 2
          },
          speed: { min: 10, max: 30 },
          decay: 0.1,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "destroy",
            top: "none"
          }
        },
        rotate: {
          value: {
            min: 0,
            max: 360
          },
          direction: "random",
          move: true,
          animation: {
            enable: true,
            speed: 60
          }
        },
        tilt: {
          direction: "random",
          enable: true,
          move: true,
          value: {
            min: 0,
            max: 360
          },
          animation: {
            enable: true,
            speed: 60
          }
        },
        roll: {
          darken: {
            enable: true,
            value: 25
          },
          enable: true,
          speed: {
            min: 15,
            max: 25
          }
        },
        wobble: {
          distance: 30,
          enable: true,
          move: true,
          speed: {
            min: -15,
            max: 15
          }
        }
      },
      detectRetina: true,
    }),
    [theme],
  );

  return (
    <>
    <Button
      onClick={() => {
        setClicks();
      }}
      className="relative flex h-full w-full flex-none flex-col items-center justify-center overflow-hidden rounded-none border-b bg-muted hover:bg-muted"
    >
      <div className="z-10 flex flex-col items-center text-primary">
        <span>Tap Here</span>
        <span className="text-xl font-bold">
          +{(crewAtom.value * multiplier + 1).toLocaleString(LOCALE)} AU
        </span>
      </div>
      <Particles
        className="absolute inset-0 z-10"
        options={options}
      />
      <div className="absolute -left-4 top-0 h-72 w-72 animate-blob rounded-full bg-green-300 opacity-40 blur-xl filter dark:bg-green-500"></div>
      <div className="animation-delay-2000 absolute -right-4 top-0 h-72 w-72 animate-blob rounded-full bg-yellow-300 opacity-40 blur-xl filter dark:bg-yellow-500"></div>
      <div className="animation-delay-4000 absolute -bottom-8 left-28 h-72 w-72 animate-blob rounded-full bg-pink-300 opacity-40 blur-xl filter dark:bg-pink-500"></div>
    </Button>
    </>
  );
}

