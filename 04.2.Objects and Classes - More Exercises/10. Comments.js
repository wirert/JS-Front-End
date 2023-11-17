function printUserCommentsOnArticles(input) {
  function printArticlesComments(articles) {
    Object.entries(articles)
      .sort(([_, v1], [__, v2]) => v2.length - v1.length)
      .forEach(([article, comments]) => {
        console.log(`Comments on ${article}`);
        comments
          .sort((a, b) => a.user.localeCompare(b.user))
          .forEach((c) =>
            console.log(`--- From user ${c.user}: ${c.title} - ${c.comment}`)
          );
      });
  }
  const commentsActions = {
    addUser: (line) => {
      let [_, userName] = line.split("user ");
      users.push(userName);
    },
    addArticle: (line) => {
      let [_, article] = line.split("article ");
      if (!articles.hasOwnProperty(article)) {
        articles[article] = [];
      }
    },
    addComment: (line) => {
      let [user, info] = line.split(" posts on ");
      let [articleName, commentInfo] = info.split(": ");

      if (users.includes(user) && articles.hasOwnProperty(articleName)) {
        let [title, comment] = commentInfo.split(", ");

        articles[articleName].push({ title, comment, user });
      }
    },
  };
  const users = [];
  const articles = {};

  input.forEach((line) => {
    if (line.includes("user ")) {
      commentsActions.addUser(line);
    } else if (line.includes("article ")) {
      commentsActions.addArticle(line);
    } else if (line.includes("posts on")) {
      commentsActions.addComment(line);
    }
  });

  printArticlesComments(articles);
}

printUserCommentsOnArticles([
  "user aUser123",
  "someUser posts on someArticle: NoTitle, stupidComment",
  "article Books",
  "article Movies",
  "article Shopping",
  "user someUser",
  "user uSeR4",
  "user lastUser",
  "uSeR4 posts on Books: I like books, I do really like them",
  "uSeR4 posts on Movies: I also like movies, I really do",
  "someUser posts on Shopping: title, I go shopping every day",
  "someUser posts on Movies: Like, I also like movies very much",
]);
