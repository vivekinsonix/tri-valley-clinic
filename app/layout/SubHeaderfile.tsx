import { Badge } from 'flowbite-react';
import Image from 'next/image';
import Head from 'next/head';
import { RichTextViewer } from '../components/richtext/RichTextViewer';
import { SubHeaderProps } from '../utils/Interfaces';

export default function SubHeader({ loading = false, title, description, backgroundImage, overlayColor = 'black', overlayOpacity = 0.4, buttons = [], tags = [], subtitle = '' }: SubHeaderProps) {
  const keywords = tags.join(', ');

  return (
    <header role="banner" className="relative isolate overflow-hidden pt-4 px-4">
      {/* SEO Meta Tags */}
      <Head>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {tags.length > 0 && <meta name="keywords" content={keywords} />}

        {/* Open Graph SEO */}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        {backgroundImage && <meta property="og:image" content={backgroundImage} />}
        <meta property="og:type" content="website" />

        {/* Twitter SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        {title && <meta name="twitter:title" content={title} />}
        {description && <meta name="twitter:description" content={description} />}
        {backgroundImage && <meta name="twitter:image" content={backgroundImage} />}
      </Head>

      {/* Background */}
      {!loading && backgroundImage ? (
        backgroundImage.endsWith('.mp4') ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={backgroundImage} type="video/mp4" />
          </video>
        ) : (
          <Image src={backgroundImage} alt={title || 'header background'} fill priority className="object-cover object-center" />
        )
      ) : (
        <div className="absolute inset-0 bg-gray-700 animate-pulse" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 dark:bg-primary" />

      {/* Content */}
      <div className="relative z-10 container mx-auto  py-10 sm:py-24 md:py-32 text-left dark:text-white">
        {/* Title */}
        {loading ? <div className="h-10 w-1/2 rounded bg-gray-600 animate-pulse" /> : title && <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>}

        {/* Description */}
        {loading ? <div className="mt-4 h-4 w-2/3 rounded bg-gray-600 animate-pulse" /> : description && <p className="mt-4 text-lg dark:text-white/90">{description}</p>}

        {subtitle && (
          <div className="mt-2 mb-3">
            <RichTextViewer content={subtitle} />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap justify-start gap-2 mt-5">
          {!loading &&
            tags.map((t) => (
              <Badge key={t} color="info" className="bg-primary-100 p-3 rounded-2xl h-7 w-auto text-sm font-medium text-blue-800">
                {t}
              </Badge>
            ))}
        </div>

        {/* Buttons */}
        {loading ? (
          <div className="mt-8 flex gap-4">
            <div className="h-10 w-32 rounded-full bg-gray-600 animate-pulse" />
            <div className="h-10 w-32 rounded-full bg-gray-600 animate-pulse" />
          </div>
        ) : (
          buttons.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {buttons.map((btn, i) => {
                const base = 'px-6 py-3 rounded-full font-semibold transition-all duration-200';

                let variantClass = 'inline-block bg-blue-100 text-black font-bold py-3 px-8 rounded-full uppercase tracking-wide hover:scale-105 transition';

                if (btn.variant === 'secondary') {
                  variantClass = 'bg-white text-black hover:bg-gray-200';
                } else if (btn.variant === 'outline') {
                  variantClass = 'border border-white text-white hover:bg-white/10';
                }

                return (
                  <button key={i} onClick={btn.onClick} className={`${base} ${variantClass}`} aria-label={btn.label}>
                    {btn.loading ? '...' : btn.label}
                  </button>
                );
              })}
            </div>
          )
        )}
      </div>
    </header>
  );
}
