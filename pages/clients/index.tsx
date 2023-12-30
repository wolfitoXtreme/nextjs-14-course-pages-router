import Link from 'next/link';

const ClientsPage = () => {
  const clients = [
    { id: 'john-doe', name: 'John Doe' },
    { id: 'jane-doe', name: 'Jane Doe' },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map(({ id, name }, index) => (
          <li key={`${id}-${index}`}>
            {/* <Link href={`/clients/${id}`}>{name}</Link> */}
            <Link
              href={{
                pathname: '/clients/[id]',
                query: { id },
              }}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
