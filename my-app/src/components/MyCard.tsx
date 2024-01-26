import { Button, ButtonGroup, Card, Spinner } from "react-bootstrap";
import { useQuery } from 'react-query';
import './MyCard.css'; // Import the CSS file

export default function MyCard({ title, text, items, handleItemClick }: { title: string, text?: string, items?: string[], handleItemClick?: any }) {
    const isValidURL = (string: string) => {
        try {
            new URL(string);
        } catch (_) {
            return false;
        }
        return true;
    }

    const fetchItem = (url: string) => fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });

    const { data, isLoading, error } = useQuery(['itemData', items], () => Promise.all(items?.filter(isValidURL).map(fetchItem) || []), {
        enabled: !!items,
    });

    if (isLoading) return (
        <div className="d-flex justify-content-center" style={{ minWidth: '18rem' }}>
            <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );

    if (error) return <div>An error has occurred: {(error as Error).message}</div>;

    return (
        <div className="card">
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <div className="card-text">
                        <Card.Text className="button-group">
                            {text}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                {items?.map((item, index) => (
                                    <div className={data && typeof data[index] === 'object' ? "d-flex justify-content-between" : ""}
                                        style={data && typeof data[index] === 'object' && data[index]?.image ? { borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1rem' } : {}}>
                                        <div>
                                            {data && typeof data[index] === 'object' ? (
                                                // ...
                                                <div className="stats-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                    <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Name:</strong> {data[index]?.name}</p>
                                                    <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Status:</strong> {data[index]?.status}</p>
                                                    <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Species:</strong> {data[index]?.species}</p>
                                                    <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Gender:</strong> {data[index]?.gender}</p>
                                                    <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Origin:</strong> {data[index]?.origin.name}</p>
                                                    <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Location:</strong> {data[index]?.location.name}</p>
                                                </div>
                                                // ...
                                            ) : null}
                                        </div>
                                        <ButtonGroup vertical>
                                            <Button onClick={handleItemClick} className="mb-1" key={index} variant="secondary" style={{ width: 'auto', minWidth: '300px', paddingLeft: '1rem', paddingRight: '1rem' }}>
                                                {data && typeof data[index] === 'object' ? (
                                                    <div className="button-content">
                                                        <img src={data[index]?.image} alt={data[index]?.name} style={{ border: '2px solid #000' }} />
                                                        {data[index]?.name}
                                                    </div>
                                                ) : item}
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                ))}
                            </div>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}