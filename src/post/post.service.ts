import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { isUndefined } from 'src/helpers/isUndefined';
import { Comment } from 'src/comment/entities/comment.entity';
import { PageOptionsDto, PageMetaDto, PageDto } from 'src/meta/dto';
import { countReadingTime } from 'src/helpers/countReadingTime';

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
    post.readingTime = countReadingTime(createPostDto.body);

    return this.postRepository.save(post);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Post>> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder
      .orderBy('post.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .leftJoinAndSelect('post.creator', 'creator')
      .leftJoinAndSelect('post.comments', 'comments');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
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
      post.readingTime = countReadingTime(updatePostDto.body);
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
