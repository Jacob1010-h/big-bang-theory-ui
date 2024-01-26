// Item.tsx
import { Button, ButtonGroup } from "react-bootstrap";

export default function Item({ item, data, index, handleItemClick }: { item: string, data: any, index: number, handleItemClick: any }) {
    return (
        <div className={data && typeof data === 'object' ? "d-flex justify-content-between" : ""}
            style={data && typeof data === 'object' && data?.image ? { borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1rem' } : {}}>
            <div>
                {data && typeof data === 'object' ? (
                    // ...
                    <div className="stats-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Name:</strong> {data?.name}</p>
                        <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Status:</strong> {data?.status}</p>
                        <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Species:</strong> {data?.species}</p>
                        <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Gender:</strong> {data?.gender}</p>
                        <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Origin:</strong> {data?.origin.name}</p>
                        <p style={{ fontSize: '0.8rem', lineHeight: '1.2', margin: '0.2rem 0' }}><strong>Location:</strong> {data?.location.name}</p>
                    </div>
                    // ...
                ) : null}
            </div>
            <ButtonGroup vertical>
                <Button onClick={handleItemClick} className="mb-1" key={index} variant="secondary" style={{ width: 'auto', minWidth: '300px', paddingLeft: '1rem', paddingRight: '1rem' }}>
                    {data && typeof data === 'object' ? (
                        <div className="button-content">
                            <img src={data?.image} alt={data?.name} style={{ border: '2px solid #000' }} />
                            {data?.name}
                        </div>
                    ) : item}
                </Button>
            </ButtonGroup>
        </div>
    );
}