// LoadingSpinner.tsx
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
    return (
        <div className="d-flex justify-content-center" style={{ minWidth: '18rem' }}>
            <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
}