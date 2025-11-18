"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { iconMap } from "@/types/resume";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description?: string;
  website: string;
  github: string;
  tags: (keyof typeof iconMap)[];
  image?: string;
}

export const ProjectCard = ({
  title,
  description,
  website,
  github,
  tags,
  image,
}: ProjectCardProps) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border hover:border-primary/20">
      {image && (
        <Link href={website} target="_blank" rel="noopener noreferrer" className="block cursor-pointer overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={512}
            height={512}
            className="w-full aspect-16/10 object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex grow flex-col justify-between">
        {description && (
          <p className="grow text-sm/normal text-muted-foreground">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2">
          {tags?.map((tag) => {
            const Icon = iconMap[tag];
            if (!Icon) return null;
            return <Icon key={tag} className="size-4 text-muted-foreground" />;
          })}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between gap-2">
          {website && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full"
              asChild
            >
              <Link href={website} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="size-4" />
                View Website
              </Link>
            </Button>
          )}
          {github && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full"
              asChild
            >
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <GitHubLogoIcon className="size-4" />
                View Source
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
