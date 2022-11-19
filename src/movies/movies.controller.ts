import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { createMovieDTO } from './dto/create-movie.dto';
import { updateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(): Movie[] {
    return this.moviesService.getMovies();
  }

  @Get('search')
  searchMovies(@Query('year') year: string) {
    return `Movies after ${year}`;
  }

  @Get(':id')
  getMovie(@Param('id') movieId: number): Movie {
    console.log('id: ', typeof movieId);
    return this.moviesService.getMovie(movieId);
  }

  @Post()
  postMovie(@Body() movieData: createMovieDTO): boolean {
    this.moviesService.postMovie(movieData);
    console.log('year: ', typeof movieData.year);
    return true;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number): boolean {
    this.moviesService.deleteMovie(id);
    return true;
  }

  @Patch(':id')
  patchMovie(@Param('id') id: number, @Body() updateData: updateMovieDTO) {
    this.moviesService.patchMovie(id, updateData);
    return true;
  }
}
