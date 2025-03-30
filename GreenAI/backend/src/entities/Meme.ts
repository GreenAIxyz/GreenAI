import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  prompt: string;

  @Column()
  imageUrl: string;

  @Column()
  environmentalAction: string;

  @Column({ type: 'integer', default: 0 })
  socialShares: number;

  @Column('jsonb')
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };

  @Column({
    type: 'enum',
    enum: ['generating', 'ready', 'failed'],
    default: 'generating',
  })
  status: 'generating' | 'ready' | 'failed';

  @ManyToOne(() => User, (user) => user.memes)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Column()
  creatorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 