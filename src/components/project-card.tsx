"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLinkIcon,
  Github,
  Receipt,
  Camera,
  Package,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const iconMap: Record<string, LucideIcon> = {
  receipt: Receipt,
  camera: Camera,
  package: Package,
  link: LinkIcon,
};

const gradients = [
  "from-emerald-500 to-cyan-500",
  "from-sky-500 to-indigo-500",
  "from-violet-500 to-fuchsia-500",
  "from-amber-500 to-orange-500",
];

interface ProjectCardProps {
  title: string;
  description?: string;
  website?: string;
  github?: string;
  icon?: string;
  index: number;
  logoUrl?: string;
}

export const ProjectCard = ({
  title,
  description,
  website,
  github,
  icon,
  index,
  logoUrl,
}: ProjectCardProps) => {
  const IconComponent = icon ? iconMap[icon] : null;
  const gradient = gradients[index % gradients.length];

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div
        className={cn(
          "relative flex h-35 items-start justify-start p-4 bg-linear-to-br",
          gradient
        )}
      >
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={title}
            width={100}
            height={100}
            className="size-12"
          />
        )}
        {IconComponent && <IconComponent className="size-12 text-white/80" />}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="font-semibold text-lg text-white">{title}</h3>
        </div>
      </div>
      <CardContent className="flex grow flex-col justify-between p-4">
        {description && (
          <p className="grow text-sm/normal text-muted-foreground">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2">
          {website && (
            <Link
              href={website}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-2"
              )}
            >
              <ExternalLinkIcon className="size-4" />
              Visit
            </Link>
          )}
          {github && (
            <Link
              href={github}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-2"
              )}
            >
              <Github className="size-4" />
              GitHub
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
