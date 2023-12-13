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
import Posts from "./APIer/JSONPlaceholder/Posts";
import Post from "./APIer/JSONPlaceholder/Post";
import Photos from "./APIer/JSONPlaceholder/Photos";
import Todos from "./APIer/JSONPlaceholder/Todos";
import Starship from "./APIer/SWAPI/Starships";
import PostsAdmin from "./APIer/JSONPlaceholder/PostsAdmin";
import PostCreate from "./APIer/JSONPlaceholder/PostCreate";
import PostEdit from "./APIer/JSONPlaceholder/PostEdit";
import Everything from "./APIer/NewsAPI/Everything";
import TopHeadlines from "./APIer/NewsAPI/TopHeadlines";
import Hobby from "./APIer/RapidAPI/Hobby";
import DadJokes from "./APIer/RapidAPI/DadJokes";
import Facts from "./APIer/RapidAPI/Facts";
import LoveCalc from "./APIer/RapidAPI/LoveCalc";
import Weather1 from "./APIer/OpenWeather/Weather1";
import Weather2 from "./APIer/OpenWeather/Weather2";
import Weather3 from "./APIer/OpenWeather/Weather3";
import Weather4 from "./APIer/OpenWeather/Weather4";
import Pollution from "./APIer/OpenWeather/Pollution";

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
          {/*/APIer/JSONPlaceholder */}
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
          <Route path="topheadlines" element={<TopHeadlines />} />
          {/* RAPID API */}
          <Route path="hobby" element={<Hobby />} />
          <Route path="dadjoke" element={<DadJokes />} />
          <Route path="facts" element={<Facts />} />
          <Route path="lovecalc" element={<LoveCalc />} />
          {/* OPEN WEATHER */}
          <Route path="weather1" element={<Weather1 />} />
          <Route path="weather2" element={<Weather2 />} />
          <Route path="weather3" element={<Weather3 />} />
          <Route path="weather4" element={<Weather4 />} />
          <Route path="pollution" element={<Pollution />} />
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
