import { useRouter } from 'next/router';

const SelectedClientProjectPage = () => {
  const {
    query: { id, clientProjectID },
  } = useRouter();

  return (
    <div>
      <h1>{id}</h1>
      <h3>Project {clientProjectID}</h3>
    </div>
  );
};

export default SelectedClientProjectPage;
