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
export class EnvironmentalAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column('text')
  description: string;

  @Column('jsonb', { nullable: true })
  location: {
    latitude: number;
    longitude: number;
  } | null;

  @Column()
  proofHash: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  })
  status: 'pending' | 'verified' | 'rejected';

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  reward: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  carbonOffset: number;

  @ManyToOne(() => User, (user) => user.environmentalActions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 