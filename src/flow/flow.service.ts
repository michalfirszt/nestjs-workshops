import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nameof } from 'ts-simple-nameof';

import { Flow } from './flow.entity';
import { User } from '../user/user.entity';
import { FlowCreateDto, FlowUpdateDto } from './flow.dto';

@Injectable()
export class FlowService {
  constructor(
    @InjectRepository(Flow)
    private flowRepository: Repository<Flow>,
  ) {}

  async create(flowDto: FlowCreateDto, user: User): Promise<Flow> {
    const flow = this.flowRepository.create({ ...flowDto, user });

    return flow.save();
  }

  async update(id: number, flowDto: FlowUpdateDto, user: User): Promise<Flow> {
    await this.flowRepository.update({ id, user }, { ...flowDto });

    return this.flowRepository.findOne({ id, user });
  }

  async findAllForUser(user: User): Promise<Flow[]> {
    return this.flowRepository.find({
      where: { user },
      relations: [nameof<Flow>((flow) => flow.user)],
    });
  }

  async findForUser(id: number, user: User): Promise<Flow> {
    return this.flowRepository.findOne(
      { id, user },
      { relations: [nameof<Flow>((flow) => flow.user)] },
    );
  }

  async delete(id: number, user: User): Promise<Flow> {
    const flow = await this.flowRepository.findOne({ id, user });
    await flow.remove();
    flow.id = id;

    return flow;
  }

  async search(search: string, user: User): Promise<Flow[]> {
    return this.flowRepository
      .createQueryBuilder('flow')
      .where('flow.userId = :userId', { userId: user.id })
      .getMany();
  }
}
