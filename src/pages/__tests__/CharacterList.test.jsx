import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CharacterList from '../CharacterList';
import * as api from '../../api/characterApi';

jest.mock('../../api/characterApi');

const characters = [
    {
        id: 1,
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        species: 'Human',
        gender: 'Male',
        status: 'Alive'
    }
];

beforeAll(() => {
    global.TextEncoder = require('util').TextEncoder;
    global.scrollTo = jest.fn();
});

test('renders CharacterList component', async () => {
    api.fetchCharacters.mockResolvedValue({ characters, totalPages: 1 });
    render(
        <MemoryRouter>
            <CharacterList />
        </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Rick Sanchez')).toBeInTheDocument());
});

test('navigates to character detail on card click', async () => {
    api.fetchCharacters.mockResolvedValue({ characters, totalPages: 1 });
    const history = createMemoryHistory();
    const { container } = render(
        <HistoryRouter history={history}>
            <CharacterList />
        </HistoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Rick Sanchez')).toBeInTheDocument());
    fireEvent.click(container.querySelector('.character-card'));
    expect(history.location.pathname).toBe('/character/1');
});
