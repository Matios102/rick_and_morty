import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetailPage from '../CharacterDetail';

const character = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
    type: '',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    created: '2017-11-04T18:48:46.250Z'
};

beforeAll(() => {
    global.TextEncoder = require('util').TextEncoder;
    global.scrollTo = jest.fn();
});

test('renders CharacterDetailPage component', () => {
    render(
        <MemoryRouter initialEntries={[{ pathname: '/character/1', state: { character } }]}>
            <Routes>
                <Route path="/character/:id" element={<CharacterDetailPage />} />
            </Routes>
        </MemoryRouter>
    );
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(`${character.species} - ${character.gender}`)).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.startsWith('Status:'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.startsWith('Type:'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.startsWith('Origin:'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.startsWith('Location:'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.startsWith('Episodes:'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.startsWith('Created:'))).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', character.image);
});
