'use client';
import SeoHead from '@/app/components/seo/seoHead';
import { getProjects, getProjectsCategories } from '@/app/services/projectService';
import { ProjectCard } from '@/app/utils/Interfaces';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

let cachedProjects: any = {};
let cachedCategories: Category[] | null | any = null;

function ProjectCardSkeleton({ spanTwo = false }: { spanTwo?: boolean }) {
  return (
    <div className={`group relative overflow-hidden shadow-lg rounded-lg animate-pulse bg-gray-200 dark:bg-gray-800 h-75 ${spanTwo ? 'md:col-span-2' : ''}`}>
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 dark:to-black/90" />
      <div className="relative h-full flex flex-col items-center justify-between p-6">
        <div />
        <div className="flex flex-col items-center space-y-3 w-full text-center">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
        <div className="w-full flex justify-center">
          <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
}
interface Category {
  name: string;
  slug: string;
}
export default function Projects() {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      if (cachedCategories) {
        setCategories(cachedCategories);
        return;
      }

      try {
        const res = await getProjectsCategories();
        const cats = res?.data || [];

        const finalCats = [
          { name: 'All', slug: '' },
          ...cats.map((cat: any) => ({
            name: cat.label,
            slug: cat.slug,
          })),
        ];

        setCategories(finalCats);
        cachedCategories = finalCats;
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        if (cachedProjects) {
          setProjects(cachedProjects);
          return;
        }
        const response = await getProjects();

        const data: ProjectCard[] = response?.data || [];
        setProjects(data);
        cachedProjects = data;
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const key = selectedCategory || 'all';

      // Serve from cache
      if (cachedProjects[key]) {
        setProjects(cachedProjects[key]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getProjects({ categorySlug: selectedCategory || undefined });
        const allProjects: ProjectCard[] = res?.data || [];

        setProjects(allProjects);
        cachedProjects[key] = allProjects;
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="p-40 animate-pulse">
        <div className="flex flex-col items-center text-center space-y-3 ">
          <div className="h-6 w-50 bg-gray-500 rounded" />
          <div className="h-4 w-80 bg-gray-500 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">{loading && Array.from({ length: 6 }).map((_, idx) => <ProjectCardSkeleton key={idx} spanTwo={false} />)}</div>
      </div>
    );
  }

  return (
    <>
      <SeoHead title="Our Projects - Dolcera" description="Explore our portfolio of successful patent analytics projects." keywords="Dolcera projects, patent analytics projects,  patent research case studies" url={`${typeof window !== 'undefined' ? window.location.origin : ''}/projects`} />
      <section id="projects" className="py-16 md:px-0 px-4 md:py-24  bg-white">
        <p className="text-center text-gray-400 uppercase tracking-wider">What We Do</p>
        <h1 className="text-center text-3xl md:text-5xl font-extrabold mb-10">Our Projects</h1>
        <div className="container mx-auto text-center mb-5 mt-10">
          <div className="mb-12 flex justify-center gap-2 flex-wrap">
            {categories?.map((cat) => {
              const isActive = selectedCategory === cat?.slug;
              return (
                <Button key={cat.slug} value={cat.slug} onClick={() => setSelectedCategory(cat.slug)} className={` transition-all ${isActive ? 'bg-primary dark:bg-primary/80 dark:hover:bg-primary text-white border-primary' : 'bg-transparent dark:bg-transparent dark:text-gray-600 text-gray-600 border-gray-300 dark:hover:bg-gray-100 hover:bg-gray-100'}`}>
                  {cat.name}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {projects?.map((project: any, index) => {
              return (
                <Link key={index} href={project?.link ?? '#'} className={`group w-full h-87.5 relative overflow-hidden shadow-lg cursor-pointer block  'md:col-span-2'`}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${project?.image?.url})` }} />
                  <div className="absolute inset-0 bg-primary-900/80 group-hover:bg-black/20 transition-all duration-500" />

                  <div className="relative h-full flex flex-col items-center justify-between text-white p-6">
                    <div />
                    <div className="text-center">
                      <p className="text-lg mb-3">{project?.project_category?.label}</p>
                      <h1 className="font-bold">{project?.label}</h1>
                    </div>
                    <div className="w-full flex justify-center">
                      <span className="inline-block rounded-full bg-secondary px-5 py-2 text-sm font-semibold uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">Explore Projects →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
            {!loading && projects?.length === 0 && <p className="col-span-full text-center text-red-500">No Projects Found!</p>}
          </div>
        </div>
      </section>
    </>
  );
}
