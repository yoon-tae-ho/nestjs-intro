import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getMovies(): Movie[] {
    return [...this.movies];
  }

  getMovie(movieId: string): Movie {
    const movie = this.movies.find((movie) => movie.id === parseInt(movieId));
    if (!movie)
      throw new NotFoundException(`Movie with ID ${movieId} not found.`);
    return movie;
  }

  postMovie(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  deleteMovie(movieId: string) {
    this.getMovie(movieId);
    this.movies = this.movies.filter((movie) => movie.id !== parseInt(movieId));
  }

  patchMovie(movieId: string, updateData) {
    const movie = this.getMovie(movieId);
    this.deleteMovie(movieId);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
