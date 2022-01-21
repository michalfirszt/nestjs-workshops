import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { Flow } from './flow.entity';

@InputType()
export class FlowCreateDto extends PickType(Flow, ['name', 'description']) {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class FlowUpdateDto extends PartialType(FlowCreateDto) {}
