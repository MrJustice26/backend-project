import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const comment = new Comment();
    comment.body = createCommentDto.body;
    comment.creator = createCommentDto.creator;
    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return this.commentRepository.findOneBy({id});
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = new Comment();
    comment.body = updateCommentDto.body;
    comment.id = id;
    comment.updatedAt = new Date().toISOString();
    return this.commentRepository.save(comment);
  }

  remove(id: number) {
    return this.commentRepository.delete({id});
  }
}
