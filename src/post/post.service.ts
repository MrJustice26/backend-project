import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllPostQueryDto } from './dto/get-all-post-query.dto';
import { User } from 'src/user/entities/user.entity';
import { isUndefined } from 'src/helpers/isUndefined';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userRepository.findOneBy({
      id: createPostDto.creator,
    });
    if (!user) {
      return new BadRequestException('User not found');
    }

    const post = new Post();
    post.title = createPostDto.title;
    post.body = createPostDto.body;
    post.creator = user;
    post.comments = [];
    post.likedBy = [];
    post.readingTime = this.countReadingTime(createPostDto.body);

    return this.postRepository.save(post);
  }

  findAll(getAllPostQueryDto: GetAllPostQueryDto): Promise<Post[]> {
    const DEFAULT_OFFSET = 0;
    const DEFAULT_LIMIT = 15;

    let limit = DEFAULT_LIMIT;
    let offset = DEFAULT_OFFSET;
    if (getAllPostQueryDto?.limit !== undefined) {
      limit = getAllPostQueryDto.limit;
    }
    if (getAllPostQueryDto?.offset !== undefined) {
      offset = getAllPostQueryDto.offset;
    }

    const appliedRelations = [];
    if (getAllPostQueryDto?.withComments === 'true') {
      appliedRelations.push('comments');
    }

    if (getAllPostQueryDto?.withCreator === 'true') {
      appliedRelations.push('creator');
    }

    return this.postRepository.find({
      relations: appliedRelations,
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Post> {
    const receivedPost = await this.postRepository.findOne({
      where: { id },
      relations: ['comments', 'creator'],
    });
    return receivedPost;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      new BadRequestException('Post not found');
    }

    if (!isUndefined(updatePostDto.body)) {
      post.body = updatePostDto.body;
      post.readingTime = this.countReadingTime(updatePostDto.body);
    }

    if (!isUndefined(updatePostDto.title)) {
      post.title = updatePostDto.title;
    }

    post.updatedAt = new Date().toISOString();
    return this.postRepository.save(post);
  }

  remove(id: number) {
    return this.postRepository.delete({ id });
  }

  async likePost(postId: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['likedBy'],
    });
    if (!post) {
      return new BadRequestException('Post not found');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      return new BadRequestException('User not found');
    }

    post.likedBy.push(user);
    return this.postRepository.save(post);
  }

  async unlikePost(postId: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['likedBy'],
    });
    if (!post) {
      return new BadRequestException('Post not found');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      return new BadRequestException('User not found');
    }

    post.likedBy = post.likedBy.filter((likedUser) => likedUser.id !== userId);
    return this.postRepository.save(post);
  }

  countReadingTime(body: string): number {
    const wordsPerMinute = 180;
    const numberOfWords = body.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  }

  async getComments(postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      return new BadRequestException('Post not found');
    }

    return this.commentRepository.find({
      relations: ['creator'],
      where: {
        post: {
          id: postId,
        },
      },
    });
  }
}
