import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
  const {
    query: { id },
  } = useRouter();

  return (
    <div>
      <h1>The Client &quot;{id}&quot; Projects Page</h1>
      <p>Projects...</p>
    </div>
  );
};

export default ClientProjectsPage;
