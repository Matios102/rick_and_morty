import React, { useState, useEffect } from "react";
import { Card, Button, Dropdown, Container } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCharacters } from "../api/characterApi";
import CharacterCardSkeleton from "../components/CharacterCardSkeleton";
import CharacterCard from "../components/CharacterCard";

function CharacterList({ initialPage = 1, initialStatus = "" }) {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(initialPage);
    const [status, setStatus] = useState(initialStatus);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loadCharacters = async () => {
            setLoading(true);
            const { characters, totalPages } = await fetchCharacters(page, status);
            setCharacters(characters);
            setTotalPages(totalPages);
            setLoading(false);
        };

        loadCharacters();

    }, [page, status]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    const handleCardClick = (character) => {
        const scrollPosition = window.scrollY;
        navigate(`/character/${character.id}`, { state: { character, page, status, scrollPosition } });
    }

    const statusOptions = [
        { key: "", text: "All", value: "" },
        { key: "alive", text: "Alive", value: "alive" },
        { key: "dead", text: "Dead", value: "dead" },
        { key: "unknown", text: "Unknown", value: "unknown" },
    ];

    useEffect(() => {
        const scrollPosition = window.history.state?.usr?.scrollPosition || 0;
        window.scrollTo(0, scrollPosition);
    }, [initialPage, initialStatus]);

    return (
        <Container className="container">
            <h1>Rick and Morty Characters</h1>
            <Dropdown
                placeholder="Filter by Status"
                fluid
                selection
                options={statusOptions}
                onChange={(e, { value }) => {
                    setStatus(value);
                    setPage(1);
                }}
                value={status}
                style={{ marginBottom: "20px" }}
            />
            {loading ? (
                <Card.Group itemsPerRow={4}>
                    {[...Array(20)].map((_, index) => (
                        <CharacterCardSkeleton key={index} />
                    ))}
                </Card.Group>
            ) : (
                <Card.Group itemsPerRow={4}>
                    {characters.map((char) => (
                        <CharacterCard key={char.id} character={char} onClick={() => handleCardClick(char)} />
                    ))}
                </Card.Group>
            )}
            <div className="button-group">
                <Button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    icon="left arrow"
                    content="Previous"
                    labelPosition="left"
                />
                <span style={{ margin: "0 15px" }}>Page {page} of {totalPages}</span>
                <Button
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    icon="right arrow"
                    content="Next"
                    labelPosition="right"
                />
            </div>
        </Container>
    );
}

export default CharacterList;

