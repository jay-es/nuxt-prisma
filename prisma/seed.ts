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
    "https://raw.githubusercontent.com/typicode/jsonplaceholder/master/data.json"
  ).then((res) => res.json());

  console.log("delete");
  await prisma.user.deleteMany();

  console.log("users");
  // SQLite に createMany はない。トランザクションにしないと遅い
  await prisma.$transaction(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data.users.map(({ address, company, ...data }) =>
      prisma.user.create({ data })
    )
  );

  console.log("posts");
  await prisma.$transaction(
    data.posts.map((post) => prisma.post.create({ data: post }))
  );

  console.log("comments");
  await prisma.$transaction(
    data.comments.map((comment) => prisma.comment.create({ data: comment }))
  );

  console.log("todos");
  await prisma.$transaction(
    data.todos.map((todo) => prisma.todo.create({ data: todo }))
  );

  console.log("albums");
  await prisma.$transaction(
    data.albums.map((album) => prisma.album.create({ data: album }))
  );

  console.log("photos");
  await prisma.$transaction(
    data.photos.map((photo) => prisma.photo.create({ data: photo }))
  );
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
