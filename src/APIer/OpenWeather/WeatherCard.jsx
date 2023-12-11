export default function WeatherCard() {
  return (
    <article className=" rounded overflow-hidden shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500 self-center">
      <h2 className="text-center text-xl">
        Vejret for <span className="font-bold">{data.name}</span>
      </h2>
      <figure className="flex justify-center">
        <img
          className="w-14"
          src={
            " https://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            ".png"
          }
        />
      </figure>
      <ul>
        <li>Temperatur: {Math.round(data.main.temp)}&deg;C</li>
        <li>Vindhastighed: {data.wind.speed} m/sek</li>
        <li className="flex">
          Vindretning: {data.wind.deg}
          <FaArrowUp
            style={{ transform: "rotate(" + data.wind.deg + "deg)" }}
            className="mt-1 mx-2"
          />{" "}
        </li>
        <li>
          Solen står op kl.
          {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </li>
        <li>
          Solnedgang går ned kl.
          {new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </li>
      </ul>
    </article>
  );
}
