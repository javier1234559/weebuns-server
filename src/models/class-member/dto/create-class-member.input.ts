import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassMemberInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
