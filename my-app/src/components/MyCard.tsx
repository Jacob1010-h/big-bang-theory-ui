import { Card } from "react-bootstrap";
import "./MyCard.css"; // Import the CSS file
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";
import Item from "./Item";
import { Episode } from "../App";

export default function MyCard({
  title,
  text,
  items,
  handleItemClick,
  isEpisodeInformation,
}: {
  title: string;
  text?: string;
  items?: Episode[];
  handleItemClick?: any;
  isEpisodeInformation?: boolean;
}) {
  const removeHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const renderEpisodeInformation = (episode: Episode) => {
    return (
      <p className="episode-description">
        <h2>{episode.name}</h2>
        <div className="line"></div>
        <div>
          <span>
            Episode Information: Season {episode.season}, Episode{" "}
            {episode.number}, Air Date: {episode.airdate}, Time:{" "}
            {episode.airtime}
          </span>
        </div>
        <div className="line"></div>
        <div>
          <span>Summary: {removeHtmlTags(episode.summary)}</span>
        </div>
        <div className="line"></div>
        <div className="center-image">
          <img src={episode.image.original} alt={episode.name} />
        </div>{" "}
      </p>
    );
  };

  const renderEpisodeList = (episode: Episode) => {
    return (
      <div>
        <Item
          key={episode.id}
          item={episode.name}
          handleItemClick={handleItemClick}
          data={undefined}
          index={0}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="card-text">
            <Card.Text
              className={isEpisodeInformation ? "episode-info" : "button-group"}
            >
              <div>
                {items?.map((item) =>
                  isEpisodeInformation
                    ? renderEpisodeInformation(item)
                    : renderEpisodeList(item)
                )}
              </div>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
