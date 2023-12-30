import { useRouter } from 'next/router';

const ProjectPage = () => {
  const {
    pathname,
    query,
    query: { projectID },
  } = useRouter();

  // Now with the projectID, data can be fetched

  const routerOutput = {
    pathname,
    query,
  };

  return (
    <div>
      <h1>The ProjectPage Page {projectID}</h1>
      <pre>{JSON.stringify(routerOutput, null, 2)}</pre>
    </div>
  );
};

export default ProjectPage;
