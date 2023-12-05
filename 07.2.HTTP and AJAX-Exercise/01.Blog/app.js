function attachEvents() {
  document.querySelector("#btnLoadPosts").addEventListener("click", loadPosts);

  document.querySelector("#btnViewPost").addEventListener("click", viewPost);
}

const service = {
  async getPosts() {
    return (await fetch("http://localhost:3030/jsonstore/blog/posts")).json();
  },
  async getComments() {
    return (
      await fetch("http://localhost:3030/jsonstore/blog/comments")
    ).json();
  },
};
const postsSelect = document.querySelector("#posts");
let posts;

async function loadPosts() {
  postsSelect.textContent = "";
  posts = await service.getPosts();

  Object.entries(posts).forEach(([postId, post]) => {
    const option = document.createElement("option");
    option.value = postId;
    option.text = post.title;

    postsSelect.appendChild(option);
  });
}

async function viewPost() {
  const postId = postsSelect.value;
  const post = posts[postId];

  document.querySelector("#post-title").textContent = post.title;
  document.querySelector("#post-body").textContent = post.body;

  const commentsUl = document.querySelector("#post-comments");
  commentsUl.textContent = "";
  const allComments = Object.values(await service.getComments());
  const postComments = allComments.filter(
    (comment) => comment.postId === postId
  );

  postComments.forEach((comment) => {
    const commentLi = document.createElement("li");
    commentLi.id = comment.id;
    commentLi.textContent = comment.text;
    commentsUl.appendChild(commentLi);
  });
}

attachEvents();
