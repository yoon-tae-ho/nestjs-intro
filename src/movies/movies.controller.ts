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

@Controller('movies')
export class MoviesController {
  @Get()
  getMovies() {
    return 'Get all the movies';
  }

  @Get('search')
  searchMovies(@Query('year') year: string) {
    return `Movies after ${year}`;
  }

  @Get(':id')
  getMovie(@Param('id') movieId: string) {
    return `Get a movie id: ${movieId}`;
  }

  @Post()
  postMovie(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return `Delete a Movie id: ${id}`;
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body() updateData) {
    return {
      updatedMovieId: id,
      ...updateData,
    };
  }
}
