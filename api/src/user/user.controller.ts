import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddUpdateUserDetailsDTO, ChangePasswordDTO } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profileImageUpdate', maxCount: 1 },
      { name: 'galleryImagesUpdate', maxCount: 5 },
      { name: 'bioDataPdf', maxCount: 1 },
    ]),
  )
  @Put()
  async updateUserDetails(
    @Req() req,
    @Body() updateUserDetailsDto: AddUpdateUserDetailsDTO,
    @UploadedFiles()
    files: {
      profileImageUpdate?: Express.Multer.File[];
      galleryImagesUpdate?: Express.Multer.File[];
    },
  ) {
    const userId = req.user.id;
    return this.userService.updateUserDetails(
      updateUserDetailsDto,
      userId,
      files.profileImageUpdate,
      files.galleryImagesUpdate,
    );
  }
  @Get('matches')
  async getAllMatches(@Req() req) {
    const userId = req.user.id;
    return this.userService.getAllMatches(userId);
  }
  @Get()
  async getUserDetails(@Req() req) {
    const userId = req.user.id;
    return this.userService.getUserDetails(userId);
  }
  @Get(':userId')
  async getUserDetailsById(@Param('userId') userId: string) {
    return this.userService.getUserDetails(userId);
  }

  @Put('changePassword')
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDTO,
  ) {
    const userId = req.user.id;
    return this.userService.changePassword(changePasswordDto, userId);
  }
  @Put('addDetails')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profileImage', maxCount: 1 },
      { name: 'galleryImages', maxCount: 5 },
      { name: 'bioDataPdf', maxCount: 1 },
    ]),
  )
  async addUserDetails(
    @Req() req,
    @Body() addUserDetailsDto: AddUpdateUserDetailsDTO,
    @UploadedFiles()
    files: {
      profileImage?: Express.Multer.File[];
      galleryImages?: Express.Multer.File[];
      bioDataPdf?: Express.Multer.File[];
    },
  ) {
    const userId = req.user.id;
    return this.userService.addUserDetails(
      addUserDetailsDto,
      userId,
      files.profileImage,
      files.galleryImages,
      files.bioDataPdf,
    );
  }

  @Delete('profilePic')
  async deleteUserProfilePic(@Req() req) {
    const userId = req.user.id;
    return this.userService.deleteUserProfilePic(userId);
  }

  @Delete('galleryImage')
  async deleteGalleryImage(@Req() req, @Query('url') url: string) {
    const userId = req.user.id;
    return this.userService.deleteGalleryImage(userId, url);
  }
}
