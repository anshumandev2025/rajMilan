import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { AddUpdateUserDetailsDTO, ChangePasswordDTO } from './dto/user.dto';
import { S3Service } from 'src/common/s3.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly s3Service: S3Service,
  ) {}
  async addUserDetails(
    addUserDetailsDto: AddUpdateUserDetailsDTO,
    userId: string,
    profileImage?: Express.Multer.File[] | null,
    galleryImages?: Express.Multer.File[] | null,
    bioDataPdf?: Express.Multer.File[] | null,
  ) {
    try {
      let profileImageUrl: string | null = null;
      let galleryImagesUrl: string[] = [];
      let bioDataPdfUrl: string | null = null;
      if (bioDataPdf && bioDataPdf.length > 0) {
        const data = await this.s3Service.uploadFile(
          bioDataPdf[0],
          `${addUserDetailsDto.fullName}_bioData`,
        );
        bioDataPdfUrl = data.url;
      }
      // Upload profile image if provided
      if (profileImage && profileImage.length > 0) {
        const data = await this.s3Service.uploadFile(
          profileImage[0],
          `${addUserDetailsDto.fullName}_profile`,
        );
        profileImageUrl = data.url;
      }

      // Upload gallery images if provided
      if (galleryImages && galleryImages.length > 0) {
        galleryImagesUrl = await Promise.all(
          galleryImages.map(async (file, index) => {
            const data = await this.s3Service.uploadFile(
              file,
              `${addUserDetailsDto.fullName}_gallery_${index}`,
            );
            return data.url;
          }),
        );
      }

      // Save user details with image URLs to DB (optional)
      const newUser = await this.userModel.findByIdAndUpdate(
        userId,
        {
          ...addUserDetailsDto,
          profileImage: profileImageUrl,
          galleryImages: galleryImagesUrl,
          bioDataPdf: bioDataPdfUrl,
          isProfileCompleted: true,
        },
        { new: true },
      );

      return newUser;
    } catch (error) {
      console.log('error-->', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getUserDetails(userId: string): Promise<User | null> {
    try {
      return this.userModel.findById(userId).select('-password').exec();
    } catch (error) {
      console.log('error-->', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDTO, userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      const isMatch = await bcrypt.compare(
        changePasswordDto.oldPassword,
        user?.password,
      );
      if (!isMatch) {
        throw new UnauthorizedException('Old password is incorrect');
      }
      const hashedPassword = await bcrypt.hash(
        changePasswordDto.newPassword,
        10,
      );

      await this.userModel.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true },
      );
      return {
        message: 'Password update',
      };
    } catch (error) {
      console.log('error-->', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateUserDetails(
    updateUserDetailsDto: AddUpdateUserDetailsDTO,
    userId: string,
    profileImage?: Express.Multer.File[] | null,
    galleryImages?: Express.Multer.File[] | null,
  ) {
    try {
      let updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        {
          ...updateUserDetailsDto,
        },
        {
          new: true,
        },
      );
      await this.updateUserImages(
        userId,
        profileImage ?? [],
        galleryImages ?? [], // fallback to empty array
        updateUserDetailsDto.fullName,
      );
      return updatedUser;
    } catch (error) {
      console.log('error-->', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  async updateUserImages(
    userId: string,
    profileImage?: Express.Multer.File[],
    galleryImages?: Express.Multer.File[],
    fullName?: string,
  ): Promise<{
    msg: string;
    profileImageUrl?: string;
    galleryImagesUrl?: string[];
  }> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const updateData: any = {};
      let profileImageUrl: string | undefined;
      let galleryImagesUrl: string[] = [];

      // ✅ Update Profile Image if provided
      if (profileImage && profileImage.length > 0) {
        const profileImageKey = await this.s3Service.getS3KeyFromUrl(
          user.profileImage,
        );

        const updated = await this.s3Service.updateFile(
          profileImageKey.replace('%20', ' '),
          profileImage[0],
        );

        profileImageUrl = updated.url;
        updateData.profileImage = profileImageUrl;
      }
      // ✅ Upload & Append Gallery Images
      if (galleryImages && galleryImages.length > 0) {
        const galleryImageIndex = user.galleryImages.length + 1;
        galleryImagesUrl = await Promise.all(
          galleryImages.map(async (file, index) => {
            const uploaded = await this.s3Service.uploadFile(
              file,
              `${fullName || 'user'}_gallery_${Date.now()}_${index}`,
            );
            return uploaded.url;
          }),
        );

        // Append to existing gallery images
        const existingGallery = Array.isArray(user.galleryImages)
          ? user.galleryImages
          : [];

        updateData.galleryImages = [...existingGallery, ...galleryImagesUrl];
      }

      // ✅ Update user
      if (Object.keys(updateData).length > 0) {
        await this.userModel.findByIdAndUpdate(userId, updateData);
      }

      return {
        msg: 'User images updated successfully',
        ...(profileImageUrl && { profileImageUrl }),
        ...(galleryImagesUrl.length > 0 && { galleryImagesUrl }),
      };
    } catch (error) {
      console.error('Error updating user images:', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async deleteUserProfilePic(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const key = await this.s3Service.getS3KeyFromUrl(user.profileImage);
    await this.s3Service.deleteFile(key);
    await this.userModel.findByIdAndUpdate(userId, {
      profileImage: null,
    });
    return { msg: 'profile image deleted successfully' };
  }

  async deleteGalleryImage(userId: string, imageUrl: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Decode the URL (in case it's encoded)
    const decodedUrl = decodeURIComponent(imageUrl);
    // ✅ Check if the image exists in the gallery
    const existingIndex = user.galleryImages.findIndex(
      (img) => decodeURIComponent(img) === decodedUrl,
    );

    if (existingIndex === -1) {
      return { msg: 'Image URL not found in user gallery' };
    }

    // ✅ Get and delete the image from S3
    const key = await this.s3Service.getS3KeyFromUrl(decodedUrl);
    const decodeKey = key.replace('%20', ' ');
    await this.s3Service.deleteFile(decodeKey);

    // ✅ Remove the image from gallery
    const updatedGallery = [...user.galleryImages];
    updatedGallery.splice(existingIndex, 1);

    // ✅ Update the user document
    await this.userModel.findByIdAndUpdate(userId, {
      galleryImages: updatedGallery,
    });

    return { msg: 'Gallery image deleted successfully' };
  }

  async getAllMatches(userId: string) {
    const users = await this.userModel
      .find({ _id: { $ne: userId } })
      .select('_id fullName age location subCast profession profileImage')
      .exec();

    return users;
  }
}
