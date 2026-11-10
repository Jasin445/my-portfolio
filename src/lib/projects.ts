import type { Project } from "../types/project";

export function getProjectSlug(project: Project): string {
  return project.slug;
}

export function getProjectImages(project: Project): string[] {
  return [...new Set(project.images?.length ? project.images : [project.image])];
}
