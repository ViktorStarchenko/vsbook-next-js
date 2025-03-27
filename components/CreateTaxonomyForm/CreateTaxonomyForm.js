import { useState, useRef } from 'react';
import Input from "../Input/Input";
import {createTaxonomyTerm} from "../../lib/posts-action";

export default function CreateTaxonomyForm({taxonomy}) {
    const [taxonomyName, setTaxonomyName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateTaxonomy = async () => {
        if (!taxonomyName.trim()) {
            setError("Please enter a name for the taxonomy.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await createTaxonomyTerm({ taxonomy: taxonomy, name: taxonomyName });
            console.log("Created Taxonomy:", response);
            setTaxonomyName(""); // Очистка поля після створення
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="create-taxonomy d-flex d-align-center d-justify-start">
                <Input
                    name="createGenre"
                    type="text"
                    placeholder={`Create new ${taxonomy}`}
                    onChange={(e) => setTaxonomyName(e.target.value)}
                />
                <button className="btn" type="button" onClick={handleCreateTaxonomy} disabled={loading}>
                    {loading ? "Creating..." : "Create Taxonomy"}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </>

    )
}