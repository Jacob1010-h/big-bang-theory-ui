// ErrorDisplay.tsx
export default function ErrorDisplay({ error }: { error: Error }) {
    return <div>An error has occurred: {error.message}</div>;
}