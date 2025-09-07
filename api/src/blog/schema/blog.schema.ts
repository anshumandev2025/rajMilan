import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ isRequired: true })
  title: string;

  @Prop({ isRequired: true })
  author: string;

  @Prop({ isRequired: true })
  description: string;

  @Prop({ isRequired: true, unique: true })
  slug: string;

  @Prop({ isRequired: true })
  image: string;

  @Prop({ isRequired: true })
  category: string[];

  @Prop({ isRequired: true })
  minute_to_read: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
