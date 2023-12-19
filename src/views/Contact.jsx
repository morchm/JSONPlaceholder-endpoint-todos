import React from "react";
import useRequestData from "../hooks/useRequestData";
import { useEffect } from "react";
import { JSX } from "react";

const Contact = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();
  const {
    makeRequest: requestRadnom,
    isLoading: isLoadingRandom,
    data: dataRandom,
    error: errorRandom,
  } = useRequestData();

  const getRandomID = () => {
    requestRadnom(
      "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&formatversion=2&rnnamespace=0&origin=*",
      "GET"
    );
  };

  const getRandomArticle = () => {
    makeRequest(
      `https://en.wikipedia.org/w/api.php?action=parse&format=json&pageid=${dataRandom.query.random[0].id}&formatversion=2&origin=*`,
      // `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&pageids=${dataRandom.query.random[0].id}&formatversion=2&rvprop=content&rvslots=*&origin=*`,
      "GET"
    );
  };

  useEffect(() => {
    getRandomID();
  }, []);

  useEffect(() => {
    if (dataRandom) getRandomArticle();
  }, [dataRandom]);

  return (
    <>
      {data && (
        <div dangerouslySetInnerHTML={{ __html: data.parse.text }}></div>
      )}
      {/* {data && `${data.query.pages[0].revisions[0].slots.main.content}`} */}
    </>
  );
  // return (
  //   <div>
  //     <h1>Kontakt</h1>
  //   </div>
  // )
};

export default Contact;
