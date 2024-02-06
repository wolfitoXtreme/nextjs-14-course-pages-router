/* eslint-disable import/newline-after-import */
import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { TPost } from '@/types';
// process.cwd()      -> current working directory
// posts              -> posts directory
const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostData = (postIdentifier: string) => {
  const postSlug = postIdentifier.replace(/\.md$/, ''); // removes file extension
  // add extension so function accepts file name and or a flat string
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  // const filePath = path.join(postsDirectory, postIdentifier);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { content, data } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...(data as Omit<TPost, 'slug' | 'text'>),
    text: content,
  };

  return postData;
};

export const getPostFiles = (includeExtension = false) => {
  const files = fs.readdirSync(postsDirectory);
  if (!includeExtension) {
    return files.map(fileName => fileName.replace(/\.md$/, ''));
  }

  return files;
};

export const getAllPosts = () => {
  const postFiles = getPostFiles();

  const allPosts = postFiles
    .map(postFile => getPostData(postFile))
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return allPosts;
};

export const getFeaturedPosts = () => {
  const featuredPosts = getAllPosts().filter(({ isFeatured }) => isFeatured);

  return featuredPosts;
};
