import React from "react";
import "./App.css";
import { useQuery } from '@tanstack/react-query';

import { Col, Container, Row, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyCard from "./components/MyCard";

type Episode = {
  name: string;
  characters: string[];
};

function App() {
  const [selectedEpisodeName, setSelectedEpisode] = React.useState<string>("");

  const handleEpisodeClick = (e: any) => {
    // console.log(e.target.textContent);
    setSelectedEpisode(e.target.textContent);
  }

  const findEpisode = (episodeName: string = ""): Episode | undefined => {
    // console.log(episodeName);
    const episode = episodeList.find((episode: { name: string; }) => episode.name === episodeName);
    // console.log(episode);
    return episode;
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['episodes'],
    queryFn: () => fetch("https://rickandmortyapi.com/api/episode").then(res => res.json())
  });

  const episodeList = data?.results;

  if (isLoading) return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );

  if (error) return <div>An error has occurred: {(error as Error).message}</div>;

  return (
    <div className="App">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <MyCard 
              title="Episode List"
              items={episodeList?.map((episode: { name: any; }) => episode.name)}
              handleItemClick={handleEpisodeClick}
            />
          </Col>
          <Col md={8}>
            <MyCard
              title="Episode Information" 
              items={selectedEpisodeName === "" ? [] : findEpisode(selectedEpisodeName)?.characters || []}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;