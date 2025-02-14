import React from "react";
import { Card, Placeholder } from "semantic-ui-react";

function CharacterCardSkeleton() {
    return (
        <Card className="character-card">
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length="medium" />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Card.Content>
        </Card>
    );
}

export default CharacterCardSkeleton;