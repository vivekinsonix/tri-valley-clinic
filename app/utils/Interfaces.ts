export interface JobsResponse {
  data: JobItem[];
  meta: Meta;
}

export interface JobItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  location: string;
  experience: string;
  description: string;
  responsibilities: string | null;
  requirements: string;
  isOpen: boolean;
  skills: string[];
  Seo?: SeoMeta;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
  Type: string | null;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface SeoMeta {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string | null;
  metaViewport: string | null;
  canonicalURL: string | null;
  structuredData: string | null;
}

export interface Blog {
  pricing_cards?: any;
  tags: any;
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  createdAt: string;
  description?: string;
  content: ParagraphNode[];
  Seo?: SeoMeta;
  coverImage?: {
    url: string;
    alternativeText?: string;
    formats?: {
      medium?: { url: string };
    };
  };
  video?: { url?: string }[];
}

export interface ParagraphChild {
  text: string;
  type: string; // "text"
}

export interface AudienceItem {
  main: any;
  id: number;
  documentId: string;
  title: string;
  subtitle: string | null;
  description: string;
  icon: string; // SVG stored as string
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  publishedAt: string; // ISO Date
  slug: string;
}

export interface AboutResponse {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Main: {
    id: number;
    sub_heading: string;
    heading: string;
  };
  Our_Legacy: {
    id: number;
    heading: string;
    paragraph_1: string;
    paragraph_2: string;
    our_team: OurTeam;
  };
  Our_Core_Differentiators: {
    id: number;
    counts: DifferentiatorCount[];
  };
}

export interface OurTeam {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface DifferentiatorCount {
  id: number;
  label: string;
  count: string;
}

interface CountItem {
  id?: number | string;
  count: number | string;
  label: string;
}

interface LegacyData {
  id: number;
  heading: string;
  paragraph_1: string;
  paragraph_2: string;
  our_team: OurTeam;
}

export interface SubHeaderButton {
  label: string;
  loading?: boolean;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface SubHeaderProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  buttons?: SubHeaderButton[];
  loading?: boolean;
  tags?: string[];
  subtitle?: string;
}

export type FieldType = 'text' | 'email' | 'number' | 'tel' | 'url' | 'password' | 'textarea' | 'checkbox' | 'select' | 'radio' | 'file' | 'date';

export interface DynamicField {
  id?: number;
  text: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
}

export interface FormRendererProps {
  fields: DynamicField[];
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  errors?: Record<string, string>;
}

export interface About {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content: string;
  images: MediaImage[];
  Seo: SeoMeta;
}

export interface MediaImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: MediaFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type RichTextNode = ParagraphNode | HeadingNode;

export interface ParagraphNode {
  type: 'paragraph';
  children: RichTextChild[];
}

export interface HeadingNode {
  type: 'heading';
  level: number;
  children: RichTextChild[];
}

export interface RichTextChild {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

export interface MediaFormats {
  large?: MediaFormat;
  medium?: MediaFormat;
  small?: MediaFormat;
  thumbnail?: MediaFormat;
}

export interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface SeoMeta {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string | null;
  metaViewport: string | null;
  canonicalURL: string | null;
  structuredData: string | null;
}
export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiImageFormats {
  thumbnail?: StrapiImageFormat;
  small?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  large?: StrapiImageFormat;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: StrapiImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ClientCard {
  id: number;
  label: string;
  image: StrapiImage;
}

export interface ClientsSection {
  id: number;
  documentId: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  card: ClientCard[];
}
export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    small?: MediaFormat;
    thumbnail?: MediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProjectCategory {
  id: number;
  documentId: string;
  label: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Project {
  id: number;
  documentId: string;
  label: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  link: string | null;
  image: Media;
  project_category: ProjectCategory;
}

export interface ProjectCard {
  title: string;
  category: string;
  image: string;
  href: string;
  colSpan?: string;
}

export interface TeamMember {
  id: number;
  linkdin_link: string;
  name: string;
  designation: string;
  image: Media | null;
}

export interface TeamSection {
  id: number;
  documentId: string;
  label: string;
  description: string;
  h1: string;
  p1: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  card: TeamMember[];
}
