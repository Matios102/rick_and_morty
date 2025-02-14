import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CharacterDetail from "../components/CharacterDetail";
import { Container, Button } from "semantic-ui-react";

function CharacterDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || {};

    if (!state || !state.character) {
        return (
            <p>Character not found</p>
        );
    }

    const { character, page, status, scrollPosition } = state;

    return (
        <>
            <Container className="container">
                <CharacterDetail character={character} />
            </Container>
            <div className="button-group" style={{ paddingBottom: "2rem" }}>
                <Button onClick={() => navigate("/", { state: { page, status, scrollPosition } })} content="Back to Characters" icon="left arrow"/>
            </div>
        </>
    );
}

export default CharacterDetailPage;