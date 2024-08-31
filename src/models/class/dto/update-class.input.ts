import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateClassInput } from './create-class.input';

@InputType()
export class UpdateClassInput extends PartialType(CreateClassInput) {
  @Field(() => Int)
  id: number;
}
