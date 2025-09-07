import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './schema/blog.schema';
import { AddBlogDTO, UpdateBlogDTO } from './dto/blog.dto';
import { S3Service } from 'src/common/s3.service';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    private readonly s3Service: S3Service,
  ) {}

  async addBlogService(
    addBlogDto: AddBlogDTO,
    userId: string,
    image?: Express.Multer.File,
  ) {
    try {
      const imageUrl = image ? await this.s3Service.uploadFile(image) : null;

      const slug = slugify(addBlogDto.title, { lower: true });
      const isBlogExist = await this.blogModel.findOne({ slug });
      if (isBlogExist) {
        throw new ConflictException('Blog already Exist');
      }
      const newBlog = new this.blogModel({
        ...addBlogDto,
        slug,
        image: imageUrl?.url,
      });

      return await newBlog.save();
    } catch (error) {
      console.error('Add blog error:', error);
      throw new InternalServerErrorException('Failed to add blog');
    }
  }

  async getAllBlogs() {
    return this.blogModel.find().sort({ createdAt: -1 });
  }

  async getBlogBySlug(slug: string) {
    const blog = await this.blogModel.findOne({ slug });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  //   async updateBlog(
  //     id: string,
  //     updateBlogDto: UpdateBlogDTO,
  //     image?: Express.Multer.File,
  //   ) {
  //     try {
  //       const blog = await this.blogModel.findById(id);
  //       if (!blog) throw new NotFoundException('Blog not found');

  //       if (image) {
  //         const imageUrl = await this.s3Service.uploadFile(image);
  //         blog.image = imageUrl;
  //       }

  //       if (updateBlogDto.title) {
  //         blog.slug = slugify(updateBlogDto.title, { lower: true });
  //       }

  //       Object.assign(blog, updateBlogDto);
  //       return await blog.save();
  //     } catch (error) {
  //       console.error('Update blog error:', error);
  //       throw new InternalServerErrorException('Failed to update blog');
  //     }
  //   }

  async deleteBlog(id: string) {
    const blog = await this.blogModel.findByIdAndDelete(id);
    if (!blog) throw new NotFoundException('Blog not found');
    return { message: 'Blog deleted successfully' };
  }
}
