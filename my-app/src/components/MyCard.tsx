import { Card } from "react-bootstrap";
import { useQuery } from '@tanstack/react-query';
import './MyCard.css'; // Import the CSS file
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import Item from './Item';

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

    const { data, isLoading, error } = useQuery({
        queryKey: ['itemData', items],
        queryFn: () => Promise.all(items?.filter(isValidURL).map(fetchItem) || []),
        enabled: !!items,
    });

    if (isLoading) return <LoadingSpinner />;

    if (error) return <ErrorDisplay error={error as Error} />;

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
                                    <Item item={item} data={data && typeof data[index] === 'object' ? data[index] : null} index={index} handleItemClick={handleItemClick} />
                                ))}
                            </div>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}