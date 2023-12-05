import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "../dist/output.css";
import Home from "./views/Home";
import About from "./views/About";
import Contact from "./views/Contact";
import Login from "./views/Login";
import NoMatch from "./views/NoMatch";
import Layout from "./layout/Layout";
import LayoutAdmin from "./Layout/ADMIN/LayoutAdmin";
import HomeAdmin from "./views/ADMIN/HomeAdmin";
import News from "./views/News";
import Posts from "./jsonplaceholder/Posts";
import Post from "./jsonplaceholder/Post";
import Photos from "./jsonplaceholder/Photos";
import Todos from "./jsonplaceholder/Todos";
import Starship from "./jsonplaceholder/Starships";
import PostsAdmin from "./jsonplaceholder/PostsAdmin";
import PostCreate from "./jsonplaceholder/PostCreate";
import PostEdit from "./jsonplaceholder/PostEdit";
import Everything from "./jsonplaceholder/Everything";

function App() {
  // ROUTER PROVIDER
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* ---------------- PUBLIC ---------------- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* JSONPlaceholder */}
          <Route path="posts" element={<Posts />} />
          <Route path="post/:postID" element={<Post />} />
          <Route path="postsadmin" element={<PostsAdmin />} />
          <Route path="postcreate" element={<PostCreate />} />
          <Route path="postedit/:postID" element={<PostEdit />} />
          <Route path="photos" element={<Photos />} />
          <Route path="todos" element={<Todos />} />
          {/* SWAPI */}
          <Route path="starships" element={<Starship/>} />
          <Route path="news" element={<News />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
          {/* NEWS API */}
          <Route path="everything" element={<Everything />} />
        </Route>

        {/* ---------------- ADMIN ---------------- */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </>
    )
  );

  return (
    <section>
      <RouterProvider router={router} />
      {/* <h1>Forsiden</h1> */}
    </section>
  );
}

export default App;
