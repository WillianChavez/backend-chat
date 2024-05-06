import { Injectable } from '@nestjs/common';
import { CreateChatRealTimeDto } from './dto/create-chat-real-time.dto';
import { UpdateChatRealTimeDto } from './dto/update-chat-real-time.dto';

@Injectable()
export class ChatRealTimeService {
  create(createChatRealTimeDto: CreateChatRealTimeDto) {
    return 'This action adds a new chatRealTime';
  }

  findAll() {
    return `This action returns all chatRealTime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatRealTime`;
  }

  update(id: number, updateChatRealTimeDto: UpdateChatRealTimeDto) {
    return `This action updates a #${id} chatRealTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatRealTime`;
  }
}
