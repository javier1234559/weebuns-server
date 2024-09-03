import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateClassMemberInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
