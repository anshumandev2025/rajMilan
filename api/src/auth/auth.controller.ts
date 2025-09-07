import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangeUserPasswordDTO,
  LoginUserDTO,
  SignUpUserDTO,
  VerifyUserEmailDTO,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('userSignUp')
  async signUpUser(@Body() signUpUserDto: SignUpUserDTO) {
    return this.authService.signUpUser(signUpUserDto);
  }

  @Post('userLogin')
  async loginUser(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.loginUser(loginUserDTO);
  }

  @Post('verifyUser')
  async verifyUser(@Body() verifyUserEmailDto: VerifyUserEmailDTO) {
    return this.authService.verifyUser(verifyUserEmailDto);
  }

  @Post('changeUserPassword')
  async changePassword(@Body() changePasswordDto: ChangeUserPasswordDTO) {
    return this.authService.changeUserPasswordDTO(changePasswordDto);
  }
}
