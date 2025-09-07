import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import {
  ChangeUserPasswordDTO,
  LoginUserDTO,
  SignUpUserDTO,
  VerifyUserEmailDTO,
} from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signUpUser(signUpUserDto: SignUpUserDTO) {
    console.log('signuPuser', signUpUserDto);
    const isEmailExist = await this.userModel.findOne({
      emailAddress: signUpUserDto.emailAddress,
    });
    if (isEmailExist) {
      throw new ConflictException('Email address already exist');
    }
    const isMobileNumberExist = await this.userModel.findOne({
      mobileNumber: signUpUserDto.mobileNumber,
    });
    if (isMobileNumberExist) {
      throw new ConflictException('Mobile number already exist');
    }
    const hashedPassword = await bcrypt.hash(signUpUserDto.password, 10);
    const newUser = new this.userModel({
      ...signUpUserDto,
      password: hashedPassword,
    });
    await newUser.save();
    newUser.password = '';
    return newUser;
  }

  async loginUser(loginUserDto: LoginUserDTO) {
    const user = await this.validateUser(
      loginUserDto.emailAddress,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      id: user._id,
      email: user.emailAddress,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      isProfileCompleted: user.isProfileCompleted,
    };
  }

  async validateUser(
    emailAddress: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userModel.findOne({
      emailAddress: emailAddress,
    });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(password, user?.password); // 👈 Compare password
    return isMatch ? user : null;
  }

  async verifyUser(verifyUserEmailDto: VerifyUserEmailDTO) {
    const isEmailExist = await this.userModel.findOne({
      emailAddress: verifyUserEmailDto.emailAddress,
    });
    if (!isEmailExist) {
      throw new NotFoundException('Email not exist');
    }
    const isMobileNumberExist = await this.userModel.findOne({
      mobileNumber: verifyUserEmailDto.mobileNumber,
    });
    if (!isMobileNumberExist) {
      throw new NotFoundException('Mobile number not exist');
    }
    if (isEmailExist.emailAddress !== isMobileNumberExist.emailAddress) {
      throw new NotFoundException(
        'Mismatch between mobile number and email address',
      );
    }
    return 'Verified';
  }

  async changeUserPasswordDTO(changePasswordDto: ChangeUserPasswordDTO) {
    const user = await this.userModel.findOne({
      emailAddress: changePasswordDto.emailAddress,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.password, 10);

    await this.userModel.findOneAndUpdate(
      { emailAddress: changePasswordDto.emailAddress },
      { password: hashedPassword },
      { new: true },
    );
    return 'User password updated successfully';
  }
}
