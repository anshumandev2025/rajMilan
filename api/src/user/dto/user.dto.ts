import {
  IsDateString,
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

  @IsOptional()
  @IsString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  height: string;

  @IsOptional()
  @IsString()
  fullAddress: string;

  @IsOptional()
  @IsString()
  bodyType: string;

  @IsOptional()
  @IsString()
  educationLevel: string;

  @IsOptional()
  @IsString()
  degreeOrSpecialialization: string;

  @IsOptional()
  @IsString()
  companyOrOrganization: string;

  @IsOptional()
  @IsString()
  jobTitleOrDesignation: string;

  @IsOptional()
  @IsString()
  jobProfile: string;

  @IsOptional()
  @IsString()
  anualIncome: string;

  @IsOptional()
  @IsString()
  dietPreference: string;

  @IsOptional()
  @IsString()
  smokingHabit: string;

  @IsOptional()
  @IsString()
  drinkingHabit: string;

  @IsOptional()
  @IsString()
  aboutHobbyOrInterset: string;

  @IsOptional()
  @IsString()
  fatherName: string;

  @IsOptional()
  @IsString()
  fatherOccupation: string;

  @IsOptional()
  @IsString()
  fatherGotra: string;

  @IsOptional()
  @IsString()
  motherName: string;

  @IsOptional()
  @IsString()
  motherOccupation: string;

  @IsOptional()
  @IsString()
  motherGotra: string;

  @IsOptional()
  @IsString()
  paternalGrandfatherName: string;

  @IsOptional()
  @IsString()
  paternalGrandfatherOccupation: string;

  @IsOptional()
  @IsString()
  paternalGrandmotherName: string;

  @IsOptional()
  @IsString()
  paternalGrandmotherGotra: string;

  @IsOptional()
  @IsString()
  maternalGrandfatherName: string;

  @IsOptional()
  @IsString()
  maternalGrandfatherOccupation: string;

  @IsOptional()
  @IsString()
  maternalGrandmotherName: string;

  @IsOptional()
  @IsString()
  maternalGrandmotherGotra: string;

  @IsOptional()
  @IsString()
  paternalVillage: string;

  @IsOptional()
  @IsString()
  maternalVillage: string;

  @IsOptional()
  @IsString()
  gotra: string;

  @IsOptional()
  @IsString()
  siblingsCount: string;

  @IsOptional()
  @IsString()
  familyType: string;

  @IsOptional()
  @IsString()
  familyValues: string;

  @IsOptional()
  @IsOptional()
  aboutFamilyBackground: string;

  @IsOptional()
  @IsString()
  partnerPreferedSubCast: string;

  @IsOptional()
  @IsString()
  partnerPreferedCity: string;

  @IsOptional()
  @IsString()
  partnerPreferedEducationLevel: string;

  @IsOptional()
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
