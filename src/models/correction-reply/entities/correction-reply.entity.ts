import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../user/entities/user.entity';
import { ICorrectionReply } from '../correction-reply.interface';

@ObjectType()
export class CorrectionReply implements ICorrectionReply {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  id: string;

  @Field()
  @ApiProperty({ example: 1, description: 'ID of the related correction' })
  correction_id: string;

  @Field()
  @ApiProperty({
    example: 'Great improvement on your grammar!',
    description: 'Reply comment to the correction',
  })
  comment: string;

  @Field()
  @ApiProperty({ example: 1, description: 'User ID who created the reply' })
  created_by: string;

  @Field(() => Date)
  @ApiProperty()
  created_at: Date;

  @Field(() => Date)
  @ApiProperty()
  updated_at: Date;

  @Field(() => User, { nullable: true })
  @ApiProperty({ type: () => User, nullable: true })
  creator?: User;

  // @Field(() => Correction, { nullable: true })
  // @ApiProperty({ type: () => Correction, nullable: true })
  // correction?: Correction;
}
