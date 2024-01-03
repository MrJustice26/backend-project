import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { isUndefined } from 'src/helpers/isUndefined';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const creator = await this.userRepository.findOneBy({
      id: createCommentDto.creatorId,
    });
    if (!creator) {
      return new BadRequestException('Creator not found');
    }

    const post = await this.postRepository.findOneBy({
      id: createCommentDto.postId,
    });
    if (!post) {
      return new BadRequestException('Post not found');
    }

    const comment = new Comment();
    comment.body = createCommentDto.body;
    comment.creator = creator;
    comment.post = post;
    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find({ relations: ['creator', 'post'] });
  }

  findOne(id: number) {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['creator', 'post'],
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment) {
      return new BadRequestException('Comment not found');
    }

    if (!isUndefined(updateCommentDto.body)) {
      comment.body = updateCommentDto.body;
      comment.updatedAt = new Date().toISOString();
    }
    return this.commentRepository.save(comment);
  }

  remove(id: number) {
    return this.commentRepository.delete({ id });
  }
}
