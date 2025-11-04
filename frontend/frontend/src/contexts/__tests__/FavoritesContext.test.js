import { renderHook, act } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../contexts/FavoritesContext';

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider
    });

    expect(result.current.favorites).toEqual([]);
  });

  it('should add and remove favorites', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider
    });

    act(() => {
      result.current.addFavorite(1);
    });

    expect(result.current.favorites).toContain(1);
    expect(result.current.isFavorite(1)).toBe(true);

    act(() => {
      result.current.removeFavorite(1);
    });

    expect(result.current.favorites).not.toContain(1);
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it('should persist favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider
    });

    act(() => {
      result.current.addFavorite(1);
    });

    expect(JSON.parse(localStorage.getItem('favorites'))).toEqual([1]);
  });

  it('should load favorites from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider
    });

    expect(result.current.favorites).toEqual([1, 2, 3]);
  });
});