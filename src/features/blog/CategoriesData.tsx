import { getBlogPosts } from '@/utils/getBlogPosts';

import { Categories } from './Categories';

export async function CategoriesData() {
  const { posts } = await getBlogPosts();

  // 在服务器上处理数据
  const allTags = posts.flatMap(post => post.metadata.tags.split(',').map(t => t.trim()));
  const uniqueTags = [...new Set(allTags)];

  return <Categories tags={uniqueTags} />;
}