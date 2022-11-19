import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createMovieDTO {
  @IsString()
  readonly title: string;

  @IsString()
  readonly director: string;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];

  @IsNumber()
  readonly year: number;
}
