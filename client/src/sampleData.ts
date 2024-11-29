export type Blog = {
  blogId: string;
  userId: string;
  timestamp: string;
  text: string;
  title: string;
};

export type Comment = {
  userId: string;
  blogId: string;
  timestamp: string;
  text: string;
};

export const comments: Comment[] = [
  {
    userId: "101",
    blogId: "1",
    timestamp: "2023-10-01",
    text: "Great post! I totally agree with your points.",
  },
  {
    userId: "102",
    blogId: "1",
    timestamp: "2023-10-02",
    text: "I think you could expand more on the last section.",
  },
  {
    userId: "103",
    blogId: "2",
    timestamp: "2023-10-03",
    text: "This was a very informative read. Thanks for sharing!",
  },
  {
    userId: "101",
    blogId: "3",
    timestamp: "2023-10-04",
    text: "I never thought about this topic in this way. Well done!",
  },
  {
    userId: "104",
    blogId: "3",
    timestamp: "2023-10-05",
    text: "You made some excellent points here. Learned a lot!",
  },
  {
    userId: "105",
    blogId: "4",
    timestamp: "2023-10-06",
    text: "This is so inspiring. Keep up the good work!",
  },
  {
    userId: "106",
    blogId: "5",
    timestamp: "2023-10-07",
    text: "The examples you included were very helpful. Thanks!",
  },
];

export const blogs: Blog[] = [
  {
    blogId: "1",
    userId: "101",
    timestamp: "2023-10-01",
    title: "The Future of Web Development",
    text: "Web development is evolving rapidly with the rise of new technologies such as AI, WebAssembly, and serverless architecture. Developers need to stay updated to stay ahead in this dynamic field.",
  },
  {
    blogId: "2",
    userId: "103",
    timestamp: "2023-10-02",
    title: "10 Tips for Writing Clean Code",
    text: "Writing clean code is essential for maintainability and collaboration. Follow these 10 tips to make your code more readable and robust: consistent naming, meaningful comments, modularity, and more.",
  },
  {
    blogId: "3",
    userId: "104",
    timestamp: "2023-10-03",
    title: "The Importance of Cybersecurity",
    text: "In today’s digital world, cybersecurity is more important than ever. Protecting user data, securing applications, and staying ahead of threats should be a priority for every developer.",
  },
  {
    blogId: "4",
    userId: "105",
    timestamp: "2023-10-04",
    title: "How to Get Started with React",
    text: "React is one of the most popular frontend libraries. This blog walks you through the basics, from setting up your environment to building your first React component.",
  },
  {
    blogId: "5",
    userId: "106",
    timestamp: "2023-10-05",
    title: "Mastering the Art of Debugging",
    text: "Debugging can be daunting, but with the right tools and mindset, it becomes manageable. Learn how to identify, analyze, and fix bugs efficiently in your code.",
  },
];

export default blogs;
