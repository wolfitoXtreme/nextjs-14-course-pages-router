import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
  const {
    push,
    query: { id },
  } = useRouter();

  const handleLoadProject = () => {
    // load data...
    // push(`/clients/${id}/some-project`);
    push({
      pathname: '/clients/[id]/[clientProjectId]',
      query: { id, clientProjectId: 'some-project' },
    });
  };

  return (
    <div>
      <h1>The Client &quot;{id}&quot; Projects Page</h1>
      <button type="button" onClick={handleLoadProject}>
        Load project
      </button>
    </div>
  );
};

export default ClientProjectsPage;
