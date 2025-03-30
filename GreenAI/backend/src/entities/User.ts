import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EnvironmentalAction } from './EnvironmentalAction';
import { Meme } from './Meme';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  walletAddress: string;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  balance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  environmentalScore: number;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => EnvironmentalAction, (action) => action.user)
  environmentalActions: EnvironmentalAction[];

  @OneToMany(() => Meme, (meme) => meme.creator)
  memes: Meme[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 