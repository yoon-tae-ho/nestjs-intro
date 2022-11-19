import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
  getMovie(@Param('id') movieId: string): Movie {
    return this.moviesService.getMovie(movieId);
  }

  @Post()
  postMovie(@Body() movieData): boolean {
    this.moviesService.postMovie(movieData);
    return true;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string): boolean {
    this.moviesService.deleteMovie(id);
    return true;
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body() updateData) {
    this.moviesService.patchMovie(id, updateData);
    return true;
  }
}
