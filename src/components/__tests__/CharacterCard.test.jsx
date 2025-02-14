import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '../CharacterCard';

const character = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
    gender: 'Male',
    status: 'Alive'
};

test('renders CharacterCard component', () => {
    render(<CharacterCard character={character} onClick={() => { }} />);
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(`${character.species} - ${character.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${character.status}`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', character.image);
});

test('calls onClick when card is clicked', () => {
    const handleClick = jest.fn();
    render(<CharacterCard character={character} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('img'));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
