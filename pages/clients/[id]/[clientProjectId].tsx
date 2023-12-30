import { useRouter } from 'next/router';

const SelectedClientProjectPage = () => {
  const {
    query: { id, clientProjectId },
  } = useRouter();

  return (
    <div>
      <h1>Client: {id}</h1>
      <h3>Project: {clientProjectId}</h3>
    </div>
  );
};

export default SelectedClientProjectPage;
