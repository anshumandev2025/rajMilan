import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { BlogService } from './blog.service';
import { AddBlogDTO, UpdateBlogDTO } from './dto/blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  @Post()
  async addBlog(
    @Req() req,
    @Body() addBlogDto: AddBlogDTO,
    @UploadedFiles()
    files: { image?: Express.Multer.File[] },
  ) {
    const userId = req.user.id;
    const image = files.image?.[0];
    return this.blogService.addBlogService(addBlogDto, userId, image);
  }

  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get(':slug')
  async getBlogBySlug(@Param('slug') slug: string) {
    return this.blogService.getBlogBySlug(slug);
  }

  //   @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  //   @Patch(':id')
  //   async updateBlog(
  //     @Param('id') id: string,
  //     @Body() updateBlogDto: UpdateBlogDTO,
  //     @UploadedFiles()
  //     files: { image?: Express.Multer.File[] },
  //   ) {
  //     const image = files.image?.[0];
  //     return this.blogService.updateBlog(id, updateBlogDto, image);
  //   }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }
}
