import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IUserLanguage } from 'src/models/user-language/user-language.interface';

@ObjectType()
export class UserLanguage implements IUserLanguage {
  @Field(() => ID)
  @ApiProperty({ example: '00321d6f-2bcf-4985-9659-92a571275da6' })
  id: string;

  @Field()
  @ApiProperty({ example: '00321d6f-2bcf-4985-9659-92a571275da6' })
  user_id: string;

  @Field()
  @ApiProperty({ example: 'English' })
  language: string;

  @Field()
  @ApiProperty({ example: 'Intermediate' })
  proficiency_level: string;

  @Field()
  @ApiProperty({ example: false })
  is_native: boolean;

  @Field(() => Date)
  @ApiProperty()
  created_at: Date;

  @Field(() => Date)
  @ApiProperty()
  updated_at: Date;

  // @Field(() => User, { nullable: true })
  // @ApiProperty({ type: () => User, nullable: true })
  // user?: User;
}
