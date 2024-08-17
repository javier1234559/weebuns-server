import { CreateClassMemberInput } from './create-class-member.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClassMemberInput extends PartialType(CreateClassMemberInput) {
  @Field(() => Int)
  id: number;
}
