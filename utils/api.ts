/* eslint-disable import/newline-after-import */
import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { TPost } from '@/types';
// process.cwd()      -> current working directory
// posts              -> posts directory
const postsDirectory = path.join(process.cwd(), 'posts');

const getPostData = (fileName: string) => {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { content, data } = matter(fileContent);
  const postSlug = fileName.replace(/\.md$/, ''); // removes file extension

  const postData = {
    slug: postSlug,
    ...(data as Omit<TPost, 'slug' | 'text'>),
    text: content,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = fs.readdirSync(postsDirectory);

  const allPosts = postFiles
    .map(postFile => getPostData(postFile))
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return allPosts;
};

export const getFeaturedPosts = () => {
  const featuredPosts = getAllPosts().filter(({ isFeatured }) => isFeatured);

  return featuredPosts;
};
