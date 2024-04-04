import type { User, Post, Comment, Todo, Album, Photo } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

type Data = {
  users: (User & { address: unknown; company: unknown })[];
  posts: Post[];
  comments: Comment[];
  todos: Todo[];
  albums: Album[];
  photos: Photo[];
};

const prisma = new PrismaClient();

async function main() {
  console.log("fetch");
  const data: Data = await fetch(
    "https://raw.githubusercontent.com/typicode/jsonplaceholder/master/data.json",
  ).then((res) => res.json());

  console.log("delete");
  await prisma.user.deleteMany();

  console.log("users");
  await prisma.user.createMany({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: data.users.map(({ address, company, ...user }) => user),
  });

  console.log("posts");
  await prisma.post.createMany({ data: data.posts });

  console.log("comments");
  await prisma.comment.createMany({ data: data.comments });

  console.log("todos");
  await prisma.todo.createMany({ data: data.todos });

  console.log("albums");
  await prisma.album.createMany({ data: data.albums });

  console.log("photos");
  await prisma.photo.createMany({ data: data.photos });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
