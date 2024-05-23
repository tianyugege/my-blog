#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const title = process.argv[2];
if (!title) {
  console.error('Please provide a title for the article.');
  process.exit(1);
}
// 生成文章的 slug
const slug = title.toLowerCase().replace(/\s+/g, '-');
const date = new Date().toISOString().split('T')[0];

const content = `---
layout: '@/templates/BasePost.astro'
title: "${title}"
description: "This is a description of ${title}."
pubDate: "${date}"
imgSrc: '/assets/images/image-post2.jpeg'
imgAlt: 'Image post 2'
---

# ${title}

This is the content of ${title} written in Markdown.
`;

// 生成文件路径
const blogDir = path.join(__dirname, 'src', 'pages', 'posts');
const filePath = path.join(blogDir, `${slug}.md`);

// 检查并创建 blog 目录
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
  console.log(`Created directory: ${blogDir}`);
}

// 写入新文章内容
fs.writeFileSync(filePath, content, 'utf8');
console.log(`New article created: ${filePath}`);
