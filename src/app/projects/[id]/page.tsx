import { PageProps } from "../../../../.next/types/app/layout";

interface CustomPageProps extends PageProps {
  params: {
    id: string;
  };
}

export default function Project({ params }: CustomPageProps) {
  return <div>{params.id}</div>;
}
