import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateClassMemberInput } from './create-class-member.input';

@InputType()
export class UpdateClassMemberInput extends PartialType(
  CreateClassMemberInput,
) {
  @Field(() => Int)
  id: number;
}
