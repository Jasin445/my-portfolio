import { useEffect, useState } from "react";
import APIService from "../utils/apiService";
import type { Project } from "../types/project";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface HashnodePost {
  title: string;
  brief: string;
  slug: string;
  url: string;
  coverImage: { url: string } | null;
  publishedAt: string;
  readTimeInMinutes: number;
  tags: { name: string }[];
}

interface HashnodeResponse {
  posts?: HashnodePost[];
  message?: string;
}

const apiService = new APIService(process.env.NEXT_PUBLIC_BACKEND_URL);

const errorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

const useGetAllProjects = () => {
  const [allProjects, setAllProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get<ApiResponse<Project[]>>("/projects");
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch projects");
      }
      setAllProjects(response.data);
    } catch (requestError) {
      console.error("Failed to fetch projects:", requestError);
      setError(errorMessage(requestError, "An error occurred while fetching projects"));
      setAllProjects(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        const response = await apiService.get<ApiResponse<Project[]>>("/projects");
        if (!response.success) {
          throw new Error(response.message || "Failed to fetch projects");
        }
        if (active) {
          setAllProjects(response.data);
          setError(null);
        }
      } catch (requestError) {
        if (active) {
          console.error("Failed to fetch projects:", requestError);
          setError(errorMessage(requestError, "An error occurred while fetching projects"));
          setAllProjects(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadProjects();
    return () => {
      active = false;
    };
  }, []);

  return {
    projects: allProjects,
    loading,
    error,
    isEmpty: !loading && !error && (!allProjects || allProjects.length === 0),
    refetch: fetchProjects,
  };
};

const getArticlesFromHashnode = async (): Promise<HashnodeResponse> => {
  const response = await fetch("/api/hashnode");
  const result = (await response.json()) as HashnodeResponse;

  if (!response.ok) {
    throw new Error(
      result.message || `Hashnode request failed with status ${response.status}`,
    );
  }

  return result;
};

const useGetArticlesFromHashnode = () => {
  const [data, setData] = useState<HashnodeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const loadArticles = async () => {
      try {
        const articles = await getArticlesFromHashnode();
        if (active) {
          setData(articles);
          setError(null);
        }
      } catch (requestError) {
        if (active) {
          setError(errorMessage(requestError, "Failed to fetch articles."));
          setData(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadArticles();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  return {
    loading,
    data,
    error,
    refetch: () => setReloadKey((key) => key + 1),
  };
};

export { useGetAllProjects, useGetArticlesFromHashnode };
