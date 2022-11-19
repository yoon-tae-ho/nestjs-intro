import { PartialType } from '@nestjs/mapped-types';
import { createMovieDTO } from './create-movie.dto';

export class updateMovieDTO extends PartialType(createMovieDTO) {}
