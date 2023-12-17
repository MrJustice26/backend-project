import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {

    const creatorExists = await this.userRepository.findOneBy({id: createCommentDto.creator});
    if(!creatorExists){
      return new BadRequestException('Creator not found');
    }

    const postExists = await this.postRepository.findOneBy({id: createCommentDto.postId});
    if(!postExists){
      return new BadRequestException('Post not found');
    }

    const comment = new Comment();
    comment.body = createCommentDto.body;
    comment.creator = createCommentDto.creator;
    comment.post = createCommentDto.postId;
    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find({relations: ['creator', 'post']});
  }

  findOne(id: number) {
    return this.commentRepository.findOne({
      where: {id},
      relations: ['creator', 'post']
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOneBy({id});
    if(!comment){
      return new BadRequestException('Comment not found')
    }
    
    comment.body = updateCommentDto.body;
    comment.updatedAt = new Date().toISOString();
    return this.commentRepository.save(comment);
  }

  remove(id: number) {
    return this.commentRepository.delete({id});
  }
}
