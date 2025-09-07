import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddBlogDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value); // handles JSON strings
      } catch {
        return value.split(',').map((v) => v.trim()); // fallback for comma-separated
      }
    }
    return value;
  })
  @IsNotEmpty()
  @IsArray()
  category: string[];

  @IsNotEmpty()
  @IsNumber()
  minute_to_read: number;
}

export class UpdateBlogDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsArray()
  category: string[];

  @IsOptional()
  @IsString()
  minute_to_read: number;
}
