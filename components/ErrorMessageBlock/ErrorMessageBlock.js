export default function ErrorMessageBlock({ message }) {
    if (!message) return null;

    return (
        <p className="error-message">{message}</p>
    );
}
