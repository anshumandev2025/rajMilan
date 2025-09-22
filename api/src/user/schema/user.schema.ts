import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ isRequired: true })
  fullName: string;

  @Prop({ isRequired: true })
  gender: string;

  @Prop({ isRequired: true, unique: true })
  emailAddress: string;

  @Prop({ isRequired: true, unique: true })
  mobileNumber: string;

  @Prop({ isRequired: true })
  location: string;

  @Prop({ isRequired: true })
  fullAddress: string;

  @Prop({ isRequired: true })
  subCast: string;

  @Prop({ isRequired: true })
  password: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  height: string;

  @Prop()
  bodyType: string;

  @Prop()
  educationLevel: string;

  @Prop()
  degreeOrSpecialialization: string;

  @Prop()
  jobProfile: string;
  @Prop()
  jobTitleOrDesignation: string;

  @Prop()
  companyOrOrganization: string;

  @Prop()
  anualIncome: string;

  @Prop()
  dietPreference: string;

  @Prop()
  smokingHabit: string;

  @Prop()
  drinkingHabit: string;

  @Prop()
  aboutHobbyOrInterset: string;

  @Prop()
  fatherName: string;
  @Prop()
  fatherOccupation: string;
  @Prop()
  fatherGotra: string;

  @Prop()
  motherName: string;
  @Prop()
  motherOccupation: string;

  @Prop()
  motherGotra: string;

  @Prop()
  paternalGrandfatherName: string;

  @Prop()
  paternalGrandfatherOccupation: string;

  @Prop()
  paternalGrandmotherName: string;

  @Prop()
  paternalGrandmotherGotra: string;

  @Prop()
  maternalGrandfatherName: string;

  @Prop()
  maternalGrandfatherOccupation: string;

  @Prop()
  maternalGrandmotherName: string;

  @Prop()
  maternalGrandmotherGotra: string;

  @Prop()
  paternalVillage: string;

  @Prop()
  maternalVillage: string;

  @Prop()
  gotra: string;

  @Prop()
  siblingsCount: string;

  @Prop()
  familyType: string;

  @Prop()
  familyValues: string;

  @Prop()
  aboutFamilyBackground: string;

  @Prop()
  partnerPreferedSubCast: string;

  @Prop()
  partnerPreferedCity: string;

  @Prop()
  partnerPreferedEducationLevel: string;

  @Prop()
  partnerPreferedProfession: string;

  @Prop()
  partnerAdditionalPreference: string;

  @Prop()
  profileViews: number;

  @Prop({ default: false })
  isProfileCompleted: boolean;

  @Prop()
  profileImage: string;

  @Prop()
  galleryImages: string[];

  @Prop()
  bioDataPdf: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
