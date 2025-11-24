"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { SkillOrb } from "@/components/skill-orb";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY } from "@/lib/utils";

export const SkillsSection = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {DATA.skills.map(({ name, icon: Icon }, id) => (
        <BlurFade key={name} delay={BLUR_FADE_DELAY * 3 + id * 0.05}>
          <SkillOrb name={name} icon={Icon} index={id} />
        </BlurFade>
      ))}
    </div>
  );
};
