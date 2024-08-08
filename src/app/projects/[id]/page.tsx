"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";

import { PageProps } from "../../../../.next/types/app/projects/[id]/page";

interface CustomPageProps extends PageProps {
  params: {
    id: string;
  };
}

export interface Project {
  title: string;
  createdAt: string;
}

export default function ProjectPage({ params }: CustomPageProps) {
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (window !== undefined) {
      const project = JSON.parse(
        localStorage.getItem(`project${params.id}`) as string
      );
      setProject(project);
    }
  }, [params.id]);

  return <DndProvider backend={HTML5Backend}>{project?.title}</DndProvider>;
}
