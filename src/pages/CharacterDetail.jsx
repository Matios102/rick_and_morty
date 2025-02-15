import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CharacterDetail from "../components/CharacterDetail";
import { Container, Button, Message, Icon } from "semantic-ui-react";

function CharacterDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || {};

    if (!state || !state.character) {
        return (
            <Container textAlign="center" style={{ paddingTop: "2rem" }}>
                <Message icon>
                    <Icon name="warning circle" />
                    <Message.Content>
                        <Message.Header>Character not found</Message.Header>
                        We couldn't find the character you were looking for.
                    </Message.Content>
                </Message>
                <div className="button-group" style={{ paddingBottom: "2rem" }}>
                    <Button onClick={() => navigate("/")} content="Back to Characters" icon="left arrow" />
                </div>
            </Container>
        );
    }

    const { character, page, status, scrollPosition } = state;

    return (
        <>
            <Container className="container">
                <CharacterDetail character={character} />
            </Container>
            <div className="button-group" style={{ paddingBottom: "2rem" }}>
                <Button onClick={() => navigate("/", { state: { page, status, scrollPosition } })} content="Back to Characters" icon="left arrow" />
            </div>
        </>
    );
}

export default CharacterDetailPage;