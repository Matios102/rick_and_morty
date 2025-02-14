import React from 'react';
import { Image, Container, Card, List, Popup } from 'semantic-ui-react';

function CharacterDetail({ character = {} }) {

    const getEpisodeNumbers = (episodes) => {
        return episodes.map(ep => ep.split('/').pop());
    };

    const episodeNumbers = getEpisodeNumbers(character.episode);
    const displayedEpisodes = episodeNumbers.slice(0, 5);
    const remainingEpisodes = episodeNumbers.length - displayedEpisodes.length;

    return (
        <Container className="character-details-container">
            <Card centered className="character-detail-card">
                <Image src={character.image} wrapped ui={false} className="character-image" />
                <Card.Content className="character-detail-content">
                    <Card.Header className="character-name">{character.name}</Card.Header>
                    <Card.Meta className="character-meta">{character.species} - {character.gender}</Card.Meta>
                    <Card.Description className="character-detail-description">
                        <List>
                            <List.Item>
                                <strong>Status:</strong> {character.status}
                            </List.Item>
                            <List.Item>
                                <strong>Type:</strong> {character.type}
                            </List.Item>
                            <List.Item>
                                <strong>Origin:</strong> {character.origin.name}
                            </List.Item>
                            <List.Item>
                                <strong>Location:</strong> {character.location.name}
                            </List.Item>
                            <List.Item>
                                <strong>Episodes:</strong> {displayedEpisodes.join(', ')}
                                {remainingEpisodes > 0 && (
                                    <Popup
                                        trigger={<span> and {remainingEpisodes} more...</span>}
                                        content={episodeNumbers.join(', ')}
                                        position="top center"
                                    />
                                )}
                            </List.Item>
                            <List.Item>
                                <strong>Created:</strong> {character.created}
                            </List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
            </Card>
        </Container>
    );
}

export default CharacterDetail;


