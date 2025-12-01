import axios from "axios";
import postData from "./memes.json";

//Mock GET posts
// GET

// no backend route for categories - const categories = ["funny", "gaming", "animals", "darkhumor", "movies", "random"];
//Mock GET posts
axios.interceptors.request.use(async (config) => {
  const { url, method } = config;

  // ------- GET /api/posts -----
  if (method === "get" && url === "/api/posts") {
    config.adapter = async () => {
      // Deduplicate by "id"
      const uniquePosts = Array.from(
        new Map(postData.map(p => [p.id, p])).values()
      );

      return {
        data: { data: uniquePosts },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    };
  }


// ------- POST /api/login -----
  if (method === "post" && url === "/api/login") {
    config.adapter = async () => ({
      data: {
        data: {
          id: 1,
          username: "admin",
          email: "admin@test.com",
          token: "123456789",
        },
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });
  }


  // ------- POST /api/signup -----
  if (method === "post" && url === "/api/signup") {
    config.adapter = async () => ({
      data: {
        data: {
          id: 1,
          username: "admin",
          email: "admin@test.com",
          token: "123456789",
        },
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });
  }

  // ------- PUT /api/updatePost -----
  if (method === "put" && url === "/api/updatePost") {
    const body = config.data ? JSON.parse(config.data) : {};
    config.adapter = async () => ({
      data: {
        data: {
          id: body.id,
          title: body.title,
          postedBy: body.postedBy,
          image: body.image,
        },
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });
  }

  return config;
});