// Simulates toggling a like
export function mockToggleLike({ likes, user }) {
  const liked = user && likes.some((l) => l?.userId === user?._id);

  if (liked) {
    // remove like
    return likes.filter((l) => l.userId !== user._id);
  } else {
    // add like
    return [...likes, { userId: user?._id || "temp-user" }];
  }
}

// Simulates creating a new comment
export function mockAddComment({ comments, user, text }) {
  return [
    ...comments,
    {
      id: Math.random(),
      username: user?.username || "You",
      text,
      createdAt: new Date().toISOString(),
    },
  ];
}