-- Insert a sample blog post
INSERT INTO public.posts (title, slug, content, excerpt, cover_image, published)
VALUES (
  'Welcome to Our New Website',
  'welcome-to-our-new-website',
  '# Welcome to Amanux Studio

We are thrilled to announce the launch of our new website! This platform will serve as a hub for our latest projects, thoughts, and updates.

![Studio Workspace](https://contentsnare.com/wp-content/uploads/2021/12/Looking-to-create-a-website-1.jpg)

## What to Expect

- **Insightful Articles**: We will be sharing our knowledge on web development, design, and technology.
- **Project Showcases**: Get a behind-the-scenes look at our recent work.
- **Community**: We want to hear from you!

Stay tuned for more updates. We have a lot of exciting things planned for the future.

## Tech Stack

This website is built with:
- React
- Vite
- Tailwind CSS
- Supabase

Thank you for visiting!
',
  'We are thrilled to announce the launch of our new website! This platform will serve as a hub for our latest projects, thoughts, and updates.',
  'https://contentsnare.com/wp-content/uploads/2021/12/Looking-to-create-a-website-1.jpg',
  true
);
