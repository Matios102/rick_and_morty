import React from "react";
import { Card, Image } from "semantic-ui-react";

function CharacterCard({ character = {}, onClick }) {
    return (
        <Card key={character.id} onClick={onClick} className="character-card">
            <Image src={character.image} wrapped ui={false} size="medium" />
            <Card.Content>
                <Card.Header>{character.name}</Card.Header>
                <Card.Meta>{character.species} - {character.gender}</Card.Meta>
                <Card.Description>Status: {character.status}</Card.Description>
            </Card.Content>
        </Card>
    );
}

export default CharacterCard;