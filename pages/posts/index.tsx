import AllPosts from '@/components/posts/AllPosts';

const DUMMY_POSTS = [
  {
    date: '2024-02-10',
    image: 'getting-started-nextjs.png',
    slug: 'getting-started-with-nextjs-01',
    text: 'NextJS is the react framework for production. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    title: 'Getting Started with NextJS',
  },
  {
    date: '2024-02-10',
    image: 'getting-started-nextjs.png',
    slug: 'getting-started-with-nextjs-02',
    text: 'NextJS is the react framework for production. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    title: 'Getting Started with NextJS',
  },
  {
    date: '2024-02-10',
    image: 'getting-started-nextjs.png',
    slug: 'getting-started-with-nextjs-03',
    text: 'NextJS is the react framework for production. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    title: 'Getting Started with NextJS',
  },
  {
    date: '2024-02-10',
    image: 'getting-started-nextjs.png',
    slug: 'getting-started-with-nextjs-04',
    text: 'NextJS is the react framework for production. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    title: 'Getting Started with NextJS',
  },
];

const AllPostsPage = () => {
  return <AllPosts posts={DUMMY_POSTS} />;
};

export default AllPostsPage;
