import React from "react";
import "./App.css";
import { useQuery } from '@tanstack/react-query';

import { Col, Container, Row, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MyCard from "./components/MyCard";

export type Episode = {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    airdate: string; // Add to spell checker's dictionary
    airtime: string;
    airstamp: string; // Add to spell checker's dictionary
    runtime: number;
    image: {
        medium: string;
        original: string;
    };
    summary: string;
    _links: {
        self: {
            href: string;
        };
    };
};

function App() {
const [selectedEpisode, setSelectedEpisode] = React.useState<Episode | null>(null);

const handleEpisodeClick = (e: any) => {
    const episodeName = e.target.textContent;
    const episode = findEpisode(episodeName);
    setSelectedEpisode(episode || null); // Provide a default value of null
    console.log("selectedEpisode", selectedEpisode);
};

const findEpisode = (episodeName: string = ""): Episode | undefined => {
    const episode = episodeList.find(
        (episode: { name: string }) => episode.name === episodeName
    );
    return episode;
};

    const { isLoading, error, data } = useQuery({
        queryKey: ["episodes"],
        queryFn: () =>
            fetch(
                "https://us-central1-big-bang-theory-25fd5.cloudfunctions.net/bbt389829/bbt/episodes"
            ).then((res) => res.json()),
    });

    const episodeList = data?.data._embedded?.episodes || ([] as Episode[]);

    if (isLoading)
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                </Spinner>
            </div>
        );

    if (error)
        return <div>An error has occurred: {(error as Error).message}</div>;

    return (
        <div className="App">
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <MyCard
                            title="Episode List"
                            items={[...episodeList]}
                            handleItemClick={handleEpisodeClick}
                            isEpisodeInformation={false}
                        />
                    </Col>
                    <Col md={8}>
                        <MyCard
                            title="Episode Information"
                            items={selectedEpisode ? [selectedEpisode] : []} // Pass the selected episode to MyCard
                            isEpisodeInformation={true}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;