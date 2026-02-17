import { Button } from 'flowbite-react';
import Image from 'next/image';

type Action = {
  label: string;
  href: string;
};

type HeroSectionProps = {
  backgroundImage: string;
  overlayGradient?: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
};

export default function HeroSection({ backgroundImage, overlayGradient = 'from-black/90 via-black/80 to-black/70', eyebrow, title, highlight, description, primaryAction, secondaryAction }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden pt-5">
      <div className="absolute inset-0 -z-10">
        <Image src={backgroundImage} alt={title} fill className="object-cover" priority />
        <div className={`absolute inset-0 bg-gradient-to-r ${overlayGradient}`} />
      </div>

      <div className="mx-auto container px-0 py-20 md:py-28 text-white">
        {eyebrow && <p className="text-xs uppercase tracking-widest opacity-80">{eyebrow}</p>}
        <h1 className="mt-3 text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
          {title} {highlight && <span className="text-teal-400">{highlight}</span>}
        </h1>
        {description && <p className="mt-4 max-w-2xl text-white/90">{description}</p>}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {primaryAction && (
            <Button href={primaryAction.href} color="teal" pill>
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button href={secondaryAction.href} color="light" outline pill>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
