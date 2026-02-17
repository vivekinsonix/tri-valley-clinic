'use client';
import { getProjects } from '@/app/services/projectService';
import { ProjectCard } from '@/app/utils/Interfaces';
import Link from 'next/link';
import { useEffect, useState } from 'react';

let cachedProjects: ProjectCard[] | null = null;

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

export default function ProjectsHome() {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!loading && projects?.length === 0) {
    return <p className="col-span-full text-center text-red-500">No Projects Found!</p>;
  }

  return (
    <>
      <section id="projects" className="py-16 md:px-0 px-4 md:py-24  bg-white">
        <div className="container mx-auto text-center mb-5">
          <p className="text-center text-gray-400 uppercase tracking-wider">What We Do</p>
          <h1 className="text-center text-3xl md:text-5xl font-extrabold mb-10">Our Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {projects.slice(0, 5).map((project: any, index) => {
              const isFifth = index === 4;

              return (
                <Link key={index} href={project?.link ?? '#'} className={`group w-full h-87.5 relative overflow-hidden shadow-lg cursor-pointer block ${isFifth ? 'md:col-span-2' : ''}`}>
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
          </div>
          <div className="mt-10 text-center">
            {!loading && projects?.length > 5 && (
              <Link href="/projects" className="block w-full text-blue-500 hover:underline">
                View All Projects →
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
