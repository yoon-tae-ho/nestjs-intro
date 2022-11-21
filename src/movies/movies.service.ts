import { Injectable, NotFoundException } from '@nestjs/common';
import { createMovieDTO } from './dto/create-movie.dto';
import { updateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getMovies(): Movie[] {
    return [...this.movies];
  }

  getMovie(movieId: number): Movie {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie)
      throw new NotFoundException(`Movie with ID ${movieId} not found.`);
    return movie;
  }

  postMovie(movieData: createMovieDTO) {
    const id = this.movies.length + 1;
    this.movies.push({
      id,
      ...movieData,
    });
    return id;
  }

  deleteMovie(movieId: number) {
    this.getMovie(movieId);
    this.movies = this.movies.filter((movie) => movie.id !== movieId);
  }

  patchMovie(movieId: number, updateData: updateMovieDTO) {
    const movie = this.getMovie(movieId);
    this.deleteMovie(movieId);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
