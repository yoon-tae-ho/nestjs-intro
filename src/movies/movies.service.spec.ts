import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { createMovieDTO } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MovieService', () => {
  let service: MoviesService;
  const testMovieForCreate: createMovieDTO = {
    title: 'Test Movie',
    director: 'Test Director',
    genres: ['Test', 'test'],
    year: 9999,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return array of Movie', () => {
      const movies = service.getMovies();
      expect(movies).toBeInstanceOf(Array<Movie>);
    });
  });

  describe('postMovie', () => {
    it('should create a Movie', () => {
      // create test movie
      const createdId = service.postMovie(testMovieForCreate);
      const movies = service.getMovies();
      const createdMovie = movies.find((movie) => movie.id === createdId);

      expect(createdMovie).toBeDefined();

      // remove test movie
      // service.deleteMovie(createdId);
    });
  });

  describe('deleteMovie', () => {
    it('should delete a Movie', () => {
      // create test movie
      const createdId = service.postMovie(testMovieForCreate);
      // remove test movie
      service.deleteMovie(createdId);
      const movies = service.getMovies();
      const deletedMovie = movies.find((movie) => movie.id === createdId);

      expect(deletedMovie).toBeUndefined();
    });

    it('should throw a NotFoundException', () => {
      const notExistId = service.getMovies().length + 1;
      try {
        service.deleteMovie(notExistId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
      // 아래와 같이 테스트도 가능
      // expect(() => service.deleteMovie(notExistId)).toThrow(NotFoundException);
    });
  });

  describe('getMovie', () => {
    it('should return a Movie', () => {
      // create test movie
      const createdId = service.postMovie(testMovieForCreate);
      const movie = service.getMovie(createdId);

      expect(movie).toBeDefined();

      // remove test movie
      // service.deleteMovie(createdId);
    });

    it('should throw a NotFoundException', () => {
      const notExistId = service.getMovies().length + 1;
      try {
        service.getMovie(notExistId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
      // 아래와 같이 테스트도 가능
      // expect(() => service.getMovie(notExistId)).toThrow(NotFoundException);
    });
  });

  describe('patchMovie', () => {
    it('should update a Movie', () => {
      // create test movie
      const createdId = service.postMovie(testMovieForCreate);
      // update test movie
      const updatedTitle = 'Test Movie for Update';
      service.patchMovie(createdId, { title: updatedTitle });
      const movie = service.getMovie(createdId);
      expect(movie.title).toEqual(updatedTitle);

      // remove test movie
      // service.deleteMovie(createdId);
    });
  });

  it('should throw a NotFoundException', () => {
    const notExistId = service.getMovies().length + 1;
    try {
      const updatedTitle = 'Test Movie for Update';
      service.patchMovie(notExistId, { title: updatedTitle });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
    // 아래와 같이 테스트도 가능
    // expect(() => service.patchMovie(notExistId, { title: updatedTitle })).toThrow(NotFoundException);
  });
});
