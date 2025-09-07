import {
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class AddUpdateUserDetailsDTO {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  height: string;

  @IsNotEmpty()
  @IsString()
  fullAddress: string;

  @IsNotEmpty()
  @IsString()
  bodyType: string;

  @IsNotEmpty()
  @IsString()
  educationLevel: string;

  @IsNotEmpty()
  @IsString()
  degreeOrSpecialialization: string;
  @IsNotEmpty()
  @IsString()
  companyOrOrganization: string;

  @IsNotEmpty()
  @IsString()
  jobTitleOrDesignation: string;

  @IsNotEmpty()
  @IsString()
  jobProfile: string;

  @IsNotEmpty()
  @IsString()
  anualIncome: string;

  @IsNotEmpty()
  @IsString()
  dietPreference: string;

  @IsNotEmpty()
  @IsString()
  smokingHabit: string;

  @IsNotEmpty()
  @IsString()
  drinkingHabit: string;

  @IsOptional()
  @IsString()
  aboutHobbyOrInterset: string;

  @IsNotEmpty()
  @IsString()
  fatherName: string;

  @IsNotEmpty()
  @IsString()
  fatherOccupation: string;

  @IsNotEmpty()
  @IsString()
  fatherGotra: string;

  @IsNotEmpty()
  @IsString()
  motherName: string;

  @IsNotEmpty()
  @IsString()
  motherOccupation: string;

  @IsNotEmpty()
  @IsString()
  motherGotra: string;

  @IsNotEmpty()
  @IsString()
  paternalGrandfatherName: string;

  @IsNotEmpty()
  @IsString()
  paternalGrandfatherOccupation: string;

  @IsNotEmpty()
  @IsString()
  paternalGrandfatherGotra: string;

  @IsNotEmpty()
  @IsString()
  paternalGrandmotherName: string;

  @IsNotEmpty()
  @IsString()
  paternalGrandmotherGotra: string;

  @IsNotEmpty()
  @IsString()
  maternalGrandfatherName: string;

  @IsNotEmpty()
  @IsString()
  maternalGrandfatherOccupation: string;

  @IsNotEmpty()
  @IsString()
  maternalGrandfatherGotra: string;

  @IsNotEmpty()
  @IsString()
  maternalGrandmotherName: string;

  @IsNotEmpty()
  @IsString()
  maternalGrandmotherGotra: string;

  @IsNotEmpty()
  @IsString()
  paternalVillage: string;

  @IsNotEmpty()
  @IsString()
  maternalVillage: string;

  @IsNotEmpty()
  @IsString()
  gotra: string;

  @IsNotEmpty()
  @IsString()
  siblingsCount: string;

  @IsNotEmpty()
  @IsString()
  familyType: string;

  @IsNotEmpty()
  @IsString()
  familyValues: string;

  @IsString()
  @IsOptional()
  aboutFamilyBackground: string;

  @IsNotEmpty()
  @IsString()
  partnerPreferedBodyType: string;

  @IsNotEmpty()
  @IsString()
  partnerPreferedSubCast: string;

  @IsNotEmpty()
  @IsString()
  partnerPreferedCity: string;

  @IsNotEmpty()
  @IsString()
  partnerPreferedEducationLevel: string;

  @IsNotEmpty()
  @IsString()
  partnerPreferedProfession: string;

  @IsOptional()
  @IsString()
  partnerAdditionalPreference: string;
}

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;
}
